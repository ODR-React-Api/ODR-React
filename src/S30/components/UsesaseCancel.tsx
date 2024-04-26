import React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import dayjs from 'dayjs';
import '../assets/styles/UsesaseCancel.scss';
import '../mocks/mockJs.js';
import { Dialog2 } from '../../common/components/dialog';
import { ColorWidthButton1 } from '../../common/components/ButtonCommon'
import { ColorWidthButton2 } from '../../common/components/ButtonCommon'

function UsesaseCancel(props: { usesaseCancelOpen: boolean, closeDialog: () => void }) {
    const { usesaseCancelOpen, closeDialog } = props;
    // mock.jsを利用してデータをシミュレートし、更新された値をコンソールに表示する。
    function handleClose(){
        const UpdCaseCancelDateData = 
        {
            案件ステージ:4,
            案件ステータス:"0400",
            //システム日付
            手続き中止日:dayjs(new Date()).format('YYYYMMDD'),
            //システム時刻
            ResolutionDate:dayjs(new Date()).format('HH:mm:ss'),
            ResolutionFlag:0,
        };
        axios.post('/UpdCaseCancelDate',UpdCaseCancelDateData).then(response =>{
            return;
        })
    };
    
    return (        
        <div className="App">
            <Dialog2
                open={usesaseCancelOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                id='UsesaseCancel'
            >
                {/* 申立て中止手続きタイトル。 */}
                <DialogTitle id="alert-dialog-title">
                    この申立てに関する手続きを中止しますか？
                </DialogTitle>
                <DialogContent>
                    {/* 申立て中止手続きメッセージ。 */}
                    <DialogContentText id="alert-dialog-description">
                    「はい」を選択した場合、今回の申立ては未解決のまま終了となり、以後、<span className ="red">この申立てに関するやりとりを行うことはできなくなります</span>ので、ご注意ください。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div>
                        <ColorWidthButton2 variant='contained' color="success" style={{ float: 'right' }} onClick={() => { handleClose(); closeDialog() }} autoFocus>
                            はい
                        </ColorWidthButton2>
                        <ColorWidthButton1 variant='outlined' style={{ float: 'right' }} onClick={() => { closeDialog() }}>いいえ</ColorWidthButton1>
                    </div>
                </DialogActions>
            </Dialog2>
        </div>
    );
}
export default UsesaseCancel

