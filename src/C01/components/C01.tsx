import React from "react";
import '../assets/styles/C01.css'
import LoginHeader from "./LoginHeader";
import LoginFooter from "./LoginFooter";
import LoginMain from "./LoginMain";

function Login(props:any) {

  const handleUserInfo = (userInfo:any) => {
    props.saveUserInfo(userInfo)
  }
  
    return (
      <div className="main" >
        <LoginHeader />
        <LoginMain handleUserInfo={handleUserInfo}/>
        <LoginFooter />
      </div>

    )
}

export default Login;