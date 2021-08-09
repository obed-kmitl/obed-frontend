import React from 'react'
import styles from './Header.module.scss'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Header = () => {

    const name = "test test"

    return (
        <div className={styles.container}>
            {name}
            <Avatar size={50} icon={<UserOutlined />} />
        </div>
    )
}

export default Header
