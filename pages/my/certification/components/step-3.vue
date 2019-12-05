<template>
	<view>
		<view class="category">
			<view class="uni-list uni-common-mt">
				<view class="uni-list-cell">
					<view class="uni-label">QQ</view>
					<view class="uni-list-cell-db g-p-normal">
						<input v-model="formData.qq" class="uni-input" type="text" placeholder="请输入QQ" />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">微信</view>
					<view class="uni-list-cell-db g-p-normal">
						<input v-model="formData.weiXin" class="uni-input" type="text" placeholder="请输入微信" />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">邮箱</view>
					<view class="uni-list-cell-db g-p-normal">
						<input v-model="formData.email" class="uni-input" type="text" placeholder="请输入邮箱" />
					</view>
				</view>
				<!-- <view class="uni-list-cell">
					<view class="uni-label">现住地址</view>
					<view class="uni-list-cell-db g-p-normal">
						<j-picker-region v-model="info.address" />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">工作地址</view>
					<view class="uni-list-cell-db g-p-normal">
						<input v-model="info.workPlace" class="uni-input" type="text" />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">报案地址</view>
					<view class="uni-list-cell-db g-p-normal">
						<input v-model="info.reportPlace" class="uni-input" type="text" />
					</view>
				</view> -->
			</view>
		</view>
		
		<view class="category">
			<view class="g-category-title">现住址</view>
			<j-picker-address v-model="formDataExtra.address" />
		</view>
		<view class="category">
			<view class="g-category-title">工作地址</view>
			<j-picker-address v-model="formDataExtra.workPlace" />
		</view>
		<view class="category">
			<view class="g-category-title">报案地址</view>
			<j-picker-address v-model="formDataExtra.reportPlace" />
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
					userId: '',
					qq: '',
					weiXin: '',
					email: '',
					address: '',
					addressStreet: '',
					workPlace: '',
					workPlaceStreet: '',
					reportPlace: '',
					reportPlaceStreet: '',
					step: 3
				},
				formDataExtra: {
					address: [],
					workPlace: [],
					reportPlace: []
				}
			}
		},
		methods: {
			enter () {
				this.formData.userId = this.userId
				this.formData.address = this.formDataExtra.address.slice(0, 3).join(' ')
				this.formData.addressStreet = this.formDataExtra.address[3]
				this.formData.workPlace = this.formDataExtra.workPlace.slice(0, 3).join(' ')
				this.formData.workPlaceStreet = this.formDataExtra.workPlace[3]
				this.formData.reportPlace = this.formDataExtra.reportPlace.slice(0, 3).join(' ')
				this.formData.reportPlaceStreet = this.formDataExtra.reportPlace[3]
				
				this.$JRequest('userUpdate', this.formData, () => {
					this.$JFn.showSuccess('信息添加成功')
					// 设置实名步骤
					let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
					userInfo.step = 3
					uni.setStorageSync('userInfo', JSON.stringify(userInfo))
					// 转下一步
					this.$emit('step-change')
				})
			}
		}
	}
</script>

<style lang="scss">
	.category {
		margin-top: 30rpx;
	}
</style>
