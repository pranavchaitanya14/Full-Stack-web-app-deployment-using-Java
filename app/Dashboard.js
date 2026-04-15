"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("/api/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    await axios.post("/api/tasks", { task });
    fetchTasks();
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <input onChange={(e)=>setTask(e.target.value)} />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((t)=> <li key={t.id}>{t.task}</li>)}
      </ul>
    </div>
  );
}
