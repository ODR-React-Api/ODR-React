   import Mock from 'mockjs';
    
    Mock.mock("/getOdrUserInfo12",'get',() => (
      {
        // 申立て番号
        orderNo: '0000002325',
        // 購入商品
        userProduct: '画面設計更新用',
        // 商品ＩＤ
        userProductId: '000123',
        // 購入日
        yMD: '2024年02月29日',
        // 購入金額
        major: 1200,
        // 販売元
        useTraderName: '販売元名',
        // 販売元ＵＲＬ
        useProductUrl: 'URL',
        // 申立ての種類
        syurui:'不良品/商品の破損',
        // 申立て内容
        naiyou:'内容',
        // 添付資料
        sirou:"sample.png",
        // 希望する解決方法
        houho:'返金',
        // 申立人
        hoto:'確認用テストアカウント',
        // 申立代理人
        dairiHito:'ユーザー未登録',
        // 所属会社
        kaisya:'株式会社',
        // 氏名
        simei:'相手方　確認用',
        // 氏名(カナ)
        simeikana:'アイテガ　タカクニンヨウ',
        // メールアドレス
        mailAdress:'test98ab+002@gmail.com',
        // 代理人
        agent:'なし'
      })
    )