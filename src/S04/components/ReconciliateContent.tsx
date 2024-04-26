import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import axios from "axios";
import "../mocks/GetReconciliateData.js";
// common
import FileContent from '../../common/utils/FileContent';
import NewDiv72hModal from '../../common/utils/NewDiv72hModal';

// 和解の内容を取得して、画面に表示する
function ReconciliateContent(props: {caseId: string}) {
    // 案件ID
    const { caseId } = props;        // S4画面から取得パラメータ
    
    // 和解内容Data
    const [reconciliateData, setReconciliateData] = useState<any>(null);
    // API_和解内容取得
    useEffect(() => {
        // 副作用函数
        // 在组件渲染时执行
        // 可以进行副作用操作
        axios.get('/GetReconciliateData')
        .then((response) => {
            response.data.data.forEach((item: any)  => {
                if(caseId === item.caseId){
                    setReconciliateData(item);
                }
            })
        }).catch((error) => {
            console.log(error);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 概要
    function overviewContent(){
        if(reconciliateData.overview === null || reconciliateData.overview === undefined){
            return null;
        }else{
            return (
                <Grid container>
                    <Grid className="contentFont" item xs={4}>概要：</Grid>
                    <Grid className="contentFont" item xs={8}>{reconciliateData.overview}</Grid>
                </Grid>
            )
        }
    }

    // 申し立て支払い金額
    function payAmountContent(){
        if(reconciliateData.payAmount === null || reconciliateData.payAmount === undefined){
            return null;
        }else{
            return (
                <Grid container>
                    <Grid className="contentFont" item xs={4}>申し立て支払い金額：</Grid>
                    <Grid className="contentFont" item xs={8}>{reconciliateData.payAmount}</Grid>
                </Grid>
            )
        }
    }

    // 反訴支払い金額
    function counterClaimPaymentContent(){
        if(reconciliateData.counterClaimPayment === null || reconciliateData.counterClaimPayment === undefined){
            return null;
        }else{
            return (
                <Grid container>
                    <Grid className="contentFont" item xs={4}>反訴支払い金額：</Grid>
                    <Grid className="contentFont" item xs={8}>{reconciliateData.counterClaimPayment}</Grid>
                </Grid>
            )
        }
    }
    
    // 支払期日
    function paymentEndDateContent(){
        if(reconciliateData.paymentEndDate === null || reconciliateData.paymentEndDate === undefined){
            return null;
        }else{
            return (
                <Grid container>
                    <Grid className="contentFont" item xs={4}>支払期日：</Grid>
                    <Grid className="contentFont" item xs={8}>{reconciliateData.paymentEndDate}</Grid>
                </Grid>
            )
        }
    }

    // 返送時送料
    function shipmentPayTypeContent(){
        if(reconciliateData.shipmentPayType === null || reconciliateData.shipmentPayType === undefined){
            return null;
        }else{
            let shipmentPayTypeText: string;
            if(reconciliateData.shipmentPayType === 1){
                shipmentPayTypeText = "申立人が支払う";
            }else if(reconciliateData.shipmentPayType === 2){
                shipmentPayTypeText = "相手方が支払う";
            }else if(reconciliateData.shipmentPayType === 3){
                shipmentPayTypeText = "返送なし";
            }else{
                return null;
            }
            return (
                <Grid container>
                    <Grid className="contentFont" item xs={4}>返送時送料：</Grid>
                    <Grid className="contentFont" item xs={8}>{shipmentPayTypeText}</Grid>
                </Grid>
            )
        }
    }

    // 特記事項
    function specialItemContent(){
        if(reconciliateData.counterClaimPayment === null || reconciliateData.counterClaimPayment === undefined){
            return null;
        }else{
            return (
                <Grid container>
                    <Grid className="contentFont" item xs={4}>特記事項：</Grid>
                    <Grid className="contentFont" item xs={8}>{reconciliateData.specialItem}</Grid>
                </Grid>
            )
        }
    }

    if(reconciliateData){
        // 調停の内容取得ありの場合、かつ、戻り値.Statusが3,4,5,6の場合、画面に和解案の内容を反映する。
        if(reconciliateData.status === 3 || reconciliateData.status === 4 || reconciliateData.status === 5){
            return(
                <div className="reconciliateContentArea mosContentDiv">
                    <div className="reconciliateContentTitleArea">
                        <span className="titleContentDiv">和解の内容</span>
                        {/* 「NEW」マーク表示 */}
                        <NewDiv72hModal lastModifiedDate={reconciliateData.lastModifiedDate}/>
                    </div>
                    <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                        {/* 概要 */}
                        {overviewContent()}
                        {/* 申し立て支払い金額 */}
                        {payAmountContent()}
                        {/* 反訴支払い金額 */}
                        {counterClaimPaymentContent()}
                        {/* 支払期日 */}
                        {paymentEndDateContent()}
                        {/* 返送時送料 */}
                        {shipmentPayTypeContent()}
                        {/* 特記事項 */}
                        {specialItemContent()}
                        {/* 添付資料 */}
                        <FileContent fileData = {reconciliateData.file}/>
                    </Grid>
                </div>
            )
        }else{
            // 上記以外の場合、画面に「和解の内容」を表示しない
            console.log('「和解の内容」を表示しない');
            return null;
        }
    }else{
        // console.log('和解の内容 reconciliateData Not found');
        return null;
    }

}

export default ReconciliateContent;