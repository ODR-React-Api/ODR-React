import { useNavigate } from 'react-router-dom';
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

function UserLoginDone (){
  const navigate = useNavigate();
  return(
    <div>
      <h1>会員登録完了画面</h1>
      <Hello message="本登録が完了しました。"/>
      <Hello message="ご登録のメールアドレスに登録確認用のメールを送信しました。"/>
      <div style={buttonStyles}>
      <ColorWidthButton1 variant="outlined" onClick={() => navigate('/MosTop')}>サービストップ画面へ</ColorWidthButton1>
      </div>
    </div>
      
  )       
}
export default UserLoginDone;


