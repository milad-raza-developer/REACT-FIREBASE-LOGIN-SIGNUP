import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'
import { signOut, auth } from '../Utils/firebase'


const Container = ({ children }) => {

    const { Header, Content, Footer } = Layout;

    const logoutUser = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('Logout Succesfully')
        }).catch((error) => {
            // An error happened.
        });

    }

    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Link to={'/login'}>
                        <Menu.Item key="1">Login</Menu.Item>
                    </Link>
                    <Link to={'/signup'}>
                        <Menu.Item key="2">Signup</Menu.Item>
                    </Link>
                    <Menu.Item key="3" onClick={logoutUser}>Logout</Menu.Item>
                </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    {children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default Container