
import type { TaskFilter } from '../../types/task';
import styles from './FilterTabs.module.css';

interface FilterTabsProps {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

const filters: { label: string; value: TaskFilter }[] = [
  { label: 'Все', value: 'all' },
  { label: 'Активные', value: 'active' },
  { label: 'Выполненные', value: 'completed' },
];

function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className={styles.filterTabs} aria-label="Фильтр задач">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={`${styles.filterButton} ${
            activeFilter === filter.value ? styles.active : ''
          }`}
          onClick={() => onFilterChange(filter.value)}
          aria-pressed={activeFilter === filter.value}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;
