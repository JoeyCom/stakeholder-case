import fn from './fn'
import constant from './const'

export default {
	install (Vue, options) {
		// 常量
		Vue.prototype.$JConst = constant
		// 函数
		Vue.prototype.$JFn = fn
	}
}
