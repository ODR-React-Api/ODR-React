import AnswerLoginConfirm from "./AnswerLoginConfirm";
import AnswerConfirm from "./AnswerConfirm";

function S12(){
    return (
        <div style={{textAlign:"left"}}>
            {/* 回答の登録 */}
            <AnswerLoginConfirm />
            {/* 回答の内容 */}
            <AnswerConfirm />
        </div>
    )
}

export default S12;