import { urlPrefix } from '../const'
let urlAddr = urlPrefix

let apiGet = {
  // 登录
  login: '/wx/login',
	// 获取案例列表
	caseList: '/case/list',
	// 案例详情
	caseDetail: '/case/info',
	// 获取用户信息
	userInfo: '/sys/user/info',
	// 当前登录用户参与的案例信息
	myCaseList: '/case/user/list',
	// 删除我的案件
	myCaseDel: '/case/user/deleteById',
	// 举证案件详情
	poofCaseDetail: '/case/user/proof',
	// 案列流水
	caseBankstatement: '/case/bankstatement/list',
	// 提交举证资料
	submitPoof: '/case/user/commit',
	// 不再提示改条推送提示
	ignoreNotice: '/case/user/verify/ignore',
	// 发送手机验证码,参数 mobile
	sendCode: '/code',
}

let apiPost = {
	// 注册
	regi: '/wx/register',
	// 绑定
	bind: '/wx/bind',
	// 编辑用户信息 ( 实名认证 )
	// userUpdate: '/sys/user/update',
	userUpdate: '/sys/user/wx/update',
	// 删除流水
	bankStatementDel: '/case/bankstatement/delete',
	// 用户权益确认
	benefitConfirm: '/deliver/confirm',
	// 提出异议
	raiseObjection: '/case/user/appeal',
	// 首页推送提示
	verifyNotice: '/case/user/verify/notice',
	// 签名之后确权
	enterBenefit: '/case/user/confirm'
}

// 上传文件
let apiFile = {
	// 案例参与（举证）（基本信息保存）
	caseChannel: '/case/user/save',
	// 添加流水明细
	bankStatementAdd: '/case/bankstatement/add',
	// 编辑流水明细
	bankStatementUpdate: '/case/bankstatement/update',
	// 公用上传文件
	commonUpload: '/user/file/wx/upload',
	// 上传人脸信息
	uploadFace: '/sys/user/updateFace'
}

// 增加前缀
let url = {}
for (let k in apiGet) {
  url[k] = [urlAddr + '/invest_plateform' + apiGet[k], 'GET']
}

for (let k in apiPost) {
	isDefineUrl(url, k)
  url[k] = [urlAddr + '/invest_plateform' + apiPost[k], 'POST']
}

for (let k in apiFile) {
	isDefineUrl(url, k)
  url[k] = [urlAddr + '/invest_plateform' + apiFile[k], 'FILE']
}

export default url

// 检测url是否已定义键值
function isDefineUrl (url, key) {
  if (url[key]) {
    let msg = 'url配置中“' + key + '”已被定义，请更换'
    console.error(msg)
  }
}
