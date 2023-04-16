import React ,{useState}from 'react';
import 'antd/dist/reset.css'
import { Typography,Space , Divider,Image,Button } from 'antd';
import { useNavigate} from "react-router-dom";
import { RollbackOutlined } from "@ant-design/icons"

import panda404 from '../Images/404Page.jpeg'


const NotFound = ()=>{
   
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const { Title } = Typography;
    const onButtonClick = ()=>{
    
    setLoading(preValue => !preValue);
    setTimeout(() => {
    setLoading(preValue => !preValue)
    navigate('/')    
    }, 2000);
  }
   
    return (
        <>
         
          <Space direction="vertical" size="middle" style={{ display: 'flex', alignItems: 'center',justifyContent: 'center' }}>
          <Divider style={{ borderStyle: 'none', borderColor: 'transparent' }}/>
          <Image width={400} src={panda404}/>
          <Title type= "danger">404 </Title> 
          <Title level={2}>Page Not Found </Title>
          <Button
          onClick={onButtonClick}
          loading={loading}
        shape= 'round'
          style={{backgroundColor: '#84d8fa' ,color:'#0c000a' ,fontStyle: 'bold'}}
          icon ={<RollbackOutlined />}
          >Go Home</Button>
          </Space>
        </>
    )
}

export default NotFound