import {FC} from 'react';
import { Typography } from 'antd';
import classes from "./AppInfo.module.css"
import { TaskListProps } from '../../types/types';

const { Title } = Typography;

const AppInfo: FC<TaskListProps> = ({data}) => {
    const tasksNumber = data?.length; //получаем общее кол-во задач
    // получаем кол-во выполненых задач
    const completedTasks = data?.reduce((prev, current) => {
        if (current.completed) {
            return prev + 1;
        }
        return prev;
    }, 0); 

    return (
        <div className={classes.info__container}>
            <Title type='success'>TODO APPLICATION</Title>
            <Title level={3}>Total number of tasks: {tasksNumber}</Title>
            <Title level={3}>Сompleted tasks: {completedTasks}</Title>
        </div>
    );
};

export default AppInfo;