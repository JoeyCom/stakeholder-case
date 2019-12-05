// const urlPrefix = 'http://128.2.136.178:8080'
const urlPrefix = 'http://120.79.13.215:8080'
const constant = {
  urlPrefix,
	// 图片地址前缀
	imgUrlPrefix: 'http://128.2.136.178:8090',
	// 列表每次请求条数
	listLimit: 5,
	// 加载更多状态值   loading 的状态，可选值：more（loading前）、loading（, loading中）、noMore（没有更多了）
	moreStatus: ['more', 'loading', 'noMore'],
	// 上传地址
	uploadUrl: urlPrefix + '/invest_plateform/user/file/wx/upload'
}

export default constant

export { urlPrefix }
