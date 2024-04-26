import Mock from 'mockjs'

// ユーザ情報取得API
export default Mock.mock('/getOdrUserInfo_S21', 'get', options => {
    const ret =  Mock.mock(
        {
            // 人名odr_users.FirstName
            firstName: '　テスト',
            // 人名odr_users.LastName
            lastName: '調停人',
            // 職位
            position: '部長',
            // 自己紹介
            selfIntroduce: '調停専門家',
            // 略歴
            historyInfo: '人生如戏',
            // 専門分野
            major: '演技',
            // 履歴書
            resumeFileId: '就会演戏.pdf',
            // プロフィール画像
            profilePictureFileId: 'mao'
        }
    )
    return {
        status: 200,
        data: ret
    }
})

// 調停人の経験取得API。
export const getMediatorInfo_S21 =  Mock.mock('/getMediatorInfo_S21', 'get', options => {
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

// API:getMediationStatus
export const getMediationStatus_S21 =  Mock.mock('/getMediationStatus_S21', 'get', options => {
    const ret =  Mock.mock(
        {
            // 未提出
            caseMediationsStatus: 0
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
export const getMediatorChangeableCount_S21 =  Mock.mock('/getMediatorChangeableCount_S21', 'get', options => {
    const ret =  Mock.mock(
        {
            // 調停人無理由変更可能期限日
            mccDate: '20240304',
            // 変更回数取得
            mediatorChangeableCount1: 5,
            // 変更回数取得
            mediatorChangeableCount2: 3,
            // 調停人無理由変更可能期限日
            mediatorNoReasonChangeDate: '20240323',
        }
    )
    return {
        status: 200,
        data: ret
    }
})

// 調停人機能制限を取得API。
export const getMediator_S21 =  Mock.mock('/getMediator_S21', 'get', options => {
    const ret =  Mock.mock(
        {
            // 調停人機能制限フラグ
            mediatorInfoLimit: 1,
            mediatorDisclosureFlag: 0,
            mediatorDisclosureDate: 20240420
        }
    )
    return {
        status: 200,
        data: ret
    }
})
