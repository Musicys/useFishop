<template>
	<view class="fishshop">
			
			<view class="Cart">
				<view class="top">
					<view class="left">
						<image :src="'https://'+usedata.pool_image_url" mode="aspectFill"></image>
						<view class="left_text">
							塘口信息
						</view>
					</view>
					 <view class="right">
					
					<view class="right_bt">  <image src="/static/shayu.png" mode=""></image>{{usedata.pool_name}}</view>
					 	<view class="right_cl">{{usedata.description}}</view>
					 	<view class="jg">
								<!-- <image src="/static/hg.png" mode="" ></image> -->
					 		<view class="jg_hy"> <image src="/static/hg.png" mode=""></image>会员价格{{usedata.vip_repuchase}}/斤</view><text>散客{{usedata.repuchase}}/斤</text>
					 	</view>
					 </view> 
				</view> 
		
				</view>
		
			<view class="use">
				<view><image src="/static/price_cartxx.png"  mode="heightFix">门票价格： {{usedata.pledge_desc}}.00</view>
				<view><image src="/static/prios.png"  mode="heightFix">押金金额： {{usedata.pledge_desc}}.00</view>
				<view><image src="/static/times_cartxx.png"  mode="heightFix">门票时间： {{usedata.duration_desc}}</view>
				<view @click="setshopfish()"><image src="/static/price_cartxx.png"  mode="heightFix" >支付方式： {{shopfish==='700001'?'会员支付':'微信支付'}}
				<image src="../../static/right.png" mode="heightFix"></image></view>
				<view><image src="/static/hy.png" mode="heightFix">用户资格： {{shopfish==='700001'?'会员用户':'普通用户'}}</view>
			</view>
	
		<view class="fkshop">
			<view class="left">
				￥{{api_price}}（{{usedata.price_desc}}+ {{usedata.pledge_desc}} 押金）
			</view>
		
			<view class="right" @click="goapi">	<!--付款  -->
				支付
			</view>
		</view>
		
		
		
	</view>
	
	
</template>

<script>
	import $gos from "@/common/api/request.js"
	import Cart from "@/components/Cart.vue"

	export default {
		components:{
			Cart
		},
		data() {
			return {
				id:0,//鱼塘编号
				usedata:{},//数据
				api_respcd:'' ,//个人标识符
				api_price:0,
				api_syssn:'',
				shopfish:'800201',//付款方式700004 
				isshop:true//能否支付
				
			};
		},
	
		onLoad()
		{
			
			
			let a=getApp().useshopfish
			
			this.usedata=a
			this.id=a.id
			this.api_respcd=JSON.parse(wx.getStorageSync('user')).respcd
			this.api_price= this.usedata.price_desc+this.usedata.pledge_desc
		
			
			
			
			
		
			
			
		},
		watch(){
			
		},
		methods:{
			setshopfish(){
				let that=this
				wx.showActionSheet({
				  itemList: ['微信支付', '会员钱包支付'],
				  success (res) {
				    if(res.tapIndex===1)
					{
						that.shopfish='700001'
					
					}
					else
					{
						that.shopfish='800201'
					
					}
				  },
				  fail (res) {
				
				  }
				})
			},
			
			
			
			goapi() //付款
			{
				
				if(!this.isshop)
				{
					return
				}
				this.isshop=false
				if(this.shopfish=='700001')
				{
					$gos.request({
						url:'https://bjcore01.vanshin.fun/fish/trade/create',
						header:{
							sessionid:JSON.parse(wx.getStorageSync('user')).sessionid
						},
						method:'POST',
						data:{
							item_id:this.id,
						
							menu:JSON.stringify(this.usedata),
							
							busicd:this.shopfish,//700004 储值续费 800202 微信续费
							openid:JSON.parse(wx.getStorageSync('user')).openid
						}
					}).then(res=>{
						if(res.respcd==='0000')
						{
						
							this.api_syssn=res.data.syssn
							uni.showToast({		title: '购买成功',icon:"none",	duration: 1500})
							this.gofish()
						}
						else
						{
							uni.showToast({		title: '余额不足',icon:"none",	duration: 1500})
						}
						
						
					})
				}
				else
				{
					
				wx.login().then(info=>{
				
			
					$gos.request({
						
						url:'https://bjcore01.vanshin.fun/fish/trade/create',//请求ss
						method:'POST',
						header: {
						
						sessionid:JSON.parse(wx.getStorageSync('user')).sessionid,
						
						},
						data:{
							
							item_id:this.id,
							menu:JSON.stringify(this.usedata),
							busicd:this.shopfish,
							openid:JSON.parse(wx.getStorageSync('user')).openid
							
							
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
						  fail :res=> { 
							  uni.hideLoading()
							  
							   	uni.showToast({		title: '支付失败',icon:"none",	duration: 1500})
							 this.isshop=true
						  }
						})
				
				
					
						})
			
				})
				
				}
			},
			gofish()
			{
				$gos.request({
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
				
					getApp().usetab =1
					wx.switchTab({
						url:"../index/index"
					})
				}
					
				)  
			}
		}
		
		
	
	}
