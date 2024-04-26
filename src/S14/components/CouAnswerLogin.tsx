import React, { useState ,useEffect} from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Button, DialogActions, DialogContent, DialogTitle,styled} from '@mui/material';
import Axios from "axios";
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom';
import FilePdfOutlined from '@ant-design/icons/FilePdfOutlined';
import { KeyboardArrowDown } from '@mui/icons-material';
import { SNACKS14_1 } from '../../common/constants/constant';
import SnackbarDisplay from '../../common/utils/SnackbarDisplay';
import Step1 from '../../common/utils/step';
import PageHeader from '../../common/utils/pageHeader';
import '../mocks/mockJs';
import '../../common/styles/step.css'
import '../assets/styles/CouAnswerLogin.scss';
import { Dialog2 } from '../../common/components/dialog';
import { ColorWidthButton1,ColorWidthButton2 } from "../../common/components/ButtonCommon";

//共通进度条文字
const steps = [
    '入力',
    '確認',
    '完了'
];
// 定义error信息
const LoginFormSchema = z.object ({
    // 文本输入框的check
    requireContext: z
    .string()
    .min(1,{
        message: "回答の内容が入力必須です。"
    })
    .max(200,{
        message: "200桁以下を入力してください。"
    }),
});
function CouAnswerLogin() {
    const navigate = useNavigate();
    //申立内容显示与非显示的flg
    const [flg,setFlg] = useState(0);
    //textarea活性与非活性的flg
    const [flgT,setFlgt] = useState(0);
    //案件データ
    const [caseData, setCaseData] = useState<any>(null);
    //点击返回按钮的dilog
    const [openD, setOpenD] = useState(false);
    //跳转到S16用到的数据
    const [subData,setsubData] = useState(null);
   // 数据绑定用的from,submit表单
    const { register,handleSubmit,formState:{errors}} = useForm({
        defaultValues:{
            requireContext:'',
        },
        resolver:zodResolver(LoginFormSchema),
    })
    // 登陆方法
    function Login (data:any){
        if(filesizeErrorMessage === 'none' && filetypeErrorMessage === 'none'){
            setFlgt(1)
            //表单数据与mock数据拼接
            Object.assign(data,caseData)
            setsubData(data)
            // goto------------------
            // 反訴回答登録処理（新規登録） 反訴への回答データ新規登録API
            // 反訴回答登録処理（更新）  反訴への回答データ更新API
        }
    }
    //S15返回按钮
    function Modoru(){
        setFlgt(0)
    }
    function divOpen(){
        if(flg ===0){
            setFlg(1)
        }else{
            setFlg(0)
        }
    }
    //反訴・回答データ取得API
    useEffect(() =>{
        Axios.get('/GetClaimRepliesData')
        .then((response) =>{
            setCaseData(response.data.data)
        }
    )},[])
    //申立て件名
    function getCaseTitle(){
        if(caseData ===null || caseData ===undefined){
            return null;
        }else{
            return(
                <div className='titleFont'><p>{caseData.CaseId}_{caseData.CaseTitle}について</p></div>
            )
        }
    }
    //dialog打开
    function handleDialogOpen(){
        setOpenD(true);
    };
    //dialog关闭
    function handleDialogClose() {
        setOpenD(false);
    };
    //snackbar 
    const [OpenSnackbarMessageFlg, setOpenSnackbarMessageFlg] = useState('');

    //snakckbar回调
    const handleParameterChange = () => {
        setOpenSnackbarMessageFlg("5555555");
    };
    function handleSnackbarOpen(){
        // goto------------------
        //下書き保存処理（新規登録）反訴への回答データ新規登録API
        //下書き保存処理（更新）反訴への回答データ更新API
        setOpenSnackbarMessageFlg(SNACKS14_1)
    };
    // pdf文件上传
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    //文件sizeerrormessage
    const [filesizeErrorMessage, setFilesizeErrorMessage] = React.useState('none');
    //文件typeerrormessage
    const [filetypeErrorMessage, setFiletypeErrorMessage] = React.useState('none');
    //文件上传之后页面显示文件名
    const[file,setFile] = useState('')
    const[flgFile,setFileN] = useState(0)
    function pdfUpdow(event:any){
        setFilesizeErrorMessage('none');
        setFiletypeErrorMessage('none');
        setFile(event.target.files[0].name);
        const acceptedTypes = ['.ade', '.adp', '.apk', '.appx', '.appxbundle', '.bat', '.cab', '.chm', '.cmd', '.com', '.cpl', '.dll', '.dmg', '.exe', '.hta', '.ins', '.isp', '.iso', '.jar', '.js', '.jse', '.lib', '.lnk', '.mde',
            '.msc', '.msi', '.msix', '.msixbundle', '.msp', '.mst', '.nsh', '.pif', '.scr', '.sct', '.shb', '.sys', '.vb', '.vbe', '.vbs', '.vxd', '.wsc', '.wsf', '.wsh'];
        const files = event.target.files;
        if (files.length !== 0) {
            const uploadedFile = files[0];
            const formData = new FormData();
            formData.append(uploadedFile.name, uploadedFile);
            // 获取文件后缀名
            const fileType = uploadedFile.name.substr(uploadedFile.name.lastIndexOf(".")).toLowerCase();
            // 添付ファイル容量上限チェック
            if (uploadedFile.size > 1024 * 1024 * 100) {
                setFilesizeErrorMessage('');
            } else
            // 添付ファイル拡張子チェック
            if (acceptedTypes.includes(fileType)) {
                setFiletypeErrorMessage('');
            } else {
                setFileN(1);
            }
        }
    }
    if(caseData){
        return(
            <div id='CouAnswerLogin'>
            <PageHeader pageFlg={'0'} />
            <div className='borderStyle'>
                <form onSubmit={handleSubmit(Login)}>
                <label><h3>反訴への回答の登録</h3></label>
                <label>以下の反訴に対する回答の入力をお願いします。</label>
                {flgT===0 ? 
                    <div>
                        {<Step1 stepNum={flgT} steps={steps}/>}
                    </div>:
                    <div>
                        {<Step1 stepNum={flgT} steps={steps}/>}
                        <div className='S15labelStyle'>
                            <label >入力内容をご確認ください。よろしければ「登録する」ご端をクリックしてください</label>
                        </div>
                    </div>
                }
                <br/>
                <div className='labelStyle'>
                    <div>
                        <Button className ='butStyle' onClick={divOpen} >
                            {flg===0?<ExpandLessIcon fontSize="small" />:
                                <KeyboardArrowDown fontSize="small" />
                            }
                        </Button>
                        {getCaseTitle()}
                    </div>
                    {flg === 0 && 
                        <div>
                            <table className='tabStyle'>
                                <tbody>
                                    <tr>
                                        <td className="contentFontStyle">申立て番号</td>
                                        <td className="contentFontStyle">{caseData.CaseId}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="contentFontStyle">反訴の内容</td>
                                        <td className="contentFontStyle">{caseData.CounterContext}</td>
                                    </tr>
                                    <tr>
                                        <td className="contentFontStyle">添付資料</td>
                                        {caseData.FileName === null || caseData.FileName === undefined ?
                                            <td className="contentFontStyle" >添付資料なし</td>
                                            :
                                            <td className="contentFontStyle">
                                            <Button variant="text" disabled={flgT === 1? true : false} style={{backgroundColor:'transparent'}}><FilePdfOutlined className='PdfStyle'/>{caseData.FileName}</Button></td>
                                        }
                                    </tr>
                                    <tr>
                                        <td className="contentFontStyle">相手方</td>
                                        <td className="contentFontStyle" >{caseData.LastName}{caseData.FirstName}</td>
                                    </tr>
                                    <tr>
                                        <td className="contentFontStyle"></td>
                                        <td className="contentFontStyle" >{caseData.CompanyName}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> 
                    } 
                </div>
                <br/>
                <div>
                {flgT===0 ? 
                    <label className='textStyle'>回答の内容</label>:
                    <label className='textStyle'>回答の確認</label>
                }
                </div>
                <br></br>
                <div>
                    <label className='caseStyle'>回答の内容</label>
                    <label className='mastStyle' hidden={flgT === 1? true : false}>必須</label>
                    <textarea className='textareaStyle' {...register("requireContext")} disabled={flgT === 1? true : false}>
                    </textarea>
                    <div className='errorMsgArea'>
                        {errors.requireContext && <span style={{color:'red',fontSize: 14}}>{errors.requireContext.message}</span>}
                    </div>
                    <br/>
                    <label className='fileStyle'>添付資料</label>
                    <label className='arbStyle' hidden={flgT === 1? true : false} >任意</label>
                    <Button
                        component="label"
                        role={undefined}
                        tabIndex={-1}
                        startIcon={<FilePdfOutlined className='PdfStyle'/>}
                        onChange={pdfUpdow} 
                        disabled={flgT === 1? true : false}
                        >
                            {flgFile ===0 ?
                                <span>添付ファイルの追加</span> : <span>{file}</span>}
                        <VisuallyHiddenInput type='file'/>
                    </Button>
                    <div className='errorMsgArea'>
                        <span style={{ display: filesizeErrorMessage,color: 'red',fontSize: 14 }}>添付可能なファイル容量上限（100MB）を超えています。</span>
                        <span style={{ display: filetypeErrorMessage,color: 'red',fontSize: 14 }}>添付できない形式のファイルです。</span>
                    </div>
                </div>
                {flgT===0 ? 
                    <div className='butsStyle'>
                        <ColorWidthButton2 style={{float:'right'}} variant="contained" color="success" type='submit'>確認画面へ</ColorWidthButton2>
                        <ColorWidthButton1 style={{float:'right'}} variant="outlined" onClick={handleSnackbarOpen}>下書き保存</ColorWidthButton1>
                        <ColorWidthButton1 style={{float:'right'}} variant="outlined" onClick={handleDialogOpen}>戻る</ColorWidthButton1>
                    </div>:
                    <div className='butsStyle'>
                        <ColorWidthButton2 style={{float:'right'}} variant="contained" color="success" type='submit' onClick={() => navigate('/S16',{state:{submitData:subData}})} >登録する</ColorWidthButton2>
                        <ColorWidthButton1 style={{float:'right'}} variant="outlined"  onClick={Modoru} >戻る</ColorWidthButton1>
                    </div>
                }
                </form>
                {OpenSnackbarMessageFlg === SNACKS14_1 && <SnackbarDisplay OpenSnackbarMessageFlg={OpenSnackbarMessageFlg} onMessageChange={handleParameterChange}/>}
                <Dialog2
                open={openD}
                onClose={handleDialogClose}
                >
                <DialogTitle id="alert-dialog-title">
                    このページから移動しますか？
                </DialogTitle>
                <DialogContent>
                    <div>
                        <label>
                        ページを離れると入力中の内容が失われます。よろしいですか？
                        </label>
                        <br/>
                        <br/>
                        <label>
                        入力内容を保存する場合は「このページに留まる」を選択し、画面下部の「下書き保存」ボタンより保存を行ってください。
                        </label>
                    </div>
                </DialogContent>
                <DialogActions>
                    <ColorWidthButton1 variant="outlined" onClick={handleDialogClose} >このページに留まる</ColorWidthButton1>
                    <ColorWidthButton1 variant="outlined" onClick={() => navigate('/S04',{state:{caseId:'40000004',positionFlg:"1"}})} autoFocus >このページから移動</ColorWidthButton1>
                </DialogActions>
            </Dialog2>
            </div>
            </div>
        )
    }else{
        return null;
    }
}
export default CouAnswerLogin;
