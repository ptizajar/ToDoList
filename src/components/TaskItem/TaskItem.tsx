
import { Check, Trash2 } from 'lucide-react';
import type { Task } from '../../types/task';
import styles from './TaskItem.module.css';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div
      className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
    >
      <button
        className={styles.checkbox}
        type="button"
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Вернуть задачу' : 'Выполнить задачу'}
        aria-pressed={task.completed}
      >
        {task.completed && <Check size={16} />}
      </button>

      <span className={styles.title}>{task.title}</span>

      <button
        className={styles.deleteButton}
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label="Удалить задачу"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

export default TaskItem;
