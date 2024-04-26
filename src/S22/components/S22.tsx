import React, { useEffect, useState } from "react";
import { Box,CircularProgress } from '@mui/material';
import { Radio, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, OutlinedInput, InputAdornment} from "@mui/material";
import { Button, FormControl, RadioGroup, FormGroup, FormControlLabel, FormHelperText, Checkbox, Snackbar } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import axios from 'axios';
import dayjs from 'dayjs';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CloseIcon from '@mui/icons-material/Close';
import MediationsConCon from '../../S24/components/MediationsConCon';
import { ColorWidthButton1 } from '../../common/components/ButtonCommon'
import { ColorWidthButton2 } from '../../common/components/ButtonCommon'
import { Dialog3 } from '../../common/components/dialog';
import '../mocks/mockJs'
import '../assets/styles/S22.css'

function S22(props:{S22Open:boolean, onChildValueChange:(flg1:string) =>void, handleCloseS22:() =>void, handleMini:() =>void}) {
  const {S22Open, onChildValueChange, handleCloseS22, handleMini} = props;
  console.log(S22Open);
  const [showTextarea, setShowTextarea] = useState(false);
  const [backSts, setBackSts] = useState(false);
  const [btnName, setBtnName] = useState('次へ');
  const [page1Display, setPage1Display] = useState(true);
  const [page2Display, setPage2Display] = useState(false);
  const [fileName, setFileName] = useState('');
  const [pageCount, setPageCount] = useState('1');
  // loading
  const [loading,setLoading] = useState(true);
  // 対応方法のerrormessage表示
  const [expectResloveTypeErrorMessage, setExpectResloveTypeErrorMessage] = React.useState('none');
  // 対応方法选中状态がその他場合、errormessage表示
  const [otherContextMinErrorMessage, setOtherContextMinErrorMessage] = React.useState('none');
  const [otherContextMaxErrorMessage, setOtherContextMaxErrorMessage] = React.useState('none');
  // 申立て支払金額のerrormessage表示
  const [payAmountMinErrorMessage, setPayAmountMinErrorMessage] = React.useState('none');
  const [payAmountMaxErrorMessage, setPayAmountMaxErrorMessage] = React.useState('none');
  const [payAmountErrorMessage, setPayAmountErrorMessage] = React.useState('none');
  // 反訴支払い金額のerrormessage表示
  const [counterClaimPaymentMinErrorMessage, setCounterClaimPaymentMinErrorMessage] = React.useState('none');
  const [counterClaimPaymentMaxErrorMessage, setCounterClaimPaymentMaxErrorMessage] = React.useState('none');
  const [counterClaimPaymentErrorMessage, setCounterClaimPaymentErrorMessage] = React.useState('none');
  // 支払い期日のerrormessage表示
  const [paymentEndDateErrorMessage, setPaymentEndDateErrorMessage] = React.useState('none');
  // 返送時送料errormessage表示
  const [shipmentPayTypeErrorMessage, setShipmentPayTypeErrorMessage] = React.useState('none');
  // 特記事項のerrormessage表示
  const [specialItemErrorMessage, setSpecialItemErrorMessage] = React.useState('none');
  // 文件sizeerrormessage
  const [filesizeErrorMessage, setFilesizeErrorMessage] = React.useState('none');
  // 文件typeerrormessage
  const [filetypeErrorMessage, setFiletypeErrorMessage] = React.useState('none');
  // 判断按钮是否禁用
  let isBtnDisabled;
  if (btnName === '次へ') {
    // 次へ
    isBtnDisabled = expectResloveTypeErrorMessage === '' || (showTextarea && otherContextMinErrorMessage === '') || (showTextarea &&  otherContextMaxErrorMessage === '');
  } else {
    // 作成する
    isBtnDisabled = payAmountMinErrorMessage === '' || payAmountMaxErrorMessage === '' || payAmountErrorMessage === ''
                    || counterClaimPaymentMinErrorMessage === '' || counterClaimPaymentMaxErrorMessage === '' || counterClaimPaymentErrorMessage === ''
                    || paymentEndDateErrorMessage === '' || shipmentPayTypeErrorMessage === '' || specialItemErrorMessage === ''
                    || filesizeErrorMessage === '' || filetypeErrorMessage === '';
  }
  //反訴あり
  const [kakuHyouji, setKakuHyouji] = useState(false);
  //status 1 or 2
  const [sts01, setSts01] = useState(true);
  
  const [open24, setOpen24] = useState(false);

  const nextPage = () => {
    if (btnName === '次へ') {
      if(expectResloveTypeErrorMessage === 'none'
       && (!showTextarea || (showTextarea && otherContextMinErrorMessage === 'none' && otherContextMaxErrorMessage === 'none'))){
        //次への場合
        setPageCount('2')
        setPage1Display(false)
        setPage2Display(true)
        setBtnName('作成する')
        setBackSts(true)
        setKakuHyouji(true)
        if (sts01) {
          setSakuseDisplay(true)
        } else {
          setSakuseDisplay(false)
        }
        //TestContext.Provider.arguments ={current:'2'}
      }
    } else {
      if(payAmountMinErrorMessage === 'none'
       && payAmountMaxErrorMessage === 'none'
       && payAmountErrorMessage === 'none'
       && counterClaimPaymentMinErrorMessage === 'none'
       && counterClaimPaymentMaxErrorMessage === 'none'
       && counterClaimPaymentErrorMessage === 'none'
       && paymentEndDateErrorMessage === 'none'
       && shipmentPayTypeErrorMessage === 'none'
       && specialItemErrorMessage === 'none'
       && filesizeErrorMessage === 'none'
       && filetypeErrorMessage === 'none'){
        //作成するの場合
        handleSubmit()
        setOpen24(true)
        console.log(open24)
      }
    }
  }
  //* S24----------------------------------------------------------------START
  function S24DilogOpenFlg(flg1:string){
    onChildValueChange(flg1);
    setOpen24(false)
  }
  //* S24----------------------------------------------------------------END

  const backPage = () => {
    setPageCount('1')
    setPage1Display(true)
    setPage2Display(false)
    setBtnName('次へ')
    setBackSts(false)
    setSakuseDisplay(true)
  }
  const save = () => {
    setSnackMsg('下書きを保存しました')
      setOpenSnack(true)
    }
   
  //--------------------page refresh start
  function handleChange(e: any) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if(e.target.name === 'OtherContext'){
      // 対応方法がその他場合、その他内容が空
      if (e.target.value.length === 0) {
        setOtherContextMinErrorMessage('');
      } else if (e.target.value.length > 200) {
        setOtherContextMaxErrorMessage('');
      } else {
        setOtherContextMinErrorMessage('none');
        setOtherContextMaxErrorMessage('none');
      }
    } else if (e.target.name === 'PayAmount'){
      setPayAmountMinErrorMessage('none');
      setPayAmountMaxErrorMessage('none');
      setPayAmountErrorMessage('none');
      // 申立て支払金額
      if (e.target.value.length === 0) {
        setPayAmountMinErrorMessage('');
      } else if (e.target.value.length > 18) {
        setPayAmountMaxErrorMessage('');
      } else {
        const isValid = /^(0|[1-9][0-9]*)+(.[0-9]{1,2})?$/.test(e.target.value);
        if (!isValid) {
          setPayAmountErrorMessage('');
        }
      }
    } else if (e.target.name === 'CounterClaimPayment'){
      setCounterClaimPaymentMinErrorMessage('none');
      setCounterClaimPaymentMaxErrorMessage('none');
      setCounterClaimPaymentErrorMessage('none');
      // 反訴支払い金額
      if (e.target.value.length === 0) {
        setCounterClaimPaymentMinErrorMessage('');
      } else if (e.target.value.length > 13) {
        setCounterClaimPaymentMaxErrorMessage('');
      } else {
        const isValid = /^(0|[1-9][0-9]*)+(.[0-9]{1,2})?$/.test(e.target.value);
        if (!isValid) {
          setCounterClaimPaymentErrorMessage('');
        }
      }
    } else if(e.target.name === 'ShipmentPayType'){
      // 返送時送料
      if (e.target.value.length === 0) {
        setShipmentPayTypeErrorMessage('');
      } else {
        setShipmentPayTypeErrorMessage('none');
      }
    } else if(e.target.name === 'SpecialItem'){
      // 特記事項
      if (e.target.value.length > 200) {
        setSpecialItemErrorMessage('');
      } else {
        setSpecialItemErrorMessage('none');
      }
    }
  };

  //checkbox
  const handleCheckboxChange = (value: string) => {
    let newSelect = formData.ExpectResloveTypeValue;
    //check off
    if (newSelect.includes(value)) {
      newSelect = newSelect.filter(item => item !== value)

    } else {
      //check on
      newSelect.push(value);
    }
    if (newSelect.includes('99')) {
      setShowTextarea(true);
    } else {
      setShowTextarea(false);
    }
    setFormData({ ...formData, ExpectResloveTypeValue: newSelect });

    // 対応方法が入力必須  
    const checkBoxes = document.querySelectorAll('#checkBoxDiv input[type="checkbox"]');//获取多个checkbox
    let count = 0;
    checkBoxes.forEach((checkbox) => {
      if ((checkbox as HTMLInputElement).checked) {
        count++;
      }
    });
    if (count === 0) {
      setExpectResloveTypeErrorMessage('');
    } else {
      setExpectResloveTypeErrorMessage('none');
    }

  };
  //calendar
  function handleDatePickerOnChange(value: any) {
    if (value === null){
      setPaymentEndDateErrorMessage('');
      setFormData({ ...formData, PaymentEndDate: value });
    } else {
      const datePickerSelected = value.format('YYYYMMDD');
      setFormData({ ...formData, PaymentEndDate: datePickerSelected });
      const date = new Date(value);
      // const isValid = /^[1-9]\d{3}-([1-9]|1[0-2])-([1-9]|[1-2][0-9]|3[0-1])$/.test(date.toLocaleDateString().replace(/\//g,'-'));
      const isValid = /^\d{4}-\d{1,2}-\d{1,2}$/.test(date.toLocaleDateString().replace(/\//g,'-'));
      if (isValid) {
        setPaymentEndDateErrorMessage('none');
      } else {
        setPaymentEndDateErrorMessage('');
      }
    }
  };
  //--------------------page refresh end
  function upload() {
    let up = document.getElementById('upload')
    if (up !== null) {
      up.click();
    }
  };
  function handleConfigFileSelect(e: any) {
    setFilesizeErrorMessage('none');
    setFiletypeErrorMessage('none');
    const acceptedTypes = ['.ade', '.adp', '.apk', '.appx', '.appxbundle', '.bat', '.cab', '.chm', '.cmd', '.com', '.cpl', '.dll', '.dmg', '.exe', '.hta', '.ins', '.isp', '.iso', '.jar', '.js', '.jse', '.lib', '.lnk', '.mde',
        '.msc', '.msi', '.msix', '.msixbundle', '.msp', '.mst', '.nsh', '.pif', '.scr', '.sct', '.shb', '.sys', '.vb', '.vbe', '.vbs', '.vxd', '.wsc', '.wsf', '.wsh'];
    // const files = e.target.files;
    let file = e.target.files[0];
    if (!file) {
      return
    }

    // 获取文件后缀名
    const fileType = file.name.substr(file.name.lastIndexOf(".")).toLowerCase();
    // 添付ファイル容量上限チェック
    if (file.size > 1024 * 1024 * 100) {
      setFilesizeErrorMessage('');
      return
    } else
    // 添付ファイル拡張子チェック
    if (acceptedTypes.includes(fileType)) {
      setFiletypeErrorMessage('');
      return
    }
    setFileName(file.name);
  }

  //map
  const [res, setRes] = useState
    ({
      count: 0, list: [{
        DisplayName: '',
        Value: '0',
        OrderNo: 0
      }
      ]
    });
  const [res2, setRes2] = useState
    ({
      count: 0, list: [{
        DisplayName: '',
        OrderNo: 0
      }
      ]
    });

  const [errorStatsMsg, setErrorStatsMsg] = useState('')

  //下書き保存（ボタン） 調停案Statusが0以外の場合、非表示にする					
  const [saveDisplay, setSaveDisplay] = useState(false);
  //作成（ボタン） 調停案Statusが0,1以外の場合、非表示にする	
  const [sakuseDisplay, setSakuseDisplay] = useState(false);

  //mockjs中获取数据
  useEffect(() => {
    axios.get('/GetSyuruiS22')
      .then((response) => {
        setRes(response.data.data);
        setLoading(false);
      })
    axios.get('/GetSyuryoS22')
      .then((response) => {
        setRes2(response.data.data);
      })
    axios.get('/GetStatusS22')
      .then((response) => {
        //setRes3(response.data.data);
        //下書き保存（ボタン）作成（ボタン） 非表示にする	
        setSaveDisplay(false)
        setSts01(false)
        setSakuseDisplay(true)
        const dbData = response.data.data
        switch (dbData.Status) {
          case '0':
            setErrorStatsMsg('')
            //下書き保存（ボタン） 0の場合表示にする	
            setSaveDisplay(true)
            setSts01(true)
            break;
          case '1':
            setErrorStatsMsg('')
            setSts01(true)
            break;
          case '2':
          case '3':
          case '4':
            setErrorStatsMsg('合意済みの調停案は、編集を行うことはできません。')
            handleClickOpen()
            break;
          case '5':
          case '6':
            setErrorStatsMsg('拒否済みの調停案は、編集を行うことはできません。')
            handleClickOpen()
            break;
          case '7':
          case '8':
            setErrorStatsMsg('確認済みの調停案は、編集を行うことはできません。')
            handleClickOpen()
            break;
          case '9':
            setErrorStatsMsg('成立済みの調停案は、編集を行うことはできません。')
            handleClickOpen()
            break;
          default:
            setErrorStatsMsg('')
        }
        //調停案UserIdとログインユーザが異なる場合、非表示とする
        //dummy 
        if (dbData.UserId !== 'wang') {
          setSaveDisplay(false)
        }
        //db data displaly
        // setFormData(dbData);
        setFormData({
          ...formData,
          ExpectResloveTypeValue: (dbData.ExpectResloveTypeValue.toString()).split(','),
          OtherContext: dbData.OtherContext,
          PayAmount: dbData.PayAmount,
          CounterClaimPayment: dbData.CounterClaimPayment,
          PaymentEndDate: dbData.PaymentEndDate,
          ShipmentPayType: dbData.ShipmentPayType,
          SpecialItem: dbData.SpecialItem
        });
        if ((dbData.ExpectResloveTypeValue).includes('99')) {
          setShowTextarea(true);
        } else {
          setShowTextarea(false);
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [open, setOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState('');
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  //form data 
  const [formData, setFormData] = useState({
    ExpectResloveTypeValue: [''],
    OtherContext: '',
    PayAmount: '',
    CounterClaimPayment: '',
    PaymentEndDate: dayjs().format('YYYYMMDD'),
    ShipmentPayType: '',
    SpecialItem: '',
    FileName:''
  });

  function handleSubmit() {
    console.log(formData);
    document.getElementById('aa')
    formData.FileName=fileName;
  }
  return (
    <div id='S22' >
      <Dialog
        open={S22Open}
            onClose={handleCloseS22}
            sx={{ '& .MuiDialog-paper': { width: 1066, height: 555 } }}
            maxWidth={'lg'}
        >
            <DialogTitle>
                調停案の作成({pageCount}/2)
            </DialogTitle>
                  
            <IconButton
              aria-label="close"
              onClick={handleCloseS22}
              sx={{
                position: 'absolute',
                right: 36,
                top: 5,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <MinimizeIcon />
            </IconButton>
            
            <IconButton
              aria-label="close"
              onClick={handleMini}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
      <Dialog3
        onClose={handleClose}
        // aria-labelledby="customized-dialog-title"
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
          {errorStatsMsg}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog3>

      {
        loading === true ?
        <Box sx={{ display: 'flex',alignItems: 'center',justifyContent: 'center',minHeight: '270px'}}>
          < CircularProgress/>
        </Box>
        :
        <form id='myform' className="form" onSubmit={handleSubmit}>
          {page1Display &&
            <div id='page1'>
              <label id='inline'>対応方法</label>
              <label className="lab">必须</label>
              <div id='checkBoxDiv' >
                <FormGroup>
                  {res.list.map((obj, index) => (
                    <FormControlLabel
                      control={
                        <Checkbox checked={formData.ExpectResloveTypeValue.includes(obj.Value)} onChange={() => handleCheckboxChange(obj.Value)} />
                      }
                      label={obj.DisplayName}
                    />
                  ))}
                </FormGroup>
  
                {showTextarea &&
                  <div>
                    <FormHelperText >「その他」の内容の記載をお願い致します。</FormHelperText>
                    <textarea rows={5} cols={50} name='OtherContext' onChange={(e) => handleChange(e)} value={formData.OtherContext} ></textarea>
                  </div>
                }
                <div>
                  <span style={{ display: expectResloveTypeErrorMessage,color: 'red',fontSize: 14 }}>対応方法が入力必須です。</span>
                </div>
                {showTextarea &&
                  <div>
                    <span style={{ display: otherContextMinErrorMessage,color: 'red',fontSize: 14 }}>「その他」が入力必須です。</span>
                    <span style={{ display: otherContextMaxErrorMessage,color: 'red',fontSize: 14 }}>200桁以下を入力してください。</span>
                  </div>
                }
              </div>
              <br /><br />
            </div>}
          {page2Display &&
            <div id='page2'>
              <table className="tableStyle" width={'600px'}>
                <tr className="trStyle">
                  <td className="page2Left">
                    申立て支払金額<label className="lab">必须</label>&nbsp;
                  </td>
                  <td className="page2Right">   <OutlinedInput aria-label="Demo input" name='PayAmount'
                    onChange={(e) => handleChange(e)} value={formData.PayAmount}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>} /></td>
                  <td style={{width:'500px', paddingBottom:'12px'}}>
                    <span style={{ display: payAmountMinErrorMessage,color: 'red',fontSize: 14 }}>申立て支払金額が入力必須です。</span>
                    <span style={{ display: payAmountMaxErrorMessage,color: 'red',fontSize: 14 }}>18桁以下を入力してください。</span>
                    <span style={{ display: payAmountErrorMessage,color: 'red',fontSize: 14 }}>小数2桁以下の半角数字を入力してください。</span>
                  </td>
                </tr>
                {/* 反訴支払い金額  当該申立てが反訴ありの場合、表示　*/}
                {kakuHyouji &&
                  <tr className="trStyle">
                    <td className="page2Left">
                      反訴支払い金額<label className="lab" id='aaa'>必须</label>&nbsp;
                    </td>
                    <td className="page2Right">
                      {/* <Input aria-label="Demo input" placeholder="$" name='CounterClaimPayment' onChange={(e)=> handleChange(e) } value={formData.CounterClaimPayment }/> */}
                      <OutlinedInput aria-label="Demo input" name='CounterClaimPayment' onChange={(e) => handleChange(e)} value={formData.CounterClaimPayment}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>} />
                    </td>
                    <td style={{paddingBottom:'12px'}}>
                      <span style={{ display: counterClaimPaymentMinErrorMessage,color: 'red',fontSize: 14 }}>反訴支払い金額が入力必須です。</span>
                      <span style={{ display: counterClaimPaymentMaxErrorMessage,color: 'red',fontSize: 14 }}>13桁以下を入力してください。</span>
                      <span style={{ display: counterClaimPaymentErrorMessage,color: 'red',fontSize: 14 }}>小数2桁以下の半角数字を入力してください。</span>
                    </td>
                  </tr>
                }
                
                <tr className="trStyle">
                  <td className="page2Left">
                    支払い期日<label className="lab">必须</label>&nbsp;
                  </td>
                  <td className="page2Right">
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker name='PaymentEndDate' format='YYYY/MM/DD' value={dayjs(formData.PaymentEndDate, "YYYYMMDD")}
                          onChange={(value) => handleDatePickerOnChange(value)}
                        //maxDate={dayjs().add(7, 'days')}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </td>
                  <td style={{paddingTop:'5px'}}>
                    <span style={{ display: paymentEndDateErrorMessage,color: 'red',fontSize: 14 }}>支払い期日を入力してください。</span>
                  </td>
                </tr>

                <tr className="trStyle" >
                  <td className="page2Left" style={{ height: '80px', verticalAlign: 'top', }}>
                    <span className="page2left" style={{ marginTop: '40px', }}>返送時送料</span><label className="lab">必须</label>&nbsp;
                  </td>
                  <td className="page2Right">
                    <FormControl>
                      <RadioGroup aria-labelledby="demo-row-radio-buttons-group-label">
                        {res2.list.map((obj) => (
                          <FormControlLabel name='ShipmentPayType' value={obj.OrderNo} control={<Radio />}
                            checked={formData.ShipmentPayType === (obj.OrderNo).toString()}
                            label={obj.DisplayName} onChange={(e) => handleChange(e)} />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </td>
                  <td>
                    <span style={{ display: shipmentPayTypeErrorMessage,color: 'red',fontSize: 14 }}>返送時送料が入力必須です。</span>
                  </td>
                </tr>
  
                <tr className="trStyle">
                  <td className="page2Left" style={{ height: '60px', }}>
                    <span className="page2left">特記事項</span><label className="la">任意</label>&nbsp;
                  </td>
                  <td className="page2Right">
                    <textarea cols={70} rows={3} name='SpecialItem' onChange={(e) => handleChange(e)} value={formData.SpecialItem}></textarea>
                  </td>
                  <td style={{paddingLeft:'270px',width:'250px',paddingBottom:'25px'}}>
                    <span style={{ display: specialItemErrorMessage,color: 'red',fontSize: 14 }}>200桁以下を入力してください。</span>
                  </td>
                </tr>
                
                <tr className="trStyle">
                  <td className="page2Left">
                    <span className="page2left">添付資料</span><label className="la">任意</label>&nbsp;
                  </td>
                  <td className="page2Right" >
                    <span style={{display:'block'}}>
                      <input type="file" id='upload' style={{ display: 'none' }} onChange={(e) => handleConfigFileSelect(e)} />
                      <a onClick={upload} style={{color: 'blue'}}>添付ファイルの追加</a>
                    </span>
                    <span >{fileName}</span>
                  </td>
                    <td style={{paddingBottom:'15px'}}>
                      <span style={{ display: filesizeErrorMessage,color: 'red',fontSize: 14 }}>添付可能なファイル容量上限（100MB）を超えています。</span>
                      <span style={{ display: filetypeErrorMessage,color: 'red',fontSize: 14 }}>添付できない形式のファイルです。</span>
                    </td>
                </tr>
                
              </table>
              <br /><br />
            </div>}
          <div id='line'></div><br />
          <div id='footBtn'>
  
            {sakuseDisplay && 
              <ColorWidthButton2 color='success' variant='contained' disabled={isBtnDisabled} style={{ float: 'right' }} onClick={() => nextPage()}>{btnName}</ColorWidthButton2>
              }
            {saveDisplay && 
              <ColorWidthButton1 variant='outlined' style={{ float: 'right' }} onClick={() => save()}>下書き保存</ColorWidthButton1>
              }
            {backSts && 
              <ColorWidthButton1 variant='outlined' style={{ marginLeft: '60px', float: 'left' }} onClick={() => backPage()}>戻る</ColorWidthButton1>
              }
          </div>
        </form>
      }
      <div>
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleCloseSnack}
          message={snackMsg}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnack}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </div>
      {open24 && <MediationsConCon medOpen={open24} content={formData} mediaFlag={S24DilogOpenFlg}/>}
      </Dialog>
    </div>
  )
};

export default S22;


