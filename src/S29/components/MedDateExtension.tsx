import React, { useState } from 'react';
import '../assets/styles/MedDateExtension.scss';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import '../mocks/mockJs';
import axios from 'axios';
import { S29_DateCompare, SNACKS28S29, SNACK_MESSAGE_S29 } from '../../common/constants/constant';
import { Dialog4 } from '../../common/components/dialog';
import { ColorWidthButton1 } from '../../common/components/ButtonCommon'
import { ColorWidthButton2 } from '../../common/components/ButtonCommon'
dayjs.extend(customParseFormat)


export default function MedDateExtension(props: { mediateDateExtensionOpen: boolean, closeDialog: (flg: string) => void }) {
  const { mediateDateExtensionOpen, closeDialog } = props;

  // 現在の終了日を取得している
  const [currentEndDate, setCurrentEndDate] = useState('');
  const [circular, setCircular] = useState('0');

  // 「calendar」から日付を取得している
  const [datePickerSelectedState, setDatePickerSelected] = React.useState({
    isSelected: false,
    datePickerSelected: dayjs().format('YYYYMMDD')
  });

  // 調停期限変更回数
  const [countAdd, setCountAdd] = useState(1);

  // 日付範囲チェック
  const [dateError, setDateError] = useState('');

  //「アクション選択」ボタン押して選択された、画面へ遷移する。
  // 期日延長」画面で、現在の終了日を取得している
  React.useEffect(() => {
    axios.get('/currentEndDate').then(response => {
      //「期日延長」画面で、取得した現在の終了日を表示された
      setCurrentEndDate(response.data.MediationEndDate);
      // Dialog loading
      setCircular(response.data.Circular);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circular]);

  //「calendar」から日付を取得している
  function handleDatePickerOnChange(value: any) {
    //「calendar」から取得した日付をフォーマットして
    const datePickerSelected = (value === null ? '' : value.format('YYYYMMDD'));
    //「calendar」から取得した日付を表示
    setDatePickerSelected({ datePickerSelected: datePickerSelected, isSelected: true });

    // 「calendar」から取得した日付が正常、延長後の終了日の枠線に「デフォルトカラー」を設定された
    if (currentEndDate < datePickerSelected || datePickerSelected === '') {
      setDateError('');
      const frame = document.getElementById('content4')?.getElementsByTagName('fieldset')[0];
      if (frame !== undefined) {
        frame.style.borderColor = 'rgba(0, 0, 0, 0.23)'
      }
    }
  };

  //「期日延長」画面で、 「キャンセル」ボタン押下で、本画面を閉じる、「S4_申立て概要画面」へ遷移する。
  function handleCancelClick() {
    // 本画面を閉じ、延長後の終了日に「システム日付」を設定された
    setDatePickerSelected({ datePickerSelected: dayjs().format('YYYYMMDD'), isSelected: false });
    // 本画面を閉じ、延長後の終了日の枠線に「デフォルトカラー」を設定された
    setDateError('');
    const frame = document.getElementById('content4')?.getElementsByTagName('fieldset')[0];
    if (frame !== undefined) {
      frame.style.borderColor = 'rgba(0, 0, 0, 0.23)'
    }
  };

  //「期日延長」画面で、「延長する」ボタン押下後
  function handleArgeeExtendClick() {

    //ラベル「fieldset」すべての要素を取得した
    const frame = document.getElementById('content4')?.getElementsByTagName('fieldset')[0];
    // 日付範囲チェック
    // 現在の終了日より以降の延長終了日しか入力できない
    // 延長後の終了日の枠線は「赤い」に設定された
    if (currentEndDate >= datePickerSelectedState.datePickerSelected || (!dayjs(datePickerSelectedState.datePickerSelected, "YYYYMMDD", true).isValid())) {
      if (frame !== undefined) {
        frame.style.borderColor = 'red'
      }
      // エラーメッセージ
      setDateError(S29_DateCompare);
      // 延長後の終了日の枠線に「デフォルトカラー」を設定された
    } else {
      //調停期限変更回数+1
      setCountAdd(countAdd + 1);
      //「期日延長」画面で、「延長する」ボタン押下、バックヤードに転送されたのデーのデータ
      //アクション履歴新規登録
      const formdata =
      {
        //自動生成GIUD
        id: Math.floor(Math.random() * 10000),
        //Input.PlatformId
        PlatformId: "S2924001",
        //Input.CaseId
        CaseId: "S029",
        ActionType: "MediateDateExtension",
        UserId: "J01",
        //申立人：1 or 相手方：2
        UserType: "2",
        //システム日付
        ActionDateTime: "20240221",
        MessageGroupId: "",
        MessageId: "",
        HaveFile: "false",
        //loginUserName
        Parameters: "xiaoli",
        Other01: "",
        Other02: "",
        Other03: "",
        Other04: "",
        Other05: "",
        DeleteFlag: "0",
        //システム日付
        LastModifiedDate: "20240229",
        //loginUserName
        LastModifiedBy: "xiaoli"
      };
      //延長の終了日
      //「期日延長」画面で、「延長する」ボタン押下、データはバックヤードに転送されます
      //アクション履歴新規登録
      axios.post('/insertExtendedHistories', formdata).then(response => {
        return;
      });

      //案件情報更新
      const formUpdCasesForMediationEndDateData =
      {
        //現在のcaseIdのCaseStage
        CaseStage: "6",
        //現在のcaseIdのCaseStatus
        CaseStatus: "0600",
        //調停期限日
        date: datePickerSelectedState.datePickerSelected,
        //調停期限変更回数
        count: countAdd
      };

      //「期日延長」画面で、「延長する」ボタン押下、データはバックヤードに転送されます
      //案件情報更新
      axios.post('/updCasesForMediationEndDate', formUpdCasesForMediationEndDateData).then(response => {
        return;
      });

      // 本画面を閉じ、延長後の終了日に「システム日付」を設定された
      setDatePickerSelected({ datePickerSelected: dayjs().format('YYYYMMDD'), isSelected: false });
      //dialog 本画面を閉じ
      closeDialog(SNACK_MESSAGE_S29)
    }
  };

  return (
    <React.Fragment>
      
      <Dialog4
        open={mediateDateExtensionOpen}
        onClose={handleCancelClick}
        // aria-describedby="alert-dialog-slide-description"
        // style={{ width: "1000px" }}
        id='MedDateExtension'
      >

        <DialogTitle>{"調停期間の期日を延長しますか？"}</DialogTitle>
        {/* <div> */}
        
        <DialogContent>
          {circular !== '1' ?
          <div>
            <Box sx={{ display: 'flex',alignItems: 'center',justifyContent: 'center',height:'100px', maxHeight: '200px'}}>
              <CircularProgress />
            </Box>
          </div>
          :
          <div>
            <div style={{ display: 'flex' }}>
              <div id='content1'>
                {/* <DialogContentText id="alert-dialog-slide-description"> */}
                現在の終了日：
                {/* </DialogContentText> */}
              </div>
              <div id='content2'>
                {/* <DialogContentText id="alert-dialog-slide-description"> */}
                延長後の終了日：
                {/* </DialogContentText> */}
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div id='content3'>
                {/* <DialogContentText id="alert-dialog-slide-description"> */}
                {circular === '1' && dayjs(currentEndDate).format('YYYY年MM月DD日')}
                <br></br>
                {/* </DialogContentText> */}
              </div>
              <div id='content4'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker format='YYYY年MM月DD日'
                      value={dayjs(datePickerSelectedState.datePickerSelected, "YYYYMMDD")}
                      onChange={(value) => handleDatePickerOnChange(value)}
                      maxDate={dayjs().add(20, 'days')}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
            <div id='content5'>
              {dateError && <span style={{ color: 'red' }}>{dateError}</span>}
            </div>
          </div>
          }
        </DialogContent>
        {/* </div> */}
        <DialogActions>
          <div>
            {/* <Button id='cancel_btn' type='button'
              onClick={() => { closeDialog(SNACKS28S29) }}>キャンセル</Button>
            <Button id='extend_btn'
              onClick={() => { handleArgeeExtendClick() }}>延長する</Button> */}
            <ColorWidthButton2 color='success' variant='contained'
              style={{ float: 'right' , marginRight: '-25px', marginTop: '5px' }} 
              onClick={() => { handleArgeeExtendClick() }}>延長する</ColorWidthButton2>
            <ColorWidthButton1 variant='outlined'
              style={{ float: 'right' , marginRight: '5px', marginTop: '5px' }} 
              onClick={() => { closeDialog(SNACKS28S29) }}>キャンセル</ColorWidthButton1>
          </div>
        </DialogActions>
      </Dialog4>
    </React.Fragment >
  );
}