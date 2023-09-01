<template>
	<view class="cart" >
		<view class="top">
			<view class="left">
				<image src="/static/time_cartxx.png" mode="heightFix"></image>{{usedata.pledge_state===2?'使用中':'已退款'}}
			</view>
			<view class="rigt">
				<text>{{usedata.ctime}}</text>
				<text>支付金额￥{{usedata.total_amt_desc}}</text>
			</view>
		</view>
		<view class="but">
			<Cart :fishshop="true"  :data="cart" v-if="isCart"></Cart>
			
			<view class="buts">
				<view><image src="/static/nodd.png" mode="heightFix"></image>鱼塘编号： {{usedata.pick_code}}号</view>
				<view><image src="/static/prios.png"  mode="heightFix">退款押金：{{usedata.pledge_desc}}</view>
					<view><image src="/static/clicok.png"  mode="heightFix">门票时长：{{usedata.duration_desc}}</view>
				<view><image src="/static/price_cartxx.png"  mode="heightFix">支付方式：{{usedata.busicd==='700001'?'钱包余额':'微信支付'}}</view>
				<view><image src="/static/hy.png" mode="heightFix">会员资格：{{usedata.busicd==='700001'?'会员资格':'普通资格'}} </view>
				<view><image src="/static/price_cartxx.png" mode="heightFix">回鱼价格：{{usedata.busicd==='700001'?cart.vip_repuchase:cart.repuchase}} </view>
			
				<button class="fybutom" @click="golieb">返回订单列表</button>
			</view>
		</view>
	</view>
</template>

<script>
	import $go from "@/common/api/request.js"
	import Cart from "@/components/Cart.vue"
	export default {
		name:"Cartxx",
	
		data() {
			return {
				usedata:{},
				isCart:false,
				cart:{}
			};
		},
		components:{
			Cart
		},
		methods:{
			golieb(){
				wx.navigateBack()
			},
				gittiem(data,boler=true)//时间函数
				{
					
					
					// 创建一个新的 Date 对象，并设置为当前时间
					let currentDate = new Date(data);		
					// 获取当前的小时和分钟数
					let currentHour = currentDate.getHours();
					let currentMinute = currentDate.getMinutes();
					let currenyear=currentDate.getFullYear()
					let mouin=currentDate.getMonth()
					let day=currentDate.getDate()
					currentHour=currentHour>9?currentHour:'0'+currentHour
					currentMinute=currentMinute>9?currentMinute:'0'+currentMinute
					if(boler)
					{
						
						return `${currenyear}年${mouin+1}月${day}日${currentHour}:${currentMinute}`
					}
					else
					{
						return `${currentHour}:${currentMinute}`
					}
					
				
					
					
				}
			
				
				
			
			},
	
		beforeMount()
		{
			console.log('使用数据',getApp().mypriceusedata);
		
			
			
			
			
		},
		mounted(){
			this.usedata=getApp().mypriceusedata
		
			this.cart=JSON.parse(this.usedata.detail)
				this.isCart=true
				console.log(this.cart);
		}
	}
</script>

<style lang="scss" scoped>
.cart{
width: 750rpx;
height:90vh;

.top{
	width: 750rpx;
	background: linear-gradient(180deg,#6495ED,#0456FF);
	height: 15%;
	display: flex;
	justify-content: space-between;
	
	.left{
		margin-left: .5em;
		margin-top: .5em;
		font-size: 1.2em;
		color:#FFFFFF;
		display: flex;
		height: 1.2em;
		
		image{
			margin-right: .5em;
			height: 100%;
			
			
		}
	}
	.rigt{
		margin-top: .5em;
		text{
			text-align: end;
			font-size: 1em;
			display: block;
			margin-right: 1em;
			margin-top: .4em;
			color:#FFFFFF;
		}
		text:nth-child(2)
		{
			margin-top: 1.2em;
		}
	}
}
.but{

	width: inherit;
	border-radius: 50rpx 50rpx 0rpx 0rpx;
	background: #FFFFFF;
	
	position: relative;
	.fybutom{
		background: #6495ED;
		color: #FFFFFF;
	}
	.buts{
		view{
			display: block;
			padding: 20rpx;
			border-bottom: 1rpx solid #CCCCCC;
			align-items: center;
			display: flex;
			image{
				height: 50rpx;
				margin-right: 30rpx;
			}
		}
	button{
			
			position: fixed;
			bottom: 0;
			width:750rpx;
			
			color: #FFFFFF;
			font-size: 1em;
			border-radius: 0;
		}
	}
	
}
}
.ys
{
	background:#6495ED;
}
.ys1
{
	background: #CCCCCC;
}

</style>