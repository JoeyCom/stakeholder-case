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
			<view class="uni-list-cell">
				<view class="uni-label g-p-normal">案列状态</view>
				<view class="uni-list-cell-db"><text class="g-tag primary plain">{{ detail.stateDescription }}</text></view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label g-p-normal">案列描述</view>
				<view class="uni-list-cell-db">{{ detail.caseContent }}</view>
			</view>
			
		</view>
		
		<view class="uni-padding-wrap uni-common-mt">
			<navigator :url="'/pages/law-case/proof/index?id=' + id"><button type="primary">举 证</button></navigator>
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
					console.log(data)
					this.detail = data
				})
			}
		}
	}
</script>

<style>
</style>
