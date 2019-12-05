<template>
	<view></view>
</template>

<script>
	export default {
		data () {
			return {
				path: ''
			}
		},
		onLoad (q) {
			this.path = q.path
		},
		onShow () {
			uni.showLoading({
				title: '登录中，请稍后'
			})
			// 登录
			uni.login({
			  success: (res) => {
			    if (res.code) {
						this.$JRequest('login', { js_code: res.code }, (data, res) => {
							// 登录成功，更换token
							uni.setStorageSync('token', res.token)
							uni.hideLoading()
							uni.reLaunch({
								url: decodeURIComponent(this.path) || '/pages/index/index'
							})
						}, (msg, data) => {
							uni.hideLoading()
							uni.setStorageSync('openid', data.openId)
							if (data.code === 101) {
								// 未登记
								// uni.setStorageSync('no_regi', 1)
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
							} else {
								this.$JFn.showError(msg)
							}
						})
					}
			  }
			})
		}
	}
</script>

<style>
</style>
