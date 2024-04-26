import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import '../assets/styles/S17_2.css'
import { Button, CircularProgress } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import axios from 'axios';
import dayjs from 'dayjs';
import S19 from '../../S19/components/S19';
import '../mocks/mock';
import { OPTIONSS17_1, OPTIONSS17_2 } from '../../common/constants/constant';


interface ChildProps {
    prop1: string[];
    prop2: string;
    onChildValueChange: (value1: boolean, value2: boolean, value3: string, data: any) => void;
}

const S17_2 = ({ prop1, prop2, onChildValueChange }: ChildProps) => {

    type tplotOptions = {
        S17_2_checkBox: string[],
        S17_2_textArea: string,
        PayAmount: string,
        CounterClaimPayment: string,
        PaymentEndDate: string,
        ShipmentPayType: string,
        SpecialItem: string,
        FileUrl: string
    }


    const initialFormData = {
        PayAmount: '',
        CounterClaimPayment: '',
        PaymentEndDate: '',
        ShipmentPayType: '',
        SpecialItem: '',
        FileUrl: ''
    };


    const [formData, setFormData] = useState(initialFormData); //从mock中取得的数据
    const S17_2_checkBox = prop1;
    const S17_2_textArea = prop2;
    const [PayAmount, setPayAmount] = useState(''); // 申立て支払金額
    const [CounterClaimPayment, setCounterClaimPayment] = useState(''); // 反訴支払い金額
    const [PaymentEndDate, setPaymentEndDate] = useState(''); // 支払い期日
    const [ShipmentPayType, setShipmentPayType] = useState(''); // 返送時送料
    const [SpecialItem, setSpecialItem] = useState(''); // 特記事項
    const [FileUrl, setFileUrl] = useState(''); // 添付資料
    const [open, setOpen] = useState(false);//小黑框
    const [isModalOpenS19, setIsModalOpenS19] = useState(false);
    const [isLoading, setIsLoading] = useState(null);
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


    useEffect(() => {
        axios.get('/formData')
            .then(response => {
                setFormData(response.data);
                setIsLoading(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    useEffect(() => {
        console.log('formData 更新了:', formData);
        // 在这里可以进行其他操作
        setPayAmount(formData.PayAmount);
        setCounterClaimPayment(formData.CounterClaimPayment);
        setPaymentEndDate(formData.PaymentEndDate);
        setShipmentPayType(formData.ShipmentPayType);
        setSpecialItem(formData.SpecialItem);
    }, [formData]);

    const data: tplotOptions = {
        S17_2_checkBox: S17_2_checkBox,
        S17_2_textArea: S17_2_textArea,
        PayAmount: PayAmount,
        CounterClaimPayment: CounterClaimPayment,
        PaymentEndDate: PaymentEndDate,
        ShipmentPayType: ShipmentPayType,
        SpecialItem: SpecialItem,
        FileUrl: FileUrl
    };

    // 要写入文件的数据



    //onChange事件，给各个的变量赋值
    const Payment1Change = (event: any) => {
        setPayAmount(event.target.value)
        setPayAmountMinErrorMessage('none');
        setPayAmountMaxErrorMessage('none');
        setPayAmountErrorMessage('none');
        // 申立て支払金額
        if (event.target.value.length === 0) {
            setPayAmountMinErrorMessage('');
        } else if (event.target.value.length > 18) {
            setPayAmountMaxErrorMessage('');
        } else {
            const isValid = /^(0|[1-9][0-9]*)+(.[0-9]{1,2})?$/.test(event.target.value);
            if (!isValid) {
                setPayAmountErrorMessage('');
            }
        }
    }
    const Payment2Change = (event: any) => {
        setCounterClaimPayment(event.target.value)
        setCounterClaimPaymentMinErrorMessage('none');
        setCounterClaimPaymentMaxErrorMessage('none');
        setCounterClaimPaymentErrorMessage('none');
        // 反訴支払い金額
        if (event.target.value.length === 0) {
            setCounterClaimPaymentMinErrorMessage('');
        } else if (event.target.value.length > 13) {
            setCounterClaimPaymentMaxErrorMessage('');
        } else {
            const isValid = /^(0|[1-9][0-9]*)+(.[0-9]{1,2})?$/.test(event.target.value);
            if (!isValid) {
                setCounterClaimPaymentErrorMessage('');
            }
        }
    }

    function handleDatePickerOnChange(value: any) {
        if (value === null) {
            setPaymentEndDateErrorMessage('');
            //   setFormData({ ...formData, PaymentEndDate: value });
            setPaymentEndDate(value)
        } else {
            const datePickerSelected = value.format('YYYYMMDD');
            //   setFormData({ ...formData, PaymentEndDate: datePickerSelected });
            setPaymentEndDate(datePickerSelected)
            const date = new Date(value);
            // const isValid = /^[1-9]\d{3}-([1-9]|1[0-2])-([1-9]|[1-2][0-9]|3[0-1])$/.test(date.toLocaleDateString().replace(/\//g,'-'));
            const isValid = /^\d{4}-\d{1,2}-\d{1,2}$/.test(date.toLocaleDateString().replace(/\//g, '-'));
            if (isValid) {
                setPaymentEndDateErrorMessage('none');
            } else {
                setPaymentEndDateErrorMessage('');
            }
        }
    }

    const FreightChange = (val: { target: { value: React.SetStateAction<string>; }; }) => {
        setShipmentPayType(val.target.value)
        if (val.target.value.length === 0) {
            setShipmentPayTypeErrorMessage('');
        } else {
            setShipmentPayTypeErrorMessage('none');
        }
    }
    const PrecautionsChange = (event: any) => {
        setSpecialItem(event.target.value)
        if (event.target.value.length > 200) {
            setSpecialItemErrorMessage('');
        } else {
            setSpecialItemErrorMessage('none');
        }
    }

    const handleClick = (flg: string) => {
        //给父组件传值的回调函数,1:控制弹窗是否打开的属性,2:控制渲染第一个小画面还是第二个
        const valueToSend1: boolean = false;
        const valueToSend2: boolean = true;
        const valueToSend3 = data;
        const OpenSnackbarMessageFlg1: string = flg;
        onChildValueChange(valueToSend1, valueToSend2, OpenSnackbarMessageFlg1, valueToSend3);
    };
    const handleClick1 = () => {
        const valueToSend1: boolean = false;
        const valueToSend2: boolean = true;
        const valueToSend3 = data;
        onChildValueChange(valueToSend1, valueToSend2, "0", valueToSend3);
    }
    const handleBarClose = () => {
        setOpen(false);
    };


    const handleDownload = () => {
        const jsonData = JSON.stringify(data);
        // 创建一个新的 Blob 对象
        const blob = new Blob([jsonData], { type: 'text/plain' });
        // 生成可下载的 URL
        const url = URL.createObjectURL(blob);
        // 创建一个隐藏的 <a> 元素用于触发下载
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'S17.txt'; // 下载文件的名称
        document.body.appendChild(a);
        a.click();
        if (options[selectedIndex] === '保存して編集を依頼') {
            setOpen(true);
        }
        // 清理资源
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
            PayAmount,
            CounterClaimPayment,
            PaymentEndDate: PaymentEndDate?.toString().split('T')[0] || '',
            ShipmentPayType,
            SpecialItem,
            FileUrl
        };
        console.log(data);
        // Perform further actions with the form data
    };

    const options = [OPTIONSS17_1, OPTIONSS17_2];
    const [selectOpen, setSelectOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);


    const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
        setSelectedIndex(index);
        setSelectOpen(false);
    };

    const handleToggle = () => {
        setSelectOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: { target: any; }) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setSelectOpen(false);
    };

    // S19 ポップアップの閉　flg:Popup画面ボタンの値
    const closeModalS19 = () => {
        setIsModalOpenS19(false);

    };
    // S19 ポップアップの閉　flg:Popup画面ボタンの値
    function openModalS19() {
        setIsModalOpenS19(true);
    };

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
        setFileUrl(file.name);
    }


    // const isButtonDisabled = PayAmount === '' || CounterClaimPayment === '' || PaymentEndDate === '' || ShipmentPayType === ''// 判断按钮是否禁用
    const isButtonDisabled = payAmountMinErrorMessage === '' || payAmountMaxErrorMessage === '' || payAmountErrorMessage === ''
        || counterClaimPaymentMinErrorMessage === '' || counterClaimPaymentMaxErrorMessage === '' || counterClaimPaymentErrorMessage === ''
        || paymentEndDateErrorMessage === '' || shipmentPayTypeErrorMessage === '' || specialItemErrorMessage === ''
        || filesizeErrorMessage === '' || filetypeErrorMessage === '';

    return (
        <div>
            {isLoading === null ? <div className='center-17'><CircularProgress /></div> :
                <form id='S17_2' onSubmit={handleSubmit}>
                    <div style={{ width: 1000, height: 410 }}>
                        <div style={{ marginLeft: 20 }}>和解の内容について、お答えください。</div>
                        <div style={{ marginBottom: 5, marginLeft: 50 }}>
                            <span id='inline'>申立て支払金額</span>
                            <span id='mustInput'>必须</span>
                            <FormControl >
                                <OutlinedInput
                                    id="claimPayment"
                                    onChange={(event) => Payment1Change(event)}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    value={PayAmount}
                                />
                            </FormControl>
                            <span style={{ display: payAmountMinErrorMessage, color: 'red', fontSize: 14, marginLeft: 25}}>申立て支払金額が入力必須です。</span>
                            <span style={{ display: payAmountMaxErrorMessage, color: 'red', fontSize: 14, marginLeft: 25 }}>18桁以下を入力してください。</span>
                            <span style={{ display: payAmountErrorMessage, color: 'red', fontSize: 14, marginLeft: 25 }}>小数2桁以下の半角数字を入力してください。</span>
                        </div>
                        <div style={{ marginBottom: 5, marginLeft: 50 }}>
                            <span id='inline'>反訴支払い金額</span>
                            <span id='mustInput'>必须</span>
                            <FormControl>
                                <OutlinedInput
                                    id="counterclaimPayment"
                                    onChange={(event) => Payment2Change(event)}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    value={CounterClaimPayment}
                                />
                            </FormControl>
                            <span style={{ display: counterClaimPaymentMinErrorMessage, color: 'red', fontSize: 14, marginLeft: 25 }}>反訴支払い金額が入力必須です。</span>
                            <span style={{ display: counterClaimPaymentMaxErrorMessage, color: 'red', fontSize: 14, marginLeft: 25 }}>13桁以下を入力してください。</span>
                            <span style={{ display: counterClaimPaymentErrorMessage, color: 'red', fontSize: 14, marginLeft: 25 }}>小数2桁以下の半角数字を入力してください。</span>
                        </div>
                        <div style={{ marginBottom: 5, marginLeft: 82 }}>
                            <span id='inline'>支払い期日</span>
                            <span id='mustInput'>必须</span>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker format='YYYY/MM/DD' value={dayjs(data.PaymentEndDate, "YYYYMMDD")} onChange={(value) => handleDatePickerOnChange(value)} />
                            </LocalizationProvider>
                            <span style={{ display: paymentEndDateErrorMessage, color: 'red', fontSize: 14, marginLeft: 5 }}>支払い期日を入力してください。</span>
                        </div>
                        <div style={{ marginBottom: 5, marginLeft: 81 }}>
                            <span id='inline'>返送時送料</span>
                            <span id='mustInput'>必须</span>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    id="radio-buttons-group"
                                    onChange={FreightChange}
                                    value={ShipmentPayType}
                                >
                                    <FormControlLabel value="申立人が支払う" control={<Radio />} label="申立人が支払う" />
                                    <FormControlLabel value="相手方が支払う" control={<Radio />} label="相手方が支払う" />
                                    <FormControlLabel value="返送なし" control={<Radio />} label="返送なし" />
                                </RadioGroup>
                            </FormControl>
                            <span style={{ display: shipmentPayTypeErrorMessage, color: 'red', fontSize: 14 }}>返送時送料が入力必須です。</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 5, marginLeft: 98 }}>
                            <span id='inline' >特記事項</span>
                            <span id='noMustInput'>任意</span>
                            <textarea rows={5} cols={50} onChange={(event) => PrecautionsChange(event)} style={{ resize: 'none', border: '1px solid #000000' }} value={SpecialItem}></textarea>
                            <span style={{ display: specialItemErrorMessage, color: 'red', fontSize: 14 }}>200桁以下を入力してください。</span>
                        </div>
                        <div style={{ marginBottom: 5, marginLeft: 97}}>
                            <span id='inline' >添付資料</span>
                            <span id='noMustInput'>任意</span>
                            <span>
                                <input type="file" id='upload' style={{ display: 'none' }} onChange={(e) => handleConfigFileSelect(e)} />
                                <a onClick={upload} style={{ color: 'blue' }}>添付ファイルの追加</a>

                            </span>
                            <br />
                            <span style={{marginLeft: 234}}>{FileUrl}</span>
                            
                            <span style={{ display: filesizeErrorMessage, color: 'red', fontSize: 14 }}>添付可能なファイル容量上限（100MB）を超えています。</span>
                            <span style={{ display: filetypeErrorMessage, color: 'red', fontSize: 14 }}>添付できない形式のファイルです。</span>
                        </div>
                    </div>
                    <div id='line_S17_2'></div>
                    <div style={{ width: 1000 }}>
                        <Button variant='contained' color="success" onClick={openModalS19} disabled={isButtonDisabled} style={{ float: 'right', marginLeft: 5, marginRight: 5 }}>和解案を作成</Button>
                        <ButtonGroup
                            variant="contained"
                            ref={anchorRef}
                            aria-label="Button group with a nested menu"
                            style={{ float: 'right', marginRight: 5 }}
                        >
                            <Button variant="outlined" style={{ color: 'black', borderColor: 'black' }} onClick={handleDownload}>{options[selectedIndex]}</Button>
                            <Button
                                size="small"
                                aria-controls={selectOpen ? 'split-button-menu' : undefined}
                                aria-expanded={selectOpen ? 'true' : undefined}
                                aria-label="select merge strategy"
                                aria-haspopup="menu"
                                onClick={handleToggle}
                                variant="outlined"
                                style={{ color: 'black', borderColor: 'black' }}
                            >
                                <ArrowDropDownIcon style={{ color: 'black', borderColor: 'black' }} />
                            </Button>
                        </ButtonGroup>
                        <Button variant='outlined' onClick={handleClick1} style={{ marginLeft: 60, marginRight: 5, color: 'black', borderColor: 'black' }}>戻る</Button>
                    </div>

                    <Popper
                        sx={{
                            zIndex: 1,
                        }}
                        open={selectOpen}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id="split-button-menu" autoFocusItem>
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    disabled={index === 2}
                                                    selected={index === selectedIndex}
                                                    onClick={(event: React.MouseEvent<HTMLLIElement, MouseEvent>) => handleMenuItemClick(event, index)}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                    {isModalOpenS19 && <S19 s19DiologOpen={true} closeModal={closeModalS19} data={data} closeModalS17={handleClick} />}
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleBarClose}
                        message="相手方に和解案の編集依頼を提出しました。"
                        action={
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleBarClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        }
                    />
                </form>
            }
        </div>
    )
}

export default S17_2;