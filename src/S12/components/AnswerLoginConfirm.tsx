import React, { useState, useEffect } from 'react';
import '../mocks/mockS12';
import axios from "axios";
import '../assets/styles/AnswerConfirm.css';
import Step1 from '../../common/utils/step';
import '../../common/styles/step.css';
import Error1 from '../../common/utils/Error';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PageHeader from '../../common/utils/pageHeader';

function AnswerLoginConfirm(data: any) {

  // stepper的内容
  const list = [
    '入力',
    '確認',
    '完了',
  ]

  // msg内容
  const msg = [
    '入力内容をご確認ください。よろしければ「登録する」ボタンをクリックしてください。'
  ]

  const [res, setRes] = useState<any>(null);

  // mock数据
  useEffect(() => {
    axios.get('/getOdrUserInfo12')
      .then((response) => {
        setRes(response.data);
      })
  }, [])

  return (
    <div>
      <PageHeader pageFlg='0'></PageHeader>
      {res === null || res === undefined ? null :
        <div>
          <label className='label'>回答の確認</label><br />
          <label>以下の申立てに対する回答の入力をお願いします。</label>
          <div>{<Step1 stepNum={1} steps={list} />}</div>
          <div>{<Error1 errorId={1} errorNum={0} errorMsg={msg} />}</div>
          <div style={{ marginLeft: "70px", width: "300px" }}>
            <Accordion defaultExpanded style={{ width: "300%" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header">
                <label>画面設計更新用_返金</label>
              </AccordionSummary>
              <AccordionDetails>
                <table>
                  <tbody>
                    <tr>
                      <td className="Tbl-td">申立て番号</td>
                      <td className="Tble-td">{res.orderNo}</td>
                    </tr>
                    <tr className="Tble-tr">
                      <td className="Tbl-td">購入商品</td>
                      <td className="Tble-td">{res.userProduct}</td>
                    </tr>
                    <tr>
                      <td className="Tbl-td">商品ＩＤ</td>
                      <td className="Tble-td">{res.userProductId}</td>
                    </tr>
                    <tr className="Tble-tr">
                      <td className="Tbl-td">購入日</td>
                      <td className="Tble-td">{res.yMD}</td>
                    </tr>
                    <tr>
                      <td className="Tbl-td">購入金額</td>
                      <td className="Tble-td">${res.major.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr>
                    <tr className="Tble-tr">
                      <td className="Tbl-td">販売元</td>
                      <td className="Tble-td">{res.useTraderName}</td>
                    </tr>
                    <tr>
                      <td className="Tbl-td">販売元ＵＲＬ</td>
                      <td className="Tble-td">{res.useProductUrl}</td>
                    </tr>

                    <tr className="Tble-tr">
                      <td className="Tbl-td">申立ての種類</td>
                      <td className="Tble-td">{res.syurui}</td>
                    </tr>
                    <tr>
                      <td className="Tbl-td">申立て内容</td>
                      <td className="Tble-td">{res.naiyou}</td>
                    </tr>
                    <tr className="Tble-tr">
                      <td style={{ textAlign: "right", paddingLeft: "20px" }}>添付資料</td>
                      <td className="Tble-td">{res.sirou}</td>
                    </tr>
                    <tr>
                      <td className="Tbl-td">希望する解決方法</td>
                      <td className="Tble-td">{res.houho}</td>
                    </tr>
                    <tr className="Tble-tr">
                      <td className="Tbl-td">申立人</td>
                      <td className="Tble-td">{res.hoto}</td>
                    </tr>
                    <tr>
                      <td className="Tbl-td">申立代理人1</td>
                      <td className="Tble-td">{res.dairiHito}</td>
                    </tr>
                  </tbody>
                </table>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      }
    </div>)
}

export default AnswerLoginConfirm;
