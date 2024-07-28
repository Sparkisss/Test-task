import { FC, useState } from 'react';
import { Typography, Form, Input, Button, Space } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import classes from './TaskAddPanel.module.css'

const { Title } = Typography;

const TasksAddPanel: FC = () => {
    const [task, setTask] = useState<string>('');  

    return (    
        <div className={classes.addPanel__container}>
                <Title level={2}>Add new task.</Title>
                <Form>
                    <Space>
                        <FormItem label="Task name" name="task">
                            <Input placeholder='Task name' required value={task} onChange={(e) => setTask(e.target.value)}></Input>
                        </FormItem>
                        <FormItem>
                            <Button type='primary' htmlType='submit' onClick={() => console.log(task)}>ADD</Button>
                        </FormItem>
                    </Space>
                </Form>
        </div>
    );
};

export default TasksAddPanel;