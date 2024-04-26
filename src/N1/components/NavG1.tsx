import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';

import { ColorWidthButton1 } from '../../common/components/ButtonCommon';
import i18n from '../../common/utils/i18n';
import '../mocks/mockJs'
import '../assets/styles/Nav.scss';

function NavG1() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <div id='N1'>
            <div style={{marginTop:'10px',display:'block',paddingBottom:'30px'}}>
                <div className='titleN1'>Smart Judgement</div>
                <div onClick={() => i18n.changeLanguage('en')} className='TitleStyleN1'>English</div>
                <div onClick={() => i18n.changeLanguage('jp')} className='TitleStyleN1'>日本語</div>
            </div>
            {/* <hr /> */}
            <div>
                <h3>{t('今回のお取引において、お困りのことがありましたでしょうか？')}</h3>
                <h3>{t('反訴への回答を登録しました。')}</h3>
                <h3>{t('5分以内にメールが届かない場合は、メールアドレスの入力ミスの可能性がありますので、大変お手数ですが、再度ご登録をお願いします。')}</h3>
                <h3>{t('お客様から多くいただくご質問とその回答をFAQでご用意しています。')}</h3>
                <h3>{t('お問い合せ')}</h3>
                <ColorWidthButton1 variant='outlined' onClick={() => navigate('/N1/NavG2')}>ログイン後</ColorWidthButton1>
            </div>
        </div>
    )

}

export default NavG1;