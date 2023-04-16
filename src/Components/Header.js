import React from 'react';
import 'antd/dist/reset.css'
import { useNavigate} from "react-router-dom";
import {Layout,Menu } from 'antd';
import { HomeOutlined,RadarChartOutlined,BarChartOutlined  } from '@ant-design/icons'

const Header = ()=>{
    const navigate = useNavigate()

    const { Header} = Layout;
   
    // handle navigation 
    const navigateToAllPages = ({key})=>{
        navigate(key)
    }
    return <>
    <Header>
     <Menu
     onClick={navigateToAllPages}
     items={[
        {label:'Home' , key: "/",icon:<HomeOutlined />},
        {label:'Journeys', key: "/journeys",icon:<RadarChartOutlined />},
        {label:'Stations', key: "/stationList",icon:<BarChartOutlined />},
      
       ]}
       mode= 'horizontal'  
       theme ='dark'
       style={{ display: 'flex', justifyContent: 'center' }}
     >
    </Menu>
    </Header>
    
    </>

}

export default Header;