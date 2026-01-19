// Utility functions for localStorage management

const STORAGE_KEYS = {
  TASK_LIST: 'https://jsonplaceholder.typicode.com/todos?_limit=20',
  TASK_PREFIX: 'https://jsonplaceholder.typicode.com/todos/',
  FILTER: 'taskFilter',
  SEARCH: 'taskSearch',
  PAGE: 'currentPage'
};

// Get task list from localStorage
export const getTaskList = () => {
  const data = localStorage.getItem(STORAGE_KEYS.TASK_LIST);
  return data ? JSON.parse(data) : null;
};

// Save task list to localStorage
export const saveTaskList = (tasks) => {
  localStorage.setItem(STORAGE_KEYS.TASK_LIST, JSON.stringify(tasks));
};

// Get single task from localStorage
export const getTask = (id) => {
  const data = localStorage.getItem(`${STORAGE_KEYS.TASK_PREFIX}${id}`);
  return data ? JSON.parse(data) : null;
};

// Save single task to localStorage
export const saveTask = (task) => {
  localStorage.setItem(`${STORAGE_KEYS.TASK_PREFIX}${task.id}`, JSON.stringify(task));
};

// Update task status in both single task and task list
export const updateTaskStatus = (taskId, completed) => {
  // Update single task
  const task = getTask(taskId);
  if (task) {
    task.completed = completed;
    saveTask(task);
  }
  
  // Update task in list
  const taskList = getTaskList();
  if (taskList) {
    const taskIndex = taskList.findIndex(t => t.id === parseInt(taskId));
    if (taskIndex !== -1) {
      taskList[taskIndex].completed = completed;
      saveTaskList(taskList);
    }
  }
  
  return task;
};

// Get user preferences
export const getPreferences = () => {
  return {
    filter: localStorage.getItem(STORAGE_KEYS.FILTER) || 'all',
    search: localStorage.getItem(STORAGE_KEYS.SEARCH) || '',
    page: parseInt(localStorage.getItem(STORAGE_KEYS.PAGE)) || 1
  };
};

// Save user preferences
export const savePreferences = (filter, search, page) => {
  if (filter !== undefined) localStorage.setItem(STORAGE_KEYS.FILTER, filter);
  if (search !== undefined) localStorage.setItem(STORAGE_KEYS.SEARCH, search);
  if (page !== undefined) localStorage.setItem(STORAGE_KEYS.PAGE, page.toString());
};