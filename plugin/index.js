import fn from './fn'

export default {
	install (Vue, options) {
		// 函数
		Vue.prototype.$JFn = fn
	}
}
