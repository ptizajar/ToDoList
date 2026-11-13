import { useEffect, useState } from "react";
import type { Task, TaskFilter } from "./types/task";

import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import FilterTabs from "./components/FilterTabs/FilterTabs";

import styles from "./App.module.css";

const STORAGE_KEY = "todo-tasks";

// Проверяем, что данные из хранилища имеют правильную структуру
function isTaskArray(value: unknown): value is Task[] {
  return (
    Array.isArray(value) &&
    value.every(
      (task) =>
        task !== null &&
        typeof task === "object" &&
        typeof task.id === "string" &&
        typeof task.title === "string" &&
        typeof task.completed === "boolean" &&
        typeof task.createdAt === "number",
    )
  );
}

// Загружаем задачи из localStorage
function loadTasks(): Task[] {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (!savedTasks) return [];

    const parsedTasks: unknown = JSON.parse(savedTasks);

    return isTaskArray(parsedTasks) ? parsedTasks : [];
  } catch {
    return [];
  }
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [activeFilter, setActiveFilter] = useState<TaskFilter>("all");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Не удалось сохранить задачи:", error);
    }
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "active") return !task.completed;
    if (activeFilter === "completed") return task.completed;

    return true;
  });

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <main className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Мои задачи</h1>
        <p className={styles.subtitle}>Планируй свой день и достигай целей</p>
      </header>

      <section className={styles.container}>
        <TaskForm onAddTask={addTask} />

        <div className={styles.tasksHeader}>
          <h2 className={styles.tasksTitle}>Список задач</h2>

          <span className={styles.tasksCounter}>
            {completedCount} из {tasks.length} выполнено
          </span>
        </div>

        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </section>
    </main>
  );
}

export default App;
