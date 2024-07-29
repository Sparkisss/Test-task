import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Text, View, Pressable } from 'react-native';

export default function TasksAddPanel({data, addTask}) {
  const [task, setTask] = useState('');
  const [maxId, setMaxId] = useState(0); //получаем максимальный id для добавления нового id следующему элементу

  useEffect(() => {
      if (data) {
          setMaxId(data.reduce((prev, current) => Math.max(prev, current.id), 0)); //получаем maxid
      }
  }, [data]);

  const handleAddTask = async () => {
      // Валидация: проверяем длину строки и наличие пробелов
      if (task.trim().length < 3) {
          message.error('Task name must be at least 3 characters long and cannot be empty or just spaces.');
          return;
      }

      // Создаем новую задачу
      const newTask = { id: maxId + 1, title: task, completed: false };

      try {
          // Отправляем новую задачу на сервер
          const response = await fetch('http://localhost:5000/tasks', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(newTask), // Отправляем только новую задачу
          });

          if (!response.ok) {
              throw new Error('Network response was not ok');
          }

          // Вызываем функцию addTask для обновления состояния в родительском компоненте
          if (addTask) {
              addTask(newTask);
          }

          // Очищаем инпут после добавления            
          setTask('');
          message.success('Task added successfully!');

      } catch (error) {
          message.error('Failed to add task: ' + error);
      }
  };
    
  return (
      <View style={styles.wrapper}>
        <TextInput 
          style={styles.input}
          placeholder='Task name'
          required
          onChange={(e) => {
            setTask(e.target.value);
          }}
          value={task}
          />
        <Pressable style={styles.btn} onPress={handleAddTask}>
          <Text style={{color: 'white'}}>Add</Text>
        </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex', 
    alignItems: 'center',   
  },
  input: {
    borderBottomWidth: 1,
    padding: '0.6em',
    marginVertical: '1em',
    marginHorizontal: '1em', 
    textAlign: 'center',   
    width: '80%',
    height: 10,
  },
  btn: {
    borderWidth: 3,
    padding: '0.6em',
    textAlign: 'center',
    borderRadius: 10,
  },
});