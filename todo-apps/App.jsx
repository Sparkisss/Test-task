import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import AppInfo from './components/AppInfo';
import TaskAddPanel from './components/TasksAddPanel';
import TaskList from './components/TaskList';

export default function App() {  
  const [data, setData] = useState([]);

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

  const deleteTask = async (id) => {
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

  const updateTask = async (id, newTitle, completed) => {
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

  const editTask = (id, newTitle) => {
    updateTask(id, newTitle, false); // Предположим, что при редактировании задача не завершенаd
  };

  const addTask = (newTask) => {
    setData(prevData => [...prevData, newTask]);
  };

  const changeData = async (id) => {
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
    <SafeAreaView style={styles.container}>
      <View style={[styles.info, styles.commen]}>
        <AppInfo data={data}/>
      </View>
      <View style={[styles.list, styles.commen]}>
        <TaskList data={data} changeData={changeData} onDelete={deleteTask} editTask={editTask}/>
      </View>
      <View style={[styles.addPanel, styles.commen]}>
        <TaskAddPanel data={data} addTask={addTask} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    gap: 10,    
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  commen: {    
    borderWidth: 3,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    backgroundColor: '#3d5a80',
  },
  list: {
    flex: 3,
    backgroundColor: '#b7bfca',
  },
  addPanel: {
    flex: 1,
    backgroundColor: '#3d5a80',
  }
});
