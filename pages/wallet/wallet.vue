<template>
	
		<view class="wallet"  v-show="isFx">
			<!-- 钱包 -->
			<view class="top">
			<view >
				<text>账户余额(元)</text>
				<text v-if="isvip">￥{{price}}</text>
				<text v-else>未开通</text>
			</view>
			</view>
			<view class="but">
				<view v-if="isvip" @click="addhy" ><image src="../../static/cz.png" mode="heightFix"></image>充值</view>
				<view v-else @click="addhy"><image src="/static/hy.png" mode="heightFix"></image>开通会员</view>
				<view v-if="isvip"><image src="../../static/hy.png" mode="heightFix"></image>会员权限</view>
				
				<view v-if="isvip"><image src="../../static/hyzt.png" mode="heightFix"></image>会员状态（已开通）</view>
				<view @click="hysm" ><image src="/static/hysm.png" mode="heightFix"></image>会员说明</view>
					<view @click="goyem()" ><image src="/static/xfjl.png" mode="heightFix"></image>消费记录</view>
			</view>
		</view>
	

</template>

<script>
	import $go from "@/common/api/request.js"
	export default {
		data() {
			return {
				isvip:false,
				isFx:false,
				usedata:[],//充值活动
				api_syssn:'',
				price:''
			}
		},
		methods: {
			goyem(){
				uni.navigateTo({
					url:'/pages/walletlist/walletlist'
				})
			},
			isvipbd(){//判断是否是会员
				$go.request({
					url:'https://bjcore01.vanshin.fun/fish/user/info',
					header:{
						sessionid:JSON.parse(wx.getStorageSync('user')).sessionid
					},
				}).then(res=>{
					this.isvip=res.data.is_vip
					this.price=res.data.balance_desc
			
					
					this.isFx=true//开启
				})
			},
			addhyxx(){
				$go.request({
					header:{
						sessionid:JSON.parse(wx.getStorageSync('user')).sessionid
					},
					url:'https://bjcore01.vanshin.fun/fish/prepaid_act/list',
				}).then(res=>{
					this.usedata=res.data.list
					
					
					
				}).catch(res=>{
					
				})
			},
			addhy(){//开启会员
			let arr=this.usedata.map((i,k)=>{
				
						return i.description
				
				
			})
			 arr=arr.slice(0, 6)
		
				wx.showActionSheet({
				  itemList:arr,
				  success:res=> {
				    
						
						this.goapi(this.usedata[res.tapIndex])
					
					
				  },
				  fail (res) {
				 
				  }
				})
				
				
				
				
				
			
			},
			goapi(use) //付款
			{
				
				
				let c=use.sill_amt
				
				
				
				use.price=c
				
				wx.login().then(info=>{
				
			
					$go.request({
						
						url:'https://bjcore01.vanshin.fun/fish/trade/create',//请求ss
						method:'POST',
						header: {
						
						sessionid:JSON.parse(wx.getStorageSync('user')).sessionid,
						
						},
						data:{
							
							item_id:use.id,
							menu:JSON.stringify(use),
							busicd:'700000',
							openid:JSON.parse(wx.getStorageSync('user')).openid,
						
							
							
						}
					}).then(res=>{
					
						this.api_syssn=res.data.syssn
				
						
						uni.showLoading({title:'支付中....', mask:true})
			
						
						wx.requestPayment({
						  timeStamp: res.data.timestamp,
						  nonceStr:res.data.nonce_str ,
						  package: `prepay_id=${res.data.prepay_id}`,
						  signType:res.data.sign_type,
						  paySign:res.data.pay_sign,				  
						  success: res=> {
							  
							  if(res.errMsg=='requestPayment:ok')
							  {
							  this.gofish()
								
							  }
						  },
						  fail (res) { 
							  uni.hideLoading()
							  
							   	uni.showToast({		title: '支付失败',icon:"none",	duration: 1500})
							 
						  }
						})
				
				
					
						})
			
				})
				
			},
			gofish()
			{
				
				$go.request({
					url:'https://bjcore01.vanshin.fun/fish/trade/query',
					method:'POST',
					header: {
					
					sessionid:JSON.parse(wx.getStorageSync('user')).sessionid,
					
					},
					
					data:{
						syssn:this.api_syssn
					}
				}).then(
				res=>{
					uni.hideLoading()
					
					uni.showToast({		title: '支付成功',icon:"none",	duration: 1500})
					this.isvipbd()
					
				}
					
				)  
			}
			,
			hysm(){//会员说明
				 wx.showModal({
				     title: '会员说明',
					 showCancel:false,
				     content: '返鱼优化，充值福利',
				     success: function (res) {
				       if (res.confirm) {//这里是点击了确定以后
				       
				       } else {//这里是点击了取消以后
				        
				       }
				     }
				   })
				
			},
			
			
		},
		
		mounted(){
			
			this.isvipbd()//获取是否是会员
			this.addhyxx()//获取会员权限信息
			
		
			
		},
		onShow(){
			if(wx.getStorageSync('user'))
			{
				this.isvipbd()//获取是否是会员
				this.addhyxx()//获取会员权限信息
				}
		else
		{
			wx.switchTab({
				url:"/pages/my/my",
				success:res=>{
					uni.showToast({	title: '请先登录',icon:'none',duration: 1000})
				}
			})
		}
			
		}
	}
</script>

<style scoped lang="scss">
.wallet{
	width: 750rpx;
	height: 100vh;
	
	position: relative;
.top{
	width: inherit;
	height: 30%;
	background: linear-gradient(180deg,#6495ED,#0156FF);
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
view{
	text-align: center;
	margin-top: 1em;
	text:nth-child(1){
		display: block;
		font-size: 1em;
		color: #FFFFFF;
		
	}
	text:nth-child(2){
		display: block;
		font-size: 2em;
		color: #FFFFFF;
		margin-top: .3em;
	}
}
}
.but{
	bottom: 0;
	position: absolute;
	width: inherit;
	height: 80%;
	
	background: #FFFFFF;
	overflow: hidden;
	
		view:nth-child(1)
		{
			border-top: 1rpx solid #cccccc;
		}
		view{
			width: 100%;
			height: 60rpx;
			line-height: 100%;
	
			padding: 20rpx;
			font-size: 1em;
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #cccccc;
			
			image{
				display: block;
				margin-right: 1em;
				height: 50rpx;
			}
		}
}
}


</style>
