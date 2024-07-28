import { FC, useState } from 'react';
import './App.css'
import AppInfo from './components/appInfo/AppInfo';
import TaskList from './components/tasksList/TaskList';
import TasksAddPanel from './components/tasksAddPanel/TasksAddPanel';
import { Data } from './types/types';

const App: FC = () => {
  const [data, setData] = useState<Data[]>([
    {
      id: 1,
      title: 'Ant Design Title 1',
      completed: false,
    },
    {
      id: 2,
      title: 'Ant Design Title 2',
      completed: false,
    },
    {
      id: 3,
      title: 'Ant Design Title 3',
      completed: false,
    },
    {
      id: 4,
      title: 'Ant Design Title 4',
      completed: false,
    },
  ]
)

const deleteTask = (id: number): void => {
  setData(prevData => {
    const index = prevData.findIndex(elem => elem.id === id);
    if (index === -1) {
      // Если элемент не найден, просто возвращаем предыдущее состояние
      return prevData;
    }
    // Создаем новый массив без элемента с указанным id
    return prevData.filter((_, i) => i !== index);
  });
};

const addTask = (newTask: Data): void => {
  setData(prevData => [...prevData, newTask]);
}


const changeData = (id: number) => {
  setData((prevData) => {
    return prevData.map((item) => {
      if(item.id === id) {
        return {...item, completed: !item.completed}
      }
      return item;
    })
  })
}

  return (
    <>
    <AppInfo/>
    <TaskList data={data} changeData={changeData} onDelete={deleteTask}/>
    <TasksAddPanel data={data} addTask={addTask}/>
    </>
  )
}

export default App
