import React, { useEffect, useState } from 'react';
import "../assets/styles/S04.scss";
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";
import "../mocks/GetCaseInfo.js";
import "../mocks/GetSessionData.js";
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Dialog, DialogTitle } from "@mui/material";
// Tabs组件 相关库引入
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// 图标 相关库引入
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Chip from '@mui/material/Chip';
// 子组件 引入
import ReconciliateContent from './ReconciliateContent';
import MediateContent from './MediateContent';
import ProposalContent from './ProposalContent';
import AnswerContent from './AnswerContent';
import ClaimRepliesContent from './ClaimRepliesContent';
import RelationshipContent from './RelationshipContent';
import S05 from '../../S05/components/S05';
import S06 from '../../S06/components/S06';
import MosFileList from '../../S07/components/MosFileList';
import ProposalTakeDownDialog from './ProposalTakeDownDialog';
import PromiseVerifyDialog from './PromiseVerifyDialog';
import JoinShowDialog from './JoinShowDialog';
import DismissByNameDialog from './DismissByNameDialog';
import DismissByMediateDialog from './DismissByMediateDialog';
import ShowTuritor1Dialog from './ShowTuritor1Dialog';
import ShowTuritor2Dialog from './ShowTuritor2Dialog';
import ShowTuritor3Dialog from './ShowTuritor3Dialog';
// common
import SnackbarDisplay from '../../common/utils/SnackbarDisplay';
import { PROPOSALTAKEDOWN_2, PROMISEVERIFY_2, DISMISSBYNAME_2, DISMISSBYMEDIATE_2, MESSAGE_NULLFLG } from '../../common/constants/constant';
import PageHeader from '../../common/utils/pageHeader';
import Steppers from '../../common/utils/Steppers';
// S26&S27画面
import Popup26 from '../../S26/components/Popup26';
import Popup27 from '../../S27/components/Popup27';
import { SNACKS26_2, SNACKS27_2, SNACKS27_3 } from '../../common/constants/constant';
// S17&S19画面
import S17_1 from '../../S17/components/S17_1';
import S17_2 from '../../S17/components/S17_2';
import MinimizeIcon from '@mui/icons-material/Minimize';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { SNACKS19_1, SNACKS19_2 } from '../../common/constants/constant';
// S20画面
import S20 from '../../S20/components/S20';
import { BUTTONS20_1, BUTTONS20_2 } from '../../common/constants/constant';
// S28&S29画面
import MedMigration from '../../S28/components/MedMigration';
import MedDateExtension from '../../S29/components/MedDateExtension';
import { SNACK_MESSAGE_S28, SNACK_MESSAGE_S29 } from '../../common/constants/constant';
// S33画面
import NamAccept from '../../S33/components/NamAccept';
import { SNACKS33_1, SNACKS33_2 } from '../../common/constants/constant';
// S34画面
import S34_1_1 from '../../S34/components/S34_1_1';
import S34_2_1 from '../../S34/components/S34_2_1';
// S22&S24&S25画面
import S22 from '../../S22/components/S22';
import MediationsAgree from '../../S25/components/MediationsAgree';
import { SNACKS24_1, SNACKS25_1, SNACKS25_2 } from '../../common/constants/constant';
// S30&S32画面
import ReplyTrsg from '../../S32/components/ReplyTrsg';
import UsesaseCancel from '../../S30/components/UsesaseCancel';
import { SNACK_MESSAGE_S32 } from '../../common/constants/constant';

