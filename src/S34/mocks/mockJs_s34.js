import Mock from 'mockjs'

// 調停人の経験取得API。
export const aaa =  Mock.mock('/getMediatorInfo', 'get', options => {
    const ret =  Mock.mock(
        {
            // 解決出来た案件数
            uniuqeCasesIdCount: 30,
            // 調停人の担当件総件数
            uniqueCaseIdCount: 100
        }
    )
    return {
        status: 200,
        data: ret
    }
})

// 調停人の経験取得API。
export const s35 =  Mock.mock('/getMediatorDisclosureDate', 'get', options => {
    const ret =  Mock.mock(
        {
            // 解決出来た案件数
            mediatorDisclosureDate: '2024年2月29日'
        }
    )
    return {
        status: 200,
        data: ret
    }
})

// 調停人無理由変更可能期限日を取得API。
export const getMediatorChangeableCount_S34 =  Mock.mock('/getMediatorChangeableCount_S34', 'get', options => {
    const ret =  Mock.mock(
        {
            // 調停人無理由変更可能期限日
            mccDate: '20240304',
            // 変更回数取得
            cyclenumber: 3,
            // 調停人無理由変更可能期限日
            mediatorNoReasonChangeDate_34: '20240428',
            // 変更回数取得
            mediatorChangeableCount1: 5,
            // 変更回数取得
            mediatorChangeableCount2: 3
        }
    )
    return {
        status: 200,
        data: ret
    }
})
