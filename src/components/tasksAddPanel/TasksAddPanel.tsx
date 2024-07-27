import { FC } from 'react';
import { Typography, Form, Input, Button, Space } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import classes from './TaskAddPanel.module.css'

const { Title } = Typography;

const TasksAddPanel: FC = () => {
    const onGetData = (e: Event) => {
        console.log(e)
    }

    return (    
        <div className={classes.addPanel__container}>
                <Title level={2}>Add new task.</Title>
                <Form onFinish={onGetData}>
                    <Space>
                        <FormItem label="Task name" name="task">
                            <Input placeholder='Task name' required></Input>
                        </FormItem>
                        <FormItem>
                            <Button type='primary' htmlType='submit'>ADD</Button>
                        </FormItem>
                    </Space>
                </Form>
        </div>
    );
};

export default TasksAddPanel;