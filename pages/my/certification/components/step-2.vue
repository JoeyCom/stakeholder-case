<template>
	<view>
		<view class="uni-common-mt">
			<view class="camera-box">
				<view class="preview-box" @click="selectImg">
					<image v-if="formData.face" class="preview-img" :src="formData.face" mode="aspectFit"></image>
					<image v-else class="preview-img" src="//aip.bdstatic.com/faceliveness/dist/1523595724898/images/sketch.png" mode="aspectFit"></image>
				</view>
				<view class="camera-explain">正面平视手机、保证光线充足、请勿遮挡面部</view>
			</view>
		</view>
		
		<view class="camera-notice">
			<view class="step"><text class="g-serial-num">1</text>　点击图片拍摄人脸头像</view>
			<view class="step"><text class="g-serial-num">2</text>　开启前置摄像头，拍照确认</view>
			<view class="step"><text class="g-serial-num">3</text>　人脸头像上传，完成上传，等待验证结果</view>
		</view>
		
		<view class="uni-padding-wrap uni-common-mt uni-common-mb">
			<button type="primary" @click="enter">下一步</button>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['userId'],
		data () {
			return {
				formData: {
					face: ''
				}
			}
		},
		methods: {
			// 选择图片
			selectImg () {
				uni.chooseImage({
					count: 1,
					sourceType: ['camera'],
					success: res => {
						this.formData.face = res.tempFilePaths[0]
					}
				})
			},
			enter () {
				if (!this.formData.face) {
					this.$JFn.showError('请拍摄人脸')
					return
				}
				console.log(this.formData.face)
				this.$JRequest('uploadFace', {
					userId: this.userId,
					step: 2,
					jFile: {
						name: 'faceAttachment',
						filePath: this.formData.face
					}
				}, () => {
					this.$JFn.showSuccess('识别成功')
					// 设置实名步骤
					let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
					userInfo.step = 2
					uni.setStorageSync('userInfo', JSON.stringify(userInfo))
					// 转下一步
					this.$emit('step-change')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.camera-box {
		width: 750rpx;
		// height: 600rpx;
		background-color: #f4f4f4;
		.preview-box {
			width: 100%;
			height: 500rpx;
			.preview-img {
				width: 100%;
				height: 100%;
			}
		}
		.camera-explain {
			padding: 24rpx 0;
			text-align: center;
			color: #999;
		}
	}
	.camera-notice {
		padding: 60rpx;
		padding-bottom: 20rpx;
		color: #777;
		.step {
			margin-bottom: 30rpx;
		}
	}
</style>
