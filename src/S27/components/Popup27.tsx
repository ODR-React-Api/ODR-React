import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Dialog from '@mui/material/Dialog';
import dayjs from 'dayjs';
import {DialogActions, DialogContent} from '@mui/material';

import { ColorWidthButton1, ColorWidthButton2 } from '../../common/components/ButtonCommon'
import { SNACKS27_1, SNACKS27_2, SNACKS27_3 } from '../../common/constants/constant';
import mockData from '../mocks/mockTimesData';
import '../assets/styles/Popup27.scss';


// ポップアップ具体の表示
function Popup27(props: { platformId: string, userStatus: string, closeModal: (flg: string) => void, s27DiologOpen: boolean }) {

  const { platformId, userStatus, closeModal, s27DiologOpen } = props;        // S4画面から取得パラメータ
  const [dataMock, setData] = useState('');                    // mock 延長期日
  const [exdaysMock, setData1] = useState<number>(0);          // mock 延長できる日数

  // 却下ボタン押下後
  function handleClickSecond() {
    // システム期日と時間の取得
    const dateTime = new Date();
    const newDate = dateTime.toLocaleString();
    // 申立テーブル更新用データ
    const paramPost = [newDate, platformId, userStatus];
    console.log('却下ボタン：' + paramPost);
  }

  // 延長承認ボタン押下後
  function handleClickThird() {
    // システム期日と時間の取得
    const dateTime = new Date();
    const newDate = dateTime.toLocaleString();
    // 申立テーブル更新用データ
    const paramPost = [newDate, platformId, userStatus, datenewFormat];
    console.log('承認ボタン：' + paramPost);
  }

  // mockデータの取得
  useEffect(() => {
    const mock = new MockAdapter(axios);
    mock.onGet('/api/data').reply(200, mockData); // 模擬GET request，mockデータの返す
    // request
    axios.get('/api/data')
      .then(response => {
        response.data.forEach((item: any) => {
          // ID⇒対応する延長期日,延長できる日数の取得
          if (item.id === platformId) {
            setData(item.day)
            setData1(item.extensiondays)
          }
          else {
            console.log('残念！ID間に合わない');
          }
        });
      })
      .catch(error => {
        console.error(error);
      });
    mock.restore();
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, []);

  //dayjsでmockから取得期日の型⇒YYYY-MM-DDに一致する
  let dateFormatmock = dayjs(dataMock).format('YYYY-MM-DD');
  //Date対象に変更
  const dateobj = new Date(dateFormatmock);
  //延長できる日数が増加
  let daysExt = dayjs(dateobj).add(exdaysMock, 'day')
  //YYYY-MM-DDに変更
  let datenewFormat = dayjs(daysExt).format('YYYY年MM月DD日');
  let dateoldFormat = dayjs(dataMock).format('YYYY年MM月DD日');

  return (
    <React.Fragment>
      <Dialog
        open={s27DiologOpen}
        id="S27dialog"
        sx={{ '& .MuiDialog-paper': { width: 500, height: 270 } }}
      >
        {/* <DialogTitle>{"交渉期間の期日を下記日程に延長したいというリクエストがきています。承諾しますか？"}<br/></DialogTitle> */}
        <DialogContent><span style={{fontSize:'20px'}}>{"交渉期間の期日を下記日程に延長したいというリクエストがきています。承諾しますか？"}</span><br/>
        {"1度のみ期日を延長することができます。"}
          <div style={{ display: 'flex', marginTop:'30px' }}>
            <div className='content1'>
              現在の終了日：
            </div>
            <div className='content2'>
              延長後の終了日：
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className='content3'>
              {dateoldFormat}
            </div>
            <div className='content4'>
              {datenewFormat}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <div>
            {/* <Button className="buttoncolor1" onClick={() => { closeModal(SNACKS27_1); }}>キャンセル</Button>
            <Button className="buttoncolor1" onClick={() => { handleClickSecond(); closeModal(SNACKS27_2); }}>却下</Button>
            <Button className="buttoncolor2" onClick={() => { handleClickThird(); closeModal(SNACKS27_3); }}>承諾する</Button> */}
            <ColorWidthButton2 style={{ float: 'right' , marginRight: '5px', marginTop: '5px' }} color='success' variant='contained' onClick={() => { handleClickThird(); closeModal(SNACKS27_3); }}>承諾する</ColorWidthButton2>
            <ColorWidthButton1 style={{ float: 'right' , marginRight: '5px', marginTop: '5px' }} variant='outlined' onClick={() => { handleClickSecond(); closeModal(SNACKS27_2); }}>却下</ColorWidthButton1>
            <ColorWidthButton1 style={{ float: 'right' , marginRight: '5px', marginTop: '5px' }} variant='outlined' onClick={() => { closeModal(SNACKS27_1); }}>キャンセル</ColorWidthButton1>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default Popup27;