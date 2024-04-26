import React, { useState } from 'react';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { msgSnackList } from '../constants/constant';


function SnackbarWithCloseButton(props: { OpenSnackbarMessageFlg: string, onMessageChange: () => void }) {
    const { OpenSnackbarMessageFlg, onMessageChange } = props;
    const [openSnackbar, setOpenSnackbar] = useState(true);

    // snackbarの閉める
    function handleClose() {
        setOpenSnackbar(false);
        onMessageChange();
    };


    // snackbar内容の設定
    function message(OpenSnackbarMessageFlg:any) {
        let messagesnackbar = "";
        msgSnackList.forEach((item: any) => {
            if (item.msgId === OpenSnackbarMessageFlg) {
                messagesnackbar = item.message
            }
        })
        return messagesnackbar;
    };
    
    return (
        <div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message(OpenSnackbarMessageFlg)}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </div>
    );
};

export default SnackbarWithCloseButton;