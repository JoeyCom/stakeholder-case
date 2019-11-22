// import { urlPrefix } from '../const'

let apiGet = {
  // 登录
  login: '/wx/login',
	// 案例详情
	caseDetail: '/case/info',
	// 获取用户信息
	userInfo: '/sys/user/info',
	// 举证案件详情
	poofCaseDetail: '/case/user/proof',
	// 案列流水
	caseBankstatement: '/case/bankstatement/list'
}

let apiPost = {
	// 注册
	regi: '/wx/register',
	// 绑定
	bind: '/wx/bind',
	// 获取案例列表
	caseList: '/case/list',
	// 编辑用户信息
	userUpdate: '/sys/user/update',
	// 当前登录用户参与的案例信息
	myCaseList: '/case/user/list'
}

// 上传文件
let apiFile = {
	// 案例参与（举证）（基本信息保存）
	caseChannel: '/case/user/save'
}

// 增加前缀
let url = {}
for (let k in apiGet) {
  url[k] = ['http://128.2.136.178:8080/invest_plateform' + apiGet[k], 'GET']
}

for (let k in apiPost) {
	isDefineUrl(url, k)
  url[k] = ['http://128.2.136.178:8080/invest_plateform' + apiPost[k], 'POST']
}

for (let k in apiFile) {
	isDefineUrl(url, k)
  url[k] = 'http://128.2.136.178:8080/invest_plateform' + apiFile[k]
}

export default url

// 检测url是否已定义键值
function isDefineUrl (url, key) {
  if (url[key]) {
    let msg = 'url配置中“' + key + '”已被定义，请更换'
    console.error(msg)
  }
}
