// 「NEW」マーク表示
function NewDiv72hModal(props: {lastModifiedDate:string}){
    const {lastModifiedDate} = props;

    // 当前时间
    const now = new Date();
    const lastDate = new Date(lastModifiedDate);
    if(now >= lastDate){
        // 时间差
        const distance = now.getTime() - lastDate.getTime();
        const hours = Math.floor(distance / (1000 * 60 * 60));
        // LastModifiedDateから72時間以内の場合、タイトルの横に「NEW」マークを表示する。
        if(hours < 72){
            return <span className="newDiv-color">NEW</span>;
        }else{
            return null;
        }
    }else{
        return null;
    }
}

export default NewDiv72hModal;