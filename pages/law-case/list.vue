<template>
	<view>
		<m-search @search="search()"></m-search>
		<img-text-list :list="list.data"></img-text-list>
		<uni-load-more :status="moreStatus[list.status]"></uni-load-more>
	</view>
</template>

<script>
	import mixinPaging from '@/components/mixin/paging'
	export default {
		mixins: [mixinPaging],
		data () {
			return {
				urlList: 'caseList',
				queryParams: {
					caseName: ''
				}
			}
		},
		onLoad () {
			// 获取列表
			this.getList()
		},
		onPullDownRefresh () {
			this.list.paging.page = 1
			this.list.data = []
			this.getList(uni.stopPullDownRefresh)
		},
		methods: {
			search (val) {
				this.list.data = []
				this.list.paging.page = 1
				this.queryParams.caseName = val
				this.getList()
			}
		}
	}
</script>

<style>
</style>
