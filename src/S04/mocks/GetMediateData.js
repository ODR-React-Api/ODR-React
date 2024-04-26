// 导入mockjs
import Mock from 'mockjs'

// API_調停内容取得
export default Mock.mock('/GetMediateData', 'get', options => {  
    const ret = Mock.mock(
        [
            {
                caseId: '12345678',
                status: 0,
                expectResloveTypeValue: '全額返金',
                payAmount: '$1,000',
                counterClaimPayment: '$0',
                paymentEndDate: '2024年5月30日',
                shipmentPayType: 2, // 1: 申立人が支払う 2: 相手方が支払う 3: 返送なし
                specialItem: '特記事項',
                lastModifiedDate: '2024-03-20T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png',
                    },
                    {
                        fileName: 'sample3.png',
                        fileUrl: '../assets/images/sample3.png',
                    }
                ]
            },
            {
                caseId: '40000009',
                status: 4,
                expectResloveTypeValue: '全額返金',
                payAmount: '$1,000',
                counterClaimPayment: '$0',
                paymentEndDate: '2024年5月20日',
                shipmentPayType: 2, // 1: 申立人が支払う 2: 相手方が支払う 3: 返送なし
                specialItem: '特記事項',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png',
                    },
                ]
            },
            {
                caseId: '40000010',
                status: 4,
                expectResloveTypeValue: '全額返金',
                payAmount: '$1,500',
                counterClaimPayment: '$0',
                paymentEndDate: '2024年5月01日',
                shipmentPayType: 2, // 1: 申立人が支払う 2: 相手方が支払う 3: 返送なし
                specialItem: '特記事項',
                lastModifiedDate: '2024-03-22T14:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png',
                    },
                ]
            },
            {
                caseId: '47000001',
                status: 4,
                expectResloveTypeValue: '全額返金',
                payAmount: '$1,000',
                counterClaimPayment: '$100',
                paymentEndDate: '2024年5月20日',
                shipmentPayType: 2, // 1: 申立人が支払う 2: 相手方が支払う 3: 返送なし
                specialItem: '特記事項',
                lastModifiedDate: '2024-03-25T18:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png',
                    },
                ]
            },
            {
                caseId: '47000002',
                status: 4,
                expectResloveTypeValue: '全額返金',
                payAmount: '$1,000',
                counterClaimPayment: '$100',
                paymentEndDate: '2024年5月20日',
                shipmentPayType: 2, // 1: 申立人が支払う 2: 相手方が支払う 3: 返送なし
                specialItem: '特記事項',
                lastModifiedDate: '2024-03-25T18:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png',
                    },
                ]
            },
            {
                caseId: '47000003',
                status: 4,
                expectResloveTypeValue: '全額返金',
                payAmount: '$1,000',
                counterClaimPayment: '$100',
                paymentEndDate: '2024年5月20日',
                shipmentPayType: 2, // 1: 申立人が支払う 2: 相手方が支払う 3: 返送なし
                specialItem: '特記事項',
                lastModifiedDate: '2024-03-25T18:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png',
                    },
                ]
            },
            {
                caseId: '47000004',
                status: 4,
                expectResloveTypeValue: '全額返金',
                payAmount: '$1,000',
                counterClaimPayment: '$100',
                paymentEndDate: '2024年5月20日',
                shipmentPayType: 2, // 1: 申立人が支払う 2: 相手方が支払う 3: 返送なし
                specialItem: '特記事項',
                lastModifiedDate: '2024-03-25T18:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png',
                    },
                ]
            },
            {
                caseId: '47000005',
                status: 4,
                expectResloveTypeValue: '全額返金',
                payAmount: '$1,000',
                counterClaimPayment: '$100',
                paymentEndDate: '2024年5月20日',
                shipmentPayType: 2, // 1: 申立人が支払う 2: 相手方が支払う 3: 返送なし
                specialItem: '特記事項',
                lastModifiedDate: '2024-03-25T18:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png',
                    },
                ]
            },
            {
                caseId: '47000006',
                status: 4,
                expectResloveTypeValue: '全額返金',
                payAmount: '$1,000',
                counterClaimPayment: '$100',
                paymentEndDate: '2024年5月20日',
                shipmentPayType: 2, // 1: 申立人が支払う 2: 相手方が支払う 3: 返送なし
                specialItem: '特記事項',
                lastModifiedDate: '2024-03-25T18:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png',
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