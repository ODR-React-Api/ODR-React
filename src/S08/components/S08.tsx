import React from 'react';
import '../assets/styles/S08-style.css';
import axios from 'axios'
import '../mocks/mockjs'
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useLocation, useNavigate } from 'react-router-dom';
import '../components/user'
import Step1 from '../../common/utils/step';
import '../../common/styles/step.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { FileAddOutlined } from '@ant-design/icons';
import { CircularProgress } from '@mui/material';
import PageHeader from '../../common/utils/pageHeader';
import { ColorWidthButton1, ColorWidthButton2 } from "../../common/components/ButtonCommon";

//会員情報の変更跳转
function LinkAA() {
  const navigate = useNavigate();
  return (
    <Link onClick={() => navigate('/User')}>会員情報の変更</Link>
  )
}
function MosLogin() {
  const navigate = useNavigate();
  const { state } = useLocation();
  //申立ての種類
  const [comments, setComments] = React.useState([{ id: '', content: '' }]);
  //希望する解決方法
  const [solutions, setSolutions] = React.useState([{ id: '', content: '' }]);
  //申立ての種類はその他の場合、その他の内容
  const [sonota, setSonota] = React.useState('');
  //「その他」の内容是否显示
  const [showElem, setShowElem] = React.useState('none');
  //購入商品が入力必須のerrormessage表示
  const [buyProductErrorMessage, setBuyProductErrorMessage] = React.useState('none');
  //商品ＩＤerrormessage显示控制
  const [idErrorMessage, setIdErrorMessage] = React.useState('none');
  // 購入金額が入力必須のerrormessage表示
  const [buyAmountErrorMessage, setBuyAmountErrorMessage] = React.useState('none');
  //販売者ＵＲＬerrormessage显示控制
  const [urlErrorMessage, setUrlErrorMessage] = React.useState('none');
  //販売元メールerrormessage显示控制
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('none');
  //販売元メールが入力必須のerrormessage表示
  const [emailNullErrorMessage, setEmailNullErrorMessage] = React.useState('none');
  //購入日errormessage显示控制
  const [dateErrorMessage, setDateErrorMessage] = React.useState('none');
  // 申立ての種類选中状态が入力必須のerrormessage表示
  const [requireDcommentsErrorMessage, setRequireDcommentsErrorMessage] = React.useState('none');
  // 申立ての種類选中状态がその他場合、入力必須のerrormessage表示
  const [requireOtherErrorMessage, setRequireOtherErrorMessage] = React.useState('none');
  // 申立て内容が入力必須のerrormessage表示
  const [petitionContentErrorMessage, setPetitionContentErrorMessage] = React.useState('none');
  // 希望する解決方法选中状态が入力必須のerrormessage表示
  const [requiredSolutionsErrorMessage, setRequireSolutionsErrorMessage] = React.useState('none');
  //文件fileError
  const [fileError, setFileError] = React.useState('');
  //文件typeerrormessage
  const [fileTypeErrorMessage, setFiletypeErrorMessage] = React.useState('none');
  //文件sizeerrormessage
  const [fileSizeErrorMessage, setFilesizeErrorMessage] = React.useState('none');
  //申立ての種類选中状态
  const [requiredcomments, setrequiredcomments] = React.useState(false);
  //希望する解決方法选中状态
  const [requiredsolutions, setRequiredsolutions] = React.useState(false);
  // 文字列必須
  const [textMust, setTextMust] = React.useState<String[]>([]);
  //購入商品
  const [commodity, setCommodity] = React.useState('');
  //商品ID
  const [commodityid, setCommodityid] = React.useState('');
  //購入日
  const [commoditydate, setCommoditydate] = React.useState('');
  //購入金额
  const [purchaseamount, setPurchaseamount] = React.useState('');
  //販売者URL
  const [sellerURL, setSellerURL] = React.useState('');
  //販売者
  const [sellingelementname, setSellingelementname] = React.useState('');
  //販売者メール
  const [sellingelementemail, setSellingelementemail] = React.useState('');
  //申立ての種類
  const [petitionKind, setPetitionKind] = React.useState(['']);
  //申立ての内容
  const [petitioncontent, setPetitioncontent] = React.useState('');
  //文件添加
  const [fileName, setFileName] = React.useState('');
  //希望する解決方法
  const [desiredsolutions, setDesiredsolutions] = React.useState(['']);
  //申立人信息取得
  const [userinfor, setUserinfor] = React.useState({
    uid: '',
    usercompany: '',
    userfirstname: '',
    userlastname: '',
    userkanafirstname: '',
    userkanalastname: '',
    useremail: ''
  });
  //扩张项目
  const [useother, setUseother] = React.useState([{ id: '', ItemType: '', IsRequired: '', content: '' }]);
  //代理人
  const [agentemail, setAgentemail] = React.useState<String[]>([]);
  // 代理人メール チェック errormessage表示
  const [agentEmailInputCheck, setAgentEmailInputCheck] = React.useState<String[]>([]);
  // 代理人メール indexチェック errormessage表示
  const [agentEmailIndexMust, setAgentEmailIndexMust] = React.useState<number[]>([]);
  //商品IDを入力して、購入商品、販売者、販売者メールアドレスを取得する。
  const [userprodut, setUserprodut] = React.useState({
    userproductId: '',
    usetraderName: '',
    useproductUrl: ''
  });
  // stepper的内容
  const list = [
    '入力',
    '確認',
    '完了',
  ]
  const [loading, setLoading] = React.useState(true)
  //初期调用
  React.useEffect(() => {
    if (state !== null) {
      setCommodity(state.infor.commodity)
      setCommodityid(state.infor.commodityid)
      setCommoditydate(state.infor.commoditydate)
      setPurchaseamount(state.infor.purchaseamount)
      setSellerURL(state.infor.sellerURL)
      setSellingelementname(state.infor.sellingelementname)
      setSellingelementemail(state.infor.sellingelementemail)
      setPetitionKind(state.infor.petitionKind)
      if (state.infor.sonota !== '' && state.infor.petitionKind.includes('その他')) {
        setSonota(state.infor.sonota)
        setShowElem('')
      }
      setPetitioncontent(state.infor.petitioncontent)
      setDesiredsolutions(state.infor.desiredsolutions)
      setUserinfor(state.infor.userinfor)
      setUseother(state.infor.useother)
      setAgentemail(state.infor.agentemail)
    }
    axios.get('/userInfor')
      .then((response) => {
        //申立ての種類、希望解决方法、商品ＩＤ、販売者、販売者ＵＲＬ取得
        setComments(response.data.comments)
        setSolutions(response.data.solutions)
        setUserinfor(response.data.userinformation)
        if (state === null) {
          setUseother(response.data.useother)
        }
        setUserprodut(response.data.userprodut)
        setLoading(response.data.loading)
      })
      .catch((error) => {
        console.error('Error submitting the data: ', error);
      });
  }, [])

  React.useEffect(() => {
    if (commodityid !== '' && commodityid.length === 5) {
      axios.post('/productInformation', commodityid)
        .then((response) => {
          setCommodity(response.data.commodity)
          setSellingelementname(response.data.sellingelementname)
          setSellingelementemail(response.data.sellingelementemail)
        })
        .catch((error) => {
          console.error('Error submitting the data: ', error);
        });
    }
  }, [commodityid])

  //Form表单提交
  function handleSubmit(event: any) {
    event.preventDefault(); // 阻止默认的表单提交行为
    const data = {
      commodity: commodity,
      commodityid: commodityid,
      commoditydate: commoditydate,
      purchaseamount: purchaseamount,
      sellingelementname: sellingelementname,
      sellerURL: sellerURL,
      sellingelementemail: sellingelementemail,
      petitioncontent: petitioncontent,
      petitionKind: petitionKind,
      desiredsolutions: desiredsolutions,
      sonota: sonota,
      agentemail: agentemail,
      useother: useother,
      userinfor: userinfor,
      fileName: fileName
    };

    // 購入商品
    if (commodity === '') {
      setBuyProductErrorMessage('')
    }
    // 購入日
    if (commoditydate === '') {
      setDateErrorMessage('')
    }
    // 購入金額
    if (purchaseamount === '') {
      setBuyAmountErrorMessage('')
    }
    // 販売者メール
    if (sellingelementemail === '') {
      setEmailNullErrorMessage('')
    }
    // 申立ての種類
    if (petitionKind.length === 1 && requiredcomments !== true) {
      setRequireDcommentsErrorMessage('')
    }
    //申立ての種類がその他場合、その他内容が空
    if (petitionKind.indexOf('その他') !== -1 && sonota === '') {
      setRequireOtherErrorMessage('')
    }
    // 申立て内容
    if (petitioncontent === '') {
      setPetitionContentErrorMessage('')
    }
    // 希望する解決方法
    if (desiredsolutions.length === 1 && requiredsolutions !== true) {
      setRequireSolutionsErrorMessage('')
    }
    // 文字列必須
    const itemnull: String[] = textMust;
    useother.map((item, index) => {
      if (item.IsRequired === '1' && item.content === '') {
        itemnull.push("textNull" + index)
      }
    })
    setTextMust([...itemnull])

    // 代理人メールアドレス indexがnull  checkある
    const agentIndex: number[] = agentEmailIndexMust
    agentemail.map((item, index) => {
      if (item === '') {
        agentIndex.push(index)
      }
      setAgentEmailIndexMust([...agentIndex])
    })

    // submit
    if (buyProductErrorMessage === 'none'
      && idErrorMessage === 'none'
      && buyAmountErrorMessage === 'none'
      && urlErrorMessage === 'none'
      && emailErrorMessage === 'none'
      && emailNullErrorMessage === 'none'
      && petitionKind.length > 1
      && petitioncontent !== ''
      && requireDcommentsErrorMessage === 'none'
      && commoditydate !== ''
      && petitionContentErrorMessage === 'none'
      && desiredsolutions.length > 1
      && requiredSolutionsErrorMessage === 'none'
      && fileTypeErrorMessage === 'none'
      && fileSizeErrorMessage === 'none'
      && itemnull.length === 0
      && agentEmailInputCheck.length === 0
      && agentEmailIndexMust.length === 0
    ) {
      // 发送POST请求到服务器
      axios.post('/formSubmitinsert', data)
        .then((response) => {
          console.log('Data submitted successfully!', data);
          navigate('/MosContentConfirm', { state: { data } })
        })
        .catch((error) => {
          console.error('Error submitting the data: ', error);
        });
    }
  }

  //文件添加
  function handleFileChange(e: any) {
    const acceptedTypes = ['.ade', '.adp', '.apk', '.appx', '.appxbundle', '.bat', '.cab', '.chm', '.cmd', '.com', '.cpl', '.dll', '.dmg', '.exe', '.hta', '.ins', '.isp', '.iso', '.jar', '.js', '.jse', '.lib', '.lnk', '.mde',
      '.msc', '.msi', '.msix', '.msixbundle', '.msp', '.mst', '.nsh', '.pif', '.scr', '.sct', '.shb', '.sys', '.vb', '.vbe', '.vbs', '.vxd', '.wsc', '.wsf', '.wsh'];
    const files = e.target.files
    if (files.length !== 0) {
      const uploadedFile = files[0]
      const formData = new FormData()
      formData.append(uploadedFile.name, uploadedFile)
      const fileType = uploadedFile.name
        .substr(uploadedFile.name.lastIndexOf("."))
        .toLowerCase();  // 获取文件后缀名
      if (acceptedTypes.includes(fileType)) {
        setFiletypeErrorMessage('')
        setFileError('正しいファイルを選択してください。')
      } else if (files[0].size > 1024 * 1024 * 200) {
        setFilesizeErrorMessage('')
        setFileError('200 MB未満のファイルを選択してください。')

      } else {
        setFiletypeErrorMessage('none')
        setFilesizeErrorMessage('none')
        setFileName(uploadedFile.name)
      }

    }
  }
  function handelPut() {
    document.getElementById('file1')?.click()
  }

  // 申立种类checkbox处理
  function handelinputChecked(e: React.ChangeEvent<HTMLInputElement>) {
    const petitionKind_new = petitionKind.filter((item) => item !== e.target.value)
    if (e.target.checked === true) {
      //选中时添加
      setPetitionKind([...petitionKind, e.target.value])
      setrequiredcomments(true)
      setRequireDcommentsErrorMessage('none')
    } else {
      //未选中删除
      setrequiredcomments(false)
      setPetitionKind(petitionKind_new)
    }
    //申立种类その他时，文本框显示
    if (e.target.value === 'その他' && e.target.checked === true) {
      setShowElem('')
      setrequiredcomments(true)
      setRequireDcommentsErrorMessage('none')
    } else if (e.target.value === 'その他' && e.target.checked === false) {
      setShowElem('none')
      setrequiredcomments(false)
      setPetitionKind(petitionKind_new)
    }
  }

  //希望する解決方法checkbox处理
  function handelChecked(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked === true) {
      setDesiredsolutions([...desiredsolutions, e.target.value])
      setRequiredsolutions(true)
      setRequireSolutionsErrorMessage('none')
    } else {
      const desiredsolutions_new = desiredsolutions.filter((item) => item !== e.target.value)
      setRequiredsolutions(false)
      setDesiredsolutions(desiredsolutions_new)
    }
  }

  //代理人追加
  function agentAdd(e: any) {
    e.preventDefault()// 阻止默认的表单提交行为
    setAgentemail([...agentemail, ''])
  }

  //代理人删除
  function agentRemove(index: number, e: any) {
    e.preventDefault()// 阻止默认的表单提交行为
    //代理人メールアドレスを削除する
    if (index >= 0 && index <= agentemail.length - 1) {
      const newArray = [...agentemail];
      newArray.splice(index, 1);
      setAgentemail(newArray)
    }
    // 「代理人メールアドレスの削除」を押す、代理人を削除
    //　削除対応削除後、indexを確認している
    let agentEmailIndexMustExpurgate: number[] = [];
    agentEmailIndexMust.forEach(item => {
      if (item > index) {
        agentEmailIndexMustExpurgate.push(item - 1)
      } else if (item < index) {
        agentEmailIndexMustExpurgate.push(item)
      }
    })
    setAgentEmailIndexMust([...agentEmailIndexMustExpurgate])

  }

  //代理人email提交
  function agentEmailvalue(index: number, e: any) {
    const agentemailvalue = e.target.value
    const isValid = /^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/.test(agentemailvalue);
    // 代理人メールアドレスのチェック
    if (agentemailvalue === '' || isValid) {
      // 代理人メールアドレスの入力チェック checkなし
      const agentEmailText = agentEmailInputCheck.filter(item => item !== ("agent" + index))
      setAgentEmailInputCheck([...agentEmailText])
      // 代理人メールアドレス index-1がnull  checkなし
      const agentEmailindexs = agentEmailIndexMust.filter(item => item !== (index))
      setAgentEmailIndexMust([...agentEmailindexs])

    }
    else if (!isValid) {
      const agentError: String[] = agentEmailInputCheck
      agentError.push("agent" + index)
      setAgentEmailInputCheck([...agentError])
    }

    setAgentemail(agentemail.map((item, _index) => {
      return (_index === index ? e.target.value : item)
    }))
  }

  //扩张项目提交
  function userothervalue(index: number, e: any) {
    setUseother(useother.map((item, _index) => {
      return {
        ...item,
        content: _index === index ? e.target.value : item.content
      }
    }))

    // 文字列必須
    if (e.target.value !== '') {
      const nullText = textMust.filter(item => item !== ("textNull" + index))
      setTextMust(nullText)
    }
  }

  //商品IDCheck
  function commodityidCheck(event: React.ChangeEvent<HTMLInputElement>) {
    const commodityidvalue = event.target.value
    const isValid = /^^$|[A-Za-z0-9]+$/.test(commodityidvalue)
    setCommodityid(commodityidvalue)
    if (isValid) {
      setIdErrorMessage('none')
    }
    else {
      setIdErrorMessage('')
    }
  };

  //販売者ＵＲＬCheck
  function sellerurlCheck(event: React.ChangeEvent<HTMLInputElement>) {
    const sellerURLvalue = event.target.value
    const isValid = /^^$|[A-Za-z0-9]+$/.test(sellerURLvalue)
    setSellerURL(sellerURLvalue)
    if (isValid) {
      setUrlErrorMessage('none')
    }
    else {
      setUrlErrorMessage('')
    }
  };

  //販売元メールCheck
  function sellingelementEmailCheck(event: React.ChangeEvent<HTMLInputElement>) {
    const sellingelementemailvalue = event.target.value
    const isValid = /^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/.test(sellingelementemailvalue);
    setSellingelementemail(sellingelementemailvalue)
    // 販売元メールアドレスの入力チェック
    if (sellingelementemailvalue !== '' && isValid) {
      // 販売元メールアドレスは値がある 且つ　メールアドレスisValid
      setEmailErrorMessage('none')
      setEmailNullErrorMessage('none')
    } else if (sellingelementemailvalue === '' && isValid) {
      setEmailErrorMessage('none')
      setEmailNullErrorMessage('')

    } else if (sellingelementemailvalue !== '') {
      setEmailErrorMessage('')
      setEmailNullErrorMessage('none')
    } else if (!isValid) {
      setEmailErrorMessage('none')
      setEmailNullErrorMessage('')
    }
  };

  const [Open, setOpen] = React.useState(false);
  function TemporarySave() {
    const data = {
      commodity: commodity,
      commodityid: commodityid,
      commoditydate: commoditydate,
      purchaseamount: purchaseamount,
      sellingelementname: sellingelementname,
      sellerURL: sellerURL,
      sellingelementemail: sellingelementemail,
      petitioncontent: petitioncontent,
      petitionKind: petitionKind,
      desiredsolutions: desiredsolutions,
      sonota: sonota,
      agentemail: agentemail,
      useother: useother,
      userinfor: userinfor,
      fileName: fileName
    };
    // "下書きを保存しました。"イメージの設定値
    setOpen(true);
    // 要写入文件的数据
    const jsonData = JSON.stringify(data);

    // 创建一个新的 Blob 对象
    const blob = new Blob([jsonData], { type: 'text/plain' });

    // 生成可下载的 URL
    const url = URL.createObjectURL(blob);

    // 创建一个隐藏的 <a> 元素用于触发下载
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    // 下载文件的名称
    a.download = 'TemporarySave.txt';

    document.body.appendChild(a);
    a.click();

    // 清理资源
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
  //snarkbar关闭处理
  function handleClose() {
    setOpen(false)
  };

  //snarkbar图标点击关闭
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <div style={{ width: '100%' }} id='S08Form'>
      <PageHeader pageFlg={'1'} />
      {loading && (
        <Box sx={{
          width: '100%', height: '900px', alignItems: 'center', display: 'flex', justifyContent: 'center'
        }}>
          < CircularProgress />
        </Box>
      )}
      <form onSubmit={handleSubmit} style={{ display: loading === true ? 'none' : '' }}>
        <div className='div-left'>
          <span>申立て情報の登録</span>
        </div>
        <div>{<Step1 stepNum={0} steps={list} />}</div>
        <div className='div-left'>
          <span>購入された商品の情報をご入力ください</span>
        </div>
        <div className='div-top'>
          <span className='div-layout'>購入商品</span>
          <span className='div-color'>必須</span>
          <TextField variant="outlined" style={{ width: '300px' }} name='commodity'
            value={commodity}
            onChange={e => { setCommodity(e.target.value); setBuyProductErrorMessage('none') }} />
        </div>
        <div style={{ display: buyProductErrorMessage !== 'none' ? 'flex' : 'none', height: '20px' }}>
          <span style={{ display: buyProductErrorMessage, marginLeft: '350px', color: 'red' }}>購入商品が入力必須です</span>
        </div>
        <div className='div-top' style={userprodut.userproductId === '0' ? { display: 'none' } : {}}>
          <span className='div-layout'>商品ＩＤ</span>
          <span className={userprodut.userproductId === '1' ? 'div-color2' : 'div-color'}>{userprodut.userproductId === '1' ? '任意' : '必須'}</span>
          <div style={{ display: 'inline-flex' }}>
            <TextField className='input-width' name='commodityid' value={commodityid}
              onChange={commodityidCheck}
              required={userprodut.usetraderName === '1' ? false : true} />
          </div>
        </div>
        <div>
          <span style={{ display: idErrorMessage, marginLeft: '350px', color: 'red' }}>英数字を入力してください </span>
        </div>
        <div className='div-top'>
          <span className='div-layout'>購入日</span>
          <span className='div-color'>必須</span>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker name='commoditydate' className='input-width ' format='YYYY-MM-DD'
              value={commoditydate === '' ? null : dayjs(commoditydate)}
              onChange={value => { value === null ? setCommoditydate('') : setCommoditydate(dayjs(value).format('YYYY-MM-DD')); setDateErrorMessage('none'); }}
            />
          </LocalizationProvider>
        </div>
        <div>
          <span style={{ display: dateErrorMessage, marginLeft: '350px', color: 'red' }}>日付を選択してください </span>
        </div>
        <div className='div-top'>
          <span className='div-layout'>購入金額</span>
          <span className='div-color'>必須</span>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            name='purchaseamount' value={purchaseamount}
            onChange={e => { setPurchaseamount(e.target.value); setBuyAmountErrorMessage('none') }}
            className='input-width'
            style={{ paddingLeft: '5px' }}
          />
        </div>
        <div style={{ display: buyAmountErrorMessage !== 'none' ? 'flex' : 'none', height: '20px' }}>
          <span style={{ display: buyAmountErrorMessage, marginLeft: '350px', color: 'red' }}>購入金額が入力必須です</span>
        </div>
        <div className='div-top' style={userprodut.usetraderName === '0' ? { display: 'none' } : {}}>
          <span className='div-layout'>販売元名称</span>
          <span className={userprodut.usetraderName === '1' ? 'div-color2' : 'div-color'}>{userprodut.usetraderName === '1' ? '任意' : '必須'}</span>
          <TextField className='input-width' name='sellingelementname' value={sellingelementname}
            onChange={e => setSellingelementname(e.target.value)} required={userprodut.usetraderName === '1' ? false : true} />
        </div>
        <div className='div-top' style={userprodut.useproductUrl === '0' ? { display: 'none' } : {}}>
          <span className='div-layout'>販売元ＵＲＬ</span>
          <span className={userprodut.useproductUrl === '1' ? 'div-color2' : 'div-color'}>{userprodut.useproductUrl === '1' ? '任意' : '必須'}</span>
          <div style={{ display: 'inline-flex' }}>
            <TextField className='input-width' name='sellerURL'
              value={sellerURL} onChange={sellerurlCheck}
              required={userprodut.usetraderName === '1' ? false : true} />
          </div>
        </div>
        <div>
          <span style={{ display: urlErrorMessage, marginLeft: '350px', color: 'red' }}>英数字を入力してください </span>
        </div>
        <div className='div-top'>
          <span className='div-layout'>販売元メールアドレス</span>
          <span className='div-color'>必須</span>
          <div style={{ display: 'inline-flex' }}>
            <TextField className='input-width' name='sellingelementemail'
              value={sellingelementemail}
              onChange={sellingelementEmailCheck}
            />

          </div>
        </div>
        <div style={{ display: emailErrorMessage && emailNullErrorMessage ? 'none' : 'flex', marginLeft: '350px' }}>
          {emailErrorMessage !== 'none' ? <span style={{ display: emailErrorMessage, color: 'red' }}>正しいメールを入力してください</span>
            : (emailNullErrorMessage !== 'none' && <span style={{ display: emailNullErrorMessage, color: 'red' }}>販売元メールアドレスが入力必須です</span>
            )}
        </div>
        <div className='layout-span'>
          <div style={{ float: 'left', height: '200px' }}>
            <span className='div-layout'>申立ての種類</span>
            <span className='div-color'>必須</span>
          </div>
          <div style={{ height: '200px' }}>
            <ul>
              {
                comments.map(item => (
                  <li key={item.id} style={{ listStyleType: 'none' }}>
                    <input type='checkbox' name='petitionKind' value={item.content} id={item.content}
                      onChange={handelinputChecked}
                      checked={petitionKind.includes(item.content)}
                    />
                    <span className='input-font'>{item.content}</span>
                  </li>
                ))
              }
            </ul>
          </div>
          <div style={{ display: showElem, paddingLeft: '350px' }}>
            <span className='input-font' style={{ display: showElem }}>「その他」の内容の記載をお願いします</span><br />
            <input
              style={{ width: '300px', height: '40px', display: showElem }}
              name='sonota'
              value={sonota}
              onChange={e => { setSonota(e.target.value); setRequireOtherErrorMessage('none') }} />
            <div style={{ display: requireOtherErrorMessage !== 'none' ? 'flex' : 'none', height: '20px' }}>
              <span style={{ color: 'red' }}>その他内容が入力必須です</span>
            </div>
          </div>
        </div>
        <div style={{ display: requireDcommentsErrorMessage !== 'none' ? 'flex' : 'none', height: '20px' }}>
          <span style={{ display: requireDcommentsErrorMessage !== 'none' ? 'flex' : 'none', marginLeft: '350px', color: 'red' }}>申立ての種類が入力必須です</span>
        </div>
        <div className='layout-span'>
          <div style={{ height: '100xpx', textAlign: 'center', float: 'left' }}>
            <span className='div-layout'>申立て内容</span>
            <span className='div-color'>必須</span>
          </div>
          <div>
            <textarea style={{ width: '300px', height: '50px' }}
              name='petitioncontent'
              value={petitioncontent}
              onChange={e => { setPetitioncontent(e.target.value); setPetitionContentErrorMessage('none') }}
            >
            </textarea>
          </div>
        </div>
        <div style={{ display: petitionContentErrorMessage === '' ? 'flex' : 'none' }}>
          <span style={{ display: petitionContentErrorMessage, marginLeft: '350px', color: 'red' }}>申立て内容が入力必須です</span>
        </div>
        <div className='div-top'>
          <span className='div-layout'>添付資料</span>
          <span className='div-color2'>任意</span>
          <a onClick={handelPut} style={{ textDecoration: 'none', color: '#1976d2', cursor: 'pointer' }}><FileAddOutlined />添付ファイルの追加</a>
          <input id='file1' type="file" name="muFile" onChange={handleFileChange} style={{ display: 'none' }} />
        </div>
        <div style={{ display: fileTypeErrorMessage && fileSizeErrorMessage ? 'flex' : 'none', marginLeft: '360px' }}>
          {fileName === '' ? null : <span>{fileName}</span>}
        </div>
        <div style={{ display: fileTypeErrorMessage && fileSizeErrorMessage ? 'none' : 'flex', marginLeft: '340px' }}>
          <span style={{ marginLeft: '10px', color: 'red' }}>{fileError}</span>
        </div>
        <div className='layout-span'>
          <div style={{ float: 'left', height: '100px' }}>
            <span className='div-layout'>希望する解決方法</span>
            <span className='div-color'>必須</span>
          </div>
          <div style={{ height: '100px' }}>
            <ul>
              {
                solutions.map(item => (
                  <li key={item.id} style={{ listStyleType: 'none' }}>
                    <input type='checkbox' name='desiredsolutions' value={item.content}
                      onChange={handelChecked}
                      checked={desiredsolutions.includes(item.content)}
                    />
                    <span className='input-font'>{item.content}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <div style={{ display: requiredSolutionsErrorMessage !== 'none' ? 'flex' : 'none' }}>
          <span style={{ display: requiredSolutionsErrorMessage, marginLeft: '350px', color: 'red' }}>希望する解決方法を選択してが必須です</span>
        </div>
        <div style={{ display: useother.length === 0 ? 'none' : '' }}>
          <ul style={{ paddingLeft: '0px' }}>
            {
              useother.map((item, index) => (
                <div key={item.id}>
                  <li style={{ listStyleType: 'none', marginTop: '10px', display: index >= 5 ? 'none' : '' }}>
                    <span className='div-layout'>{item.ItemType === '0' ? '文字列' : '数値'}{item.IsRequired === '0' ? '任意' : '必須'}{index + 1}</span>
                    <span className={item.IsRequired === '0' ? 'div-color2' : 'div-color'}>{item.IsRequired === '0' ? '任意' : '必須'}</span>
                    <TextField className='input-width' name='useother'
                      value={item.content}
                      onChange={e => userothervalue(index, e)}
                    />
                  </li>
                  <div style={{ display: textMust.indexOf("textNull" + index) !== -1 ? 'flex' : 'none' }}>
                    <span style={{ marginLeft: '350px', color: 'red' }}>文字列が入力必須です</span>
                  </div>
                </div>
              ))
            }
          </ul>
        </div>

        <div className='div-left'>
          <span>お問い合わせをされる方についての情報</span>
        </div>
        <div style={{ marginTop: '10px' }}>
          <span className='div-layout'>所属会社</span>
          <input style={{ width: '355px' }} name='usercompany' value={userinfor.usercompany} disabled /><br />
          <span className='div-layout'>氏名</span>
          <input name='userfirstname' value={userinfor.userfirstname} disabled />
          <input style={{ marginLeft: '10px' }} name='userlastname' value={userinfor.userlastname} disabled /><br />
          <span className='div-layout'>氏名（カナ）</span>
          <input name='userkanafirstname' value={userinfor.userkanafirstname} disabled />
          <input style={{ marginLeft: '10px' }} name='userkanalastname' value={userinfor.userkanalastname} disabled /><br />
          <span className='div-layout'>メールアドレス</span>
          <input style={{ width: '355px' }} name='useremail' value={userinfor.useremail} disabled /><br />
        </div>
        <div style={{ marginLeft: '15%' }}>
          <span className='input-font' >情報を変更したい場合は、会員情報の変更をお願いします。</span><br />
          <LinkAA />
        </div>
        <div>
          <div style={{ marginLeft: '10%' }}>
            {
              agentemail.length !== 0 && (<ul>
                {
                  agentemail.map((item, index) => (
                    <div key={index}>
                      <li style={{ listStyleType: 'none' }}>
                        <span style={{ fontSize: '13px', fontWeight: 'bold' }}>代理人{index + 1}メールアドレス</span>
                        <TextField className='input-width' name='agentemail' value={item}
                          onChange={e => agentEmailvalue(index, e)}
                        /><br />
                        <div>
                          {agentEmailInputCheck.indexOf("agent" + index) !== -1 ?
                            <span style={{ marginLeft: '140px', color: 'red' }}>正しいメールアドレスを入力してください</span>
                            : (agentEmailIndexMust.indexOf(index) !== -1
                              && <span style={{ marginLeft: '140px', color: 'red' }}>代理人{index + 1}メールアドレスを入力してください</span>)
                          }
                        </div>
                        <div>
                          <Link className='a-style' onClick={(e) => agentRemove(index, e)}>+ 代理人{index + 1}の削除</Link>
                        </div>
                      </li>
                    </div>
                  ))
                }
              </ul>)
            }
          </div>
          <div style={{ marginLeft: '15%' }}>
            <Link className='a-style' onClick={agentAdd} style={agentemail.length >= 5 ? { display: 'none' } : {}}>+ 代理人の追加</Link>
          </div>
        </div>
        <div className='div-top' style={{ marginLeft: '15%', float: 'left' }}>
          <ColorWidthButton2 variant="contained" color="success" type='submit'
            style={{ float: 'right', marginBottom: 10 }}>確認画面へ</ColorWidthButton2>
          <ColorWidthButton1 variant="outlined"
            style={{ float: 'right', marginBottom: 10 }}
            onClick={TemporarySave}>下書き保存</ColorWidthButton1>
          <ColorWidthButton1 variant="outlined"
            style={{ float: 'right', marginBottom: 10 }}
            onClick={() => navigate('/MosList')}>戻る</ColorWidthButton1>
        </div>
      </form >
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={Open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="下書きを保存しました"
          key={'bottom' + 'left'}
          action={action}
        />
      </Box>
    </div>
  );
}

export default MosLogin;