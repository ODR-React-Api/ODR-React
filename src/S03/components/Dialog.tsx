import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import "../assets/style/dialog.scss"
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Popover from '@mui/material/Popover';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { checkBoxData,stateText } from '../../common/constants/constant'
import { ColorWidthButton1, ColorWidthButton2 } from "../../common/components/ButtonCommon";
dayjs.extend(customParseFormat)
const lodash = require('lodash')

// 定义日期控件props类型
type basicDateCalendarType = {
  dataStart: string;
  dataEnd: string;
  dataChange: (newData: Dayjs | null, dataState: string) => void;
  dataState: string
}

// 日期控件
function BasicDateCalendar(props: basicDateCalendarType) {

  // 初始化绑定数据
  const [value, setValue] = React.useState<Dayjs | null>(props.dataState === "popover1-div" ?
    props.dataStart === "" || !dayjs(props.dataStart, "YYYY年MM月DD日", true).isValid() ? null : dayjs(props.dataStart, "YYYY年MM月DD日")
    : props.dataEnd === "" || !dayjs(props.dataEnd, "YYYY年MM月DD日", true).isValid()? null : dayjs(props.dataEnd, "YYYY年MM月DD日"))

  // 值改变时触发
  function dataChange(newValue: Dayjs | null) {
    setValue(newValue)
    props.dataChange(newValue, props.dataState)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateCalendar']}>
        <DateCalendar value={value} onChange={(newValue) => dataChange(newValue)} />
      </DemoContainer>
    </LocalizationProvider>
  );
}

// 定义表单数据类型
type detailedSearchType = {
  cid: string;
  caseTitle: string;
  caseStatus: string;
  position: string[];
  petitionDateEnd: string;
  petitionDateStart: string;
  correspondingDate: string;
  messageFlag: string;
  Correspondence: string;
  isClick: boolean
}

// 定义AlertDialog的props的类型
type alertDialogPropsType = {
  open: boolean,
  handleClose: () => void,
  detailedSearch: (searcdData: detailedSearchType) => void,
  searchData:detailedSearchType,
  handleAllClose:() => void
}

