<template>
<scroll-view scroll-y="true"  class="index" :scroll-with-animation="true" >
   <view v-for="(i,k) in usedata" :key="k">
   	<text class="bt">{{i.ctime}}</text>
   	<view class="Cart">
   		<view class="top">
   			{{i.name}}
   		</view>
   		<view class="centern">
   			<text>付款鱼币</text>
   			<text>￥{{i.total_amt_desc}}</text>
   			
   		</view>
   		<view class="but">
   			<text><text>支付方式：</text>会员鱼币</text>
   			<text v-if="i.busicd=='700001'"><text>收款方：</text>合肥冠军路亚俱乐部</text>
   		</view>
   	</view>
   </view>

</scroll-view>
	
</template>

<script>
		import $go from "@/common/api/request.js"

	export default {
		data() {
			return {
				data:[],
				usedata:[]
			}
		},
		methods: {
			setdata(){
				$go.request({
					url:'https://bjcore01.vanshin.fun/fish/user/record_list',//个人所有账单的界面
					header:{
						sessionid:JSON.parse(wx.getStorageSync('user')).sessionid
					}
				}).then(res=>{
				
					
						this.data=res.data
						this.setusedata()
						
						
				})
			},
			//700000 充值
			//700001 消费
			//700003 退款
			//700004 续时长
			setusedata(){
				
				this.usedata=this.data.filter(i=>{
					return i.busicd=='700000'||i.busicd=='700001'||i.busicd=="700003"||i.busicd=="700004"||i.busicd=='100102'||i.busicd=='100103'
				})
				
				this.usedata.map(i=>{
					switch(i.busicd) {
					  case '700000':
					    i.name='微信充值'
					    break;
					  case '700001':
					    i.name='购买商品'
					    break;
					  case "700003":
					    i.name='商品退款'
					    break;
					case "700004":
						i.name='商品续费'
						break;
					case "100102":
						i.name='后台充值'
						break;
					case "100103":
						i.name='后台消费'
						break
					 
					}
					
				})
				console.log(this.usedata);
			}
		},
		mounted(){
			this.setdata()
			console.log(JSON.parse(wx.getStorageSync('user')).sessionid);
		}
	}
</script>

<style lang="scss"  scoped>
.index
{
	width: 750rpx;
	height: 100vh;
	background: #F5F5F5;
	

	view{
			margin-bottom:1em;
		.bt{
			display: block;
			width: 750rpx;
			color: black;
			font-size: .8em;
			text-align: center;
			
		}
		.Cart{
			width: 93%;
			margin: 20rpx auto;
			height: 450rpx;
			border-radius: 15rpx;
			padding-top: 1em;
			padding-left: .5em;
			background: #FFFFFF;
			.top{
				border-bottom: 1rpx solid #CCCCCC;
				
				font-size: 1em;
				color: black;
			}
			.centern
			{
				width: 100%;
				height: 35%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-wrap: wrap;
				margin-top: 1em;
				text{
					width: 100%;
					display: block;
					text-align: center;
				}
				text:nth-child(1)
				{
					color:  #AAAAAA;
				}
				text:nth-child(2)
				{
					color: black;
					font-size: 1.5em;
					font-weight: bold;
				}
			}
			.but{
				
				display: flex;
				flex-wrap: wrap;
				align-content: stretch;
				margin-top: 1.5em;
				text{
					flex: 100%;
						margin-top: 1em;
						text{
							color: #AAAAAA;
							
						}
				}
			}
		}
	}
}
</style>
