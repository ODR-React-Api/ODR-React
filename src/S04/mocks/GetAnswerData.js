// 导入mockjs
import Mock from 'mockjs'

// API_回答の内容取得
export default Mock.mock('/GetAnswerData', 'get', options => {  
    const ret = Mock.mock(
        [
            {
                caseId: '12345678',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 2,
                replyType: 'その他',
                replyContext: '回答の内容x',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-20T10:00:00',
                // relationType= 1
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                // relationType= 2
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ]
            },
            {
                caseId: '1234',
                draftFlg: 0,
                getDataFlg: false, // 回答・反訴の内容の取得Flg
                status: null,
                replyType: null,
                replyContext: null,
                haveCounterClaim: false,
                counterClaimContext: null,
                lastModifiedDate: null,
                file: null,
                counterFile: null
            },
            {
                caseId: '12345',
                draftFlg: 0,
                getDataFlg: false, // 回答・反訴の内容の取得Flg
                status: null,
                replyType: null,
                replyContext: null,
                haveCounterClaim: false,
                counterClaimContext: null,
                lastModifiedDate: null,
                file: null,
                counterFile: null
            },
            {
                caseId: '123',
                draftFlg: 0,
                getDataFlg: false, // 回答・反訴の内容の取得Flg
                status: null,
                replyType: null,
                replyContext: null,
                haveCounterClaim: false,
                counterClaimContext: null,
                lastModifiedDate: null,
                file: null,
                counterFile: null
            },
            {
                caseId: '1233',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容1233',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-18T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ]
            },
            {
                caseId: '12330',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 4,
                replyType: 'その他',
                replyContext: '回答の内容12330',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-18T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ]
            },
            {
                caseId: '31231',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容31231',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-18T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ]
            },
            {
                caseId: '31232',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容31231',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-18T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ]
            },
            

            {
                caseId: '40000001',
                draftFlg: 0,
                getDataFlg: false, // 回答・反訴の内容の取得Flg
                status: null,
                replyType: null,
                replyContext: null,
                haveCounterClaim: false,
                counterClaimContext: null,
                lastModifiedDate: null,
                file: null,
                counterFile: null
            },
            {
                caseId: '40000002',
                draftFlg: 1,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-21T11:00:00',
                file: null,
                counterFile: null 
            },
            {
                caseId: '40000003',
                draftFlg: 0,
                getDataFlg: false, // 回答・反訴の内容の取得Flg
                status: null,
                replyType: null,
                replyContext: null,
                haveCounterClaim: false,
                counterClaimContext: null,
                lastModifiedDate: null,
                file: null,
                counterFile: null
            },
            {
                caseId: '40000004',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-21T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ]
            },
            {
                caseId: '40000005',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 4,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: false,
                counterClaimContext: null,
                lastModifiedDate: '2024-03-20T15:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: null
            },
            {
                caseId: '40000006',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 4,
                replyType: 'その他',
                replyContext: '回答の内容xxx',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-20T15:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ]
            },
            {
                caseId: '40000007',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-20T17:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ]
            },
            {
                caseId: '40000008',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-20T17:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ]
            },
            {
                caseId: '40000009',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-21T15:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '40000010',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-21T15:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '43000000',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '43000001',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '43000002',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '43000003',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '43000004',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '43000005',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '43000007',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '43000008',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '43000009',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '43000010',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '43000011',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '43000012',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '43000013',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '43000014',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '43000015',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '43000099',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '43000999',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '47000000',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '47000001',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '47000002',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '47000003',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '47000004',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '47000005',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '47000006',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            },
            {
                caseId: '47000099',
                draftFlg: 0,
                getDataFlg: true, // 回答・反訴の内容の取得Flg
                status: 5,
                replyType: 'その他',
                replyContext: '回答の内容',
                haveCounterClaim: true,
                counterClaimContext: '反訴への回答内容',
                lastModifiedDate: '2024-03-23T11:00:00',
                file: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    }
                ],
                counterFile: [
                    {
                        fileName: 'sample.png',
                        fileUrl: '../assets/images/sample.png'
                    },
                    {
                        fileName: 'sample2.png',
                        fileUrl: '../assets/images/sample2.png'
                    }
                ],
            }
        ]
    )
    return {
        status: 200,
        data: ret
    }
});