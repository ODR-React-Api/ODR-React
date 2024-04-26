import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { ColorWidthButton2 } from "../../common/components/ButtonCommon";


// 渡し項目の立場フラグが1(申立人) or 2（相手方）の場合 チュートリアルポップアップを表示
function ShowTuritor3Dialog(props: {leftBtnColor: any, isOpenShowTuritor3: boolean, closeModal: () => void }) {

    // S4画面から取得パラメータ
    const {leftBtnColor, isOpenShowTuritor3, closeModal} = props;

    // API「案件状態取得」を呼び出す。
    function handleClick(){
        // 実行Flg＝2 Turitor3Flg＝1（回答チュートリアウル表示済）
        const  ShowTuritor3 = 1;
        const paramPost =  [ShowTuritor3];
        console.log('ShowTuritor3の更新：' + paramPost);
    }

    return (
        <Dialog
            open={isOpenShowTuritor3}
            onClose={() => {closeModal();}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title" className='textCenter'>
                調停のお手続きの流れ
            </DialogTitle>
            <List sx={{ pt: 0 }}>
                <ListItem disableGutters key='1' className='ShowTuritorList'>
                    <ListItemAvatar className='ShowTuritorList'>
                        <Avatar sx={{ bgcolor: 'Honeydew', color: 'Green', width: 70, height: 70 }} >
                            <HowToRegIcon sx={{ fontSize: 40 }}/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText className='ShowTuritorList'>
                        <b>1.調停の開始</b>
                        <br/>ここからは、問題解決の專門家である「調停人」が、中立的な立場として問題解決のサポートを行います。まずは、調停人が指名されるまで、お待ちください。
                    </ListItemText>
                </ListItem>
                <ListItem disableGutters key='2' className='ShowTuritorList'>
                    <ListItemAvatar className='ShowTuritorList'>
                        <Avatar sx={{ bgcolor: 'LightCyan', color: 'DeepSkyBlue', width: 70, height: 70 }} >
                            <Diversity3Icon sx={{ fontSize: 40 }}/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText className='ShowTuritorList'>
                        <b>2.調停人からのヒアリング</b>
                        <br/>調停人の指名後は、調停人により問題に関するヒアリングが行われます。オンライン上のメッセージ機能を利用し、調停人人問題の詳細に関する情報提供を行ってください。
                    </ListItemText>
                </ListItem>
                <ListItem disableGutters key='3' className='ShowTuritorList'>
                    <ListItemAvatar className='ShowTuritorList'>
                        <Avatar sx={{ bgcolor: 'Lavender', color: 'MediumSlateBlue', width: 70, height: 70 }} >
                            <PlaylistAddCheckIcon sx={{ fontSize: 40 }}/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText className='ShowTuritorList'>
                        <b>和解のお手続き</b>
                        <br/>調停人により、和解の内容として「調停案」が提案されます。調停案にお互いが合意した場合は、和解成立となります。和解が成立しない場合は、和解不成立として調停終了となります。
                    </ListItemText>
                </ListItem>
            </List>
            <DialogActions sx={{justifyContent: 'center'}}>
                <ColorWidthButton2 className="dialog-btn"  variant="contained" color={leftBtnColor} onClick={() => {handleClick();closeModal();}} >手続きを始める</ColorWidthButton2>
            </DialogActions>
        </Dialog>
    )
}

export default ShowTuritor3Dialog;