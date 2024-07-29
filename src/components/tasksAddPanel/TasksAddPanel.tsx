import { FC, useEffect, useState } from 'react';
import { Typography, Form, Input, Button, message, Space } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { TaskListProps } from '../../types/types';
import classes from './TaskAddPanel.module.css';

const { Title } = Typography;

const TasksAddPanel: FC<TaskListProps> = ({ data, addTask }) => {
    const [task, setTask] = useState<string>('');
    const [maxId, setMaxId] = useState<number>(0); //получаем максимальный id для добавления нового id следующему элементу

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
            message.error('Failed to add task: ');
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

