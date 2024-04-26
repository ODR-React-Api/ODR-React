import { useState, useEffect } from 'react';
import {Checkbox, FormControlLabel, Radio, RadioGroup, FormGroup, FormHelperText, CircularProgress } from '@mui/material';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { CHECKBOXS17_1, CHECKBOXS17_2, CHECKBOXS17_3, CHECKBOXS17_4, CHECKBOXS17_6,FROMHELPTEXTS17 } from '../../common/constants/constant';
import { ColorWidthButton1,ColorWidthButton2 } from "../../common/components/ButtonCommon";
import '../mocks/mockS12';
import '../assets/styles/AnswerConfirm.css';

// 回答の内容の表示
function AnswerConfirm(data: any) {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [res, setRes] = useState<any>(null);

    // mock数据
    useEffect(() => {
        axios.get('/getOdrUserInfo12')
            .then((response) => {
                setRes(response.data);
            })
    }, [])

    // 戻る
    const backS11 = () => {
        navigate('/S11', { state });
    }

    return (
        <div>
            {res === null || res === undefined ? <div className='center-container'><CircularProgress /></div> :
                <div>
                    <label className='label'>回答の内容</label>
                        <div style={{marginLeft:"100px"}}>
                            <FormGroup>
                                <div>
                                    <label className='answerLabel'>回答の種類</label>
                                    <FormControlLabel control={<Checkbox checked={state.checkedShohin[0]} />} label={CHECKBOXS17_2} disabled /></div>
                                <div className='answerType'>
                                    <FormControlLabel control={<Checkbox checked={state.checkedShohin[1]} />} label={CHECKBOXS17_1} disabled /></div>
                                <div className='answerType'>
                                    <FormControlLabel control={<Checkbox checked={state.checkedShohin[2]} />} label={CHECKBOXS17_3} disabled /></div>
                                <div className='answerType'>
                                    <FormControlLabel control={<Checkbox checked={state.checkedShohin[3]} />} label={CHECKBOXS17_4} disabled /></div>
                                <div className='answerType'>
                                    <FormControlLabel control={<Checkbox checked={state.checkedShohin[4]} />} label={CHECKBOXS17_6} disabled /></div>
                                <div className={`sonotaNy ${state.checkedShohin[4] ? 'sonotaNyShow' : 'sonotaNyUnShow'}`}>
                                    <FormHelperText style={{marginLeft:"8px"}}>{FROMHELPTEXTS17}</FormHelperText>
                                    <input className='must-chooseConfirm' value={state.otherNaiyou} disabled></input>
                                </div>
                            </FormGroup>
                        </div>
                        < div className='answer-div'>
                            <span>回答の内容</span>
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <input className='input-answerConfirm' id="anwserNaiyou" defaultValue={state === null || state === undefined ? '' : state.anwserNaiyou} disabled></input>
                        </div>
                        <div className='siryou-div'>
                            <span>添付資料</span>
                            <input className={`${state.FileName !== '' ? 'inputShow' : 'sonotaNyUnShow'}`} defaultValue={state === null || state === undefined ? '' && state.FileName !== '' : state.FileName} disabled></input>
                            <label className={`${state.FileName !== '' ? 'sonotaNyUnShow' : 'inputShow'}`} defaultValue={state === null || state === undefined ? '' && state.FileName === '' : "なし"} >なし</label>
                        </div>
                        <div className='answer-div'>
                            <label>反訴の有無</label>
                        </div>
                        <div>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group">
                                {state.radioCheck === 'UnHanSu' ? <FormControlLabel value="UnHanSu" control={<Radio />} label="反訴を行わない" disabled checked /> : <FormControlLabel value="UnHanSu" control={<Radio />} label="反訴を行わない" disabled />}
                                {state.radioCheck ==='hanSu' ? <FormControlLabel value="hanSu" control={<Radio />} label="反訴を行う" disabled checked /> : <FormControlLabel value="hanSu" control={<Radio />} label="反訴を行う" disabled />}
                            </RadioGroup>
                        </div>
                        {state.radioCheck === 'hanSu' ? <div>
                            <div style={{ float: 'left',marginLeft:"120px"}}>
                                <label>反訴の内容</label>
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                                <input className="input-counterclaimNaiyou" id="counterclaimNaiyou" defaultValue={state === null || state === undefined ? '' : state.counterclaimNaiyou} disabled></input>
                            </div>
                            <div style={{ marginTop: "10px",marginLeft:"88px" }}>
                                <span>反訴の添付資料</span>
                                <input className={`${state.counterclaimFileName !== '' ? 'inputCounterclaim' : 'sonotaNyUnShow'}`} defaultValue={state === null || state === undefined ? '' && state.counterclaimFileName !== ''   : state.counterclaimFileName } disabled></input>
                                <label className={`${state.counterclaimFileName !== '' ? 'sonotaNyUnShow' : 'inputCounterclaim'}`} defaultValue={state === null || state === undefined ? '' && state.counterclaimFileName === ''   : "なし"} >なし</label>  
                            </div>
                        </div> : null}

                    <div>
                        <label className='label'>回答をされる方についての情報</label>
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
                        </div>
                        {
                            state.agentArray.length !== 0 ? (<ul style={{ marginTop: '0px', marginLeft: '3px' }}>
                                {
                                    state.agentArray.map((item: any, index: number) => (
                                        <li key={index} style={{ listStyleType: 'none', marginTop: '5px' }}>
                                            <span style={{ fontSize: '15px' }}>代理人{index + 1}メールアドレス</span>
                                            <span style={{ marginLeft: '16px' }}></span>
                                            <input className='input-width' name='agentemail' value={item} disabled /><br />
                                        </li>

                                    ))
                                }
                            </ul>)
                                : (< div style={{ marginTop: '0px', marginLeft: '260px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 'bold' }}>代理人</span>
                                    <span style={{ fontSize: '13px', fontWeight: 'bold', marginLeft: '5px' }}>なし</span>
                                </div>)
                        }
                    </div>

                    <div className='btn-div-confirm'>
                        <div  style={{float:'left'}}>
                            <ColorWidthButton2 style={{float:'right'}} type='submit' variant="contained" color="success" onClick={() => navigate('/S13')}>
                                登録する
                            </ColorWidthButton2>
                            <ColorWidthButton1 style={{float:'right'}} variant="outlined" onClick={backS11}>
                                戻る
                            </ColorWidthButton1>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default AnswerConfirm;