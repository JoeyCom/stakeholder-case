<template>
	<view>
		
		<view class="uni-list uni-common-mt">
			<view class="uni-list-cell">
				<view class="uni-label">案件名称</view>
				<view class="uni-list-cell-db g-p-normal">
					<input v-model="formData.caseName" class="uni-input" type="text" :disabled="!isEdit" />
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">产品名</view>
				<view class="uni-list-cell-db g-p-normal">
					<input v-model="formData.proofInfo.productName" class="uni-input" type="digit" :disabled="!isEdit" />
				</view>
			</view>
		
		</view>
		
		<view class="uni-list-cell">
			<view class="uni-label">举证人姓名</view>
			<view class="uni-list-cell-db g-p-normal">
				<input v-model="userInfo.name" class="uni-input" type="text" :disabled="!isEdit" />
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-label">证件号</view>
			<view class="uni-list-cell-db g-p-normal">
				<input v-model="userInfo.certNo" class="uni-input" type="digit" :disabled="!isEdit" />
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-label">银行账号</view>
			<view class="uni-list-cell-db g-p-normal">
				<input v-model="userInfo.cardNo" class="uni-input" type="digit" :disabled="!isEdit" />
			</view>
		</view>
		<view class="g-p-normal">
			<!-- <view class="uni-label">金额信息</view> -->
			<view class="g-category-title">金额信息</view>
			<view>
				<view class="table">
				  <view class="tr bg-w">
				    <view class="th"></view>
				    <view class="th">举证申报金额</view>
				    <view class="th ">核定金额</view>
				  </view>
				  <view>
				    <view class="tr">
				      <view class="td td-title">投资总额</view>
				      <view class="td">{{ formData.proofInfo.investMoney }}</view>
				      <view class="td">{{ formData.proofInfo.confirmMoneyInvest }}</view>
				    </view>
				    <view class="tr">
				      <view class="td td-title">未返还金额</view>
				      <view class="td">{{ formData.proofInfo.caseNotRefund }}</view>
				      <view class="td">{{ formData.proofInfo.confirmMoney }}</view>
				    </view>
				  </view>
				</view>
			</view>
		</view>
		
		<view class="uni-padding-wrap uni-common-mt uni-common-mb">
			<button type="warn" @click="raiseObjection" plain>提出异议</button>
			<button type="primary" @click="enterBenefit" class="uni-common-mt">确 权</button>
		</view>
		<uni-notice-bar text="Tips: 若因核定金额与举证金额不一致，而选择提出异议，请完善举证资料" background-color="#eee" color="#999"></uni-notice-bar>
		
		<neil-modal :show.sync="objection.show" title="提出异议" @confirm="raiseObjection">
			<view class="uni-list ">
				<view class="uni-list-cell">
					<view class="uni-label" style="width: 100rpx;">原因</view>
					<view class="uni-list-cell-db">
						<input v-model="objection.data.protestation" class="uni-input" type="text" placeholder="请输入异议原因" />
					</view>
				</view>
			
			</view>
		</neil-modal>
		
	</view>
</template>

<script>
	export default {
		onLoad (q) {
			console.log(q)
			// this.id = this.formData.caseId = this.modalBankStatement.data.caseId = parseInt(q.id)
			// 获取举证资料
			this.getDetail()
			// 获取用户信息
			this.getUserInfo()
		},
		data () {
			return {
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
				userInfo: {
					
				},
				objection: {
					show: false,
					data: {
						caseId: '',
						protestation: ''
					}
				}
			}
		},
		methods: {
			getDetail () {
				this.formData = JSON.parse(uni.getStorageSync('current_benefit_detail'))
			},
			getUserInfo () {
				this.$JRequest('userInfo', data => {
					this.userInfo = data
				})
			},
			// 提出异议
			raiseObjection () {
				let params = {
					caseId: this.formData.caseId,
					// protestation: this.objection.data.protestation,
					protestation: '',
				}
				this.$JRequest('raiseObjection', params, data => {
					this.$JFn.showSuccess('异议提交成功')
					uni.navigateTo({
						url: '/pages/my/benefit/index'
					})
				})
			},
			// 确权
			enterBenefit () {
				uni.navigateTo({
					url: '/pages/my/benefit/signature?id=' + this.formData.caseId
				})
			}
		}
	}
</script>

<style lang="scss">
	.table {
	  border: 0px solid darkgray;
	}
	.tr {
	  display: flex;
	  width: 100%;
	  justify-content: center;
	  height: 3rem;
	  align-items: center;
	}
	.td {
	    width:40%;
			height: 100%;
			padding-top: 28rpx;
			box-sizing: border-box;
	    justify-content: center;
	    text-align: center;
			border-bottom: 1px solid #eee;
	}
	.td-title {
		// background-color: #f1f2f3;
		color: #555;
	}
	.bg-w{
	  background: snow;
	}
	.bg-g{
	  background: #E6F3F9;
	}
	.th {
	  width: 40%;
	  justify-content: center;
		background-color: #f5f6f7;
		color: #555;
	  display: flex;
	  height: 3rem;
	  align-items: center;
	}
</style>
