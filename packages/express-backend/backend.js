// // backend.js
// import cors from "cors";
// import express from "express";

// const app = express();
// const port = 8000;

// app.use(cors());
// app.use(express.json());


// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });


// const users = {
//   users_list: [
//     {
//       id: "xyz789",
//       name: "Charlie",
//       job: "Janitor"
//     },
//     {
//       id: "abc123",
//       name: "Mac",
//       job: "Bouncer"
//     },
//     {
//       id: "ppp222",
//       name: "Mac",
//       job: "Professor"
//     },
//     {
//       id: "yat999",
//       name: "Dee",
//       job: "Aspring actress"
//     },
//     {
//       id: "zap555",
//       name: "Dennis",
//       job: "Bartender"
//     }
//   ]
// };

// app.get("/users", (req, res) => {
//   const { name, job } = req.query;
//   if (name && job) {
//       const result = findUsersByNameAndJob(name, job);
//       res.send({ users_list: result });
//   } else {
//       res.send(users);
//   }
// });

// const findUserById = (id) =>
//   users["users_list"].find((user) => user["id"] === id);

// app.get("/users/:id", (req, res) => {
//   const id = req.params["id"];
//   let result = findUserById(id);
//   if (result === undefined) {
//       res.status(404).send("Resource not found.");
//   } else {
//       res.send(result);
//   }
// });

// const addUser = (user) => {
//   users["users_list"].push(user);
//   return user;
// };

// app.post("/users", (req, res) => {
//   const userToAdd = req.body;
//   addUser(userToAdd);
//   res.send();
// });

// const deleteUserById = (id) => {
//   const index = users.users_list.findIndex(user => user.id === id);
//   if (index !== -1) {
//       users.users_list.splice(index, 1);
//       return true; // User deleted successfully
//   }
//   return false; // User not found
// };

// app.delete("/users", (req, res) => {
//   const userIdObj = req.body;
//   const id = userIdObj.id;
//   if (!id) {
//       return res.status(400).send("User ID not provided.");
//   }
//   if (deleteUserById(id)) {
//       res.send("User deleted successfully.");
//   } else {
//       res.status(404).send("User not found.");
//   }
// });

// app.listen(port, () => {
//   console.log(
//       `Example app listening at http://localhost:${port}`
//   );
// });
// backend.js
import express from "express";
import cors from 'cors';

const app = express();
const port = 8000;

// Middleware to parse JSON data
//const app = express();
app.use(cors());
app.use(express.json());

// Data structure for users
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspiring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

// Helper function to generate a random ID
const generateId = () => {
  return Math.random().toString(36).substr(2, 9); // Generates a random alphanumeric string
};

// Helper function to find user by ID
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

// Helper function to add a new user
const addUser = (user) => {
  const newUser = { ...user, id: generateId() }; // Assign a random ID to the new user
  users["users_list"].push(newUser);
  return newUser;
};

// GET route to retrieve all users or users by name
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  let result = users;

  if (name || job) {
    result.users_list = users.users_list.filter(
      (user) => (!name || user.name === name) && (!job || user.job === job)
    );
  }

  res.send(result);
});

// POST route to add a new user
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const newUser = addUser(userToAdd);
  res.status(201).json(newUser); // Return the newly added user in the response
});

// DELETE route to remove a user by ID
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const index = users.users_list.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.users_list.splice(index, 1);
    res.status(204).send(); // No Content response for successful deletion
  } else {
    res.status(404).send("Resource not found.");
  }
});

// Server listening
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});