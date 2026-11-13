
import { useState } from 'react';
import type { Task, TaskFilter } from './types/task';

import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import FilterTabs from './components/FilterTabs/FilterTabs';

import styles from './App.module.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState<TaskFilter>('all');

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
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === 'active') return !task.completed;
    if (activeFilter === 'completed') return task.completed;

    return true;
  });

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <main className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Мои задачи</h1>
        <p className={styles.subtitle}>
          Планируй свой день и достигай целей
        </p>
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
