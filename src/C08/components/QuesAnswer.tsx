import React, { useEffect, useState } from "react";
import '../assets/styles/C8.scss';
import '../mocks/mockJs'
import {useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { Box, CircularProgress, FormControl, FormControlLabel, RadioGroup } from "@mui/material";
import Radio from "@mui/material/Radio";
import '../../common/styles/step.css';
import Step1 from '../../common/utils/step';
import Error1 from '../../common/utils/Error';
import { ColorWidthButton1,ColorWidthButton2 } from "../../common/components/ButtonCommon";


let form01:any;
function QuesAnswer (){

    //画面⓵―⓶―⓷显示用
    const steps = [
        '入力',
        '確認',
        '完了',
      ];
    //msg内容
    const msg=[
        '入力内容をご確認ください。よろしければ「登録する」ボタンをクリックしてください。',
        '正しく入力されていない項目があります。',
        'メッセージの表示された入力項目をご確認のうえ、再度ご入力ください。',
        '利用後アンケート',
        '以下の項目への回答をお願いします。ご協力、ありがとうございます。',
    ]
    //画面跳转（c8,c9)判断用flg
    const [flg,setFlg] = useState(0);
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate();    
    const [res, setRes] = useState
    ({count:3,lista:[{
        Description:'',
        Type:0,
        ActiveFlag:1,
        Order:0,
        RequireFlag:1
    }]});
    //mockjs中获取数据
    useEffect(() =>{
        axios.get('/GetQuestionnaires')
        .then((response) => {
            setRes(response.data.data);
            console.log(res);
            setLoading(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    //创建表单用
    const { handleSubmit, register, formState:{errors} } = useForm({
        defaultValues: {
          list: res.lista,
          name:''
        }
      });
    //表单提交函数
    const onSubmit = (data: any) => {
        console.log(JSON.stringify(data));
        form01=JSON.stringify(data);
        setFlg(1);
    }
    //c9画面中返回按钮压下后，变量flg更新
    const back = () => {
        setFlg(0);
        navigate('/C08/C09')
    }

    //mockjs中取得数据不为空
    if (res.count !== 3) {
        //回答なしの場合
        if(res.count === 0){
            return(
                <div className="all">
                    <div>
                       {flg === 0 &&
                        <div>{<Step1  stepNum={0} steps={steps}/>}</div>
                        }
                        {flg === 1 &&
                        <div>{<Step1  stepNum={1} steps={steps}/>}</div>
                        }
                    </div>
                    <br />
                    <div>
                        {/* 往c9迁移成功时，在头部显示的文字 */}
                        <div>
                            {flg === 1 &&
                            <div>
                               {<Error1 errorId={2} errorNum={0} errorMsg={msg} />}
                            </div>}
                        </div>
                        {/* 必须项目没入力时，在头部显示的文字 */}
                        <div>
                            {errors.list && 
                            <div style={ {color: 'red', fontSize: 14 }}>
                              {<Error1 errorId={4} errorNum={1} errorMsg={msg} />}
                              {<Error1 errorId={4} errorNum={2} errorMsg={msg} />}
                            </div>}  
                        </div>
                        {/* 共通内容 */}
                        {<Error1 errorId={5} errorNum={3} errorMsg={msg} />}
                        {<Error1 errorId={5} errorNum={4} errorMsg={msg} />}
                        {/* 表单 */}
                        {loading === true ? 
                            <Box sx={{ display: 'flex',alignItems: 'center',justifyContent: 'center',minHeight: '270px'}}>
                              < CircularProgress/>
                            </Box>:
                            <div>
                                <form id='myForm' onSubmit={handleSubmit(onSubmit)} className="ffrm">
                                    {res.lista.map((obj, index) => (
                                    <div key={obj.Order} >
                                        <label>{obj.Description}</label>
                                        {obj.RequireFlag === 1 ? 
                                        <label className="lab">必须</label> :
                                        <label className="la">任意</label>
                                        }
                                        <br />
                                            <FormControl>
                                                {/* mokejs的Type=0时,Radio表示,进行必须check */}
                                                {obj.Type === 0 && 
                                                <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                >
                                                    <FormControlLabel value="radio1" control={<Radio />} disabled={flg === 1? true : false} {...register(`list.${index}.Order`,{...obj.RequireFlag === 1 && {required:"選択必須です"}})} label="大変そう思う" />
                                                    <FormControlLabel value="radio2" control={<Radio />} disabled={flg === 1? true : false} {...register(`list.${index}.Order`,{...obj.RequireFlag === 1 && {required:"選択必須です"}})} label="そう思う" />
                                                    <FormControlLabel value="radio3" control={<Radio />} disabled={flg === 1? true : false} {...register(`list.${index}.Order`,{...obj.RequireFlag === 1 && {required:"選択必須です"}})} label="どちらとも言えない" />
                                                    <FormControlLabel value="radio4" control={<Radio />} disabled={flg === 1? true : false} {...register(`list.${index}.Order`,{...obj.RequireFlag === 1 && {required:"選択必須です"}})} label="そう思わない" />
                                                    <FormControlLabel value="radio5" control={<Radio />} disabled={flg === 1? true : false} {...register(`list.${index}.Order`,{...obj.RequireFlag === 1 && {required:"選択必須です"}})} label="全く思わない" />
                                                </RadioGroup>
                                                }
                                                
                                                {obj.Type === 0 && errors.list && errors.list[index] && <span style={ { color: 'red', fontSize: 14 }}>{errors?.list[index]?.Order?.message }</span>} 
                                                {/* mokejs的Type=1时,textarea表示,进行必须check和字数限制check */}
                                                {obj.Type === 1 && 
                                                <div>
                                                    <div>
                                                        <textarea  style={{maxWidth:'850px',width:'850px',height:'195px'}}  disabled={flg === 1? true : false} {...register(`list.${index}.Order`,
                                                        { ...obj.RequireFlag === 1 ? {required:"入力必須です",
                                                        maxLength:{value:100,  message:"テキストボックスには100文字入力することができる" }
                                                        } : {maxLength:{value:100,  message:"テキストボックスには100文字入力することができる" }}})} ></textarea> 
                                                    </div>                                           
                                                    <div>
                                                        {errors.list && errors.list[index] && <span style={ {color: 'red', fontSize: 14 }}>{errors?.list[index]?.Order?.message }</span>}  
                                                    </div>                                                             
                                                </div>                                            
                                                }                                        
                                            </FormControl>
                                    </div>
                                    ))}
                                    <div className="TTtle" >
                                        {/* c8画面显示的按钮 */}
                                        <div>
                                            {flg === 0 &&
                                            <ColorWidthButton2  variant="contained" color="success" type="submit"> 確認画面へ </ColorWidthButton2>}
                                        </div>
                                        {/* c9画面显示的按钮 */}
                                        <div>
                                            {flg === 1 &&
                                            <div>
                                            <ColorWidthButton1 tabIndex={2} variant="outlined"  onClick={() => back()} >戻る</ColorWidthButton1>
                                            <ColorWidthButton2 tabIndex={1} variant="contained" color="success" onClick={() => navigate('/C10', {state:{list1:form01}})}>送信する</ColorWidthButton2> 
                                            </div> }
                                        </div>
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
                </div>
            )
        }else{
            //回答済みの場合、メッセージを表示して、処理を中止。
            return(
                <div className="all">
                    <div className="zimi">
                        <label>アンケート回答済みでした。ご回答ありがとうございました。</label>
                    </div>
                    <div className="TTtle">
                        <Button variant="outlined" color="inherit" onClick={() => navigate('/Login')}>閉じる</Button>
                    </div>
                </div>
            )
        }
    } else {
        return null
    }
}

export default QuesAnswer;