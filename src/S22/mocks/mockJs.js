import Mock from 'mockjs'


Mock.mock('/GetSyuruiS22', 'get', (Option) => {
    const ret = Mock.mock(
        {
            count: 5,
            list: [
                {
                    //表示内容
                    DisplayName: 'テスト削除します。',
                    Value: '1',
                    OrderNo: 1,

                },
                {
                    //表示内容
                    DisplayName: '商品交換',
                    Value: '2',
                    OrderNo: 2,

                },
                {
                    //表示内容
                    DisplayName: '全額返金',
                    Value: '3',
                    OrderNo: 3,

                },
                {
                    //表示内容
                    DisplayName: '一部返金',
                    Value: '4',
                    OrderNo: 4,

                },
                {
                    //表示内容
                    DisplayName: '代行品発送',
                    Value: '5',
                    OrderNo: 5,

                },
                {
                    DisplayName: 'その他',
                    Value: '99',
                    OrderNo: 99,
                }]
        }
    )
    return {
        status: 200,
        data: ret
    }
})


Mock.mock('/GetSyuryoS22', 'get', (Option) => {
    const ret = Mock.mock(
        {
            list: [
                {
                    //表示内容
                    DisplayName: '申立人が支払う',
                    OrderNo: 1,

                },
                {
                    //表示内容
                    DisplayName: '相手方が支払う',
                    OrderNo: 2,

                },
                {
                    //表示内容
                    DisplayName: '返送なし',
                    OrderNo: 3,

                }
            ]
        }
    )
    return {
        status: 200,
        data: ret
    }
})

Mock.mock('/GetStatusS22', 'get', (Option) => {
    const ret = Mock.mock(
        {
            ExpectResloveTypeValue: '1,2,99',
            Status: '0',//(Math.floor(Math.random()*3)).toString(),
            OtherContext: 'テスト',
            PayAmount: '100',
            CounterClaimPayment: '200',
            PaymentEndDate: '20240103',
            ShipmentPayType: '2',
            //AgreementDate: '20240315',
            SpecialItem: '案件',
            UserId: 'wang',
            FileName: 'swift',
            FileUrl: 'C:',
        }
    )
    return {
        status: 200,
        data: ret
    }
})