const express = require('express');
const cors = require('cors'); // import cors js package to handle CORS issues
require('dotenv').config();

const connectDB = require('./config/db');
const app = express();

// Connect to DB
connectDB();

// Log the environment variables (for debugging)
console.log('Frontend URL from ENV:', process.env.FRONTEND_URL);


// CORS configuration
// Q. what is cors here? why it is used?
/*
CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers to prevent
malicious websites from making requests to a different domain than the one that served the original web page.
CORS is used to allow or restrict resources on a web server to be requested from another domain outside
the domain from which the resource originated. It is implemented using HTTP headers that specify
which origins are permitted to access the resources.
*/

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

console.log('CORS Origin:', corsOptions.origin);

// Middleware
app.use(cors(corsOptions));// enable CORS with the specified options
app.use(express.json());// parse incoming JSON requests, making the data available in req.body
// so we don't have to use body-parser package separately



// Routes
app.use('/api/auth', require('./routes/auth'));// authentication routes
app.use('/api/books', require('./routes/books'));// book management routes

// Root route
app.get('/', (req, res) => {
  res.send('YourBooks backend is running ✅');
});

// Server start (comment out if deploying on Vercel backend)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// the server listens on the specified PORT (from environment variable or default 5000)

// Export app for Vercel if needed
module.exports = app;




// Q🎯. what is the purpose of this server.js file?
/*
The server.js file serves as the main entry point for the backend application.
It sets up and configures the Express server, connects to the MongoDB database,
and defines the routes for handling API requests related to authentication and book management.
It also includes middleware for CORS and JSON parsing, and starts the server to listen for incoming requests.
*/


// Q🎯. what is the purpose of cors here?
/*
CORS (Cross-Origin Resource Sharing) is used here to enable controlled access to the backend server from
the frontend application, which may be hosted on a different domain or port.
By configuring CORS, the server specifies which origins are allowed to make requests,
methods that are permitted, and whether credentials (like cookies or authorization headers) can be included.
This is essential for web applications where the frontend and backend are served from different origins,
ensuring secure and seamless communication between them.
*/

// Q🎯. what are methods to make requests to the server from the client/frontend?
/*
The common methods to make requests to the server from the client/frontend include:
GET: Retrieve data from the server.
POST: Send data to the server for processing.
PUT: Update data on the server.
DELETE: Remove data from the server.

this methods can be served using various techniques such as:
1. Fetch API: A built-in JavaScript API for making HTTP requests.
2. Axios: A popular third-party library for making HTTP requests. (used in this project)
3. XMLHttpRequest: An older method for making HTTP requests, now largely replaced by Fetch API.
These methods are used in RESTful APIs to perform CRUD (Create, Read, Update, Delete) operations on resources.
*/


// Q🎯. In backend, how the requests from the client/frontend are handled? what are the other options to 
// handle requests in backend server? which method is used in this project?
/*
In the backend, requests from the client/frontend are handled using Express.js,
a web application framework for Node.js. Express provides a robust set of features
for building web and mobile applications, including routing, middleware support,
and request/response handling.

In this project, Express.js is used to define routes for handling API requests related to
authentication and book management. Middleware functions are used to process requests,
such as parsing JSON data and enabling CORS.In routes we define specific endpoints (like /api/auth, /api/books)
to handle different types of requests (GET, POST, PUT, DELETE) and perform the necessary operations. to handle
requests from the client/frontend we defined async functions in route files (like auth.js, books.js).

Other options to handle requests in a backend server include:
1. Koa.js: A lightweight web framework for Node.js that provides a minimalistic approach to building web applications.
2. Hapi.js: A rich framework for building applications and services, known for its configuration-centric approach.
3. Fastify: A fast and low-overhead web framework for Node.js, designed for high performance.
*/


// Q🎯. what is the purpose of express.json() middleware here?
/*
The express.json() middleware is used to parse incoming requests with JSON payloads.
It makes the parsed data available in the req.body property of the request object.
This is particularly useful for APIs that expect JSON data from the client/frontend,
as it allows the server to easily access and manipulate the data sent in the request body.
Without this middleware, the server would not be able to automatically parse JSON data,
and developers would need to implement their own parsing logic.
*/



// Q🎯. what is RESTful or REST API and non-RESTful API?
/*

context: the communication between the frontend and backend in this project is done using RESTful API endpoints.
rest api provides a standardized way for the frontend to interact with the backend server.

RESTful API (Representational State Transfer) is an architectural style for designing networked applications.
It uses standard HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on resources,
which are identified by URLs. RESTful APIs are stateless, meaning each request from the client
contains all the information needed to process the request, and the server does not store any client context.

example: In this project, the backend server exposes RESTful API endpoints for authentication
and book management, using the HTTP methods GET, POST, PUT, and DELETE. In frontend, axios is used
to make requests( GET, POST, PUT, DELETE) to these endpoints to perform various operations like adding a new book,
fetching books, updating book details, and deleting books.

Non-RESTful API is a type of API that does not follow the REST architectural style.
It uses a different set of HTTP methods and does not use URLs to identify resources.
Non-RESTful APIs may use methods like RPC (Remote Procedure Call) or SOAP (Simple Object Access Protocol)
to perform operations. These APIs may maintain state on the server side and can be more complex
to implement and consume compared to RESTful APIs.

example: An example of a non-RESTful API is a SOAP-based web service, which uses XML messages
to perform operations and may maintain session state on the server side.
*/


// Q🎯. Difference between synchronous and asynchronous functions ? how they are used to handle requests ?
/*
🔹 Synchronous Functions (Normal functions, no async/await)
- Meaning: Code runs line by line, one after another.
- If one line takes time (like reading a file or calling a server), everything else waits until it finishes.
- This can make your program slow or blocked if the task takes long.

Example (Synchronous)
function getDataSync() {
  // Imagine this is a slow operation
  const data = "Server response after 5 seconds";
  return data;
}

console.log("Start");
const result = getDataSync(); // Everything waits here until done
console.log("Result:", result);
console.log("End");


🔹 Asynchronous Functions (async/await)
- Meaning: Code can start a task (like calling a server) and continue running other things while waiting.
- When the task finishes, the result is handled later.
- This avoids blocking the program.
Example (Asynchronous)
async function getDataAsync() {
  // Simulate waiting for server response
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Server response after 5 seconds");
    }, 5000);
  });
}

async function main() {
  console.log("Start");
  const result = await getDataAsync(); // Waits only inside this function
  console.log("Result:", result);
  console.log("End");
}

main();


✅ Simple Analogy
- Synchronous: Imagine you’re at a restaurant with only one chef. He cooks one dish fully before starting the next. Everyone waits.
- Asynchronous: The chef starts cooking dish A, then while it’s boiling, he starts dish B. When dish A is ready, he serves it. No one waits unnecessarily.

👉 Summary:
• 	Synchronous = one thing at a time, blocks others.
• 	Asynchronous = can start tasks and continue, waits only when needed.
• 	For handling API requests, async/await is used so multiple users can be served efficiently without blocking

*/