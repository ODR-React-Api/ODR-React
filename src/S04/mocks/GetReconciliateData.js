// 导入mockjs
import Mock from 'mockjs'

// API_和解内容取得
export default Mock.mock('/GetReconciliateData', 'get', options => {  
    const ret = Mock.mock(
        [
            {
                caseId: '12345678',
                status: 0,
                overview: '全額返金',
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
                    }
                ]
            },
            {
                caseId: '40000006',
                status: 3,
                overview: '全額返金',
                payAmount: '$1,000',
                counterClaimPayment: '$50',
                paymentEndDate: '2024年5月30日',
                shipmentPayType: 2,
                specialItem: '特記事項',
                lastModifiedDate: '2024-03-21T18:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ]
            },
            {
                caseId: '43000001',
                status: 3,
                overview: '全額返金',
                payAmount: '$1,000',
                counterClaimPayment: '$100',
                paymentEndDate: '2024年5月30日',
                shipmentPayType: 2,
                specialItem: '特記事項',
                lastModifiedDate: '2024-03-25T18:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ]
            },
            {
                caseId: '43000003',
                status: 3,
                overview: '全額返金',
                payAmount: '$1,000',
                counterClaimPayment: '$100',
                paymentEndDate: '2024年5月30日',
                shipmentPayType: 2,
                specialItem: '特記事項',
                lastModifiedDate: '2024-03-25T18:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ]
            },
            {
                caseId: '43000004',
                status: 3,
                overview: '全額返金',
                payAmount: '$1,000',
                counterClaimPayment: '$100',
                paymentEndDate: '2024年5月30日',
                shipmentPayType: 2,
                specialItem: '特記事項',
                lastModifiedDate: '2024-03-25T18:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ]
            },
            {
                caseId: '43000005',
                status: 3,
                overview: '全額返金',
                payAmount: '$1,000',
                counterClaimPayment: '$100',
                paymentEndDate: '2024年5月30日',
                shipmentPayType: 2,
                specialItem: '特記事項',
                lastModifiedDate: '2024-03-25T18:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ]
            },
            {
                caseId: '43000009',
                status: 3,
                overview: '全額返金',
                payAmount: '$1,000',
                counterClaimPayment: '$100',
                paymentEndDate: '2024年5月30日',
                shipmentPayType: 2,
                specialItem: '特記事項',
                lastModifiedDate: '2024-03-25T18:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ]
            },
            {
                caseId: '43000012',
                status: 3,
                overview: '全額返金',
                payAmount: '$1,000',
                counterClaimPayment: '$100',
                paymentEndDate: '2024年5月30日',
                shipmentPayType: 2,
                specialItem: '特記事項',
                lastModifiedDate: '2024-03-25T18:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ]
            },
            {
                caseId: '43000015',
                status: 3,
                overview: '全額返金',
                payAmount: '$1,000',
                counterClaimPayment: '$100',
                paymentEndDate: '2024年5月30日',
                shipmentPayType: 2,
                specialItem: '特記事項',
                lastModifiedDate: '2024-03-25T18:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ]
            }
        ]
    )
    return {
        status: 200,
        data: ret
    }
})