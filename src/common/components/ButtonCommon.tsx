import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const LoginButton = styled(Button)({
  width:'283px'
});

export const LoginButton1 = styled(Button)({
  width:'283px',
  backgroundColor: 'white',
  color:'black', 
  borderColor:'black',
  '&:hover':{
    borderColor:'black',
    backgroundColor: 'white',
  }
});

export const ColorWidthButton1 = styled(Button)({
  marginLeft:'5px',
  marginRight:'5px',
  backgroundColor: 'white',
  color:'black', 
  borderColor:'black',
  '&:hover':{
    borderColor:'black',
    backgroundColor: 'white',
  }
});

export const ColorWidthButton2 = styled(Button)({
  marginLeft:'5px',
  marginRight:'5px',
});
  