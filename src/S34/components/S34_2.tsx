import React, { useState, useEffect } from 'react';
import '../assets/styles/S34_2.css';
import '../mocks/mockJs_s34.js';
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";
import { FileAddOutlined } from '@ant-design/icons';
import { TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import { Box} from '@mui/material';
import { CircularProgress } from '@mui/material';
import { ColorWidthButton1 } from '../../common/components/ButtonCommon'
import { ColorWidthButton2 } from '../../common/components/ButtonCommon'

/*定义不允许上传的文件后缀*/
const filePostfix = "'ade',  'adp',  'apk',  'appx',  'appxbundle',  'bat',  'cab',  'chm',  'cmd',  'com',  'cpl',  'dll',  'dmg',  'exe',  'hta',  'ins',  'isp',  'iso',  'jar',  'js',  'jse',  'lib',  'lnk',  'mde',  'msc',  'msi',  'msix',  'msixbundle',  'msp',  'mst',  'nsh',  'pif',  'scr',  'sct',  'shb',  'sys',  'vb',  'vbe',  'vbs',  'vxd',  'wsc',  'wsf',  'wsh'";

// showflg2初始化
let showflg2 = 'none';

const S34_2 = (props: any) => {

    // 判断数据库数据是否取到
    const [loading,setLoading] = useState(true)

    // 画面跳转（S4)判断用flg
    const [flg] = useState('1');

    // S4画面传递
    const navigate = useNavigate(); 

    // 定义错误信息
    const LoginFormSchema = z.object({
        reason: z
        .string()
        .min(1, {
            message: "理由が入力必須です。",
        })
        .max(200 ,{
            message: "200桁以下を入力してください。",
        })
    })

    type FormFields = z.infer<typeof LoginFormSchema>;
    
    // 数据绑定用的form
    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormFields>({
        resolver: zodResolver(LoginFormSchema),
    });

    // 指定跳转画面，传值给下个画面
    const Login = (data: any) => {
        if(filesizeErrorMessage === 'none' && filetypeErrorMessage === 'none'){
            navigate('/S04', {state:{form01:data.reason, fileName:myArray2, positionFlg:flg, caseId:'40000008', S34Flg:1}})
        }
    }

    const {closeModal2} = props;

    // 变更回数取得
    const [cyclenumber, setCyclenumber] = useState(0)
    useEffect(() =>{
        axios.get('/getMediatorChangeableCount').then((response) =>{
            setCyclenumber(response.data.data.cyclenumber)
            setLoading(false)
        })
    },[])

    // 按钮状态初始值
    const [flags, setFlags] = useState(true);

    // 设定提交按钮状态
    const button_status = (event: any) => {
        if (event.target.value.length > 0) {
            setFlags(false)
        } else {
            setFlags(true)
        }
    };

    // 文件list初始化
    const [myArray2, setMyArray2] = useState<any>([]);
    //文件typeerrormessage
    const [filetypeErrorMessage, setFiletypeErrorMessage] = React.useState('none');
    //文件sizeerrormessage
    const [filesizeErrorMessage, setFilesizeErrorMessage] = React.useState('none');
    // 文件检查
    const handleFileChange2 = (event: any) => {
        setFiletypeErrorMessage('none');
        setFilesizeErrorMessage('none');

        let splitByDot = event.target.files[0].name.split(".");
        //取最后一个“.”后的内容：1.1.jpg
        let postfix = splitByDot[splitByDot.length - 1];

        // 文件名称添加到list
        let myArryBack = [...myArray2];

        if (filePostfix.indexOf(postfix) > -1) {
            // setErrornumber(1);
            // message.warning(
            //     "添付できない形式のファイルです。"
            //     )
            setFiletypeErrorMessage('');
            let myArryBack = [...myArray2];
            myArryBack.splice(myArray2.length-1, 1);
            setMyArray2([...myArryBack]);
        } else 
        // 文件大小检查
        if (event.target.files[0].size > 1024 * 1024 * 200) {
            // setErrornumber(1);
            // message.warning(
            // "添付可能なファイル容量上限（200MB）を超えています。")
            setFilesizeErrorMessage('');
            let myArryBack = [...myArray2];
            myArryBack.splice(myArray2.length-1, 1);
            setMyArray2([...myArryBack]);
        } else{
            // 文件名称取得
            let fileName1 = event.target.value.split('\\')
            let fileMame2 = fileName1.length;
            let fileMame3 = fileName1[fileMame2-1];
            myArryBack.splice(myArray2.length-1, 1, fileMame3);
            setMyArray2([...myArryBack]);
        }
    };

    // 删除
    // function Agentremove(index: number) {
    //     let myArryBack2 = [...myArray2];
    //     if (index !== -1) {
    //         myArryBack2.splice(index, 1);
    //     }
    //     setMyArray2([...myArryBack2]);
    //     if (myArryBack2.length <= 0) {
    //         showflg2 = 'none';
    //     }
    // }

    // 文件
    function upload2() {
        showflg2 = '';
        let index = myArray2.length;
        setMyArray2([...myArray2, '']);
        let up = document.getElementById('upload2'+ (index-1).toString())
        if (up !== null) {
            up.dispatchEvent(new MouseEvent('click'))
        }
    };

    // 文件
    function agentremove(index: number) {
        let myArryBack = [...myArray2];
        if (index !== -1) {
            myArryBack.splice(index, 1);
        }
        setMyArray2([...myArryBack]);
        if (myArryBack.length <= 0) {
            showflg2 = 'none';
        }
    }

    return (
        <div>
            <div className="popup3" id='popups3' > 
                {/* 段落1 */}
                <p className='head_34_1'>調停人を変更しますか？</p>
                {/* 判断数据库的数据是否取到 */}
                {loading === true ? 
                <Box sx={{ display: 'flex',alignItems: 'center',justifyContent: 'center',minHeight: '270px'}}>
                    < CircularProgress/>
                </Box>:
                    <div>
                        <p className='head_34_2'>(あと{cyclenumber}回まで変更できます)</p>
                        {/* 段落2 */}
                        <p className='head_34_1'>
                            調停人の公平性、独立性が疑われる事実が判明した場合、変更依頼を出す場合は、その理由の記載をお願いします。
                        </p>
                        {/* 段落3 */}
                        <p className='head_34_2'>
                            なお、変更依頼が承諾される前であっても調停期日を遇ぎますと手続きは終了となりますのでご了承ください。
                        </p>
                        {/* 理由 */}
                        <p className='reason'>
                            理由<span className = "mustLabel2">必須</span>
                        </p>
                        {/* 文本框 */}
                        <form onSubmit={handleSubmit(Login)}>
                            {/* textarea表示,进行必须check和字数限制check */}
                            <div>
                                <textarea rows={5} cols={55} {...register("reason") } onChange={button_status} className='textBoxBorder'></textarea>
                                <div>
                                    {errors.reason && <span style={{ color: "red", fontSize: 14 }}>{errors.reason.message}</span>}
                                </div>
                            </div>
                            {/* 添付文件 */}
                            <div style={{ marginTop: '15px'}}>
                                {/* 添附文件文字 */}
                                <div className='addFileCharacters'>
                                    添付資料<span className = "mustLabel">任意</span>
                                </div>
                                {/* 添附文件实现 */}
                                <div className='addFileModule'>
                                    <div style={{ display: showflg2}}>
                                        <input id='upload2-1' type="file" onChange={handleFileChange2} style={{ display: 'none' }} />
                                        <ul style={{paddingLeft:0 }}>{
                                            myArray2.map((item: string, index: number) => (
                                            <li key={index} style={{ listStyleType: 'none', marginTop:10 }}>
                                                {/* <span>ファイル{index + 1}：</span> */}
                                                <input id={`upload2${index}`} 
                                                    className='file'
                                                    type="file" onChange={handleFileChange2}
                                                    style={{ display: 'none' }} />
                                                <TextField className='file'
                                                    // className='css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input'
                                                    value={item}>
                                                    <a onClick={() => agentremove(index)}>削除</a><FileAddOutlined />
                                                </TextField>
                                            </li>
                                            ))
                                        }</ul>
                                    </div>
                                    <div >
                                    <a className='a-style' onClick={upload2}> <FileAddOutlined />ファイルの追加</a>
                                    </div>
                                </div>
                                <div >
                                    <span style={{ display: filetypeErrorMessage, color: 'red', fontSize: 14 }}>添付できない形式のファイルです。</span>
                                    <span style={{ display: filesizeErrorMessage, color: 'red', fontSize: 14 }}>添付可能なファイル容量上限（200MB）を超えています。</span>
                                </div>
                            </div>
                            {/* <div style={{textAlign:'right'}}> */}
                            <DialogActions>
                                <div>
                                    {/* 変更する按钮 */}
                                    <ColorWidthButton2 style={{ float: 'right' , marginRight: '5px', marginTop: '5px' }} variant='contained' color="success" type="submit"  disabled={flags}>提出する</ColorWidthButton2>
                                    {/* 取消按钮 */}
                                    <ColorWidthButton1 style={{ float: 'right' , marginRight: '5px', marginTop: '5px' }} variant='outlined' onClick={() => {closeModal2(0)}}>キャンセル</ColorWidthButton1>
                                </div>
                            </DialogActions>
                            {/* </div> */}
                        </form>
                    </div>
                }
            </div>
        </div>
    );
}

// 导出函数 
export default S34_2;