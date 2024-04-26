import '../assets/styles/S25.scss'
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogTitle, Grid, IconButton } from '@mui/material';
import axios from 'axios';
import React, { useRef, useState } from "react";
import '../mocks/mockJs_S25'
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import dayjs from 'dayjs';
import useCompToPDF from './generatePDF';
import { SNACKS25_1, SNACKS25_2 } from '../../common/constants/constant';
import { Dialog1, Dialog3 } from '../../common/components/dialog';
import { ColorWidthButton1 } from '../../common/components/ButtonCommon'
import { ColorWidthButton2 } from '../../common/components/ButtonCommon'


function MediationsAgree(props:{medOpen25:boolean,SessionEmail:string, mediaFlag25:(flg:string) =>void}) {
  const{medOpen25, SessionEmail, mediaFlag25}=props;
  console.log(medOpen25+':'+SessionEmail+':'+mediaFlag25);
  //契约日
  const [datenewformat, setDatenewformat] = useState('');
  // Button[拒否する]の表示・非表示(0:非表示　1:表示)
  const [btn1Sts, setBtn1Sts] = useState(0);
  // Button[合意する]の表示・非表示(0:非表示　1:表示)0
  const [btn2Sts, setBtn2Sts] = useState(0);
  // Button[確認]の表示・非表示(0:非表示　1:表示)0
  const [btn3Sts, setBtn3Sts] = useState(0);
  // Button[ダウンロード]の表示・非表示(0:非表示　1:表示)0
  const [btn4Sts, setBtn4Sts] = useState(0);
  //調停案データ,案件別個人情報リレーションデータ取得できない[申立人,相手方]の場合用
  const [open, setOpen] = React.useState(false);
  //調停案合意画面dialog开关用
  const [open25, setOpen25] = React.useState(false);
  //「調停案拒否確認ダイアログ」dialog开关用
  const [openD, setOpenD] = useState(false);
  //セッション情報：申立人制御/相手方制御
  //申立人制御:1   相手方制御:2
  const [petitionTraderFlg, setPetitionTraderFlg] = useState('');
  //システム日付
  const dateTime = new Date();
  //mock数据
  const [res, setRes] = React.useState<any>(null);
  const [loading,setLoading] = React.useState(true) 
  //調停案合意画面dialog关
  //BUtton「閉じる」
  const handleCloseS25 = () => {
    setOpen25(false);
    mediaFlag25('1')
  };
  //dialog「調停案が存在しません」关
  const handleClose = () => {
    setOpen(false);
    mediaFlag25('1')
  };
  //BUtton[拒否する]
  function handleDialogOpen() {
    setOpenD(true);
  };
  //BUtton「拒否する」の「キャンセル」
  function handleDialogClose() {
    setOpenD(false);
  };
  //BUtton「拒否する」の「拒否する」
  function allDialogClose() {
    setOpenD(false);
    setOpen25(false);
    mediaFlag25('1')
  };
  //BUtton「ダウンロード」
  const ref = useRef<HTMLDivElement>(null);
  const { exportPDF } = useCompToPDF({fileName:'S25PDF'});
  function download() {
    exportPDF(ref.current);
  }; 
//打开Snackbar，
  function handleSnackbarOpen(msgId:any){
    //BUtton「確認済みにする」押下処理
    if(msgId==='confirmedOK'){
        const updCaseStatusForAcceptData={
          Status:'7'
        }
        axios.post('/UpdMediationsStatus',updCaseStatusForAcceptData)
        .then(() =>{
            return;
        })
        mediaFlag25(SNACKS25_1)
    }else{
        //BUtton「合意する」押下処理
        const updCaseStatusForAcceptData={
          Status:'8'
        }
        axios.post('/UpdMediationsStatus',updCaseStatusForAcceptData)
        .then(() =>{
            return;
        })
        mediaFlag25(SNACKS25_2)
    }
  };

 React.useEffect(() =>{
  axios.get('/GetStatusS25')
     .then((response) =>{
      setRes(response.data.data)
      const dbData=response.data.data
      setLoading(false)

      console.log(res)
        //案件別個人情報リレーションデータ取得できない場合、エラー「調停案が存在しません」をダイアログで表示し、調停案合意画面を閉じる
        //調停案データ取得できない場合、エラー「調停案が存在しません」をダイアログで表示し、調停案合意画面を閉じる
        if((dbData.PetitionUserInfo_Email===''&&dbData.TraderUserEmail==='') || dbData.Status===''){
          setOpen(true)
        }else{
          setOpen25(medOpen25)
        }
        //契约日
        if(dbData.Status==='9'){
          setDatenewformat(dayjs(dbData.ResolutionDate).format('YYYY年MM月DD日'))  
        }else{
          setDatenewformat(dayjs(dateTime).format('YYYY年MM月DD日'))  
        }
        //セッション情報のEメールがPetitionUserInfo_Emailの場合：申立人制御に入る
        if(SessionEmail===dbData.PetitionUserInfo_Email){
          setPetitionTraderFlg('1');
          console.log('申立人制御flg:'+petitionTraderFlg)
          //申立人制御
          //Buttonの表示・非表示(0:非表示　1:表示)
          switch (dbData.Status) {
            case '1':
            case '3':
              setBtn1Sts(1)
              setBtn2Sts(1)
              setBtn3Sts(0)
              setBtn4Sts(0)
              break;
            case '4':
            case '8':
              setBtn1Sts(0)
              setBtn2Sts(0)
              setBtn3Sts(1)
              setBtn4Sts(0)
              break; 
            case '9':
              setBtn1Sts(0)
              setBtn2Sts(0)
              setBtn3Sts(0)
              setBtn4Sts(1)
              break;
            default:
              setBtn1Sts(0)
              setBtn2Sts(0)
              setBtn3Sts(0)
              setBtn4Sts(0)
          }
        //セッション情報のEメールがTraderUserEmailの場合：相手方制御に入る
        }else if(SessionEmail===dbData.TraderUserEmail){
          setPetitionTraderFlg('2');
          console.log('相手方制御flg:'+petitionTraderFlg)
          //相手方制御
          switch (dbData.Status) {
            case '1':
            case '2':
              setBtn1Sts(1)
              setBtn2Sts(1)
              setBtn3Sts(0)
              setBtn4Sts(0)
              break;
            case '4':
            case '7':
              setBtn1Sts(0)
              setBtn2Sts(0)
              setBtn3Sts(1)
              setBtn4Sts(0)
              break;
            case '9':
              setBtn1Sts(0)
              setBtn2Sts(0)
              setBtn3Sts(0)
              setBtn4Sts(1)
              break;
            default:
              setBtn1Sts(0)
              setBtn2Sts(0)
              setBtn3Sts(0)
              setBtn4Sts(0)
          }
        }
     })
    // eslint-disable-next-line react-hooks/exhaustive-deps
 },[])

if(res===null || res===undefined){
  return null
}else{
  return ( 
    <div>
      <Dialog3
        onClose={handleClose}
        open={open}
      >
        <DialogTitle>
          Warning
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        調停案が存在しません
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog3>
      <Dialog
        open={openD}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='dialogText'
      >
        <DialogContent>
          <div>
                <h2>調停案を拒否しますか?</h2>
                <h3>調停案が拒否された場合は、この時点で和解不成立として調停の手続きが終了します。</h3>
          </div>
        </DialogContent>
        <DialogActions>
          {/* <Button variant="outlined" color="inherit"  onClick={handleDialogClose} >キャンセル</Button>
          <Button variant="contained" color="success" onClick={allDialogClose}>拒否する</Button> */}
          <ColorWidthButton1 variant='outlined' onClick={handleDialogClose}>キャンセル</ColorWidthButton1>
          <ColorWidthButton2 variant='contained' color="success" onClick={allDialogClose}>拒否する</ColorWidthButton2>
        </DialogActions>
      </Dialog>      
      <Dialog1
          open={open25}
          onClose={handleCloseS25}
          id='S25'
      >
        <DialogContent>
            {loading === true ? 
              <Box sx={{ display: 'flex',alignItems: 'center',justifyContent: 'center',minHeight: '270px'}}>
                < CircularProgress/>
              </Box>:
            <div>
              <div id='headPart'>
                {/* {btn4Sts===1 && <Button style={{ float: 'right',marginTop:'5px',marginRight:'5px' }} variant="contained" color="success" onClick={() => download()}>ダウンロード</Button>}
                {btn3Sts===1 && <Button style={{ float: 'right',marginTop:'5px',marginRight:'5px' }} variant="contained" color="success" onClick={() => handleSnackbarOpen('confirmedOK')}>確認済みにする</Button>}
                {btn2Sts===1 && <Button style={{ float: 'right',marginTop:'5px',marginRight:'5px' }} variant="contained" color="success" onClick={() => handleSnackbarOpen('consensusOK')}>合意する</Button>}
                {btn1Sts===1 && <Button style={{ float: 'right',marginTop:'5px',marginRight:'5px', backgroundColor:"white" }} variant="outlined" color="inherit" onClick={() => handleDialogOpen()}>拒否する</Button>}
                <Button style={{ float: 'right',marginTop:'5px',marginRight:'5px', backgroundColor:"white" }} variant="outlined" color="inherit" onClick={() => handleCloseS25()}>閉じる</Button> */}
                {btn4Sts===1 && <ColorWidthButton2 variant='contained' color="success" style={{ float: 'right',marginTop:'5px'}} onClick={() => download()}>ダウンロード</ColorWidthButton2>}
                {btn3Sts===1 && <ColorWidthButton2 variant='contained' color="success" style={{ float: 'right',marginTop:'5px'}} onClick={() => handleSnackbarOpen('confirmedOK')}>確認済みにする</ColorWidthButton2>}
                {btn2Sts===1 && <ColorWidthButton2 variant='contained' color="success" style={{ float: 'right',marginTop:'5px'}} onClick={() => handleSnackbarOpen('consensusOK')}>合意する</ColorWidthButton2>}
                {btn1Sts===1 && <ColorWidthButton1 variant='outlined' style={{ float: 'right',marginTop:'5px', backgroundColor:"white" }} onClick={() => handleDialogOpen()}>拒否する</ColorWidthButton1>}
                <ColorWidthButton1 variant='outlined' style={{ float: 'right',marginTop:'5px', backgroundColor:"white" }} onClick={() => handleCloseS25()}>閉じる</ColorWidthButton1>
              </div>
              <div ref={ref}>
                <div className='tttle'>
                    <h1>調停案</h1>
                </div>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <div className='table1'>契約日：</div>
                  </Grid>
                  <Grid item xs={4}>
                    <div>{datenewformat}</div>
                  </Grid>
                  <Grid item xs={8}>
                    <div className='table1'>調停人：</div>
                  </Grid>
                  <Grid item xs={4}>
                    <div>{res.MediatorLastName}</div>
                  </Grid>
                  <Grid item xs={2}>
                    <div className='table2'>申立人：</div>
                  </Grid>
                  <Grid item xs={10}>
                    <div>{res.ClaimantLastName}</div>
                  </Grid>
                  <Grid item xs={2}>
                    <div className='table2'>相手方：</div>
                  </Grid>
                  <Grid item xs={10}>
                    <div>{res.RespondentLastName}</div>
                  </Grid>
                  <br /><br /><br />
                  <Grid item xs={2.4}>
                    <div className='table2'>{res.Cid}：</div>
                  </Grid>
                  <Grid item xs={9.6}>
                    <div>{res.CaseTitle}</div>
                  </Grid>
                  <Grid item xs={12}>
                    <div  className='table3'>{res.Note1}</div>
                  </Grid>
                  <br /><br /><br />
                  <Grid item xs={3.3}>
                    <div  className='table4'>概要：</div>
                  </Grid>
                  <Grid item xs={8.7}>
                    <div style={{maxWidth:'700px',wordBreak:'break-all'}}>{res.Summary}</div>
                  </Grid>
                  <Grid item xs={3.3}>
                    <div  className='table4'>申立て支払金額：</div>
                  </Grid>
                  <Grid item xs={8.7}>
                    <div>{res.payAmount}</div>
                  </Grid>
                  <Grid item xs={3.3}>
                    <div  className='table4'>反訴支払い金額：</div>
                  </Grid>
                  <Grid item xs={8.7}>
                    <div>{res.CountePayment}</div>
                  </Grid>
                  <Grid item xs={3.3}>
                    <div  className='table4'>支払い期日：</div>
                  </Grid>
                  <Grid item xs={8.7}>
                    <div>{res.PayLimitDate}</div>
                  </Grid>
                  <Grid item xs={3.3}>
                    <div  className='table4'>返送時送料：</div>
                  </Grid>
                  <Grid item xs={8.7}>
                    <div>{res.ReturningCost}</div>
                  </Grid>
                  <Grid item xs={3.3}>
                    <div  className='table4'>特記事項：</div>
                  </Grid>
                  <Grid item xs={8.7}>
                    <div>{res.SpecialNotes}</div>
                  </Grid>
                  <Grid item xs={3.3}>
                    <div  className='table4'>添付資料：</div>
                  </Grid>
                  <Grid item xs={8.7}>
                    <div style={{color:'#1976d2'}}>{res.Pdf}</div>
                  </Grid>
                  <br /><br /><br />
                  <Grid item xs={12}>
                    <div  className='table3'>{res.Note2}</div>
                  </Grid>
                </Grid>
              </div>
            </div> 
          }
        </DialogContent>
      </Dialog1>
    </div>
  )
  }
};

export default MediationsAgree;