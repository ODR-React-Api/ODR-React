import Mock from 'mockjs';

export default Mock.mock('/Policies', 'post', Options => {

    const ret = Mock.mock(
        {
            VersionNo: '10001',
        }
    );

    return {
        status: 200,
        data: ret
    };

});
