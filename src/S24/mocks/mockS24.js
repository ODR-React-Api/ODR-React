import Mock from 'mockjs'


Mock.mock('/GetMediationsWithoutFile', 'get', (Option) => {
    const ret = Mock.mock(
        {
        //Statusが0或いは1以外の場合、「修正する」と「調停案を提出」画面項目を非表示にする。
        Status: 0,
        //言語判定用（1：日本語 2：英語）
        LanguageFlg:1,
        //調停人所属会社
        MediatorCompany:'株式会社テスト１',
        // MediatorCompany:'',
        //調停人LastName
        MediatorLastName: '調停人',
        //調停人FirstName
        MediatorFirstName:'テスト１',
        //調停人MiddleName
        MediatorMiddleName:'test1',
        //申立人所属会社
        ClaimantCompany:'株式会社テスト２',
        // ClaimantCompany:'',
        //申立人LastName
        ClaimantLastName: '申立人',
        //申立人FirstName
        ClaimantFirstName:'テスト２',
        //申立人MiddleName
        ClaimantMiddleName:'test2',
        //相手方所属会社
        RespondentCompany:'株式会社テスト３',
        // RespondentCompany:'',
        //相手方LastName
        RespondentLastName: '相手方',
        //相手方FirstName
        RespondentFirstName:'テスト３',
        //相手方MiddleName
        RespondentMiddleName:'test3',
        //案件cid
        Cid:'0000002224',
        //案件CaseTitle
        CaseTitle:'テスト商品_返金',
        //対応方法
        Note1:'相手方は金額を確認した上で、下記の日付までに下記の条件のもとで申立人に支払いを行うものとする。',
        //添付資料
        Pdf:'Sample.pdf',
        //otherContext
        Note2:'申立人および相手方は、申立人と相手方との間には、本件に関し、本調停案に定めるもののほかに何らの債権債務がないことを相互に確認する。',
    }
    )
    return{
        status: 200,
        data: ret
    } 
})

Mock.mock('/InsMediationsHistories', 'post', (InsMediations) => {
    const InsMediationsH = JSON.parse(InsMediations.body)
    console.log(InsMediationsH)

})