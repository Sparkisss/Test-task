import { FC } from 'react';
import { List as L, Button, Flex, Tooltip, Space, Checkbox} from 'antd';
import type { CheckboxProps } from 'antd';

const TasksListItem: FC = () => {

    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
      };

    return (
        <> 
            <Space>
                <Checkbox onChange={onChange}>Checkbox</Checkbox>
                <L.Item.Meta              
                title={<a href="https://ant.design">{'Task number one'}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"                
                />  
                <Flex gap="small">
                    <Flex wrap gap="small">
                        <Tooltip title="search">
                        <Button type="primary" shape="circle">
                            D
                        </Button>   
                        </Tooltip>
                        <Button type="primary" shape="circle">
                            C
                        </Button>                   
                    </Flex>
                </Flex>
            </Space>                                 

        </>
    );
};

export default TasksListItem;