import Mock from 'mockjs';

Mock.setup({
    timeout:1000,
})

// 定义模拟数据规则
Mock.mock('/getNegotiatConInfo', {
    'reconciliateDate': '2024-3-27',
    'selectedOptions': '全額返金',
    'textareaValue': '@cparagraph', // 生成随机的文本内容作为 textarea 的值
    'PayAmount|500-1000': 500, // 生成 500 到 1000 之间的随机数作为 PayAmount
    'CounterClaimPayment|200-500': 200, // 生成 200 到 500 之间的随机数作为 CounterClaimPayment
    'PaymentEndDate': '2024-6-30', // 生成日期字符串作为 PaymentEndDate
    'ShipmentPayType|1': ['申立人が支払う', '相手方が支払う', '返送なし'], // 从数组中随机选择一个值作为 ShipmentPayType
    'SpecialItem': '@csentence', // 生成随机的文本内容作为 SpecialItem
    'FileName': 'blabla.pdf',
    'company1': '株式会社xxx',
    'company2': '株式会社yyy',
    'name1': '申立人テスト',
    'name2': '相手方テスト',
    'caseId': '0000002200',
    'caseName': '画面更新用1'
  });
