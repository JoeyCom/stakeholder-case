export default {
	data () {
		return {
			urlList: '',
			queryParams: {},
			// 列表
			list: {
				// 分页请求参数
				paging: {
					page: 1,
					limit: this.$JConst.listLimit
				},
				// 分页数据
				data: [],
				// 数据状态
				status: 1
			},
			moreStatus: this.$JConst.moreStatus
		}
	},
	onReachBottom () {
		if (this.list.status === 0) {
			this.getList()
		}
	},
	methods: {
		// 获取列表
		getList (callback) {
			this.list.status = 1
			this.$JRequest(this.urlList, { ...this.list.paging, ...this.queryParams}, data => {
				// 请求页自增
				this.list.paging.page++
				this.list.data = [...this.list.data, ...data.list]
				// 达到最大请求数据
				if (this.list.paging.page > data.totalPage) {
					this.list.status = 2
				} else {
					this.list.status = 0
				}
				typeof callback === 'function' && callback()
			})
		}
	}
}