import { useContext, useState } from "react"
import axios from 'axios';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../mocks/mockJS';
import '../mocks/policiesMockJS';
import '../mocks/PrivatePoliciesMockJS'
import { PageContext } from "../../common/pageContext";
import { LoginButton, LoginButton1 } from "../../common/components/ButtonCommon";

function LoginMain(props: any) {

  const { setPrevPage } = useContext(PageContext);
  // 用错误消息定义模式
  const LoginFormSchema = z.object({
    Email: z.string()
      .min(1, { message: "入力必要です", })
      .max(100, { message: "100桁以下を入力してください。", }),
    password: z.string()
      .min(1, { message: "入力必要です", })
      .max(40, { message: "40桁以下を入力してください。", }),
  });

  type FormFields = z.infer<typeof LoginFormSchema>;

  // 会員登録
  const navigate = useNavigate();
  function handleMailAdress() {
    navigate('/MailAdress');
  }

  // 数据绑定用的form
  const { register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormFields>({
    resolver: zodResolver(LoginFormSchema),
  });

  // 回调函数，把取得的userInfo返回到C01.tsx
  const handleUserInfo = (loginUser: any) => {
    props.handleUserInfo(loginUser)
  }

  // 登录方法
  const [errMessage, setErrMessage] = useState('');
  const handleForm = (data: any) => {
    // ajax提交
    let obj = { Email: data.Email, password: data.password }

    // 申立データ取得
    axios({
      url: '/login',
      data: obj,
      method: 'post'
    }).then((res) => {
      if (res.data.status !== 200) {
        // ログイン失敗の場合、メッセージ表示
        setErrMessage("ユーザーIDまたはパスワードが正しくありません。もう一度入力をお願いします。")
      } else {
        // Status　0:案件有　1:案件無
        const resStatus = res.data.data.Status
        // ユーザロール
        const resUserType = res.data.data.UserType
        const confirmedVersionNoOfTerms = res.data.data.ConfirmedVersionNoOfTerms
        const confirmedVersionNoOfPolicy = res.data.data.ConfirmedVersionNoOfPolicy

        //调用回调函数，把userInfo提交给C01.tsx
        handleUserInfo(res.data.data);

        //　ログイン成功の場合、
        //　案件有無判断（Status　0:有　1:無）
        if (resStatus === '0') {
          // 案件ある場合,申立て一覧画面へ
          navigate('/MosList', { state: { UserType: resUserType } });
          return;
        }

        // 利用規約情報取得
        let versionNoOfPolicies = '';
        axios({
          url: '/Policies',
          data: obj,
          method: 'post'
        }).then((res1) => {
          versionNoOfPolicies = res1.data.data.VersionNo;
          // プライバシーポリシー情報取得
          let versionNoOfPrivatePolicies = '';
          axios({
            url: '/PrivatePolicies',
            data: obj,
            method: 'post'
          }).then((res2) => {
            versionNoOfPrivatePolicies = res2.data.data.VersionNo;
            // 申立データ.ConfirmedVersionNoOfTermsの値と利用規約情報.VersionNoの値が一致且
            // 申立データ.ConfirmedVersionNoOfPolicyの値とプライバシーポリシー情報.VersionNoの値が一致の場合、サービストップ画面へ遷移する　　
            if (confirmedVersionNoOfTerms === versionNoOfPolicies
              && confirmedVersionNoOfPolicy === versionNoOfPrivatePolicies) {
              navigate('/MosTop')
            } else {
              // 申立データ.ConfirmedVersionNoOfTermsの値と利用規約情報.VersionNoの値が不一致あるいは
              // 申立データ.ConfirmedVersionNoOfPolicyの値とプライバシーポリシー情報.VersionNoの値が不一致の場合、規約確認画面へ遷移する
              setPrevPage('C01')
              navigate('/PoliciesConfirm', { state: { confirmedVersionNoOfTerms: confirmedVersionNoOfTerms, confirmedVersionNoOfPolicy: confirmedVersionNoOfPolicy } })
            }
          });
        });
      }
    })
  };

  // 返回dom
  return (
    <div className="logindiv">
      <form onSubmit={handleSubmit(handleForm)} >
        <h3 className="text-center">ログイン</h3>
        <span style={{ color: 'red', fontSize: 14 }}>{errMessage}</span>
        <p className="pOfLogin">
          <label htmlFor="usermail">メールアドレス</label>
        </p>
        <p className="pOfLogin">
          <input type="text" className="inputText" {...register("Email")} style={errors.Email ? { borderColor: 'red', borderStyle: 'solid' } : {}} />
          {errors.Email && <span style={{ color: 'red', fontSize: 12 }}>{errors.Email.message}</span>}
        </p>
        <p className="pOfLogin">
          <label htmlFor="password">パスワード</label>
        </p>
        <p className="pOfLogin">
          <input type="password" className="inputText" {...register("password")} style={errors.password ? { borderColor: 'red', borderStyle: 'solid' } : {}} />
          {errors.password && <span style={{ color: 'red', fontSize: 12 }}>{errors.password.message}</span>}
        </p>
        <p className="PwdReset text-center">
          <Link to='/PwdReset'>パスワードを忘れた方</Link>
        </p>
        <p><LoginButton type="submit" variant="contained" color="success" >ログインする</LoginButton></p>
        <p className="text-left comment">初めてご利用の方はこちらから</p>
        <p>
          <LoginButton1 variant="outlined" onClick={handleMailAdress}>会員登録</LoginButton1>
        </p>
      </form>
    </div>
  )
}

export default LoginMain;