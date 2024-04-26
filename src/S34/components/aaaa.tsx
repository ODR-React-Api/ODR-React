import React, { useState } from 'react';
import '../../App.css';
import { Link } from "react-router-dom";
import { LinearProgress, TextField } from '@mui/material';
import { FileAddOutlined } from '@ant-design/icons';

let showflg = 'none';
let showflg2 = 'none';
let FileName = "";

function HelloMessage(props: { name: any }) {
  return <h1>Hello {props.name}!</h1>;
}

function C01AA() {
  const [myArray, setMyArray] = useState<any>([]);
  function agentadd() {
    showflg = '';
    setMyArray([...myArray, '']);
  }
  function saveText(index: number, e: any) {
    let myArryBack = [...myArray];
    myArryBack.splice(index, 1, e.target.value);
    setMyArray([...myArryBack]);
  }
  function agentremove(index: number) {
    let myArryBack = [...myArray];
    if (index !== -1) {
      myArryBack.splice(index, 1);
    }
    setMyArray([...myArryBack]);
    if (myArryBack.length <= 0) {
      showflg = 'none';
    }
  }

  const [myArray2, setMyArray2] = useState<any>([]);

  function upload2() {
    showflg2 = '';
    let index = myArray2.length;
    setMyArray2([...myArray2, '']);

    let up = document.getElementById('upload2'+ (index-1).toString())
    if (up !== null) {
        up.dispatchEvent(new MouseEvent('click'))
    }
};

  const handleFileChange = (event: any) => {
    let myArryBack = [...myArray2];
    myArryBack.splice(myArray2.length-1, 1, event.target.value);
    setMyArray2([...myArryBack]);
};

  return (
    <div className='App'>
      <LinearProgress color="success" />
      <HelloMessage name='aaaaaa' />
      <Link to='/C02'> C02</Link>
      <div>
        <div style={{ display: showflg, marginLeft: '10%' }}>
          <ul>{
            myArray.map((item: string, index: number) => (
              <li key={index} style={{ listStyleType: 'none' }}>
                <span>代理人{index + 1}メールアドレス</span>
                <TextField id='agentemail' onChange={(e) => saveText(index, e)} value={item} /><br />
                <a onClick={() => agentremove(index)}>+ 代理人{index + 1}の削除</a>
              </li>
            ))
          }</ul>
        </div>
        <div style={{ marginLeft: '20%' }}>
          <a className='a-style' onClick={() => agentadd()} style={myArray.length >= 5 ? { display: 'none' } : {}}>+ 代理人の追加</a>
        </div>
      </div>
      <br></br>




      <div>
        <div style={{ display: showflg2, marginLeft: '10%' }}>
          <input id='upload2-1' type="file" onChange={handleFileChange} style={{ display: 'none' }} />
          <ul>{
            myArray2.map((item: string, index: number) => (
              <li key={index} style={{ listStyleType: 'none' }}>
                <span>ファイル{index + 1}：</span>
                <input id={`upload2${index}`} type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                <TextField style={{ width: 400, height: 70, marginBottom: 10, resize: "none"}} value={item}><FileAddOutlined /> </TextField>
              </li>
            ))
          }</ul>
        </div>
        <div style={{ marginLeft: '20%' }}>
          <a className='a-style' onClick={upload2} style={myArray2.length >= 10? { display: 'none' } : {}}>+ ファイルの追加</a>
        </div>
      </div>
    </div>
  )
}
export default C01AA;


