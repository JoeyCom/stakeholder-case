<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<uni-steps :options="[{title: '基本信息'}, {title: '身份信息'}, {title: '联络信息'}, {title: '完成'}]" :active="currentStep"></uni-steps>
		</view>
		
		<step-one v-show="currentStep === 0" />
		
	</view>
</template>

<script>
	import StepOne from './components/step-1.vue'
	export default {
		data () {
			return {
				// 当前步骤
				currentStep: 0,
				certFront: [],
				certBack: []
			}
		},
		methods: {
			bindPickerChange (e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.certType = this.certTypes[e.target.value].name
			},
			enter () {
				this.$JRequest('regi', {
					certType: this.certType,
					certNo: this.certNo,
					name: this.name,
					mobile: this.mobile
				}, data => {
					this.$JFn.showSuccess('登记信息成功')
				})
			}
		},
		components: { StepOne }
	}
</script>

<style>
</style>
