import React, { useState, useEffect } from 'react';
import '../assets/styles/s21.css';
import axios from 'axios';
import '../mocks/mockJs_s21.js';
import img from '../assets/images/mao.png';
import S35 from '../../S35/components/S35_1';
import S35_2 from '../../S35/components/S35_2';
import { FilePdfOutlined } from '@ant-design/icons';
import S34 from '../../S34/components/S34'
import PageHeader from '../../common/utils/pageHeader';
import { Box} from '@mui/material';
import { CircularProgress } from '@mui/material';
import { ColorWidthButton1 } from '../../common/components/ButtonCommon';

function S21() {
    // 初始化
    const [mediatorChangeableCount2, setMediatorChangeableCount2] = useState(0)
    const [uniuqeCasesIdCount, setUniuqeCasesIdCount] = useState(0)
    const [uniqueCaseIdCount, setUniqueCaseIdCount] = useState(0)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [position, setPosition] = useState('')
    const [selfIntroduce, setSelfIntroduce] = useState('')
    const [historyInfo, setHistoryInfo] = useState('')
    const [major, setMajor] = useState('')
    const [resumeFileId, setResumeFileId] = useState('')
    const [mediatorInfoLimit, setMediatorInfoLimit] = useState(0)
    const [mediatorDisclosureFlag, setMediatorDisclosureFlag] = useState(0)
    const [mediatorDisclosureDate, setMediatorDisclosureDate] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [param, setParam] = useState(0)
    const [caseRelations] = useState(123)
    const [caseMediationsStatus, setCaseMediationsStatus] = useState(0)
    const [getMediationStatus, setGetMediationStatus] = useState('')
    const [userName] = useState(1)
    const [mediatorChangeableCount1, setMediatorChangeableCount1] = useState(0)
    const [loading,setLoading] = useState(true)

    // API:getMediationStatus
    useEffect(() =>{
        axios.get('/getMediationStatus_S21').then((response) =>{
            setCaseMediationsStatus(response.data.data.caseMediationsStatus)
            setGetMediationStatus(response.data.data)
            setLoading(false)
        })
    },[])

    // 調停人機能制限を取得
    useEffect(() =>{
        axios.get('/getMediator_S21').then((response) =>{
            setMediatorInfoLimit(response.data.data.mediatorInfoLimit)
            setMediatorDisclosureFlag(response.data.data.mediatorDisclosureFlag)
            setMediatorDisclosureDate(response.data.data.mediatorDisclosureDate)
            setLoading(false)
        })
    },[])

    // APIで調停人無理由変更可能期限日を取得する
    useEffect(() =>{
        axios.get('/getMediatorChangeableCount_S21').then((response) =>{
            setMediatorChangeableCount1(response.data.data.mediatorChangeableCount1)
            setMediatorChangeableCount2(response.data.data.mediatorChangeableCount2)
            setLoading(false)
        })
    },[])

    // 調停人の経験取得
    useEffect(() =>{
        axios.get('/getMediatorInfo_S21').then((response) =>{
            setUniuqeCasesIdCount(response.data.data.uniuqeCasesIdCount)
            setUniqueCaseIdCount(response.data.data.uniqueCaseIdCount)
            setLoading(false)
        })
    },[])

    // ユーザ情報取得
    useEffect(() =>{
        axios.get('/getOdrUserInfo_S21').then((response) =>{
            setFirstName(response.data.data.firstName)
            setLastName(response.data.data.lastName)
            setPosition(response.data.data.position)
            setSelfIntroduce(response.data.data.selfIntroduce)
            setHistoryInfo(response.data.data.historyInfo)
            setMajor(response.data.data.major)
            setResumeFileId(response.data.data.resumeFileId)
            setLoading(false)
        })
    },[])

    // 头部
    function Head () {
        return (
            <div className='header_bottom'>
                {/* 調停人名+さんが調停人に指名されました */}
                <div className='header_bottom2'>
                    <span className='header_characters'>
                        {firstName}
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <span id='a123456'
                        className='header_characters2'>さんが調停人に指名されました。
                    </span>
                </div>
                {/* 返回，退出 */}
                <div className='header_bottom3'>
                    <PageHeader pageFlg="0" />
                </div>
            </div>
        )
    }

    // 调停人简介
    function BriefIntroduction () {
        return (
            <div className='mediator'>
            {/* 調停人の写真 */}
            <div>
                {/* 調停人の写真 */}
                <img src={img} className="photo" alt="調停人の写真"></img>
                <div className='photo_name'>
                    {/* 氏名 */}
                    <p className='characters'>{lastName}{firstName}</p>
                    {/* 職位 */}
                    <p>{position}</p>
                    <div>
                        {/* 「調停人を変更」ボタン */}
                        {Determine()}
                        {/* 「調停人への情報公開範囲を制限」ボタン */}
                        {OpenPopup()}
                    </div>
                </div>
            </div>
        </div>
        )
    }

    // 调停人明细
    function Detail() {
        return (
            <div className='detail'>

                {/* 自己紹介 */}
                <p className='personal_introduction1'>自己紹介</p>
                <p className='personal_introduction2'>
                    {selfIntroduce}
                </p>

                {/* 調停人の経験 */}
                <p className='personal_introduction1'>調停人の経験</p>
                <p className='experience1'>
                    {(new Date()).getFullYear()}年
                    {String((new Date()).getMonth() + 1)}月現在
                </p>
                <p className='experience2'>
                    調停件数
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {uniqueCaseIdCount}
                </p>
                <p className='experience2'>
                    解決件数
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {uniuqeCasesIdCount}
                </p>
                <p className='experience2'>
                    解決率
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* {this.state.resolutionRate}% */}
                    {QuantityJudgment()}
                    
                </p>

                {/* 略歴 */}
                <p className='personal_introduction1'>略歴</p>
                <p className='personal_introduction2'>
                    {historyInfo}
                </p>

                {/* 専門分野 */}
                <p className='personal_introduction1'>専門分野</p>
                <p className='personal_introduction2'>
                    {major}
                </p>

                {/* 経歴書 */}
                <p className='personal_introduction1'>経歴書</p>

                <p className='personal_introduction2'>
                    <button className='file' onClick={HandleDownload} >
                        <FilePdfOutlined className='pdf2'/>
                        <span className='pdf3'>{resumeFileId}</span>
                    </button>
                </p>
            </div>
        )
    }

    //PDF
    function HandleDownload () {
        // 处理文件下载逻辑
        const fileName = resumeFileId;
        const fileURL = 'www.baidu.com';
    
        const downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = fileName;
        downloadLink.click();
    };

    // 調停人への情報公開範囲を制限 ポップアップ
    function OpenPopup() {
        const handleClickOpen  = () => {
            // 设定弹窗状态
            setIsModalOpen(true)
        }

        const closeModal = (num: number) => {
            // 设定弹窗状态
            setIsModalOpen(false)
            setParam(num)
        }

        // 取得したMediatorInfoLimitが0：Denyの場合、ボタンを非表示する。
        if (mediatorInfoLimit === 1 
            // 取得したMediatorDisclosureFlagが1: YES or 2：NOの場合、ボタンを非表示にする。
            && mediatorDisclosureFlag !== 1 && mediatorDisclosureFlag !== 2
            // 取得したMediatorDisclosureDate < システム日付　の場合、ボタンを非表示にする。
            && mediatorDisclosureDate >= GetCurrentDate()) {
            return (
                <div className='botton'>
                    <ColorWidthButton1 variant="outlined" onClick={()=>handleClickOpen()} hidden={param === 0 ? false:true}   >
                        調停人への情報公開範囲を制限
                    </ColorWidthButton1>
                    {/* 判断是否打开弹窗 */}
                    {isModalOpen && 
                    // closeModal回调函数，caseIDe传值给子组件
                    <S35 closeModal={closeModal} caseIDe = {caseRelations}/>}
                </div>
            )
        }
    }

    // 获取当前日期
    function GetCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        return `${year}${month}${day}`;
    }

    // 判断按钮是否显示
    function Determine (){
        // 判断按钮是否显示
        if (caseMediationsStatus === 0 || getMediationStatus === null) {
            if ((userName === 1 && mediatorChangeableCount1 >= 4) 
                || (userName === 2 && mediatorChangeableCount2 >= 4)) {
                return(
                    <S34></S34>
                )
            } else {
                return(
                    <ColorWidthButton1 variant='outlined'>調停人を変更</ColorWidthButton1>
                )
            }
        }
    }

     // 小黑框
    function Pop2() {
        // 調停件数が0の場合→ "-"で表示
        if (param === 1 ) {
            return (
                <div>
                    <S35_2 />
                </div>
            )
        }
    }

    // 調停件数の判定
    function QuantityJudgment() {
        const quantityJudgment = uniqueCaseIdCount
        let percentage = uniuqeCasesIdCount/uniqueCaseIdCount*100
        // 調停件数が0の場合→ "-"で表示
        if (quantityJudgment === 0 ) {
            return (
                <span>-</span>
            )
        }
        return <span>{percentage}%</span>
    }

    return(
        <div style={{textAlign: 'left'}}>
            {Head()}
            {/* 判断数据库是否取到数据 */}
            {loading === true ? 
                <Box sx={{ display: 'flex',alignItems: 'center',justifyContent: 'center',minHeight: '270px'}}>
                    < CircularProgress/>
                </Box>:
                <div>
                    {BriefIntroduction()}
                    {Detail()}
                    {Pop2()}
                </div>
            }
        </div>
    )
}

// 导出组件
export default S21