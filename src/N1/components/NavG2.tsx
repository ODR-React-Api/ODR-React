import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import  Axios  from 'axios';
import  {MenuItem, Button, Divider, ListItemIcon,Menu } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LockIcon from '@mui/icons-material/Lock';
import DescriptionIcon from '@mui/icons-material/Description';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import '../assets/styles/Nav.scss';
import '../mocks/mockJs';


function NavG2() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };
    const [name ,setName] = useState('')
    //获取moke中的username
    useEffect(() =>{
        Axios.get('/GetName')
        .then((response) =>{
            setName(response.data.data.name)
        }
    )})
    const navigate = useNavigate();
    return(
        <div>
            <label className='titleN12'>Smart Judgement</label>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="text"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                color="inherit"
                className='TitleStyleN12'
                >{name}さん
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                >
                <MenuItem onClick={()=> navigate('/Login')}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    個人設定</MenuItem>
                <Divider />
                <MenuItem onClick={()=> navigate('/Login')}>
                    <ListItemIcon>
                        <LockIcon fontSize="small" />
                    </ListItemIcon>
                    プライバシーポリシー</MenuItem>
                <MenuItem onClick={()=> navigate('/Login')}>
                    <ListItemIcon>
                        <DescriptionIcon fontSize="small" />
                    </ListItemIcon>
                    利用規約</MenuItem>
                <MenuItem onClick={()=> navigate('/Login')}>
                    <ListItemIcon>
                        <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    ログアウト</MenuItem>
            </Menu>
            <span className='TitleStyleN12'>|</span>
            <label onClick={()=> navigate('/Login')} className='TitleStyleN12'>ヘルプ(FAQ)</label>
            <span className='TitleStyleN12'>|</span>
            <label onClick={()=> navigate('/Login')} className='TitleStyleN12'>トップ</label>
            <hr className='hrStyleN12'/>
            <h2>hello this is ログイン後の画面</h2>
        </div>
        )
}
export default NavG2;