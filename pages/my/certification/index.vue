<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<uni-steps :options="[{title: '身份信息'}, {title: '人脸识别'}, {title: '联络信息'}, {title: '银行卡'}]" :active="currentStep"></uni-steps>
		</view>
		
		<step-one v-if="currentStep === 0" @step-change="currentStep = 1" :user-id="userId" />
		<step-two v-if="currentStep === 1" @step-change="currentStep = 2" :user-id="userId" />
		<step-three v-if="currentStep === 2" @step-change="currentStep = 3" :user-id="userId" />
		<step-four v-if="currentStep === 3" @step-change="certificationSuccess" :user-id="userId" />
		
	</view>
</template>

<script>
	import StepOne from './components/step-1.vue'
	import StepTwo from './components/step-2.vue'
	import StepThree from './components/step-3.vue'
	import StepFour from './components/step-4.vue'
	export default {
		onLoad (q) {
			this.userId = q.userId
		},
		data () {
			return {
				userId: '',
				// 当前步骤
				currentStep: uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')).step : 0,
			}
		},
		methods: {
			certificationSuccess () {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}
		},
		components: { StepOne, StepTwo, StepThree, StepFour }
	}
</script>

<style>
</style>
