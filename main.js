import Vue from 'vue'
import App from './App'
import { uniNoticeBar, uniList, uniListItem, uniSteps } from '@dcloudio/uni-ui'
import dayjs from 'dayjs'
import plugin from './plugin'
// 请求
import jRequest from 'plugin/request'
import ImgTextList from 'components/img-text-list/index.vue'
import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue'

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
Vue.component('robbyImageUpload', robbyImageUpload)
// 图文列表
Vue.component('ImgTextList', ImgTextList)

const app = new Vue({
    ...App
})
app.$mount()
