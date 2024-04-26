import Mock from "mockjs";
module.export =  Mock.mock('/mpath','post',FormData =>{
    const formDataToJson = JSON.parse(FormData.body)
    console.log(formDataToJson)
}
)
