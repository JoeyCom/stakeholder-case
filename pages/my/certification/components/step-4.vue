<template>
	<view>
		<view class="uni-list uni-common-mt">
			<view class="uni-list-cell g-p-normal">
				<view class="uni-label">开户行名</view>
				<view class="uni-list-cell-db">
						<input v-model="formData.bankName" class="uni-input" type="text" placeholder="请输入开户行名" />
				</view>
			</view>
			
			<view class="uni-list-cell g-p-normal">
				<view class="uni-label">银行卡号</view>
				<view class="uni-list-cell-db">
						<input v-model="formData.cardNo" class="uni-input" type="number" placeholder="请输入银行卡号" />
				</view>
			</view>
			
		</view>
		<view class="uni-padding-wrap uni-common-mt uni-common-mb">
			<button type="primary" @click="enter">确 定</button>
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
					bankName: '',
					cardNo: '',
					auth: 1,
					step: 4
				}
			}
		},
		methods: {
			enter () {
				this.formData.userId = this.userId
				this.$JRequest('userUpdate', this.formData, () => {
					this.$JFn.showSuccess('实名成功')
					// 设置实名步骤
					let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
					userInfo.step = 4
					userInfo.auth = 1
					uni.setStorageSync('userInfo', JSON.stringify(userInfo))
					this.$emit('step-change')
				})
			}
		}
	}
</script>

<style>
</style>
