<template>
	<view>
		<view class="uni-list uni-common-mt">
			<view class="uni-list-cell">
				<view class="uni-label">手机号</view>
				<view class="uni-list-cell-db">
					<input v-model="mobile" class="uni-input" type="number" placeholder="请输入手机号" />
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">姓名</view>
				<view class="uni-list-cell-db">
					<input v-model="name" class="uni-input" type="text" placeholder="请输入姓名" />
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">证件类型</view>
				<view class="uni-list-cell-db">
					<picker mode="selector" :value="index" :range="certTypes" range-key="name" @change="bindPickerChange">
						<!-- <view class="uni-input">{{ certType }}</view> -->
						<input v-model="certType" class="uni-input" type="text" placeholder="请选择证件类型" disabled />
					</picker>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">证件号码</view>
				<view class="uni-list-cell-db">
					<input v-model="certNo" class="uni-input" type="idcard" placeholder="请输入证件号码" />
				</view>
			</view>
			<!-- <view class="uni-list-cell">
				<view class="uni-label">证件正面</view>
				<view class="uni-list-cell-db">
					<robby-image-upload v-model="certFront" :limit="1" :showUploadProgress="false"></robby-image-upload>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-label">证件反面</view>
				<view class="uni-list-cell-db">
					<robby-image-upload v-model="certBack" :showUploadProgress="false"></robby-image-upload>
				</view>
			</view> -->
			
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<button type="primary" @click="enter">确 定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				mobile: '',
				name: '',
				certType: '',
				/* 
					01——身份证
					02——军人证
					03——护照
					04——港澳台通行证
					05——其他
				*/
				certTypes: [
					{
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
				certNo: ''
			}
		}
	}
</script>

<style>
</style>
