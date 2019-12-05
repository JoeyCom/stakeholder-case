<template>
	<view>
		<view class="uni-list uni-common-mt">
			<view class="uni-list-cell g-p-normal">
				<view class="uni-label">证件正面</view>
				<view class="uni-list-cell-db">
					<robby-image-upload v-model="formData.certFront" :limit="1" :showUploadProgress="false" :server-url="uploadUrl" fileKeyName="attachment" :header="{ token: uni.getStorageSync('token') }"></robby-image-upload>
				</view>
			</view>
			
			<view class="uni-list-cell g-p-normal">
				<view class="uni-label">证件反面</view>
				<view class="uni-list-cell-db">
					<robby-image-upload v-model="formData.certBack" :limit="1" :showUploadProgress="false" :server-url="uploadUrl" fileKeyName="attachment" :header="{ token: uni.getStorageSync('token') }"></robby-image-upload>
				</view>
			</view>
			
		</view>
		<view class="uni-padding-wrap uni-common-mt uni-common-mb">
			<button type="primary" @click="enter">下一步</button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad (q) {
			console.log(q)
		},
		props: ['userId'],
		data () {
			return {
				uni,
				uploadUrl: this.$JConst.uploadUrl,
				formData: {
					certFront: '',
					certBack: ''
				}
			}
		},
		methods: {
			enter () {
				if (!this.formData.certFront[0]) {
					this.$JFn.showError('请上传证件正面')
					return
				}
				if (!this.formData.certBack[0]) {
					this.$JFn.showError('请上传证件反面')
					return
				}
				this.$JRequest('userUpdate', {
					userId: this.userId,
					frontPath: this.formData.certFront[0],
					backPath: this.formData.certBack[0],
					step: 1
				}, () => {
					this.$JFn.showSuccess('信息添加成功')
					// 设置实名步骤
					let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
					userInfo.step = 1
					uni.setStorageSync('userInfo', JSON.stringify(userInfo))
					// 转下一步
					this.$emit('step-change')
				})
			}
		}
	}
</script>

<style>
</style>
