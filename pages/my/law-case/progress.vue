<template>
	<view style="padding: 50rpx 25rpx">
		<uni-steps :options="options" direction="column" :active="step"></uni-steps>
	</view>
</template>

<script>
	export default {
		onLoad (q) {
			let detail = this.detail = JSON.parse(decodeURIComponent(q.data))
			let proofInfo = detail.proofInfo
			
			this.options[0].desc = this.$JFn.nullToEmpty(proofInfo.commitTime)
			this.options[1].desc = this.$JFn.nullToEmpty(proofInfo.reviewTime)
			this.options[2].desc = this.$JFn.nullToEmpty(proofInfo.confirmTime)
			this.options[3].desc = this.$JFn.nullToEmpty(proofInfo.finishTime)
			
			if(proofInfo.agencyState === 0 && detail.state == 3) {
			  this.step = 0
				this.options[0].title += '【退回】'
			}
			
			if(proofInfo.agencyState === 1 && detail.state == 3) {
			  this.step = 0
				this.options[0].title += '【待提交】'
			}
			
			if(proofInfo.agencyState === 2 && detail.state == 3) {
			  this.step = 1
				this.options[1].title += '【审核中】'
			}
			
			if(proofInfo.agencyState === 3 && detail.state == 3) {
			  this.step = 1
				this.options[1].title += '【审核中】'
			}
			
			if(proofInfo.agencyState === 4) {
				this.options[1].title += '【审核通过】'
			}
			
			if(proofInfo.confirm === 0 && proofInfo.agencyState === 4) {
			   this.step = 2
				this.options[2].title += '【未确认】'
			}
			
			if(proofInfo.confirm === 1 && proofInfo.agencyState === 4) {
			   this.step = 2
				this.options[2].title += '【已确认】'
			}
			
			if(proofInfo.confirm === 1 && proofInfo.agencyState === 4 && detail.state == 4) {
			   this.step = 3
				this.options[3].title += '【资金发放中】'
			}
			
			if(proofInfo.confirm === 1 && proofInfo.agencyState === 4 && detail.state == 6) {
			   this.step = 3
				this.options[3].title += '【资金发放中】'
			}
			
			if(proofInfo.confirm === 1 && proofInfo.agencyState === 4 && detail.state == 7) {
			   this.step = 3
				this.options[3].title += '【资金发放中】'
			}
			
			if(proofInfo.confirm === 1 && proofInfo.agencyState === 4 && this.detail.state == 8) {
			  this.step = 3
				this.options[3].title += '【资金发放中】'
			}
			
			if(proofInfo.confirm === 1 && proofInfo.agencyState === 4 && this.detail.state == 9) {
			   this.step = 3
				this.options[3].title += '【已完成】'
			}
		},
		data () {
			return {
				detail: {},
				step: 0,
				options: [
					{title:'提交资料',desc:''},
					{title:'审核资料',desc:''},
					{title:'权益确认',desc:''},
					{title:'资金发放',desc:''}
				]
			}
		}
	}
</script>

<style>
</style>
