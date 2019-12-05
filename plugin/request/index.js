import requestUrl from './url'

// 不传入token的方法
const notTokenFns = [
	// 登录
	'login'
]
// 成功状态
const successStatus = 0
// 未登录状态
const notLoginStatus = 401

// 是否是对象
function isObj(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]'
}
// 是否是 FormData 对象
function isFormData(obj) {
	return Object.prototype.toString.call(obj) === '[object FormData]'
}

// 是否是字符串
function isStr(obj) {
	return typeof obj === 'string'
}

// 是否是函数
function isFn(obj) {
	return typeof obj === 'function'
}

// 是否传入body
function hasBody(obj) {
	return isObj(obj) || isFormData(obj) || isStr(obj)
}

// 根据传参执行函数
function paramExe(fn, param) {
	switch (param.length) {
		case 2:
			if (isStr(param[0]) && isFn(param[1])) {
				return fn({
					url: param[0],
					success: param[1]
				})
			} else if (isStr(param[0]) && hasBody(param[1])) {
				return fn({
					url: param[0],
					body: param[1]
				})
			}
			break
		case 3:
			if (isStr(param[0]) && hasBody(param[1]) && isFn(param[2])) {
				return fn({
					url: param[0],
					body: param[1],
					success: param[2]
				})
			}
			break
		case 4:
			if (isStr(param[0]) && hasBody(param[1]) && isFn(param[2]) && isFn(param[3])) {
				return fn({
					url: param[0],
					body: param[1],
					success: param[2],
					fail: param[3]
				})
			}
			break
		default:
			return false
	}
}

