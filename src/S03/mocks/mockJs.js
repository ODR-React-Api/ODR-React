import Mock from "mockjs"

const testDataAll = [
  {
    cid: "40000001",
    caseTitle: "画面_相手方参加表明",
    caseStatus: "0",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "40000002",
    caseTitle: "画面_相手方回答する",
    caseStatus: "0",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "1",
    Correspondence: "1"
  },
  {
    cid: "40000003",
    caseTitle: "画面_取り下げ",
    caseStatus: "1",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "99999999",
    messageFlag: "0",
    Correspondence: "0"
  },
  {
    cid: "40000004",
    caseTitle: "S14_反訴回答登録画",
    caseStatus: "2",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "40000005",
    caseTitle: "画面_手続き中止",
    caseStatus: "4",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "99999999",
    messageFlag: "0",
    Correspondence: "0"
  },
  {
    cid: "40000006",
    caseTitle: "画面_和解成立",
    caseStatus: "5",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "40000007",
    caseTitle: "画面_調停人指名待ち",
    caseStatus: "6",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "1",
    Correspondence: "1"
  },
  {
    cid: "40000008",
    caseTitle: "画面_調停人を確認/指名を受理",
    caseStatus: "6",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "40000009",
    caseTitle: "画面_調停和解成立",
    caseStatus: "11",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "1",
    Correspondence: "1"
  },
  {
    cid: "40000010",
    caseTitle: "画面_和解不成立",
    caseStatus: "12",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "99999999",
    messageFlag: "0",
    Correspondence: "0"
  },
  {
    cid: "43000000",
    caseTitle: "S26_期日延長画面・S28_調停移行画面",
    caseStatus: "3",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000001",
    caseTitle: "S27_期日延長承認画面",
    caseStatus: "3",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000002",
    caseTitle: "画面_和解案を確認/期日延長承認",
    caseStatus: "3",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000003",
    caseTitle: "画面_和解合意書を確認",
    caseStatus: "3",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000004",
    caseTitle: "画面_和解合意書を確認",
    caseStatus: "3",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000005",
    caseTitle: "画面_和解合意書を確認",
    caseStatus: "3",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000007",
    caseTitle: "画面_申立人和解案を作成",
    caseStatus: "3",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000008",
    caseTitle: "画面_申立人和解案を作成",
    caseStatus: "3",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000009",
    caseTitle: "画面_相手方和解案を確認",
    caseStatus: "3",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000010",
    caseTitle: "画面_相手方和解案を作成",
    caseStatus: "3",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000011",
    caseTitle: "画面_相手方和解案を作成",
    caseStatus: "3",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000012",
    caseTitle: "画面_申立人和解合意書を確認",
    caseStatus: "3",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000013",
    caseTitle: "画面_申立人和解案を作成",
    caseStatus: "3",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000014",
    caseTitle: "画面_和解案を作成/和解案を編集",
    caseStatus: "3",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000015",
    caseTitle: "画面_相手方和解案を確認",
    caseStatus: "3",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000099",
    caseTitle: "画面_和解案を作成",
    caseStatus: "3",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000999",
    caseTitle: "画面_案件のステータスが存在しません",
    caseStatus: "3",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000000",
    caseTitle: "画面_調停人を確認/調停案を作成・期日延長",
    caseStatus: "7",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000001",
    caseTitle: "S25_調定案合意画面",
    caseStatus: "7",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000002",
    caseTitle: "画面_調停案を確認",
    caseStatus: "7",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000003",
    caseTitle: "画面_調停案を確認",
    caseStatus: "7",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000004",
    caseTitle: "個別依頼/和解合意書を確認/調停案を確認",
    caseStatus: "7",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000005",
    caseTitle: "画面_和解合意書を確認/調停案を確認",
    caseStatus: "7",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000006",
    caseTitle: "画面_和解合意書を確認/調停案を確認",
    caseStatus: "7",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000099",
    caseTitle: "画面_調停人を確認/調停案を作成",
    caseStatus: "7",
    position: "1",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  }, {
    cid: "40000001",
    caseTitle: "画面_相手方参加表明",
    caseStatus: "0",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "40000002",
    caseTitle: "S11_回答登録画面",
    caseStatus: "0",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "1",
    Correspondence: "1"
  },
  {
    cid: "40000003",
    caseTitle: "画面_取り下げ",
    caseStatus: "1",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "99999999",
    messageFlag: "0",
    Correspondence: "0"
  },
  {
    cid: "40000004",
    caseTitle: "S32_反訴取り下げ画面",
    caseStatus: "2",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "40000005",
    caseTitle: "画面_手続き中止",
    caseStatus: "4",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "99999999",
    messageFlag: "0",
    Correspondence: "0"
  },
  {
    cid: "40000006",
    caseTitle: "画面_和解成立",
    caseStatus: "5",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "40000007",
    caseTitle: "画面_調停人指名待ち",
    caseStatus: "6",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "1",
    Correspondence: "1"
  },
  {
    cid: "40000008",
    caseTitle: "S21_調定人確認画面・S30_手続き中止画面",
    caseStatus: "6",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "40000009",
    caseTitle: "画面_調停和解成立",
    caseStatus: "11",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "1",
    Correspondence: "1"
  },
  {
    cid: "40000010",
    caseTitle: "画面_和解不成立",
    caseStatus: "12",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "99999999",
    messageFlag: "0",
    Correspondence: "0"
  },
  {
    cid: "43000000",
    caseTitle: "S17_和解案作成画面・S26_期日延長画面",
    caseStatus: "3",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000001",
    caseTitle: "画面_期日延長承認/和解案を作成",
    caseStatus: "3",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000002",
    caseTitle: "S27_期日延長承認画面",
    caseStatus: "3",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000003",
    caseTitle: "S20_和解合意書を確認",
    caseStatus: "3",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000004",
    caseTitle: "画面_和解合意書を確認",
    caseStatus: "3",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000005",
    caseTitle: "画面_和解合意書を確認",
    caseStatus: "3",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000007",
    caseTitle: "画面_申立人和解案を作成",
    caseStatus: "3",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000008",
    caseTitle: "画面_申立人和解案を作成",
    caseStatus: "3",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000009",
    caseTitle: "S20_和解案を確認",
    caseStatus: "3",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000010",
    caseTitle: "画面_相手方和解案を作成",
    caseStatus: "3",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000011",
    caseTitle: "画面_相手方和解案を作成",
    caseStatus: "3",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000012",
    caseTitle: "画面_申立人和解合意書を確認",
    caseStatus: "3",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000013",
    caseTitle: "画面_申立人和解案を作成",
    caseStatus: "3",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000014",
    caseTitle: "画面_和解案を作成/和解案を編集",
    caseStatus: "3",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000015",
    caseTitle: "画面_相手方和解案を確認",
    caseStatus: "3",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "43000099",
    caseTitle: "画面_和解案を作成",
    caseStatus: "3",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000000",
    caseTitle: "画面_調停人を確認/調停案を作成・期日延長",
    caseStatus: "7",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000001",
    caseTitle: "画面_調停案を確認/個別依頼/調停案を編集",
    caseStatus: "7",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000002",
    caseTitle: "画面_調停案を確認",
    caseStatus: "7",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000003",
    caseTitle: "画面_調停案を確認",
    caseStatus: "7",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000004",
    caseTitle: "個別依頼/和解合意書を確認/調停案を確認",
    caseStatus: "7",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000005",
    caseTitle: "画面_和解合意書を確認/調停案を確認",
    caseStatus: "7",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000006",
    caseTitle: "画面_和解合意書を確認/調停案を確認",
    caseStatus: "7",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000099",
    caseTitle: "画面_調停人を確認/調停案を作成",
    caseStatus: "7",
    position: "2",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "40000005",
    caseTitle: "画面_手続き中止",
    caseStatus: "4",
    position: "3",
    petitionDate: "20240320",
    correspondingDate: "99999999",
    messageFlag: "0",
    Correspondence: "0"
  },
  {
    cid: "40000008",
    caseTitle: "S33_指名受理画面",
    caseStatus: "6",
    position: "3",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "40000009",
    caseTitle: "画面_調停和解成立",
    caseStatus: "11",
    position: "3",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "1",
    Correspondence: "1"
  },
  {
    cid: "40000010",
    caseTitle: "画面_和解不成立",
    caseStatus: "12",
    position: "3",
    petitionDate: "20240320",
    correspondingDate: "99999999",
    messageFlag: "0",
    Correspondence: "0"
  },
  {
    cid: "47000000",
    caseTitle: "S22_調停案作成・S29_調停期日延長画面",
    caseStatus: "7",
    position: "3",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000001",
    caseTitle: "画面_調停案を確認/個別依頼/調停案を編集",
    caseStatus: "7",
    position: "3",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000002",
    caseTitle: "画面_調停案を確認",
    caseStatus: "7",
    position: "3",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000003",
    caseTitle: "画面_調停案を確認",
    caseStatus: "7",
    position: "3",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000004",
    caseTitle: "画面_個別依頼/和解合意書を確認/調停案を確認",
    caseStatus: "7",
    position: "3",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000005",
    caseTitle: "画面_和解合意書を確認/調停案を確認",
    caseStatus: "7",
    position: "3",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000006",
    caseTitle: "画面_和解合意書を確認/調停案を確認",
    caseStatus: "7",
    position: "3",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  },
  {
    cid: "47000099",
    caseTitle: "画面_調停人を確認/調停案を作成",
    caseStatus: "7",
    position: "3",
    petitionDate: "20240320",
    correspondingDate: "20240327",
    messageFlag: "2",
    Correspondence: "1"
  }
]

