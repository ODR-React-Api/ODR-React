import React, { useState, useEffect }  from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../mocks/policiesConfirmMock.js'
import '../mocks/privatePoliciesConfirm.js'
import '../assets/styles/S01.css'
import HeaderOfPoliciesConfirm from "./HeaderOfPoliciesConfirm"
import MainOfPoliciesConfirm from "./MainOfPoliciesConfirm";
import FooterOfPoliciesConfirm from "./FooterOfPoliciesConfirm";
import TitleOfPoliciesConfirm from "./TitleOfPoliciesConfirm";
import { PageContext } from "../../common/pageContext";

let confirmedVersionNoOfTerms : any;
let confirmedVersionNoOfPolicy : any;

function PoliciesConfirm (){
  const {prevPage}= React.useContext(PageContext);
  const navigate = useNavigate();

  const [param, setParam] = useState({
      versionNoOfTerms : '',
      confirmedVersionNoOfTerms : '',
      htmlContextOfTerms : '',
      versionNoOfPolicy : '',
      confirmedVersionNoOfPolicy : '',
      htmlContextOfPolicy : '',
      displayFlg : ''
    }); 

  const [pageFlg,setPageFlg] = useState('0')
  const {state} = useLocation();

  confirmedVersionNoOfTerms = state.confirmedVersionNoOfTerms;
  confirmedVersionNoOfPolicy = state.confirmedVersionNoOfPolicy;

  // プライバシーポリシー情報取得
  useEffect(() =>{
    let versionNoOfTerms:string;
    let htmlContextOfTerms:string;
    let versionNoOfPolicy:string;
    let htmlContextOfPolicy:string; 
    let displayFlg:string

    // 利用規約情報取得
    axios.post('/policiesConfirm').then((res) => {
      versionNoOfTerms = res.data.data.VersionNo
      htmlContextOfTerms = res.data.data.HtmlContext
      if (versionNoOfTerms === undefined || versionNoOfTerms === ''){
        navigate('/NotFound')
      }

        // プライバシーポリシー情報取得
        axios.post('/privatePoliciesConfirm')
        .then((responsed) => {
          versionNoOfPolicy = responsed.data.data.VersionNo
          htmlContextOfPolicy=responsed.data.data.HtmlContext

          if (versionNoOfPolicy === undefined || versionNoOfPolicy === ''){
            navigate('/NotFound')
          }

          // 3:遷移元は「C2_会員登録フォーム画面」の場合
          if (prevPage==='C02'){
                displayFlg='3'
          } else{
            // 0:利用規約のみが更新された場合
            // 1:プライバシーポリシーのみが更新された場合
            // 2:利用規約とプライバシーポリシーが更新された場合
            if (versionNoOfTerms !== confirmedVersionNoOfTerms && confirmedVersionNoOfPolicy === versionNoOfPolicy){
              displayFlg ='0'
            } else if (versionNoOfTerms === confirmedVersionNoOfTerms && confirmedVersionNoOfPolicy !== versionNoOfPolicy){
              displayFlg= '1'
            } else if (versionNoOfTerms !== confirmedVersionNoOfTerms && confirmedVersionNoOfPolicy !== versionNoOfPolicy){
              displayFlg= '2'
            }
          };
          
          setParam  ({
            versionNoOfTerms : versionNoOfTerms,
            confirmedVersionNoOfTerms : '',
            htmlContextOfTerms : htmlContextOfTerms,
            versionNoOfPolicy : versionNoOfPolicy,
            confirmedVersionNoOfPolicy : '',
            htmlContextOfPolicy : htmlContextOfPolicy,
            displayFlg : displayFlg
          });
        })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
  // 回调函数更新pageFlg的值
  function handlePageFlgChange (newValue:string) {
      setPageFlg(newValue); // 更新父组件的状态
    }
  return (
      <div className="PoliciesConfirm">
        {/* 0:利用規約のみが更新された場合 */}
        { param.displayFlg === '0' &&
        <div>
          <HeaderOfPoliciesConfirm data={param} pageFlg='0'/>
          <TitleOfPoliciesConfirm data={param} pageFlg='0'/>
          <MainOfPoliciesConfirm data={param} pageFlg='0'/>
          <FooterOfPoliciesConfirm data={param} pageFlg='0' />
        </div>
        }
        {/* 1:プライバシーポリシーのみが更新された場合 */}
        { param.displayFlg === '1' &&
        <div>
          <HeaderOfPoliciesConfirm data={param} pageFlg='1'/>
          <TitleOfPoliciesConfirm data={param} pageFlg='1'/>
          <MainOfPoliciesConfirm data={param} pageFlg='1'/>
          <FooterOfPoliciesConfirm data={param} pageFlg='1' />
        </div>
        }
        {/* 2:利用規約とプライバシーポリシーが更新された場合 */}
        { param.displayFlg === '2' &&
        <div>
          <HeaderOfPoliciesConfirm data={param} pageFlg={pageFlg} />
          <TitleOfPoliciesConfirm data={param} pageFlg={pageFlg}/>
          <MainOfPoliciesConfirm data={param} pageFlg={pageFlg}/>
          <FooterOfPoliciesConfirm data={param} pageFlg={pageFlg} onPageFlgChange={handlePageFlgChange} />
        </div>
        }
        {/* 3：遷移元は「C2_会員登録フォーム画面」の場合 (=3的设定未实装)*/}
        { param.displayFlg === '3' &&
        <div>
          <HeaderOfPoliciesConfirm data={param} pageFlg='0'/>
          <TitleOfPoliciesConfirm data={param} pageFlg='0'/>
          <MainOfPoliciesConfirm data={param} pageFlg='0'/>
          <MainOfPoliciesConfirm data={param} pageFlg='1'/>
          <FooterOfPoliciesConfirm data={param} pageFlg='1' />
        </div>
        }
      </div>
  )

}

export default PoliciesConfirm;