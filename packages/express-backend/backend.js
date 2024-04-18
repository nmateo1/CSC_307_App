// backend.js
import express from "express";

const app = express();
const port = 8000;

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

app.use(express.json());

app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
  });

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});