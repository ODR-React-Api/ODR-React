import Mock from 'mockjs'
//反訴・回答データ取得API
export const GetClRliesData = Mock.mock('/GetClaimRepliesData','get',() =>{
    const ret = Mock.mock(
        {
            // 案件番号
            CaseId:'0001234500',
            //申立件名
            CaseTitle:'反訴への回答の登録用',
            //反訴・回答
            CounterContext:'反訴・回答',
            //添付ファイル
            FileName:'Sample2.pdf',
            // FileName:null,
            //添付ファイル
            FileUrl:'url',
            //案件別個人情報リレーション
            TraderUserEmail:'123@Email',
            FirstName:'相手方',
            MiddleName:'反訴への回答の登録用',
            LastName:'テスト',
            CompanyName:'相手方（所属会社）',
        }
    )
    return{
        status: 200,
        data: ret
    }
})
