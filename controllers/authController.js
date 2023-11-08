const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleRegister = async (req, res) => {
  const { email, pwd } = req.body;

  if (!email || !pwd) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const dublicate = await User.findOne({ email }).exec();

  if (dublicate) {
    return res
      .status(400)
      .json({ message: "User has allready define that email" });
  }

  const hashedPwd = await bcrypt.hash(pwd, 10);
  const result = await User.create({
    email,
    password: hashedPwd,
  });

  res.status(201).json({ message: "User created successfully" });
};

const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;

  if (!email || !pwd) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = await User.findOne({ email }).exec();

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const isPassworCorrect = await bcrypt.compare(pwd, user.password);
  if (isPassworCorrect) {
    const roles = Object.values(user.roles);
    //token generate
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: user.email,
          roles: roles,
        },
      },
      process.env.ACCES_TOKEN_SECRET,
      { expiresIn: "5 minutes" }
    );
    const refreshToken = jwt.sign(
      {
        email: user.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    user.refreshToken = refreshToken;

    const result = await user.save();
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({ accessToken });
  } else {
    return res.status(401).json("Email or password incorrect");
  }
};

const handleRefreshRoken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const user = await User.findOne({ refreshToken }).exec();

  if (!user) {
    return res.sendStatus(403);
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.email !== decoded.email) {
      return res.sendStatus(403);
    }
    const roles = Object.values(user.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: decoded.email,
          roles: roles,
        },
      },
      process.env.ACCES_TOKEN_SECRET,
      { expiresIn: "5 minutes" }
    );
    res.json({ accessToken });
  });
};
module.exports = { handleRegister, handleLogin, handleRefreshRoken };
