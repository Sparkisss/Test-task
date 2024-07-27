import { FC } from 'react';
import { List as L, Button, Tooltip, Space, Checkbox} from 'antd';
import type { CheckboxProps } from 'antd';
import { EditOutlined , DeleteOutlined } from '@ant-design/icons';
import classes from "./TaskListItem.module.css";

const TasksListItem: FC = () => {

    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
      };

    return (
        <div className={classes.item} >        
            <Space size={'middle'} >
                <Checkbox onChange={onChange} >Done</Checkbox>
                <L.Item.Meta             
                description="1. Ant Design, a design language for background applications, is refined by Ant UED Team"             
                /> 
                <Tooltip title="delete">
                    <Button type="primary" shape="circle" icon={<DeleteOutlined/>}/> 
                </Tooltip>
                <Tooltip title="edit">
                    <Button type="primary" shape="circle" icon={<EditOutlined/>}/>   
                </Tooltip>
            </Space>                            
        </div>
    );
};

export default TasksListItem;