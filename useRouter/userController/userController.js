const { MongoClient } = require("mongodb");

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

const signup = async (req, res) => {
  try {
    const body = req.body;
    const { name, password, email } = body;

    const response = await db.collection("users").insertOne({
      name,
      email,
      password,
    });
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("fail");
  }
};
module.exports = signup;
