// 导入mockjs
import Mock from 'mockjs'

// API_申立ての内容取得
export default Mock.mock('/GetProposalData', 'get', options => {  
    const ret = Mock.mock(
        [
            {
                caseId: '12345678',
                productName: '商品名申立用',
                productId: '0000000002231',
                traderName: '販売者a',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年4月15日',
                price: '$1,000',
                petitionTypeValue: 'その他',
                petitionContext: '申立て内容test',
                expectResloveTypeValue: '希望する解決方法aaa',
                other: 'その他',
                lastModifiedDate: '2024-03-20T09:00:00',
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
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    },
                    {
                        itemDisplayName: '文字列任意3：',
                        extensionitemValue: 'aaa'
                    },
                    {
                        itemDisplayName: '文字列必須4：',
                        extensionitemValue: 'abc'
                    }
                ]
            },
            {
                caseId: '1234',
                productName: '商品名申立用',
                productId: '0000000002231',
                traderName: '販売者a',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年4月15日',
                price: '$1,000',
                petitionTypeValue: 'その他',
                petitionContext: '申立て内容test',
                expectResloveTypeValue: '希望する解決方法aaa',
                other: 'その他',
                lastModifiedDate: '2024-03-20T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    },
                    {
                        itemDisplayName: '文字列任意3：',
                        extensionitemValue: 'aaa'
                    },
                    {
                        itemDisplayName: '文字列必須4：',
                        extensionitemValue: 'abc'
                    }
                ]
            },
            {
                caseId: '12345',
                productName: '商品名申立用',
                productId: '0000000002231',
                traderName: '販売者a',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年4月15日',
                price: '$1,000',
                petitionTypeValue: 'その他',
                petitionContext: '申立て内容test',
                expectResloveTypeValue: '希望する解決方法aaa',
                other: 'その他',
                lastModifiedDate: '2024-03-14T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    },
                    {
                        itemDisplayName: '文字列任意3：',
                        extensionitemValue: 'aaa'
                    },
                    {
                        itemDisplayName: '文字列必須4：',
                        extensionitemValue: 'abc'
                    }
                ]
            },
            {
                caseId: '123',
                productName: '商品名申立用',
                productId: '0000000002231',
                traderName: '販売者a',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年4月15日',
                price: '$1,000',
                petitionTypeValue: 'その他',
                petitionContext: '申立て内容test',
                expectResloveTypeValue: '希望する解決方法aaa',
                other: 'その他',
                lastModifiedDate: '2024-03-14T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    },
                    {
                        itemDisplayName: '文字列任意3：',
                        extensionitemValue: 'aaa'
                    },
                    {
                        itemDisplayName: '文字列必須4：',
                        extensionitemValue: 'abc'
                    }
                ]
            },
            {
                caseId: '1233',
                productName: '商品名申立用',
                productId: '0000000002231',
                traderName: '販売者a',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年4月15日',
                price: '$1,000',
                petitionTypeValue: 'その他',
                petitionContext: '申立て内容test',
                expectResloveTypeValue: '希望する解決方法aaa',
                other: 'その他',
                lastModifiedDate: '2024-03-14T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    },
                    {
                        itemDisplayName: '文字列任意3：',
                        extensionitemValue: 'aaa'
                    },
                    {
                        itemDisplayName: '文字列必須4：',
                        extensionitemValue: 'abc'
                    }
                ]
            },
            {
                caseId: '12330',
                productName: '商品名申立用',
                productId: '0000000002231',
                traderName: '販売者a',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年4月15日',
                price: '$1,000',
                petitionTypeValue: 'その他',
                petitionContext: '申立て内容test',
                expectResloveTypeValue: '希望する解決方法aaa',
                other: 'その他',
                lastModifiedDate: '2024-03-14T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    },
                    {
                        itemDisplayName: '文字列任意3：',
                        extensionitemValue: 'aaa'
                    },
                    {
                        itemDisplayName: '文字列必須4：',
                        extensionitemValue: 'abc'
                    }
                ]
            },
            {
                caseId: '31231',
                productName: '商品名調停人用',
                productId: '3000000001231',
                traderName: '販売者aaa',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年4月15日',
                price: '$1,000',
                petitionTypeValue: 'その他',
                petitionContext: '申立て内容test',
                expectResloveTypeValue: '希望する解決方法aaa',
                other: 'その他',
                lastModifiedDate: '2024-03-18T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    },
                    {
                        itemDisplayName: '文字列任意3：',
                        extensionitemValue: 'aaa'
                    },
                    {
                        itemDisplayName: '文字列必須4：',
                        extensionitemValue: 'abc'
                    }
                ]
            },
            {
                caseId: '31232',
                productName: '商品名調停人用',
                productId: '3000000001232',
                traderName: '販売者abc',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年4月15日',
                price: '$1,000',
                petitionTypeValue: 'その他',
                petitionContext: '申立て内容test',
                expectResloveTypeValue: '希望する解決方法aaa',
                other: 'その他',
                lastModifiedDate: '2024-03-18T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    },
                    {
                        itemDisplayName: '文字列任意3：',
                        extensionitemValue: 'aaa'
                    },
                    {
                        itemDisplayName: '文字列必須4：',
                        extensionitemValue: 'abc'
                    }
                ]
            },


            {
                caseId: '40000001',
                productName: '商品名画面設計用1',
                productId: '4000000000101',
                traderName: '販売者a',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年4月10日',
                price: '$1,000',
                petitionTypeValue: 'その他',
                petitionContext: '申立て内容test',
                expectResloveTypeValue: '希望する解決方法aaa',
                other: 'その他',
                lastModifiedDate: '2024-03-20T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    },
                    {
                        itemDisplayName: '文字列任意3：',
                        extensionitemValue: 'aaa'
                    },
                    {
                        itemDisplayName: '文字列必須4：',
                        extensionitemValue: 'abc'
                    }
                ]
            },
            {
                caseId: '40000002',
                productName: '商品名画面設計用2',
                productId: '4000000000102',
                traderName: '販売者test',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年4月12日',
                price: '$1,000',
                petitionTypeValue: 'その他',
                petitionContext: '申立て内容test',
                expectResloveTypeValue: '希望する解決方法aaa',
                other: 'その他',
                lastModifiedDate: '2024-03-14T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    },
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '文字列任意3：',
                        extensionitemValue: 'aaa'
                    }
                ]
            },
            {
                caseId: '40000003',
                productName: '商品名画面設計用3',
                productId: '4000000000103',
                traderName: '販売者a',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年4月15日',
                price: '$1,000',
                petitionTypeValue: 'その他',
                petitionContext: '申立て内容test',
                expectResloveTypeValue: '希望する解決方法aaa',
                other: 'その他',
                lastModifiedDate: '2024-03-20T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    },
                    {
                        itemDisplayName: '文字列任意3：',
                        extensionitemValue: 'aaa'
                    },
                    {
                        itemDisplayName: '文字列必須4：',
                        extensionitemValue: 'abc'
                    }
                ]
            },
            {
                caseId: '40000004',
                productName: '商品名画面設計用4',
                productId: '4000000000104',
                traderName: '販売者test',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年4月15日',
                price: '$20',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容test',
                expectResloveTypeValue: '希望する解決方法aaa',
                other: 'その他',
                lastModifiedDate: '2024-03-20T18:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    }
                ]
            },
            {
                caseId: '40000005',
                productName: '商品名画面設計用5',
                productId: '4000000000105',
                traderName: '販売者aaa',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年4月15日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容test',
                expectResloveTypeValue: '希望する解決方法aaa',
                other: 'その他',
                lastModifiedDate: '2024-03-20T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    },
                    {
                        itemDisplayName: '文字列任意3：',
                        extensionitemValue: 'aaa'
                    },
                    {
                        itemDisplayName: '文字列必須4：',
                        extensionitemValue: 'abc'
                    }
                ]
            },
            {
                caseId: '40000006',
                productName: '商品名画面設計用6',
                productId: '4000000000106',
                traderName: '販売者xxx',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年4月15日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容test',
                expectResloveTypeValue: '希望する解決方法aaa',
                other: 'その他',
                lastModifiedDate: '2024-03-20T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    },
                    {
                        itemDisplayName: '文字列任意3：',
                        extensionitemValue: 'aaa'
                    },
                    {
                        itemDisplayName: '文字列必須4：',
                        extensionitemValue: 'abc'
                    }
                ]
            },
            {
                caseId: '40000007',
                productName: '商品名画面設計用7',
                productId: '4000000000107',
                traderName: '販売者777',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月15日',
                price: '$500',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容test',
                expectResloveTypeValue: '希望する解決方法aaa',
                other: 'その他',
                lastModifiedDate: '2024-03-20T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '40000008',
                productName: '商品名画面設計用8',
                productId: '4000000000108',
                traderName: '販売者888',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月15日',
                price: '$500',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容test',
                expectResloveTypeValue: '希望する解決方法aaa',
                other: 'その他',
                lastModifiedDate: '2024-03-20T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '40000009',
                productName: '商品名画面設計用9',
                productId: '4000000000109',
                traderName: '販売者009',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容test',
                expectResloveTypeValue: '希望する解決方法asd',
                other: 'その他',
                lastModifiedDate: '2024-03-21T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '40000010',
                productName: '商品名画面設計用10',
                productId: '4000000000109',
                traderName: '販売者010',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月20日',
                price: '$1,500',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容test',
                expectResloveTypeValue: '希望する解決方法aaa',
                other: 'その他',
                lastModifiedDate: '2024-03-21T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '43000000',
                productName: '商品名交渉test0',
                productId: '4300000000300',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '43000001',
                productName: '商品名交渉test1',
                productId: '4300000000301',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '43000002',
                productName: '商品名交渉test2',
                productId: '4300000000302',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '43000003',
                productName: '商品名交渉test3',
                productId: '4300000000303',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '43000004',
                productName: '商品名交渉test4',
                productId: '4300000000304',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '43000005',
                productName: '商品名交渉test5',
                productId: '4300000000305',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '43000007',
                productName: '商品名交渉test7',
                productId: '4300000000307',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '43000008',
                productName: '商品名交渉test8',
                productId: '4300000000308',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '43000009',
                productName: '商品名交渉test9',
                productId: '4300000000309',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '43000010',
                productName: '商品名交渉test10',
                productId: '4300000000310',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '43000011',
                productName: '商品名交渉tes11',
                productId: '4300000000311',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '43000012',
                productName: '商品名交渉test12',
                productId: '4300000000312',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '43000013',
                productName: '商品名交渉test13',
                productId: '4300000000313',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '43000014',
                productName: '商品名交渉test14',
                productId: '4300000000314',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '43000015',
                productName: '商品名交渉test15',
                productId: '4300000000315',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '43000099',
                productName: '商品名交渉test99',
                productId: '4300000000399',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '43000999',
                productName: '商品名交渉test999',
                productId: '4300000003999',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '47000000',
                productName: '商品名調停test0',
                productId: '4700000000700',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '47000001',
                productName: '商品名調停test1',
                productId: '4700000000701',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '47000002',
                productName: '商品名調停test2',
                productId: '4700000000702',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '47000003',
                productName: '商品名調停test3',
                productId: '4700000000703',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '47000004',
                productName: '商品名調停test4',
                productId: '4700000000704',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '47000005',
                productName: '商品名調停test5',
                productId: '4700000000705',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '47000006',
                productName: '商品名調停test6',
                productId: '4700000000706',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
                    }
                ]
            },
            {
                caseId: '47000099',
                productName: '商品名調停test99',
                productId: '4700000000799',
                traderName: '販売者',
                traderMail: 'test001@gmail.com',
                traderUrl: 'URL',
                boughtDate: '2024年5月30日',
                price: '$1,000',
                petitionTypeValue: '返金',
                petitionContext: '申立て内容',
                expectResloveTypeValue: '希望する解決方法',
                other: 'その他',
                lastModifiedDate: '2024-03-22T10:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png',
                    }
                ],
                // 取得内容（最大5件、取得件数0の場合、非表示）：
                extensionitems:[
                    {
                        itemDisplayName: '数値任意1：',
                        extensionitemValue: '111'
                    },
                    {
                        itemDisplayName: '数値必須2：',
                        extensionitemValue: '123'
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