<template>
	<view>
		<view class="uni-list uni-common-mt">
			<view class="uni-list-cell g-p-normal">
				<view class="uni-label">姓名</view>
				<view class="uni-list-cell-db">
					<input v-model="formData.name" class="uni-input" type="text" placeholder="请输入姓名" />
				</view>
			</view>
			<view class="uni-list-cell g-p-normal">
				<view class="uni-label">证件类型</view>
				<view class="uni-list-cell-db">
					<!-- <picker mode="selector" :value="index" :range="certTypes" range-key="name" @change="bindPickerChange">
						<input v-model="formData.certType" class="uni-input" type="text" placeholder="请选择证件类型" disabled />
					</picker> -->
					<j-picker-selector v-model="formData.certType" :range="certTypes" range-key="name" placeholder="请选择证件类型" />
				</view>
			</view>
			<view class="uni-list-cell g-p-normal">
				<view class="uni-label">证件号码</view>
				<view class="uni-list-cell-db">
					<input v-model="formData.certNo" class="uni-input" type="idcard" placeholder="请输入证件号码" />
				</view>
			</view>
			<view class="uni-list-cell g-p-normal">
				<view class="uni-label">手机号</view>
				<view class="uni-list-cell-db g-po-re">
					<input v-model="formData.mobile" class="uni-input" type="number" placeholder="请输入手机号" />
					<button class="g-tag primary plain g-fixed-right" :disabled="codeCountDown !== 0" @click="getCode">{{ codeText }}</button>
				</view>
			</view>
			<view class="uni-list-cell g-p-normal">
				<view class="uni-label">手机验证码</view>
				<view class="uni-list-cell-db">
					<input v-model="formData.code" class="uni-input" type="idcard" placeholder="请输入手机验证码" />
				</view>
			</view>
			<!-- <view class="uni-list-cell">
				<view class="uni-label">证件正面</view>
				<view class="uni-list-cell-db">
					<robby-image-upload v-model="certFront" :limit="1" :showUploadProgress="false"></robby-image-upload>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">证件反面</view>
				<view class="uni-list-cell-db">
					<robby-image-upload v-model="certBack" :showUploadProgress="false"></robby-image-upload>
				</view>
			</view> -->
			
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<button type="primary" @click="enter">确 定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				formData: {
					mobile: '',
					name: '',
					certType: '-1',
					certNo: '',
					code: ''
				},
				/* 
					01——身份证
					02——军人证
					03——护照
					04——港澳台通行证
					05——其他
				*/
				certTypes: [
					{
					 id: '01',
					 name: '身份证'
					},
					{
					 id: '02',
					 name: '军人证'
					},
					{
					 id: '03',
					 name: '护照'
					},
					{
					 id: '04',
					 name: '港澳台通行证'
					},
					{
					 id: '05',
					 name: '其他'
					}
				],
				// 验证码文字
				codeText: '发送验证码',
				// 获取验证码倒计时
				codeCountDown: 0
			}
		},
		methods: {
			// 获取验证码
			getCode () {
				if (!/^1[3456789]\d{9}$/.test(this.formData.mobile)) {
					this.$JFn.showError('手机格式错误')
					return
				}
				this.codeCountDown = 60
				this.codeText = '剩余' + this.codeCountDown + 's'
				let timer = setInterval(() => {
					this.codeText = '剩余' + (--this.codeCountDown) + 's'
					if (this.codeCountDown === 0) {
						this.codeText = '发送验证码'
						clearInterval(timer)
					}
				}, 1000)
				// 发送验证码
				this.$JRequest('sendCode', { mobile: this.formData.mobile }, () => {
					this.$JFn.showSuccess('发送验证码成功')
				})
			},
			enter () {
				this.$JRequest('regi', { ...this.formData, openId: uni.getStorageSync('openid') }, () => {
					this.$JFn.showSuccess('登记成功')
					uni.removeStorageSync('openid')
					this.$JFn.showModal({
						content: '是否继续完善信息？',
						cancelText: '跳过',
						confirmText: '继续',
						success: res => {
							if (res.confirm) {
								uni.reLaunch({
									url: '/pages/my/certification/index'
								})
							} else if (res.cancel) {
								uni.reLaunch({
									url: '/pages/index/index'
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
