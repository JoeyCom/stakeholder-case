<template>
	<view class="content">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="8000" :duration="500">
			<swiper-item v-for="(v ,i) in swiperList" :key="i">
				<view class="swiper-item">
					<image mode='aspectFill' :src="v.url" alt="">
				</view>
			</swiper-item>
		</swiper>
		<uni-notice-bar show-icon scrollable single
			text="结合“互联网应用 + 人工智能”技术和商业银行金融能力，构建联接政府、银行、集资参与人三方，集决策管理、监督管理、数据管理、身份核验和资金发放等功能为一体的新一代非法集资管理平台"
			background-color="#eee"
			color="#555"
		></uni-notice-bar>
		
		<view>
			<img-text-list :list="list.data"></img-text-list>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [
					{
						url: 'http://120.79.13.215/img/slide1.73e09e1d.jpg'
					},
					{
						url: 'http://120.79.13.215/img/slide2.0fbf4522.jpg'
					},
					{
						url: 'http://120.79.13.215/img/slide3.7a235263.jpg'
					}
				],
				// 列表
				list: {
					data: []
				}
			}
		},
		onLoad() {
			// uni.getSystemInfo({
			//     success: function (res) {
			// 			console.log(res)
			//     }
			// })
		},
		onShow () {
			if (uni.getStorageSync('no_regi')) {
				this.noRegi()
				return
			}
		},
		created () {
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

<style lang="scss">
	.content {
		swiper {
			height: 375rpx;
		}
		.swiper-item {
			image {
				width: 750rpx;
				height: 375rpx;
			}
		}
	}
</style>
