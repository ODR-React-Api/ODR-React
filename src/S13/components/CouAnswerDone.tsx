import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ColorWidthButton1 } from "../../common/components/ButtonCommon";

// 按钮属性设定
const buttonStyles = {
  padding: '8px 50px',
  display: 'flex',
  justifyContent: 'center',
  marginTop: 25,
}



function Hello(props:any) {
  return <div style={{textAlign:"center",fontSize:20}}>{props.message}</div>;
}

function CouAnswerDone (){
  const navigate = useNavigate();
      return(
        <div>
          <h1>回答完了画面</h1>
          <Hello message="登録が完了しました。"/>
          <Hello message="申立人に回答及び反訴を提出しました。"/>
          <Hello message="申立人からの回答があり次第、メールにてご連絡します。"/>
          <div style={buttonStyles}>
          <ColorWidthButton1 variant="outlined" onClick={() => navigate('/MosList')}>サービストップ画面へ</ColorWidthButton1>
          </div>
        </div>      
      )     

}
export default CouAnswerDone;


