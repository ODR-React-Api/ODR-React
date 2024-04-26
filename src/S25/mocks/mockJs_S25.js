import Mock from 'mockjs'


Mock.mock('/GetStatusS25', 'get', (Option) => {
    const ret = Mock.mock(
        {
            Status: '3',//(1Math.floor(Math.random()*3)).toString(),
            //申立人制御
            PetitionUserInfo_Email:'1',
            //相手方制御
            TraderUserEmail:'2',
            //案件データ.ResolutionDate[Status='9'時、契约日利用]
            ResolutionDate:'20240312',
            //調停人
            MediatorLastName: '調停人確認用 テストアカウント',
            //申立人
            ClaimantLastName: '申立人確認用 テストアカウント',
            //相手方LastName
            RespondentLastName: 'アカウント確認用 相手方',
            //案件cid
            Cid:'0000002224',
            //案件CaseTitle
            CaseTitle:'テスト商品_返金',
            //対応方法
            Note1:'相手方は金額を確認した上で、下記の日付までに下記の条件のもとで申立人に支払いを行うものとする。',
            //概要
            Summary:'全额返金',
            //申し立て支払い金額
            payAmount:'$800',
            //反訴支払い金額
            CountePayment:'$200',
            //支払い期日
            PayLimitDate:'2021年4月14日',
            //返送時の送料
            ReturningCost:'返送なし',
            //特記事項
            SpecialNotes:'特記事項入力テスト',
            //添付資料
            Pdf:'Sample.pdf',
            //otherContext
            Note2:'申立人および相手方は、申立人と相手方との間には、本件に関し、本調停案に定めるもののほかに何らの債権債務がないことを相互に確認する。',
        
        }
    )
    return {
        status: 200,
        data: ret
    }
})

Mock.mock('/UpdMediationsStatus', 'post', (updCaseStatusForAcceptData) => {
    const InsMediationsH = JSON.parse(updCaseStatusForAcceptData.body)
    console.log(InsMediationsH)

})
