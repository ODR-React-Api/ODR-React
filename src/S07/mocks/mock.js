import Mock from 'mockjs'

export default Mock.mock ('/GetFileInfo','get',options => {
    const file = Mock.mock (
        {
            fileInfo:[
                {
                    id: 1,
                    FileName:'img1.png',
                    FileUrl:'../assets/images/img2.png',
                    RegisterUserId: '申立人',
                    RegisterDate: '2024/03/12 10:20',
                    CaseStage: 3
                },
                {
                    id: 2,
                    FileName:'img2.png',
                    FileUrl:'../assets/images/img2.png',
                    RegisterUserId: '相手方',
                    RegisterDate: '2024/03/12 11:40',
                    CaseStage: 3
                },
                {
                    id: 3,
                    FileName:'img3.png',
                    FileUrl:'../assets/images/img3.png',
                    RegisterUserId: '調停人1',
                    RegisterDate: '2024/03/13 05:06',
                    CaseStage: 3
                },
                {
                    id: 4,
                    FileName:'test.xls',
                    FileUrl:'../assets/file/test.xls',
                    RegisterUserId: '調停人2',
                    RegisterDate: '2024/03/14 14:22',
                    CaseStage: 3
                }
            ]
        }
    )
    return {
        status: 200,
        data: file
    }
})

export const LoginUser = Mock.mock ('/GetLoginUser','get',options => {
    const LoginUser = Mock.mock (
        {
            MediatorUserFlag: 0
        }
    )
    return {
        status: 200,
        data: LoginUser
    }
})

    
