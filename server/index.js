const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const todos = [
  {
    id: 1,
    username: "dan",
    title: "go for running",
  },
];

app.get("/todos", (req, res) => {
  res.status(200).send(todos);
});

app.post("/todos", async (req, res) => {
  const { id, title, username } = req.body;
  todos.push({ id, title, username });
  res.status(200).send(todos);
});

const port = 3001;
app.listen(port, () => {
  console.log(`listening on port: ${port}...`);
});
