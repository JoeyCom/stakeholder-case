<template>
	<picker mode="selector" :value="index" :range="range" :range-key="rangeKey" @change="change" :disabled="disabled">
		<input :value="rangeKey ? range[index][rangeKey] : range[index]" class="uni-input" type="text" :placeholder="placeholder" disabled />
	</picker>
</template>

<script>
	export default {
		props: {
			value: {},
			range: {},
			rangeKey: {},
			placeholder: {},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		created () {
			this.initIndex()
		},
		data () {
			return {
				index: -1
			}
		},
		methods: {
			// 初始化索引
			initIndex () {
				if (this.value) {
					if (this.rangeKey) {
						this.range.find((v, i) => {
							if (this.value == v.id) {
								this.index = i
								return true
							}
						})
					} else {
						this.range.find((v, i) => {
							if (this.value == v) {
								this.index = i
								return true
							}
						})
					}
				} else {
					this.index = -1
				}
			},
			change (e) {
				let val = e.detail.value
				this.$emit('change', e)
				this.$emit('input', this.rangeKey ? this.range[val].id : this.range[val])
			}
		},
		watch: {
			value () {
				this.initIndex()
			}
		}
	}
</script>

<style>
</style>
