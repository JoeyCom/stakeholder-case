export default {
	data () {
		return {
			urlList: '',
			queryParams: {},
			list: {
				data: [],
				status: 1
			},
			moreStatus: this.$JConst.moreStatus
		}
	},
	methods: {
		getList () {
			this.list.status = 1
			this.$JRequest(this.urlList, { ...this.queryParams }, data => {
				this.list.data = data || []
				this.list.status = 2
			})
		}
	}
}