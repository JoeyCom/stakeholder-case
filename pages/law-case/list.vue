<template>
	<view>
		<img-text-list :list="list.data"></img-text-list>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				// 列表
				list: {
					data: []
				}
			}
		},
		onReady () {
			// 获取列表
			this.getList()
		},
		methods: {
			// 获取列表
			getList () {
				this.$JRequest('caseList', data => {
					console.log(data)
					this.list.data = data.list
				})
			},
			// 未登记
			noRegi (msg = '未绑定或未登记') {
				this.$JFn.showModal({
					title: '提示',
					content: msg,
					cancelText: '去绑定',
					confirmText: '去登记',
					success (res) {
						if (res.confirm) {
							// 跳登记页面
							uni.navigateTo({
								url: '/pages/my/register/index'
							})
						} else if (res.cancel) {
							// 跳绑定页面
							uni.navigateTo({
								url: '/pages/my/bind/index'
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
</style>
