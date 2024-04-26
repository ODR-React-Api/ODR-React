import Mock from 'mockjs'
export default Mock.mock('/GetName','get',() =>{
    const ret = Mock.mock(
        {
            name:'あいう',
        }
    )
    return{
        status: 200,
        data: ret
    }
})