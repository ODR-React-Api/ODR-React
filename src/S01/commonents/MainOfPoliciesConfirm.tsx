import { useRef, useState } from "react";
import useCompToPDF from "./generatePDF";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { blue } from "@mui/material/colors";

function MainOfPoliciesConfirm (props:any) {
    const pageFlg = props.pageFlg;
    const displayFlg = props.data.displayFlg;

    const ref = useRef<HTMLDivElement>(null);
    let fileName;
    if (pageFlg ==='0'){
        fileName= '利用会員規約同意書'
    }else{
        fileName = '個人情報取扱同意書'
    };
    const { exportPDF } = useCompToPDF({fileName:fileName});

    let htmlContext;
    if (pageFlg === '0'){
        htmlContext = props.data.htmlContextOfTerms
    } else {
        htmlContext = props.data.htmlContextOfPolicy
    }
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
      };
      const handleOpen = () => {
        setOpen(true);
      };

    const download = (e:any) => {
        e.preventDefault();
        exportPDF(ref.current); 
        handleOpen();
    }

    return (
        <div>
            <div style={{textAlign:"right",marginRight:20}}>
                <FileDownloadOutlinedIcon sx={{ color: blue[700] }} viewBox="0 -4 24 24"/>
                <a href="./" onClick={download} id="linkOfDownload" tabIndex={1} >ダウンロードする</a>
            </div>
            <div className={displayFlg==='3'? "contentDoubleDiv" : "contentSinleDiv"} >
                <div ref={ref} dangerouslySetInnerHTML={{__html:htmlContext}}></div>
            </div>
            <div>
                <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}
                message="ファイルダウンロード中・・・"
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                    </IconButton>
                }
                />
            </div>
        </div>
    )
} 

export default MainOfPoliciesConfirm;

