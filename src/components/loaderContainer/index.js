import React from "react";
import { Layout, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';


const { Content } = Layout; 
const antIcon = <LoadingOutlined style={{ fontSize: 40,fontWeight:1000}} spin />;

const LoaderContainer = (props) => {  
  const {cssClass} = props;
  return (
    <>
      {/* <Layout> */}
        <Spin style={{color:"#e5e7eb"}} 
        indicator={antIcon} 
        // tip="Loading..." 
        spinning={props.loading||false}>
          <div className={cssClass || "contentBackground"}>
            <Content>{props.children}</Content>
          </div>
        </Spin>
      {/* </Layout> */}
    </>
  );
};



export default LoaderContainer;

// export default Container;
