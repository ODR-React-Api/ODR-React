import Mock from 'mockjs'
//案件ステータス更新API
export const updCaseStatusForAcceptData =Mock.mock('/updCaseStatusForAccept','post',updCaseStatusForAcceptData =>{
    const updCaseStatusForAcceptDataJson = JSON.parse(updCaseStatusForAcceptData.body)
    // alert('更新対象:\n案件ステージ:'+updCaseStatusForAcceptDataJson.Stage 
    // +'\n案件ステータス:'+ updCaseStatusForAcceptDataJson.Status
    // +'\n mediatorステージ:'+ updCaseStatusForAcceptDataJson.MediatorStage)
    console.log(updCaseStatusForAcceptDataJson)
})
//調停人変更履歴更新API
export const updMediatorHistoriesData =Mock.mock('/updMediatorHistories','post',updMediatorHistoriesData =>{
    const updMediatorHistoriesDataJson = JSON.parse(updMediatorHistoriesData.body)
    // alert('更新対象:\n mediatorステージ:'+ updMediatorHistoriesDataJson.MediatorStage)
    console.log(updMediatorHistoriesDataJson)
})