import express from "express";
import cors from "cors"
import { databaseManager } from "@/db/database_manager";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/tasks', async (req, res) =>
{
  console.log("Request GET /api/tasks");

  const db = await databaseManager.getInstance();
  const result = await db.all("SELECT * FROM tasks");
  res.status(200).json(result);
});

app.post('/api/tasks/register', async (req, res) =>
{
  console.log("Request POST /api/tasks/register");

  const title = req.body.title;
  const db = await databaseManager.getInstance();

  console.log(`New task: ${title} ...`);

  try {
    await db.all(`INSERT INTO tasks (title, status) VALUES ('${title}', 0)`);
    res.status(200).json({ message: `New task: ${title} registered` });
    console.log("Succeeded");
  } catch (e) {
    res.status(500).json(e);
    console.log("Failed");
  }
});

app.post('/api/tasks/update', async (req, res) =>
{
  console.log("Request POST /api/tasks/update");

  const task = { ...req.body };
  const db = await databaseManager.getInstance();

  console.log(`Task Update: ${task.title} -> ${task.status == 1 ? "DONE" : "TO DO"}`);

  try {
    await db.all(`UPDATE tasks SET status=${task.status} WHERE id=${task.id}`);
    res.status(200).json({ message: `Task Update: ${task.title} -> ${task.status == 1 ? "DONE" : "TO DO"}` });
    console.log("Succeeded");
  } catch (e) {
    res.status(500).json(e);
    console.log("Failed");
  }
});

app.delete('/api/tasks/delete', async (req, res) =>
{
  console.log("Request POST /api/tasks/delete");

  const db = await databaseManager.getInstance();

  console.log(`Task Delete..`);

  try {
    await db.all(`DELETE from tasks WHERE status=1`);
    res.status(200).json({ message: `Done tasks Deleted` });
  } catch (e) {
    res.status(500).json(e);
    console.log("Failed");
  }
});