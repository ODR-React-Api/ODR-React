import React from "react";
import Badge from '@mui/material/Badge';
import CreateIcon from '@mui/icons-material/Create';

import '../assets/style/top.scss'
import SearchImg from '../assets/images/search.jpeg'
import { useNavigate } from "react-router-dom";

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

type topPropsType = {
  handleClickOpen: () => void,
  fuzzySearch: (fuzzySearchData: string) => void,
  saveFlag: string,
  userPosition: string,
  setSearcdData:(searcdData:detailedSearchType) => void
}

type propType = {
  clazz: string,
  searchText: string
};

interface SearchBoxTopHide {
  props: propType
}

// Tooltipサブアセンブリ 
class SearchBoxTopHide extends React.Component {
  render() {
    return (
      <div className={"search-box-top-hide-box " + this.props.clazz}>
        <span>{this.props.searchText}</span>
      </div>
    )
  }
}

type SearchBoxPropsType = {
  handleClickOpen: () => void,
  fuzzySearch: (fuzzySearchData: string) => void,
  setSearcdData:(searcdData:detailedSearchType) => void
}

interface SearchBox {
  props: SearchBoxPropsType
}

// 検索ボックスコンポーネント
class SearchBox extends React.Component {

  // state状態の定義
  state = {
    // 検索ボックスの内容をバインドする
    searchText: "",
    // マウスポインタが状態判定をポイントする
    serachBoxHide: ""
  }

  // 「検索アイコン」をクリック
  handleRearch = () => {
    this.props.setSearcdData({
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
    this.props.fuzzySearch(this.state.searchText)
  }

  // 検索ボックスの内容をクリアする
  handleEmpty = () => {
    this.setState(() => {
      return ({
        ...this.state,
        searchText: ""
      })
    }, this.handleRearch)
  }

  // 製本フォームの内容の変更
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target

    // チェック ボックスであるかどうかの判断
    // フォーム入力データの取得
    const value = e.type === 'checkbox'
      ? target.checked
      : target.value

    // コンポーネント名を取得する
    const name = target.name

    // state値を更新する
    this.setState(() => {
      return ({
        ...this.state,
        [name]: value
      })
    })
  }

  // 制御表示Tooltip
  hideMouseEnterBysearch = (hideType: string) => {
    this.setState(() => {
      return ({
        ...this.state,
        serachBoxHide: hideType
      })
    })
  }

  // Tooltipを隠す
  hideMouseLeave = () => {
    this.setState(() => {
      return ({
        ...this.state,
        serachBoxHide: ""
      })
    })
  }

  render() {
    return (
      <div id="searchBox" className="search-box">
        <div id="searchBoxTop" className="search-box-top">
          <img src={SearchImg} alt="searchImg" className="search-img pointer" onClick={this.handleRearch} onMouseEnter={() => this.hideMouseEnterBysearch("search")} onMouseLeave={this.hideMouseLeave} />
          <input name="searchText" id="search-text" type="text" className="search-input" placeholder="キーワードを入力" value={this.state.searchText} onChange={this.handleChange}></input>
          <span className="search-empty pointer" onClick={this.handleEmpty} onMouseEnter={() => this.hideMouseEnterBysearch("empty")} onMouseLeave={this.hideMouseLeave}>×</span>
          <span className="search-expand pointer" onClick={this.props.handleClickOpen} onMouseEnter={() => this.hideMouseEnterBysearch("expand")} onMouseLeave={this.hideMouseLeave}>▼</span>
        </div>
        <div id="searchBoxHide" className="search-box-hide">
          <SearchBoxTopHide clazz={this.state.serachBoxHide === "search" ? "search-hide-search"
            : (this.state.serachBoxHide === "empty" ? "search-hide-empty"
              : (this.state.serachBoxHide === "expand" ? "search-hide-expand" : "search-hide"))} searchText={this.state.serachBoxHide === "search" ? "検索"
                : (this.state.serachBoxHide === "empty" ? "検索をクリア"
                  : (this.state.serachBoxHide === "expand" ? "詳細検索を行う" : ""))}></SearchBoxTopHide>
        </div>
      </div>
    )
  }
}

const BadgeContent = () => {
  return (
    <div style={{ display: "contents" }}>
      <CreateIcon fontSize="small" />
      <span>下書き中</span>
    </div>
  )
}

// ページトップコンポーネント
const Top = (props: topPropsType) => {
  const navigate = useNavigate();

  return (
    <div className="top" id="top">
      <div id="top-left" className="top-left">
        <p className="top-p">あなたが関与する申立て</p>
        <SearchBox handleClickOpen={props.handleClickOpen} fuzzySearch={props.fuzzySearch} setSearcdData={props.setSearcdData}></SearchBox>
      </div>
      <div id="top-right" className="top-right">
        <Badge badgeContent={<BadgeContent />} color="error" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} invisible={props.saveFlag === "0" || props.userPosition === "1"}>
          <button className={"top-right-button pointer" + (props.userPosition === "1" ? " display-none" : "")} onClick={() => navigate('/MosLogin')}>+申立てを登録する</button>
        </Badge>
      </div>
    </div>
  )
}

export default Top