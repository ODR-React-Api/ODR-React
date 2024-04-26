import Mock from 'mockjs'

export const MosContentConf = Mock.mock('/MosContentConf', 'post', req => {
  console.log('req',req)
  return 
})