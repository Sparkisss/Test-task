import { FC } from 'react';
import TasksListItem from '../tasksListItem/TasksListItem';
import { TaskListProps } from '../../types/types';
import classes from './TaskList.module.css';

const TaskList: FC<TaskListProps> = ({ data, changeData, onDelete, editTask }) => {
    //перебираем все задачи и отображаем их
    const tasks = data?.map(item => {
        return (
            <TasksListItem key={item.id}
                id={item.id}
                description={item.title} 
                completed={item.completed} 
                changeData={changeData}
                onDelete={onDelete}
                editTask={editTask}
                />
        );
    });

    return (
        <div className={classes.list__container}>
            {tasks}
        </div>
    );
};

export default TaskList;
