import React, { useRef, useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Button, Grid, CircularProgress } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import useCompToPDF from './useCompToPDF'
import '../mocks/mock';
import axios from 'axios';
import '../assets/styles/S20.scss';
import { Dialog1 } from '../../common/components/dialog';


interface ChildProps {
    props1: boolean;
    props2: boolean;
    props3: boolean;
    onReturnClick: (val1: boolean, val2: string, val3: boolean, val4: boolean) => void;
}

const S20 = ({ props1, props2, props3, onReturnClick }: ChildProps) => {
    const [dailogOpen, setDailogOpen] = useState(props1);//控制dialog开关
    const [refuseDailogOpen, setRefuseDailogOpen] = useState(false);//控制refusedialog开关
    const agreeState = props3;//是否已经同意
    const ref = useRef<HTMLDivElement>(null);
    const { exportPDf } = useCompToPDF({ fileName: '和解案合意書' });
    const [reconciliateDate, setReconciliateDate] = useState('');
    const [selectedOptions, setSelectedOptions] = useState('');
    const [payAmount, setPayAmount] = useState();
    const [counterClaimPayment, setCounterClaimPayment] = useState();
    const [paymentEndDate, setPaymentEndDate] = useState('');
    const [shipmentPayType, setShipmentPayType] = useState('');
    const [specialItem, setSpecialItem] = useState('');
    const [fileName, setFileName] = useState('');
    const [company1, setCompany1] = useState('');
    const [company2, setCompany2] = useState('');
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [caseId, setCaseId] = useState('');
    const [caseName, setCaseName] = useState('');
    const [radioContent, setRadioContent] = useState('');


    const handleRefuseDailogClose = () => {
        setRefuseDailogOpen(false)
    }

    const handleRefuseDailogOpen = () => {
        setRefuseDailogOpen(true)
    }
    //和解案合意按钮
    const handleAgreeClick = () => {
        setDailogOpen(false)
        onReturnClick(false, '合意する', false, false)
    }
    //和解合意書确认按钮
    const handleAgreeClick2 = () => {
        setDailogOpen(false)
        onReturnClick(false, '確認済みにする', false, true)
    }
    const handleClose = () => {
        setDailogOpen(false)
        onReturnClick(false, '', false, false)
    }
    const radioChange = (val: { target: { value: React.SetStateAction<string>; }; }) => {
        setRadioContent(val.target.value)
    }
    //决意点击事件
    const handleFixClick = () => {
        if (radioContent === '対案を作成する') {
            console.log('跳转17')
            setDailogOpen(false)
            onReturnClick(false, '', true, false)
        } else {
            console.log('给其他人发email')
            setDailogOpen(false)
            onReturnClick(false, '', false, false)
        }
    }

    useEffect(() => {
        axios.get('/getNegotiatConInfo')
            .then(response => {
                console.log(response.data)
                setReconciliateDate(response.data.reconciliateDate)
                setSelectedOptions(response.data.selectedOptions)
                setPayAmount(response.data.PayAmount)
                setCounterClaimPayment(response.data.CounterClaimPayment)
                setPaymentEndDate(response.data.PaymentEndDate)
                setShipmentPayType(response.data.ShipmentPayType)
                setSpecialItem(response.data.SpecialItem)
                setFileName(response.data.FileName)
                setCompany1(response.data.company1)
                setCompany2(response.data.company2)
                setName1(response.data.name1)
                setName2(response.data.name2)
                setCaseId(response.data.caseId)
                setCaseName(response.data.caseName)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    const isButtonDisabled = radioContent === '';


    return (
        <div ref={ref} style={{ padding: 10 }}>
            <div>
                {
                    props2 ?
                        <Dialog1
                            onClose={handleClose}
                            open={dailogOpen}
                        >

                            <DialogContent>
                                <div id='S20'>
                                <div className='button'>
                                            <Button variant="contained" className='button1' color="success" onClick={handleAgreeClick} style={{ marginTop: '5px', marginRight: '5px' }}>
                                                合意する
                                            </Button>
                                            <Button variant="outlined" className='button1' color="inherit" onClick={handleRefuseDailogOpen} style={{ backgroundColor: "white", marginTop: '5px', marginRight: '5px' }}>
                                                拒否する
                                            </Button>
                                            <Button variant="outlined" className='button1' color="inherit" onClick={handleClose} style={{ backgroundColor: "white", marginTop: '5px', marginRight: '5px' }}>
                                                閉じる
                                            </Button>
                                    </div>
                                    {selectedOptions === '' ? <div className='center-20'><CircularProgress /></div> :
                                        <div>
                                            <div className='Title'>
                                                <h1>和解案</h1>
                                            </div>
                                            <Grid container spacing={2}>
                                                <Grid item xs={10}>
                                                    <div className='table1'>和解日：</div>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <div>{reconciliateDate}</div>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <div className='table2'>申立人：</div>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <div>{company1}</div>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <div className='table2'></div>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <div>{name1}</div>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <div className='table2'>相手方：</div>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <div>{company2}</div>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <div className='table2'></div>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <div>{name2}</div>
                                                </Grid>
                                                <br /><br /><br />
                                                <Grid item xs={2.5}>
                                                    <div className='table2'>{caseId}:</div>
                                                </Grid>
                                                <Grid item xs={9.5}>
                                                    <div>{caseName}</div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div className='table3'>相手方は金額を確認した上で、下記の日付までに下記の条件のもとで申立人に支払いを行うものとする。</div>
                                                </Grid>
                                                <br /><br /><br />
                                                <Grid item xs={3.3}>
                                                    <div className='table4'>概要：</div>
                                                </Grid>
                                                <Grid item xs={8.7}>
                                                    <div>{selectedOptions}</div>
                                                </Grid>
                                                <Grid item xs={3.3}>
                                                    <div className='table4'>申立て支払金額：</div>
                                                </Grid>
                                                <Grid item xs={8.7}>
                                                    <div>{payAmount}</div>
                                                </Grid>
                                                <Grid item xs={3.3}>
                                                    <div className='table4'>反訴支払い金額：</div>
                                                </Grid>
                                                <Grid item xs={8.3}>
                                                    <div>{counterClaimPayment}</div>
                                                </Grid>
                                                <Grid item xs={3.3}>
                                                    <div className='table4'>支払い期日：</div>
                                                </Grid>
                                                <Grid item xs={8.7}>
                                                    <div>{paymentEndDate}</div>
                                                </Grid>
                                                <Grid item xs={3.3}>
                                                    <div className='table4'>返送時送料：</div>
                                                </Grid>
                                                <Grid item xs={8.7}>
                                                    <div>{shipmentPayType}</div>
                                                </Grid>
                                                <Grid item xs={3.3}>
                                                    <div className='table4'>特記事項：</div>
                                                </Grid>
                                                <Grid item xs={8.7}>
                                                    <div>{specialItem}</div>
                                                </Grid>
                                                <Grid item xs={3.3}>
                                                    <div className='table4'>添付資料：</div>
                                                </Grid>
                                                <Grid item xs={8.7}>
                                                    <div>{fileName}</div>
                                                </Grid>
                                                <br /><br /><br />
                                                <Grid item xs={12}>
                                                    <div className='table3'>申立人および相手方は、申立人と相手方との間には、本件に関し、本調停案に定めるもののほかに何らの債権債務がないことを相互に確認する。</div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    }

                                    <Dialog
                                        onClose={handleRefuseDailogClose}
                                        aria-labelledby="customized-dialog-title"
                                        open={refuseDailogOpen}
                                        className='RefuseDailog'
                                        sx={{ '& .RefuseDailog': { width: 580, height: 300 } }}
                                        maxWidth={'xl'}
                                    >
                                        <DialogContent>
                                            <h3>この和解案を拒否しますか？</h3>
                                            <span>拒否する場合、下記より次に取るアクションを選んでください。</span>
                                            <span id='mustInput'>必填</span>
                                            <br />
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    id="radio-buttons-group"
                                                    onChange={radioChange}
                                                >
                                                    <FormControlLabel value='対案を作成する' control={<Radio />} label='対案を作成する' />
                                                    <FormControlLabel value='調停へ移行する' control={<Radio />} label='調停へ移行する' />
                                                </RadioGroup>
                                            </FormControl>
                                            <br />
                                            <Button variant="outlined" color="inherit" onClick={handleFixClick} style={{ backgroundColor: "white", float: 'right', marginLeft: 5 }} disabled={isButtonDisabled}>決定</Button>
                                            <Button variant="outlined" color="inherit" onClick={handleRefuseDailogClose} style={{ backgroundColor: "white", float: 'right' }}>キャンセル</Button>
                                        </DialogContent>

                                    </Dialog>
                                </div>
                            </DialogContent>

                        </Dialog1>
                        :
                        <Dialog1
                            onClose={handleClose}
                            open={dailogOpen}
                        >
                            <DialogContent>
                                <div id='S20'>
                                    <div className='button'>
                                        {agreeState ?
                                            <div> (
                                                <Button variant="outlined" className='button2' color="inherit" onClick={() => { exportPDf(ref.current); }} style={{ backgroundColor: "white", marginRight: '5px', marginTop: '5px' }}>
                                                    ダウンロード
                                                </Button>)
                                                <Button variant="outlined" className='button2' color="inherit" onClick={handleClose} style={{ backgroundColor: "white", marginRight: '5px', marginTop: '5px' }}>
                                                    閉じる
                                                </Button>
                                            </div>
                                        :
                                            <div>
                                                <Button variant="contained" className='button3' color="success" onClick={handleAgreeClick2} style={{ marginRight: '5px', marginTop: '5px' }}>
                                                    確認済みにする
                                                </Button>
                                                <Button variant="outlined" className='button3' color="inherit" onClick={() => { exportPDf(ref.current); }} style={{ backgroundColor: "white", marginRight: '5px', marginTop: '5px' }}>
                                                    ダウンロード
                                                </Button>
                                                <Button variant="outlined" className='button3' color="inherit" onClick={handleClose} style={{ backgroundColor: "white", marginRight: '5px', marginTop: '5px' }}>
                                                    閉じる
                                                </Button>                 
                                            </div>
                                        }
                                    </div>
                                    {selectedOptions === '' ? <div className='center-20'><CircularProgress /></div> :
                                        <div>
                                            <div className='Title' style={{ textAlign: 'center' }}>
                                                <h1>和解案合意書</h1>
                                            </div>
                                            <Grid container spacing={2}>
                                                <Grid item xs={10}>
                                                    <div className='table1'>和解日：</div>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <div>{reconciliateDate}</div>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <div className='table2'>申立人：</div>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <div>{company1}</div>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <div className='table2'></div>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <div>{name1}</div>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <div className='table2'>相手方：</div>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <div>{company2}</div>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <div className='table2'></div>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <div>{name2}</div>
                                                </Grid>
                                                <br /><br /><br />
                                                <Grid item xs={2.5}>
                                                    <div className='table2'>{caseId}:</div>
                                                </Grid>
                                                <Grid item xs={9.5}>
                                                    <div>{caseName}</div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div className='table3'>相手方は金額を確認した上で、下記の日付までに下記の条件のもとで申立人に支払いを行うものとする。</div>
                                                </Grid>
                                                <br /><br /><br />
                                                <Grid item xs={3.3}>
                                                    <div className='table4'>概要：</div>
                                                </Grid>
                                                <Grid item xs={8.7}>
                                                    <div>{selectedOptions}</div>
                                                </Grid>
                                                <Grid item xs={3.3}>
                                                    <div className='table4'>申立て支払金額：</div>
                                                </Grid>
                                                <Grid item xs={8.7}>
                                                    <div>{payAmount}</div>
                                                </Grid>
                                                <Grid item xs={3.3}>
                                                    <div className='table4'>反訴支払い金額：</div>
                                                </Grid>
                                                <Grid item xs={8.3}>
                                                    <div>{counterClaimPayment}</div>
                                                </Grid>
                                                <Grid item xs={3.3}>
                                                    <div className='table4'>支払い期日：</div>
                                                </Grid>
                                                <Grid item xs={8.7}>
                                                    <div>{paymentEndDate}</div>
                                                </Grid>
                                                <Grid item xs={3.3}>
                                                    <div className='table4'>返送時送料：</div>
                                                </Grid>
                                                <Grid item xs={8.7}>
                                                    <div>{shipmentPayType}</div>
                                                </Grid>
                                                <Grid item xs={3.3}>
                                                    <div className='table4'>特記事項：</div>
                                                </Grid>
                                                <Grid item xs={8.7}>
                                                    <div>{specialItem}</div>
                                                </Grid>
                                                <Grid item xs={3.3}>
                                                    <div className='table4'>添付資料：</div>
                                                </Grid>
                                                <Grid item xs={8.7}>
                                                    <div>{fileName}</div>
                                                </Grid>
                                                <br /><br /><br />
                                                <Grid item xs={12}>
                                                    <div className='table3'>申立人および相手方は、申立人と相手方との間には、本件に関し、本調停案に定めるもののほかに何らの債権債務がないことを相互に確認する。</div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    }

                                </div>
                            </DialogContent>
                        </Dialog1>
                }
            </div>
        </div >
    )
}

export default S20;