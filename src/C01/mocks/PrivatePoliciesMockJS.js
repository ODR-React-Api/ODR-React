import Mock from 'mockjs';

export default Mock.mock('/PrivatePolicies', 'post', Options => {

    const ret = Mock.mock(
        {
            VersionNo: '11112',
        }
    );

    return {
        status: 200,
        data: ret
    };
});
