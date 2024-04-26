import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

//S19,S20,S24,S25,和解案,調停案画面Dialog
export const Dialog1 = styled(Dialog)({ 
  '.css-1t1j96h-MuiPaper-root-MuiDialog-paper ':{
    margin: 'auto',
    maxWidth:'1500px',
    width:'1000px',
    height:'800px'
  },
  '.css-mhc70k-MuiGrid-root>.MuiGrid-item':{
    paddingTop:'0px !important'
  },
  '.css-ypiqx9-MuiDialogContent-root ':{
    padding:'0px 0px 0px 0px',
    margin: 'auto'
  }  
});

// 简短固定言语+两个按钮
export const Dialog2 = styled(Dialog)({ 
  '.css-1t1j96h-MuiPaper-root-MuiDialog-paper ':{
    margin: 'auto',
    width:'600px',
    height:'233px'
  },
});

//S22,S25画面errorDialog
export const Dialog3 = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': { 
    width: '420px',
    height: '200px',
    margin: 'auto' 
  }, 
}));

//S26,S27,S29画面Dialog
export const Dialog4 = styled(Dialog)({ 
  '.css-1t1j96h-MuiPaper-root-MuiDialog-paper ':{
    margin: 'auto',
    width:'440px',
    height:'250px',
    backgroundColor:'#f7f8f9 !important'
  },
  
});