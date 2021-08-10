import Link from 'next/link'
import styles from './Sidebar.module.scss'
import React from 'react'
import { Layout, Menu } from 'antd';
import {
    PieChartOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router'
import { Cascader } from 'antd';

const { Sider } = Layout;
const { SubMenu } = Menu;


const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];

function onChange(value) {
  console.log(value);
}
function keyPath(){
    const router = useRouter()
    if (router.asPath === "/"){
        return "1"
    }
    else if (router.asPath === "/test"){
        return "2"
    }
    else if (router.asPath === "/plan"){
        return "3"
    }
}

const Sidebar = () => {

    const isAdmin = true;

    return (
        <div className={styles.sidebar}>
            <Sider className={isAdmin ? styles.containerAdmin : styles.container} width={256} >
                <div className={styles.logo}>
                    <img src="/Logo.png" height="119px" width="179px" alt="OBED Logo" />
                    {isAdmin && <h1> Administrator </h1>}
                </div>
                {!isAdmin ?
                    <>
                        <Menu
                            className={styles.menu}
                            //defaultSelectedKeys={['1']}
                            //defaultOpenKeys={['sub1']}
                            mode="vertical"   
                        >
                            <SubMenu className={styles.year} key="sub1" title="2/2021" >
                                <Menu.Item key="4">Option 1</Menu.Item>
                                <Menu.Item key="5">Option 2</Menu.Item>
                            </SubMenu>
                            <SubMenu 
                            className={styles.course} key="sub2" 
                            title={
                                    <div style={{overflow:"hidden",textOverflow:"ellipsis"}}>
                                    01076001 <br/> 
                                    Introduction to Computer Engineering <br/> 
                                    Section 21
                                    </div>  
                            }
                            >
                                <Menu.Item key="6">Option 3</Menu.Item>
                                <Menu.Item key="7">Option 4</Menu.Item>
                            </SubMenu>
                        </Menu>  

                        {/* <Cascader className={styles.cascader} options={options} onChange={onChange} placeholder="Please select" /> */}
                        <Menu
                            className={styles.menu}
                            defaultSelectedKeys={keyPath()}
                            mode="inline"
                        >
                        <Menu.Item className ={styles.item} key="4">
                            <Link href="/">
                                <a> <PieChartOutlined /> Overview </a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="5" className ={styles.item}>
                            <Link href="#">
                                <a> <PieChartOutlined /> Student </a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6" className ={styles.item}>
                            <Link href="#">
                                <a> <PieChartOutlined /> Planning </a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="7" className ={styles.item}>
                            <Link href="#">
                                <a> <PieChartOutlined /> Learning Outcome </a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8" className ={styles.item}>
                            <Link href="#">
                                <a> <PieChartOutlined /> Activity </a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="9" className ={styles.item}>
                            <Link href="#">
                                <a> <PieChartOutlined /> Report </a>
                            </Link>
                        </Menu.Item>
                        </Menu>  
                    </>          
                :<Menu
                    className={styles.menu}
                    defaultSelectedKeys={keyPath()}
                    mode="inline"
                >
                    <Menu.Item className ={styles.item} key="1">
                        <Link href="/">
                            <a> <PieChartOutlined /> Curriculum </a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" className ={styles.item}>
                        <Link href="/test">
                            <a> <PieChartOutlined /> Teacher </a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3" className ={styles.item}>
                        <Link href="/plan">
                            <a> <PieChartOutlined /> Semester plan </a>
                        </Link>
                    </Menu.Item>    
                </Menu>
                }

            </Sider>
        </div>
    )
}

export default Sidebar

