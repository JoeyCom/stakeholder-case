<template>
	<view>
		<!-- <cl-tabs :tabBars="['全部', '举证登记中', '资金发放中', '资金退回', '资金待复核', '资金待审批', '待支付', '已完成']" :tabIndex="tabIndex" type="hang" @tabChange="tabChange"></cl-tabs> -->
		<!-- <cl-tabs :tab-bars="['全部', '举证登记中', '资金发放中', '资金退回', '资金待复核', '资金待审批', '待支付', '已完成']" :tab-index="tabIndex" @tabChange="tabChange"
			:scale="1.3" sliderColor="#faff72" type="float" ref="tabs1">
		</cl-tabs> -->
		<!-- <sun-tab :value.sync="tabIndex" :tabList="['全部', '举证登记中', '资金发放中', '资金退回', '资金待复核', '资金待审批', '待支付', '已完成']" scroll></sun-tab> -->
		
		<case-list :list="listFilter"></case-list>
		<uni-load-more :status="moreStatus[list.status]"></uni-load-more>
	</view>
</template>

<script>
	import CaseList from './case-list'
	import mixinList from '@/components/mixin/list'
	export default {
		mixins: [mixinList],
		data () {
			return {
				urlList: 'myCaseList',
				queryParams: {
					state: 3
				}
			}
		},
		onShow () {
			this.getList()
		},
		methods: {
			
		},
		computed: {
			listFilter () {
				return this.list.data.filter(v => {
					return v.proofInfo.confirm === 0 && v.proofInfo.agencyState === 4
				})
			}
		},
		components: { CaseList }
	}
</script>

<style>
</style>
