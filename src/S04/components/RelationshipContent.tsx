import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import axios from "axios";
import "../mocks/GetRelationshipMailData.js";
import "../mocks/GetRelationshipData.js";

// 関係者の内容を取得
function RelationshipContent(props: {caseId: string}) {
    // 案件ID
    const { caseId } = props;        // S4画面から取得パラメータ

    // 関係者メアドData
    const [relationshipMailData, setRelationshipMailData] = useState<any>(null);
    // 関係者内容Data
    const [relationshipData, setRelationshipData] = useState<any>(null);

    // API_関係者メアド取得
    useEffect(() => {
        axios.get('/GetRelationshipMailData')
        .then((response) => {
            response.data.data.forEach((item: any)  => {
                if(caseId === item.caseId){
                    setRelationshipMailData(item);
                }
            })
        }).catch((error) => {
            console.log(error);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // API_関係者内容取得
    useEffect(() => {
        axios.get('/GetRelationshipData')
        .then((response) => {
            response.data.data.forEach((item: any)  => {
                if(caseId === item.caseId){
                    setRelationshipData(item);
                }
            })
        }).catch((error) => {
            console.log(error);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 申立人画面表示項目設定
    function petitionUserInfoContent(){
        if(relationshipData.petitionUserInfo.companyName === null || relationshipData.petitionUserInfo.companyName === undefined){
            return (
                <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                    <Grid className="contentFont" item xs={4}>申立人氏名：</Grid>
                    <Grid className="contentFont" item xs={8}>{relationshipData.petitionUserInfo.lastName} {relationshipData.petitionUserInfo.firstName}</Grid>
                    <Grid className="contentFont" item xs={4}>申立人氏名（カナ）：</Grid>
                    <Grid className="contentFont" item xs={8}>{relationshipData.petitionUserInfo.lastName_kana} {relationshipData.petitionUserInfo.firstName_kana}</Grid>
                    <Grid className="contentFont" item xs={4}>申立人メールアドレス：</Grid>
                    <Grid className="contentFont" item xs={8}>{relationshipData.petitionUserInfo.email}</Grid>
                </Grid>
            )
        }else{
            return (
                <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                    <Grid className="contentFont" item xs={4}>申立人氏名：</Grid>
                    <Grid className="contentFont" item xs={8}>{relationshipData.petitionUserInfo.companyName}<br />{relationshipData.petitionUserInfo.lastName} {relationshipData.petitionUserInfo.firstName}</Grid>
                    <Grid className="contentFont" item xs={4}>申立人氏名（カナ）：</Grid>
                    <Grid className="contentFont" item xs={8}>{relationshipData.petitionUserInfo.lastName_kana} {relationshipData.petitionUserInfo.firstName_kana}</Grid>
                    <Grid className="contentFont" item xs={4}>申立人メールアドレス：</Grid>
                    <Grid className="contentFont" item xs={8}>{relationshipData.petitionUserInfo.email}</Grid>
                </Grid>
            )
        }
    }
    
    // 代理人画面表示項目設定
    function agentContent(){
        // 代理人1
        function agent1Content(){
            // 代理人1情報取得（API取得.Agent1_Email≠Nullの場合、本処理を実行）
            if(relationshipMailData.agent1_Email !== null){
                // 代理人1～5Flgが1（取得なし）でない場合以下の画面項目を設定
                if(relationshipData.agent1Flg !== 1){
                    if(relationshipData.agent1){
                        if(relationshipData.agent1.email === relationshipMailData.agent1_Email){
                            return (
                                <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                                    <Grid className="contentFont" item xs={4}>代理人1 氏名：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.agent1.lastName} {relationshipData.agent1.firstName}</Grid>
                                    <Grid className="contentFont" item xs={4}>代理人1 氏名（カナ）：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.agent1.lastName_kana} {relationshipData.agent1.firstName_kana}</Grid>
                                    <Grid className="contentFont" item xs={4}>代理人1 メールアドレス：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.agent1.email}</Grid>
                                </Grid>
                            )
                        }
                    }
                }
            }
        }
        // 代理人2
        function agent2Content(){
            // 代理人2情報取得（API取得.Agent2_Email≠Nullの場合、本処理を実行）
            if(relationshipMailData.agent2_Email !== null){
                // 代理人1～5Flgが1（取得なし）でない場合以下の画面項目を設定
                if(relationshipData.agent2Flg !== 1){
                    if(relationshipData.agent2){
                        if(relationshipData.agent2.email === relationshipMailData.agent2_Email){
                            return (
                                <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                                    <Grid className="contentFont" item xs={4}>代理人2 氏名：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.agent2.lastName} {relationshipData.agent2.firstName}</Grid>
                                    <Grid className="contentFont" item xs={4}>代理人2 氏名（カナ）：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.agent2.lastName_kana} {relationshipData.agent2.firstName_kana}</Grid>
                                    <Grid className="contentFont" item xs={4}>代理人2 メールアドレス：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.agent2.email}</Grid>
                                </Grid>
                            )
                        }
                    }
                }
            }
        }
        // 代理人3
        function agent3Content(){
            // 代理人3情報取得（API取得.Agent3_Email≠Nullの場合、本処理を実行）
            if(relationshipMailData.agent3_Email !== null){
                // 代理人1～5Flgが1（取得なし）でない場合以下の画面項目を設定
                if(relationshipData.agent3Flg !== 1){
                    if(relationshipData.agent3){
                        if(relationshipData.agent3.email === relationshipMailData.agent3_Email){
                            return (
                                <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                                    <Grid className="contentFont" item xs={4}>代理人3 氏名：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.agent3.lastName} {relationshipData.agent3.firstName}</Grid>
                                    <Grid className="contentFont" item xs={4}>代理人3 氏名（カナ）：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.agent3.lastName_kana} {relationshipData.agent3.firstName_kana}</Grid>
                                    <Grid className="contentFont" item xs={4}>代理人3 メールアドレス：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.agent3.email}</Grid>
                                </Grid>
                            )
                        }
                    }
                }
            }             
        }
        // 代理人4
        function agent4Content(){
            // 代理人4情報取得（API取得.Agent4_Email≠Nullの場合、本処理を実行）
            if(relationshipMailData.agent4_Email !== null){
                // 代理人1～5Flgが1（取得なし）でない場合以下の画面項目を設定
                if(relationshipData.agent4Flg !== 1){
                    if(relationshipData.agent4){
                        if(relationshipData.agent4.email === relationshipMailData.agent4_Email){
                            return (
                                <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                                    <Grid className="contentFont" item xs={4}>代理人4 氏名：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.agent4.lastName} {relationshipData.agent4.firstName}</Grid>
                                    <Grid className="contentFont" item xs={4}>代理人4 氏名（カナ）：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.agent4.lastName_kana} {relationshipData.agent4.firstName_kana}</Grid>
                                    <Grid className="contentFont" item xs={4}>代理人4 メールアドレス：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.agent4.email}</Grid>
                                </Grid>
                            )
                        }
                    }
                }
            }             
        }
        // 代理人5
        function agent5Content(){
            // 代理人5情報取得（API取得.Agent5_Email≠Nullの場合、本処理を実行）
            if(relationshipMailData.agent5_Email !== null){
                // 代理人1～5Flgが1（取得なし）でない場合以下の画面項目を設定
                if(relationshipData.agent5Flg !== 1){
                    if(relationshipData.agent5){
                        if(relationshipData.agent5.email === relationshipMailData.agent5_Email){
                            return (
                                <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                                    <Grid className="contentFont" item xs={4}>代理人5 氏名：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.agent5.lastName} {relationshipData.agent5.firstName}</Grid>
                                    <Grid className="contentFont" item xs={4}>代理人5 氏名（カナ）：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.agent5.lastName_kana} {relationshipData.agent5.firstName_kana}</Grid>
                                    <Grid className="contentFont" item xs={4}>代理人5 メールアドレス：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.agent5.email}</Grid>
                                </Grid>
                            )
                        }
                    }
                }
            }             
        }

        if((relationshipMailData.agent1_Email === null && relationshipMailData.agent2_Email === null && relationshipMailData.agent3_Email === null && relationshipMailData.agent4_Email === null &&relationshipMailData.agent5_Email === null)
            || (relationshipData.agent1Flg === 1 && relationshipData.agent2Flg === 1 && relationshipData.agent3Flg === 1 && relationshipData.agent4Flg === 1 && relationshipData.agent5Flg === 1)){
           return (
               <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                   <Grid className="contentFont" item xs={4}>代理人登録なし</Grid>
               </Grid>
           )
       }else{
            return (
                <Grid container>
                    {agent1Content()}
                    {agent2Content()}
                    {agent3Content()}
                    {agent4Content()}
                    {agent5Content()}
               </Grid>

            )
       }
    }
    // 相手方画面表示項目設定
    function traderUserContent(){
        // 相手方情報取得（API取得.traderUserEmail≠Nullの場合、本処理を実行）
        if(relationshipMailData.traderUserEmail !== null){
            // 相手方Flgが1（取得なし）でない場合以下の画面項目を設定
            if(relationshipData.traderUserFlg !== 1){
                if(relationshipData.traderUser){
                    if(relationshipData.traderUser.email === relationshipMailData.traderUserEmail){
                        if(relationshipData.traderUser.companyName === null || relationshipData.traderUser.companyName === undefined){
                            return (
                                <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                                    <Grid className="contentFont" item xs={4}>相手方氏名：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.traderUser.lastName} {relationshipData.traderUser.firstName}</Grid>
                                    <Grid className="contentFont" item xs={4}>相手方氏名（カナ）：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.traderUser.lastName_kana} {relationshipData.traderUser.firstName_kana}</Grid>
                                    <Grid className="contentFont" item xs={4}>相手方メールアドレス：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.traderUser.email}</Grid>
                                </Grid>
                            )
                        }else{
                            return (
                                <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                                    <Grid className="contentFont" item xs={4}>相手方氏名：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.traderUser.companyName}<br />{relationshipData.traderUser.lastName} {relationshipData.traderUser.firstName}</Grid>
                                    <Grid className="contentFont" item xs={4}>相手方氏名（カナ）：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.traderUser.lastName_kana} {relationshipData.traderUser.firstName_kana}</Grid>
                                    <Grid className="contentFont" item xs={4}>相手方メールアドレス：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.traderUser.email}</Grid>
                                </Grid>
                            )
                        }
                    }
                }
            }
        }
        return (
            <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                <Grid className="contentFont" item xs={4}>相手方登録なし</Grid>
            </Grid>
        )
    }
    // 相手方代理人画面表示項目設定
    function traderAgentContent(){
        // 相手方代理人1
        function traderAgent1Content(){
            // 相手方代理人1情報取得（API取得.traderAgent1_UserEmail≠Nullの場合、本処理を実行）
            if(relationshipMailData.traderAgent1_UserEmail !== null){
                // 相手方代理人1～5Flgが1（取得なし）でない場合以下の画面項目を設定
                if(relationshipData.traderAgent1Flg !== 1){
                    if(relationshipData.traderAgent1){
                        if(relationshipData.traderAgent1.email === relationshipMailData.traderAgent1_UserEmail){
                            return (
                                <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                                    <Grid className="contentFont" item xs={4}>相手方代理人1 氏名：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.traderAgent1.lastName} {relationshipData.traderAgent1.firstName}</Grid>
                                    <Grid className="contentFont" item xs={4}>相手方代理人1 氏名（カナ）：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.traderAgent1.lastName_kana} {relationshipData.traderAgent1.firstName_kana}</Grid>
                                    <Grid className="contentFont" item xs={4}>相手方代理人1 メールアドレス：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.traderAgent1.email}</Grid>
                                </Grid>
                            )
                        }
                    }
                }
            }
        }
        // 相手方代理人2
        function traderAgent2Content(){
            // 相手方代理人2情報取得（API取得.traderAgent2_UserEmail≠Nullの場合、本処理を実行）
            if(relationshipMailData.traderAgent2_UserEmail !== null){
                // 相手方代理人1～5Flgが1（取得なし）でない場合以下の画面項目を設定
                if(relationshipData.traderAgent2Flg !== 1){
                    if(relationshipData.traderAgent2){
                        if(relationshipData.traderAgent2.email === relationshipMailData.traderAgent2_UserEmail){
                            return (
                                <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                                    <Grid className="contentFont" item xs={4}>相手方代理人2 氏名：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.traderAgent2.lastName} {relationshipData.traderAgent2.firstName}</Grid>
                                    <Grid className="contentFont" item xs={4}>相手方代理人2 氏名（カナ）：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.traderAgent2.lastName_kana} {relationshipData.traderAgent2.firstName_kana}</Grid>
                                    <Grid className="contentFont" item xs={4}>相手方代理人2 メールアドレス：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.traderAgent2.email}</Grid>
                                </Grid>
                            )
                        }
                    }
                }
            }
        }
        // 相手方代理人3
        function traderAgent3Content(){
            // 相手方代理人3情報取得（API取得.traderAgent3_UserEmail≠Nullの場合、本処理を実行）
            if(relationshipMailData.traderAgent3_UserEmail !== null){
                // 相手方代理人1～5Flgが1（取得なし）でない場合以下の画面項目を設定
                if(relationshipData.traderAgent3Flg !== 1){
                    if(relationshipData.traderAgent3){
                        if(relationshipData.traderAgent3.email === relationshipMailData.traderAgent3_UserEmail){
                            return (
                                <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                                    <Grid className="contentFont" item xs={4}>相手方代理人3 氏名：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.traderAgent3.lastName} {relationshipData.traderAgent3.firstName}</Grid>
                                    <Grid className="contentFont" item xs={4}>相手方代理人3 氏名（カナ）：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.traderAgent3.lastName_kana} {relationshipData.traderAgent3.firstName_kana}</Grid>
                                    <Grid className="contentFont" item xs={4}>相手方代理人3 メールアドレス：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.traderAgent3.email}</Grid>
                                </Grid>
                            )
                        }
                    }
                }
            }             
        }
        // 相手方代理人4
        function traderAgent4Content(){
            // 相手方代理人4情報取得（API取得.traderAgent4_UserEmail≠Nullの場合、本処理を実行）
            if(relationshipMailData.traderAgent4_UserEmail !== null){
                // 相手方代理人1～5Flgが1（取得なし）でない場合以下の画面項目を設定
                if(relationshipData.traderAgent4Flg !== 1){
                    if(relationshipData.traderAgent4){
                        if(relationshipData.traderAgent4.email === relationshipMailData.traderAgent4_UserEmail){
                            return (
                                <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                                    <Grid className="contentFont" item xs={4}>相手方代理人4 氏名：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.traderAgent4.lastName} {relationshipData.traderAgent4.firstName}</Grid>
                                    <Grid className="contentFont" item xs={4}>相手方代理人4 氏名（カナ）：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.traderAgent4.lastName_kana} {relationshipData.traderAgent4.firstName_kana}</Grid>
                                    <Grid className="contentFont" item xs={4}>相手方代理人4 メールアドレス：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.traderAgent4.email}</Grid>
                                </Grid>
                            )
                        }
                    }
                }
            }             
        }
        // 相手方代理人5
        function traderAgent5Content(){
            // 相手方代理人5情報取得（API取得.traderAgent5_UserEmail≠Nullの場合、本処理を実行）
            if(relationshipMailData.traderAgent5_UserEmail !== null){
                // 相手方代理人1～5Flgが1（取得なし）でない場合以下の画面項目を設定
                if(relationshipData.traderAgent5Flg !== 1){
                    if(relationshipData.traderAgent5){
                        if(relationshipData.traderAgent5.email === relationshipMailData.traderAgent5_UserEmail){
                            return (
                                <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                                    <Grid className="contentFont" item xs={4}>相手方代理人5 氏名：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.traderAgent5.lastName} {relationshipData.traderAgent5.firstName}</Grid>
                                    <Grid className="contentFont" item xs={4}>相手方代理人5 氏名（カナ）：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.traderAgent5.lastName_kana} {relationshipData.traderAgent5.firstName_kana}</Grid>
                                    <Grid className="contentFont" item xs={4}>相手方代理人5 メールアドレス：</Grid>
                                    <Grid className="contentFont" item xs={8}>{relationshipData.traderAgent5.email}</Grid>
                                </Grid>
                            )
                        }
                    }
                }
            }             
        }

        if((relationshipMailData.traderAgent1_UserEmail === null && relationshipMailData.traderAgent2_UserEmail === null && relationshipMailData.traderAgent3_UserEmail === null && relationshipMailData.traderAgent4_UserEmail === null &&relationshipMailData.traderAgent5_UserEmail === null)
            || (relationshipData.traderAgent1Flg === 1 && relationshipData.traderAgent2Flg === 1 && relationshipData.traderAgent3Flg === 1 && relationshipData.traderAgent4Flg === 1 && relationshipData.traderAgent5Flg === 1)){
           return (
               <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                   <Grid className="contentFont" item xs={4}>相手方代理人登録なし</Grid>
               </Grid>
           )
       }else{
            return (
                <Grid container>
                    {traderAgent1Content()}
                    {traderAgent2Content()}
                    {traderAgent3Content()}
                    {traderAgent4Content()}
                    {traderAgent5Content()}
               </Grid>

            )
       }
    }
    // 調停人画面表示項目設定
    function mediateUserContent(){
        // 調停人が指名された場合、以下の画面項目を設定
        // 調停人情報取得（API取得.mediateUserEmail≠Nullの場合、本処理を実行）
        if(relationshipMailData.mediateUserEmail !== null){
            // 報取得ありの場合、画面に表示する
            if(relationshipData.mediateUser){
                if(relationshipData.mediateUser.email === relationshipMailData.mediateUserEmail){
                    if(relationshipData.mediateUser.companyName === null || relationshipData.mediateUser.companyName === undefined){
                        return (
                            <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                                <Grid className="contentFont" item xs={4}>調停人氏名：</Grid>
                                <Grid className="contentFont" item xs={8}>{relationshipData.mediateUser.lastName} {relationshipData.mediateUser.firstName}</Grid>
                                <Grid className="contentFont" item xs={4}>調停人氏名（カナ）：</Grid>
                                <Grid className="contentFont" item xs={8}>{relationshipData.mediateUser.lastName_kana} {relationshipData.mediateUser.firstName_kana}</Grid>
                                <Grid className="contentFont" item xs={4}>調停人メールアドレス：</Grid>
                                <Grid className="contentFont" item xs={8}>{relationshipData.mediateUser.email}</Grid>
                            </Grid>
                        )
                    }else{
                        return (
                            <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                                <Grid className="contentFont" item xs={4}>調停人氏名：</Grid>
                                <Grid className="contentFont" item xs={8}>{relationshipData.mediateUser.companyName}<br />{relationshipData.mediateUser.lastName} {relationshipData.mediateUser.firstName}</Grid>
                                <Grid className="contentFont" item xs={4}>調停人氏名（カナ）：</Grid>
                                <Grid className="contentFont" item xs={8}>{relationshipData.mediateUser.lastName_kana} {relationshipData.mediateUser.firstName_kana}</Grid>
                                <Grid className="contentFont" item xs={4}>調停人メールアドレス：</Grid>
                                <Grid className="contentFont" item xs={8}>{relationshipData.mediateUser.email}</Grid>
                            </Grid>
                        )
                    }
                }
            }            
        }
        return null;
    }

    if(relationshipMailData && relationshipData){
        if(relationshipData.petitionUserInfo){
            if(relationshipData.petitionUserInfo.email === relationshipMailData.petitionUserInfo_Email){
                return (
                    <div className="relationshipContentArea mosContentDiv">
                        <div className="relationshipContentTitleArea">
                            <span className="titleContentDiv">関係者</span>
                        </div>
                        {petitionUserInfoContent()}
                        {agentContent()}
                        {traderUserContent()}
                        {traderAgentContent()}
                        {mediateUserContent()} 
                    </div>
                )
            }
        }
        return null;
    }else{
        // console.log('関係者メアド relationshipMailData && 関係者内容 relationshipData Not found');
        return null;
    }    
}

export default RelationshipContent;