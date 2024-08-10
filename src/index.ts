import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import jwt from "jsonwebtoken";
import userRoutes from "./routes/userRoutes";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", userRoutes);

app.get("/", (req, res) => res.send("this is home page!"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