</script>

<style lang="scss">
.fishshop{
	width: 750rpx;
	
	height: 90vh;
	.use{
		view{
			display: block;
			padding: 20rpx;
			border-bottom: 1rpx solid #CCCCCC;
			align-items: center;
			display: flex;
			position: relative;
			image{
				height: 50rpx;
				margin-right: 30rpx;
			}
			image:nth-child(2){
				height: 50rpx;
				position: absolute;
				right: 0;
			}
		}
	}
}

.fkshop{
	position: fixed;
	bottom: 0;
	height: 3rem;
	background: #6495ED;
	width: 750rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	.left{
		color: #FF4238;
		font-size: 1em;
		margin-left:2em;
		font-weight: bold;
		width: 60%;
	}
	.right{
		background: #FE5A37;
		color: #FFFFFF;
		width: 30%;
		height: 100%;
		font-size: 1.5em;
		font-weight: bold;
		display: flex;
		justify-content: center;
		align-items:center;
	}
	
}

// CART
	
.Cart{
	
	width:750rpx;
	height: 250rpx;
	border-radius: 25rpx;
	overflow: hidden;
	margin:20rpx auto;
	display: flex;
	box-shadow: 4rpx 5rpx  4rpx 4rpx  #F0F0F0;
	flex-direction: column;
	
	.top{
		display: flex;
		width: 100%;
		background: #FFFFFF;
		height: 70%;
		flex-direction: row;	
		.left{
			width:200rpx;
			height:200rpx;
			background: black;
			margin-left: 20rpx;
			margin-top: 20rpx;
			border-radius: 25rpx;
			overflow: hidden;
			position: relative;
			image {
				width: 200rpx;
				height: 150rpx;
				position: absolute;
				display: block;
				top: 0;
			}
			.left_text{
				height: 25%;
				width: 100%;
				position: absolute;
				background: #F1C026;
				color: #FFFFFF;
				bottom: 0;
				display: flex;
				align-items: center; /* 在垂直方向上居中对齐 */
				justify-content: center; 
				font-size: .6em;
			}
		}
		.right{
			flex: 1;
			
			width:100rpx;
			height: 100%;
			text{
				
				display: block;
				margin-left: .6em;
				margin-top: .8em;
			}
			.right_bt
			{
				margin-top: 1.2em;
				font-size: 1.2em;
				font-weight: bold;
				margin-left: .8em;
				padding-left: 1em;
				position: relative;
				color: #393939;
				image{
					left: 0;
					width: 1em;
					height: 1em;
					top: .3em;
					position: absolute;
				}
			}
			.right_cl
			{
				margin-left: 1em;
				color: #9CA0A6;
				font-weight: bold;
				margin-top:1em ;
				font-size: .9em;
			}
			.jg
			{
				position: relative;
				text{
					display: inline-block;
				}
				.jg_hy
				{
					display: inline-block;
					margin-top: 1em;
					color: #D7A26A;
					font-size: .9em;
					position: relative;
					padding-left: 1em;
					margin-left: .5em;
					image{
						width: 1em;
						height: 1em;
						position: absolute;
						left: 0;
						top:.3em
					}
				}
				
				&>text:nth-child(2)
				{
					position: absolute;
					font-size: 0.8em;
					right:  .5em;
					color: #BFC4CC;
					top: .3em;
					
				}
			}
		}
	}
	.but{
		width: 100%;
		background: #FFFFFF;
		flex:1;
		display: flex;
		flex-direction: row;
		.but_left{
			height: 100%;
			width: 70%;
			display: flex;
			align-items: center;
		
			.lets{
				flex: 1;
				font-size: 1.8em;
				display: flex;
				color: #508AF2;
				justify-content: center;
				align-items: center;
				
				.yaj{
					margin-top: .7em;
					font-size: .5em;
					color: #548DF3;
					
					
				}
				.time{
					font-size: .4em;
					color: #AFB6BF;
					margin-top: 1em;
					
				}
			}
			
		}
		.but_right{
			
			background: gold;
			flex:1;
			background: #518FF2;
			height: 50%;
			margin-top: 4%;
			text-align: center;
			border-radius: 50rpx;
			color:#FFFFFF;
			padding-top: .3em;
			padding-left: .4em;
			
			font-size: .8em;
			margin-right: .5em;
			
		}
	}
	
	
}

</style>
