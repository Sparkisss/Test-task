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

  const deleteTask = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Ошибка при удалении задачи');
      }

      setData(prevData => prevData.filter(task => task.id !== id));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const updateTask = async (id: number, newTitle: string, completed: boolean): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle, completed }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при обновлении задачи');
      }

      const updatedTask = await response.json();
      setData(prevData =>
        prevData.map(task => (task.id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const editTask = (id: number, newTitle: string): void => {
    updateTask(id, newTitle, false); // Предположим, что при редактировании задача не завершена
  };

  const addTask = (newTask: Data): void => {
    setData(prevData => [...prevData, newTask]);
  };

  const changeData = async (id: number) => {
    try {
      // Находим текущую задачу
      const taskToUpdate = data.find(item => item.id === id);
      if (!taskToUpdate) return;  
      // Изменяем статус задачи
      const updatedCompletedStatus = !taskToUpdate.completed;  
      // Отправляем обновление на сервер
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: taskToUpdate.title, completed: updatedCompletedStatus }),
      });
  
      if (!response.ok) {
        throw new Error('Ошибка при обновлении статуса задачи');
      }
  
      const updatedTask = await response.json();  
      // Обновляем состояние в клиенте
      setData(prevData =>
        prevData.map(item => (item.id === id ? updatedTask : item))
      );
    } catch (error) {
      console.error('Ошибка:', error);
    }
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

