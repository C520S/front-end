import React ,{useState}from 'react';
import 'antd/dist/reset.css'
import { Typography,Space , Divider,Image,Button } from 'antd';
import { useNavigate} from "react-router-dom";
import { RollbackOutlined } from "@ant-design/icons"

import panda404 from '../Images/404Page.jpeg'


const NotFound = ()=>{
   //set the loading state to Button
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const { Title } = Typography;
    const onButtonClick = ()=>{
    
      // handle navigation to homePage
    setLoading(preValue => !preValue);
    setTimeout(() => {
    setLoading(preValue => !preValue)
    navigate('/')    
    }, 2000);
  }
   
    return (
        <>
         
          <Space direction='vertical' size='middle' style={{ display: 'flex', alignItems: 'center',justifyContent: 'center' ,backgroundColor :'  background-color: #ffffff'}}>
          <Divider style={{ borderStyle: 'none', borderColor: 'transparent' }}/>
          <Image width={400} src={panda404} alt= '404page' style={{boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)'}}/>
          <Title type= "danger">404 </Title> 
          <Title level={2}>Page Not Found </Title>
          <Button
          onClick={onButtonClick}
          loading={loading}
        shape= 'round'
          style={{backgroundColor: '#84d8fa' ,color:'#0c000a' ,fontStyle: 'bold',boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)'}}
          icon ={<RollbackOutlined />}
          >Go Home</Button>
          </Space>
        </>
    )
}

export default NotFound