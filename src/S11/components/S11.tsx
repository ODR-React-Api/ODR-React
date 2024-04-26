import AnswerLogin from "./AnswerLogin";
import AnswerContent from "./AnswerContent";

function S11(){
    return (
        <div style={{textAlign:"left"}}>
            {/* 回答の登録 */}
            <AnswerLogin />
            {/* 回答の内容 */}
            <AnswerContent />
        </div>
    )
}

export default S11;