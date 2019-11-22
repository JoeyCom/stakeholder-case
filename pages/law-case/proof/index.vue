<template>
	<view>
		<view class="uni-list uni-common-mt">
			<view class="uni-list-cell">
				<view class="uni-label">产品名称</view>
				<view class="uni-list-cell-db g-p-normal">
					<input v-model="formData.productName" class="uni-input" type="text" placeholder="请输入产品名称" />
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">购买渠道</view>
				<view class="uni-list-cell-db g-p-normal">
					<radio-group class="uni-input" @change="channelChange">
						<label>
							<!-- <radio :value="i.value" :checked="index === current" /> {{i.name}} -->
							<radio value="线上购买" /> 线上购买
						</label>
						<label>
							<!-- <radio :value="i.value" :checked="index === current" /> {{i.name}} -->
							<radio value="线下购买" /> 线下购买
						</label>
					</radio-group>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">投资本金总<br />金额(元)</view>
				<view class="uni-list-cell-db g-p-normal">
					<input v-model="formData.investMoney" class="uni-input" type="digit" placeholder="请输入金额" />
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">购买地</view>
				<view class="uni-list-cell-db g-p-normal">
					<input v-model="formData.investAddress" class="uni-input" type="text" placeholder="请输入购买地" />
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">保证金数额(元)</view>
				<view class="uni-list-cell-db g-p-normal">
					<input v-model="formData.guaranteeAmount" class="uni-input" type="digit" placeholder="请输入金额" />
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">已返还本金及<br />利息数额(元)</view>
				<view class="uni-list-cell-db g-p-normal">
					<input v-model="formData.caseRefund" class="uni-input" type="digit" placeholder="请输入金额" />
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">尚未返还本<br />金数额(元)</view>
				<view class="uni-list-cell-db g-p-normal">
					<input v-model="formData.caseNotRefund" class="uni-input" type="digit" placeholder="请输入金额" />
				</view>
			</view>
			<view class="uni-list-cell g-p-normal">
				<view class="uni-label">合同</view>
				<view class="uni-list-cell-db">
					<robby-image-upload v-model="attachment" :limit="1" :showUploadProgress="false"></robby-image-upload>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">备注</view>
				<view class="uni-list-cell-db g-p-normal">
					<input v-model="formData.remark" class="uni-input" type="text" placeholder="备注信息" />
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
		onLoad (q) {
			console.log(q)
			this.formData.caseId = parseInt(q.id)
		},
		data () {
			return {
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
				// 购买渠道
			}
		},
		methods: {
			channelChange (evt) {
				console.log(evt)
				this.formData.investChannel = evt.detail.value
			},
			enter () {
				this.$JRequest({
					method: 'FILE',
					url: 'caseChannel',
					name: 'attachment',
					filePath: this.attachment[0],
					files: this.attachment.map(v => ({
						name: 'attachment',
						uri: v
					})),
					formData: this.formData,
					success: res => {
						console.log(res)
					}
				})
				// this.$JRequest('caseChannel', this.formData, data => {
				// 	this.$JFn.showSuccess('举证成功')
				// })
			}
		}
	}
</script>

<style lang="scss">
</style>
