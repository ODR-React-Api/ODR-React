import React from 'react';
import {DialogContent, Grid} from '@mui/material';

import { Dialog1 } from '../../common/components/dialog';
import { SNACKS19_1 ,SNACKS19_2} from '../../common/constants/constant';
import { ColorWidthButton1, ColorWidthButton2 } from '../../common/components/ButtonCommon';
import '../assets/styles/S19.scss';

type propsType = {
  s19DiologOpen:boolean, 
  closeModalS17:(flg:string)=>void,
  closeModal:()=>void,
  data:{
      S17_2_checkBox: string[],
      S17_2_textArea:  string,
      PayAmount: string,
      CounterClaimPayment: string,
      PaymentEndDate: string,
      ShipmentPayType: string,
      SpecialItem: string,
      FileUrl: string,
    }
}
  // ポップアップ具体の表示
function S19 (props: propsType)  {
  
    const {closeModal, s19DiologOpen, data, closeModalS17} = props;        // S17画面から取得パラメータ
    const newArray = [...data.S17_2_checkBox];
    const newArray1 = data.S17_2_textArea;
    const statusFlg:string = "2";
    
    // ポップアップ具体の表示
    function  handleClickSecond ()  {
 
      //自動生成GIUD
      const  id = "55555";
      //セッション情報のPlatformId
      const  PlatformId = "55555";
      //セッション情報のCaseId
      const  CaseId = "55555";
       //セッション情報のStatus
      const  Status = "55555";
      //セッション情報のExpectResloveTypeValue
      const  ExpectResloveTypeValue = "55555";
      //セッション情報のOtherContext
      const  OtherContext = "55555";
      //セッション情報のHtmlContext
      const  HtmlContext = "55555";
      //セッション情報のHtmlContext2
      const  HtmlContext2 = "55555";
      //セッション情報のCounterClaimPayment
      const  CounterClaimPayment = "55555";
      //セッション情報のUserId
      const  UserId = "55555";
      //セッション情報のAgreementDate
      const  AgreementDate = null;
      //セッション情報のAgreementDate
      const  DeleteFlag = "0";
      //セッション情報のLastModifiedDate
      const  LastModifiedDate = "555555";
      //セッション情報のLastModifiedBy
      const  LastModifiedBy = "555555";    
      
      //添付ファイル
      const  idfile = "555555"; 
      const  FileName = "555555";
      const  FileExtension = "555555";
      const  FileBlobStorageId = "555555";
      const  FileSize = "555555";
      const  RegisterUserId = "555555";
      const  Other01 = null;
      const  Other02 = null;
      const  Other03 = null;
      const  Other04 = null;
      const  Other05 = null;


      // システム期日と時間の取得
      const dateTime = new Date(); 
      const newDate = dateTime.toLocaleString();
      // 申立テーブル更新用データ
      const paramWa =  [newDate, id, PlatformId, CaseId, Status, ExpectResloveTypeValue, OtherContext, HtmlContext, 
        HtmlContext2, CounterClaimPayment, UserId, AgreementDate, DeleteFlag,LastModifiedDate, LastModifiedBy,
        data.FileUrl,data.PayAmount,data.PaymentEndDate,data.SpecialItem,data.SpecialItem];

      const paramTe =  [newDate, idfile, PlatformId, CaseId, FileName, FileExtension, FileBlobStorageId, 
        FileSize, RegisterUserId, Other01, Other02,Other03, Other04,Other05, 
        data.FileUrl,DeleteFlag,data.SpecialItem, LastModifiedBy];

      console.log('和解案：' + paramWa);
      console.log('添付ファイル：' + paramTe);
    };
    return (
      <div>
      <React.Fragment>
        <Dialog1
          open={s19DiologOpen}
          id="S19dialog"
        >
        <div style={{backgroundColor:'#7f7f7f', height:'47px', paddingTop:'5px'}}>
          { statusFlg === "1" ? 
              <ColorWidthButton2 style={{float:'right'}} variant="contained" color="success" onClick={() => {closeModal(); closeModalS17(SNACKS19_1);}}>和解案を提出</ColorWidthButton2>
            :
              <ColorWidthButton2 style={{float:'right'}} variant="contained" color="success" onClick={() => {handleClickSecond();closeModal(); closeModalS17(SNACKS19_2);}}>和解案を提出</ColorWidthButton2>
          }
          <ColorWidthButton1 style={{float:'right'}} variant="outlined" onClick={() => {closeModal();}}>修正する</ColorWidthButton1>
          </div> 
          <div className="tittle1">
            <h1>{"和解案"}</h1>
          </div>
        <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={10}>
                <div className="date1">和解日：</div>
              </Grid>
              <Grid item xs={2}>
                <div>2024年03月19日</div>
              </Grid>
              <Grid item xs={0.6}>
              </Grid>
              <Grid item xs={1}>
                <div className="tittle2">申立人：</div>
              </Grid>
              <Grid item xs={10}>
                <div >AA</div>
              </Grid>
              <Grid item xs={1.5}> 
              </Grid> 
              <Grid item xs={10.5}>
                <div >company</div>
              </Grid>
              <Grid item xs={0.6}>
              </Grid>
              <Grid item xs={1}>
                <div className="tittle2">相手方：</div>
              </Grid>
              <Grid item xs={10}>
                <div >BB</div>
              </Grid>
              <Grid item xs={1.5}> 
              </Grid> 
              <Grid item xs={10.5}>
                <div >company</div>
              </Grid>
            </Grid>
            <br></br> <br></br>
            <Grid container spacing={1}>
            <Grid item xs={0.5}> 
              </Grid> 
              <Grid item xs={10}>
                <div className="tittle4">セッション情報の案件cid：セッション情報の案件CaseTitle </div>
                <div className="tittle5">セッション情報の案件cid：セッション情報の案件CaseTitleセッション情報の「対応方法」の表示文言、セッション情報の「対応方法」の表示文言、</div>
              </Grid>
            </Grid>
            <br></br> <br></br>
            <Grid container spacing={2}>
              <Grid item xs={4.1}>
                <div className="tittle3">概要：</div>
              </Grid>
              <Grid item xs={5.7}>
                <div >{newArray.join(",")}</div>
              </Grid>
              <Grid item xs={4.1}>
                <div ></div>
              </Grid>
              <Grid item xs={5.7}>
                <div >{newArray1}</div>
              </Grid>
              <Grid item xs={4.1}>
                <div className="tittle3">申立て支払金額：</div>
              </Grid>
              <Grid item xs={5.7}>
                <div >{data.PayAmount}</div>
              </Grid>
              <Grid item xs={4.1}>
                <div className="tittle3">支払い期日：</div>
              </Grid>
              <Grid item xs={5.7}>
                <div >{data.CounterClaimPayment}</div>
              </Grid>
              <Grid item xs={4.1}>
                <div className="tittle3">返送時送料：</div>
              </Grid>
              <Grid item xs={5.7}>
                <div >{data.ShipmentPayType}</div>
              </Grid> 
              <Grid item xs={4.1}>
                <div className="tittle3">特記事項：</div>
              </Grid>
              <Grid item xs={5.7}>
                <div >{data.SpecialItem}</div>
              </Grid> 
              <Grid item xs={4.1}>
                <div className="tittle3">添付資料：</div>
              </Grid>
              <Grid item xs={5.7}>
                <div >{data.FileUrl}</div>
              </Grid> 
              <Grid item xs={4.1}>
                <div className="tittle3">再テスト_和解案拡張項目1：</div>
              </Grid>
              <Grid item xs={5.7}>
                <div >E</div>
              </Grid> 
              <Grid item xs={4.1}> 
                <div className="tittle3">再テスト_和解案拡張項目2：</div>
              </Grid>
              <Grid item xs={5.7}>
                <div >E</div>
              </Grid> 
              <Grid item xs={4.1}> 
                <div className="tittle3">再テスト_和解案拡張項目3：</div>
              </Grid>
              <Grid item xs={5.7}>
                <div >E</div>
              </Grid> 
            </Grid>
            <br></br>
            <Grid container spacing={1}>
              <Grid item xs={0.5}>
              </Grid>
              <Grid item xs={10}>
                <div className="table2">申立人および相手方は、申立人と相手方の間には、本件に関し、本和解案に定めるもののほかに何らの債権債務がないことを相互に確認する。</div>
                <br></br> <br></br>
              </Grid>
            </Grid>
        </DialogContent>
      </Dialog1>
    </React.Fragment>
    </div>
    );
  };
export default S19;