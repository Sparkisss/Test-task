import { FC, useEffect, useState } from 'react';
import './App.css';
import AppInfo from './components/appInfo/AppInfo';
import TaskList from './components/tasksList/TaskList';
import TasksAddPanel from './components/tasksAddPanel/TasksAddPanel';
import { Data } from './types/types';

const App: FC = () => {
  const [data, setData] = useState<Data[]>([]);

  // Загрузка данных из API при первом рендере
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasks');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const tasks = await response.json();
        setData(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, []);

  const deleteTask = (id: number): void => {
    setData(prevData => prevData.filter(task => task.id !== id));
  };

  const editTask = (id: number, newTitle: string): void => {
    setData(prevData => 
      prevData.map(task => 
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  const addTask = (newTask: Data): void => {
    setData(prevData => [...prevData, newTask]);
  };

  const changeData = (id: number) => {
    setData(prevData => 
      prevData.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <>
      <AppInfo data={data} />
      <TaskList data={data} changeData={changeData} onDelete={deleteTask} editTask={editTask} />
      <TasksAddPanel data={data} addTask={addTask} />
    </>
  );
};

export default App;
