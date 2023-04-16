import React from 'react';
import 'antd/dist/reset.css'
import { Layout} from 'antd';
import Header from '../Components/Header';

const HomePage = ()=>{
    const { Content } = Layout;
    return (
        <>
        <Layout>
        <Header/> 
        <Content>
           HomePage
        </Content>
        </Layout>
        
        </>
    )
}

export default HomePage