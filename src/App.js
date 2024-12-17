import logo from './logo.svg';
import './App.css';
import RouteComponent from './setup/route.component';
import LogIn from "./setup/login";
import { useEffect, useLayoutEffect, useState } from 'react';
import { useGoogleLogin} from '@react-oauth/google';
import { Modal } from 'antd';
import { fetchAuthenticate_Users } from './redux/slices/counter';
import { useDispatch, useSelector } from 'react-redux';

const Login = (props) => {
 
  useEffect(()=>{
    if(props.isLoggedIn==false&&props.userInfo!=null){ props.setIsModalOpen(true)}
  },[props. isLoggedIn,props.userInfo])

  const login =  useGoogleLogin({
    onSuccess: tokenResponse  => {     
      fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token="${tokenResponse.access_token }".`) 
    .then(response => response.json())
    .then(data=> {sessionStorage.setItem("userInfo",JSON.stringify(data));props.setUserData(data)}) 
    .then(data=> {}) 
    
    
    .catch(error => console.log(error));
    },  
    onError: () => {
      console.log('Login Failed');
    },
    
  });
 const handleLogin=()=>{

 }
  
  
  return (
    <> 
    <LogIn  login={login} />
    
    <Modal title="Alert Information" open={props.isModalOpen}  onCancel={()=> props.setIsModalOpen(false)}  footer={null}>
        <p>Please contact your administrator for access to the dashboard...</p>
        
      </Modal>      
    </>
  );
};



const MainContent = () => { 
  const dispatch=useDispatch()
  const Authenticate_Usersdata = useSelector(state => state.netsales.Authenticate_Users);
  const Authenticate_UsersdataLoading = useSelector(state => state.netsales.Authenticate_Usersloading)
  const[userData,setUserData]=useState({}) 
  const[userInfo,setUserInfo]=useState(JSON.parse(sessionStorage.getItem("userInfo")))  
  const [isModalOpen, setIsModalOpen] = useState(false);
  let userEmail=userInfo&&userInfo.email
  // const [isLoggedIn,setIsLoggedIn] = useState(false)
  const isLoggedIn = Authenticate_Usersdata.some(user => user.USERID === userEmail);
  // console.log('isLoggedIn: ', isLoggedIn,userInfo);

  useLayoutEffect(()=>{
    setUserInfo(JSON.parse(sessionStorage.getItem("userInfo")))
    
  },[userData])
 
  useEffect(()=>{
    dispatch(fetchAuthenticate_Users({
      "elasticQueryName": "Authenticate_Users",
      "filters": [
      ],
      "dynamicColumns": [],
    }));
  },[])
 



  return (
    <div  >  
      {console.log("isLoggedIn",isLoggedIn)}
      {/* <RouteComponent setUserData={setUserData}/>       */}
       {/* <Login  setUserData={setUserData} 
                isModalOpen={isModalOpen} 
                setIsModalOpen={setIsModalOpen}
                isLoggedIn={isLoggedIn} 
                onSubmitLogin ={() => {
                  setIsLoggedIn(true)
                }}
                userInfo={userInfo}/> */}
       {/* { isLoggedIn?<RouteComponent setUserData={setUserData}/>
       : Authenticate_UsersdataLoading?null: <Login setUserData={setUserData} 
                isModalOpen={isModalOpen} 
                setIsModalOpen={setIsModalOpen}
                isLoggedIn={isLoggedIn} 
                userInfo={userInfo}/>} */}
               
          <RouteComponent/>
    </div >
  );
};

export function App() {

  return (    
        <MainContent />   
  )
}

export default App;
