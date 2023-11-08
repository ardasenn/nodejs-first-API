### Hi everyone! I’ve developed my first Node.js API with Express.js, and I’m eager to become a MERN stack developer. 😊

### Before you start, make sure to update the connection string in your .env file. After that, you’ll need to install the necessary Node modules.

Here are some key points about my project:

#### User Registration and Tokens:

- Users must register with their email and password.
- After register , they receive an access token and a refresh token for business logic.
- Note that only HTTP requests can use the refresh token via cookies.

#### Book Operations:

- You can add new books, update existing ones, and list books.
- However, book deletion is restricted to admin users.

### What I Learned from This Project:

- User Authentication with JWT in Node.js. I’ve implemented secure authentication using JSON Web Tokens.
- CRUD Operations with Mongoose.
- Custom Middleware. I’ve developed custom middleware to handle specific tasks within my application.
