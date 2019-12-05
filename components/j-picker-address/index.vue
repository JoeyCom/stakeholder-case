<template>
	<view class="uni-list uni-common-mt">
		<view class="uni-list-cell g-p-normal">
			<view class="uni-label">省市区</view>
			<view class="uni-list-cell-db">
				<j-picker-region v-model="address" placeholder="请选择" :disabled="disabled" />
			</view>
		</view>
		<view class="uni-list-cell g-p-normal">
			<view class="uni-label">详细地址</view>
			<view class="uni-list-cell-db">
				<input v-model="detail" class="uni-input" type="text" placeholder="请输入详细地址" :disabled="disabled" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: Array
			},
			disabled: {
				type: Boolean
			}
		},
		data () {
			return {
				address: this.value.slice(0, 3),
				detail: this.value[3] ? this.value[3] : ''
			}
		},
		watch: {
			value (newVal) {
				this.address = newVal.slice(0, 3)
				this.detail = newVal[3] ? newVal[3] : ''
			},
			address () {
				// this.value = [ ...newVal, this.detail ]
				this.$emit('input', [ ...this.address, this.detail ])
			},
			detail () {
				// this.value = [ ...this.address, newVal ]
				this.$emit('input', [ ...this.address, this.detail ])
			}
		}
	}
</script>

<style>
</style>
