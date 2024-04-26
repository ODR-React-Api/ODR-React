import React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { PROPOSALTAKEDOWN_1, PROPOSALTAKEDOWN_2 } from '../../common/constants/constant';
import { Dialog2 } from '../../common/components/dialog';
import { ColorWidthButton1,ColorWidthButton2 } from "../../common/components/ButtonCommon";

// 申立ての取り下げDialog
function ProposalTakeDownDialog(props: {leftBtnColor: any, isOpenProposalTakeDown: boolean, closeModal: (flg:string) => void }) {

    // S4画面から取得パラメータ
    const {leftBtnColor, isOpenProposalTakeDown, closeModal} = props;

    // 「取り下げ」ポップアップの「はい」ボタン押下時、以下の処理を行う
    function handleClick(){
        // 該当するケースの状態を回答から取り下げへ変更
        // API「取り下げ済状態変更」
        // システム期日と時間の取得
        const dateTime = new Date(); 
        // const newDate = dateTime.toLocaleString();
        const withDrawDate = dateTime.toLocaleString();
        const caseStage = '1';
        const caseStatus = '0100'
        const resolutionDate = dateTime.toLocaleString();
        const resolutionFlag = '0';

        // ケースの状態を取り下げに変更する。
        const paramPost =  [withDrawDate, caseStage ,caseStatus, resolutionDate, resolutionFlag];
        console.log('ケースの状態を取り下げに変更：' + paramPost);
    }

    return (
        <Dialog2
            open={isOpenProposalTakeDown}
            onClose={() => {closeModal(PROPOSALTAKEDOWN_1);}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                申立ての取り下げを行いますか?
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{color: 'black'}} id="alert-dialog-description">
                    今回の申立ては未解決のまま終了となり、以後、<span className ="textColorRed">この申立てに関するやりとりを行うことはできなくなります</span>ので、ご注意ください。
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ColorWidthButton1 variant="outlined" color={leftBtnColor} onClick={() => {closeModal(PROPOSALTAKEDOWN_1);}} >いいえ</ColorWidthButton1>
                <ColorWidthButton2 variant="contained" color={leftBtnColor} onClick={() => {handleClick();closeModal(PROPOSALTAKEDOWN_2);}} autoFocus >はい</ColorWidthButton2>
            </DialogActions>
        </Dialog2>                
    )
}

export default ProposalTakeDownDialog;