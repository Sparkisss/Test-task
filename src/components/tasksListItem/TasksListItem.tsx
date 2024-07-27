import { FC } from 'react';
import { List as L } from 'antd';

const TasksListItem: FC = () => {

    return (
        <>                                  
            <L.Item.Meta              
            title={<a href="https://ant.design">{'Task number one'}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />                       
        </>
    );
};

export default TasksListItem;