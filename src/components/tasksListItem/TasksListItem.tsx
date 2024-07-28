import { FC } from 'react';
import { List as L, Button, Tooltip, Space, Checkbox} from 'antd';
import { EditOutlined , DeleteOutlined } from '@ant-design/icons';
import classes from "./TaskListItem.module.css";
import { TaskListProps } from '../../types/types';

const TasksListItem: FC<TaskListProps> = ({id, description, completed, changeData, onDelete}) => {

    if (id === undefined) {
        // Обработка случая, когда id не определено
        console.log('id is undefined');
        return null; // или другая логика
      }

    return (
        <div className={classes.item} >        
            <Space size={'middle'} >
                <Checkbox onChange={() => changeData(id)} >Done</Checkbox>                
                <L.Item.Meta description=<span style={{textDecoration: completed ? 'line-through' : 'none',}}> {description}</span>/>         
                <Tooltip title="delete">
                    <Button type="primary" shape="circle" icon={<DeleteOutlined/>} 
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onDelete){
                                onDelete(id)
                            }
                        }}
                    /> 
                </Tooltip>
                <Tooltip title="edit">
                    <Button type="primary" shape="circle" icon={<EditOutlined/>}/>   
                </Tooltip>                
            </Space>                            
        </div>
    );
};

export default TasksListItem;