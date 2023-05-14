import express from "express";
import cors from "cors"
import { databaseManager } from "@/db/database_manager";

export const app = express();
// const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/tasks', async (req, res) => {

  console.log("Request GET /api");

  const db = await databaseManager.getInstance();
  const result = await db.all("SELECT * FROM tasks");

  // res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(200).json(result);

  // console.dir(res.status);
});

// app.use('/api', apiRouter);