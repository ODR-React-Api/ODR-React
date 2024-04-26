import * as React from 'react';
import Top from "./Top";
import Main from "./Main";
import Dialog from "./Dialog"
import PageHeader from "../../common/utils/pageHeader"
import { UserContext } from '../../common/userContext';
import "../assets/style/s03.scss"
import "../mocks/mockJs"

type detailedSearchType = {
  cid: string;
  caseTitle: string;
  caseStatus: string;
  position: string[];
  petitionDateEnd: string;
  petitionDateStart: string;
  correspondingDate: string;
  messageFlag: string;
  Correspondence: string;
  isClick: boolean
}

const MosList = () => {

  const loginUser = React.useContext(UserContext)
  const Email = loginUser.Email
  const position = loginUser.UserType

  const [open, setOpen] = React.useState(false);
  const [searcdData, setSearcdData] = React.useState<detailedSearchType>({
    cid: "",
    caseTitle: "",
    caseStatus: "",
    position: [],
    petitionDateEnd: "",
    petitionDateStart: "",
    correspondingDate: "",
    messageFlag: "0",
    Correspondence: "0",
    isClick: false
  })
  const [fuzzySearchData, setFuzzySearchData] = React.useState("")
  const [saveFlag, setSaveFlag] = React.useState("0")

  // 下書き保存データ有無
  const getSaveFlag = (saveFlag: string) => {
    setSaveFlag(saveFlag)
  }

  // 曖昧検索
  const fuzzySearch = (Data: string) => {
    setFuzzySearchData(Data)
  }

  //  詳細検索ダイアログを開く
  const handleClickOpen = () => {
    setOpen(true);
  };

  // 詳細検索ダイアログを閉じる
  const handleClose = () => {
    setOpen(false);
    setSearcdData({
      ...searcdData,
      isClick: false
    })
  };

  const handleAllClose = () => {
    setOpen(false);
    const newData = {
      cid: "",
      caseTitle: "",
      caseStatus: "",
      position: [],
      petitionDateEnd: "",
      petitionDateStart: "",
      correspondingDate: "",
      messageFlag: "0",
      Correspondence: "0",
      isClick: true
    }
    setSearcdData(newData)
    setFuzzySearchData("")
  };

  // 詳細検索
  function detailedSearch(searcdData: detailedSearchType) {
    setFuzzySearchData("")
    setSearcdData({
      ...searcdData,
      isClick: true
    })
  }
  return (
    <div className="s03" id="s03">
      <div style={{background:"#C8E6C9",height: "31px"}}><PageHeader pageFlg='1'/></div>
      <Top handleClickOpen={handleClickOpen} fuzzySearch={fuzzySearch} saveFlag={saveFlag} userPosition={position} setSearcdData={setSearcdData}/>
      <Main searcdData={searcdData} handleClose={handleClose} fuzzySearchData={fuzzySearchData} Email={Email} setSaveFlag={getSaveFlag} />
      <Dialog open={open} handleClose={handleClose} detailedSearch={detailedSearch} searchData={searcdData} handleAllClose={handleAllClose}/>
    </div>
  )
}

export default MosList