import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";


function MosTop() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Smart Judgementへようこそ</h1>
      <h1 className="MosTop">申立てトップ画面的内容</h1>
      <div>
        <Button onClick={() => navigate('/MosLogin')}>申立てを登録する</Button>
      </div>
    </div>
  )
}

export default MosTop;