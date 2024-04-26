import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageContext } from '../../common/pageContext';
import React from 'react';
import { ColorWidthButton1 } from "../../common/components/ButtonCommon";
import { ColorWidthButton2 } from "../../common/components/ButtonCommon";

let btnName :string;
let checkboxName :string;

function FooterOfPoliciesConfirm (props:any){
    const pageFlg = props.pageFlg;
    const displayFlg = props.data.displayFlg;
    const UserType = props.data.UserType;
    const {prevPage, setPrevPage} = React.useContext(PageContext);
    const [checkedOfTerms, setCheckedTerms] = useState(false);
    const [checkedOfPolicy, setCheckedOfPolicy] = useState(false);
    const navigate = useNavigate();

    // 通过回调函数改变父组件中pageFlg的值，从而实现「次へ」的页面跳转
    function changePageFlg() {
        if (pageFlg === '0'){
            props.onPageFlgChange('1')
        } else {
             props.onPageFlgChange('0')
        }     
    }

    const handleChangeOfTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedTerms(event.target.checked);
    };
    const handleChangeOfPolicy = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedOfPolicy(event.target.checked);
    };

    // button name设定
    if (displayFlg === '0' || displayFlg === '1'){
        btnName = 'サービストップ画面へ'
    } else if (displayFlg === '2') {
        if (pageFlg === '0'){    
            btnName = '次へ'
        } else {   
            btnName = 'サービストップ画面へ'
        }
    } else if (displayFlg === '3') { 
        btnName = '会員情報確認へ'
    }

    // checkbox内容设定
    if (displayFlg === '3') {
        checkboxName = '利用規約とプライバシーポリシーに同意する'
    } else{
        if (pageFlg === '0'){
            checkboxName = '利用規約に同意する'
        } else {
            checkboxName = 'プライバシーポリシーに同意する'
        }
    }

    // 画面迁移设定
    const {state} = useLocation()  // 接收C02的传值
    const toNextPage = () => {
        if (btnName ==='サービストップ画面へ'){
            setPrevPage('S01')
            navigate ('/MosList', {state:{UserType: UserType}}); 
        } else if (btnName ==='次へ'){
            changePageFlg()
        } else {
            setPrevPage('S01')
            navigate ('/UserInfoConfirm',{state:{value:state.value}})
        }
    }

    // 戻る
    const back = () => {
        if (displayFlg ==='2' && pageFlg ==='1'){
            changePageFlg()
        } else {
            if (prevPage === 'C02' || prevPage === 'C03') {
                navigate ('/UserLogin', {state:{value:state.value}})
            } else {
                navigate ('/')
            }
        }
        
    }

    return (
        <div>
            <div id='checkboxDiv' >
                { pageFlg=== '0' &&
                    <FormGroup onChange={handleChangeOfTerms} >
                        <FormControlLabel control={<Checkbox tabIndex={2}/>} checked ={checkedOfTerms} label={checkboxName} />
                    </FormGroup>
                }
                { pageFlg==='1' &&
                    <FormGroup onChange={handleChangeOfPolicy}>
                        <FormControlLabel control={<Checkbox tabIndex={2}/>} checked ={checkedOfPolicy} label={checkboxName} />
                    </FormGroup>
                }
            </div>
            <div>
                <ColorWidthButton1 variant="outlined" id ='backBtn' onClick={back} tabIndex={5}>戻る</ColorWidthButton1>
                { pageFlg=== '0' && <ColorWidthButton2 variant="contained" disabled={checkedOfTerms ? false: true} onClick={toNextPage} color="success" tabIndex={3} >{btnName}</ColorWidthButton2> }
                { pageFlg=== '1' && <ColorWidthButton2 variant="contained" disabled={checkedOfPolicy ? false: true} onClick={toNextPage} color="success" tabIndex={4} >{btnName}</ColorWidthButton2> }
            </div>
        </div>
    );
} 
export default FooterOfPoliciesConfirm;