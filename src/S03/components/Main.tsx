import * as React from 'react';
import EnhancedTable from "./EnhancedTable";
import axios from "axios";
import "../mocks/mockJs";
const lodash = require('lodash')

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

type mainPropsType = {
  searcdData: detailedSearchType,
  fuzzySearchData: string,
  handleClose: () => void,
  setSaveFlag: (saveFlag: string) => void;
  Email: string
}

interface Main {
  props: mainPropsType
}

class Main extends React.Component {

  state = {
    tableData: [],
    enhancedTableRender: 0,
    position: "",
    loading: true
  }

  componentDidUpdate(prevProps: mainPropsType) {
    if (!lodash.isEqual(this.props.searcdData, prevProps.searcdData) && this.props.searcdData.isClick) {
      this.detailedSearch(this.props.searcdData)
    } else if ((this.props.fuzzySearchData !== prevProps.fuzzySearchData) && (!this.props.searcdData.isClick)) {
      if (this.props.fuzzySearchData === "" || this.props.fuzzySearchData === null) {
        this.getDate(this.props.Email)
      } else {
        this.fuzzySearch(this.props.fuzzySearchData)
      }
    }
  }

  // 曖昧検索
  fuzzySearch = (fuzzySearchData: string) => {
    this.setState(() => {
      return {
        ...this.state,
        loading: true
      }
    })
    axios.post('/fuzzySearch', fuzzySearchData).then((response) => {
      if (response.status === 200) {
        this.setState(() => {
          return {
            ...this.state,
            tableData: response.data.data.tableData
          }
        })
        this.props.setSaveFlag(response.data.data.saveFlag)
      } else {
        console.log(response);
      }
    })
      .catch((error) => {
        console.error(error);
      })
  }

  // 詳細検索
  detailedSearch = (searcdData: detailedSearchType) => {
    this.setState(() => {
      return {
        ...this.state,
        loading: true
      }
    })
    axios.post('/detailedSearch', searcdData).then((response) => {
      if (response.status === 200) {
        this.setState(() => {
          return {
            ...this.state,
            tableData: response.data.data.tableData
          }
        }, () => {
          this.props.handleClose()
        })
        this.props.setSaveFlag(response.data.data.saveFlag)
      } else {
        console.log(response);
      }
    })
      .catch((error) => {
        console.error(error);
      })
  }

  componentDidMount(): void {
    this.getDate(this.props.Email)
  }

  getDate = (userId: string) => {
    this.setState(() => {
      return {
        ...this.state,
        loading: true
      }
    })
    axios.post('/getDate', { userId: userId }).then((response) => {
      if (response.data.status === 200) {
        this.setState(() => {
          return {
            ...this.state,
            tableData: response.data.data.tableData
          }
        })
        this.props.setSaveFlag(response.data.data.saveFlag)
      } else {
        this.setState(() => {
          return {
            ...this.state,
            tableData: []
          }
        })
        this.props.setSaveFlag("0")
      }
    })
      .catch(error => {
        console.error("error:" + error)
      })
  }

  setLoading = (loading:boolean)=>{
    this.setState(
      ()=>{
        return{
          ...this.state,
          loading:loading
        }
      }
    )
  }

  render() {
    return (
      <EnhancedTable rows={this.state.tableData} loading={this.state.loading} setLoading={this.setLoading}/>
    )
  }
}

export default Main