import Mock from 'mockjs'

export default Mock.mock ('/GetPreUserData','get',options => {
    const email = Mock.mock (
        {
            mail:"123456@qq.com"
        }
    )
    return {
        status: 200,
        data: email
    }
})

export const ShowMiddleName = Mock.mock('/GetLanuage','get',options =>{
    const language = Mock.mock (
        {
            ShowMiddleName:1
        }
    )
    return {
        status: 200,
        data: language
    }
})
export const Login = Mock.mock('/Login','post',options =>{
    const userForm = JSON.parse(options.body)
    console.log(userForm)
})



    
