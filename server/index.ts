import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.urlencoded());

app.get("/subscribe", (req, res) => {
  console.log("Hello from /");
  res.end();
});

app.post("/send", () => {});

app.listen(8080, () => {
  console.log("Listening in port: " + 8080);
});
