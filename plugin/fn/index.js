export default {
	showError (msg) {
		uni.showToast({
			title: msg,
			image: '/static/icon/error.png'
		})
	},
	showSuccess (msg) {
		uni.showToast({
			title: msg,
			icon: '/static/icon/error.png'
		})
	},
	showModal (obj) {
		uni.showModal({
			title: '提示',
			// confirmColor: '007aff',
			...obj
		})
	},
	// null 转 ''
	nullToEmpty (str) {
		return str ? str : ''
	}
}
