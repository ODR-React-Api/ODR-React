import Mock from 'mockjs'

export default Mock.mock('/login','post',Options => {
    let Email = JSON.parse(Options.body).Email;
    let password = JSON.parse(Options.body).password;
    // 案件ある
    const ret1 = Mock.mock(
        {
            Email:'aaa@qq.com.cn',
            password:'1234567',
            FirstName:'テスト',
            MiddleName:'ユーザ',
            LastName:'さん',
            FirstName_kana:'irstName',
            MiddleName_kana:'MiddleName',
            LastName_kana:'LastName',
            PlatformId:'1',
            LanguageId:'Chinese',
            Status:'0',
            TimeZone:'',
            ConfirmedVersionNoOfTerms:'10001',
            ConfirmedVersionNoOfPolicy:'11112',
            UserType:'0',
        }
    )
    //　案件無し、VersionNoOfTerms一致　VersionNoOfPolicy不一致
    const ret2 = Mock.mock(
        {
            Email:'bbb@qq.com.cn',
            password:'1234567',
            FirstName:'テスト',
            MiddleName:'ユーザ',
            LastName:'さん',
            FirstName_kana:'irstName',
            MiddleName_kana:'MiddleName',
            LastName_kana:'LastName',
            PlatformId:'1',
            LanguageId:'Chinese',
            Status:'1',
            TimeZone:'',
            ConfirmedVersionNoOfTerms:'10001',
            ConfirmedVersionNoOfPolicy:'11111',
            UserType:'0',
        }
    )
    //　案件無し、VersionNoOfTerms不一致　VersionNoOfPolicy一致
    const ret3 = Mock.mock(
        {
            Email:'ccc@qq.com.cn',
            password:'1234567',
            FirstName:'テスト',
            MiddleName:'ユーザ',
            LastName:'さん',
            FirstName_kana:'irstName',
            MiddleName_kana:'MiddleName',
            LastName_kana:'LastName',
            PlatformId:'1',
            LanguageId:'Chinese',
            Status:'1',
            TimeZone:'',
            ConfirmedVersionNoOfTerms:'10000',
            ConfirmedVersionNoOfPolicy:'11112',
            UserType:'1',
        }
    )
    //　案件無し、VersionNoOfTerms不一致　VersionNoOfPolicy不一致
    const ret4 = Mock.mock(
        {
            Email:'ddd@qq.com.cn',
            password:'1234567',
            FirstName:'テスト',
            MiddleName:'ユーザ',
            LastName:'さん',
            FirstName_kana:'irstName',
            MiddleName_kana:'MiddleName',
            LastName_kana:'LastName',
            PlatformId:'1',
            LanguageId:'Chinese',
            Status:'1',
            TimeZone:'',
            ConfirmedVersionNoOfTerms:'10000',
            ConfirmedVersionNoOfPolicy:'11111',
            UserType:'1',
        }
    )
    //　案件無し、VersionNoOfTerms一致　VersionNoOfPolicy一致
    const ret5 = Mock.mock(
        {
            Email:'eee@qq.com.cn',
            password:'1234567',
            FirstName:'テスト',
            MiddleName:'ユーザ',
            LastName:'さん',
            FirstName_kana:'irstName',
            MiddleName_kana:'MiddleName',
            LastName_kana:'LastName',
            PlatformId:'1',
            LanguageId:'Chinese',
            Status:'1',
            TimeZone:'',
            ConfirmedVersionNoOfTerms:'10001',
            ConfirmedVersionNoOfPolicy:'11112',
            UserType:'1',
        }
    )

    if (Email === 'aaa@qq.com.cn' && password === '1234567'){
        return {
            status:200,
            data: ret1
        }
    } else if (Email === 'bbb@qq.com.cn' && password === '1234567'){
        return {
            status:200,
            data: ret2
        }   
    } else if (Email === 'ccc@qq.com.cn' && password === '1234567'){
        return {
            status:200,
            data: ret3
        }   
    } else if (Email === 'ddd@qq.com.cn' && password === '1234567'){
        return {
            status:200,
            data: ret4
        }   
    } else if (Email === 'eee@qq.com.cn' && password === '1234567'){
        return {
            status:200,
            data: ret5
        }   
    } else {
        return {
            status:404,
            data: null
        } 
    }
})

