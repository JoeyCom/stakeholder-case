<template>
	<view>
		<input :value="value.map(v => v[rangeKey]).join(separator)" class="uni-input" type="text" disabled :placeholder="placeholder" @click="show" />
		<tki-tree ref="tkitree" :range="range" :rangeKey="rangeKey" :multiple="multiple" @confirm="confirm" @cancel="cancel" />
	</view>
</template>

<script>
	// 多选选择器
	import tkiTree from "@/components/tki-tree/tki-tree"
	export default {
		props: {
			value: {
				type: Array,
				default () {
					return []
				}
			},
			range: {
				type: Array,
				default () {
					return []
				}
			},
			multiple: {
				type: Boolean
			},
			rangeKey: {
				type: String,
			},
			placeholder: {
				type: String
			},
			disabled: {
				type: Boolean,
				default: false
			},
			// 分隔符
			separator: {
				type: String,
				default: '|'
			}
		},
		data () {
			return {
				
			}
		},
		mounted () {
			this.initRange()
		},
		methods: {
			show () {
				// 禁用状态
				if (this.disabled) {
					return
				}
				this.$refs.tkitree._show()
			},
			confirm (res) {
				this.$emit('input', res)
			},
			cancel () {
				this.initRange()
			},
			// 初始化 range
			initRange () {
				let arr = [...this.range]
				arr.forEach((v, i) => {
					if (this.value.find(val => val.id === v.id)) {
						arr[i].checked = true
					} else {
						arr[i].checked = false
					}
				})
				this.$emit('update:range', arr)
			}
		},
		watch: {
			value () {
				this.initRange()
			}
		},
		components: { tkiTree }
	}
</script>

<style>
</style>
