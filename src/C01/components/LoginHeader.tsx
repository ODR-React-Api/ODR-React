import React from "react"
class LoginHeader extends React.Component{
    render() {
        return  (
            <div className="headerdiv">
              <h1 style={{textAlign:"center"}}>今回のお取引において、<br/>お困りのことがありますでしょうか？</h1>
              <p style={{textAlign:"center"}}>Smart Judgementを利用して問題解決を試みたい方はログインをお願いいたします。</p>
            </div>
        )
  }
}
export default LoginHeader;