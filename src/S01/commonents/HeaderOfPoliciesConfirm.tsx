import Step1 from "../../common/utils/step";
import '../../common/styles/step.css'
function HeaderOfPoliciesConfirm (props:any){
    const pageFlg = props.pageFlg;
    const displayFlg = props.data.displayFlg;
    const list=[
        '入力',
        '規約同意',
        '確認',
        '完了'
    ]

    let pageName;
    if (pageFlg === '0') {
        pageName = '利用規約'
    } else {
        pageName = 'プライバシーポリシー'
    };
    const num = 1;
    if (displayFlg === '3'){
        return (
            <div className="headerDiv" style={{backgroundColor:"white"}}>
                {<Step1 stepNum={num} steps={list} />}
            </div>
        )
    }else{
        return (
            <div>
                <div className="headerDiv">
                    <label style={{fontSize:16}}>変更内容のご確認のお願い</label><br />
                    <label style={{fontSize:14}}>{pageName}が更新されました。サービスご利用の前に、新しい{pageName}のご確認をお願いいたします。</label>
                </div>
            </div>
        )
    };
} 
export default HeaderOfPoliciesConfirm; 