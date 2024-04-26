import Mock from 'mockjs';

Mock.setup({
    timeout:1000,
})

// 定义模拟数据规则
Mock.mock('/formData', {
    'selectedOptions': [ '商品交換', '全額返金', 'その他'],
    'textareaValue': 'テストメッセージ', // 生成随机的文本内容作为 textarea 的值
    'PayAmount|300-400': 300, // 生成 100 到 1000 之间的随机数作为 PayAmount
    'CounterClaimPayment|200-300': 200, // 生成 100 到 1000 之间的随机数作为 CounterClaimPayment
    'PaymentEndDate': '2024/06/30', // 生成日期字符串作为 PaymentEndDate
    'ShipmentPayType|1': ['申立人が支払う', '相手方が支払う', '返送なし'], // 从数组中随机选择一个值作为 ShipmentPayType
    'SpecialItem': 'テストメッセージ', // 生成随机的文本内容作为 SpecialItem
    'FileUrl': '@url' // 生成随机的 URL 字符串作为 FileUrl
  });
