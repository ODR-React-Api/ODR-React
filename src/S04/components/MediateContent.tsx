import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import axios from "axios";
import "../mocks/GetMediateData.js";
// common
import FileContent from '../../common/utils/FileContent';
import NewDiv72hModal from '../../common/utils/NewDiv72hModal';

// 調停の内容を取得して、画面に表示する
function MediateContent(props: {caseId: string}) {
    // 案件ID
    const { caseId } = props;        // S4画面から取得パラメータ

    // 調停内容Data
    const [mediateData, setMediateData] = useState<any>(null); 
    // API_調停内容取得
    useEffect(() => {
        // 副作用函数
        // 在组件渲染时执行
        // 可以进行副作用操作
        axios.get('/GetMediateData')
        .then((response) => {
            response.data.data.forEach((item: any)  => {
                if(caseId === item.caseId){
                    setMediateData(item);
                }
            })
        }).catch((error) => {
            console.log(error);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // 概要
    function expectResloveTypeValueContent(){
        if(mediateData.expectResloveTypeValue === null || mediateData.expectResloveTypeValue === undefined){
            return null;
        }else{
            return (
                <Grid container>
                        <Grid className="contentFont" item xs={4}>概要：</Grid>
                        <Grid className="contentFont" item xs={8}>{mediateData.expectResloveTypeValue}</Grid>
                </Grid>
            )
        }
    }

    // 申し立て支払い金額
    function payAmountContent(){
        if(mediateData.payAmount === null || mediateData.payAmount === undefined){
            return null;
        }else{
            return (
                <Grid container>
                        <Grid className="contentFont" item xs={4}>申し立て支払い金額：</Grid>
                        <Grid className="contentFont" item xs={8}>{mediateData.payAmount}</Grid>
                </Grid>
            )
        }
    }

    // 反訴支払い金額
    function counterClaimPaymentContent(){
        if(mediateData.counterClaimPayment === null || mediateData.counterClaimPayment === undefined){
            return null;
        }else{
            return (
                <Grid container>
                        <Grid className="contentFont" item xs={4}>反訴支払い金額：</Grid>
                        <Grid className="contentFont" item xs={8}>{mediateData.counterClaimPayment}</Grid>
                </Grid>
            )
        }
    }

    // 支払期日
    function paymentEndDateContent(){
        if(mediateData.paymentEndDate === null || mediateData.paymentEndDate === undefined){
            return null;
        }else{
            return (
                <Grid container>
                        <Grid className="contentFont" item xs={4}>支払期日：</Grid>
                        <Grid className="contentFont" item xs={8}>{mediateData.paymentEndDate}</Grid>
                </Grid>
            )
        }
    }    

    // 返送時送料
    function shipmentPayTypeContent(){
        if(mediateData.shipmentPayType === null || mediateData.shipmentPayType === undefined){
            return null;
        }else{
            let shipmentPayTypeText: string;
            if(mediateData.shipmentPayType === 1){
                shipmentPayTypeText = "申立人が支払う";
            }else if(mediateData.shipmentPayType === 2){
                shipmentPayTypeText = "相手方が支払う";
            }else if(mediateData.shipmentPayType === 3){
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
        if(mediateData.specialItem === null || mediateData.specialItem === undefined){
            return null;
        }else{
            return (
                <Grid container>
                        <Grid className="contentFont" item xs={4}>特記事項：</Grid>
                        <Grid className="contentFont" item xs={8}>{mediateData.specialItem}</Grid>
                </Grid>
            )
        }
    }  

    if(mediateData){
        if(mediateData.status === 4 || mediateData.status === 7 || mediateData.status === 8 || mediateData.status === 9){
            return(
                <div className="mediateContentArea mosContentDiv">
                    <div className="mediateContentTitleArea">
                        <span className="titleContentDiv">和解の内容</span>
                        {/* 「NEW」マーク表示 */}
                        <NewDiv72hModal lastModifiedDate={mediateData.lastModifiedDate}/>
                    </div>
                    <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                        {/* 概要 */}
                        {expectResloveTypeValueContent()}
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
                        <FileContent fileData = {mediateData.file}/>
                    </Grid>
                </div>
            )
        }else{
            // 上記以外の場合、画面に「調停の内容」を表示しない
            console.log('「調停の内容」を表示しない');
            return null;
        }
    }else{
        // console.log('調停の内容 mediateData Not found');
        return null;
    }
}

export default MediateContent;