export default function AlertDialog(props: alertDialogPropsType) {

  // 初始化表单数据
  const [searchData, setSearchData] = React.useState<detailedSearchType>(props.searchData)

  // 设置select控件大小
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 200,
        width: 300,
      },
    },
  };

  // 表单常规数据改变时触发，用于改变绑定值
  function handleChange(e: any) {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    })
  }

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [dataState, setDataState] = React.useState("")

  // 开启日期控件
  function handleClick(popoverId: string) {
    setAnchorEl(document.getElementById(popoverId));
    // 选择挂载位置
    setDataState(popoverId)
  }

  // 关闭日期控件
  function handleClose() {
    setAnchorEl(null);
    setDataState("")
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [inputDataStart, setInputDataStart] = React.useState("")
  const [inputDataEnd, setInputDataEnd] = React.useState("")
  const [dataError, setDataError] = React.useState(false)
  const [buttonCheck, setButtonCheck] = React.useState(false)
  const [dataFormat, setDataFormat] = React.useState({
    "popover1": false,
    "popover2": false
  })

  // 监听日期控件，当结束时间大于开始时间时报错
  React.useEffect(() => {
    if (searchData.petitionDateStart.length === 8 && searchData.petitionDateEnd.length === 8) {
      if (searchData.petitionDateStart > searchData.petitionDateEnd) {
        setDataError(true)
      } else {
        setDataError(false)
      }
    }
  }, [searchData.petitionDateStart, searchData.petitionDateEnd])

  // 监听表单数据，控制检索按钮活性非活性
  React.useEffect(() => {
    const data = {
      cid: "",
      caseTitle: "",
      caseStatus: "",
      position: [],
      petitionDateEnd: "",
      petitionDateStart: "",
      correspondingDate: "",
      messageFlag: "0",
      Correspondence: "0",
      isClick: false
    }
    if (lodash.isEqual(searchData, data) && searchData.position.length === 0) {
      setButtonCheck(false)
    } else {
      setButtonCheck(true)
    }
  }, [searchData])

  React.useEffect(()=>{
    setSearchData(props.searchData)
},[props.searchData])

  // 日期控件事件改变时触发
  function dataChange(newData: Dayjs | null, dataState: string) {
    console.log(newData === null ? "" : newData.format("YYYY年MM月DD日"));
    
    // 判断开始时间还是结束时间
    if (dataState === "popover1-div") {
      // 判断改变之后的值是否为空
      setInputDataStart(newData === null ? "" : newData.format("YYYY年MM月DD日"))
      setSearchData({
        ...searchData,
        petitionDateStart: newData === null ? "" : newData.format("YYYYMMDD")
      })
      setDataFormat({
        ...dataFormat,
        "popover1": false
      })
      // 关闭日期控件
      setAnchorEl(null);
    } else {
      // 结束时间
      setInputDataEnd(newData === null ? "" : newData.format("YYYY年MM月DD日"))
      setSearchData({
        ...searchData,
        petitionDateEnd: newData === null ? "" : newData.format("YYYYMMDD")
      })
      setDataFormat({
        ...dataFormat,
        "popover2": false
      })
      // 关闭日期控件
      setAnchorEl(null);
    }
  }

  // 日期组件input值改变时触发
  function inputDataChange(e: any, dataState: boolean) {
    // 输入类型过滤，只接受数字类型
    const data = e.target.value.replace(/[^\d]+/, '');
    // 判断是开始时间还是结束时间
    if (dataState) {
      // 当输入数据不足8位时，直接set进变量
      if (data.length < 8) {
        setInputDataStart(data);
        // 输入达到8位时进行格式化操作
      } else if (data.length === 8) {
        // 判断日期是否合法
        if (dayjs(data, "YYYYMMDD", true).isValid()) {
          setDataFormat({
            ...dataFormat,
            "popover1": false
          })
          // 合法进行数据格式化
          const dataParse = dayjs(Date.parse(data.slice(0, 4) + "-" + data.slice(4, 6) + "-" + data.slice(6, 8)))
          setInputDataStart(dataParse.format("YYYY年MM月DD日"));
          setSearchData({
            ...searchData,
            petitionDateStart: data
          })
        } else {
          // 不合法报error
          setInputDataStart(data);
          setDataFormat({
            ...dataFormat,
            "popover1": true
          })
        }
      } else if (e.target.value < inputDataStart) {
        // 检查是否为满位删除操作，若是则将变量置空
        setInputDataStart("")
      }
    } else {
      // 结束时间 操作与开始时间相同，仅变量不同
      if (data.length < 8) {
        setInputDataEnd(data);
      } else if (data.length === 8) {
        if (dayjs(data, "YYYYMMDD", true).isValid()) {
          setDataFormat({
            ...dataFormat,
            "popover2": false
          })
          const dataParse = dayjs(Date.parse(data.slice(0, 4) + "-" + data.slice(4, 6) + "-" + data.slice(6, 8)))
          setInputDataEnd(dataParse.format("YYYY年MM月DD日"));
          setSearchData({
            ...searchData,
            petitionDateEnd: data
          })
        } else {
          setInputDataEnd(data);
          setDataFormat({
            ...dataFormat,
            "popover2": true
          })
        }
      } else if (e.target.value < inputDataEnd) {
        setInputDataEnd("")
      }
    }
  }

  // 立场复选框改变时触发
  function positionChange(e: any) {
    // 判断是选中还是取消选中
    if (e.target.checked) {
      // 若选中则将value push进数组中
      const newPosition = searchData.position
      newPosition.push(e.target.value)
      setSearchData({
        ...searchData,
        position: newPosition
      })
    } else {
      // 若取消选中，则将value从数组中删除
      const newPosition = searchData.position.filter((item) => item !== e.target.value)
      setSearchData({
        ...searchData,
        position: newPosition
      })
    }
  }

  // 单选按钮改变时触发
  function radioChange(e: any, value: string) {
    // 匹配单选按钮组
    switch (e.target.name) {
      case 'messageFlag':
        setSearchData({
          ...searchData,
          messageFlag: value
        })
        break;
      case 'Correspondence':
        setSearchData({
          ...searchData,
          Correspondence: value
        })
        break;
    }
  }

  // 点击取消按钮
  function handleCloseDialog() {
    // 将SearchData置空
    setSearchData({
      cid: "",
      caseTitle: "",
      caseStatus: "",
      position: [],
      petitionDateEnd: "",
      petitionDateStart: "",
      correspondingDate: "",
      messageFlag: "0",
      Correspondence: "0",
      isClick: false
    })
    // 日期组件置空
    setInputDataStart("")
    setInputDataEnd("")
    // 将日期校验关闭
    setDataError(false)
    setDataFormat({
      "popover2": false,
      "popover1": false
    })
    // 调用父组件的关闭方法
    props.handleAllClose()
  }

  // 点击检索按钮，提交检索数据
  function detailedSearch() {
    if (!dataError && !dataFormat.popover1 && !dataFormat.popover2) {
      props.handleClose()
      props.detailedSearch(searchData)
    } else {
      setSearchData({
        ...searchData,
        petitionDateEnd: ""
      })
      dataFormat.popover1 ? document.getElementById('popover1-div-input')?.focus() : document.getElementById('popover2-div-input')?.focus()
    }
  }

  function lostFocu(e:any){
    if(e.target.id==="popover1-div-input"){
      if ((!(dayjs(e.target.value, "YYYY年MM月DD日", true).isValid())) && e.target.value!==""){
        setDataFormat({
          ...dataFormat,
          "popover1": true
        })
      }else{
        setDataFormat({
          ...dataFormat,
          "popover1": false
        })
      }
    }else{
      if ((!(dayjs(e.target.value, "YYYY年MM月DD日", true).isValid())) && e.target.value!==""){
        setDataFormat({
          ...dataFormat,
          "popover2": true
        })
      }
      else{
        setDataFormat({
          ...dataFormat,
          "popover2": false
        })
      }
    }
  }

  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        id="MosListDialog"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
          {"申立て詳細検索"}
        </DialogTitle>
        <DialogContent>
          <FormGroup>
            <div className='display-flex width-100'>
              <p className='S03-title text-align-right'>申立て番号</p>
              <TextField id="cid" variant="outlined" size="small" name="cid" onChange={handleChange} value={searchData.cid} />
            </div>
            <div className='display-flex width-100'>
              <p className='S03-title text-align-right'>件名</p>
              <TextField id="caseTitle" variant="outlined" size="small" name="caseTitle" onChange={handleChange} value={searchData.caseTitle} />
            </div>
            <div className='display-flex width-100'>
              <p className='S03-title text-align-right'>状態</p>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchData.caseStatus}
                onChange={handleChange}
                name='caseStatus'
                MenuProps={MenuProps}
              >
                {stateText.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id} style={{minHeight:"36px"}}>{item.text}</MenuItem>
                  )
                })}
              </Select>
            </div>
            <div className='width-100' style={{ display: "flex" }}>
              <p className='S03-title text-align-right' style={{ marginTop: "0" }}>立場</p>
              <div>
                {checkBoxData.map((item) => {
                  return (
                    <div key={item.id} style={{ display: "flex" }} className='padding-margin-0'>
                      <Checkbox className='padding-margin-0' onChange={positionChange} value={item.id} checked={searchData.position.indexOf(item.id) > -1} />
                      <p className='padding-margin-0'>{item.name}</p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='display-flex width-100' style={{ marginBottom: dataError || dataFormat.popover1 || dataFormat.popover2 ? "12px" : "0" }}>
              <p className='S03-title text-align-right'>登録日付</p>
              <div style={{ maxHeight: "29px" }}>
                <div className='data-div' id="popover1-div" style={{ borderColor: dataFormat.popover1 ? "red" : "" }}>
                  <input max="8" id="popover1-div-input" className='data-input' placeholder="開始日" value={inputDataStart} onChange={event => inputDataChange(event, true)} onBlur={lostFocu} />
                  <CalendarMonthIcon htmlColor='rgba(0, 0, 0, 0.5)' onClick={() => handleClick('popover1-div')} style={{ cursor: "pointer" }}></CalendarMonthIcon>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <BasicDateCalendar dataStart={inputDataStart} dataEnd={inputDataEnd} dataChange={dataChange} dataState={dataState} />
                  </Popover>
                </div>
                <div style={{ display: dataFormat.popover1 ? "block" : "none" }} className='data-error'>
                  <span>日付エラー</span>
                </div>
              </div>
              <div style={{ maxHeight: "29px" }}>
                <div className='data-div' id="popover2-div" style={{ marginLeft: "5px", borderColor: dataError || dataFormat.popover2 ? "red" : "" }}>
                  <input max="8" id="popover2-div-input" className='data-input' placeholder="終了日" value={inputDataEnd} onChange={event => inputDataChange(event, false)} onBlur={lostFocu}/>
                  <CalendarMonthIcon htmlColor='rgba(0, 0, 0, 0.5)' onClick={() => handleClick('popover2-div')} style={{ cursor: "pointer" }}></CalendarMonthIcon>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <BasicDateCalendar dataEnd={inputDataEnd} dataStart={inputDataStart} dataChange={dataChange} dataState={dataState} />
                  </Popover>
                </div>
                <div style={{ display: dataError || dataFormat.popover2 ? "block" : "none" }} className='data-error'>
                  {dataFormat.popover2 ? <span>日付エラー</span> : <span>開始日より後の日付を指定してください。</span>}
                </div>
              </div>
            </div>
            <div className='width-100' style={{ display: "flex", marginBottom: "5px" }}>
              <p className='S03-title text-align-right' style={{ marginTop: "0" }}>メッセージ</p>
              <div>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={searchData.messageFlag}
                  name="messageFlag"
                  onChange={(event, value) => radioChange(event, value)}
                >
                  <FormControlLabel value="1" control={<Radio />} label="未読メッセージ有り" />
                  <FormControlLabel value="2" control={<Radio />} label="未読メッセージなし" />
                  <FormControlLabel value="0" control={<Radio />} label="指定しない" />
                </RadioGroup>
              </div>
            </div>
            <div className='width-100' style={{ display: "flex" }}>
              <p className='S03-title text-align-right' style={{ marginTop: "0" }}>要対応</p>
              <div>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={searchData.Correspondence}
                  name="Correspondence"
                  onChange={(event, value) => radioChange(event, value)}
                >
                  <FormControlLabel value="1" control={<Radio />} label="要対応あり" />
                  <FormControlLabel value="2" control={<Radio />} label="要対応なし" />
                  <FormControlLabel value="0" control={<Radio />} label="指定しない" />
                </RadioGroup>
              </div>
            </div>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <div style={{float:'left'}}>
          <ColorWidthButton2 onClick={detailedSearch} disabled={!buttonCheck} variant="contained" color="success" style={{float:'right'}}>
            検索
          </ColorWidthButton2>
          <ColorWidthButton1 onClick={handleCloseDialog} variant="outlined" style={{float:'right'}}>キャンセル</ColorWidthButton1>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}