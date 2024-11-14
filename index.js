const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
app.use(express.json());
const PORT = 8080;
const bcrypt = require("bcrypt");

const userRouter = require("./useRouter/userRoute");

const client = new MongoClient(
  "mongodb+srv://naruyanga0518:n88635033@hop-1a.rfkei.mongodb.net/?retryWrites=true&w=majority&appName=hop-1a"
);
let db;
const connectToDb = () => {
  try {
    client.connect;
    db = client.db("sample_mflix");
    console.log("connected to DB");
  } catch (error) {
    console.log("failed to connect to DB");
  }
};

connectToDb();

app.get("/users", async (req, res) => {
  const users = await db.collection("users").find().toArray();
  res.status(200).send(users);
});

const hashPasswordMiddleWare = async (req, res, next) => {
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  req.body.password = hashedPassword;
  next();
};

const comparePassword = async (req, res, next) => {
  const { password, email } = req.body;
  const response = await db.collection("users").findOne({ email });

  if (!response) {
    res.status(404).send("user not found");
  }
  const hashedPassword = response.password;
  const isValidPassword = await bcrypt.compare(password, hashedPassword);
  if (isValidPassword) {
    res.send("login successed");
  } else {
    res.send("email or password is incorrect!");
  }
  next();
};

app.use("/users", hashPasswordMiddleWare, userRouter);

app.post("/login", comparePassword, (req, res) => {});

app.listen(PORT, console.log("running"));
