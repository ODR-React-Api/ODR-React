import Mock from "mockjs";
//現在の終了日
export  const dateCurrent =  Mock.mock('/currentEndDate',getEndDate =>{
    //toJson変換
    const currentEndDateToJson = JSON.parse(getEndDate.body);
    console.log(currentEndDateToJson);
    //調停期限日
    const formGetEndDate =
    {
        MediationEndDate: '20240403',
        Circular:'1'
    };
    return formGetEndDate;
}
)
//延長の終了
//案件情報更新
export const dateExtension =  Mock.mock('/updCasesForMediationEndDate','post',updCasesForExtendedEndDateData =>{
    //toJson変換 
    const updCasesForExtendedEndDateToJson = JSON.parse(updCasesForExtendedEndDateData.body)
    console.log(updCasesForExtendedEndDateToJson)
}
)
//アクション履歴新規登録
export const InsExtendedHistories =  Mock.mock('/insertExtendedHistories','post',extendedEndDateInsertHistories =>{
    //toJson変換
    const extendedEndDateInsertHistoriesToJson = JSON.parse(extendedEndDateInsertHistories.body)
    console.log(extendedEndDateInsertHistoriesToJson)
}
)
