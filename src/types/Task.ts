export interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: number;
}

export interface TaskFilterState {
  status: 'all' | 'completed' | 'incomplete';
  sortBy: 'title' | 'createdAt';
  sortDirection: 'asc' | 'desc';
  search: string;
}