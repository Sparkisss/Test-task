import { FC, useEffect, useState } from 'react';
import { Typography, Form, Input, Button, message, Space } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { TaskListProps } from '../../types/types';
import classes from './TaskAddPanel.module.css';

const { Title } = Typography;

const TasksAddPanel: FC<TaskListProps> = ({ data, addTask}) => {
    const [task, setTask] = useState<string>('');
    const [maxId, setMaxId] = useState<number>(0); //получаем максимальный id для добавления нового id следующему элементу

    useEffect(() => {
        if (data && setMaxId) {
            setMaxId(data.reduce((prev, current) => Math.max(prev, current.id), 1)); //получаем maxid
        }
    }, [data]);

    const handleAddTask = () => {
        // Валидация: проверяем длину строки и наличие пробелов
        if (task.trim().length < 3) {
            message.error('Task name must be at least 3 characters long and cannot be empty or just spaces.');
            return;
        }
        // Добавляем задачу
        if (addTask && maxId) {
            addTask({ id: maxId + 1, title: task, completed: false });
            setTask(''); // Очищаем инпут после добавления            
        }
    };

    return (
        <div className={classes.addPanel__container}>
            <Title level={2}>Add new task.</Title>
            <Form>
                <Space>
                    <FormItem label="Task name" name="task">
                        <Input
                            placeholder='Task name'
                            required
                            onChange={(e) => {
                                setTask(e.target.value);                              
                            }}
                            value={task}                            
                        />
                    </FormItem>
                    <FormItem>
                        <Button type='primary' onClick={handleAddTask}>
                            ADD
                        </Button>
                    </FormItem>
                </Space>
            </Form>
        </div>
    );
};

export default TasksAddPanel;
