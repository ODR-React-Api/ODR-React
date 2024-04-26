// 导入mockjs
import Mock from 'mockjs'

// セッション取得
export default Mock.mock('/GetSessionData', 'get', options => {  
    const ret = Mock.mock(
        {
            platformId: '12345678',
            userId: '123',
            response: {
                responseUser:'相手方',
                userName: '蓝 晶晶'
            },
            mediator: {
                mediatorUser:'調定人',
                userName: '柒 悠悠'
            },
            claim: {
                claimUser:'申立人',
                userName: '柳 美亚'
            }
        }
    )
    return {
        status: 200,
        data: ret
    }
})