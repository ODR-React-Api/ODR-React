// 导入mockjs
import Mock from 'mockjs'

// API_反訴への回答取得
export default Mock.mock('/GetClaimRepliesDataS04', 'get', options => {  
    const ret = Mock.mock(
        [
            {
                caseId: '12345678',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-20T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },

            {
                caseId: '40000004',
                claimrepliesDraftFlg: 1,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-20T20:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '40000005',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-20T20:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '40000006',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-20T20:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '40000008',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-20T20:00:00',
                file: null
            },
            {
                caseId: '40000010',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-20T20:00:00',
                file: null
            },
            {
                caseId: '43000000',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '43000001',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '43000002',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '43000003',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '43000004',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '43000005',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '43000007',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '43000008',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '43000009',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '43000010',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '43000011',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '43000012',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '43000013',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '43000014',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '43000015',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '43000099',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '43000999',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '47000000',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '47000001',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '47000002',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '47000003',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '47000004',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '47000005',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '47000006',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            },
            {
                caseId: '47000099',
                claimrepliesDraftFlg: 0,
                getDataFlg: true, // 反訴への回答取得Flg
                status: 2,
                replyContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-25T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                ]
            }
        ]
    )
    return {
        status: 200,
        data: ret
    }
})