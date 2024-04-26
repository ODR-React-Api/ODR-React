import { useContext,useEffect } from 'react';
import axios from 'axios'
import {useNavigate,useLocation} from 'react-router-dom';

import Step1 from '../../common/utils/step';
import { PageContext } from "../../common/pageContext";
import { ColorWidthButton1, ColorWidthButton2 } from "../../common/components/ButtonCommon";

import '../mocks/mock.js'
import '../assets/styles/C02.scss';


function UserInfoConfirm() {
    const list=[
        '入力',
        '規約同意',
        '確認',
        '完了'
    ]
    const num = 2;

    const {state} = useLocation();

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/UserLoginDone')
        // 将会员情报传到后台（mock.js）
        axios.post('/Login',state.value)
            .then((response) =>{
                return
            })
    }

    const {setPrevPage} = useContext(PageContext)
    
    useEffect(() =>{
        setPrevPage('C02')
    })

    useEffect(() =>{
        document.getElementById('c02Button')?.focus();
    },[])

    return (
        <div id = "C02">
            <div style = {{marginTop:30,marginBottom:30}}>
                {<Step1 stepNum = {num} steps = {list} />}
            </div>
            <div className="concent">
                入力内容をご確認ください。よろしければ「登録する」ボタンをクリックしてください。
            </div>
            <h2 className="title">会員情報の登録</h2>
                <table className="tableStyle">
                    <tbody>
                        <tr className="trStyle">
                            <td className="projectStyle">
                                <span className="projectName">氏名</span>
                                <span className = "mustLabel">必須</span>
                            </td>
                            <td className="textBoxStyle">
                                {/* 氏名(姓) */}
                                <input className="userName" type='text' style={{backgroundColor:'rgb(211, 209, 209)'}} value={state.value.surname} disabled/>
                                {/* 氏名(名) */}
                                <input className="userName" type='text' style={{backgroundColor:'rgb(211, 209, 209)'}} value={state.value.username} disabled/>
                            </td>
                        </tr>
                        <tr className="trStyle">
                            <td className="projectStyle">
                                <span className="projectName">氏名(カナ)</span>
                                <span className = "mustLabel">必須</span>
                            </td>
                            <td className="textBoxStyle">
                                {/* カナ(姓) */}
                                <input className="userName" type='text' style={{backgroundColor:'rgb(211, 209, 209)'}} value={state.value.surnamekana} disabled/>
                                {/* カナ(名) */}
                                <input className="userName" type='text' style={{backgroundColor:'rgb(211, 209, 209)'}} value={state.value.usernamekana} disabled/>
                            </td>
                        </tr>
                        <tr className="trStyle">
                            <td className="projectStyle">
                                <span className="projectName">所属会社</span>
                                <span className="arbitrarilyLabel">任意</span>
                            </td>
                            <td className="textBoxStyle">
                                {/* 所属会社 */}
                                <input className="company" type='text' style={{backgroundColor:'rgb(211, 209, 209)'}} value={state.value.commpany} disabled  />
                            </td>
                        </tr>
                        <tr className="trStyle">
                            <td className="projectStyle">
                                <span className="projectName">メールアドレス</span>
                                <span className = "mustLabel">必須</span>
                            </td>
                            <td className="textBoxStyle">
                                {/* メールアドレス */}
                                <input className="email" type='text' value={state.value.email} disabled  />
                            </td>
                        </tr>
                        <tr className="trStyle">
                            <td className="projectStyle">
                                <span className="projectName">パスワード</span>
                                <span className = "mustLabel">必須</span>
                            </td>
                            <td className="textBoxStyle">
                                {/* パスワード */}
                                <input className="password" type='password' style={{backgroundColor:'rgb(211, 209, 209)'}} value={state.value.password} disabled />
                            </td>
                        </tr>
                        <tr className="trStyle">
                            <td className="projectStyle">
                                <span className="projectName">パスワード(確認用)</span>
                                <span className = "mustLabel">必須</span>
                            </td>
                            <td className="textBoxStyle">
                                {/* パスワード(確認用) */}
                                <input className="password" type='password' style={{backgroundColor:'rgb(211, 209, 209)'}} value={state.value.password2} disabled />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="buttonStyle">
                    <ColorWidthButton1  onClick={() => navigate('/PoliciesConfirm',{state:{value:state.value}})} variant="outlined" tabIndex={2}>戻る</ColorWidthButton1>
                    <ColorWidthButton2  id="c02Button" onClick={handleLogin} variant="contained" color="success" tabIndex={1}>登録する</ColorWidthButton2>
                </div>
        </div>
        )
    }
// 导出组件
export default UserInfoConfirm

