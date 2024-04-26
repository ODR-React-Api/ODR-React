import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockData from '../mocks/mockTimesData';
import dayjs from 'dayjs';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ColorWidthButton1 } from '../../common/components/ButtonCommon'
import { ColorWidthButton2 } from '../../common/components/ButtonCommon'

import '../assets/styles/Popup26.scss';
import { SNACKS26_1,SNACKS26_2 } from '../../common/constants/constant';
import { Dialog4 } from '../../common/components/dialog';

// ポップアップ具体の表示
function Popup26(props: { platformId: string, userStatus: string, closeModal: (flg: string) => void, s26DiologOpen: boolean }) {

  const { platformId, userStatus, closeModal, s26DiologOpen } = props;        // S4画面から取得パラメータ
  const [dataMock, setData] = useState('');                    // mock 延長期日
  const [exdaysMock, setData1] = useState<number>(0);          // mock 延長できる日数

  // ポップアップ具体の表示
  function handleClickSecond() {
    // 延長回数
    const DateChangeCount = '1';
    // システム期日と時間の取得
    const dateTime = new Date();
    const newDate = dateTime.toLocaleString();
    // 申立テーブル更新用データ
    const paramPost = [newDate, platformId, userStatus, DateChangeCount];
    console.log('延長申請ボタン：' + paramPost);
  };
  // {模擬DB更新作業 .text出力 end} 

  // mockデータの取得 ID⇒対応する延長期日の取得
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
  let dateformatmock = dayjs(dataMock).format('YYYY-MM-DD');
  //Date対象に変更
  const dateobj = new Date(dateformatmock);
  //延長できる日数が増加
  let daysExt = dayjs(dateobj).add(exdaysMock, 'day')
  //YYYY年MM月DD日
  let datenewFormat = dayjs(daysExt).format('YYYY年MM月DD日');
  let dateoldFormat = dayjs(dataMock).format('YYYY年MM月DD日');

  return (
    <React.Fragment>
      <Dialog4
        open={s26DiologOpen}
        id="S26dialog"
      >
        <DialogTitle>{"交渉期間の期日を希望しますか？"}</DialogTitle>
        <div className='content0'>
          {"1度のみ期日を延長することができます。"}
        </div>
        <DialogContent>
          <div style={{ display: 'flex' }}>
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
            {/* <Button className="buttoncolor1" onClick={() => {closeModal(SNACKS26_1);}}>キャンセル</Button>
              <Button className="buttoncolor2" onClick={() => {handleClickSecond();closeModal(SNACKS26_2); }}>延長を希望する</Button> */}
            <ColorWidthButton2 style={{ float: 'right' , marginRight: '5px', marginTop: '5px' }} variant='contained' color="success" onClick={() => { handleClickSecond(); closeModal(SNACKS26_2); }}>延長を希望する</ColorWidthButton2>
            <ColorWidthButton1 style={{ float: 'right' , marginRight: '5px', marginTop: '5px' }} variant='outlined' onClick={() => { closeModal(SNACKS26_1); }}>キャンセル</ColorWidthButton1>
          </div>
        </DialogActions>
      </Dialog4>
    </React.Fragment>
  );
};
export default Popup26;