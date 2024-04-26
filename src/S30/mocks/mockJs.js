import Mock from "mockjs";
module.export =  Mock.mock('/UpdCaseCancelDate','post',UpdCaseCancelDateData =>{
    const UpdCaseCancelDateJson = JSON.parse(UpdCaseCancelDateData.body)
    console.log(UpdCaseCancelDateJson)
}
)