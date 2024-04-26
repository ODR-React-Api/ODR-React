import Mock from "mockjs";
module.export =  Mock.mock('/ReplyWithdraw','post',ReplyWithdrawData =>{
    const ReplyWithdrawJson = JSON.parse(ReplyWithdrawData.body)
    console.log(ReplyWithdrawJson)
}
)