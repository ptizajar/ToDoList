
import { useState } from 'react';
import { Plus } from 'lucide-react';

import styles from './TaskForm.module.css';

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    onAddTask(trimmedTitle);
    setTitle('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Что нужно сделать?"
        aria-label="Название новой задачи"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <button
        className={styles.submitButton}
        type="submit"
        disabled={!title.trim()}
      >
        <Plus size={18} />
        <span>Добавить</span>
      </button>
    </form>
  );
}

export default TaskForm;
