<template>
	<picker mode="region" @change="change" :value="value" :disabled="disabled">
		<input :value="`${value[0] ? value[0] : ''}${value[1] ? value[1] : ''}${value[2] ? value[2] : ''}`" class="uni-input" type="text" :placeholder="placeholder" disabled />
	</picker>
</template>

<script>
	export default {
		props: ['value', 'placeholder', 'disabled'],
		methods: {
			change (e) {
				let val = e.detail.value
				this.$emit('change', e)
				this.$emit('input', val)
			}
		}
	}
</script>

<style>
</style>
