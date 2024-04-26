import React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { DISMISSBYMEDIATE_1, DISMISSBYMEDIATE_2 } from '../../common/constants/constant';
import { Dialog2 } from '../../common/components/dialog';
import { ColorWidthButton1,ColorWidthButton2 } from "../../common/components/ButtonCommon";

// 調停人を辞任するDialog
function DismissByMediateDialog(props: {sessionData: any, leftBtnColor: any, isOpenDismissByMediate: boolean, closeModal: (flg:string) => void }) {

    // S4画面から取得パラメータ
    const {sessionData, leftBtnColor, isOpenDismissByMediate, closeModal} = props;

    // 「調停人を辞任する」ポップアップの「はい」ボタン押下時、以下の処理を行う
    function handleClick(){
        // 機能説明_調停人辞任
        console.log('調停人を辞任する');
        // 2.1 メール送信 & アクション履歴記録
        // 2.2 APIで調停人変更履歴の変更を行う。
        const status = 4; // 4：調停人拒否
        const resignFlag = 1;
        const paramPost =  [status, resignFlag];
        console.log('APIで調停人変更履歴の変更を行う：' + paramPost);
        // 2.3 下記のAPIをコールし、調停人が退出しましたメッセージを追加する。
        // API名：調停人退出メッセージ登録API
        // ・「メッセージ」新規登録
        const dateTime = new Date(); 
        const massage_id = Math.random(); // 自動生成GIUD ※このidをセッション情報＜投稿メッセージID＞として保存する
        let platformId = sessionData.platformId;
        let caseId = sessionData.caseId;
        let messageGroupId = null;
        const sendUserId = sessionData.UserId;
        const sendUserType = 3; // 3：調停人
        const sendDate = dateTime.toLocaleString();
        const messageType = 4; // QuitMessage
        const message = null;
        const fileId1 = null;
        const fileId2 = null;
        const fileId3 = null;
        const caseStage = 6;
        const joinedUserId = sessionData.UserId;
        const other01 = null;
        const other02 = null;
        const other03 = null;
        const other04 = null;
        const other05 = null;
        const deleteFlag = 0;
        const lastModifiedDate = dateTime.toLocaleString();
        const lastModifiedBy = sessionData.mediator.userName;;
        const massagePost =  [massage_id, platformId, caseId, messageGroupId, sendUserId, sendUserType, sendDate, messageType, message, fileId1, fileId2, fileId3, caseStage, joinedUserId, other01, other02, other03, other04, other05, deleteFlag, lastModifiedDate, lastModifiedBy];
        console.log('「メッセージ」新規登録' + massagePost);
        // ・「ユーザメッセージ」新規登録
        const massageUser_id = Math.random(); // 自動生成GIUD
        // messageId: 投稿メッセージID
        const userId = '001011002012'; // ＜セッション情報のCaseId対応な申立人・相手方・代理人＞
        const readFlag = 0;
        const massageUserPost =  [massageUser_id, platformId, caseId, messageGroupId, massage_id, userId, readFlag, other01, other02, other03, other04, other05, deleteFlag, lastModifiedDate, lastModifiedBy];
        console.log('「ユーザメッセージ」新規登録' + massageUserPost);
        // 2.4 調停人を再指名する
	    // 調停人自動指名ロジックという共通処理をコールし、再指名を行う。
    }

    return (
        <Dialog2
            open={isOpenDismissByMediate}
            onClose={() => {closeModal(DISMISSBYMEDIATE_1);}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                調停人を辞任しますか？
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{color: 'black'}} id="alert-dialog-description">
                    「はい」を選択すると申立ての内容を閲覧できなくなります。
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ColorWidthButton1 variant="outlined" color={leftBtnColor} onClick={() => {closeModal(DISMISSBYMEDIATE_1);}} >いいえ</ColorWidthButton1>
                <ColorWidthButton2 variant="contained" color={leftBtnColor} onClick={() => {handleClick();closeModal(DISMISSBYMEDIATE_2);}} autoFocus >はい</ColorWidthButton2>
            </DialogActions>
        </Dialog2>                
    )
}

export default DismissByMediateDialog;