let testData = []

export const getData = Mock.mock('/getDate', 'post', req => {

  const userId = JSON.parse(req.body).userId
  const position = userId === "aaa@qq.com.cn" ?
    "1" : userId === "ccc@qq.com.cn" ?
      "2" : "3"

  testData = testDataAll.filter((item) => item.position === position)

  return {
    status: 200,
    data: {
      saveFlag: "0",
      tableData: testData
    }
  }
})

export const detailedSearch = Mock.mock('/detailedSearch', 'post', req => {
  const requestData = JSON.parse(req.body)
  console.log(JSON.parse(req.body))
  let repData = testData.filter((item) => {
    if ((requestData.cid !== "" ? (item.cid === requestData.cid) : true)
      && (requestData.caseTitle !== "" ? (item.caseTitle === requestData.caseTitle) : true)
      && (requestData.caseStatus !== "" ? (item.caseStatus === requestData.caseStatus) : true)
      && (requestData.position.length !== 0 ? (requestData.position.includes(item.position)) : true)
      && (requestData.petitionDateStart !== "" ? (item.petitionDate >= requestData.petitionDateStart) : true)
      && (requestData.petitionDateEnd !== "" ? (item.petitionDate <= requestData.petitionDateEnd) : true)
      && (requestData.messageFlag === "1" ? (item.messageFlag !== "0") : true)
      && (requestData.messageFlag === "2" ? (item.messageFlag === "0") : true)
      && (requestData.Correspondence === "1" ? (item.Correspondence === requestData.Correspondence) : true)
      && (requestData.Correspondence === "2" ? (item.Correspondence === "0") : true)
    ) {
      return item
    }
    else {
      return null
    }
  })

  return {
    status: 200,
    data: {
      saveFlag: "0",
      tableData: repData
    }
  }
})

// 搜索框检索
export const fuzzySearch = Mock.mock('/fuzzySearch', 'post', req => {
  const fuzzySearchData = req.body

  let repData = testData.filter((item) => {
    if (item.cid.indexOf(fuzzySearchData) !== -1) {
      return item
    }
    else {
      return null
    }
  })


  return {
    status: 200,
    data: {
      saveFlag: "0",
      tableData: repData
    }
  }

})