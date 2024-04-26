import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { PROMISEVERIFY_1, PROMISEVERIFY_2 } from '../../common/constants/constant';
import { ColorWidthButton1,ColorWidthButton2 } from "../../common/components/ButtonCommon";

// 個別やりとりの承諾依頼を確認Dialog
function PromiseVerifyDialog(props: {leftBtnColor: any, isOpenPromiseVerify: boolean, closeModal: (flg:string) => void }) {

    // S4画面から取得パラメータ
    const {leftBtnColor, isOpenPromiseVerify, closeModal} = props;

    // 「個別やりとりの承諾依頼」ポップアップの「承諾する」ボタン押下時、以下の処理を行う
    function handleClick(){
        // API「個別やりとりの承諾依頼」
        console.log('個別やりとりの承諾依頼を確認');
    }

    return (
        <Dialog
            open={isOpenPromiseVerify}
            onClose={() => {closeModal(PROMISEVERIFY_1);}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                {/* 調停人との個別のやりとりの承諾依頼 */}
                <Grid container>
                    <Grid item xs={10}>調停人との個別のやりとりの承諾依頼</Grid>
                    <Grid item xs={1}>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={() => {closeModal(PROMISEVERIFY_1);}}>
                            <CancelIcon color="disabled" fontSize='large' />
                        </IconButton >
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{color: 'black', width: 480}} id="alert-dialog-description">
                    相手方から、調停人と個別のやりとりを行いたいというリクエストがきています。承諾しますか?<br/><br/>
                    <span className="textColorGray">相手方からのコメント：</span><br/>
                    個別に相談させていただきたい内容があります。承諾のほど、よろしくお願いいたします。<br/><br/>
                    なお個別のやりとりを<b>承諾した場合、あなたにも調停人と個別にやりとりを行う権利</b>が付与されます。
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ColorWidthButton1 variant="outlined" color={leftBtnColor} onClick={() => {closeModal(PROMISEVERIFY_1);}} >却下する</ColorWidthButton1>
                <ColorWidthButton2 variant="contained" color={leftBtnColor} onClick={() => {handleClick();closeModal(PROMISEVERIFY_2);}} autoFocus >承諾する</ColorWidthButton2>
            </DialogActions>
        </Dialog>
    )
}

export default PromiseVerifyDialog;