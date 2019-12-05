<template>
	<view>
		
		<view class="uni-padding-wrap uni-common-mt uni-common-mb" v-show="!isEdit">
			<button type="primary" size="mini" plain @click="editBtn">编 辑</button>
		</view>
		<view class="category">
			<view class="g-category-title">基本信息</view>
			<view class="uni-list uni-common-mt">
				<view class="uni-list-cell">
					<view class="uni-label">真实姓名</view>
					<view class="uni-list-cell-db g-p-normal">
						<input v-model="info.name" class="uni-input" type="text" :disabled="!isEdit" />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">手机号</view>
					<view class="uni-list-cell-db g-p-normal">
						<input v-model="info.mobile" class="uni-input" type="number" :disabled="!isEdit" />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">证件类型</view>
					<view class="uni-list-cell-db g-p-normal">
						<!-- <picker mode="selector" :value="index" :range="certTypes" range-key="name" @change="bindPickerChange" :disabled="!isEdit">
							<input v-model="certType" class="uni-input" type="text" disabled />
						</picker> -->
						<j-picker-selector v-model="info.certType" :range="certTypes" range-key="name" :disabled="!isEdit" />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">证件号码</view>
					<view class="uni-list-cell-db g-p-normal">
						<input v-model="info.certNo" class="uni-input" type="idcard" :disabled="!isEdit" />
					</view>
				</view>

			</view>
		</view>

		<view class="category">
			<view class="g-category-title">身份信息</view>
			<view class="uni-list uni-common-mt">
				<view class="uni-list-cell">
					<view class="uni-label">证件正面</view>
					<view class="uni-list-cell-db g-p-normal">
						<!-- <robby-image-upload v-model="formDataExtra.certFront" :limit="1" :showUploadProgress="false"></robby-image-upload> -->
						<robby-image-upload v-model="formDataExtra.certFront" :limit="1" :showUploadProgress="false" :server-url="uploadUrl" fileKeyName="attachment"
							:header="{ token: uni.getStorageSync('token') }"
							:enable-del="isEdit" :enable-add="isEdit" :enable-drag="false"
						></robby-image-upload>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">证件反面</view>
					<view class="uni-list-cell-db g-p-normal">
						<!-- <robby-image-upload v-model="formDataExtra.certBack" :limit="1" :showUploadProgress="false"></robby-image-upload> -->
						<robby-image-upload v-model="formDataExtra.certBack" :limit="1" :showUploadProgress="false" :server-url="uploadUrl" fileKeyName="attachment"
							:header="{ token: uni.getStorageSync('token') }"
							:enable-del="isEdit" :enable-add="isEdit" :enable-drag="false"
						></robby-image-upload>
					</view>
				</view>
			</view>
		</view>

		<view class="category">
			<view class="g-category-title">联络信息</view>
			<view class="uni-list uni-common-mt">
				<view class="uni-list-cell">
					<view class="uni-label">QQ</view>
					<view class="uni-list-cell-db g-p-normal">
						<input v-model="info.qq" class="uni-input" type="text" :disabled="!isEdit" />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">微信</view>
					<view class="uni-list-cell-db g-p-normal">
						<input v-model="info.weiXin" class="uni-input" type="text" :disabled="!isEdit" />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">邮箱</view>
					<view class="uni-list-cell-db g-p-normal">
						<input v-model="info.email" class="uni-input" type="text" :disabled="!isEdit" />
					</view>
				</view>
			<!-- 	<view class="uni-list-cell">
					<view class="uni-label">现住地址</view>
					<view class="uni-list-cell-db g-p-normal">
						<j-picker-region v-model="info.address" :disabled="!isEdit" />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">工作地址</view>
					<view class="uni-list-cell-db g-p-normal">
						<input v-model="info.workPlace" class="uni-input" type="text" :disabled="!isEdit" />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">报案地址</view>
					<view class="uni-list-cell-db g-p-normal">
						<input v-model="info.reportPlace" class="uni-input" type="text" :disabled="!isEdit" />
					</view>
				</view> -->
			</view>
		</view>
		
		<view class="category">
			<view class="g-category-title">现地址</view>
			<j-picker-address v-model="formDataExtra.address" :disabled="!isEdit" />
		</view>
		<view class="category">
			<view class="g-category-title">工作地址</view>
			<j-picker-address v-model="formDataExtra.workPlace" :disabled="!isEdit" />
		</view>
		<view class="category">
			<view class="g-category-title">报案地址</view>
			<j-picker-address v-model="formDataExtra.reportPlace" :disabled="!isEdit" />
		</view>


		
		<view class="uni-padding-wrap uni-common-mt uni-common-mb" v-show="isEdit">
			<button type="primary" @click="enter">确认编辑</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				uni,
				uploadUrl: this.$JConst.uploadUrl,
				/* 
					01——身份证
					02——军人证
					03——护照
					04——港澳台通行证
					05——其他
				*/
				certTypes: [{
						id: '01',
						name: '身份证'
					},
					{
						id: '02',
						name: '军人证'
					},
					{
						id: '03',
						name: '护照'
					},
					{
						id: '04',
						name: '港澳台通行证'
					},
					{
						id: '05',
						name: '其他'
					}
				],
				certFront: [],
				certBack: [],
				certType: '',
				info: {
					qq: '',
					weiXin: '',
					email: '',
					address: '',
					addressStreet: '',
					workPlace: '',
					workPlaceStreet: '',
					reportPlace: '',
					reportPlaceStreet: ''
				},
				// 是否编辑
				isEdit: false,
				formDataExtra: {
					certFront: [],
					certBack: [],
					address: [],
					workPlace: [],
					reportPlace: []
				}
			}
		},
		created() {
			// 获取用户信息
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				this.$JRequest('userInfo', data => {
					this.info = data
					
					this.formDataExtra.certFront[0] = data.frontPath
					this.formDataExtra.certBack[0] = data.backPath
					this.formDataExtra.address = [ ...(data.address.split(' ')), data.addressStreet]
					this.formDataExtra.workPlace = [ ...(data.workPlace.split(' ')), data.workPlaceStreet]
					this.formDataExtra.reportPlace = [ ...(data.reportPlace.split(' ')), data.reportPlaceStreet]
				})
			},
			editBtn() {
				this.isEdit = true
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			},
			enter() {
				// let type = this.certTypes.find(v => {
				// 	console.log(v.name, this.certType)
				// 	return v.name === this.certType
				// })
				// this.info.certType = type ? type.id : ''
				
				this.info.frontPath = this.formDataExtra.certFront[0]
				this.info.backPath = this.formDataExtra.certBack[0]
				
				this.info.address = this.formDataExtra.address.slice(0, 3).join(' ')
				this.info.addressStreet = this.formDataExtra.address[3]
				this.info.workPlace = this.formDataExtra.workPlace.slice(0, 3).join(' ')
				this.info.workPlaceStreet = this.formDataExtra.workPlace[3]
				this.info.reportPlace = this.formDataExtra.reportPlace.slice(0, 3).join(' ')
				this.info.reportPlaceStreet = this.formDataExtra.reportPlace[3]
				
				this.$JRequest('userUpdate', this.info, data => {
					this.$JFn.showSuccess('编辑成功')
					this.isEdit = false
				})
			}
		}
	}
</script>

<style lang="scss">
	.category {
		margin-top: 30rpx;
	}
</style>
