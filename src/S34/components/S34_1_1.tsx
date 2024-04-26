import React, { useState } from 'react';
import '../assets/styles/S34_1.css';
import '../mocks/mockJs_s34.js';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

    const SnackbarWithCloseButton = () => {
        const [open, setOpen] = useState(true);

        const handleClose = () => {
            setOpen(false);
        };


        return (
        <div>
            {/* MUI组件 */}
            <Snackbar
                open={open}
                // 设定自动关闭时间
                autoHideDuration={6000}
                onClose={handleClose}
                // 设定显示内容
                message="調停人の指名が行われるまでお待ちください。"
                action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
            />
        </div>
        );
    };

// 导出函数 
export default SnackbarWithCloseButton;