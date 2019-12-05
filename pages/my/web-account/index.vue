<template>
	<view>
		<!-- <uni-notice-bar text="Tips: web账号用于在web浏览器上登录涉众案件程序" background-color="#eee" color="#999"></uni-notice-bar> -->
		<!-- <web-view :webview-styles="{ progress: { color: '#FF3333' } }" src="http://120.79.13.215:8012/onlinePreview?url=http%3A%2F%2F120.79.13.215%3A8090%2Ffile%2Flogo.jpg"></web-view> -->
		
		<view v-if="userInfo">
			<uni-notice-bar text="Tips: 您已经设置了web账号,可用以下账号在web浏览器登录" background-color="#eee" color="#59c642"></uni-notice-bar>
			<view style="padding: 24rpx">账号：{{ userInfo }}</view>
		</view>
		
		<view v-else>
			<uni-notice-bar text="Tips: 添加web账号用于在web浏览器上登录涉众案件程序" background-color="#eee" color="#999"></uni-notice-bar>
			
			<view class="uni-list uni-common-mt">
				<view class="uni-list-cell g-p-normal">
					<view class="uni-label">用户名</view>
					<view class="uni-list-cell-db">
						<input v-model="formData.username" class="uni-input" type="text" placeholder="请输入用户名" />
					</view>
				</view>
				
				<view class="uni-list-cell g-p-normal">
					<view class="uni-label">密码</view>
					<view class="uni-list-cell-db">
						<input v-model="formData.password" class="uni-input" type="password" placeholder="请输入密码" />
					</view>
				</view>
				
				<view class="uni-list-cell g-p-normal">
					<view class="uni-label">确认密码</view>
					<view class="uni-list-cell-db">
						<input v-model="formData.enterPassword" class="uni-input" type="password" placeholder="请再次输入密码" />
					</view>
				</view>
			</view>
			
			<view class="uni-padding-wrap uni-common-mt">
				<button type="primary" @click="enter">添 加</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				userInfo: uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')).username : '',
				formData: {
					userId: JSON.parse(uni.getStorageSync('userInfo')).userId,
					username: '',
					password: '',
					enterPassword: ''
				}
			}
		},
		methods: {
			enter () {
				if (!this.formData.username) {
					this.$JFn.showError('请输入用户名')
					return
				}
				if (!this.formData.password) {
					this.$JFn.showError('请输入密码')
					return
				}
				if (this.formData.password !== this.formData.enterPassword) {
					this.$JFn.showError('两次密码不一致')
					return
				}
				this.$JRequest('userUpdate', this.formData, () => {
					this.$JFn.showSuccess('添加账号成功')
					uni.reLaunch({
						url: '/pages/index/index'
					})
				})
			}
		}
	}
</script>

<style>
</style>
