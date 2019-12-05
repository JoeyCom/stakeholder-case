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
		
		<view class="grid">
			<uni-grid :column="4">
				<uni-grid-item @click.native="userInfo.auth === 0 && uni.navigateTo({ url: '/pages/my/certification/index?userId=' + userInfo.userId })">
					<uni-icons type="contact" size="30"></uni-icons>
					<text class="text">实名认证</text>
					<text class="certification-status" :class="{ danger: userInfo.auth === 0 }">{{ userInfo.auth === 0 ? '未认证' : '已认证' }}</text>
				</uni-grid-item>
				<uni-grid-item @click.native="uni.switchTab({ url: '/pages/law-case/list' })">
					<uni-icons type="navigate" size="30"></uni-icons>
					<text class="text">我要举证</text>
				</uni-grid-item>
				<uni-grid-item @click.native="uni.navigateTo({ url: '/pages/my/benefit/index' })">
					<uni-icons type="compose" size="30"></uni-icons>
					<text class="text">我要确权</text>
				</uni-grid-item>
				<uni-grid-item @click.native="uni.navigateTo({ url: '/pages/my/law-case/index' })">
					<uni-icons type="paperclip" size="30"></uni-icons>
					<text class="text">我的案件</text>
				</uni-grid-item>
			</uni-grid>
		</view>
		
		<view>
			<!-- <view v-if="list.data.length"> -->
				<img-text-list :list="list.data"></img-text-list>
				<uni-load-more :status="moreStatus[list.status]"></uni-load-more>
			<!-- </view> -->
			<!-- <view v-else class="g-nodata">暂无案列</view> -->
		</view>
		
		<view>
			<uni-popup ref="popup" type="top">
				<scroll-view class="g-popup-content" scroll-y>
					<uni-card
						v-for="(v, i) in verifyNotice"
						:key="i"
						:title="v.caseName" 
						mode="basic"
						is-full
						note=""
					>
						<view>
							<view class="g-cell">
								<view class="label">审核人</view>
								<view class="value">{{ v.operatorName }}</view>
							</view>
							<view class="g-cell">
								<view class="label">审核时间</view>
								<view class="value">{{ dayjs(v.operateTime) }}</view>
							</view>
							<view class="g-cell">
								<view class="label">审核阶段</view>
								<view class="value">{{ v.stage }}</view>
							</view>
							<view class="g-cell">
								<view class="label">审核意见</view>
								<view class="value">{{ v.verifyAdvice }}</view>
							</view>
						</view>
						
						<template v-slot:footer>
							<view style="text-align: right;">
								<button type="warn" size="mini" @click="ignoreNotice(v.id)">不在提示</button>
							</view>
						</template>
					</uni-card>
				</scroll-view>
			</uni-popup>
		</view>
		
	</view>
</template>

<script>
	import mixinPaging from '@/components/mixin/paging'
	export default {
		mixins: [mixinPaging],
		data() {
			return {
				uni,
				urlList: 'caseList',
				queryParams: {
					state: 3
				},
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
				verifyNotice: [],
				// 用户信息
				userInfo: {
					// 实名认证状态
					auth: 0
				}
			}
		},
		onPullDownRefresh () {
			this.list.paging.page = 1
			this.list.data = []
			this.getList(uni.stopPullDownRefresh)
		},
		onLoad () {
			// 获取列表
			this.getList()
			// 获取推送提示
			this.getVerifyNotice()
		},
		onShow () {
			// if (uni.getStorageSync('no_regi')) {
			// 	this.noRegi()
			// 	return
			// }
			this.getUserInfo()
		},
		methods: {
			// 获取推送提示
			getVerifyNotice () {
				// this.$JRequest('verifyNotice', data => {
				// 	this.verifyNotice = data
				// 	this.$refs.popup.open()
				// })
				this.$JRequest('verifyNotice', data => {
					if (data.length) {
						this.$JFn.showModal({
							content: '当前有新的案件动态，是否查看？',
							confirmText: '查看',
							success: res => {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/my/law-case/index'
									})
								}
							}
						})
					}
				}, () => {})
			},
			// 忽略提示
			ignoreNotice (id) {
				this.$JRequest('ignoreNotice', '/' + id, data => {
					this.$JFn.showSuccess('操作成功')
					this.getVerifyNotice()
				})
			},
			// 获取用户信息
			getUserInfo () {
				if (uni.getStorageSync('userInfo')) {
					this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
					return
				}
				this.$JRequest('userInfo', data => {
					this.userInfo = data
					uni.setStorageSync('userInfo', JSON.stringify(data))
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		overflow-x: hidden;
		swiper {
			height: 375rpx;
		}
		.swiper-item {
			image {
				width: 750rpx;
				height: 375rpx;
			}
		}
		.grid {
			margin: 0 -10rpx;
		}
		.certification-status {
			position: absolute;
			right: 0;
			top: 0;
			padding: 0 5rpx;
			color: #09BB07;
			font-size: 24rpx;
			background-color: #f9f9f9;
			&.danger {
				color: #F76260;
			}
		}
	}
</style>
