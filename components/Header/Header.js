import React from 'react'
import styles from './Header.module.scss'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Header = () => {

    const name = "test test"

    return (
        <div className={styles.container}>
            {name}
            <div className={styles.avatar}>
                <Avatar size={50} icon={<UserOutlined />} />
            </div>
        </div>
    )
}

export default Header
