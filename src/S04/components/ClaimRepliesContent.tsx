import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import axios from "axios";
import "../mocks/GetClaimRepliesData.js";
// common
import FileContent from '../../common/utils/FileContent';
import NewDiv72hModal from '../../common/utils/NewDiv72hModal';

// 反訴への回答の取得
function ClaimRepliesContent(props: {caseId: string, positionFlg: string, draftFlgModal: (flg:string) => void }) {
    // 案件ID 立場フラグ
    const { caseId, positionFlg, draftFlgModal } = props;        // S4画面から取得パラメータ

    // 反訴への回答内容Data
    const [claimRepliesData, setClaimRepliesData] = useState<any>(null);
    // API_反訴への回答取得
    useEffect(() => {
        // 副作用函数
        // 在组件渲染时执行
        // 可以进行副作用操作
        axios.get('/GetClaimRepliesDataS04')
        .then((response) => {
            response.data.data.forEach((item: any)  => {
                if(caseId === item.caseId){
                    setClaimRepliesData(item);
                    if(item.claimrepliesDraftFlg === 1 && positionFlg === '1'){
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

    if(claimRepliesData){
        if(claimRepliesData.claimrepliesDraftFlg === 1 && positionFlg === '1'){
            return (
                <div className="counterclaimContentArea mosContentDiv">
                    <div className="counterclaimContentTitleArea">
                        <span className="titleContentDiv">反訴への回答の内容</span>
                        <span className="newDiv-color">下書き中</span>
                    </div>
                    <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                        <Grid className="contentFont" item xs={4}>反訴への回答が登録されていません。</Grid>
                    </Grid>
                </div>                         
            )
        }
        if(claimRepliesData.claimrepliesDraftFlg === 0){
            if(claimRepliesData.getDataFlg){
                return (
                    <div className="counterclaimContentArea mosContentDiv">
                        <div className="counterclaimContentTitleArea">
                            <span className="titleContentDiv">反訴への回答の内容</span>
                            {/* 「NEW」マーク表示 */}
                            <NewDiv72hModal lastModifiedDate={claimRepliesData.lastModifiedDate}/>
                        </div>
                        <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                            <Grid className="contentFont" item xs={4}>反訴への回答内容：</Grid>
                            <Grid className="contentFont" item xs={8}>{claimRepliesData.replyContext}</Grid>
                            {/* 添付資料 */}
                            <FileContent fileData = {claimRepliesData.file}/>
                        </Grid>
                    </div>                         
                )
            }
        }
        return (
            <div className="counterclaimContentArea mosContentDiv">
                <div className="counterclaimContentTitleArea">
                    <span className="titleContentDiv">反訴への回答の内容</span>
                </div>
                <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                    <Grid className="contentFont" item xs={4}>反訴への回答が登録されていません。</Grid>
                </Grid>
            </div>                         
        ) 
    }else{
        // console.log('反訴への回答 claimRepliesData Not found');
        return null;
    }
}

export default ClaimRepliesContent;