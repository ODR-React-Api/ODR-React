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

function AnswerDone (){
  const navigate = useNavigate();
  return(
    <div>
      <h1>反訴回答完了案内画面</h1>
      <Hello message="登録が完了しました。"/>
      <Hello message="相手方に回答を提出しました。"/>
      <Hello message="以降は「メッセージ」でのやりとりが可能になります。"/>
      <div style={buttonStyles}>
      <ColorWidthButton1 variant="outlined" onClick={() => navigate('/MosList')}>サービストップ画面へ</ColorWidthButton1>
      </div>
    </div>
        
      )       
}
export default AnswerDone;


