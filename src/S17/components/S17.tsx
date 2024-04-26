import * as React from 'react';
import ReactDom from 'react-dom'
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize'
import MaximizeIcon from '@mui/icons-material/Maximize'
import S17_1 from './S17_1'
import S17_2 from './S17_2'
import './index.css'


export default function S17() {
  const [open, setOpen] = React.useState(false);//控制pop开关
  const [next, setNext] = React.useState(true);//控制第几个小画面
  const [popHeight, setPopHeight] = React.useState('auto');//pop的高
  const [popWidth, setPopWidth] = React.useState(650);//pop的宽
  const [S17_2_checkBox, setS17_2_checkBox] = React.useState<string[]>([]);//第一个小画面的checkbox的值
  const [S17_2_textArea, setS17_2_textArea] = React.useState('');//第一个小画面的textarea的值
  const [ispopHidden, setIspopHidden] = React.useState(true);//pop中的内容是否隐藏



  //pop打开的点击事件
  const handleClickOpen = (e: { currentTarget: any; }) => {
    setOpen(true);
    setNext(true);
    setIspopHidden(false)
  }
  //关闭按钮的点击事件
  const handleClose = () => {
    setOpen(false);
    setNext(true);
    setPopHeight('auto')
    setPopWidth(650)
  }
  //最小化的点击事件
  const handleMinimize = () => {
    setPopHeight('10')
    setPopWidth(20)
    setIspopHidden(true)
  }
  //最大化的点击事件
  const handleMax = () => {
    setPopHeight('auto')
    setPopWidth(650)
    setIspopHidden(false)
  }
  //画面1的回调
  const handleReturnClick1 = (val1: boolean, val2: boolean, val3: string[], val4: string) => {
    setOpen(val1)
    setNext(val2)
    setS17_2_checkBox(val3)
    setS17_2_textArea(val4)
  }
  //画面2的回调
  const handleReturnClick2 = (val1: boolean, val2: boolean) => {
    setOpen(val1)
    setNext(val2)
  }

  return (
    <React.Fragment>
      <div>
        <Button variant="outlined" onClick={handleClickOpen} style={{ color: '#FFFFFF', backgroundColor: '#007e15' }}>
          和解案を作成する
        </Button>
      </div>
      <Popper
        id='popup'
        open={open}
        style={{ height: popHeight, width: popWidth, top: '30%', left: 20 ,backgroundColor: 'white'}}
        placement="bottom-start"
      >
        <div >
          <div style={{ borderBottom: '1px solid #000' }}>
            {popHeight === '10' ?
              <IconButton
                aria-label="Maximize"
                onClick={handleMax}
                sx={{
                  position: 'absolute',
                  right: 25,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <MaximizeIcon />
              </IconButton>
              :
              <div>
                <span>title</span>
                <IconButton
                  aria-label="Minimize"
                  onClick={handleMinimize}
                  sx={{
                    position: 'absolute',
                    right: 25,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <MinimizeIcon />
                </IconButton>
              </div>
            }
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
          <div hidden={ispopHidden}>
            {next ? (<S17_1 onChildValueChange={handleReturnClick1} />) : (<S17_2 prop1={S17_2_checkBox} prop2={S17_2_textArea} onChildValueChange={handleReturnClick2} />)}
          </div>

        </div>
      </Popper>
    </React.Fragment>
  );
}
