// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const tencentcloud = require("tencentcloud-sdk-nodejs")

  const IaiClient = tencentcloud.iai.v20200303.Client;

  const clientConfig = {
    credential: {
      // 此处替换自己的sercetId和secretKey
      secretId: "xxx",
      secretKey: "xxx",
    },
    region: "ap-guangzhou",
    profile: {
      httpProfile: {
        endpoint: "iai.tencentcloudapi.com",
      },
    },
  };


  let client = new IaiClient(clientConfig);
 
  let base64Data = event.x //接收客户端post的x参数，值类型为base64字符串
  var params = {
    Image: base64Data,
    NeedFaceAttributes: 1
  } // 定义SDK的请求参数字典

  return new Promise((resolve, reject) => {
    client.DetectFace(params, (errMsg, response) => {
      if (errMsg) {
        reject({ "Result": errMsg })
        // reject(errMsg)
      }
      // console.log(response)
      resolve({ "Result": response })
      // resolve(response)
    })
  }

  )
}