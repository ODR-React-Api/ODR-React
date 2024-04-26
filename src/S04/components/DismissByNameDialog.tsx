import React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { DISMISSBYNAME_1, DISMISSBYNAME_2 } from '../../common/constants/constant';
import { Dialog2 } from '../../common/components/dialog';
import { ColorWidthButton1,ColorWidthButton2 } from "../../common/components/ButtonCommon";

// 指名を辞退するDialog
function DismissByNameDialog(props: {leftBtnColor: any, isOpenDismissByName: boolean, closeModal: (flg:string) => void }) {

    // S4画面から取得パラメータ
    const {leftBtnColor, isOpenDismissByName, closeModal} = props;

    // 「指名を辞退する」ポップアップの「はい」ボタン押下時、以下の処理を行う
    function handleClick(){
        // API「指名を辞退する」
        console.log('指名を辞退する');
    }

    return (
        <Dialog2
            open={isOpenDismissByName}
            onClose={() => {closeModal(DISMISSBYNAME_1);}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                調停人の指名を辞退しますか？
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{color: 'black'}} id="alert-dialog-description">
                    「はい」を選択すると申立ての内容を閲覧できなくなります。
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ColorWidthButton1 variant="outlined" color={leftBtnColor} onClick={() => {closeModal(DISMISSBYNAME_1);}} >いいえ</ColorWidthButton1>
                <ColorWidthButton2 variant="contained" color={leftBtnColor} onClick={() => {handleClick();closeModal(DISMISSBYNAME_2);}} autoFocus >はい</ColorWidthButton2>
            </DialogActions>
        </Dialog2>                
    )
}

export default DismissByNameDialog;