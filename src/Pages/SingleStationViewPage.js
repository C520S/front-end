import React from "react";
import "antd/dist/reset.css";
import { Layout, Divider,  } from "antd";
import Header from "../Components/Header";

const SingleStationViewPage = ()=>{

    const { Content } = Layout;


    return (
        <>
        <Layout style={{ height: "100vh" }}>
        <Header />
        <Divider style={{ borderStyle: "none", borderColor: "transparent" }} />
        <Content>
            
            
        </Content>   
        </Layout>
        </>
    )
}

export default SingleStationViewPage