function TitleOfPoliciesConfirm (props:any) {
    const pageFlg = props.pageFlg;
    const displayFlg = props.data.displayFlg;

    // 标题设定
    let titleName;
    if (displayFlg ==='3') {
        titleName = '利用会員規約・個人情報取扱'
    } else {
        if (pageFlg === '0') {
            titleName = '利用会員規約'
        } else {
            titleName = '個人情報取扱'
        }
    }
    //  button名称设定
    let btnName;
    if (displayFlg === '0' || displayFlg === '1'){
        btnName = 'サービストップ画面へ'
    } else if (displayFlg === '2') {
        if (pageFlg === '0'){
            btnName = '次へ'
        } else {
            btnName = 'サービストップ画面へ'
        }
    } else if (displayFlg === '3') {
        btnName = '会員情報確認へ'
    }

    const title =(
        <div className="titleDiv">
            <label style={{fontSize:16}}>Smart Judgement{titleName}同意書</label><br />
            <label style={{fontSize:14}}>下記の同意書に同意の上、「{btnName}」ボタンをクリックしてください。</label>
        </div>

    );

    return title;
}

export default TitleOfPoliciesConfirm;