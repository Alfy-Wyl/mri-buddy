import express from "express";
import * as dotenv from "dotenv";
import AppController from "./controller/index.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// this is the route handler for the home page data
app.get("/", function (req, res) {
  return AppController.getHomePageData(req, res);
});

// this is the route handler for the detail page info data
app.get("/detail/:detail_id", function (req, res) {
  return AppController.getDetailInfo(req, res);
});

// this is the route handler for the detail page info data
app.post("/validate", function (req, res) {
  return AppController.validatePatientValidity(req, res);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
