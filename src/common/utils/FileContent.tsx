import {Link} from "@mui/material";
import Grid from '@mui/material/Grid';

// 添付資料（戻った添付資料リストの個数分セット）
function FileContent(props: {fileData: any }){
    const {fileData} = props;

    function fileListContent(){
        // 添付資料取得なしの場合「なし」と表示する
        if(fileData === null || fileData === undefined){
            return <label>なし</label>
        }else{
            // 添付資料複数取得場合、1ファイル1行で表示する。
            return (
                fileData.map((item:any, index:any) => (
                    // 添付資料の表示名はFileName、リンク先はFileUrlとなる
                    <Link className='linkFileUrl' href={item.fileUrl} key={index}>{item.fileName}<br /></Link>
                ))
            )
        }
    }

    return (
        <Grid container>
            <Grid className="contentFont" item xs={4}>添付資料：</Grid>
            <Grid className="contentFont" item xs={8}>{fileListContent()}</Grid>
        </Grid>
    )
}

export default FileContent;