import { useContext } from "react";
import { Link } from "react-router-dom";
import { PageContext } from "../common/pageContext";

function MailAdress () {
  
  const {setPrevPage} = useContext(PageContext)
  
  return (
    <div>
      <p className="MailAdress">メールアドレス入力画面的内容</p>
      <Link to='/UserLogin' onClick={()=>setPrevPage('C12')} >会員登録フォーム画面 </Link>
    </div>
  )
}

export default MailAdress;