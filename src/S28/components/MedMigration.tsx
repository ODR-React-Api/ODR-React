import React from 'react';
import '../assets/styles/Mediate.scss'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import '../mocks/mockJs';
import { SNACKS28S29, SNACK_MESSAGE_S28 } from '../../common/constants/constant';
import { Dialog2 } from '../../common/components/dialog';
import { ColorWidthButton1 } from '../../common/components/ButtonCommon'
import { ColorWidthButton2 } from '../../common/components/ButtonCommon'


export default function MedMigration(props: { medMigrationOpen: boolean, closeDialog: (flg: string) => void }) {
  const { medMigrationOpen, closeDialog } = props;
  // 調停移行画面で、「はい」ボタン押下、メッセージを表示されます
  function handleArgeeClick() {
    //調停移行画面で、「はい」ボタン押下、バックヤードに転送されたのデーのデータ
    const formdata =
    {
      //自動生成GIUD
      id: Math.floor(Math.random() * 10000),
      //Input.PlatformId
      PlatformId: "S2824001",
      //Input.CaseId
      CaseId: "S028",
      ActionType: "MoveToMediation",
      //現在のcaseIdのCaseStage
      CaseStage: "7",
      //loginUserId
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
    // 調停移行画面で、「はい」ボタン押下、データはバックヤードに転送されます
    axios.post('/mpath', formdata).then(response => {
      // return response
      return;

    });
  };
  return (
    <React.Fragment>
      <Dialog2
        open={medMigrationOpen}
        aria-describedby="alert-dialog-slide-description"
        id='MedMigration'
      >
        <DialogTitle>{"調停へ移行しますか？"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            移行した場合、当事者同士での交渉は行わずに、第三者である調停人のもと、問題の解決を行います。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div>
            {/* <Button id='cancel_btn'
              onClick={() => { closeDialog(SNACKS28S29) }}>いいえ</Button>
            <Button id='Argee_btn'
              onClick={() => { handleArgeeClick(); closeDialog(SNACK_MESSAGE_S28) }}>はい</Button> */}
            <ColorWidthButton2 color='success' style={{ float: 'right' , marginRight: '5px', marginTop: '5px' }} variant='contained' onClick={() => { handleArgeeClick(); closeDialog(SNACK_MESSAGE_S28) }}>はい</ColorWidthButton2>
            <ColorWidthButton1 style={{ float: 'right' , marginRight: '5px', marginTop: '5px' }} variant='outlined' onClick={() => { closeDialog(SNACKS28S29) }}>いいえ</ColorWidthButton1>
          </div>
        </DialogActions>
      </Dialog2>
    </React.Fragment>
  );
}