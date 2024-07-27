import {FC} from 'react';
import { Typography } from 'antd';
import classes from "./AppInfo.module.css"

const { Title } = Typography;

const AppInfo: FC = () => {

    return (
        <div className={classes.info__container}>
            <Title type='success'>TODO APPLICATION</Title>
            <Title level={2}>Total number of tasks: ...</Title>
            <Title level={2}>Сompleted tasks: ...</Title>
        </div>
    );
};

export default AppInfo;