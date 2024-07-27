import { FC } from 'react';
import './App.css'
import AppInfo from './components/appInfo/AppInfo';
import TaskList from './components/tasksList/TaskList';
import TasksAddPanel from './components/tasksAddPanel/TasksAddPanel';

const App: FC = () => {

  return (
    <>
    <AppInfo/>
    <TaskList/>
    <TasksAddPanel/>
    </>
  )
}

export default App
