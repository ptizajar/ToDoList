
import type { Task } from '../../types/task';
import TaskItem from '../TaskItem/TaskItem';
import { AnimatePresence, motion } from 'motion/react';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>Пока нет задач</h3>
        <p>Добавь первую задачу, чтобы начать!</p>
      </div>
    );
  }

  return (
    <div className={styles.taskList}>
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <TaskItem
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default TaskList;
