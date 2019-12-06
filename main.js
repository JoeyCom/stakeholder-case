import Vue from 'vue'
import App from './App'
import { uniNoticeBar, uniList, uniListItem, uniSteps, uniIcons, uniPopup, uniCard, uniLoadMore, uniGrid, uniGridItem } from '@dcloudio/uni-ui'
import dayjs from 'dayjs'
import plugin from './plugin'
// 请求
import jRequest from 'plugin/request'
// 图文列表
import ImgTextList from 'components/img-text-list/index.vue'
// 图片上传
import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue'
// 模态框
import neilModal from '@/components/neil-modal/neil-modal.vue'
// 搜索框
import mSearch from '@/components/mehaotian-search/mehaotian-search'
// 选择器
import JPickerSelector from '@/components/j-picker-selector'
// 省市县地址
import JPickerRegion from '@/components/j-picker-region'
// 省市县详细地址
import JPickerAddress from '@/components/j-picker-address'
// 单选多选选择器
// 111
import JPickerCheck from '@/components/j-picker-check'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$JRequest = jRequest(Vue)

Vue.prototype.dayjs = (time, format = 'YYYY-MM-DD HH:mm') => {
	return dayjs(time).format(format)
}

Vue.use(plugin)

Vue.component('uniNoticeBar', uniNoticeBar)
Vue.component('uniList', uniList)
Vue.component('uniListItem', uniListItem)
Vue.component('uniSteps', uniSteps)
Vue.component('uniIcons', uniIcons)
Vue.component('uniPopup', uniPopup)
Vue.component('uniCard', uniCard)
Vue.component('uniLoadMore', uniLoadMore)
Vue.component('uniGrid', uniGrid)
Vue.component('uniGridItem', uniGridItem)

Vue.component('robbyImageUpload', robbyImageUpload)
Vue.component('neilModal', neilModal)
Vue.component('mSearch', mSearch)
// 图文列表
Vue.component('ImgTextList', ImgTextList)
// 选择器
Vue.component('JPickerSelector', JPickerSelector)
Vue.component('JPickerRegion', JPickerRegion)
Vue.component('JPickerAddress', JPickerAddress)
Vue.component('JPickerCheck', JPickerCheck)

const app = new Vue({
    ...App
})
app.$mount()
