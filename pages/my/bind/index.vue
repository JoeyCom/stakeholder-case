<template>
	<view>
		<uni-notice-bar text="Tips: 如果您之前在web浏览器上注册过改程序,可直接绑定用户" background-color="#eee" color="#999"></uni-notice-bar>
		<view class="uni-list uni-common-mt">
			<view class="uni-list-cell">
				<view class="uni-label">用户名</view>
				<view class="uni-list-cell-db">
					<input v-model="formData.username" class="uni-input" type="text" placeholder="请输入用户名" />
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">密码</view>
				<view class="uni-list-cell-db">
					<input v-model="formData.password" class="uni-input" type="password" placeholder="请输入密码" />
				</view>
			</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<button type="primary" @click="enter">绑 定</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				formData: {
					username: '',
					password: '',
					openId: uni.getStorageSync('openid')
				}
			}
		},
		methods: {
			enter () {
				this.$JRequest('bind', this.formData, data => {
					this.$JFn.showSuccess('绑定成功')
					// 登录
					uni.login({
					  success: (res) => {
					    if (res.code) {
								this.$JRequest('login', { js_code: res.code }, (data, res) => {
									// 登录成功
									uni.setStorageSync('token', res.token)
									// 改变登录状态
									uni.removeStorageSync('openid')
									// 跳至首页
									uni.reLaunch({
										url: '/pages/index/index'
									})
								})
							}
					  }
					})
				})
			}
		}
	}
</script>

<style>
</style>
