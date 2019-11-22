<template>
	<view>
		
		<view class="uni-padding-wrap uni-common-mt uni-common-mb">
			<button type="primary" @click="isEdit = true" size="mini" plain v-show="!isEdit">编辑</button>
		</view>
		
		<view class="uni-list uni-common-mt">
			<view class="uni-list-cell">
				<view class="uni-label">产品名称</view>
				<view class="uni-list-cell-db g-p-normal">
					<input v-model="formData.productName" class="uni-input" type="text" :disabled="!isEdit" />
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
					<input v-model="formData.investMoney" class="uni-input" type="digit" :disabled="!isEdit" />
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">购买地</view>
				<view class="uni-list-cell-db g-p-normal">
					<input v-model="formData.investAddress" class="uni-input" type="text" :disabled="!isEdit" />
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">保证金数额(元)</view>
				<view class="uni-list-cell-db g-p-normal">
					<input v-model="formData.guaranteeAmount" class="uni-input" type="digit" :disabled="!isEdit" />
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">已返还本金及<br />利息数额(元)</view>
				<view class="uni-list-cell-db g-p-normal">
					<input v-model="formData.caseRefund" class="uni-input" type="digit" :disabled="!isEdit" />
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">尚未返还本<br />金数额(元)</view>
				<view class="uni-list-cell-db g-p-normal">
					<input v-model="formData.caseNotRefund" class="uni-input" type="digit" :disabled="!isEdit" />
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
					<input v-model="formData.remark" class="uni-input" type="text" :disabled="!isEdit" />
				</view>
			</view>
		
		</view>
		
		<view class="uni-common-mt">
			<view class="g-category-title">
				交易流水
				<button type="primary" size="mini" style="float: right; margin-right: 16rpx;"  v-show="isEdit">添加</button>
			</view>
			<view class="uni-list uni-common-mt">
				
				<uni-list v-if="bankStatement.length">
					<uni-list-item v-for="(v, i) in bankStatement" :key="i" :title="'流水号：' + v.serialNo"></uni-list-item>
				</uni-list>
				<view v-else class="g-nodata">暂无流水</view>
		
			</view>
		</view>
		
		<view class="uni-padding-wrap uni-common-mt uni-common-mb" v-show="isEdit">
			<button type="primary" @click="enter" size="mini">确 定</button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad (q) {
			console.log(q)
			this.id = parseInt(q.id)
			// 获取举证资料
			this.getDetail()
			// 获取银行流水
			this.getBankStatemen()
		},
		data () {
			return {
				id: '',
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
				// 是否能够编辑
				isEdit: false,
				bankStatement: []
			}
		},
		methods: {
			channelChange (evt) {
				console.log(evt)
				this.formData.investChannel = evt.detail.value
			},
			getDetail () {
				this.$JRequest('poofCaseDetail', '/' + this.id, data => {
					this.formData = data
					this.attachment = data.attachment
				})
			},
			// 获取银行流水
			getBankStatemen () {
				this.$JRequest('caseBankstatement', { caseId: this.id }, data => {
					console.log(data.list)
					this.bankStatement = data.list
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