function install(Vue, router) {
	/*
	 *  返回默认参数
	 *  param object
	 * */
	function returnDefaultParam(param) {
		// 初始化参数
		let url
		let body
		let config
		let successFn
		let failFn
		if (Object.prototype.toString.call(param) === '[object Object]') {
			url = requestUrl[param.url] ? requestUrl[param.url] : param.url
			body = param.body || {}
			config = param.config || {}
			successFn = typeof param.success === 'function' ? param.success : function() {}
			failFn = typeof param.fail === 'function' ? param.fail : function(msg) {
				Vue.prototype.$JFn.showError(msg)
			}
		} else {
			Vue.prototype.$JFn.showError('参数传递错误')
			return false
		}
		return {
			url,
			body,
			config,
			successFn,
			failFn
		}
	}

	// 请求成功时调用
	function requestSuccess(successFn, failFn, res, requestQarams) {
		if (res.data.code !== successStatus) {
			// token 失效
			if (res.data.code === notLoginStatus) {
				// 重新登录
				// uni.login({
				//   success: (res) => {
				//     if (res.code) {
				// 			request('login', { js_code: res.code }, (data, res) => {
				// 				// 登录成功，更换token
				// 				uni.setStorageSync('token', res.token)
				// 				// 再次请求
				// 				console.log(requestQarams)
				// 			}, (msg, data) => {
				// 				uni.setStorageSync('openid', data.openId)
				// 				if (data.code === 101) {
				// 					// 未登记
				// 					uni.setStorageSync('no_regi', 1)
				// 					Vue.prototype.$JFn.showModal({
				// 						title: '提示',
				// 						content: msg,
				// 						cancelText: '去绑定',
				// 						confirmText: '去登记',
				// 						success (res) {
				// 							if (res.confirm) {
				// 								// 跳登记页面
				// 								uni.navigateTo({
				// 									url: '/pages/my/register/index'
				// 								})
				// 							} else if (res.cancel) {
				// 								// 跳绑定页面
				// 								uni.navigateTo({
				// 									url: '/pages/my/bind/index'
				// 								})
				// 							}
				// 						}
				// 					})
				// 				}
				// 			})
				// 		}
				//   }
				// })
				
				let pages = getCurrentPages()
				let currentPage = pages[pages.length - 1]
				let route = '/' + currentPage.route + '?'
				let options = currentPage.options
				for (let k in options) {
					route += k + '=' + options[k] + '&'
				}
				route = route.substr(0, route.length - 1)
				uni.navigateTo({
					url: '/pages/login/index?path=' + encodeURIComponent(route)
				})
			} else {
				failFn(res.data.msg, res.data)
			}
			return
		}
		return successFn(res.data.data, res.data)
	}

	// 请求失败时调用
	function requestFail(err) {
		Vue.prototype.$JFn.showError('请求错误')
		console.log(err)
	}
	
	// 拼接formData数据
	function createFormData (obj, sign = 'XXX') {
		let str = ''
		for (let k in obj) {
			str += `\r\n--${sign}\r\nContent-Disposition: form-data; name="${k}"\r\n\r\n${obj[k]}`
		}
		str += `\r\n--${sign}--`
		return str
	}

	/*
	 *  param
	 *   data = {
	 *     url: 请求地址，必填
	 *     body：请求参数
	 *     config：请求配置
	 *     success：请求成功执行的函数
	 *     fail：请求失败执行的函数，默认弹出警告
	 *     token：是否需要token，默认为true
	 *   }
	 * */
	function request (data) {
		// 当data是对象并且data.method是文件时，上传文件
		if (isObj(data) && data.method === 'FILE') {
			uploadFile({
				...data,
				url: requestUrl[data.url]
			})
			return
		}
		// 初始化参数
		let url
		let body
		let config
		let successFn
		let failFn
		
		let paramExeRes = paramExe(request, arguments)
		if (paramExeRes) return paramExeRes
		// 没有返回的时候停止执行
		if (paramExeRes !== false) return
		
		let defaultParam = returnDefaultParam(data)
		if (defaultParam) {
			url = defaultParam.url
			body = defaultParam.body
			config = defaultParam.config
			successFn = defaultParam.successFn
			failFn = defaultParam.failFn
		} else return
		
		// 必须传入url
		if (!url) {
			Vue.prototype.$JFn.showError('请传入url')
			return
		}
		// 需要传token的接口
		if (notTokenFns.indexOf(url) === -1) {
			// let tokenExpire = uni.getStorageSync('token_expire')
			
			config.token = uni.getStorageSync('token')
		}
		let params = {
			url: url[0],
			data: body,
			header: config,
			method: url[1],
			success (res) {
				return requestSuccess(successFn, failFn, res, {url, body, config, successFn, failFn})
			},
			fail (err) {
				requestFail(err)
			}
		}
		if(url[1] === 'GET' || url[1] === 'POST') {
			// body为字符串时使用pathinfo方式请求
			if (isStr(body)) {
				params.url = url[0] + body
				delete params.data
			}
			return uni.request(params)
		} else if (url[1] === 'FILE') {
			if (body.jFile && body.jFile.filePath) {
				let obj = {
					url: url[0],
					name: body.jFile.name || 'file',
					filePath: body.jFile.filePath,
					header: config,
					success: res => {
						res.data = JSON.parse(res.data)
						return requestSuccess(successFn, failFn, res)
					},
					fail (err) {
						requestFail(err)
					}
				}
				delete body.jFile
				obj.formData = body
				return uni.uploadFile(obj)
			} else {
				// 没穿文件，调用普通post
				params.method = 'POST'
				delete params.data.jFile
				let sign = 'XXXXX'
				params.header['Content-Type'] = 'multipart/form-data; boundary=' + sign
				params.data = createFormData(params.data, sign)
				return uni.request(params)
			}
		}
	}
	
	// 上传文件
	function uploadFile (obj) {
		obj = {
			header: { token: uni.getStorageSync('token'), ...obj.header },
			...obj
		}
		uni.uploadFile(obj)
	}

	// Vue.prototype.$JRequest = {
	// 	post,
	// 	get
	// }

	return request
}

export default install