function S04() {
    // 获取迁移内容
    let localtion = useLocation();
    // ※渡し項目
    // 案件ID
    let caseId = localtion.state.caseId;
    // 立場フラグ
    let positionFlg = localtion.state.positionFlg;
    // S34フラグ
    let S34Flg = localtion.state.S34Flg;
    // loading
    const [loading,setLoading] = useState(true);

    // ボタンに下書きバッジを表示
    // 戻り項目.draftFlgに0（下書き保存データなし）の場合
    const [draftFlg, setDraftFlg] = useState(false); 

    // API_案件状態 mocksData
    const [caseInfo, setCaseInfo] = useState<any>(null); 
    // API_案件状態取得
    useEffect(() => {
        // 副作用函数
        // 在组件渲染时执行
        // 可以进行副作用操作
        axios.get('/GetCaseInfo')
        .then((response) => {
            response.data.data.forEach((item: any)  => {
                setLoading(false);
                if(caseId === item.cid){
                    setCaseInfo(item);
                    if(positionFlg === '1' && item.showTuritor1 === 0){
                        // 渡し項目の立場フラグが1(申立人) の場合 チュートリアルポップアップを表示
                        setIsOpenShowTuritor1(true);
                    }else if(positionFlg === '2' && item.showTuritor2 === 0){
                        // 渡し項目の立場フラグが2（相手方）の場合 チュートリアルポップアップを表示
                        setIsOpenShowTuritor2(true);
                    }else if((positionFlg === '1' || positionFlg === '2') && item.showTuritor3 === 0){
                        // 渡し項目の立場フラグが1(申立人) or 2（相手方）の場合 チュートリアルポップアップを表示
                        setIsOpenShowTuritor3(true);
                    }
                }
            })
        }).catch((error) => {
            console.log(error);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // sessionData
    const [sessionData, setSessionData] = useState<any>(null); 
    // セッション取得 セッション.PlatformId セッション.ユーザID
    useEffect(() => {
        // 副作用函数
        // 在组件渲染时执行
        // 可以进行副作用操作
        axios.get('/GetSessionData')
        .then((response) => {
            setSessionData(response.data.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);
    
    // 案件名Title取得
    function caseTitleLab(){
        if(caseInfo.caseTitle === null || caseInfo.caseTitle === undefined ){
            return <label id="caseTitle">案件名が存在しません</label>
        }else{
            return <label id="caseTitle">{caseInfo.caseTitle}</label>
        }
    }

    // 基本の画面表示Data
    let caseData: any;
    // id textMessage  leftBtn{id, btnName} caseBtn[{id, btnName}] dueDate
    if(caseInfo && sessionData){
        // ⅰ.渡し項目の立場フラグが1（申立人）の場合
        // StatusMap---各フェーズの基本の画面表示を行う
        let petitionUserData = [
            // 以下申立てフェーズの画面表示を行う
            {
                id: '01',
                textMessage: '申立てを行いました。相手方の参加表明待ちです。',
                leftBtn: null,
                caseBtn: [{id: '1', btnName: '申立ての取り下げ'}],
                dueDate: caseInfo.replyEndDate,
            },
            {
                id: '02',
                textMessage: '相手方の参加が表明されました。相手方の回答待ちです。',
                leftBtn: null,
                caseBtn: [{id: '1', btnName: '申立ての取り下げ'}],
                dueDate: caseInfo.replyEndDate,
            },
            {
                id: '1-',
                textMessage: 'この申立ては取り下げられました。',
                leftBtn: null,
                caseBtn: null,
                dueDate: caseInfo.replyEndDate,
            },
            {
                id: '2-',
                textMessage: '反訴が行われました。回答をお願いします。',
                leftBtn: {id: '21', btnName: '反訴へ回答する'},
                caseBtn: [
                    {id: '2', btnName: '調停を行う'},
                    {id: '21', btnName: '反訴へ回答する'},
                    {id: '1', btnName: '申立ての取り下げ'}
                ],
                dueDate: caseInfo.counterclaimEndDate,
            },
            {
                id: '4-',
                textMessage: '手続きが中止されました。',
                leftBtn: null,
                caseBtn: null,
                dueDate: caseInfo.cancelDate,
            },
            {
                id: '5-',
                textMessage: '和解が成立しました。',
                leftBtn: {id: '24', btnName: '和解合意書を確認する'},
                caseBtn: [{id: '24', btnName: '和解合意書を確認する'}],
                dueDate: caseInfo.resolutionDate,
            },
            {
                id: '61',
                textMessage: '調停へ移行しました。調停人の指名が行われるまでお待ちください。',
                leftBtn: null,
                caseBtn: [{id: '5', btnName: 'この申立ての手続きを中止する'}],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '62',
                textMessage: '調停人が指名されました。確認しましょう。',
                leftBtn: {id: '26', btnName: '調停人を確認する'},
                caseBtn: [
                    {id: '26', btnName: '調停人を確認する'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '11-',
                textMessage: '和解が成立しました。',
                leftBtn: {id: '28', btnName: '和解合意書を確認する'},
                caseBtn: [{id: '28', btnName: '和解合意書を確認する'}],
                dueDate: caseInfo.resolutionDate,
            },
            {
                id: '12-',
                textMessage: '調停案が拒否されたため、和解不成立として、この申立てに関するお手続きは終了しました。',
                leftBtn: null,
                caseBtn: null,
                dueDate: caseInfo.mediationEndDate,
            },
            // 戻り項目.モジュール利用状況Flgが　5、6　以外の場合は以下交渉フェーズの画面設定を行う
            {
                id: '30',
                textMessage: sessionData.response.responseUser + ' ' + sessionData.response.userName + 'と「メッセージ」でやりとりを行い、合意できたら「和解案」の作成に進んでください。',
                leftBtn: null,
                caseBtn: [
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '31',
                textMessage: '作成中の和解案の編集依頼が来ています。和解案の内容の確認と編集を行ってください。',
                leftBtn: {id: '22', btnName: '和解案を編集する'},
                caseBtn: [
                    {id: '22', btnName: '和解案を編集する'},
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '32',
                textMessage: '  {{ case.responseUser$ | async | userName }}より和解案が提出されました。あなたの確認待ちです。',
                leftBtn: {id: '23', btnName: '和解案を確認する'},
                caseBtn: [
                    {id: '23', btnName: '和解案を確認する'},
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '33',
                textMessage: '和解案への合意を行いました。<br />最後に和解合意書の確認を行うことで和解のお手続きが完了します。確認をお願いします。',
                leftBtn: {id: '24', btnName: '和解合意書を確認する'},
                caseBtn: [{id: '24', btnName: '和解合意書を確認する'}],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '34',
                textMessage: '和解合意書を確認済みにしました。相手方の確認待ちです。',
                leftBtn: {id: '24', btnName: '和解合意書を確認する'},
                caseBtn: [{id: '24', btnName: '和解合意書を確認する'}],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '35',
                textMessage: '和解案への合意を行いました。<br />最後に和解合意書の確認を行うことで和解のお手続きが完了します。確認をお願いします。',
                leftBtn: {id: '24', btnName: '和解合意書を確認する'},
                caseBtn: [{id: '24', btnName: '和解合意書を確認する'}],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '37',
                textMessage: sessionData.response.responseUser + ' ' + sessionData.response.userName + 'と「メッセージ」でやりとりを行い、合意できたら「和解案」の作成に進んでください。',
                leftBtn: {id: '25', btnName: '和解案を作成する'},
                caseBtn: [
                    {id: '25', btnName: '和解案を作成する'},
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '38',
                textMessage: sessionData.response.responseUser + ' ' + sessionData.response.userName + 'と「メッセージ」でやりとりを行い、合意できたら「和解案」の作成に進んでください。',
                leftBtn: {id: '25', btnName: '和解案を作成する'},
                caseBtn: [
                    {id: '25', btnName: '和解案を作成する'},
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '39',
                textMessage: '和解案の対案を提出しました。相手方の確認待ちです。',
                leftBtn: null,
                caseBtn: [
                    {id: '22', btnName: '和解案を編集する'},
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '310',
                textMessage: sessionData.response.responseUser + ' ' + sessionData.response.userName + 'と「メッセージ」でやりとりを行ってください。',
                leftBtn: null,
                caseBtn: [
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '311',
                textMessage: sessionData.response.responseUser + ' ' + sessionData.response.userName + 'と「メッセージ」でやりとりを行ってください。',
                leftBtn: null,
                caseBtn: [
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '312',
                textMessage: sessionData.response.responseUser + ' ' + sessionData.response.userName + 'より和解案が提出されました。あなたの確認待ちです。',
                leftBtn: {id: '24', btnName: '和解合意書を確認する'},
                caseBtn: [
                    {id: '24', btnName: '和解合意書を確認する'},
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '313',
                textMessage: sessionData.response.responseUser + ' ' + sessionData.response.userName + 'と「メッセージ」でやりとりを行い、合意できたら「和解案」の作成に進んでください。',
                leftBtn: {id: '25', btnName: '和解案を作成する'},
                caseBtn: [
                    {id: '25', btnName: '和解案を作成する'},
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '314',
                textMessage: sessionData.response.responseUser + ' ' + sessionData.response.userName + 'と「メッセージ」でやりとりを行い、合意できたら「和解案」の作成に進んでください。',
                leftBtn: {id: '25', btnName: '和解案を作成する'},
                caseBtn: [
                    {id: '25', btnName: '和解案を作成する'},
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '315',
                textMessage: '和解案を提出しました。相手方の確認待ちです。',
                leftBtn: null,
                caseBtn: [
                    {id: '22', btnName: '和解案を編集する'},
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '399',
                textMessage: sessionData.response.responseUser + ' ' + sessionData.response.userName + 'と「メッセージ」でやりとりを行い、合意できたら「和解案」の作成に進んでください。',
                leftBtn: {id: '25', btnName: '和解案を作成する'},
                caseBtn: [
                    {id: '25', btnName: '和解案を作成する'},
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            // 以下調停フェーズの画面設定を行う
            {
                id: '70',
                textMessage: '調停人が指名されました。確認しましょう。',
                leftBtn: {id: '26', btnName: '調停人を確認する'},
                caseBtn: [
                    {id: '26', btnName: '調停人を確認する'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '799',
                textMessage: '調停人が指名されました。確認しましょう。',
                leftBtn: {id: '26', btnName: '調停人を確認する'},
                caseBtn: [
                    {id: '26', btnName: '調停人を確認する'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '71',
                textMessage: sessionData.mediator.mediatorUser + ' ' + sessionData.mediator.userName + 'より調停案が提出されました。あなたの確認待ちです。',
                leftBtn: {id: '27', btnName: '調停案を確認する'},
                caseBtn: [
                    {id: '27', btnName: '調停案を確認する'},
                    {id: '26', btnName: '調停人を確認する'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '72',
                textMessage: sessionData.response.responseUser + ' ' + sessionData.response.userName + 'の調停案の確認待ちです。',
                leftBtn: {id: '27', btnName: '調停案を確認する'},
                caseBtn: [
                    {id: '27', btnName: '調停案を確認する'},
                    {id: '26', btnName: '調停人を確認する'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '73',
                textMessage: sessionData.mediator.mediatorUser + ' ' + sessionData.mediator.userName + 'より調停案が提出されました。あなたの確認待ちです。',
                leftBtn: {id: '27', btnName: '調停案を確認する'},
                caseBtn: [
                    {id: '27', btnName: '調停案を確認する'},
                    {id: '26', btnName: '調停人を確認する'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '74',
                textMessage: '調停案への合意を行いました。<br />最後に和解合意書の確認を行うことで和解のお手続きが完了します。確認をお願いします。',
                leftBtn: {id: '28', btnName: '和解合意書を確認する'},
                caseBtn: [{id: '28', btnName: '和解合意書を確認する'}],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '75',
                textMessage: '和解合意書を確認済みにしました。相手方の確認待ちです。',
                leftBtn: {id: '28', btnName: '和解合意書を確認する'},
                caseBtn: [{id: '28', btnName: '和解合意書を確認する'}],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '76',
                textMessage: '調停案への合意を行いました。<br />最後に和解合意書の確認を行うことで和解のお手続きが完了します。確認をお願いします。',
                leftBtn: {id: '28', btnName: '和解合意書を確認する'},
                caseBtn: [{id: '28', btnName: '和解合意書を確認する'}],
                dueDate: caseInfo.mediationEndDate,
            }
        ];
        // StatusMap---メッセージの置き換え、または追加
        let petitionUserReplaceMessage =[
            {
                id: '31-',
                textMessage: '交渉期間の期日の延長リクエストが来ています。確認をお願いします。',
            },
            {
                id: '32-',
                textMessage: '交渉期間の期日の延長リクエスト中です。',
            },
            {
                id: '7-1',
                textMessage: '個別やりとり依頼を提出しました。相手方の承認待ちです。',
            },
            {
                id: '7-3',
                textMessage: '個別やりとり依頼が拒否されました。<br />',
            },
            {
                id: '7-4',
                textMessage: '調停人との個別のやりとりの承諾依頼が来ています。確認をお願いします。',
            }
        ];
        // StatusMap---左側ボタンの置き換え
        let petitionUserReplaceLeftBtn = [
            {
                id: '31-',
                leftBtn: {id: '4', btnName: '期日延長の承諾依頼を確認'},
            },
            {
                id: '7-4',
                leftBtn: {id: '6', btnName: '個別やりとりの承諾依頼を確認'},
            }
        ];
        // StatusMap---アクション内操作ボタンの追加
        let petitionUserReplaceCaseBtn = [
            {
                id: '30-',
                caseBtn: {id: '3', btnName: '期日の延長を希望する'},
            },
            {
                id: '31-',
                caseBtn: {id: '4', btnName: '期日延長の承諾依頼を確認'},
            },
            {
                id: '7-4',
                caseBtn: {id: '6', btnName: '個別やりとりの承諾依頼を確認'},
            }
        ];

        // ⅱ.渡し項目の立場フラグが2（相手方）の場合
        // StatusMap---各フェーズの基本の画面表示を行う
        let traderUserData = [
            // 以下回答てフェーズの画面表示を行う
            {
                id: '01',
                textMessage: sessionData.claim.claimUser + ' ' + sessionData.claim.userName + 'より申立てが行われました。あなたの参加表明待ちです。',
                leftBtn: {id: '7', btnName: '参加表明する'},
                caseBtn: [
                    {id: '7', btnName: '参加表明する'},
                    {id: '2', btnName: '調停を行う'}
                ],
                dueDate: caseInfo.replyEndDate,
            },
            {
                id: '02',
                textMessage: '申立てが行われました。回答をお願いします。',
                leftBtn: {id: '29', btnName: '回答する'},
                caseBtn: [
                    {id: '29', btnName: '回答する'},
                    {id: '2', btnName: '調停を行う'}
                ],
                dueDate: caseInfo.replyEndDate,
            },
            {
                id: '1-',
                textMessage: 'この申立ては取り下げられました。',
                leftBtn: null,
                caseBtn: null,
                dueDate: caseInfo.replyEndDate,
            },
            {
                id: '2-',
                textMessage: '反訴への回答待ちです。',
                leftBtn: null,
                caseBtn: [
                    {id: '8', btnName: '反訴の取り下げ'},
                    {id: '2', btnName: '調停を行う'},
                    {id: '1', btnName: '申立ての取り下げ'}
                ],
                dueDate: caseInfo.counterclaimEndDate,
            },
            {
                id: '4-',
                textMessage: '手続きが中止されました。',
                leftBtn: null,
                caseBtn: null,
                dueDate: caseInfo.cancelDate,
            },
            {
                id: '5-',
                textMessage: '和解が成立しました。',
                leftBtn: {id: '24', btnName: '和解合意書を確認する'},
                caseBtn: [{id: '24', btnName: '和解合意書を確認する'}],
                dueDate: caseInfo.resolutionDate,
            },
            {
                id: '61',
                textMessage: '調停へ移行しました。調停人の指名が行われるまでお待ちください。',
                leftBtn: null,
                caseBtn: [{id: '5', btnName: 'この申立ての手続きを中止する'}],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '62',
                textMessage: '調停人が指名されました。確認しましょう。',
                leftBtn: {id: '26', btnName: '調停人を確認する'},
                caseBtn: [
                    {id: '26', btnName: '調停人を確認する'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '11-',
                textMessage: '和解が成立しました。',
                leftBtn: {id: '24', btnName: '和解合意書を確認する'},
                caseBtn: [{id: '24', btnName: '和解合意書を確認する'}],
                dueDate: caseInfo.resolutionDate,
            },
            {
                id: '12-',
                textMessage: '調停案が拒否されたため、和解不成立として、この申立てに関するお手続きは終了しました。',
                leftBtn: null,
                caseBtn: null,
                dueDate: caseInfo.mediationEndDate,
            },
            // 戻り項目.モジュール利用状況Flgが　5、6　以外の場合は以下交渉フェーズの画面設定を行う
            {
                id: '30',
                textMessage: sessionData.claim.claimUser + ' ' + sessionData.claim.userName + 'と「メッセージ」でやりとりを行い、合意できたら「和解案」の作成に進んでください。',
                leftBtn: {id: '25', btnName: '和解案を作成する'},
                caseBtn: [
                    {id: '25', btnName: '和解案を作成する'},
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '31',
                textMessage: sessionData.claim.claimUser + ' ' + sessionData.claim.userName + 'と「メッセージ」でやりとりを行い、合意できたら「和解案」の作成に進んでください。',
                leftBtn: {id: '25', btnName: '和解案を作成する'},
                caseBtn: [
                    {id: '25', btnName: '和解案を作成する'},
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '32',
                textMessage: '和解案を提出しました。申立人の確認待ちです。',
                leftBtn: null,
                caseBtn: [
                    {id: '22', btnName: '和解案を編集する'},
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '33',
                textMessage: '和解案への合意を行いました。<br />最後に和解合意書の確認を行うことで和解のお手続きが完了します。確認をお願いします。',
                leftBtn: {id: '24', btnName: '和解合意書を確認する'},
                caseBtn: [{id: '24', btnName: '和解合意書を確認する'}],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '34',
                textMessage: '和解案への合意を行いました。<br />最後に和解合意書の確認を行うことで和解のお手続きが完了します。確認をお願いします。',
                leftBtn: {id: '24', btnName: '和解合意書を確認する'},
                caseBtn: [{id: '24', btnName: '和解合意書を確認する'}],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '35',
                textMessage: '和解合意書を確認済みでした。申立人の確認待ちです。',
                leftBtn: {id: '24', btnName: '和解合意書を確認する'},
                caseBtn: [{id: '24', btnName: '和解合意書を確認する'}],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '37',
                textMessage: sessionData.claim.claimUser + ' ' + sessionData.claim.userName + 'と「メッセージ」でやりとりを行ってください。',
                leftBtn: null,
                caseBtn: [
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '38',
                textMessage: sessionData.claim.claimUser + ' ' + sessionData.claim.userName + 'と「メッセージ」でやりとりを行ってください。',
                leftBtn: null,
                caseBtn: [
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '39',
                textMessage: sessionData.claim.claimUser + ' ' + sessionData.claim.userName + 'より和解案の対案が提出されました。あなたの確認待ちです。',
                leftBtn: {id: '23', btnName: '和解案を確認する'},
                caseBtn: [
                    {id: '23', btnName: '和解案を確認する'},
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '310',
                textMessage: sessionData.claim.claimUser + ' ' + sessionData.claim.userName + 'と「メッセージ」でやりとりを行い、合意できたら「和解案」の作成に進んでください。',
                leftBtn: {id: '25', btnName: '和解案を作成する'},
                caseBtn: [
                    {id: '25', btnName: '和解案を作成する'},
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '311',
                textMessage: sessionData.claim.claimUser + ' ' + sessionData.claim.userName + 'と「メッセージ」でやりとりを行い、合意できたら「和解案」の作成に進んでください。',
                leftBtn: {id: '25', btnName: '和解案を作成する'},
                caseBtn: [
                    {id: '25', btnName: '和解案を作成する'},
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '312',
                textMessage: '和解案を提出しました。申立人の確認待ちです。',
                leftBtn: null,
                caseBtn: [
                    {id: '22', btnName: '和解案を編集する'},
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '313',
                textMessage: sessionData.claim.claimUser + ' ' + sessionData.claim.userName + 'と「メッセージ」でやりとりを行ってください。',
                leftBtn: null,
                caseBtn: [
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '314',
                textMessage: '作成中の和解案の編集依頼が来ています。和解案の内容の確認と編集を行ってください。',
                leftBtn: {id: '22', btnName: '和解案を編集する'},
                caseBtn: [
                    {id: '22', btnName: '和解案を編集する'},
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '315',
                textMessage: sessionData.claim.claimUser + ' ' + sessionData.claim.userName + 'より和解案が提出されました。あなたの確認待ちです。',
                leftBtn: {id: '23', btnName: '和解案を確認する'},
                caseBtn: [
                    {id: '23', btnName: '和解案を確認する'},
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            {
                id: '399',
                textMessage: sessionData.claim.claimUser + ' ' + sessionData.claim.userName + 'と「メッセージ」でやりとりを行い、合意できたら「和解案」の作成に進んでください。',
                leftBtn: {id: '25', btnName: '和解案を作成する'},
                caseBtn: [
                    {id: '25', btnName: '和解案を作成する'},
                    {id: '2', btnName: '調停を行う'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.negotiationEndDate,
            },
            // 以下調停フェーズの画面設定を行う
            {
                id: '70',
                textMessage: '調停人が指名されました。確認しましょう。',
                leftBtn: {id: '26', btnName: '調停人を確認する'},
                caseBtn: [
                    {id: '26', btnName: '調停人を確認する'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '799',
                textMessage: '調停人が指名されました。確認しましょう。',
                leftBtn: {id: '26', btnName: '調停人を確認する'},
                caseBtn: [
                    {id: '26', btnName: '調停人を確認する'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '71',
                textMessage: sessionData.mediator.mediatorUser + ' ' + sessionData.mediator.userName + 'より調停案が提出されました。あなたの確認待ちです。',
                leftBtn: {id: '27', btnName: '調停案を確認する'},
                caseBtn: [
                    {id: '27', btnName: '調停案を確認する'},
                    {id: '26', btnName: '調停人を確認する'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '72',
                textMessage: sessionData.mediator.mediatorUser + ' ' + sessionData.mediator.userName + 'より調停案が提出されました。あなたの確認待ちです。',
                leftBtn: {id: '27', btnName: '調停案を確認する'},
                caseBtn: [
                    {id: '27', btnName: '調停案を確認する'},
                    {id: '26', btnName: '調停人を確認する'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '73',
                textMessage: sessionData.claim.claimUser + ' ' + sessionData.claim.userName + 'の調停案の確認待ちです。',
                leftBtn: {id: '27', btnName: '調停案を確認する'},
                caseBtn: [
                    {id: '27', btnName: '調停案を確認する'},
                    {id: '26', btnName: '調停人を確認する'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '74',
                textMessage: '調停案への合意を行いました。<br />最後に和解合意書の確認を行うことで和解のお手続きが完了します。確認をお願いします。',
                leftBtn: {id: '28', btnName: '和解合意書を確認する'},
                caseBtn: [{id: '28', btnName: '和解合意書を確認する'}],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '75',
                textMessage: '調停案への合意を行いました。<br />最後に和解合意書の確認を行うことで和解のお手続きが完了します。確認をお願いします。',
                leftBtn: {id: '28', btnName: '和解合意書を確認する'},
                caseBtn: [{id: '28', btnName: '和解合意書を確認する'}],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '76',
                textMessage: '和解合意書を確認済みでした。申立人の確認待ちです。',
                leftBtn: {id: '28', btnName: '和解合意書を確認する'},
                caseBtn: [{id: '28', btnName: '和解合意書を確認する'}],
                dueDate: caseInfo.mediationEndDate,
            }
        ];
        // StatusMap---メッセージの置き換え、または追加
        let traderUserReplaceMessage =[
            {
                id: '31-',
                textMessage: '交渉期間の期日の延長リクエスト中です。',
            },
            {
                id: '32-',
                textMessage: '交渉期間の期日の延長リクエストが来ています。確認をお願いします。',
            },
            {
                id: '7-1',
                textMessage: '調停人との個別のやりとりの承諾依頼が来ています。確認をお願いします。',
            },
            {
                id: '7-4',
                textMessage: '個別やりとり依頼を提出しました。申立人の承認待ちです。',
            },
            {
                id: '7-6',
                textMessage: '個別やりとり依頼が拒否されました。<br />',
            }
        ];
        // StatusMap---左側ボタンの置き換え
        let traderUserReplaceLeftBtn = [
            {
                id: '32-',
                leftBtn: {id: '4', btnName: '期日延長の承諾依頼を確認'},
            },
            {
                id: '7-1',
                leftBtn: {id: '6', btnName: '個別やりとりの承諾依頼を確認'},
            }
        ];
        // StatusMap---アクション内操作ボタンの追加
        let traderUserReplaceCaseBtn = [
            {
                id: '30-',
                caseBtn: {id: '3', btnName: '期日の延長を希望する'},
            },
            {
                id: '32-',
                caseBtn: {id: '4', btnName: '期日延長の承諾依頼を確認'},
            },
            {
                id: '7-1',
                caseBtn: {id: '6', btnName: '個別やりとりの承諾依頼を確認'},
            }
        ];

        // ⅲ.渡し項目の立場フラグが3（調定人）の場合
        // StatusMap---各フェーズの基本の画面表示を行う
        let mediateUserData = [
            {
                id: '4-',
                textMessage: '手続きが中止されました。',
                leftBtn: null,
                caseBtn: null,
                dueDate: caseInfo.cancelDate,
            },
            {
                id: '62',
                textMessage: '調停人に指名されました。あなたの指名の受理待ちです。',
                leftBtn: {id: '30', btnName: '指名を受理する'},
                caseBtn: [
                    {id: '30', btnName: '指名を受理する'},
                    {id: '9', btnName: '指名を辞退する'}
                ],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '11-',
                textMessage: '和解が成立しました。',
                leftBtn: null,
                caseBtn: null,
                dueDate: caseInfo.resolutionDate,
            },
            {
                id: '12-',
                textMessage: '調停案が拒否されたため、和解不成立として、この申立てに関するお手続きは終了しました。',
                leftBtn: {id: '28', btnName: '和解合意書を確認する'},
                caseBtn: null,
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '799',
                textMessage: '申立人、相手方と「メッセージ」でやりとりを行い、合意できたら「調停案」の作成に進んでください。',
                leftBtn: {id: '31', btnName: '調停案を作成する'},
                caseBtn: [
                    {id: '31', btnName: '調停案を作成する'},
                    {id: '10', btnName: '調停人を辞任する'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '70',
                textMessage: '申立人、相手方と「メッセージ」でやりとりを行い、合意できたら「調停案」の作成に進んでください。',
                leftBtn: {id: '31', btnName: '調停案を作成する'},
                caseBtn: [
                    {id: '31', btnName: '調停案を作成する'},
                    {id: '10', btnName: '調停人を辞任する'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '71',
                textMessage: '調停案を提出しました。確認待ちです。',
                leftBtn: null,
                caseBtn: [
                    {id: '32', btnName: '調停案を編集する'},
                    {id: '10', btnName: '調停人を辞任する'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '72',
                textMessage: '調停案を提出しました。確認待ちです。',
                leftBtn: null,
                caseBtn: [
                    {id: '32', btnName: '調停案を編集する'},
                    {id: '10', btnName: '調停人を辞任する'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '73',
                textMessage: '調停案を提出しました。確認待ちです。',
                leftBtn: null,
                caseBtn: [
                    {id: '32', btnName: '調停案を編集する'},
                    {id: '10', btnName: '調停人を辞任する'},
                    {id: '5', btnName: 'この申立ての手続きを中止する'}
                ],
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '74',
                textMessage: '調停案が合意されました。和解合意書の確認待ちです。',
                leftBtn: {id: '27', btnName: '調停案を確認する'},
                caseBtn: null,
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '75',
                textMessage: '調停案が合意されました。和解合意書の確認待ちです。',
                leftBtn: {id: '27', btnName: '調停案を確認する'},
                caseBtn: null,
                dueDate: caseInfo.mediationEndDate,
            },
            {
                id: '76',
                textMessage: '調停案が合意されました。和解合意書の確認待ちです。',
                leftBtn: {id: '27', btnName: '調停案を確認する'},
                caseBtn: null,
                dueDate: caseInfo.mediationEndDate,
            }
        ];
        // StatusMap---アクション内操作ボタンの追加
        let mediateUserReplaceCaseBtn = [
            {
                id: '71-',
                caseBtn: {id: '11', btnName: '期日を延長する'},
            }
        ];

        // ⅳ.CaseStatusがS9A9B9C9（網羅外ステータス）の場合、画面ヘッダ部に以下メッセージを表示する。
        // 案件のステータスが存在しません。
        let caseStatusMessage = {
            id: '-S9A9B9C9',
            textMessage: '案件のステータスが存在しません。',
            leftBtn: null,
            caseBtn: null,
            dueDate: null
        };

        let caseKey: string;
        let caseReplaceKey: string;
        
        if(positionFlg === '1'){  
            // ⅰ.渡し項目の立場フラグが1（申立人）の場合
            // 各フェーズの基本の画面表示を行う
            if(caseInfo.stage === 1 || caseInfo.stage === 2 || caseInfo.stage === 4 
            || caseInfo.stage === 5 || caseInfo.stage === 11 || caseInfo.stage === 12 ){
                caseKey = caseInfo.stage + '-';
            }else{
                caseKey = caseInfo.stage.toString() + caseInfo.caseStatus;
            }
            
            for(let i = 0; i < petitionUserData.length; i++){ 
                if(caseInfo.stage === 3){
                    // 戻り項目.モジュール利用状況Flgが　5、6　以外の場合は以下交渉フェーズの画面設定を行う
                    if(caseInfo.moudleFlg !== 5 && caseInfo.moudleFlg !== 6){
                        if(petitionUserData[i].id === caseKey){
                            caseReplaceKey = caseInfo.stage.toString() + caseInfo.dateRequestStatus.toString() + '-';
                            
                            // メッセージの置き換え、または追加
                            for(let j = 0; j < petitionUserReplaceMessage.length; j++){
                                if(petitionUserReplaceMessage[j].id === caseReplaceKey){
                                    petitionUserData[i].textMessage = petitionUserReplaceMessage[j].textMessage;
                                }
                            }

                            // 左側ボタンの置き換え
                            for(let j = 0; j < petitionUserReplaceLeftBtn.length; j++){
                                if(petitionUserReplaceLeftBtn[j].id === caseReplaceKey){
                                    petitionUserData[i].leftBtn = petitionUserReplaceLeftBtn[j].leftBtn;
                                }
                            }

                            // アクション内操作ボタンの追加
                            for(let j = 0; j < petitionUserReplaceCaseBtn.length; j++){
                                if(petitionUserReplaceCaseBtn[j].id === caseReplaceKey){
                                    petitionUserData[i].caseBtn?.unshift(petitionUserReplaceCaseBtn[j].caseBtn);
                                }
                            }

                            caseData = petitionUserData[i];
                        }
                    }
                }else if(caseInfo.stage === 7){
                    // 以下調停フェーズの画面設定を行う
                    if(petitionUserData[i].id === caseKey){
                        caseReplaceKey = caseInfo.stage + '-' + caseInfo.messageStatus;
                        // let caseReplaceKey = caseInfo.stage.toString() + '-' + caseInfo.messageStatus.toString();

                        // メッセージの置き換え、または追加
                        for(let j = 0; j < petitionUserReplaceMessage.length; j++){
                            if(petitionUserReplaceMessage[j].id === caseReplaceKey){
                                if(caseInfo.messageStatus === 3){
                                    petitionUserData[i].textMessage =  petitionUserReplaceMessage[j].textMessage + petitionUserData[i].textMessage;
                                }else{
                                    petitionUserData[i].textMessage = petitionUserReplaceMessage[j].textMessage;
                                } 
                            }
                        }

                        // 左側ボタンの置き換え
                        for(let j = 0; j < petitionUserReplaceLeftBtn.length; j++){
                            if(petitionUserReplaceLeftBtn[j].id === caseReplaceKey){
                                petitionUserData[i].leftBtn = petitionUserReplaceLeftBtn[j].leftBtn;
                            }
                        }

                        // アクション内操作ボタンの追加
                        for(let j = 0; j < petitionUserReplaceCaseBtn.length; j++){
                            if(petitionUserReplaceCaseBtn[j].id === caseReplaceKey){
                                petitionUserData[i].caseBtn?.unshift(petitionUserReplaceCaseBtn[j].caseBtn);
                            }
                        }

                        caseData = petitionUserData[i];
                    }
                }else{
                    // 以下申立てフェーズの画面表示を行う
                    if(petitionUserData[i].id === caseKey){
                        caseData = petitionUserData[i];
                    }
                }
            }
 
        }else if(positionFlg === '2'){
            // ⅱ.渡し項目の立場フラグが2（相手方）の場合
            // 各フェーズの基本の画面表示を行う
            if(caseInfo.stage === 1 || caseInfo.stage === 2 || caseInfo.stage === 4 
            || caseInfo.stage === 5 || caseInfo.stage === 11 || caseInfo.stage === 12 ){
                caseKey = caseInfo.stage + '-';
            }else{
                caseKey = caseInfo.stage.toString() + caseInfo.caseStatus;
            }

            for(let i = 0; i < traderUserData.length; i++){ 
                if(caseInfo.stage === 3){
                    // 戻り項目.モジュール利用状況Flgが　5、6　以外の場合は以下交渉フェーズの画面設定を行う
                    if(caseInfo.moudleFlg !== 5 && caseInfo.moudleFlg !== 6){
                        if(traderUserData[i].id === caseKey){
                            caseReplaceKey = caseInfo.stage.toString() + caseInfo.dateRequestStatus.toString() + '-';

                            // メッセージの置き換え、または追加
                            for(let j = 0; j < traderUserReplaceMessage.length; j++){
                                if(traderUserReplaceMessage[j].id === caseReplaceKey){
                                    traderUserData[i].textMessage = traderUserReplaceMessage[j].textMessage;
                                }
                            }

                            // 左側ボタンの置き換え
                            for(let j = 0; j < traderUserReplaceLeftBtn.length; j++){
                                if(traderUserReplaceLeftBtn[j].id === caseReplaceKey){
                                    traderUserData[i].leftBtn = traderUserReplaceLeftBtn[j].leftBtn;
                                }
                            }

                            // アクション内操作ボタンの追加
                            for(let j = 0; j < traderUserReplaceCaseBtn.length; j++){
                                if(traderUserReplaceCaseBtn[j].id === caseReplaceKey){
                                    traderUserData[i].caseBtn?.unshift(traderUserReplaceCaseBtn[j].caseBtn);
                                }
                            }

                            caseData = traderUserData[i];
                        }
                    }
                }else if(caseInfo.stage === 7){
                    // 以下調停フェーズの画面設定を行う
                    if(traderUserData[i].id === caseKey){
                        caseReplaceKey = caseInfo.stage + '-' + caseInfo.messageStatus;
                        // let caseReplaceKey = caseInfo.stage.toString() + '-' + caseInfo.messageStatus.toString();

                        // メッセージの置き換え、または追加
                        for(let j = 0; j < traderUserReplaceMessage.length; j++){
                            if(traderUserReplaceMessage[j].id === caseReplaceKey){
                                if(caseInfo.messageStatus === 3){
                                    traderUserData[i].textMessage =  traderUserReplaceMessage[j].textMessage + traderUserData[i].textMessage;
                                }else{
                                    traderUserData[i].textMessage = traderUserReplaceMessage[j].textMessage;
                                } 
                            }
                        }

                        // 左側ボタンの置き換え
                        for(let j = 0; j < traderUserReplaceLeftBtn.length; j++){
                            if(traderUserReplaceLeftBtn[j].id === caseReplaceKey){
                                traderUserData[i].leftBtn = traderUserReplaceLeftBtn[j].leftBtn;
                            }
                        }

                        // アクション内操作ボタンの追加
                        for(let j = 0; j < traderUserReplaceCaseBtn.length; j++){
                            if(traderUserReplaceCaseBtn[j].id === caseReplaceKey){
                                traderUserData[i].caseBtn?.unshift(traderUserReplaceCaseBtn[j].caseBtn);
                            }
                        }

                        caseData = traderUserData[i];
                    }
                }else{
                    // 以下回答てフェーズの画面表示を行う
                    if(traderUserData[i].id === caseKey){
                        caseData = traderUserData[i];
                    }
                }
            }

        }else if(positionFlg === '3'){
            // ⅲ.渡し項目の立場フラグが3（調定人）の場合
            // 各フェーズの基本の画面表示を行う
            if(caseInfo.stage === 4 || caseInfo.stage === 11 || caseInfo.stage === 12 ){
                caseKey = caseInfo.stage + '-';
            }else{
                caseKey = caseInfo.stage.toString() + caseInfo.caseStatus;
            } 

            for(let i = 0; i < mediateUserData.length; i++){ 
                if(caseInfo.stage === 7){
                    if(mediateUserData[i].id === caseKey){
                        caseReplaceKey = caseInfo.stage.toString() + caseInfo.dateRequestStatus.toString() + '-';

                        // アクション内操作ボタンの追加
                        for(let j = 0; j < mediateUserReplaceCaseBtn.length; j++){
                            if(mediateUserReplaceCaseBtn[j].id === caseReplaceKey){
                                mediateUserData[i].caseBtn?.unshift(mediateUserReplaceCaseBtn[j].caseBtn);
                            }
                        }

                        caseData = mediateUserData[i];
                    }
                }else{
                    if(mediateUserData[i].id === caseKey){
                        caseData = mediateUserData[i];
                    }
                }
            }

        }
        // ⅳ.CaseStatusがS9A9B9C9（網羅外ステータス）の場合、画面ヘッダ部に以下メッセージを表示する。
        // 案件のステータスが存在しません。
        if(caseInfo.caseStatus === 'S9A9B9C9'){
            caseData = caseStatusMessage;
        } 
    }

    // アクション caseBtn
    const [caseBtnEl, setCaseBtnEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(caseBtnEl);
    const handleClickCaseBtn = (event: React.MouseEvent<HTMLElement>) => {
        setCaseBtnEl(event.currentTarget);
    };
    const handleCloseCaseBtn = () => {
        setCaseBtnEl(null);
    };

    // snackbar Popupボタンの選択　フラグ
    const [OpenSnackbarMessageFlg, setOpenSnackbarMessageFlg] = useState('');

    // snakckbar回调
    const handleParameterChange = () => {
        setOpenSnackbarMessageFlg(MESSAGE_NULLFLG);
    };

//S26&S27----------------------------------------------------------------start
    // S26&S27専用 Popupの開ー閉　フラグ
    const [isModalOpen26, setIsModalOpen26] = useState(false);
    const [isModalOpen27, setIsModalOpen27] = useState(false);

    // S26&S27専用 Dialog
    function OpenDialogS26S27 () { 
        const platformId = caseId;
        const userstatus = positionFlg.toString();

        // S26 ポップアップの閉　flg:Popup画面ボタンの値
        function closeModal26  (flg:string)  {           
            setIsModalOpen26(false);
            setOpenSnackbarMessageFlg(flg);
        };

        // S27 ポップアップの閉　flg:Popup画面ボタンの値
        function closeModal27  (flg:string)  {
            setOpenSnackbarMessageFlg(flg);
            setIsModalOpen27(false)
        };
        return (
            <div>
                <div> 
                    {isModalOpen26 && <Popup26 platformId={platformId} userStatus={userstatus} s26DiologOpen = {true} closeModal={closeModal26} />} 
                    {/* {Popup画面に押下ボタンの判断：0キャンセル、1延長 } */}
                    {OpenSnackbarMessageFlg === SNACKS26_2 && <SnackbarDisplay OpenSnackbarMessageFlg={OpenSnackbarMessageFlg}  
                        onMessageChange={handleParameterChange}/>} 
                </div>
                <div>
                    {isModalOpen27 && <Popup27 platformId={platformId} userStatus={userstatus} s27DiologOpen = {true} closeModal={closeModal27} />} 
                    {/* {Popup画面に押下ボタンの判断：2キャンセル、3却下、4承認} */}
                    {OpenSnackbarMessageFlg === SNACKS27_2 && <SnackbarDisplay OpenSnackbarMessageFlg={OpenSnackbarMessageFlg}  
                        onMessageChange={handleParameterChange}/>} 
                    {OpenSnackbarMessageFlg === SNACKS27_3 && <SnackbarDisplay OpenSnackbarMessageFlg={OpenSnackbarMessageFlg}  
                        onMessageChange={handleParameterChange}/>} 
                </div>
            </div>
        );
    };
//S26&S27----------------------------------------------------------------end

//S17----------------------------------------------------------------start
    // S17専用
    // 定义变量
    const [openS17, setOpenS17] = React.useState(false);//控制pop开关5
    const [next, setNext] = React.useState(true);//控制第几个小画面
    const [S17_2_checkBox, setS17_2_checkBox] = React.useState<string[]>([]);//第一个小画面的checkbox的值
    const [S17_2_textArea, setS17_2_textArea] = React.useState('');//第一个小画面的textarea的值
    const [isPopHidden, setIsPopHidden] = React.useState(true);//pop中的内容是否隐藏

    // S17専用 Popup表示
    function S17() {
        //关闭按钮的点击事件
        const handleClose = () => {
            setOpenS17(false);
            setNext(true);
        };
        //画面1的回调
        const handleReturnClick1 = (val1: boolean, val2: boolean, val3: string[], val4: string) => {
            setOpenS17(val1)
            setNext(val2)
            setS17_2_checkBox(val3)
            setS17_2_textArea(val4)
        }
        //画面2的回调
        const handleReturnClick2 = (val1: boolean, val2: boolean, val3: string) => {
            setOpenS17(val1)
            setNext(val2)
            setOpenSnackbarMessageFlg(val3)
        }

        return (
            <React.Fragment>
                <div >
                    {OpenSnackbarMessageFlg === SNACKS19_1 && <SnackbarDisplay OpenSnackbarMessageFlg={OpenSnackbarMessageFlg}
                        onMessageChange={handleParameterChange} />}
                    {OpenSnackbarMessageFlg === SNACKS19_2 && <SnackbarDisplay OpenSnackbarMessageFlg={OpenSnackbarMessageFlg}
                        onMessageChange={handleParameterChange} />}
                </div>
                <Dialog
                    open={openS17}
                    onClose={handleClose}
                    sx={{ '& .MuiDialog-paper': { width: 1066, height: 555 } }}
                    maxWidth={'lg'}
                >
                    <div>
                        <DialogTitle sx={{ m: 0, p: 1 }} id="customized-dialog-title" style={{marginLeft: 10,marginTop: 5}}>
                            和解案の作成{next ? '(1/2)' : '(2/2)'}
                        </DialogTitle>
                        <IconButton
                            aria-label="Minimize"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 25,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <MinimizeIcon />
                        </IconButton>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 0,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div >
                        <div hidden={isPopHidden} >
                            {next ? (<S17_1 onChildValueChange={handleReturnClick1} />) : (<S17_2 prop1={S17_2_checkBox} prop2={S17_2_textArea} onChildValueChange={handleReturnClick2} />)}
                        </div>
                    </div>
                </Dialog>
            </React.Fragment>
        );
    }
    //S17----------------------------------------------------------------end

//S20----------------------------------------------------------------start
    // S20専用
    // 定义变量
    const [openS20, setOpenS20] = useState(false);
    const [stateS20, setStateS20] = useState(true);
    const [isAgreeS20, setIsAgreeS20] = useState(false);
    // S20専用 Dialog
    function OpenDialogS20() {
        const handleReturnClick = (val1: boolean,val2: string,val3: boolean,val4: boolean) => {
            setOpenS20(val1);
            setOpenSnackbarMessageFlg(val2);
            setOpenS17(val3);
            setIsPopHidden(false);
            if (isAgreeS20 !== true){
                setIsAgreeS20(val4);
            }
        }
        return (
            <div>
                <div>
                    {openS20 && <S20 props1={true} props2={stateS20} props3={isAgreeS20} onReturnClick={handleReturnClick}/>}
                    {OpenSnackbarMessageFlg === BUTTONS20_1 && <SnackbarDisplay OpenSnackbarMessageFlg={OpenSnackbarMessageFlg}
                        onMessageChange={handleParameterChange} />}
                    {OpenSnackbarMessageFlg === BUTTONS20_2 && <SnackbarDisplay OpenSnackbarMessageFlg={OpenSnackbarMessageFlg}
                        onMessageChange={handleParameterChange} />}
                </div>
            </div>
        );
    };
//S20----------------------------------------------------------------end

//S22----------------------------------------------------------------start
    const [openS22, setOpenS22] = React.useState(false);

    const handleCloseS22 = () => {
        setOpenS22(false);
    };
    const handleMini = () => {
        setOpenS22(false);
    }
//S22----------------------------------------------------------------end

//S24----------------------------------------------------------------START
    function handleReturnClick1( flg1: string) {
        if(flg1!=='1'){
            setOpenSnackbarMessageFlg(flg1);
            setOpenS22(false);
        }
    }
//S24----------------------------------------------------------------END

//S25----------------------------------------------------------------START
    const [openS25, setOpenS25] = React.useState(false);
    function S25DilogOpenFlg(flg:string){
        if (flg!=='1'){
            setOpenSnackbarMessageFlg(flg);  
        }
        setOpenS25(false)
    }
//S25----------------------------------------------------------------END

//S28&S29----------------------------------------------------------------start
    // S28「調停移行」画面表示された
    const [openMedMigration, setOpenMedMigration] = React.useState(false);
    // S29「期日延長」画面を表示する
    const [mediateDateExtensionOpen, setMediateDateExtensionOpen] = React.useState(false);
    function OpenDialogS28S29() {
        function closeMedMigration(flg: string) {
            //S28画面传过来flg值
            setOpenSnackbarMessageFlg(flg);
            //dialog 关闭
            setOpenMedMigration(false);
        }

        function closeMediateDateExtension(flg: string) {
            //S29画面传过来flg值
            setOpenSnackbarMessageFlg(flg);
            //dialog 关闭
            setMediateDateExtensionOpen(false);
        }
        return (
            <div>
                <div>
                    {openMedMigration && <MedMigration closeDialog={closeMedMigration} medMigrationOpen={true} />}
                    {OpenSnackbarMessageFlg === SNACK_MESSAGE_S28 && <SnackbarDisplay OpenSnackbarMessageFlg={OpenSnackbarMessageFlg}
                        onMessageChange={handleParameterChange}
                    />}
                </div>
                <div>
                    {mediateDateExtensionOpen && <MedDateExtension closeDialog={closeMediateDateExtension} mediateDateExtensionOpen={true} />}
                    {OpenSnackbarMessageFlg === SNACK_MESSAGE_S29 && <SnackbarDisplay OpenSnackbarMessageFlg={OpenSnackbarMessageFlg}
                        onMessageChange={handleParameterChange}
                    />}
                </div>
            </div>
        )
    }
//S28&S29----------------------------------------------------------------end

//S30&S32----------------------------------------------------------------start
    // 状態値と状態を更新するための関数を定義する
    // S32_反訴取り下げ画面
    const [openReplyTrsg, setOpenReplyTrsg] = React.useState(false);
    // S30_手続き中止画面
    const [openUsesaseCancel, setOpenUsesaseCancel] = React.useState(false);
    function OpenDialogS30S32() {
        function closeReplyTrsg(flg: string) {
            // S32_反訴取り下げ画面からのflg値を受信する
            setOpenSnackbarMessageFlg(flg);
            // 状態を更新するための関数を利用して、Dailogを閉じる。
            setOpenReplyTrsg(false);
        }
    
        // 状態を更新するための関数を利用して、Dailogを閉じる。
        function closeUsesaseCancel() {
            // S30_手続き中止画面からのflg値を受信する
            setOpenUsesaseCancel(false);
        }
    
        return (
            <div>
                <div>
                    {openReplyTrsg && <ReplyTrsg closeDialog={closeReplyTrsg} replyTrsgOpen={true} />}
                    {OpenSnackbarMessageFlg === SNACK_MESSAGE_S32 && <SnackbarDisplay OpenSnackbarMessageFlg={OpenSnackbarMessageFlg}
                        onMessageChange={handleParameterChange}
                    />}
                </div>
                <div>
                    {openUsesaseCancel && <UsesaseCancel closeDialog={closeUsesaseCancel} usesaseCancelOpen={true} 
                    />}
                </div>
            </div>
        )
    }
//S30&S32----------------------------------------------------------------end 

//S33----------------------------------------------------------------start
    // 控制Dialog用
    const [openNamAcceptation, setOpenNamAcceptation] = React.useState(false);
    function handleSelectionClickOpen() {
        setOpenNamAcceptation(true);
    }
    function closeNamAcceptation(flg: string) {
        // 关闭S33的Dialog
        setOpenNamAcceptation(false);
        if (flg !== 'other') {
            setOpenSnackbarMessageFlg(flg);
        }
    }
//S33----------------------------------------------------------------end    

    // アクション内操作ボタン onClick事件
    const handleClickMenuItem = (event: React.MouseEvent<HTMLElement>) => {
        // console.log(event.currentTarget.id);
        setCaseBtnEl(null);

        // 1.ポップアップ詳細
        // S04-start
        if(event.currentTarget.id === '1'){
            // 申立ての取り下げ 取り下げのポップアップ
            setIsOpenProposalTakeDown(true);
        }
        else if(event.currentTarget.id === '6'){
            // 個別やりとりの承諾依頼を確認 
            setIsOpenPromiseVerify(true);
        }
        else if(event.currentTarget.id === '7'){
            // 参加表明する 
            // API「参加済状態変更」
            // 上記1.取得したCaseStageが0（回答）　かつ　CaseStatusが0000（申立後-参加待ち）の場合、以下の処理を実行
            // ケースの状態を申立後-参加待ち→申立後-参加済-回答待ちへ変更する
            const caseStatus = '0001'
            const paramPost =  [caseStatus];
            console.log('参加済状態変更' + paramPost);

            setIsOpenJoinShow(true);
        }
        else if(event.currentTarget.id === '9'){
            // 指名を辞退する 
            setIsOpenDismissByName(true);
        }
        else if(event.currentTarget.id === '10'){
            // 調停人を辞任する 
            setIsOpenDismissByMediate(true);
        }
        // S04-end

        else if(event.currentTarget.id === '2'){
            // 調停を行う S28_調停移行画面
            setOpenMedMigration(true)
        }else if(event.currentTarget.id==='3'){
            // 期日の延長を希望する S26_期日延長画面
            // ポップアップの開
            setIsModalOpen26(true);
        }else if(event.currentTarget.id==='4'){
            // 期日延長の承諾依頼を確認 S27_期日延長承認画面
            // ポップアップの開
            setIsModalOpen27(true);
        }else if(event.currentTarget.id === '5'){
            // この申立ての手続きを中止する S30_手続き中止画面
            setOpenUsesaseCancel(true);
        }else if(event.currentTarget.id === '8'){
            // 反訴の取り下げ S32_反訴取り下げ画面
            setOpenReplyTrsg(true);
        }else if(event.currentTarget.id === '11'){
            // 期日を延長する S29_調停期日延長画面
            setMediateDateExtensionOpen(true)
        }
        // 2.遷移先詳細
        if(event.currentTarget.id === '21'){
            // 反訴へ回答する S14_反訴回答登録画面
            navigate('/S14')
        }else if(event.currentTarget.id === '22'){
            // 和解案を編集する S17_和解案作成画面
            // ポップアップの開
            setOpenS17(true);
            setNext(true);
            setIsPopHidden(false)
        }else if(event.currentTarget.id === '23'){
            // 和解案を確認する S20_和解案確認画面
            // ポップアップの開
            setOpenS20(true);
            setStateS20(true);
        }else if(event.currentTarget.id === '24'){
            // 和解合意書を確認する S20_和解案確認画面
            // ポップアップの開
            setOpenS20(true);
            setStateS20(false);
        }else if(event.currentTarget.id ==='25'){
            // 和解案を作成する S17_和解案作成画面
            // ポップアップの開
            setOpenS17(true);
            setNext(true);
            setIsPopHidden(false)
        }else if(event.currentTarget.id === '26'){
            // 調停人を確認する S21_調停人確認画面
            navigate('/S21',{state:{caseId:caseId}})
        }else if(event.currentTarget.id === '27'){
            // 調停案を確認する S25_調停案合意画面
            setOpenS25(true);
        }else if(event.currentTarget.id === '28'){
            // 和解合意書を確認する S25_調停案合意画面
            setOpenS25(true);
        }else if(event.currentTarget.id === '29'){
            // 回答する S11_回答登録画面 
            navigate('/S11')
        }else if(event.currentTarget.id === '30'){
            // 指名を受理する S33_指名受理画面
            handleSelectionClickOpen();
        }else if(event.currentTarget.id === '31'){
            // 調停案を作成する S22_調停案作成画面
            setOpenS22(true);
        }else if(event.currentTarget.id === '32'){
            // 調停案を編集する S22_調停案作成画面
            setOpenS22(true);
        }

    };

    // アクション内操作ボタン取得
    function MenuItems(){
        if(caseData){
          if(caseData.caseBtn === null || caseData.caseBtn === undefined){
            return null;
          }else{
            return (
                <Menu
                    id="fade-menu"
                    MenuListProps={{'aria-labelledby': 'fade-button',}}
                    anchorEl={caseBtnEl}
                    open={open}
                    onClose={handleCloseCaseBtn}
                    >
                    {caseData.caseBtn.map((item:any) => (
                        <MenuItem className="menuItemBtn" sx={{minWidth: 150}} id={item.id} key={item.id} onClick={handleClickMenuItem}>{item.btnName}</MenuItem>
                    ))}
                </Menu>
            )
          }
        }
    }

    // Tabs 选中的value值
    const [value, setValue] = React.useState('1');
    const navigate = useNavigate();

    // tabs视图切换
    const handleTabsChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        // console.log(newValue);

        if(newValue === '1'){
            navigate('/S04',{state:{caseId:caseId,positionFlg:positionFlg}});
        }
        if(newValue === '2'){
            navigate('/S04/S05',{state:{caseId:caseId,positionFlg:positionFlg}});
        }
        if(newValue === '3'){
            navigate('/S04/S06',{state:{caseId:caseId,positionFlg:positionFlg}});
        }
        if(newValue === '4'){
            navigate('/S04/S07',{state:{caseId:caseId,positionFlg:positionFlg}});
        }
    };

    // 画面ヘッダ
    // 画面ヘッダ部className：不同立场显示不同背景色
    let mosDetailHeaderArea = "mosDetailHeaderArea" + positionFlg;
    // 左側ボタンcolor：不同立场显示不同背景色
    let leftBtnColor:any;
    if(positionFlg === '1'){
        leftBtnColor = "success";
    }else if(positionFlg === '2'){
        leftBtnColor = "primary";
    }else if(positionFlg === '3'){
        leftBtnColor = "warning";
    }

    // 左側ボタン onClick
    const handleClickOpen = () => {
        // 1.ポップアップ詳細
        // S04-start
        if(caseData.leftBtn.id === '6'){
            // 個別やりとりの承諾依頼を確認 
            setIsOpenPromiseVerify(true);
        }
        else if(caseData.leftBtn.id === '7'){
            // 参加表明する 
            // API「参加済状態変更」
            // 上記1.取得したCaseStageが0（回答）　かつ　CaseStatusが0000（申立後-参加待ち）の場合、以下の処理を実行
            // ケースの状態を申立後-参加待ち→申立後-参加済-回答待ちへ変更する
            const caseStatus = '0001'
            const paramPost =  [caseStatus];
            console.log('参加済状態変更' + paramPost);

            setIsOpenJoinShow(true);
        }
        // S04-end
        // S27-start
        else if(caseData.leftBtn.id === '4'){
            // 期日延長の承諾依頼を確認 S27_期日延長承認画面
            setIsModalOpen27(true);
        }
        // S27-end
        // 2.遷移先詳細
        if(caseData.leftBtn.id === '21'){
            // 反訴へ回答する S14_反訴回答登録画面
            navigate('/S14')
        }else if(caseData.leftBtn.id === '22'){
            // 和解案を編集する S17_和解案作成画面
            // ポップアップの開
            setOpenS17(true);
            setNext(true);
            setIsPopHidden(false)
        }else if(caseData.leftBtn.id === '23'){
            // 和解案を確認する S20_和解案確認画面
            // ポップアップの開
            setOpenS20(true);
            setStateS20(true);
        }else if(caseData.leftBtn.id === '24'){
            // 和解合意書を確認する S20_和解案確認画面
            // ポップアップの開
            setOpenS20(true);
            setStateS20(false);
        }else if(caseData.leftBtn.id === '25'){
            // 和解案を作成する S17_和解案作成画面
            // ポップアップの開
            setOpenS17(true);
            setNext(true);
            setIsPopHidden(false)
        }else if(caseData.leftBtn.id === '26'){
            // 調停人を確認する S21_調停人確認画面
            navigate('/S21',{state:{caseId:caseId}})
        }else if(caseData.leftBtn.id === '27'){
            // 調停案を確認する S25_調停案合意画面
            setOpenS25(true);
        }else if(caseData.leftBtn.id === '28'){
            // 和解合意書を確認する S25_調停案合意画面
            setOpenS25(true);
        }else if(caseData.leftBtn.id === '29'){
            // 回答する S11_回答登録画面 
            navigate('/S11')
        }else if(caseData.leftBtn.id === '30'){
            // 指名を受理する S33_指名受理画面
            handleSelectionClickOpen();
        }else if(caseData.leftBtn.id === '31'){
            // 調停案を作成する S22_調停案作成画面
            setOpenS22(true);
        }else if(caseData.leftBtn.id === '32'){
            // 調停案を編集する S22_調停案作成画面
            setOpenS22(true);
        }
    };

    // 画面ヘッダ部項目（メッセージ、左側ボタン、期日）の設定
    function mosDetailHeader(){
        // メッセージ
        function textMessageLab(){
            if(caseData.textMessage === null || caseData.textMessage === undefined){
                return null;
            }else{
                return (
                    <div className="textMessageArea">
                        <label id="textMessage" dangerouslySetInnerHTML={{ __html: caseData.textMessage }} />
                    </div>
                )
            }
        }
        // 期日
        function dueDateLab(){
            if(caseData.dueDate === null || caseData.dueDate === undefined){
                return null;
            }else{
                return (
                    <div className="dueDateArea">
                        <label id="dueDate">期日：{caseData.dueDate}</label>
                    </div>
                )
            }
        }
        // 左側ボタン
        function bntAction(){
            if(caseData.leftBtn === null || caseData.leftBtn === undefined){
                return null;
            }else{
                return (
                    <div className="bntArea">
                        <Button sx={{height: 40}} variant="contained" onClick={handleClickOpen}
                            value={caseData.leftBtn.id} color={leftBtnColor}>
                        {caseData.leftBtn.btnName}
                        </Button>
                        {draftFlg && <Chip className="saveDiv-color" sx={{ height: 20, width: 80}} icon={<EditOutlinedIcon sx={{ fontSize: 15}} /> } color="error" label="下書き中" />}
                    </div>
                )
            }
        }

        if(caseData){
            return (
                <div className={mosDetailHeaderArea}>
                    <div className="stepIconsArea">
                        <Steppers stage={caseInfo.stage} positionFlg={positionFlg} leftBtnColor={leftBtnColor} />
                    </div>
                    {textMessageLab()}
                    {dueDateLab()}
                    {bntAction()}
                </div>
            )
        }else{
            // console.log('mostHeaderData Not found');
            return (
                <div className={mosDetailHeaderArea}>
                    <div className="stepIconsArea">
                        <Steppers stage={caseInfo.stage} positionFlg={positionFlg} leftBtnColor={leftBtnColor} />
                    </div>
                </div>
            )  
        }        
    }

    // ボタンに下書きバッジを表示
    // 戻り項目.draftFlgに0（下書き保存データなし）の場合
    function draftFlgModal(flg: string){
        // 戻り項目.draftFlgが1（下書き保存データあり）の場合
        if(flg === '1'){
            setDraftFlg(true);
        }
    }

    // S04専用 Dialogフラグ
    // 申立ての取り下げ
    // 取り下げのポップアップ　フラグ
    const [isOpenProposalTakeDown, setIsOpenProposalTakeDown] = useState(false);

    // 個別やりとりの承諾依頼を確認
    // 個別やりとりの承諾依頼を確認プップアップ　フラグ
    const [isOpenPromiseVerify, setIsOpenPromiseVerify] = useState(false);

    // 参加表明する
    // 調停人辞任プップアップ　フラグ
    const [isOpenJoinShow, setIsOpenJoinShow] = useState(false);

    // 指名を辞退する
    // 指名辞退プップアップ　フラグ
    const [isOpenDismissByName, setIsOpenDismissByName] = useState(false);

    // 調停人を辞任する
    // 調停人辞任プップアップ　フラグ
    const [isOpenDismissByMediate, setIsOpenDismissByMediate] = useState(false);

    // チュートリアルポップアップを表示
    const [isOpenShowTuritor1, setIsOpenShowTuritor1] = useState(false);
    const [isOpenShowTuritor2, setIsOpenShowTuritor2] = useState(false);
    const [isOpenShowTuritor3, setIsOpenShowTuritor3] = useState(false);

    // S04専用 Dialog
    function OpenCommonDialog(){
        //  取り下げのポップアップの閉　flg:Dialog画面ボタンの値
        function CloseModalProposalTakeDown (flg:string)  {       
            setOpenSnackbarMessageFlg(flg);
            setIsOpenProposalTakeDown(false);
        };

        //  個別やりとりの承諾依頼を確認プップアップの閉　flg:Dialog画面ボタンの値
        function CloseModalPromiseVerify (flg:string)  {       
            setOpenSnackbarMessageFlg(flg);
            setIsOpenPromiseVerify(false);
        };

        //  相手方として参加を表明しましたポップアップの閉
        function CloseModalJoinShow ()  {       
            setIsOpenJoinShow(false);
        };

        //  指名辞退プップアップの閉　flg:Dialog画面ボタンの値
        function CloseModalDismissByName (flg:string)  {       
            setOpenSnackbarMessageFlg(flg);
            setIsOpenDismissByName(false);
        };
        
        //  調停人辞任プップアップの閉　flg:Dialog画面ボタンの値
        function CloseModalDismissByMediate (flg:string)  {       
            setOpenSnackbarMessageFlg(flg);
            setIsOpenDismissByMediate(false);
        };

        // チュートリアルポップアップを表示の閉
        function CloseModalShowTuritor1() {
            setIsOpenShowTuritor1(false);
        };
        function CloseModalShowTuritor2() {
            setIsOpenShowTuritor2(false);
        };
        function CloseModalShowTuritor3() {
            setIsOpenShowTuritor3(false);
        };

        return (   
            <div>
                <div> 
                    {/* 申立ての取り下げ */}
                    {isOpenProposalTakeDown && <ProposalTakeDownDialog leftBtnColor={leftBtnColor} isOpenProposalTakeDown={isOpenProposalTakeDown} closeModal={CloseModalProposalTakeDown} />} 
                    {/* {取り下げのポップアップに押下ボタンの判断：1.いいえ、2.はい} */}
                    {OpenSnackbarMessageFlg === PROPOSALTAKEDOWN_2 && <SnackbarDisplay OpenSnackbarMessageFlg={OpenSnackbarMessageFlg} onMessageChange={handleParameterChange} />} 
                </div>
                <div> 
                    {/* 個別やりとりの承諾依頼を確認 */}
                    {isOpenPromiseVerify && <PromiseVerifyDialog leftBtnColor={leftBtnColor} isOpenPromiseVerify={isOpenPromiseVerify} closeModal={CloseModalPromiseVerify} />} 
                    {/* {個別やりとりの承諾依頼を確認プップアップに押下ボタンの判断：1.却下する、2.承諾する} */}
                    {OpenSnackbarMessageFlg === PROMISEVERIFY_2 && <SnackbarDisplay OpenSnackbarMessageFlg={OpenSnackbarMessageFlg} onMessageChange={handleParameterChange} />} 
                </div>
                <div> 
                    {/* 参加表明する */}
                    {isOpenJoinShow && <JoinShowDialog caseId={caseId} leftBtnColor={leftBtnColor} isOpenJoinShow={isOpenJoinShow} closeModal={CloseModalJoinShow} />} 
                    {/* {相手方として参加を表明しましたポップアップに押下ボタンの判断：1.今はしない、2.回答する S11_回答登録画面} */}
                </div>
                <div> 
                    {/* 指名を辞退する */}
                    {isOpenDismissByName && <DismissByNameDialog leftBtnColor={leftBtnColor} isOpenDismissByName={isOpenDismissByName} closeModal={CloseModalDismissByName} />} 
                    {/* {指名辞退プップアップに押下ボタンの判断：1.いいえ、2.はい} */}
                    {OpenSnackbarMessageFlg === DISMISSBYNAME_2 && <SnackbarDisplay OpenSnackbarMessageFlg={OpenSnackbarMessageFlg} onMessageChange={handleParameterChange} />} 
                </div>
                <div> 
                    {/* 調停人を辞任する */}
                    {isOpenDismissByMediate && <DismissByMediateDialog sessionData={sessionData} leftBtnColor={leftBtnColor} isOpenDismissByMediate={isOpenDismissByMediate} closeModal={CloseModalDismissByMediate} />} 
                    {/* {調停人辞任プップアップに押下ボタンの判断：1.いいえ、2.はい} */}
                    {OpenSnackbarMessageFlg === DISMISSBYMEDIATE_2 && <SnackbarDisplay OpenSnackbarMessageFlg={OpenSnackbarMessageFlg} onMessageChange={handleParameterChange} />} 
                </div>
                <div>
                    {/* チュートリアルポップアップ表示制御 */}
                    {isOpenShowTuritor1 && <ShowTuritor1Dialog leftBtnColor={leftBtnColor} isOpenShowTuritor1={isOpenShowTuritor1} closeModal={CloseModalShowTuritor1} />}
                    {isOpenShowTuritor2 && <ShowTuritor2Dialog leftBtnColor={leftBtnColor} isOpenShowTuritor2={isOpenShowTuritor2} closeModal={CloseModalShowTuritor2} />}
                    {isOpenShowTuritor3 && <ShowTuritor3Dialog leftBtnColor={leftBtnColor} isOpenShowTuritor3={isOpenShowTuritor3} closeModal={CloseModalShowTuritor3} />}
                </div>
            </div>
        )
    }

    if(caseInfo){
        // 渲染S04组件
        return (
            <div className="S04" id="S04">
                {/* 渲染PageHeader */}
                <PageHeader pageFlg="0" />
                {/* 渲染组件S26&S27的dialog */}
                <OpenDialogS26S27 />
                {/* 渲染组件S17的dialog */}
                <S17 />
                {/* 渲染组件S20的dialog */}
                <OpenDialogS20 />
                {/* 渲染组件S22&S24&S25 */}
                {/* 渲染组件S22 */}
                {openS22 &&<S22  S22Open={openS22} onChildValueChange={handleReturnClick1} handleCloseS22={handleCloseS22} handleMini={handleMini}/>}
                {/* 渲染组件S24 */}
                {OpenSnackbarMessageFlg === SNACKS24_1 && <SnackbarDisplay OpenSnackbarMessageFlg={OpenSnackbarMessageFlg} onMessageChange={handleParameterChange}/>}
                {/* 渲染组件S25的dialog */}
                {openS25 && <MediationsAgree medOpen25={openS25} SessionEmail={'1'} mediaFlag25={S25DilogOpenFlg}  />}
                {OpenSnackbarMessageFlg === SNACKS25_1 && <SnackbarDisplay OpenSnackbarMessageFlg={OpenSnackbarMessageFlg} onMessageChange={handleParameterChange}/>}                    {OpenSnackbarMessageFlg === SNACKS25_2 && <SnackbarDisplay OpenSnackbarMessageFlg={OpenSnackbarMessageFlg} onMessageChange={handleParameterChange}/>}
                {/* 渲染组件S28&S29的dialog */}
                <OpenDialogS28S29 />
                {/* 渲染组件S30&S32的dialog */}
                <OpenDialogS30S32 />
                {/* 渲染组件S33的dialog START */}
                {openNamAcceptation && <NamAccept ationOpen={true} closeDialog={closeNamAcceptation} />}
                {OpenSnackbarMessageFlg === SNACKS33_1 && <SnackbarDisplay OpenSnackbarMessageFlg={OpenSnackbarMessageFlg} onMessageChange={handleParameterChange}/>}
                {OpenSnackbarMessageFlg === SNACKS33_2 && <SnackbarDisplay OpenSnackbarMessageFlg={OpenSnackbarMessageFlg} onMessageChange={handleParameterChange}/>}
                {/* 渲染组件S33的dialog END */}
                {/* 渲染组件S34 */}
                {S34Flg === 0 ? <div><S34_1_1 /></div> : null}
                {S34Flg === 1 ? <div><S34_2_1 /></div> : null}
                {/* S04専用 Dialog */}
                <OpenCommonDialog />
                {/* 案件区域 */}
                <div className="caseArea">
                    {/* 案件名Title区域 */}
                    <div className="caseTitleArea">
                        {/* 渲染caseTitle组件：案件タイトルの設定 */}
                        {caseTitleLab()}
                    </div>
                    {/* アクション内操作ボタン区域 */}
                    <Box className="caseSelectArea">
                        <Button
                            id="demo-customized-button"
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="outlined"
                            disableElevation
                            onClick={handleClickCaseBtn}
                            endIcon={<KeyboardArrowDownIcon />}
                            color="inherit"
                            className='caseBtn'>
                            アクション
                        </Button>
                        {/* 渲染MenuItems组件：アクションボタンの設定 */}
                        {MenuItems()}
                    </Box>
                </div>
                {/* Tabs组件 */}
                <Box sx={{ typography: 'body1' }} className="tabsArea">
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleTabsChange} aria-label="lab API tabs example">
                                <Tab icon={<DescriptionOutlinedIcon />} iconPosition="start" label="概要" value="1" />
                                <Tab icon={<CommentOutlinedIcon />} iconPosition="start" label="メッセージ" value="2" />
                                <Tab icon={<HistoryOutlinedIcon />} iconPosition="start" label="アクション履歴" value="3" />
                                <Tab icon={<AttachFileOutlinedIcon />} iconPosition="start" label="ファイル" value="4" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            {/* 各フェーズの基本の画面表示を行う */}
                            <div className="mosDetailArea">
                                {/* 渲染mosDetailHeader组件：画面ヘッダ部項目（メッセージ、左側ボタン、期日）の設定 */}
                                {mosDetailHeader()}
                                <div className="mosDetailMainArea">
                                    {/* 和解の内容 */}
                                    <ReconciliateContent caseId={caseId} />

                                    {/* 調停の内容 */}
                                    <MediateContent caseId={caseId} />

                                    {/* 申立ての内容 */}
                                    <ProposalContent caseId={caseId} />

                                    {/* 回答の内容 */}
                                    <AnswerContent caseId={caseId} positionFlg={positionFlg} draftFlgModal={draftFlgModal}/>

                                    {/* 反訴への回答の内容 */}
                                    <ClaimRepliesContent caseId={caseId} positionFlg={positionFlg} draftFlgModal={draftFlgModal} />
                                    
                                    {/* 関係者 */}
                                    <RelationshipContent  caseId={caseId} />

                                </div>              
                            </div>
                        </TabPanel>
                        <TabPanel value="2"><S05 /></TabPanel>
                        <TabPanel value="3"><S06 /></TabPanel>
                        <TabPanel value="4"><MosFileList /></TabPanel>
                    </TabContext>
                </Box>
            </div>
        ); 
    }else{
        return (
            <div className="S04" id="S04">
                {loading === true ?  
                    <Box sx={{ display: 'flex',alignItems: 'center',justifyContent: 'center',minHeight: '500px'}}>< CircularProgress/></Box>
                    :
                    <div>
                        {/* 渲染PageHeader */}
                        <PageHeader pageFlg="0" />
                        <Box sx={{ display: 'flex',alignItems: 'center',justifyContent: 'center',minHeight: '500px'}}>
                            <p style={{color:'red', fontSize:50}}>案件が存在しません</p>
                        </Box>
                    </div>
                }
            </div>
        )
    }
}

export default S04;