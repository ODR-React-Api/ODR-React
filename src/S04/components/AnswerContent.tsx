import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import axios from "axios";
import "../mocks/GetAnswerData.js";
import {Link} from "@mui/material";
// common
import FileContent from '../../common/utils/FileContent';
import NewDiv72hModal from '../../common/utils/NewDiv72hModal';

// 回答の内容の表示
function AnswerContent(props: {caseId: string, positionFlg: string, draftFlgModal: (flg:string) => void }) {
    // 案件ID 立場フラグ
    const { caseId, positionFlg, draftFlgModal} = props;        // S4画面から取得パラメータ

    // 回答の内容Data
    const [answerData, setAnswerData] = useState<any>(null);
    // API_回答の内容取得
    useEffect(() => {
        // 副作用函数
        // 在组件渲染时执行
        // 可以进行副作用操作
        axios.get('/GetAnswerData')
        .then((response) => {
            response.data.data.forEach((item: any)  => {
                if(caseId === item.caseId){
                    setAnswerData(item);
                    if(item.draftFlg === 1 && positionFlg === '2'){
                        // ボタンに下書きバッジを表示
                        draftFlgModal('1');
                    }
                }
            })
        }).catch((error) => {
            console.log(error);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, []);

    // 回答の種類
    function replyTypeContent(){
        if(answerData.replyType === null || answerData.replyType === undefined){
            return null;
        }else{
            return (
                <Grid container>
                    <Grid className="contentFont" item xs={4}>回答の種類：</Grid>
                    <Grid className="contentFont" item xs={8}>{answerData.replyType}</Grid>
                </Grid>
            )
        }
    }

    // 回答の内容
    function replyContextContent(){
        if(answerData.replyContext === null || answerData.replyContext === undefined){
            return null;
        }else{
            return (
                <Grid container>
                    <Grid className="contentFont" item xs={4}>回答の内容：</Grid>
                    <Grid className="contentFont" item xs={8}>{answerData.replyContext}</Grid>
                </Grid>
            )
        }
    }
    
    // 反訴の有無
    function haveCounterClaimContent(){
        if(answerData.haveCounterClaim === null || answerData.haveCounterClaim === undefined){
            return null;
        }else{
            if(answerData.haveCounterClaim){
                return (
                    <Grid container>
                        <Grid className="contentFont" item xs={4}>反訴の有無：</Grid>
                        <Grid className="contentFont" item xs={8}>反訴あり</Grid>
                    </Grid>
                )
            }else{
                return (
                    <Grid container>
                        <Grid className="contentFont" item xs={4}>反訴の有無：</Grid>
                        <Grid className="contentFont" item xs={8}>反訴なし</Grid>
                    </Grid>
                )
            }

        }
    }

    // 反訴の内容
    function counterClaimContextContent(){
        if(answerData.counterClaimContext === null || answerData.counterClaimContext === undefined){
            return null;
        }else{
            return (
                <Grid container>
                    <Grid className="contentFont" item xs={4}>反訴の内容：</Grid>
                    <Grid className="contentFont" item xs={8}>{answerData.counterClaimContext}</Grid>
                </Grid>
            )
        }
    }

    // 反訴の添付資料
    function counterFileContent(){
        function counterFileListContent(){
            // 反訴の添付資料取得なしの場合「なし」と表示する
            if(answerData.counterFile === null || answerData.counterFile === undefined){
                return <label>なし</label>
            }else{
                // 反訴の添付資料複数取得場合、1ファイル1行で表示する。
                return (
                    answerData.counterFile.map((item:any, index:any) => (
                        // 反訴の添付資料の表示名はFileName、リンク先はFileUrlとなる
                        <Link className='linkFileUrl' href={item.fileUrl} key={index}>{item.fileName}<br /></Link>
                    ))
                )
            }
        }
    
        return (
            <Grid container>
                <Grid className="contentFont" item xs={4}>反訴の添付資料：</Grid>
                <Grid className="contentFont" item xs={8}>{counterFileListContent()}</Grid>
            </Grid>
        )
    }

    if(answerData){
        if(answerData.draftFlg === 1 && positionFlg === '2'){
            return (
                <div className="answerContentArea mosContentDiv">
                    <div className="answerContentTitleArea">
                        <span className="titleContentDiv">回答の内容</span>
                        <span className="newDiv-color">下書き中</span>
                    </div>
                    <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                        <Grid className="contentFont" item xs={4}>回答の内容が登録されていません。</Grid>
                    </Grid>
                </div>                       
            )
        }
        if(answerData.draftFlg === 0){
            if(answerData.getDataFlg){
                return (
                    <div className="answerContentArea mosContentDiv">
                        <div className="answerContentTitleArea">
                            <span className="titleContentDiv">回答の内容</span>
                            {/* 「NEW」マーク表示 */}
                            <NewDiv72hModal lastModifiedDate={answerData.lastModifiedDate}/>
                        </div>
                        <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                            {/* 回答の種類 */}
                            {replyTypeContent()}
                            {/* 回答の内容 */}
                            {replyContextContent()}
                            {/* 添付資料 */}
                            <FileContent fileData = {answerData.file}/>
                            {/* 反訴の有無 */}
                            {haveCounterClaimContent()}
                            {/* 反訴の内容 */}
                            {counterClaimContextContent()}
                            {/* 反訴の添付資料 */}
                            {counterFileContent()}
                        </Grid>
                    </div>                        
                )
            } 
        }
        return (
            <div className="answerContentArea mosContentDiv">
                <div className="answerContentTitleArea">
                    <span className="titleContentDiv">回答の内容</span>
                </div>
                <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                    <Grid className="contentFont" item xs={4}>回答の内容が登録されていません。</Grid>
                </Grid>
            </div>                      
        )
    }else{
        // console.log('回答の内容 answerData Not found');
        return null;
    }
}

export default AnswerContent;