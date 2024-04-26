import Mock from 'mockjs'

export const formSubmitinsert = Mock.mock('/formSubmitinsert', 'post', options => {
  return options
})


export const fileUpload = Mock.mock('/fileUpload', 'post', options => {
  console.log('bbbb', options);
  return '7410852963'
})


export const userInfor = Mock.mock('/userInfor', 'get', req => {
  const userinformation =
  {
    uid: '11111',
    usercompany: '会社',
    userfirstname: '申立人',
    userlastname: 'テスト',
    userkanafirstname: 'カナダ',
    userkanalastname: 'テスト１１',
    useremail: '1111@qq.com'
  }
  const comments = [
    { id: 1, content: '不良品/商品の破損' },
    { id: 2, content: 'バリューテスト' },
    { id: 3, content: '細野テストイングリッシュa' },
    { id: 4, content: '不良品/商品の破損2' },
    { id: 5, content: '商品の不一致' },
    { id: 6, content: '配送について' },
    { id: 7, content: '請求について' },
    { id: 8, content: '保証について'},
    { id: 9, content: 'その他' },
  ]
  const solutions = [
    { id: 1, content: '返金' },
    { id: 2, content: 'テスト削除します。' },
    { id: 3, content: '返品' },
    { id: 4, content: 'その他' },
  ]
  const userprodut = {
    userproductId: '1',
    usetraderName: '1',
    useproductUrl: '1'
  }

  const useother = [
    { id: 1, ItemType: '0', IsRequired: '0' ,content:''},
    { id: 2, ItemType: '1', IsRequired: '0' ,content:''},
    { id: 3, ItemType: '0', IsRequired: '1' ,content:''},
    { id: 4, ItemType: '1', IsRequired: '0' ,content:''},
    { id: 5, ItemType: '0', IsRequired: '1' ,content:''},
    { id: 6, ItemType: '1', IsRequired: '0' ,content:''},
  ]

  return { userinformation: userinformation, comments: comments, solutions: solutions, userprodut: userprodut, useother: useother }
})


export const productInformation = Mock.mock('/productInformation', 'post', options => {
  console.log('return', options);
  const productId = options.body
  const position = productId === "00001" ? "1" : productId === "00002" ? "2" : "3"

  const userprodutinfor_1 = {
    commodity: 'ツヤ肌サプリメント',
    sellingelementname: '大野　花子',
    sellingelementemail: 'aaa.111@yahoo.co.jp'
  }

  const userprodutinfor_2 = {
    commodity: '美白肌ファンテーション',
    sellingelementname: '渡部　順',
    sellingelementemail: 'bbb.222@gmail.com'
  }

  const userprodutinfor_3 = {
    commodity: '',
    sellingelementname: '',
    sellingelementemail: ''
  }

  if (position === "1") {
    return userprodutinfor_1
  } else if (position === "2") {
    return userprodutinfor_2
  } else if (position === "3") {
    return userprodutinfor_3
  }
})