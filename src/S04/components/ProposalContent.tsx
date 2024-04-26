import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import axios from "axios";
import "../mocks/GetProposalData.js";
import { Box} from '@mui/material';
import { CircularProgress } from '@mui/material';
// common
import FileContent from '../../common/utils/FileContent';
import NewDiv72hModal from '../../common/utils/NewDiv72hModal';

// 申立ての内容を取得して、画面に表示する
function ProposalContent(props: {caseId: string}) {
    // 案件ID
    const { caseId } = props;        // S4画面から取得パラメータ
    // loading
    const [loading,setLoading] = useState(true);

    // 申立ての内容Data
    const [proposalData, setProposalData] = useState<any>(null);
    // API_申立ての内容取得
    useEffect(() => {
        axios.get('/GetProposalData')
        .then((response) => {
            response.data.data.forEach((item: any)  => {
                if(caseId === item.caseId){
                    setProposalData(item);
                    setLoading(false);
                }
            })
        }).catch((error) => {
            console.log(error);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 申立て番号
    function caseIdContent(){
        if(proposalData.caseId === null || proposalData.caseId === undefined){
            return null;
        }else{
            return (
                <Grid container>
                    <Grid className="contentFont" item xs={4}>申立て番号：</Grid>
                    <Grid className="contentFont" item xs={8}>{proposalData.caseId}</Grid>
                </Grid>
            )
        }
    } 

    // 購入商品
    function productNameContent(){
        if(proposalData.productName === null || proposalData.productName === undefined){
            return null;
        }else{
            return (
                <Grid container>
                    <Grid className="contentFont" item xs={4}>購入商品：</Grid>
                    <Grid className="contentFont" item xs={8}>{proposalData.productName}</Grid>
                </Grid>
            )
        }
    }

    // 商品ID
    function productIdContent(){
        if(proposalData.productId === null || proposalData.productId === undefined){
            return null;
        }else{
            return (
                <Grid container>
                    <Grid className="contentFont" item xs={4}>商品ID：</Grid>
                    <Grid className="contentFont" item xs={8}>{proposalData.productId}</Grid>
                </Grid>
            )
        }
    }

    // 購入日
    function boughtDateContent(){
        if(proposalData.boughtDate === null || proposalData.boughtDate === undefined){
            return null;
        }else{
            return (
                <Grid container>
                    <Grid className="contentFont" item xs={4}>購入日：</Grid>
                    <Grid className="contentFont" item xs={8}>{proposalData.boughtDate}</Grid>
                </Grid>
            )
        }
    }    

    // 購入金額
    function priceContent(){
        if(proposalData.price === null || proposalData.price === 'undefined'){
            return null;
        }else{
            return (
                <Grid container>
                    <Grid className="contentFont" item xs={4}>購入金額：</Grid>
                    <Grid className="contentFont" item xs={8}>{proposalData.price}</Grid>
                </Grid>
            )
        }
    }

    // 販売者
    function traderNameContent(){
        if(proposalData.traderName === null || proposalData.traderName === undefined){
            return null;
        }else{
            return (
                <Grid container>
                    <Grid className="contentFont" item xs={4}>販売者：</Grid>
                    <Grid className="contentFont" item xs={8}>{proposalData.traderName}</Grid>
                </Grid>
            )
        }
    }

    // 販売元URL
    function traderUrlContent(){
        if(proposalData.traderUrl === null || proposalData.traderUrl === undefined){
            return null;
        }else{
            return (
                <Grid container>
                    <Grid className="contentFont" item xs={4}>販売元URL：</Grid> 
                    <Grid className="contentFont" item xs={8}>{proposalData.traderUrl}</Grid>
                </Grid>
            )
        }
    }

    // 販売者メールアドレス
    function traderMailContent(){
        if(proposalData.traderMail === null || proposalData.traderMail === undefined){
            return null;
        }else{
            return (
                <Grid container>
                    <Grid className="contentFont" item xs={4}>販売者メールアドレス：</Grid>
                    <Grid className="contentFont" item xs={8}>{proposalData.traderMail}</Grid>
                </Grid>
            )
        }
    }

    // 申立て種類
    function petitionTypeValueContent(){
        if(proposalData.petitionTypeValue === null || proposalData.petitionTypeValue === undefined){
            return null;
        }else{
            return (
                <Grid container>
                    <Grid className="contentFont" item xs={4}>申立て種類：</Grid>
                    <Grid className="contentFont" item xs={8}>{proposalData.petitionTypeValue}</Grid>
                </Grid>
            )
        }
    }
    
    // 申立て内容
    function petitionContextContent(){
        if(proposalData.petitionContext === null || proposalData.petitionContext === undefined){
            return null;
        }else{
            return (
                <Grid container>
                    <Grid className="contentFont" item xs={4}>申立て内容：</Grid>
                    <Grid className="contentFont" item xs={8}>{proposalData.petitionContext}</Grid>
                </Grid>
            )
        }
    }     

    // 希望する解決方法
    function expectResloveTypeValueContent(){
        if(proposalData.expectResloveTypeValue === null || proposalData.expectResloveTypeValue === undefined){
            return null;
        }else{
            return (
                <Grid container>
                    <Grid className="contentFont" item xs={4}>希望する解決方法：</Grid>
                    <Grid className="contentFont" item xs={8}>{proposalData.expectResloveTypeValue}</Grid>
                </Grid>
            )
        }
    }

    // 拡張項目のラベルと値のリスト
    function extensionitemsContent(){
        if(proposalData.extensionitems === null || proposalData.extensionitems === undefined){
            return null;
        }else{
            return (
                proposalData.extensionitems.map((item:any, index:any) => (
                    <Grid container key={index}>
                        <Grid className="contentFont" item xs={4}>{item.itemDisplayName}</Grid>
                        <Grid className="contentFont" item xs={8}>{item.extensionitemValue}</Grid>
                    </Grid>
                ))   
            )
        }
    }    

    if(proposalData){
        return(
            <div className="proposalContentArea mosContentDiv">
                <div className="proposalContentTitleArea">
                    <span className="titleContentDiv">申立ての内容</span>
                    {/* 「NEW」マーク表示 */}
                    <NewDiv72hModal lastModifiedDate={proposalData.lastModifiedDate}/>
                </div>
                <Grid className="contentArea" container sx={{ color: 'text.primary' }}>
                    {/* 申立て番号 */}
                    {caseIdContent()}
                    {/* 購入商品 */}
                    {productNameContent()}
                    {/* 商品ID */}
                    {productIdContent()}
                    {/* 購入日 */}
                    {boughtDateContent()}
                    {/* 購入金額 */}
                    {priceContent()}
                    {/* 販売者 */}
                    {traderNameContent()}
                    {/* 販売元URL */}
                    {traderUrlContent()}
                    {/* 販売者メールアドレス */}
                    {traderMailContent()}
                    {/* 申立て種類 */}
                    {petitionTypeValueContent()}
                    {/* 申立て内容 */}
                    {petitionContextContent()}
                    {/* 添付資料 */}
                    <FileContent fileData = {proposalData.file}/>
                    {/* 希望する解決方法 */}
                    {expectResloveTypeValueContent()}
                    {/* 拡張項目のラベルと値のリスト */}
                    {extensionitemsContent()}
                </Grid>
            </div>
        )
    }else{
        // console.log('申立ての内容 proposalData Not found');
        return (
            <div>
                {loading &&  <Box sx={{ display: 'flex',alignItems: 'center',justifyContent: 'center',minHeight: '270px'}}>< CircularProgress/></Box>}
          </div>
        )
    }    
}

export default ProposalContent;