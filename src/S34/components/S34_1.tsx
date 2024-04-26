import React, { useState, useEffect } from 'react';
import '../assets/styles/S34.css';
import '../mocks/mockJs_s34.js';
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import { Box} from '@mui/material';
import { CircularProgress } from '@mui/material';
import { ColorWidthButton1 } from '../../common/components/ButtonCommon'
import { ColorWidthButton2 } from '../../common/components/ButtonCommon'

const S34_1 = (props: any) => {

    // loading初始化
    const [loading,setLoading] = useState(true)
    //画面跳转（S4)判断用flg
    const [flg,setFlg] = useState('2');
    // 声明传递S4画面变量
    const [form01, setForm01] = useState('');


    // S4画面传递
    const navigate = useNavigate(); 
    const {closeModal2} = props;

    // 设定传值
    const handleOptionChange = (e:any) => {
        setForm01(e.target.value);
        setFlg('2');
    };

    // 变更回数取得
    const [cyclenumber, setCyclenumber] = useState('')
    useEffect(() =>{
        axios.get('/getMediatorChangeableCount').then((response) =>{
            setCyclenumber(response.data.data.cyclenumber)
            setLoading(false)
        })
    },[])

    return (
        <div>
            <div className="popup2" > 
                {/* 段落1 */}
                <p className='head_34_1'>調停人を変更しますか？</p>
                {/* 判断数据库是否取到数据 */}
                {loading === true ? 
                <Box sx={{ display: 'flex',alignItems: 'center',justifyContent: 'center',minHeight: '270px'}}>
                    < CircularProgress/>
                </Box>:
                    <div>
                        <p className='head_34_2'>(あと{cyclenumber}回まで変更できます)</p>
                        {/* 段落2 */}
                        <p className='head_34_1'>変更するの場合、</p>
                        <p className='head_34_2'>
                            ようしければ変更の理由を教えてください。
                            <span className = "mustLabel">任意</span>
                        </p>
                        {/* 段落3 */}
                        <div>
                            {/* <RadioButtonsGroup /> */}
                            {/* 表单 */}
                            <form >
                            <FormControl>
                                <RadioGroup 
                                    aria-labelledby="demo-radio-buttons-group-label" 
                                    defaultValue="female" 
                                    name="radio-buttons-group"
                                    >
                                    {/* 选项1：調停人と利害関係があるため */}
                                    <FormControlLabel value="option1" control={<Radio />} onChange={handleOptionChange} label="調停人と利害関係があるため" />
                                    {/* 选项2：調停人の専門分野が求めていたものではないため */}
                                    <FormControlLabel value="option2" control={<Radio />} onChange={handleOptionChange}  label="調停人の専門分野が求めていたものではないため" />
                                    {/* 选项3：自分に不利な調停人であると感じたため */}
                                    <FormControlLabel value="option3" control={<Radio />} onChange={handleOptionChange}  label="自分に不利な調停人であると感じたため" />
                                    {/* 选项4：その他 */}
                                    <FormControlLabel value="option4" control={<Radio />} onChange={handleOptionChange}  label="その他" />
                                </RadioGroup>
                            </FormControl>
                            </form>
                        </div>
                        <div style={{textAlign:'right'}}>
                        <DialogActions>
                            <div>
                                {/* 変更する按钮 */}
                                <ColorWidthButton2 style={{ float: 'right' , marginRight: '5px', marginTop: '5px' }} variant='contained' color="success" onClick={() => {navigate('/S04', {state:{form01, positionFlg:flg, caseId:'40000008', S34Flg:0}})}}>変更する</ColorWidthButton2>
                                {/* 取消按钮 */}
                                <ColorWidthButton1 style={{ float: 'right' , marginRight: '5px', marginTop: '5px' }} variant='outlined' onClick={() => {closeModal2(0)}}>キャンセル</ColorWidthButton1>
                            </div>
                        </DialogActions>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

// 导出函数 
export default S34_1;