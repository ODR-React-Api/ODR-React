import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import '../assets/styles/NamAccept.scss'
import Checkbox from '@mui/material/Checkbox';
import DialogTitle from '@mui/material/DialogTitle';
import  Axios  from 'axios';
import '../mocks/mockJs';
import { SNACKS33_1, SNACKS33_2 } from '../../common/constants/constant'
import { Dialog2 } from '../../common/components/dialog';

function NamAccept(props: { ationOpen: boolean, closeDialog: (flg: string) => void }) {
    const { ationOpen,closeDialog } = props;
    const [openD, setOpenD] = useState(false);
    //控制按钮活性用flg
    const [flg,setFlg] = useState(0);
    //申立状態を更新/調停人履歴レコードを更新(更新用)
    const updCaseStatusForAcceptData =
    {
        //案件テーブル:ステージ
        Stage:"7",
        //案件テーブル:ステータス
        Status:"0600",
        // mediator_histories:ステージ
        MediatorStage:"1"
    };
    //調停人変更履歴を更新(更新用)
    const updMediatorHistoriesData =
    {
        // mediator_histories:ステージ
        MediatorStage:"4"
    };
    //关闭dialog
    function handleClose(){
        closeDialog("0") 
    };
    //打开Snackbar，
    function handleSnackbarOpen(msgId:any){
        //　「受理する」ボタン押下処理
        if(msgId=== SNACKS33_1){
            Axios.post('/updCaseStatusForAccept',updCaseStatusForAcceptData)
            .then(() =>{
                return;
            })
            closeDialog(msgId) 
        }
        else if(msgId=== SNACKS33_2)
        {
            //「辞退するする」ボタン押下処理
            Axios.post('/updMediatorHistories',updMediatorHistoriesData)
            .then(() =>{
                return;
            })
            closeDialog(msgId) 
        }
    };
    function handleDialogOpen(){
        setOpenD(true);
    };
    function handleDialogClose() {
        closeDialog('other') 
    };
    //点击复选框，「受理する」按钮活性与非活性判断
    function checkOpen(){
        if(flg ===0){
            setFlg(1)
        }else{
            setFlg(0)
        }
    }
    return (
        <React.Fragment>
            <Dialog
                open={ationOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                {"指名の受理と宣誓"}
            </DialogTitle>
            <DialogContent className='dlogTextStyle'>
                <div>
                    <label>
                        以下の内容を確認の上、
                        <br/>
                        調停人の指名を受理する場合は「受理する」ボタンをクリックしてください。
                        <br/>
                    </label>
                    <br/>
                    <div className='labeltextStyle'>
                        本件を受理するにあたり、独立性・中立性を保つとともに、受領した情報については秘密を守ることを誓います。
                        <br/>
                        また、本件につき独立性・中立性が疑われる事実がある場合には、全て開示いたします。
                    </div>
                    
                </div>
            </DialogContent>
                <div className='checkbStyle'>
                    <Checkbox color="success" defaultChecked onClick={checkOpen}/><span>上記の内容に同意する</span>
                </div>
            <DialogActions>
                <div>
                    <Button variant="contained" style={{ float: 'right' , marginRight: '5px', marginTop: '5px' }} color="success" disabled={flg === 1? true : false} onClick={() => handleSnackbarOpen(SNACKS33_1) }>受理する</Button>
                    <Button variant="outlined" style={{ float: 'right' , marginRight: '5px', marginTop: '5px' }} color="inherit" onClick={handleDialogOpen}>辞退する</Button>
                    <Button variant="outlined" style={{ float: 'right' , marginRight: '5px', marginTop: '5px' }} color="inherit" onClick={handleClose}>キャンセル</Button>
                </div>
            </DialogActions>
            </Dialog>
            <Dialog2
                open={openD}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">
                    {"調停人の指名を辞退しますか?"}
                </DialogTitle>
                <DialogContent className='dlogTextStyle'>
                    <div>
                        <label>
                            「はい」を選択すると申立ての内容を閲覧できなくなります。
                        </label>
                    </div>
                </DialogContent>
                <DialogActions>
                    <div>
                        <Button variant="contained" style={{ float: 'right' , marginRight: '5px', marginTop: '5px' }} color="success" onClick={() => handleSnackbarOpen(SNACKS33_2)}>はい</Button>
                        <Button variant="outlined" style={{ float: 'right' , marginRight: '5px', marginTop: '5px' }} color="inherit"  onClick={handleDialogClose} >いいえ</Button>
                    </div>
                </DialogActions>
            </Dialog2>
        </React.Fragment>
    )
}
export default NamAccept;