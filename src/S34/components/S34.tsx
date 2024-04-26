import React, { useState, useEffect } from 'react';
import '../assets/styles/S34.css';
import '../mocks/mockJs_s34.js';
import axios from 'axios';
import S34_1 from '../../S34/components/S34_1';
import S34_2 from '../../S34/components/S34_2';
import { ColorWidthButton1 } from '../../common/components/ButtonCommon';

function S34 ()  {
    return (
        Determine()
    );
}

// 判断调用哪个画面
function Determine (){
    // 时间取得
    const [mediatorNoReasonChangeDate_34, setMediatorNoReasonChangeDate_34] = useState('');
    useEffect(() =>{
        axios.get('/getMediatorChangeableCount_S34').then((response) =>{
            setMediatorNoReasonChangeDate_34(response.data.data.mediatorNoReasonChangeDate_34)
        })
    },[])

    // 無理由変更可能期限日 >= 現在日時の場合、理由任意の初期表示を行う
    if (mediatorNoReasonChangeDate_34 >= GetCurrentDate()) {
        console.log(mediatorNoReasonChangeDate_34);
        
        return (
            // 单选画面
            OpenPopup2()
        )
    } else  {
        // 無理由変更可能期限日 < 現在日時の場合、理由必須の初期表示を行う
        return (
            // 入力文件画面
            OpenPopup3()
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

// 調停人を変更 ポップアップ单选画面
function OpenPopup2() {

    // 时间取得
    const [mediatorNoReasonChangeDate, setMediatorNoReasonChangeDate] = useState('')
    useEffect(() =>{
        axios.get('/getMediatorChangeableCount_S34').then((response) =>{
            setMediatorNoReasonChangeDate(response.data.data.mediatorNoReasonChangeDate)
        })
    },[])

    const [isModalOpen2,setIsModalOpen2] = useState(false);
    const handleClickOpen2  = () => {
        // 设定弹窗状态
        setIsModalOpen2(true) 
    }

    const closeModal2 = () => {
        // 设定弹窗状态
        setIsModalOpen2(false) 
    }

    return (
        <div className='botton'>
            <ColorWidthButton1 variant='outlined' onClick={()=>handleClickOpen2()}>
                調停人を変更
            </ColorWidthButton1>
            {/* 判断是否打开弹窗 */}
            {isModalOpen2 && 
                // mediatorNoReasonChangeDate传值给子组件
                <S34_1 closeModal2={closeModal2} caseIDe = {mediatorNoReasonChangeDate}/>}
        </div>
    )
}

    // 調停人を変更 ポップアップ2有文件
function OpenPopup3() {

    // 时间取得
    const [mediatorNoReasonChangeDate, setMediatorNoReasonChangeDate] = useState('')
    useEffect(() =>{
        axios.get('/getMediatorChangeableCount_S34').then((response) =>{
            setMediatorNoReasonChangeDate(response.data.data.mediatorNoReasonChangeDate)
        })
    },[])

    const [isModalOpen2,setIsModalOpen2] = useState(false);
    const handleClickOpen2  = () => {
        // 设定弹窗状态
        setIsModalOpen2(true) 
        console.log(isModalOpen2);
        
    }
    
    const closeModal2 = () => {
        // 设定弹窗状态
        setIsModalOpen2(false) 
    }

    return (
        <div className='botton'>
            <ColorWidthButton1 variant='outlined' onClick={()=>handleClickOpen2()}>
                調停人を変更
            </ColorWidthButton1>
             {/* 判断是否打开弹窗 */}
            {isModalOpen2 && 
            // mediatorNoReasonChangeDate传值给子组件
            <S34_2 closeModal2={closeModal2} caseIDe = {mediatorNoReasonChangeDate}/>}
        </div>
    )
}

// 导出函数 
export default S34;