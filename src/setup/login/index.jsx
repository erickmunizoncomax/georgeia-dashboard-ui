import React from 'react'
import { Button, Col, Form, Row, Tab, Tabs } from 'react-bootstrap'
import "./index.css";
import LandingFrame from '../../assets/images/GroupFrame.png';
import Complogo from '../../assets/images/k12logo.png';
import Loginlogo from '../../assets/brands/geogia_img-one.png';
import googleLogo from '../../assets/images/googleLogo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'




const LogIn = (props) => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    // event.preventDefault();
    console.log('Login is Done')
    navigate('/dashboard')
    // Add code here to handle form submission (e.g. sending login credentials to server)
  }




  return (
    <>
      <div className='grid grid-cols-12 loginLeft p-0 logindashboard' style={{ width: "100vw", height: '100vh' }}>
        <div className='col-span-6 flex'>
          <div className='loginmain_div'>
            <img className='Loginlogo mb-[2rem]' src={Loginlogo} />
            <h1 className='login_title'>Welcome To GPS<br></br>Executive Dashboard</h1>
            <h4 className='login_titlebottom mb-3 mt-3'>Empowering School Districts with Comprehensive Insights</h4>
            <img className='landingFrame' src={LandingFrame} />
          </div>
        </div>
        <div className='col-span-6'>
          <div className='login_action_div'>
            {/* <p className='loginName'>Login</p>
            <p className='loginDes'>Provide your credentials to proceed, Please.</p> */}
            <div className="logoSignIn my-4">
              {/* <link href='/'>
              <button className="login-button-azure" >
                <img src={googleLogo} className="googleLogo is-mar-right-2 " />
                <span className="sigin-text">Sign in with Google</span>
              </button>
              </link> */}
              <div className="logoSignIn my-4">               
                <button className="login-button-azure" onClick={handleSubmit}>
                  <img src={googleLogo} className="googleLogo is-mar-right-2 " />
                  <span className="sigin-text">Explore More</span>                 
                </button>
              </div>
            </div>
          </div>
        </div>
        <img className='complogo' src={Complogo} />
      </div>
    </>
  )
}
export default LogIn