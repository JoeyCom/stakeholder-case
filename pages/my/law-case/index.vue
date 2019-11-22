<template>
	<view>
		<!-- <cl-tabs :tabBars="['全部', '举证登记中', '资金发放中', '资金退回', '资金待复核', '资金待审批', '待支付', '已完成']" :tabIndex="tabIndex" type="hang" @tabChange="tabChange"></cl-tabs> -->
		<!-- <cl-tabs :tab-bars="['全部', '举证登记中', '资金发放中', '资金退回', '资金待复核', '资金待审批', '待支付', '已完成']" :tab-index="tabIndex" @tabChange="tabChange"
			:scale="1.3" sliderColor="#faff72" type="float" ref="tabs1">
		</cl-tabs> -->
		<!-- <sun-tab :value.sync="tabIndex" :tabList="['全部', '举证登记中', '资金发放中', '资金退回', '资金待复核', '资金待审批', '待支付', '已完成']" scroll></sun-tab> -->
		
		<case-list :list="list.data"></case-list>
	</view>
</template>

<script>
	import CaseList from './case-list'
	export default {
		data () {
			return {
				tabIndex: 1,
				list: {
					data: []
				}
			}
		},
		created () {
			this.getList()
		},
		methods: {
			getList () {
				this.$JRequest('myCaseList', data => {
					console.log(data)
					this.list.data = data
				})
			}
		},
		components: { CaseList }
	}
</script>

<style>
</style>
