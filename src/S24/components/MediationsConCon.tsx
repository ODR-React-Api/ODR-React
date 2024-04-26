import * as React from 'react';
import DialogContent from '@mui/material/DialogContent';
import '../assets/styles/S24.scss';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import '../mocks/mockS24';
import dayjs from 'dayjs';
import { SNACKS24_1 } from '../../common/constants/constant';
import { Box, CircularProgress } from '@mui/material';
import { Dialog1 } from '../../common/components/dialog';
import { ColorWidthButton1 } from '../../common/components/ButtonCommon'
import { ColorWidthButton2 } from '../../common/components/ButtonCommon'


let Mediator1:string;
let Mediator2:string;
let Claimant1:string;
let Claimant2:string;
let Respondent1:string;
let Respondent2:string;
let shipmentPayType:string
function MediationsConCon (props:{medOpen:boolean,content:any, mediaFlag:(flg:string) =>void}){
 const {medOpen, content, mediaFlag}=props
 console.log(medOpen)
 console.log(content)
 console.log(mediaFlag)
 // S22画面から取得した支払い期日
 let paymentEndDate = dayjs(content.PaymentEndDate).format('YYYY年MM月DD日');
 //S22画面から取得した概要
 let expectResloveType = content.ExpectResloveTypeValue.toString()
 expectResloveType=expectResloveType.replace(1,'テスト削除します。')
 expectResloveType=expectResloveType.replace(2,'商品交換')
 expectResloveType=expectResloveType.replace(3,'全額返金')
 expectResloveType=expectResloveType.replace(4,'一部返金')
 expectResloveType=expectResloveType.replace(5,'代行品発送')
 expectResloveType=expectResloveType.replace(99,content.OtherContext)
 expectResloveType=expectResloveType.replaceAll(',','、')
 //S22画面から取得した返送時送料
 if (content.ShipmentPayType ==='1'){
    shipmentPayType = '申立人が支払う'
 }else if (content.ShipmentPayType ==='2'){
    shipmentPayType = '相手方が支払う'
 }else {
    shipmentPayType = '返送なし'
 }

 const InsMediations={
    ActionType:'NewMediation',
    CaseStage:7,
    DeleteFlag:0,
    Status:1
 }
  //システム日付
  const dateTime = new Date();
  let datenewformat = dayjs(dateTime).format('YYYY年MM月DD日'); 
  //S24_調停案内容確認画面Dialog组件使用变量和方法
  const [open, setOpen] = React.useState(medOpen);
  console.log(open)
  //S24_調停案内容確認画面Dialog关
  const handleClose = () => {
    setOpen(false);
    mediaFlag('1');
  };
  //mockjs中获取数据(調停案データ取得)
  const [res, setRes] = React.useState<any>(null);
  const [loading,setLoading] = React.useState(true); 
  React.useEffect(() =>{
    axios.get('/GetMediationsWithoutFile')
    .then((response) => {
        console.log(response.data.data);
        setRes(response.data.data);
        console.log(res)
        setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
    //[調停案を提出]ボタンを押下
    function SnackbarWithCloseButton () {
    mediaFlag(SNACKS24_1);
    axios.post('/InsMediationsHistories',InsMediations)
        .then(() => {
        return("更新登録完了")
        })
    }

    if(res===null || res===undefined){
        return null
    }else{
        //調停人
        //言語が日本語の場合
        if(res.LanguageFlg === 1){
            //所属会社あるの場合　1行目=所属会社　　2行目= LastName + FirstName
            if(res.MediatorCompany !==''){
                Mediator1=res.MediatorCompany;
                Mediator2=res.MediatorLastName+res.MediatorFirstName;
            //所属会社なしの場合　1行目= LastName + FirstName
            }else{
                Mediator1=res.MediatorLastName+res.MediatorFirstName;
            }
        //言語が英語の場合
        }else{
            //所属会社あるの場合　1行目=所属会社   2行目= FirstName + MiddleName +  LastName
            if(res.MediatorCompany!==''){
                Mediator1=res.MediatorCompany;
                Mediator2=res.MediatorFirstName+res.MediatorMiddleName+res.MediatorLastName;
            //所属会社なしの場合　1行目= FirstName + MiddleName +  LastName
            }else{
                Mediator1=res.MediatorFirstName+res.MediatorMiddleName+res.MediatorLastName;
            }
        }
        //申立人
        //言語が日本語の場合 1行目=所属会社　　2行目= LastName + FirstName
        if(res.LanguageFlg === 1){
            Claimant1=res.ClaimantCompany;
            Claimant2=res.ClaimantLastName+res.ClaimantFirstName;
        //言語が英語の場合 1行目=所属会社   2行目= FirstName + MiddleName +  LastName
        }else{
            Claimant1=res.ClaimantCompany;
            Claimant2=res.ClaimantFirstName+res.ClaimantMiddleName+res.ClaimantLastName;
        }
        //相手方
        //言語が日本語の場合
        if(res.LanguageFlg === 1){
            //所属会社あるの場合　1行目=所属会社　　2行目= LastName + FirstName
            if(res.RespondentCompany!==''){
                Respondent1=res.RespondentCompany;
                Respondent2=res.RespondentLastName+res.RespondentFirstName;
            //所属会社なしの場合　1行目= LastName + FirstName
            }else{
                Respondent1=res.RespondentLastName+res.RespondentFirstName;
            }
        //言語が英語の場合
        }else{
            //所属会社あるの場合　1行目=所属会社   2行目= FirstName + MiddleName +  LastName
            if(res.RespondentCompany!==''){
                Respondent1=res.RespondentCompany;
                Respondent2=res.RespondentFirstName+res.RespondentMiddleName+res.RespondentLastName;
            //所属会社なしの場合　1行目= FirstName + MiddleName +  LastName
            }else{
                Respondent1=res.RespondentFirstName+res.RespondentMiddleName+res.RespondentLastName;
            }
        }
        return (
            <React.Fragment>
                <Dialog1
                    open={open}
                    onClose={handleClose}
                    className='S24'
                > 
                    <DialogContent>
                     <div>
                        <div className='bbtton'>
                                {res.Status ===0 || res.Status ===1 ?
                                <div>
                                    {/* <Button variant="contained" color="success" onClick={SnackbarWithCloseButton} style={{ float: 'right',marginTop:'5px',marginRight:'5px'}}>
                                        調停案を提出
                                    </Button> */}
                                    <ColorWidthButton2 variant='contained' color="success" style={{ float: 'right',marginTop:'5px'}} onClick={SnackbarWithCloseButton}>調停案を提出</ColorWidthButton2>
                                    {/* <Button variant="outlined" color="inherit" onClick={handleClose} style={{ float: 'right',backgroundColor:"white", marginTop:'5px',marginRight:'5px'}}>
                                        修正する
                                    </Button> */}
                                    <ColorWidthButton1 variant='outlined' style={{ float: 'right',marginTop:'5px', backgroundColor:"white" }} onClick={handleClose}>修正する</ColorWidthButton1>
                                    {/* <Button variant="outlined" color="inherit" onClick={handleClose} style={{ float: 'right',backgroundColor:"white", marginTop:'5px',marginRight:'5px'}}>
                                        閉じる
                                    </Button>     */}
                                    <ColorWidthButton1 variant='outlined' style={{ float: 'right',marginTop:'5px', backgroundColor:"white" }} onClick={handleClose}>閉じる</ColorWidthButton1>
                                </div> :
                                <div>
                                    {/* <Button variant="outlined"  color="inherit" onClick={handleClose} style={{ float: 'right',backgroundColor:"white", marginTop:'5px',marginRight:'5px'}}>
                                        閉じる
                                    </Button> */}
                                    <ColorWidthButton1 variant='outlined' style={{ float: 'right',marginTop:'5px', backgroundColor:"white" }} onClick={handleClose}>閉じる</ColorWidthButton1>
                                </div>
                                }
                        </div> 
                        <div className='Title'>
                            <h1>調停案</h1>
                        </div>
                        {loading === true ? 
                            <Box sx={{ display: 'flex',alignItems: 'center',justifyContent: 'center',minHeight: '270px'}}>
                              < CircularProgress/>
                            </Box>:
                            <Grid container spacing={2}>
                                <Grid item xs={9}>
                                    <div className='Table1'>契約日：</div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div>{datenewformat}</div>
                                </Grid>
                                <Grid item xs={9}>
                                    <div className='Table1'>調停人：</div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div>{Mediator1}</div>
                                </Grid>
                                <Grid item xs={9}>
                                    <div className='Table1'></div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div>{Mediator2}</div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className='Table2'>申立人：</div>
                                </Grid>
                                <Grid item xs={10}>
                                    <div>{Claimant1}</div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className='Table2'></div>
                                </Grid>
                                <Grid item xs={10}>
                                    <div>{Claimant2}</div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className='Table2'>相手方：</div>
                                </Grid>
                                <Grid item xs={10}>
                                    <div>{Respondent1}</div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className='Table2'></div>
                                </Grid>
                                <Grid item xs={10}>
                                    <div>{Respondent2}</div>
                                </Grid>
                                <br /><br /><br />
                                <Grid item xs={2.4}>
                                    <div className='Table2'>{res.Cid}：</div>
                                </Grid>
                                <Grid item xs={9.6}>
                                    <div>{res.CaseTitle}</div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div  className='Table3'>{res.Note1}</div>
                                </Grid>
                                <br /><br /><br />
                                <Grid item xs={3.3}>
                                    <div  className='Table4'>概要：</div>
                                </Grid>
                                <Grid item xs={8.7}>
                                    <div style={{maxWidth:'700px',wordBreak:'break-all'}}>{expectResloveType}</div>
                                </Grid>
                                <Grid item xs={3.3}>
                                    <div  className='Table4'>申立て支払金額：</div>
                                </Grid>
                                <Grid item xs={8.7}>
                                    <div>{content.PayAmount}</div>
                                </Grid>
                                <Grid item xs={3.3}>
                                    <div  className='Table4'>反訴支払い金額：</div>
                                </Grid>
                                <Grid item xs={8.3}>
                                    <div>{content.CounterClaimPayment}</div>
                                </Grid>
                                <Grid item xs={3.3}>
                                    <div  className='Table4'>支払い期日：</div>
                                </Grid>
                                <Grid item xs={8.7}>
                                    <div>{paymentEndDate}</div>
                                </Grid>
                                <Grid item xs={3.3}>
                                    <div  className='Table4'>返送時送料：</div>
                                </Grid>
                                <Grid item xs={8.7}>
                                    <div>{shipmentPayType}</div>
                                </Grid>
                                <Grid item xs={3.3}>
                                    <div  className='Table4'>特記事項：</div>
                                </Grid>
                                <Grid item xs={8.7}>
                                    <div>{content.SpecialItem}</div>
                                </Grid>
                                <Grid item xs={3.3}>
                                    <div  className='Table4'>添付資料：</div>
                                </Grid>
                                <Grid item xs={8.7}>
                                    <div style={{color:'#1976d2'}}>{content.FileName}</div>
                                </Grid>
                                <br /><br /><br />
                                <Grid item xs={12}>
                                    <div  className='Table3'>{res.Note2}</div>
                                </Grid>
                            </Grid>
                        }
                     </div> 
                    </DialogContent>
                </Dialog1>
            </React.Fragment>
        );
    }
}
export default MediationsConCon