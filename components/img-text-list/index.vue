<template>
	<view>
		<view>
			<navigator class="img-text-list" v-for="(v, i) in list" :key="i" :url="'/pages/law-case/detail?id=' + v.caseId">
				<view class="img-box">
					<image src="http://120.79.13.215:8090/file/logo.jpg" />
				</view>
				<view class="text-box">
					<view class="title">{{ v.caseName }}</view>
					<view class="desc">{{ v.caseContent }}</view>
					<view class="status-time">
						<text class="status"><text class="g-tag primary plain">{{ v.stateDescription }}</text></text>
						<text class="time">{{ dayjs(v.publishTime) }}</text>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array
			}
		},
		data () {
			return {
				
			}
		}
	}
</script>

<style lang="scss">
	.img-text-list {
		line-height: 1.8;
		padding: 12px 8px;
		overflow: hidden;
		border-bottom: 1px solid #eee;
		&:last-child {
			border: none;
		}
		.img-box {
			float: left;
			image {
				width: 200rpx;
				height: 200rpx;
			}
			margin-right: 24rpx;
		}
		.text-box {
			overflow: hidden;
			.title {
				font-size: 36rpx;
				color: #333;
				@extend %nowrap;
			}
			.desc {
				font-size: 32rpx;
				color: #999;
				@extend %nowrap;
			}
			.status-time {
					font-size: 30rpx;
					color: #999;
					.status {
						display: inlie-block;
					}
					.time {
						float: right;
					}
			}
		}
	}
</style>
