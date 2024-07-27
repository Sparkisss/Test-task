import { FC } from 'react';
import TasksListItem from '../tasksListItem/TasksListItem';
import classes from './TaskList.module.css'

const TaskList: FC = () => {
    return (
        <ul className={classes.list__container}>
            <TasksListItem/>
            <TasksListItem/>
            <TasksListItem/>
        </ul>
    );
};

export default TaskList;