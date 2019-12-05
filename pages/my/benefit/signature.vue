<template>
	 <view class="signatureBox">
			<view class="canvasBox" ref="canvasHW">
				<canvas
					style="width: 750rpx; height: 500rpx;"
					canvas-id="signatureCanvas"
					@touchstart="touchStart"
					@touchmove="touchMove"
					@touchend="touchEnd"
					:disable-scroll="true"
				></canvas>
				<!-- <view class="btnBox">
					<button @click="overwrite">重写</button>
					<button>提交签名</button>
				</view> -->
				<view class="uni-padding-wrap uni-common-mt uni-common-mb">
					<button type="primary" @click="overwrite" plain>重写</button>
					<button type="primary" @click="submitSignature" class="uni-common-mt">提交签名</button>
				</view>
			</view>
	</view>
</template>

<script>
	import upng from 'upng-js'
	export default {
		data() {
			return {
				id: '',
				points: [],
				canvasTxt: null,
				startX: 0,
				startY: 0,
				moveY: 0,
				moveX: 0,
				endY: 0,
				endX: 0,
				w: null,
				h: null,
				isDown: false,
				// 设备rpx比例
				pixelScale: 1
			}
		},
		onLoad (q) {
			this.id = parseInt(q.id)
		},
		mounted() {
			this.canvasTxt = uni.createCanvasContext('signatureCanvas')
			this.getPixelScale()
		},
		methods: {
			// 获取设备rpx比例
			getPixelScale () {
				uni.getSystemInfo({
					success: res => {
						this.pixelScale = res.windowWidth / 750
					}
				})
			},
			//移动设备事件
			touchStart(ev) {
				ev = ev || event
				ev.preventDefault()
				// console.log(ev)
				if (ev.touches.length == 1) {
					let obj = {
						x: ev.touches[0].x,
						y: ev.touches[0].y
					}
					this.startX = obj.x
					this.startY = obj.y
					this.canvasTxt.beginPath()
					this.canvasTxt.moveTo(this.startX, this.startY)
					this.canvasTxt.lineTo(obj.x, obj.y)
					this.canvasTxt.closePath()
					this.canvasTxt.stroke()
					this.canvasTxt.draw(true)
					this.points.push(obj)
				}
			},
			//移动设备事件
			touchMove(ev) {
				ev = ev || event
				ev.preventDefault()
				// console.log(ev);
				if (ev.touches.length == 1) {
					let obj = {
						x: ev.touches[0].x,
						y: ev.touches[0].y
					};
					this.moveY = obj.y
					this.moveX = obj.x
					// this.canvasTxt.beginPath();
					this.canvasTxt.moveTo(this.startX, this.startY)
					this.canvasTxt.lineTo(obj.x, obj.y)
					this.canvasTxt.closePath()
					this.canvasTxt.stroke()
					this.canvasTxt.draw(true)
					this.startY = obj.y
					this.startX = obj.x
					this.points.push(obj)
				}
			}, 
			//移动设备事件
			touchEnd(ev) {
				ev = ev || event
				ev.preventDefault()
				// console.log(ev);
				if (ev.touches.length == 1) {
					let obj = {
						x: ev.touches[0].x,
						y: ev.touches[0].y
					};
					this.canvasTxt.beginPath()
					this.canvasTxt.moveTo(this.startX, this.startY)
					this.canvasTxt.lineTo(obj.x, obj.y)
					this.canvasTxt.closePath()
					this.canvasTxt.stroke()
					this.canvasTxt.draw(true)
					this.points.push(obj)
					this.points.push({ x: -1, y: -1 })
				}
			}, //重写
			overwrite() {
				// this.canvasTxt.clearRect(0,0, 150, 75)
				this.canvasTxt.draw()
				this.points = []
			},
			// 提交签名
			submitSignature () {
				console.log()
				uni.canvasGetImageData({
				  canvasId: 'signatureCanvas',
				  x: 0,
				  y: 0,
				  width: 750 * this.pixelScale,
				  height: 500 * this.pixelScale,
				  success: res => {
						this.$JRequest('enterBenefit', {
							caseId: this.id,
							sign: 'data:image/png;base64,' + uni.arrayBufferToBase64(upng.encode([res.data.buffer], res.width, res.height, 0))
						})
						this.$JFn.showSuccess('提交成功')
						uni.reLaunch({
							url: '/pages/my/benefit/index'
						})
				  },
					fail: () => {
						console.log('提交失败')
						this.$JFn.showError('提交失败')
					}
				})
			}
		}
	}
</script>

<style scoped>
	.signatureBox{  
	    position: absolute; 
	    top: 0px; 
	    left: 0px;  
	    width: 100%;   
	    height: 100%;   
	    box-sizing: border-box; 
	    overflow: hidden;
	    background: #fff;  
	    z-index: 100;  
	    display: flex;  
	    flex-direction: column; 
	} 
	.visaDetailTop{   
	    /*position: absolute;*/    /*top: 0px;*/    /*left: 0px;*/   
	    width: 100%;  
	    /*overflow: hidden;*/   
	    padding: 5px;  
	    box-sizing: border-box;  
	    z-index: 2;  
	    border-bottom: 1px solid #e5e5e5;
	    }  
	.visaDetailTop p{  
	    margin: 0px;  
	    text-align: center; 
	    color: #000;   
	    font-size: 1em; 
	    position: relative;
	} 
	p.visaTitle{   
	    width: 100%;  
	    position: absolute; 
	    top: 5px;   
	    left: 0px; 
	    text-align: center; 
	    font-size: 1.2em; 
	}  
	.btnBack{  
	    display: block;  
	    position: absolute; 
	    top: 0px;    
	    left: 0px; 
	    width: 100%;  
	    height: 100%; 
	    z-index: 1;   
	    background: transparent;  
	    border-color: transparent;  
	    outline: none; 
	}  
	.btnDaoHang{  
	    display: block;  
	    position: absolute;   
	    left: 0px;  
	    top: 0px; 
	    height: 2.2em; 
	    width: 2em;  
	    z-index: 1;  
	    background: transparent; 
	    border-color: transparent;   
	    outline: none; 
	} 
	.visaDetailTop p span{  
	    color: #fff;   
	    font-size: 1.2em; 
	} 
	.visaDetailTop p:first-of-type{  
	    float: left; 
	}  
	.visaDetailTop p:nth-of-type(2){ 
	    float: right; 
	} 
	.canvasBox{ 
	    /* padding: 10px 5px; */
	    box-sizing: border-box;
	    flex: 1; 
	}  
	canvas{  
	    border: 1px solid #71b900;  
	    box-sizing: border-box;
	}  
	/* .btnBox{   
	    height: 30px;  
	    padding: 5px; 
	    text-align: right; 
	    line-height: 30px; 
	} 
	.btnBox button:first-of-type{   
	    border: 1px solid #71b900; 
	    background: transparent; 
	    border-radius: 4px;   
	    padding: 5px 10px; 
	}  
	.btnBox button:last-of-type{ 
	    border: 1px solid #71b900;   
	    background: #71b900;  
	    color: #fff;    
	    border-radius: 4px;  
	    padding: 5px 10px;  
	} */ 
	@media only screen and (min-width: 750px){  
	    .signatureBox{    
	        position: absolute; 
	        top: 0px;     
	        left: 0px;   
	        width: 100%;  
	        min-height: 100%;
	        box-sizing: border-box;    
	        overflow: visible;   
	    }
	}
</style>
