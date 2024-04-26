import React, { useEffect, useState } from 'react';
// import ReactDom from 'react-dom'
import '../assets/styles/S17_1.css'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { Button, CircularProgress } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import '../mocks/mock';

interface ChildProps {
  onChildValueChange: (val1: boolean, val2: boolean, val3: string[], val4: string) => void;
}

const S17_1 = ({ onChildValueChange }: ChildProps) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showTextarea, setShowTextarea] = useState(false);//是否显示文本域
  const [checkedCount, setCheckedCount] = useState(0); // 记录已选中的复选框数量
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);   //存储选中的复选框值
  const [textareaValue, setTextareaValue] = useState(''); // 记录文本域中的值
  const [PayAmount] = useState('');//申立て支払金額
  const [CounterClaimPayment] = useState('');//反訴支払い金額
  const [PaymentEndDate] = useState('');//支払い期日
  const [ShipmentPayType] = useState('');//返送時送料
  const [SpecialItem] = useState('');//特記事項
  const [FileUrl] = useState('');//添付資料
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  // 対応方法のerrormessage表示
  const [expectResloveTypeErrorMessage, setExpectResloveTypeErrorMessage] = React.useState('none');
  // 対応方法选中状态がその他場合、errormessage表示
  const [otherContextMinErrorMessage, setOtherContextMinErrorMessage] = React.useState('none');
  const [otherContextMaxErrorMessage, setOtherContextMaxErrorMessage] = React.useState('none');

  //下载本地文件的数据
  const data = {
    selectedOptions: selectedOptions,
    textareaValue: textareaValue,
    PayAmount: PayAmount,
    CounterClaimPayment: CounterClaimPayment,
    PaymentEndDate: PaymentEndDate,
    ShipmentPayType: ShipmentPayType,
    SpecialItem: SpecialItem,
    FileUrl: FileUrl
  };

  useEffect(() => {
    axios.get('/formData')
      .then(response => {
        setSelectedOptions(response.data.selectedOptions);
        setTextareaValue(response.data.textareaValue)
        setFormData(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, [])

  useEffect(() => {
    if (selectedOptions.includes('その他')) {
      setShowTextarea(true)
      setSelectedOption('その他')
    } else {
      setSelectedOption('')
    }
    const checkBoxes = document.querySelectorAll('#checkBoxDiv input[type="checkbox"]');//获取多个checkbox
    let count = 0;
    checkBoxes.forEach((checkbox) => {
      if ((checkbox as HTMLInputElement).checked) {
        count++;
      }
    });
    setCheckedCount(count);
  })

  //复选框的change事件
  const handleCheckboxChange = (value: string) => {
    let updatedOptions = [...selectedOptions];
    let index = updatedOptions.indexOf(value);
    if (index === -1) {
      selectedOptions.push(value); // 如果数组中没有这个值，则添加到数组中
    } else {
      selectedOptions.splice(index, 1); // 如果数组中有这个值，则删除它
    }

    if (value === 'その他') {
      // 只有当选择 "その他" 而且之前没有选中其他选项时才改变文本域的显示状态
      setSelectedOption('その他');
      setShowTextarea(true);
    } else if (value === selectedOption) {
      // 如果已经选中了当前选项，则取消选择
      setSelectedOption('');
      setShowTextarea(false);
    }

    const checkBoxes = document.querySelectorAll('#checkBoxDiv input[type="checkbox"]');//获取多个checkbox
    let count = 0;
    checkBoxes.forEach((checkbox) => {
      if ((checkbox as HTMLInputElement).checked) {
        count++;
      }
    });
    if (count === 0) {
      setExpectResloveTypeErrorMessage('');
    } else {
      setExpectResloveTypeErrorMessage('none');
    }
    setCheckedCount(count);
    console.log(checkedCount)
  };

  //下载的点击事件
  const handleDownload = () => {
    const jsonData = JSON.stringify(data);
    // 创建一个新的 Blob 对象
    const blob = new Blob([jsonData], { type: 'text/plain' });
    // 生成可下载的 URL
    const url = URL.createObjectURL(blob);
    // 创建一个隐藏的 <a> 元素用于触发下载
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'S17.txt'; // 下载文件的名称
    document.body.appendChild(a);
    a.click();
    if (options[selectedIndex] === '保存して編集を依頼') {
      setOpen(true);
    }
    // 清理资源
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleBarClose = () => {
    setOpen(false);
  };

  const handleTextareaChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    //获取文本域的内容
    setTextareaValue(event.target.value);
    // 対応方法がその他場合、その他内容が空
    if (event.target.value.length === 0) {
      setOtherContextMinErrorMessage('');
    } else if (event.target.value.length > 200) {
      setOtherContextMaxErrorMessage('');
    } else {
      setOtherContextMinErrorMessage('none');
      setOtherContextMaxErrorMessage('none');
    }
  };

  const handleNextClick = () => {
    //给父组件传值的回调函数,1:控制弹窗是否打开的属性,2:控制渲染第一个小画面还是第二个
    onChildValueChange(true, false, selectedOptions, textareaValue);
    console.log(selectedOptions, textareaValue, selectedOption)
  };

  // const isButtonDisabled = (selectedOption === 'その他' && !textareaValue) || checkedCount === 0; // 判断按钮是否禁用
  const isButtonDisabled = expectResloveTypeErrorMessage === '' || (selectedOption === 'その他' && !textareaValue) || (showTextarea && otherContextMaxErrorMessage === '');


  const options = ['下書き保存', '保存して編集を依頼'];
  const [selectOpen, setSelectOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
    setSelectOpen(false);
  };

  const handleToggle = () => {
    setSelectOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: { target: any; }) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setSelectOpen(false);
  };



  return (
    <div>
      {formData === null ? <div className='center-17'><CircularProgress /></div> :
        <div id='S17_1'>
          <div style={{width: 1000,height: 410}}>
          <div style={{ marginLeft: 20 }}>和解の内容について、お答えください。</div>
          <span id='inline_S17'>対応方法</span>
          <span id='mustInput'>必须</span>
          <div id='checkBoxDiv_S17'>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox value={'テスト削除します'} checked={selectedOptions.includes('テスト削除します')} onChange={() => handleCheckboxChange('テスト削除します')} />
                }
                label='テスト削除します。'
              />
              <FormControlLabel
                control={
                  <Checkbox value={'商品交換'} checked={selectedOptions.includes('商品交換')} onChange={() => handleCheckboxChange('商品交換')} />
                }
                label='商品交換'
              />
              <FormControlLabel
                control={
                  <Checkbox value={'全額返金'} checked={selectedOptions.includes('全額返金')} onChange={() => handleCheckboxChange('全額返金')} />
                }
                label='全額返金'
              />
              <FormControlLabel
                control={
                  <Checkbox value={'一部返金'} checked={selectedOptions.includes('一部返金')} onChange={() => handleCheckboxChange('一部返金')} />
                }
                label='一部返金'
              />
              <FormControlLabel
                control={
                  <Checkbox value={'代行品発送'} checked={selectedOptions.includes('代行品発送')} onChange={() => handleCheckboxChange('代行品発送')} />
                }
                label='代行品発送'
              />
              <FormControlLabel
                control={
                  <Checkbox value={'その他'} checked={selectedOptions.includes('その他')} onChange={() => handleCheckboxChange('その他')} />
                }
                label='その他'
              />
            </FormGroup>

            {selectedOption === 'その他' && showTextarea &&
              // {selectedOptions.includes('その他') && showTextarea &&
              <div>
                <FormHelperText style={{ marginBottom: 5 }}>「その他」の内容の記載をお願い致します。</FormHelperText>
                <textarea rows={5} cols={50} onChange={handleTextareaChange} style={{ resize: 'none', border: '1px solid #000000' }} value={textareaValue}></textarea>
              </div>
            }
            <div>
              <span style={{ display: expectResloveTypeErrorMessage, color: 'red', fontSize: 14 }}>対応方法が入力必須です。</span>
            </div>
            {selectedOption === 'その他' && showTextarea &&
              <div>
                <span style={{ display: otherContextMinErrorMessage, color: 'red', fontSize: 14 }}>「その他」が入力必須です。</span>
                <span style={{ display: otherContextMaxErrorMessage, color: 'red', fontSize: 14 }}>200桁以下を入力してください。</span>
              </div>
            }
          </div>
          </div>
          <div id='line_S17'></div>
          <div style={{width: 1000}}>
            <Button variant='contained' color="success" onClick={handleNextClick} disabled={isButtonDisabled} style={{ float: 'right', marginLeft: 5, marginRight: 5 }}>次へ</Button>
            <ButtonGroup
              variant="contained"
              ref={anchorRef}
              aria-label="Button group with a nested menu"
              style={{ float: 'right', marginRight: 5, marginLeft: 5 }}
              disableRipple
            >
              <Button variant="outlined" style={{ color: 'black', borderColor: 'black' }} onClick={handleDownload}>{options[selectedIndex]}</Button>
              <Button
                size="small"
                aria-controls={selectOpen ? 'split-button-menu' : undefined}
                aria-expanded={selectOpen ? 'true' : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleToggle}
                variant="outlined"
                style={{ color: 'black', borderColor: 'black' }}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
          </div>
          <Popper
            sx={{
              zIndex: 1,
            }}
            open={selectOpen}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu" autoFocusItem>
                      {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          disabled={index === 2}
                          selected={index === selectedIndex}
                          onClick={(event) => handleMenuItemClick(event, index)}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleBarClose}
            message="相手方に和解案の編集依頼を提出しました。"
            action={
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleBarClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />
        </div>
      }
    </div>
  );
};


export default S17_1;
