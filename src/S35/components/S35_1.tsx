import React, { useState } from 'react';
import '../assets/styles/S35.css';
import '../mocks/mockJs_s35.js'
import axios from 'axios';
import DialogActions from '@mui/material/DialogActions';
import { Box} from '@mui/material';
import { CircularProgress } from '@mui/material';
import { ColorWidthButton1 } from '../../common/components/ButtonCommon'
import { ColorWidthButton2 } from '../../common/components/ButtonCommon'

const S35_1 = (props: any) => {

    // loading初始化（控制等待图标是否显示）
    const [loading,setLoading] = useState(true)
    const {closeModal} = props;

    // mock时间日期
    const [mediatorDisclosureDate, setMediatorDisclosureDate] = useState('')
    axios.get('/getMediatorDisclosureDate').then((response) =>{
        setMediatorDisclosureDate(response.data.data.mediatorDisclosureDate)
        setLoading(false)
    })

    return (
        <div>
            <div className="popup_35" > 
                {/* 段落1 */}
                <p className='head_35'>調停人への情報公開の範囲を制限しましか？</p>
                {loading === true ? 
                <Box sx={{ display: 'flex',alignItems: 'center',justifyContent: 'center',minHeight: '270px'}}>
                    < CircularProgress/>
                </Box>:
                <div>
                    {/* 段落2 */}
                    <p>
                        調停人の指名後1日以内であらば、
                        これまでの交渉期間におけるメッセージ内でのやり取りの内容を
                        調停人に対して非公開にすることができます。
                    </p>
                    {/* 段落3 */}
                    <p>
                        制限を行わない場合、
                        1日経過しますと交渉期間でのやりとりの内容は全て調停人に公開されます。
                    </p>
                    {/* 段落4 */}
                    <p>
                        交渉期間のやりとりを非公開に変更可能な期日：
                        <br/>
                        <span>{mediatorDisclosureDate}</span>
                    </p>
                    <DialogActions>
                        <div>
                            {/* 限制按钮 */}
                            {/* <Button id='Argee_btn'
                                onClick={() => {closeModal(1)}}>制限する</Button> */}
                            <ColorWidthButton2 style={{ float: 'right' , marginRight: '5px', marginTop: '1px' ,marginBottom: '1px'}} variant='contained' color='success' onClick={() => {closeModal(1)}}>制限する</ColorWidthButton2>
                            {/* 取消按钮 */}
                            {/* <Button id='cancel_btn' 
                                onClick={() => {closeModal(0)}}>キャンセル</Button> */}
                            <ColorWidthButton1 style={{ float: 'right' , marginRight: '5px', marginTop: '1px' ,marginBottom: '1px'}} variant='outlined' onClick={() => {closeModal(0)}}>キャンセル</ColorWidthButton1>
                        </div>
                    </DialogActions>
                </div>
                }

            </div>
        </div>
    );
}

// 导出函数 
export default S35_1;