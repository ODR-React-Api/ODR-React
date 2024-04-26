import React from 'react';
import {useLocation} from 'react-router-dom';

function S05 () {

    let localtion = useLocation();
    console.log(localtion);

    return (
      <div>
        <p>S05_申立て詳細画面・やりとり</p>
      </div>
    )
}
export default S05;
