import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Link from '@mui/material/Link';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import FormGroup from '@mui/material/FormGroup';
import { FileAddOutlined } from '@ant-design/icons';
import { useLocation } from "react-router-dom";
import { CircularProgress, TextField } from '@mui/material';
import { CHECKBOXS17_1, CHECKBOXS17_2, CHECKBOXS17_3, CHECKBOXS17_4, CHECKBOXS17_6, FROMHELPTEXTS17 } from '../../common/constants/constant';
import { Dialog2 } from '../../common/components/dialog';
import '../mocks/mockS11';
import '../assets/styles/AnswerLogin.css';
import { ColorWidthButton1,ColorWidthButton2 } from "../../common/components/ButtonCommon";



// 「+ 代理人の追加」リンク表示フラグ
let showflg = 'none';

let counterclaimFileName = "";
let FileName = "";

/*定义不允许上传的文件后缀*/
const filePostfix =
    "'ade',  'adp',  'apk',  'appx',  'appxbundle',  'bat',  'cab',  'chm',  'cmd',  'com',  'cpl',  'dll',  'dmg',  'exe',  'hta',  'ins',  'isp',  'iso',  'jar',  'js',  'jse',  'lib',  'lnk',  'mde',  'msc',  'msi',  'msix',  'msixbundle',  'msp',  'mst',  'nsh',  'pif',  'scr',  'sct',  'shb',  'sys',  'vb',  'vbe',  'vbs',  'vxd',  'wsc',  'wsf',  'wsh'";


