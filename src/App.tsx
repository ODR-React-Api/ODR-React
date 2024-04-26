import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './C01/components/C01';
import PrivatePolicies from './U07/U07';
import RyProtocols from './U08/U08';
import PwdReset from './C05/C05';
import MailAdress from './C12/C12';
import MosTop from './S02/S02';
import PoliciesConfirm from './S01/commonents/S01';
import { UserContext } from './common/userContext';
import { PageContext } from './common/pageContext';
import NotFound from './common/utils/NotFound';
import UserInfoConfirm from './C02/components/UserInfoConfirm';
import MosList from './S03/components/MosList';
import MosLogin from './S08/components/S08'
import UserLogin from './C02/components/UserLogin';
import UserLoginDone from './C04/components/UserLoginDone';
import MosContentConfirm from './S09/components/S09'
import User from './S08/components/user'
import MosDone from './S10/components/MosDone'
import S05 from './S03/components/S05'
import './App.css';
import S04 from './S04/components/S04';
import S06 from './S06/components/S06';
import S07 from './S07/components/MosFileList';
import S11 from './S11/components/S11';
import S12 from './S12/components/S12';
import S13 from './S13/components/CouAnswerDone';
import U02 from './U02/components/U02';
import CouAnswerLogin from "./S14/components/CouAnswerLogin";
import QuesAnswer from './C08/components/QuesAnswer';
import M3 from './M3/components/M3';
import QuesDone from './C10/components/QuesDone';
import S21 from "./S21/components/S21";
import AnswerDone from './S16/components/AnswerDone';
import NavG1 from './N1/components/NavG1';
import NavG2 from './N1/components/NavG2';


function App() {

  const [loginUser, setLoginUser] = useState('');
  const [prevPage, setPrevPage] = useState('C01');

  const saveUserInfo = (newValue: any) => {
    setLoginUser(newValue); // 更新父组件的状态
  }

  return (
    <div className="App">
      <Router>
        <div>
          <UserContext.Provider value={loginUser}>
            <PageContext.Provider value={{ prevPage, setPrevPage }} >
              <Routes>
                <Route path="/" element={<Login saveUserInfo={saveUserInfo} />} />
                <Route path="/Login" element={<Login saveUserInfo={saveUserInfo} />} />
                <Route path="/PrivatePolicies" element={<PrivatePolicies />} />
                <Route path="/RyProtocols" element={<RyProtocols />} />
                <Route path="/PwdReset" element={<PwdReset />} />
                <Route path="/MailAdress" element={<MailAdress />} />
                <Route path="/MosTop" element={<MosTop />} />
                <Route path="/MosList" element={<MosList />} />
                <Route path="/PoliciesConfirm" element={<PoliciesConfirm />} />
                <Route path="/UserInfoConfirm" element={<UserInfoConfirm />} />
                <Route path="/MosLogin" element={<MosLogin />} />
                <Route path="/UserLogin" element={<UserLogin />} />
                <Route path="/UserLoginDone" element={<UserLoginDone />} />
                <Route path='/S05' element={<S05 />} />
                <Route path='/MosContentConfirm' element={<MosContentConfirm />} />
                <Route path='/User' element={<User />} />
                <Route path='/MosDone' element={<MosDone />} />
                <Route path="/NotFound" element={<NotFound />} />
                <Route path="/S04/" element={<S04 />} >
                  <Route path="/S04/S05" element={<S05 />} />
                  <Route path="/S04/S05" element={<S05 />} />
                  <Route path="/S04/S06" element={<S06 />} />
                  <Route path="/S04/S07" element={<S07 />} />
                </Route>
                <Route path="/S11" element={<S11 />} />
                <Route path="/S12" element={<S12 />} />
                <Route path="/S13" element={<S13 />} />
                <Route path='/S14' element={<CouAnswerLogin />} />
                <Route path="/U02" element={<U02 />} />
                <Route path='/S21' element={<S21 />} />
                <Route path="/M3" element={<M3></M3>}></Route>
                <Route path="/C08/C09" element={<QuesAnswer></QuesAnswer>}></Route>
                <Route path="/C10" element={<QuesDone></QuesDone>}></Route>
                <Route path='/S16' element={<AnswerDone />} />
                <Route path='N1'element={<NavG1></NavG1>}></Route>
                <Route path='N1/NavG2'element={<NavG2></NavG2>}></Route>
              </Routes>
            </PageContext.Provider>
          </UserContext.Provider>
        </div>
      </Router>
    </div>
  );
}

export default App;
