import * as React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import dayjs from 'dayjs';
import '../assets/styles/ReplyTrsg.scss';
import '../mocks/mockJs.js';
import { CANCEL_SNACK_S32 } from '../../common/constants/constant';
import { SNACK_MESSAGE_S32 } from '../../common/constants/constant';
import { Dialog2 } from '../../common/components/dialog';
import { ColorWidthButton1 } from '../../common/components/ButtonCommon'
import { ColorWidthButton2 } from '../../common/components/ButtonCommon'

function RepluTrsg(props: { replyTrsgOpen: boolean, closeDialog: (flg: string) => void }) {
    const { replyTrsgOpen, closeDialog } = props;

    // mock.jsを利用してデータをシミュレートし、更新された値をコンソールに表示する。
    function handleClose(){
    const ReplyWithdrawData = 
    {
        案件ステージ:3,         
        案件ステータス:"0300",
        // システム日付
        NegotiationStartDate:dayjs(new Date()).format('YYYYMMDD'),
        // システム時間 + master_platforms.NegotiationLimitDays
        NegotiationEndDate:dayjs(new Date()).format('HH:mm:ss'),
        ResolutionFlag:0,
        NegotiationEndDateChangeStatus:0,
        NegotiationEndDateChangeCount:0,
        // システム日時
        WithDrawDate:dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        Status:2
    };
        axios.post('/ReplyWithdraw',ReplyWithdrawData).then(response =>{  
            return;
        });
    };

    return (       
    <div className="App">   
        <Dialog2
            open={replyTrsgOpen}
            keepMounted
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            id='ReplyTrsg'
        >
            <DialogTitle id="alert-dialog-title">
                {"反訴の取り下げを行いますか"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    取り下げを行った場合、反訴の部分のみ取り下げが行われま
                    す。回答自体は取り下げとならず、そのままの回答内容で反
                    訴なしとなります。
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {/* <Button id = "cancel_btn" variant="outlined" onClick={() =>{ closeDialog(CANCEL_SNACK_S32)}}>いいえ</Button>
                <Button id = "Argee_btn" onClick={() =>{ handleClose(); closeDialog(SNACK_MESSAGE_S32) }} autoFocus>
                    はい
                </Button> */}
                <div>
                <ColorWidthButton1  variant="outlined" onClick={() =>{ closeDialog(CANCEL_SNACK_S32)}}>いいえ</ColorWidthButton1>
                <ColorWidthButton2 variant='contained' color="success" onClick={() =>{ handleClose(); closeDialog(SNACK_MESSAGE_S32) }} autoFocus>
                    はい
                </ColorWidthButton2>
                </div>
            </DialogActions>
        </Dialog2>
    </div>
    );
}
export default RepluTrsg;