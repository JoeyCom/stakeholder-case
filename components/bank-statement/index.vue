<template>
	<view>
		<view class="uni-common-mt">
			<view class="g-category-title">
				交易流水
				<button type="primary" size="mini" style="float: right; margin-right: 16rpx;"  v-show="isEdit" @click="addBtn">添加流水</button>
			</view>
		</view>
		
		<view class="uni-list uni-common-mt" v-if="bankStatement.length">
			<view class="uni-list-cell g-list-cell" v-for="(v, i) in bankStatement" :key="i" @click="bankStatementLook(v)">
				<view class="g-triplex-left" style="width: 50%;">流水号：{{ v.serialNo }}</view>
				<view class="g-triplex-right" style="width: 50%;">
					<button type="warn" size="mini" plain @click.stop="bankStatementDel(v.id)" v-show="isEdit">删除</button>
					<button type="primary" size="mini" plain @click.stop="bankStatementEditBtn(v)" v-show="isEdit">修改</button>
				</view>
			</view>
		</view>
		
		<view v-else class="g-nodata">暂无流水</view>
		
		<neil-modal :show.sync="modalBankStatement.show" title="添加流水明细" @confirm="bankStatementAdd">
			<view class="uni-list ">
				<view class="uni-list-cell">
					<view class="uni-label">流水号</view>
					<view class="uni-list-cell-db">
						<input v-model="modalBankStatement.data.serialNo" class="uni-input" type="text" :disabled="!isEdit" placeholder="请输入流水号" />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">开户银行名称</view>
					<view class="uni-list-cell-db">
						<input v-model="modalBankStatement.data.bankName" class="uni-input" type="text" :disabled="!isEdit" placeholder="请输入开户银行名称" />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">银行卡号</view>
					<view class="uni-list-cell-db">
						<input v-model="modalBankStatement.data.bankNo" class="uni-input" type="number" :disabled="!isEdit" placeholder="请输入银行卡号" />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">交易时间</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" @change="bindDateChange" :disabled="!isEdit">
							<!-- <view class="uni-input">{{date}}</view> -->
							<input v-model="modalBankStatement.data.transTime" class="uni-input" placeholder="请选择时间" type="text" disabled />
						</picker>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">交易金额（元）</view>
					<view class="uni-list-cell-db">
						<input v-model="modalBankStatement.data.transMoney" class="uni-input" type="digit" :disabled="!isEdit" placeholder="请输入交易金额" />
					</view>
				</view>
				<view class="uni-list-cell g-p-normal">
					<view class="uni-label">交易流水附件</view>
					<view class="uni-list-cell-db">
						<robby-image-upload v-model="modalBankStatement.attachment" :limit="1" :showUploadProgress="false" :enable-del="isEdit" :enable-add="isEdit"></robby-image-upload>
					</view>
				</view>
			
			</view>
		</neil-modal>
		
		
		<neil-modal :show.sync="modalBankStatementLook.show" title="查看流水明细" @confirm="modalBankStatementLook.show = false" confirm-text="关闭" :show-cancel="false">
			<view class="uni-list ">
				<view class="uni-list-cell">
					<view class="uni-label">流水号</view>
					<view class="uni-list-cell-db">
						<input v-model="modalBankStatementLook.data.serialNo" class="uni-input" type="text" disabled />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">开户银行名称</view>
					<view class="uni-list-cell-db">
						<input v-model="modalBankStatementLook.data.bankName" class="uni-input" type="text" disabled />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">银行卡号</view>
					<view class="uni-list-cell-db">
						<input v-model="modalBankStatementLook.data.bankNo" class="uni-input" type="number" disabled />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">交易时间</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" @change="bindDateChange" disabled>
							<!-- <view class="uni-input">{{date}}</view> -->
							<input v-model="modalBankStatementLook.data.transTime" class="uni-input" type="text" disabled />
						</picker>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">交易金额（元）</view>
					<view class="uni-list-cell-db">
						<input v-model="modalBankStatementLook.data.transMoney" class="uni-input" type="digit" disabled />
					</view>
				</view>
				<view class="uni-list-cell g-p-normal">
					<view class="uni-label">交易流水附件</view>
					<view class="uni-list-cell-db">
						<robby-image-upload v-model="modalBankStatementLook.attachment" :limit="1" :showUploadProgress="false" :enable-del="false" :enable-add="false"></robby-image-upload>
					</view>
				</view>
			
			</view>
		</neil-modal>
		
		<neil-modal :show.sync="modalBankStatementEdit.show" title="修改流水明细" @confirm="bankStatementEdit">
			<view class="uni-list ">
				<view class="uni-list-cell">
					<view class="uni-label">流水号</view>
					<view class="uni-list-cell-db">
						<input v-model="modalBankStatementEdit.data.serialNo" class="uni-input" type="text" :disabled="!isEdit" placeholder="请输入流水号" />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">开户银行名称</view>
					<view class="uni-list-cell-db">
						<input v-model="modalBankStatementEdit.data.bankName" class="uni-input" type="text" :disabled="!isEdit" placeholder="请输入开户银行名称" />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">银行卡号</view>
					<view class="uni-list-cell-db">
						<input v-model="modalBankStatementEdit.data.bankNo" class="uni-input" type="number" :disabled="!isEdit" placeholder="请输入银行卡号" />
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">交易时间</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" @change="bindDateChange" :disabled="!isEdit">
							<!-- <view class="uni-input">{{date}}</view> -->
							<input v-model="modalBankStatementEdit.data.transTime" class="uni-input" placeholder="请选择时间" type="text" disabled />
						</picker>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-label">交易金额（元）</view>
					<view class="uni-list-cell-db">
						<input v-model="modalBankStatementEdit.data.transMoney" class="uni-input" type="digit" :disabled="!isEdit" placeholder="请输入交易金额" />
					</view>
				</view>
				<view class="uni-list-cell g-p-normal">
					<view class="uni-label">交易流水附件</view>
					<view class="uni-list-cell-db">
						<robby-image-upload v-model="modalBankStatementEdit.attachment" :limit="1" :showUploadProgress="false" :enable-del="isEdit" :enable-add="isEdit"></robby-image-upload>
					</view>
				</view>
			
			</view>
		</neil-modal>
		
	</view>
