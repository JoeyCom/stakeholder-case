<template>
	<view>
		
		<view class="uni-padding-wrap uni-common-mt uni-common-mb">
			<button type="primary" @click="isEdit = true" size="mini" plain v-show="!isEdit">修改</button>
		</view>
		
		<view class="uni-list uni-common-mt">
			<view class="uni-list-cell">
				<view class="uni-label">产品名称</view>
				<view class="uni-list-cell-db g-p-normal">
					<!-- <input v-model="formData.productName" class="uni-input" type="text" :disabled="!isEdit" placeholder="请输入产品名称" /> -->
					<j-picker-check v-model="formDataExtra.productName" :range.sync="productRange" range-key="name" placeholder="请选择产品" multiple />
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">购买渠道</view>
				<view class="uni-list-cell-db g-p-normal">
					<radio-group class="uni-input" @change="channelChange" style="">
						<label>
							<!-- <radio :value="i.value" :checked="index === current" /> {{i.name}} -->
							<radio value="线上购买" :checked="formData.investChannel === '线上购买'" :disabled="!isEdit" /> 线上购买
						</label>
						<label>
							<!-- <radio :value="i.value" :checked="index === current" /> {{i.name}} -->
							<radio value="线下购买" :checked="formData.investChannel === '线下购买'" :disabled="!isEdit" /> 线下购买
						</label>
					</radio-group>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">投资本金总<br />金额(元)</view>
				<view class="uni-list-cell-db g-p-normal">
					<input v-model="formData.investMoney" class="uni-input" type="digit" :disabled="!isEdit" placeholder="请输入金额" />
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">购买地</view>
				<view class="uni-list-cell-db g-p-normal">
					<!-- <input v-model="formData.investAddress" class="uni-input" type="text" :disabled="!isEdit" placeholder="请输入购买地" /> -->
					<j-picker-region v-model="formDataExtra.investAddress" placeholder="请选择购买地" :disabled="!isEdit" />
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">保证金数额(元)</view>
				<view class="uni-list-cell-db g-p-normal">
					<input v-model="formData.guaranteeAmount" class="uni-input" type="digit" :disabled="!isEdit" placeholder="请输入金额" />
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">已返还本金及<br />利息数额(元)</view>
				<view class="uni-list-cell-db g-p-normal">
					<input v-model="formData.caseRefund" class="uni-input" type="digit" :disabled="!isEdit" placeholder="请输入金额" />
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">尚未返还本<br />金数额(元)</view>
				<view class="uni-list-cell-db g-p-normal">
					<input v-model="formData.caseNotRefund" class="uni-input" type="digit" :disabled="!isEdit" placeholder="请输入金额" />
				</view>
			</view>
			<view class="uni-list-cell g-p-normal">
				<view class="uni-label">合同</view>
				<view class="uni-list-cell-db">
					<robby-image-upload v-model="attachment" :limit="1" :showUploadProgress="false" :enable-del="isEdit" :enable-add="isEdit"></robby-image-upload>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">备注</view>
				<view class="uni-list-cell-db g-p-normal">
					<input v-model="formData.remark" class="uni-input" type="text" :disabled="!isEdit" placeholder="备注信息" />
				</view>
			</view>
		
		</view>
		
		<!--  点击添加流水的时候保存举证信息   -->
		<bank-statement :case-id="id" :is-edit="isEdit" @add-btn="enter(0)" />
		
		<view class="uni-padding-wrap uni-common-mt uni-common-mb">
			<button type="primary" @click="enter" plain v-show="isEdit">确认举证</button>
			<button type="primary" @click="submitProof" class="uni-common-mt">提交举证</button>
		</view>
		
	</view>
</template>

<script>
	import BankStatement from '@/components/bank-statement/index'
	export default {
		onLoad (q) {
			console.log(q)
			this.id = this.formData.caseId = parseInt(q.id)
			this.productRange = q.productName.split(this.productSeparator).map((v, i) => ({
				id: i,
				name: v
			}))
			// 获取举证资料
			// this.getDetail()
			// // 获取银行流水
			// this.getBankStatemen()
		},
		data () {
			return {
				id: '',
				// 产品分隔符
				productSeparator: '|',
				// 合同
				attachment: '',
				formData: {
					caseId: '',
					productName: '',
					investChannel: '',
					investMoney: '',
					investAddress: '',
					guaranteeAmount: '',
					caseRefund: '',
					caseNotRefund: '',
					remark: ''
				},
				formDataExtra: {
					productName: [],
					investAddress: []
				},
				// 是否能够编辑
				isEdit: true,
				// 产品 range
				productRange: []
			}
		},
		methods: {
			channelChange (evt) {
				this.formData.investChannel = evt.detail.value
			},
			/* type: 是否显示添加成功 */
			enter (isShowNotice = 1) {
				// if (!this.attachment[0]) {
				// 	this.$JFn.showError('请选择合同')
				// 	return
				// }
				this.formData.productName = this.formDataExtra.productName.map(v => v.name).join(this.productSeparator)
				this.formData.investAddress = this.formDataExtra.investAddress.join(' ')
				this.$JRequest('caseChannel', {
					...this.formData,
					jFile: {
						name: 'attachment',
						filePath: this.attachment[0]
					}
				}, () => {
					if (isShowNotice) {
						this.$JFn.showSuccess('举证成功')
						uni.navigateTo({
							url: '/pages/my/law-case/index'
						})
					}
				})
			},
			// 提交举证
			submitProof () {
				this.$JFn.showModal({
					title: '提示',
					content: '提交后将不能修改资料，确定提交吗？',
					success: (res) => {
						if (res.confirm) {
							this.$JRequest('submitPoof', '/' + this.id, data => {
								this.$JFn.showSuccess('提交成功')
								uni.navigateTo({
									url: '/pages/my/law-case/index'
								})
							})
						}
					}
				})
			}
		},
		components: { BankStatement }
	}
</script>

<style lang="scss">
</style>
