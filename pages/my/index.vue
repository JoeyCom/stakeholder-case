<template>
	<view>
		<image src="../../static/img/my-head.png" mode="widthFix" style="width: 100%;"></image>
		<uni-list>
			<navigator url="/pages/my/person-info/index">
				<uni-list-item title="个人资料" show-extra-icon :extra-icon="{color: '#777',size: '18',type: 'person'}"></uni-list-item>
			</navigator>
			<navigator url="/pages/my/law-case/index">
				<uni-list-item title="我的案件" show-extra-icon :extra-icon="{color: '#777',size: '18',type: 'compose'}"></uni-list-item>
			</navigator>
			<navigator url="/pages/my/benefit/index">
				<uni-list-item title="我要确权" show-extra-icon :extra-icon="{color: '#777',size: '18',type: 'star'}"></uni-list-item>
			</navigator>
			<navigator url="/pages/my/web-account/index">
				<uni-list-item title="web账号" show-extra-icon :extra-icon="{color: '#777',size: '18',type: 'contact'}"></uni-list-item>
			</navigator>
		</uni-list>
		 <!-- <view class="uni-list">
				<view class="uni-list-cell uni-list-cell-pd">
					<view class="uni-list-cell-db">开启中</view>
					<input placeholder="带小数点的数字键盘" />
				</view>
				<view class="uni-list-cell uni-list-cell-pd">
					<view class="uni-list-cell-db">关闭</view>
					<switch />
				</view>
			</view>
			 <view class="uni-list uni-common-mt">
			                <view class="uni-list-cell">
			                    
													<view class="uni-label">弹幕内容</view>
			                    <view class="uni-list-cell-db">
			                        <input v-model="danmuValue" class="uni-input" type="text" placeholder="在此处输入弹幕内容" />
			                    </view>
			                </view>
			            </view> -->
	</view>
</template>

<script>
</script>

<style>
</style>