</template>

<script>
	export default {
		props: {
			caseId: {},
			isEdit: {
				type: Boolean
			}
		},
		mounted () {
			this.getBankStatemen()
		},
		data() {
			return {
				bankStatement: [],
				modalBankStatement: {
					show: false,
					data: {
						caseId: this.caseId,
						serialNo: '',
						bankName: '',
						bankNo: '',
						transTime: '',
						transMoney: ''
					},
					attachment: []
				},
				modalBankStatementLook: {
					show: false,
					data: {
						caseId: this.caseId,
						serialNo: '',
						bankName: '',
						bankNo: '',
						transTime: '',
						transMoney: '',
						attachment: ''
					},
					attachment: []
				},
				modalBankStatementEdit: {
					show: false,
					data: {
						caseId: this.caseId,
						serialNo: '',
						bankName: '',
						bankNo: '',
						transTime: '',
						transMoney: '',
						attachment: ''
					},
					attachment: []
				}
			}
		},
		methods: {
			addBtn () {
				this.modalBankStatement.show = true
				this.$emit('add-btn')
			},
			// 获取银行流水
			getBankStatemen () {
				this.$JRequest('caseBankstatement', { caseId: this.caseId }, data => {
					this.bankStatement = data.list
				})
			},
			// 添加流水号
			bankStatementAdd () {
				// this.$JRequest({
				// 	method: 'FILE',
				// 	url: 'bankStatementAdd',
				// 	name: 'attachment',
				// 	filePath: this.modalBankStatement.attachment[0],
				// 	formData: this.modalBankStatement.data,
				// 	success: res => {
				// 		console.log(res)
				// 		let data  = JSON.parse(res.data)
				// 		if (data.code === 0) {
				// 			this.$JFn.showSuccess('添加成功')
				// 			this.modalBankStatement.show = false
				// 			this.getBankStatemen()
				// 		} else {
				// 			this.$JFn.showError(data.msg)
				// 		}
				// 	}
				// })
				this.$JRequest('bankStatementAdd', {
					...this.modalBankStatement.data,
					jFile: {
						name: 'attachment',
						filePath: this.modalBankStatement.attachment[0]
					}
				}, () => {
					this.modalBankStatement.show = false
					this.getBankStatemen()
					this.$JFn.showSuccess('添加流水成功')
				})
			},
			// 查看流水详情
			bankStatementLook (row) {
				this.modalBankStatementLook.show = true
				this.modalBankStatementLook.data = row
				this.modalBankStatementLook.attachment = [row.filePath]
			},
			// 修改流水详情-点击按钮事件
			bankStatementEditBtn (row) {
				this.modalBankStatementEdit.show = true
				this.modalBankStatementEdit.data = row
				this.modalBankStatementEdit.attachment = [row.filePath]
			},
			bankStatementEdit () {
				this.$JRequest('bankStatementUpdate', {
					...this.modalBankStatementEdit.data,
					jFile: {
						name: 'attachment',
						filePath: this.modalBankStatementEdit.attachment[0]
					}
				}, () => {
					this.modalBankStatementEdit.show = false
					this.getBankStatemen()
					this.$JFn.showSuccess('修改流水成功')
				})
			},
			// 删除流水号
			bankStatementDel (id) {
				this.$JFn.showModal({
					title: '提示',
					content: '确定删除吗？',
					success: (res) => {
						if (res.confirm) {
							this.$JRequest('bankStatementDel', '/' + id, data => {
								this.$JFn.showSuccess('删除成功')
								this.getBankStatemen()
							})
						}
					}
				})
			},
			bindDateChange (e) {
				this.modalBankStatement.data.transTime = e.target.value
			}
		},
		watch: {
			caseId (newVal) {
				this.modalBankStatement.data.caseId = newVal
				this.modalBankStatementLook.data.caseId = newVal
			}
		}
	}
</script>

<style lang="scss">

</style>
