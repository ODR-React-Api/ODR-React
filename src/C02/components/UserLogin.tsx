import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import {DialogActions,DialogContent,DialogTitle,DialogContentText,IconButton} from '@mui/material';
import {Visibility,VisibilityOff} from '@mui/icons-material';
import { PageContext } from "../../common/pageContext";
import { ColorWidthButton1, ColorWidthButton2 } from "../../common/components/ButtonCommon";
import Step1 from '../../common/utils/step';
import '../../common/styles/step.css';
import '../assets/styles/C02.scss';
import '../mocks/mock.js'
import { Dialog2 } from '../../common/components/dialog';

// 定义error信息
const LoginFormSchema = z.object ({

    // 氏名(姓)
    surname: z
    .string()
    .min(1,{
        message: "入力必須です。"
    })
    .max(100,{
        message: "最大不能超过100位"
    }),

    // 氏名(名)
    username: z
    .string()
    .min(1,{
        message: "入力必須です。"
    })
    .max(100,{
        message: "最大不能超过100位"
    }),

    // カナ(姓)
    surnamekana: z
    .string()
    .min(1,{
        message: "入力必須です。"
    })
    .max(100,{
        message: "最大不能超过100位"
    })
    .refine(
        (surnamekana: string) => surnamekana.match(/^[アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラィルレロッワヲ]+$/),
        '片仮名を入力してください'),
    
    // カナ(名)
    usernamekana: z
    .string()
    .min(1,{
        message: "入力必須です。"
    })
    .max(100,{
        message: "最大不能超过100位"
    })
    .refine(
        (usernamekana: string) => usernamekana.match(/^[アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラィルレロッワヲ]+$/),
        '片仮名を入力してください'),
    
    // 所属会社
    commpany: z
    .string(),

    // パスワード
    password: z
    .string()
    .min(10,{
        message: "パスワードは10桁以上で、英語小文字、大文字、数字、記号の4文字のうち3つ以上が必要です。"
    })
    .max(40,{
        message: "最大不能超过40位"
    })
    .refine(
        (password: string) => password.match(/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\W_!@#$%^&*`~()-+=]/),
        'パスワードは10桁以上で、英語小文字、大文字、数字、記号の4文字のうち3つ以上が必要です。'),
    
    // パスワード(確認用)
    password2: z
    .string()

})

// 判断密码和密码（确认用）是否一致，不一致的场合报错
.refine((data) => data.password === data.password2,
        {message:"パスワードが一致しません。",
            path:["password2"]}
    );

type FromFields = z.infer<typeof LoginFormSchema>;

function UserLogin() {

    // stepper的内容
    const list = [
        '入力',
        '規約同意',
        '確認',
        '完了'
    ]

    // stepper运行到的步数
    const num = 0

    // 言語別利用設定情報取得API
    const [email, setEmail] = useState('')
    const [showMiddleName, setShowMiddleName] = useState(0)
    // 仮会員登録データ取得API：mock模拟后台取得Email
    useEffect(() =>{
          axios.get('/GetPreUserData')
          .then((response) =>{
              setEmail(response.data.data.mail)
          })
    },[])
  
    // 言語別利用設定情報取得API：mock模拟后台取得ShowMiddleName
    useEffect(() =>{
          axios.get('/GetLanuage')
              .then((res) => {
                  setShowMiddleName(res.data.data.ShowMiddleName)
              })
      },[])
    
    
    // 数据绑定用的from,submit表单
    const { register,
        handleSubmit,
        formState:{errors}
    } = useForm<FromFields>({
        // 设定默认值
        defaultValues: {
            surname: "姓",
            username: "名",
            surnamekana: "カナ",
            usernamekana: "カナ",
            commpany: "所属会社",
            password: "1234567890Aa",
            password2: "1234567890Aa"
        },
        resolver: zodResolver(LoginFormSchema),
    }); 

    const {setPrevPage} = useContext(PageContext)
    
    useEffect(() =>{
        setPrevPage('C02')
    })

    const navigate = useNavigate();
    // 登陆方法
    const Login = (data: any) => {
        // console.log(surname)
        // 跳转S01_利用規約確認画面+传值
        navigate('/PoliciesConfirm',{state: {value:
            {
                // 氏名(姓)
                surname:data.surname,
                // 氏名(名)
                username:data.username,
                // カナ(姓)
                surnamekana:data.surnamekana,
                // カナ(名)
                usernamekana:data.usernamekana,
                // 所属会社：
                commpany:data.commpany,
                // メールアドレス
                email:email,
                // パスワード
                password:data.password,
                // パスワード(確認用)
                password2:data.password2
            }
        }});
    }


    // 点击取消按钮打开弹窗
    const [openDialog, setOpenDialog] = useState(false)

    // 点击取消按钮时，打开弹窗
    function handleOpenDialog() {
        setOpenDialog(true)
    }

    // 关闭弹窗
    function handleCloseDialog() {
         setOpenDialog(false)
    }
    
    const [values, setValues] = React.useState({
        // 密码
        showPassword: false,
        // 确认用密码
        showPasswordConfirm: false,
    });
        
  
    // 修改showPassword值，控制小眼睛图片样式
    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };

    // 修改showPasswordConfirm（确认用密码）值，控制小眼睛图片样式
    const handleClickShowPasswordConfirm = () => {
        setValues({
          ...values,
          showPasswordConfirm: !values.showPasswordConfirm,
        });
      };


    return (
        <div id = "C02">
            <div style = {{marginTop:30}}>
                {<Step1 stepNum = {num} steps = {list} />}
            </div>
            <h2 className="title">会員情報の登録</h2>
            <form onSubmit={handleSubmit(Login)}>
                <table className="tableStyle">
                    <tbody>
                        <tr className="trStyle">
                            <td className="projectStyle">
                                <span className="projectName">氏名</span>
                                <span className = "mustLabel">必須</span>
                            </td>
                            <td className="textBoxStyle">
                                {/* 氏名(姓) */}
                                <input tabIndex={1} className="userName" type='text' placeholder='姓' {...register("surname")} style={errors.surname ? {borderColor:'red',borderStyle:'solid'} : {}} />
                                {/* 氏名(名) */}
                                {showMiddleName === 1 && <input tabIndex={2} className="userName" type='text' placeholder='名' {...register("username")} style={errors.username ? {borderColor:'red',borderStyle:'solid'} : {}} />}
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="textBoxStyle">
                                {errors.surname && <span className="errorStyle">{errors.surname.message}</span>}
                                {(!errors.surname && errors.username) && <span style={{display:'inline-block',width:180}}/>}
                                {errors.username && <span className="errorStyle">{errors.username.message}</span>}
                            </td>
                        </tr>
                        <tr className="trStyle">
                            <td className="projectStyle">
                                <span className="projectName">氏名(カナ)</span>
                                <span className = "mustLabel">必須</span>
                            </td>
                            <td className="textBoxStyle">
                                {/* カナ(姓) */}
                                <input tabIndex={3} className="userName" type='text' placeholder='姓（カナ）' {...register("surnamekana")} style={errors.surnamekana ? {borderColor:'red',borderStyle:'solid'} : {}} />
                                {/* カナ(名) */}
                                {showMiddleName === 1 && <input tabIndex={4} className="userName" type='text' placeholder='名（カナ）' {...register("usernamekana")}  style={errors.usernamekana ? {borderColor:'red',borderStyle:'solid'} : {}} />}
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="textBoxStyle">
                                {errors.surnamekana && <span className="errorStyle">{errors.surnamekana.message}</span>}
                                {(!errors.surnamekana && errors.usernamekana) && <span style={{display:'inline-block',width:180}}/>}
                                {errors.usernamekana && <span className="errorStyle">{errors.usernamekana.message}</span>}
                            </td>
                        </tr>
                        <tr className="trStyle">
                            <td className="projectStyle">
                                <span className="projectName">所属会社</span>
                                <span className="arbitrarilyLabel">任意</span>
                            </td>
                            <td className="textBoxStyle">
                                {/* 所属会社 */}
                                <input tabIndex={5} className="company" type='text' {...register("commpany")}/>
                            </td>
                        </tr>
                        <tr className="trStyle">
                            <td className="projectStyle">
                                <span className="projectName">メールアドレス</span>
                                <span className = "mustLabel">必須</span>
                            </td>
                            <td className="textBoxStyle">
                                {/* メールアドレス */}
                                <input className="email" type='text' value={email} disabled />
                            </td>
                        </tr>
                        <tr className="trStyle">
                            <td className="projectStyle">
                                <span className="projectName">パスワード</span>
                                <span className = "mustLabel">必須</span>
                            </td>
                            <td className="textBoxStyle">
                                {/* パスワード */}
                                <input
                                    tabIndex={6} 
                                    className="password"
                                    // 当showPassword为true时，显示密码，false时隐藏密码
                                    type={values.showPassword ? 'text' : 'password'}
                                    // 将register连接到每个输入，作为 ref
                                    {...register("password")}
                                />
                                <IconButton
                                    tabIndex={7} 
                                    style={{marginLeft:'-30px'}}
                                    size="small"
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    >
                                    {values.showPassword ? (
                                        <VisibilityOff fontSize="small" />
                                    ) : (
                                        <Visibility fontSize="small" />
                                    )}
                                </IconButton>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="textBoxStyle">
                                {/* 将错误信息渲染到画面上 */}
                                {errors.password && <span className="errorStyle">{errors.password.message}</span>}
                            </td>
                        </tr>
                        <tr className="trStyle">
                            <td className="projectStyle">
                                <span className="projectName">パスワード(確認用)</span>
                                <span className = "mustLabel">必須</span>
                            </td>
                            <td className="textBoxStyle">
                                {/* パスワード(確認用) */}
                                <input
                                    tabIndex={8}
                                    className="password"
                                    // 密码框的type，当showPasswordConfirm为true时，显示密码，false时隐藏密码
                                    type={values.showPasswordConfirm ? 'text' : 'password'}
                                    // 将register连接到每个输入，作为 ref
                                    {...register("password2")}
                                    
                                />
                                <IconButton
                                    tabIndex={9}
                                    size="small"
                                    style={{marginLeft: -30}}
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPasswordConfirm}
                                    >
                                    {values.showPasswordConfirm ? (
                                        <VisibilityOff fontSize="small" />
                                        ) : (
                                            <Visibility fontSize="small" />
                                        )}
                                </IconButton>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="textBoxStyle">
                                {/* 将错误信息渲染到画面上 */}
                                {errors.password2 && <span style={{color: 'red',fontSize:14,margin:5}}>{errors.password2.message}</span>}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="buttonStyle">
                    <React.Fragment>
                        <ColorWidthButton1  tabIndex={11} variant="outlined" type="button" onClick={handleOpenDialog}>
                            キャンセル
                        </ColorWidthButton1>
                        <Dialog2
                            open={openDialog}
                            onClose={handleCloseDialog}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                            {"このページから移動しますか？"}
                            </DialogTitle>
                            <DialogContent>
                            <DialogContentText style={{color:"black",fontSize:13}}>
                                このページを離れると入力中の内容が失われます。よろしいですか？
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions style={{padding:'16px 19px'}}>
                            <ColorWidthButton1 onClick={handleCloseDialog}  variant="outlined">
                                このページに留まる
                            </ColorWidthButton1>
                            <ColorWidthButton1 onClick={() => navigate('/Login')} autoFocus  variant="outlined">
                                このページから移動
                            </ColorWidthButton1>
                            </DialogActions>
                        </Dialog2>
                    </React.Fragment>
                    <ColorWidthButton2 tabIndex={10} type="submit" variant="contained" color="success">利用規約確認へ</ColorWidthButton2>
                </div>
            </form>
        </div>
        )
    }
// 导出组件
export default UserLogin

