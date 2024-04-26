import React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import { Dialog2 } from '../../common/components/dialog';
import { ColorWidthButton1,ColorWidthButton2 } from "../../common/components/ButtonCommon";

// 参加表明するDialog
function JoinShowDialog(props: {caseId: string, leftBtnColor: any, isOpenJoinShow: boolean, closeModal: () => void }) {

    // S4画面から取得パラメータ
    const {caseId, leftBtnColor, isOpenJoinShow, closeModal} = props;

    const navigate = useNavigate();

    // 「参加表明する」ポップアップの「回答する」ボタン押下時、以下の処理を行う
    function handleClick(){
        console.log('案件ID：' + caseId);
        // 回答する S11_回答登録画面 
        navigate('/S11');
    }

    return (
        <Dialog2
            open={isOpenJoinShow}
            onClose={() => {closeModal();}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                相手方として参加を表明しました。続けて申立てへの回答を行いますか？
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ColorWidthButton1 variant="outlined" color={leftBtnColor} onClick={() => {closeModal();}} >今はしない</ColorWidthButton1>
                <ColorWidthButton2 variant="contained" color={leftBtnColor} onClick={() => {handleClick();}} autoFocus >回答する</ColorWidthButton2>
            </DialogActions>
        </Dialog2>                
    )
}

export default JoinShowDialog;