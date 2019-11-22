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
			confirmColor: '007aff',
			...obj
		})
	}
}
