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
import EditNoteIcon from '@mui/icons-material/EditNote';
import PeopleIcon from '@mui/icons-material/People';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { ColorWidthButton2 } from "../../common/components/ButtonCommon";

// 渡し項目の立場フラグが1(申立人) の場合 チュートリアルポップアップを表示
function ShowTuritor1Dialog(props: {leftBtnColor: any, isOpenShowTuritor1: boolean, closeModal: () => void }) {

    // S4画面から取得パラメータ
    const {leftBtnColor, isOpenShowTuritor1, closeModal} = props;
    
    // API「案件状態取得」を呼び出す。
    function handleClick(){
        // 実行Flg＝2 Turitor1Flg＝1（回答チュートリアウル表示済）
        const  ShowTuritor1 = 1;
        const paramPost =  [ShowTuritor1];
        console.log('ShowTuritor1の更新：' + paramPost);
    }

    return (
        <Dialog
            open={isOpenShowTuritor1}
            onClose={() => {closeModal();}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title" className='textCenter'>
                お手続きの流れ
            </DialogTitle>
            <List sx={{ pt: 0 }}>
                <ListItem disableGutters key='1' className='ShowTuritorList'>
                    <ListItemAvatar className='ShowTuritorList'>
                        <Avatar sx={{ bgcolor: 'Honeydew', color: 'Green', width: 70, height: 70 }} >
                            <EditNoteIcon sx={{ fontSize: 40 }}/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText className='ShowTuritorList'>
                        <b>1.話し合い人の参加と回答</b>
                        <br/>あなた人問題の「申立て」が行われました。問題の内容を確認し、まずは問題解決の場人の「参加表明」と、申立てに対する「回答」の提出を回答期日までにお願いします。
                    </ListItemText>
                </ListItem>
                <ListItem disableGutters key='2' className='ShowTuritorList'>
                    <ListItemAvatar className='ShowTuritorList'>
                        <Avatar sx={{ bgcolor: 'LightCyan', color: 'DeepSkyBlue', width: 70, height: 70 }} >
                            <PeopleIcon sx={{ fontSize: 40 }}/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText className='ShowTuritorList'>
                        <b>2.交涉</b>
                        <br/>申立ての相手と解決に向けた話し合いを行います。オンライン上のメッセージ。機能を利用するため、いつてもとこにいても話し合いを進めることができます。
                    </ListItemText>
                </ListItem>
                <ListItem disableGutters key='3' className='ShowTuritorList'>
                    <ListItemAvatar className='ShowTuritorList'>
                        <Avatar sx={{ bgcolor: 'Lavender', color: 'MediumSlateBlue', width: 70, height: 70 }} >
                            <PlaylistAddCheckIcon sx={{ fontSize: 40 }}/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText className='ShowTuritorList'>
                        <b>3.和解のお手続き</b>
                        <br/>お互いの主張を確認後、あなたと相手のどちらかが和解の内容をて提出し、お互いが和解案に合意することで解決となります。期日までに解決しない場合は、「調停」を行います。
                    </ListItemText>
                </ListItem>
                <ListItem disableGutters key='4' className='ShowTuritorList'>
                    <ListItemAvatar className='ShowTuritorList'>
                        <Avatar sx={{ bgcolor: 'MistyRose', color: 'pink', width: 70, height: 70 }} >
                            <Diversity3Icon sx={{ fontSize: 40 }}/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText className='ShowTuritorList'>
                        <b>4.調停</b>
                        <br/>問題解決の専門家である「調停人」が、中立的な立場でヒアリングを行い、和解の内容を提案します。調停でのやりとりも、すべてオンライン上で行うことができます。
                    </ListItemText>
                </ListItem>
                <ListItem disableGutters key='5' className='ShowTuritorList'>
                    <ListItemAvatar className='ShowTuritorList'>
                        <Avatar sx={{ bgcolor: 'AntiqueWhite', color: 'orange', width: 70, height: 70 }} >
                            <HelpOutlineIcon sx={{ fontSize: 40 }}/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText className='ShowTuritorList'>
                        <b>手続きや操作方法でお困りの際</b>
                        <br/>手続きの詳細や操作方法方法についてお困りの際は、<span className="textColorBlue">ヘルプ・お問い合わせ</span>からいつでも詳細をご確認いただけます。
                    </ListItemText>
                </ListItem> 
            </List>
            <DialogActions sx={{justifyContent: 'center'}}>
                <ColorWidthButton2 variant="contained" color={leftBtnColor} onClick={() => {handleClick();closeModal();}} >手続きを始める</ColorWidthButton2>
            </DialogActions>
        </Dialog>                
    )
}

export default ShowTuritor1Dialog;