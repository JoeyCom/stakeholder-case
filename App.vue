<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
			
			// if (uni.getStorageSync('no_regi')) {
			// 	this.noRegi()
			// 	return
			// }
			
			// if (!uni.getStorageSync('openid') && !uni.getStorageSync('token')) {
			// 	// 获取code
			// 	uni.login({
			// 	  success: (res) => {
			// 	    if (res.code) {
			// 				this.$JRequest('login', { js_code: res.code }, (data, res) => {
			// 					// 登录成功
			// 					// uni.setStorageSync('openid', data)
			// 					uni.setStorageSync('token', res.token)
			// 				}, (msg, data) => {
			// 					uni.setStorageSync('openid', data.openId)
			// 					if (data.code === 101) {
			// 						// 未登记
			// 						uni.setStorageSync('no_regi', 1)
			// 						this.noRegi(msg)
			// 					}
			// 				})
			// 			}
			// 	  }
			// 	})
			// }
			
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
		methods: {
			// 未登记
			noRegi (msg = '未绑定或未登记') {
				this.$JFn.showModal({
					title: '提示',
					content: msg,
					cancelText: '去绑定',
					confirmText: '去登记',
					success (res) {
						if (res.confirm) {
							// 跳登记页面
							uni.navigateTo({
								url: '/pages/my/register/index'
							})
						} else if (res.cancel) {
							// 跳绑定页面
							uni.navigateTo({
								url: '/pages/my/bind/index'
							})
						}
					}
				})
			}
		}
	}
</script>


<style lang="scss">
	@import "static/iconfont/iconfont.css";
	@import "style/uni.scss";
	/*每个页面公共css */
	@import "style/common.scss";
</style>