// 回答の内容の表示
function AnswerContent() {
    // 画面迁移
    const navigate = useNavigate();
    const { state } = useLocation();
    let checkBoxValue = [false, false, false, false, false];
    let sonotaNy = '';
    let anwserNy = '';
    let counterclaimNy = '';
    let hansuRd = '';
    let agentArr = [];

    if (state !== null) {
        // checkBox
        checkBoxValue = state.checkedShohin;
        // その他
        sonotaNy = state.otherNaiyou;
        // 回答の内容
        anwserNy = state.anwserNaiyou;
        // 反訴の内容
        counterclaimNy = state.counterclaimNaiyou;
        // radio
        hansuRd = state.radioCheck;
        // 代理人メールアドレス
        agentArr = state.agentArray;
    }
    function ktTpChkChange(index: number) {
        let myArryBack = [...ktTpChk];
        myArryBack.splice(index, 1, !ktTpChk[index]);
        setKtTpChk([...myArryBack]);
    };

    // 反訴
    const hansuRdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHansuRd((event.target as HTMLInputElement).value);
    }

    // その他内容
    function sonotaNyChange(e: any) {
        setSonotaNy(e.target.value);
        //　「その他」の内容が入力必須のエラーメッセージ表示
        setReplyOtherErrorMessage('')
    }

    // 回答の内容_必須
    function anwserNyChange(e: any) {
        setAnwserNy(e.target.value);
    }
    // 反訴の内容_必須
    function counterclaimNyChange(e: any) {
        setCounterclaimNy(e.target.value);
    }

    // エラーメッセージの表示フラグ
    const [errMsgShow, setErrMsgShow] = useState(false);
    // 回答の種類(初期が選択れていません)
    const [ktTpChk, setKtTpChk] = useState(checkBoxValue);
    // 回答の種類_その他内容
    const [sonotaNaiyou, setSonotaNy] = useState(sonotaNy);
    // 回答の種類选中状态がその他場合、入力必須のエラーメッセージ表示
    const [replyOtherErrorMessage, setReplyOtherErrorMessage] = React.useState('');
    // 回答の内容_必須
    const [anwserNaiyou, setAnwserNy] = useState(anwserNy);
    // 反訴の内容_必須
    const [counterclaimNaiyou, setCounterclaimNy] = useState(counterclaimNy);
    // radio
    const [radioCheck, setHansuRd] = useState(hansuRd);
    // 上传文件
    const [file, setFile] = useState("");
    //文件fileTypeError
    const [fileTypeError, setFileTypeError] = React.useState('');
    //文件typeErrorMessage
    const [fileTypeErrorMessage, setFileTypeErrorMessage] = React.useState('none');
    //文件sizeErrorMessage
    const [fileSizeErrorMessage, setFileSizeErrorMessage] = React.useState('none');
    // 反訴文件fileError
    const [fileSizeError, setFileSizeError] = React.useState('');
    //反訴文件typeErrorMessage
    const [counterclaimFileTypeErrorMessage, setCounterclaimFileTypeErrorMessage] = React.useState('none');
    //反訴文件sizeErrorMessage
    const [counterclaimFileSizeErrorMessage, setCounterclaimFileSizeErrorMessage] = React.useState('none');
    // 代理人　入力時のチェック
    const [agentEmailInputCheck, setAgentEmailInputCheck] = React.useState<String[]>([]);
    // 代理人　順番入力必須
    const [agentEmailIndexMust, setAgentEmailIndexMust] = React.useState<number[]>([]);
    // Dialog設定値
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogOpen2, setDialogOpen2] = useState(false);
    // ”下書きを保存しました。”イメージの設定値
    const [imageOpen, setImageOpen] = useState(false);

    // 关闭"下書きを保存しました。"
    function handleImageClose() {
        setImageOpen(false);
    };

    // 会員情報の変更のdialog
    function handleClickOpen() {
        setDialogOpen(true);
    };
    // dialog关闭设定
    function handleClose() {
        setDialogOpen(false);
    };

    function handleClickOpen2() {
        setDialogOpen2(true);
    };
    // dialog关闭设定
    function handleClose2() {
        setDialogOpen2(false);
    };

    const [res, setRes] = useState<any>(null);

    // mock数据
    useEffect(() => {
        axios.get('/getOdrUserInfo11')
            .then((response) => {
                setRes(response.data);
            })
    }, [])
    // 数组初期化设定
    const [agentArray, setAgentArray] = useState<String[]>(agentArr);

    // 代理人追加
    function agentadd() {
        setAgentArray([...agentArray, '']);
    }
    // 代理人输入内容区域 保存内容
    function saveText(index: number, e: any) {
        const agentemailvalue = e.target.value
        const isValid = /^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/.test(agentemailvalue);
        // 代理人メールアドレスのチェック
        if (agentemailvalue === '' || isValid) {
            // 代理人メールアドレスの入力チェック checkなし
            const agentEmailText = agentEmailInputCheck.filter(item => item !== ("agent" + index))
            setAgentEmailInputCheck([...agentEmailText])
            // 代理人メールアドレス 順番入力必須 checkなし
            const agentEmailindexs = agentEmailIndexMust.filter(item => item !== (index))
            setAgentEmailIndexMust([...agentEmailindexs])
        }
        else if (!isValid) {
            // 代理人メールアドレスの入力チェック
            const agentError: String[] = agentEmailInputCheck
            agentError.push("agent" + index)
            setAgentEmailInputCheck([...agentError])
        }

        let agentArryBack = [...agentArray];
        agentArryBack.splice(index, 1, e.target.value);
        setAgentArray([...agentArryBack]);
    }
    // 代理人删除
    function agentremove(index: number) {
        let agentArryBack = [...agentArray];
        if (index !== -1) {
            agentArryBack.splice(index, 1);
        }
        setAgentArray([...agentArryBack]);

        // 「代理人メールアドレスの削除」を押す、代理人を削除
        //　削除対応削除後、indexを確認している
        let agentEmailIndexMustExpurgate: number[] = [];
        agentEmailIndexMust.forEach(item => {
            if (item > index) {
                agentEmailIndexMustExpurgate.push(item - 1)
            } else if (item < index) {
                agentEmailIndexMustExpurgate.push(item)
            }
        })
        setAgentEmailIndexMust([...agentEmailIndexMustExpurgate])
    }

    // 数据绑定用的form
    const { handleSubmit } = useForm({
        defaultValues: {
            checkedShohin: [],
            anwserNaiyou: '',
            counterclaimNaiyou: '',
            radioCheck: '',
            otherNaiyou: '',
            FileName: '',
            counterclaimFileName: '',
            iderrormessage: 'none',
            caseId: '',
            positionFlg: ''
        }
    });

    // 提交表单，画面迁移
    const onSubmit = (data: any) => {
        data.FileName = FileName
        data.counterclaimFileName = counterclaimFileName
        data.checkedShohin = ktTpChk
        data.otherNaiyou = sonotaNaiyou
        data.anwserNaiyou = anwserNaiyou
        data.counterclaimNaiyou = counterclaimNaiyou
        data.radioCheck = radioCheck
        data.agentArray = agentArray

        // 代理人メールアドレス 順番入力必須  check
        const agentIndex: number[] = agentEmailIndexMust
        agentArray.map((item, index) => {
            if (item === '') {
                agentIndex.push(index)
            }
            setAgentEmailIndexMust([...agentIndex])
        })

        if (anwserNaiyou !== '' && (radioCheck === 'hanSu' && counterclaimNaiyou !== '')
            && (ktTpChk[4] ? sonotaNaiyou !== '' : true)
            && fileTypeErrorMessage === 'none' && fileSizeErrorMessage === 'none'
            && counterclaimFileTypeErrorMessage === 'none' && counterclaimFileSizeErrorMessage === 'none'
            && agentEmailInputCheck.length === 0
            && agentEmailIndexMust.length === 0
        ) {
            navigate('/S12', { state: data })
        } else if (anwserNaiyou !== '' && radioCheck === 'UnHanSu'
            && (ktTpChk[4] ? sonotaNaiyou !== '' : true)
            && fileTypeErrorMessage === 'none' && fileSizeErrorMessage === 'none'
            && counterclaimFileTypeErrorMessage === 'none' && counterclaimFileSizeErrorMessage === 'none'
            && agentEmailInputCheck.length === 0
            && agentEmailIndexMust.length === 0
        ) {
            navigate('/S12', { state: data })
        }
    }

    // 「下書き保存」ボタンを押下で、写入文件的数据
    const handleDownload = () => {
        // "下書きを保存しました。"イメージの設定値
        setImageOpen(true);
        // 要写入文件的数据
        const data = {
            DeleteFlag: "1",
        };

        const jsonData = JSON.stringify(data);

        // 创建一个新的 Blob 对象
        const blob = new Blob([jsonData], { type: 'text/plain' });

        // 生成可下载的 URL
        const url = URL.createObjectURL(blob);

        // 创建一个隐藏的 <a> 元素用于触发下载
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // 下载文件的名称
        a.download = 'CaoGao.txt';

        document.body.appendChild(a);
        a.click();

        // 清理资源
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    // link链接button（添加文件）
    function upload() {
        let up = document.getElementById('upload')
        if (up !== null) {
            up.click();
        }
    };
    // 反诉link链接button（添加文件）
    function counterclaimUpload() {
        let up = document.getElementById('counterclaimUpload')
        if (up !== null) {
            up.click();
        }
    };

    // 添付資料の文件检查
    const beforeUploadHandler = (file: any) => {
        let splitByDot = file.name.split(".");
        //取最后一个“.”后的内容：1.1.jpg
        let postfix = splitByDot[splitByDot.length - 1];
        // 文件格式检查
        if (filePostfix.indexOf(postfix) > -1) {
            setFileTypeErrorMessage('')
            setFileTypeError('添付できない形式のファイルです。')
        } else if (file.size > 100000000) {
            // 文件大小检查
            setFileSizeErrorMessage('')
            setFileTypeError('添付可能なファイル容量上限（100MB）を超えています。')
        } else {
            FileName = file.name;
            setFileTypeErrorMessage('none')
            setFileSizeErrorMessage('none')
        }
    }

    // 反訴添付資料の文件检查
    const counterclaimBeforeUploadHandler = (file2: any) => {
        let splitByDot = file2.name.split(".");
        //取最后一个“.”后的内容：1.1.jpg
        let postfix = splitByDot[splitByDot.length - 1];
        // 文件格式检查
        if (filePostfix.indexOf(postfix) > -1) {
            setCounterclaimFileTypeErrorMessage('')
            setFileSizeError('添付できない形式のファイルです。')
        } else if (file2.size > 100000000) {
            // 文件大小检查
            setCounterclaimFileSizeErrorMessage('')
            setFileSizeError('添付可能なファイル容量上限（100MB）を超えています。')
        } else {
            counterclaimFileName = file2.name;
            console.log("filename:" + counterclaimFileName);
            setCounterclaimFileTypeErrorMessage('none')
            setCounterclaimFileSizeErrorMessage('none')
        }
    }

    // 添付資料 取文件（不用mui组件）
    const handleFileChange = (event: any) => {
        beforeUploadHandler(event.target.files[0])
        setFile(event.target.files[0]);
    };

    // 反訴添付資料 取文件（不用mui组件）
    const counterclaimHandleFileChange = (event: any) => {
        counterclaimBeforeUploadHandler(event.target.files[0])
        setFile(event.target.files[0]);

    };
    // 确认按钮点击设定
    function setErrMsgShowFlg() {
        setErrMsgShow(true);
        // 回答の種類がその他場合、その他内容が空場合、エラーメッセージを表示する
        if (ktTpChk[4] && sonotaNaiyou === '') {
            setReplyOtherErrorMessage('null')
        }
    };
    return (
        <div>
            {res === null || res === undefined ? <div className='center-container'><CircularProgress /></div> :
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className='label'>回答の内容</label>
                        <div className='Div-checkBox'>
                            <div>
                                <FormGroup>
                                    <div>
                                        <label>回答の種類</label>
                                        <label className="Must-header-checkBox">必須</label>
                                        <FormControlLabel control={<Checkbox checked={ktTpChk[0]} onChange={() => ktTpChkChange(0)} />} label={CHECKBOXS17_2} /></div>
                                    <div className='answerTypeCheckBox'>
                                        <FormControlLabel control={<Checkbox checked={ktTpChk[1]} onChange={() => ktTpChkChange(1)} value={ktTpChk[1]} />} label={CHECKBOXS17_1} /></div>
                                    <div className='answerTypeCheckBox'>
                                        <FormControlLabel control={<Checkbox checked={ktTpChk[2]} onChange={() => ktTpChkChange(2)} value={ktTpChk[2]} />} label={CHECKBOXS17_3} /></div>
                                    <div className='answerTypeCheckBox'>
                                        <FormControlLabel control={<Checkbox checked={ktTpChk[3]} onChange={() => ktTpChkChange(3)} value={ktTpChk[3]} />} label={CHECKBOXS17_4} /></div>
                                    <div className='answerTypeCheckBox'>
                                        <FormControlLabel control={<Checkbox checked={ktTpChk[4]} onChange={() => ktTpChkChange(4)} value={ktTpChk[4]} />} label={CHECKBOXS17_6} /></div>
                                    <div className={`sonotaNy ${ktTpChk[4] ? 'sonotaNyShow' : 'sonotaNyUnShow'}`}>
                                        <FormHelperText style={{ marginLeft: "18px" }}>{FROMHELPTEXTS17}</FormHelperText>
                                        <input className='must-choose' value={sonotaNaiyou} onChange={(e: any) => sonotaNyChange(e)} ></input>
                                    </div>
                                    <div className={`${!ktTpChk[0] && !ktTpChk[1] && !ktTpChk[2] && !ktTpChk[3] && !ktTpChk[4] && errMsgShow ? 'mustShow' : 'sonotaNyUnShow'}`}>選択必須 </div>
                                    <div style={{ display: ktTpChk[4] && replyOtherErrorMessage !== '' ? 'flex' : 'none', height: '20px' }}>
                                        <span style={{ marginLeft: '120px', color: 'red' }}>「その他」の内容が入力必須です</span>
                                    </div>
                                </FormGroup>
                            </div>
                            <div>
                                < div className='must-answer-div'>
                                    <span>回答の内容
                                        <label className="must-answer">必須
                                        </label>
                                    </span>
                                </div>
                                <div style={{ marginBottom: "10px" }}>
                                    <input className='input-answer' value={anwserNaiyou} onChange={(e: any) => anwserNyChange(e)}
                                        id="anwserNaiyou" color="warning" />
                                    <div className={`${anwserNaiyou === '' && errMsgShow ? 'mustShow' : 'sonotaNyUnShow'}`}>入力必須 </div>
                                </div>
                            </div>
                            <div>
                                <div className='must-link-div'>
                                    <span>添付資料</span>
                                    <label className='must-link-siryo'>任意</label>
                                    <div>
                                        {/* 显示已经添加的文件 */}
                                        <input type="file" onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                            id='upload' />
                                        {/* FileAddOutlined：+号图标 */}
                                        <a style={{ color: 'blue' }} onClick={upload} ><FileAddOutlined />添付ファイルの追加</a>
                                        <div style={{ display: fileTypeErrorMessage && fileSizeErrorMessage ? 'none' : 'flex', marginLeft: '10px' }}>
                                            <span style={{ color: 'red' }}>{fileTypeError}</span>
                                        </div>
                                        <div style={{ display: fileSizeErrorMessage && fileTypeErrorMessage ? 'flex' : 'none' }}>
                                            {FileName === '' ? <p>なし</p> :
                                                <p><input style={{ width: "300px", height: "30px" }} value={FileName} disabled></input></p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='counterclaimDiv'>
                                <label>反訴の有無</label>
                                <label className="must-answer">必須</label></div>
                            <div>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={radioCheck}
                                    onChange={hansuRdChange}>
                                    <FormControlLabel value="UnHanSu" control={<Radio />} label="反訴を行わない" />
                                    <FormControlLabel value="hanSu" control={<Radio />} label="反訴を行う" />
                                </RadioGroup>
                                <div className={`${radioCheck === '' && errMsgShow ? 'mustShow' : 'sonotaNyUnShow'}`}>選択必須 </div>
                            </div>
                            <div className={`${radioCheck === "hanSu" ? 'counterclaimShow' : 'sonotaNyUnShow'}`}>
                                <label>反訴の内容</label>
                                <label className="must-answer">必須</label>
                                <input className='input-answer' color="warning" value={counterclaimNaiyou} onChange={(e: any) => counterclaimNyChange(e)} />
                                <div className={`${counterclaimNaiyou === '' && errMsgShow ? 'mustShow' : 'sonotaNyUnShow'}`}>入力必須 </div>
                                <br></br>
                                <div style={{ marginTop: "10px" }}>
                                    <span style={{ marginLeft: '-30px' }}>反訴の添付資料</span>
                                    <label className='must-link-siryo'>任意</label>

                                    {/* 显示已经添加的文件 */}
                                    <input type="file" onChange={counterclaimHandleFileChange}
                                        style={{ display: 'none' }}
                                        id='counterclaimUpload' />
                                    {/* FileAddOutlined：+号图标 */}
                                    <a style={{ color: 'blue' }} onClick={counterclaimUpload} ><FileAddOutlined />添付ファイルの追加</a>
                                    <div style={{ display: counterclaimFileTypeErrorMessage && counterclaimFileSizeErrorMessage ? 'none' : 'flex', marginLeft: '120px' }}>
                                        <span style={{ color: 'red' }}>{fileSizeError}</span>
                                    </div>
                                    <div style={{ display: counterclaimFileTypeErrorMessage && counterclaimFileSizeErrorMessage ? 'flex' : 'none' }}>
                                        {counterclaimFileName === '' ? <p className='file-answer'>なし</p> :
                                            <p className='file-answer'><input style={{ width: "300px", height: "30px" }} value={counterclaimFileName} disabled></input></p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className='answer-jyouho-label'>回答をされる方についての情報</label>
                            <div className='answer-jyouho-div'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='answer-jyouho-title'>所属会社</td>
                                            <td className='answer-jyouho-td'>{res.kaisya}</td>
                                        </tr>
                                        <tr className='tr'>
                                            <td className='answer-jyouho-title'>氏名</td>
                                            <td className='answer-jyouho-td'>{res.simei}</td>
                                        </tr>
                                        <tr>
                                            <td className='answer-jyouho-title'>氏名(カナ)</td>
                                            <td className='answer-jyouho-td'>{res.simeikana}</td>
                                        </tr>
                                        <tr className='tr'>
                                            <td className='answer-jyouho-title'>メールアドレス</td>
                                            <td className='answer-jyouho-td'>{res.mailAdress}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className='divJyouho'>
                                    <label>情報を変更したい場合は、会員情報の変更をお願いします。</label>
                                </div>
                                <div className='dialog'>
                                    <React.Fragment>
                                        <Link style={{ marginLeft: "20px", color: "blue" }} underline="always" onClick={handleClickOpen2}>会員情報の変更
                                        </Link>
                                        <Dialog2
                                            open={dialogOpen2}
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                {"このページから移動しますか？"}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    このページから移動しますか？<br />
                                                    ページを離れると入力中の内容が失われます。よるしいですか？<br />
                                                    入力内容を保存する場合は「このページに留まる」を選択し、画面下部の「下書き保存」ボタンより保存を行ってください。aj,dhsa,jsdjjabgma
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <ColorWidthButton1 variant="outlined" onClick={handleClose2} style={{ color: "black" }}>このページに留まる</ColorWidthButton1>
                                                <ColorWidthButton1 variant="outlined" style={{ color: "black" }} onClick={() => navigate('/U02')}>このページから移動</ColorWidthButton1>
                                            </DialogActions>
                                        </Dialog2>
                                    </React.Fragment>
                                </div>
                                <div>
                                    <div style={{ marginLeft: "20px" }}>
                                        {agentArray.length !== 0 && (<ul>
                                            {
                                                agentArray.map((item, index) => (
                                                    <div key={index}>
                                                        <li style={{ listStyleType: 'none' }}>
                                                            <span>代理人{index + 1}メールアドレス</span>
                                                            <TextField id='agentemail' className='agentemail-input' onChange={e => saveText(index, e)} value={item} /><br />
                                                            <div>
                                                                {agentEmailInputCheck.indexOf("agent" + index) !== -1 ?
                                                                    <span style={{ marginLeft: '140px', color: 'red' }}>正しいメールアドレスを入力してください</span>
                                                                    : (agentEmailIndexMust.indexOf(index) !== -1
                                                                        && <span style={{ marginLeft: '140px', color: 'red' }}>代理人{index + 1}メールアドレスを入力してください</span>)
                                                                }
                                                            </div>
                                                            <div>
                                                                <Link className='agentemail-link' onClick={() => agentremove(index)}>+ 代理人{index + 1}の削除</Link>
                                                            </div>
                                                        </li>
                                                    </div>
                                                ))
                                            }
                                        </ul>)}
                                    </div>
                                    <div className='divJyouho'>
                                        <Link onClick={() => agentadd()} style={agentArray.length >= 5 ? { display: 'none' } : {}}>+ 代理人の追加</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='btn-div'>
                            <ColorWidthButton2 style={{ float: 'right' }} type='submit' onClick={setErrMsgShowFlg}  variant="contained" color="success">
                                確認画面へ
                            </ColorWidthButton2>
                            <ColorWidthButton1 style={{ float: 'right' }} variant="outlined" onClick={handleDownload}>
                                下書き保存
                            </ColorWidthButton1>
                            <ColorWidthButton1 style={{ float: 'right' }} variant="outlined" onClick={handleClickOpen}>
                                戻る
                            </ColorWidthButton1>
                        </div>

                    </form>
                </div>
            }
            <React.Fragment>
                <Dialog2
                    open={dialogOpen}
                    onClose={handleClose}
                >
                    <DialogTitle id="alert-dialog-title">
                        {"このページから移動しますか？"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            このページから移動しますか？<br />
                            ページを離れると入力中の内容が失われます。よるしいですか？<br />
                            入力内容を保存する場合は「このページに留まる」を選択し、画面下部の「下書き保存」ボタンより保存を行ってください。
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <ColorWidthButton1  variant="outlined" onClick={handleClose} style={{ color: "black" }}>このページに留まる</ColorWidthButton1>
                        <ColorWidthButton1  variant="outlined" style={{ color: "black" }} onClick={() => navigate('/S04', { state: { caseId: '1234', positionFlg: '2' } })} >
                            このページから移動
                        </ColorWidthButton1>
                    </DialogActions>
                </Dialog2>
            </React.Fragment>

            <Snackbar
                open={imageOpen}
                autoHideDuration={6000}
                onClose={handleImageClose}
                message="下書きを保存しました。"
                action={<IconButton size="small" aria-label="close" color="inherit" onClick={handleImageClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>} />
        </div>
    )
}

export default AnswerContent;