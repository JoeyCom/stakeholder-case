<template>
	<view>
		<view class="uni-list uni-common-mt">
			<view class="uni-list-cell">
				<view class="uni-label g-p-normal">案件名称</view>
				<view class="uni-list-cell-db">{{ detail.caseName }}</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label g-p-normal">发布日期</view>
				<view class="uni-list-cell-db">{{ dayjs(detail.publishTime) }}</view>
			</view>
			<view class="uni-list-cell g-p-normal">
				<view class="uni-label">联系人</view>
				<view class="uni-list-cell-db">{{ detail.caseLinkPerson }}</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label g-p-normal">联系方式</view>
				<view class="uni-list-cell-db">{{ detail.caseLinkPhone }}</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label g-p-normal">举证截至日期</view>
				<view class="uni-list-cell-db">{{ dayjs(detail.deadline) }}</view>
			</view>
			<view class="uni-list-cell g-p-normal">
				<view class="uni-label">案列状态</view>
				<view class="uni-list-cell-db"><text class="g-tag primary plain">{{ detail.stateDescription }}</text></view>
			</view>
			<view class="uni-list-cell g-p-normal">
				<view class="uni-label">案列描述</view>
				<view class="uni-list-cell-db">{{ detail.caseContent }}</view>
			</view>
			
		</view>
		
		<view class="uni-padding-wrap uni-common-mt" v-if="!detail.proofInfo">
			<button type="primary" @click="proofBtn">举 证</button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad (q) {
			this.id = parseInt(q.id)
			this.getDetail(q.id)
		},
		data () {
			return {
				id: '',
				detail: {}
			}
		},
		methods: {
			getDetail (id) {
				this.$JRequest('caseDetail', '/' + id, data => {
					this.detail = data
				})
			},
			proofBtn () {
				let auth = JSON.parse(uni.getStorageSync('userInfo')).auth
				if (!auth) {
					this.$JFn.showError('请先实名认证')
					return
				}
				uni.navigateTo({
					url: '/pages/law-case/proof/index?id=' + this.id + '&productName=' + this.detail.productName
				})
			}
		}
	}
</script>

<style>
</style>
