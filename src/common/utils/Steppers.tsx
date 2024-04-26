import '../../common/styles/Steppers.scss';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PeopleIcon from '@mui/icons-material/People';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import GavelIcon from '@mui/icons-material/Gavel';
import CheckIcon from '@mui/icons-material/Check';

function Steppers(props:any) {
    // 案件のステータス　立場フラグ　左側ボタンcolor
    const {stage, positionFlg, leftBtnColor} = props;
    // steps = ['申立', '交渉', '調停', '和解成立']
    // 調停Flg：step是否显示 true（調停step显示） false（調停step不显示）
    let icon3ShowFlg = true;
    // 和解成立Flg：图标显示不同 true（CheckIcon） false（GavelIcon）
    let icon4ShowFlg = false;
    // LineFlg：true（实线） false（虚线）
    let line1Flg = false;
    let line2Flg = false;
    let line3Flg = false;
    // iconsBorderColor：不同立场显示不同颜色（边框，背景色）
    let icon1DivStyle = "iconsDivStyle iconsBorder" + positionFlg;
    let icon2DivStyle = "iconsDivStyle iconsBorder" + positionFlg;
    let icon3DivStyle = "iconsDivStyle iconsBorder" + positionFlg;
    let icon4DivStyle = "iconsDivStyle iconsBorder" + positionFlg;
    // LineColor：不同立场显示不同线条颜色
    let solidLine = "solidLine solidLineBorder" + positionFlg;
    let dashedLine = "dashedLine dashedLineBorder" + positionFlg;
    // 案件のステータス判定：当前处于哪个step状态
    if(stage === 5) {
        line1Flg = true;
        line2Flg = true;
        icon3ShowFlg = false;
        icon4ShowFlg = true;
        icon4DivStyle = "iconsDivStyle iconsDivTrue";
    }else if(stage === 11) {
        line1Flg = true;
        line2Flg = true;
        line3Flg = true;
        icon4ShowFlg = true;
        icon4DivStyle = "iconsDivStyle iconsDivTrue";
    }else if(stage === 3) {
        line1Flg = true;
        icon2DivStyle = "iconsDivStyle iconsDivTrue";
    }else if(stage === 4 || stage === 6 || stage === 7 || stage === 12) {
        line1Flg = true;
        line2Flg = true;
        icon3DivStyle = "iconsDivStyle iconsDivTrue";
    }else{
        icon1DivStyle = "iconsDivStyle iconsDivTrue";
    }

    return (
        <Stack sx={{ width: '50%'}} id='stepIconsDiv'>
            <Grid container>
                {/* 申立 */}
                <Grid item className='stepIconDivStyle'>
                    <div className={icon1DivStyle}>
                        <EditNoteIcon className='iconsStyle' color={leftBtnColor} />
                    </div>
                </Grid>
                {
                    line1Flg === true ? 
                    <Grid item className='stepLineDivStyle'>
                        <div className={solidLine}></div>
                    </Grid>
                    :
                    <Grid item className='stepLineDivStyle'>
                        <div className={dashedLine}></div>
                    </Grid>
                }
                {/* 交渉 */}
                <Grid item className='stepIconDivStyle'>
                    <div className={icon2DivStyle}>
                        <PeopleIcon className='iconsStyle' color={leftBtnColor} />
                    </div> 
                </Grid>
                {
                    line2Flg === true ? 
                    <Grid item className='stepLineDivStyle'>
                        <div className={solidLine}></div>
                    </Grid>
                    :
                    <Grid item className='stepLineDivStyle'>
                        <div className={dashedLine}></div>
                    </Grid>
                }
                {/* 調停 */}
                {
                    icon3ShowFlg === true ? 
                    <Grid item className='stepIconDivStyle'>
                        <div className={icon3DivStyle}>
                            <Diversity3Icon className='iconsStyle' color={leftBtnColor} />
                        </div>
                    </Grid>
                    : null
                }
                {
                    icon3ShowFlg === true && line3Flg === true ?
                    <Grid item className='stepLineDivStyle'>
                        <div className={solidLine}></div>
                    </Grid>
                    : icon3ShowFlg === true && line3Flg === false ?
                    <Grid item className='stepLineDivStyle'>
                        <div className={dashedLine}></div>
                    </Grid>
                    : null
                }
                {/* 和解成立 */}
                {
                    icon4ShowFlg === true ?
                    <Grid item className='stepIconDivStyle'>
                        <div className={icon4DivStyle}>
                            <CheckIcon className='iconsStyle' color={leftBtnColor} />
                        </div>
                    </Grid>
                    :
                    <Grid item className='stepIconDivStyle'>
                        <div className={icon4DivStyle}>
                            <GavelIcon className='iconsStyle' color={leftBtnColor} />
                        </div>
                    </Grid>
                }
            </Grid>
        </Stack>
    );
}

export default Steppers;