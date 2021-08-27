import React from 'react'
import styles from './Header.module.scss'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

const Header = ({ name }) => {

    return (
        <div className={styles.container}>
            <Link to="/profile" className={styles.text}> {name} </Link>
            <div className={styles.avatar}>
                <Avatar size={50} icon={<UserOutlined />} />
            </div>
        </div>
    )
}

export default Header