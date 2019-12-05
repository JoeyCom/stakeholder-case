<template>
	<view>
		<!-- <cl-tabs :tabBars="['全部', '举证登记中', '资金发放中', '资金退回', '资金待复核', '资金待审批', '待支付', '已完成']" :tabIndex="tabIndex" type="hang" @tabChange="tabChange"></cl-tabs> -->
		<!-- <cl-tabs :tab-bars="['全部', '举证登记中', '资金发放中', '资金退回', '资金待复核', '资金待审批', '待支付', '已完成']" :tab-index="tabIndex" @tabChange="tabChange"
			:scale="1.3" sliderColor="#faff72" type="float" ref="tabs1">
		</cl-tabs> -->
		<!-- <sun-tab :value.sync="tabIndex" :tabList="['全部', '举证登记中', '资金发放中', '资金退回', '资金待复核', '资金待审批', '待支付', '已完成']" scroll></sun-tab> -->
		<uni-card
			v-for="(v, i) in list.data"
			:key="i"
			:title="'序号' + (i + 1)" 
			mode="basic"
			note=""
		>
			<view>
				<view class="g-cell">
					<view class="label">案件名称</view>
					<view class="value">{{ v.caseName }}</view>
				</view>
				<view class="g-cell">
					<view class="label">产品名称</view>
					<view class="value">{{ v.proofInfo.productName }}</view>
				</view>
				<view class="g-cell">
					<view class="label">案件状态</view>
					<view class="value">{{ v.stateDescription }}</view>
				</view>
				<view class="g-cell">
					<view class="label">举证资料状态</view>
					<view class="value">{{ v.proofInfo.agencyStateDescription }}</view>
				</view>
			</view>
			
			<template v-slot:footer>
				<view style="display: flex; justify-content:flex-end;">
					<navigator :url="'/pages/my/law-case/detail?id=' + v.caseId + '&productName=' + v.productName"><button type="primary" size="mini" plain>案件详情</button></navigator>
					<navigator :url="'/pages/my/law-case/progress?data=' +  encodeURIComponent(JSON.stringify(v))"><button type="primary" size="mini">进展详情</button></navigator>
					<button type="warn" size="mini" @click="del(v.caseId)">删除</button>
				</view>
			</template>
		</uni-card>
		<uni-load-more :status="moreStatus[list.status]"></uni-load-more>
		
		<!-- <case-list v-if="list.data.length" :list="list.data"></case-list>
		<view v-else class="g-nodata">暂无案列</view> -->
	</view>
</template>

<script>
	import CaseList from './case-list'
	import mixinList from '@/components/mixin/list'
	export default {
		mixins: [mixinList],
		data () {
			return {
				urlList: 'myCaseList'
			}
		},
		onShow () {
			this.getList()
		},
		methods: {
			del (id) {
				this.$JFn.showModal({
					content: '确定删除吗？',
					success: res => {
						if (res.confirm) {
							this.$JRequest('myCaseDel', { caseId: id }, data => {
								this.$JFn.showSuccess('删除成功')
								this.getList()
							})
						}
					}
				})				
			}
		},
		components: { CaseList }
	}
</script>

<style lang="scss">
	.g-cell {
		.label {
			flex-basis: 200rpx;
		}
	}
</style>
