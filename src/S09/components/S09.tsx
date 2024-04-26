import React, { useState } from 'react';
import { Box, InputAdornment, OutlinedInput } from '@mui/material';
import '../assets/styles/S09-style.css';
import '../mocks/mockS09.js'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../S08/mocks/mockjs'
import Step1 from '../../common/utils/step';
import '../../common/styles/step.css';
import { CircularProgress } from '@mui/material';
import PageHeader from '../../common/utils/pageHeader';
import { ColorWidthButton1,ColorWidthButton2 } from "../../common/components/ButtonCommon";

function MosContentConfirm() {
  //向S08返回数据
  const navigate = useNavigate();
  //接收S08数据
  const { state } = useLocation()
  //申立种类和希望解决方法取得
  const [comments, setComments] = useState([{ id: '', content: '' }]);
  const [solutions, setSolutions] = useState([{ id: '', content: '' }])
  //代理人是否为空
  const agentemails = state.data.agentemail.filter((item: string) => item !== '')

  let infor = state.data

  const [loading, setLoading] = React.useState(true)
  //申立种类和希望解决方法取得
  React.useEffect(() => {
    axios.get('/userInfor')
      .then((response) => {
        setComments(response.data.comments)
        setSolutions(response.data.solutions)
        setLoading(response.data.loading)
      })
      .catch((error) => {
        console.error('Error submitting the data: ', error);
      });
  }, [])
  //完了画面跳转
  function InsPetitionsData(e: any) {
    e.preventDefault();
    axios.post('/MosContentConf', state)
      .then((response) => {
        navigate('/MosDone')
      })
      .catch((error) => {
        console.error('Error submitting the data: ', error);
      });
  }

  // stepper的内容
  const list = [
    '入力',
    '確認',
    '完了',
  ]

  return (
    <div style={{ width: '100%' }} id='S09Form'>
      <PageHeader pageFlg={'1'} />
      {loading && (
        <Box sx={{
          width: '100%', height: '900px', alignItems: 'center', display: 'flex', justifyContent: 'center'
        }}>
          < CircularProgress />
        </Box>
      )}
      <form onSubmit={InsPetitionsData} style={{ display: loading === true ? 'none' : '' }}>
        <div className='div-left'>
          <span>申立て情報の確認</span>
        </div>
        <div>{<Step1 stepNum={1} steps={list} />}</div>
        <div style={{ backgroundColor: 'lightblue', width: '50%', marginLeft: '50px', height: '50px' }}>
          <span>入力内容を確認ください。よろしければ「登録する」ボタンをクリックしてください。</span>
        </div>
        <div className='div-left'>
          <span>購入された商品の情報をご入力ください</span>
        </div>
        <div className='div-top'>
          <span className='div-layout'>購入商品</span>
          <input className='input-width' style={{ width: '300px' }} name='commodity' disabled value={infor.commodity} />
        </div>
        <div className='div-top' style={{ display: infor.commodityid === '' ? 'none' : '' }}>
          <span className='div-layout'>商品ＩＤ</span>
          <div style={{ display: 'inline-flex' }}>
            <input className='input-width' name='commodityid' disabled value={infor.commodityid} />
          </div>
        </div>
        <div className='div-top'>
          <span className='div-layout'>購入日</span>
          <input className='input-width' name='commodityDate' disabled value={infor.commoditydate} />
        </div>
        <div className='div-top'>
          <span className='div-layout'>購入金額</span>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            name='purchaseamount' value={infor.purchaseamount}
            style={{ width: '208px', height: '20px', paddingLeft: '5px', borderRadius: '2px', backgroundColor: 'rgb(118 118 118 / 6%)' }}
            disabled />
        </div>
        <div className='div-top' style={{ display: infor.sellingelementname === '' ? 'none' : '' }}>
          <span className='div-layout'>販売元名称</span>
          <input className='input-width' name='sellingelementname' disabled value={infor.sellingelementname} />
        </div>
        <div className='div-top' style={{ display: infor.sellerURL === '' ? 'none' : '' }}>
          <span className='div-layout' >販売者ＵＲＬ</span>
          <div style={{ display: 'inline-flex' }}>
            <input className='input-width' name='sellerURL' disabled value={infor.sellerURL} />
          </div>
        </div>
        <div className='div-top'>
          <span className='div-layout'>販売元メールアドレス</span>
          <div style={{ display: 'inline-flex' }}>
            <input className='input-width' name='sellingelementemail' disabled value={infor.sellingelementemail} />
          </div>
        </div>
        <div className='layout-span'>
          <div style={{ float: 'left', height: '200px' }}>
            <span className='div-layout'>申立ての種類</span>
          </div>
          <div style={{ height: '200px' }}>
            <ul>
              {
                comments.map(item => (
                  <li key={item.id} style={{ listStyleType: 'none' }}>
                    <input type='checkbox' name='petitionKind' checked={infor.petitionKind.includes(item.content) ? true : false} disabled />
                    <span className='input-font'>{item.content}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className='layout-span'>
          <div style={{ height: '100xpx', textAlign: 'center', float: 'left' }}>
            <span className='div-layout'>申立て内容</span>
          </div>
          <div>
            <textarea style={{ width: '300px', height: '50px' }} name='petitioncontent' disabled value={infor.petitioncontent}></textarea>
          </div>
        </div>
        <div className='div-top'>
          <span className='div-layout'>添付資料</span>
          <span>{infor.fileName}</span>
        </div>
        <div className='layout-span'>
          <div style={{ float: 'left', height: '100px' }}>
            <span className='div-layout'>希望する解決方法</span>
          </div>
          <div style={{ height: '100px' }}>
            <ul>
              {
                solutions.map(item => (
                  <li key={item.id} style={{ listStyleType: 'none' }}>
                    <input type='checkbox' name='desiredsolutions' checked={infor.desiredsolutions.includes(item.content) ? true : false} disabled />
                    <span className='input-font'>{item.content}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <div style={{ display: infor.useother.length === 0 ? 'none' : '' }}>
          <ul>
            {
              infor.useother.map((item: any, index: number) => (
                <li key={item.id} style={{ listStyleType: 'none', marginTop: '10px', display: index >= 5 ? 'none' : '' }}>
                  <span className='div-layout'>{item.ItemType === '0' ? '文字列' : '数値'}{item.IsRequired === '0' ? '任意' : '必須'}{index + 1}</span>
                  <input className='input-width' name='userothers' value={item.content === '' ? 'なし' : item.content} disabled />
                </li>
              ))
            }
          </ul>
        </div>
        <div className='div-left'>
          <span>お問い合わせをされる方についての情報</span>
        </div>
        <div style={{ marginTop: '10px' }}>
          <span className='div-layout'>所属会社</span>
          <input style={{ width: '355px' }} name='usercompany' value={infor.userinfor.usercompany} disabled /><br />
          <span className='div-layout'>氏名</span>
          <input name='userfirstname' value={infor.userinfor.userfirstname} disabled />
          <input style={{ marginLeft: '10px' }} name='userlastname' value={infor.userinfor.userlastname} disabled /><br />
          <span className='div-layout'>氏名（カナ）</span>
          <input name='userkanafirstname' value={infor.userinfor.userkanafirstname} disabled />
          <input style={{ marginLeft: '10px' }} name='userkanalastname' value={infor.userinfor.userkanalastname} disabled /><br />
          <span className='div-layout'>メールアドレス</span>
          <input style={{ width: '355px' }} name='useremail' value={infor.userinfor.useremail} disabled /><br />
        </div>
        {
          agentemails.length !== 0 ? (<ul style={{ marginTop: '0px', marginLeft: '128px' }}>
            {
              agentemails.map((item: any, index: number) => (
                <li key={index} style={{ listStyleType: 'none', marginTop: '5px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 'bold' }}>代理人{index + 1}メールアドレス</span>
                  <input className='input-width' name='agentemail' value={item} disabled /><br />
                </li>
              ))
            }
          </ul>)
            : (< div style={{ marginTop: '0px', marginLeft: '260px' }}>
              <span style={{ fontSize: '13px', fontWeight: 'bold' }}>代理人</span>
              <span style={{ fontSize: '13px', fontWeight: 'bold', marginLeft: '5px' }}>なし</span>
            </div>)
        }
        <div className='div-top' style={{ marginLeft: '15%', width: '250px' }}>
            <ColorWidthButton2 variant="contained" color="success"
              style={{ float:'right', marginBottom: 10 }} type='submit'>登録する</ColorWidthButton2> 
            <ColorWidthButton1 variant="outlined" 
              style={{ float:'right',marginBottom: 10}} onClick={() => navigate('/MosLogin', { state: { infor } })}>戻る</ColorWidthButton1>
        </div>
      </form >
    </div >
  )

}

export default MosContentConfirm;