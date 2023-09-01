<template>
	<view class="Cartpcie" v-show="isFx">
		
			<text>{{datas.index}}号</text>
			<text>{{datas.time}}</text>
			<text>押金￥{{datas.price}}</text>
			<view :class="datas.isyajin?'ys':'ys2'">{{datas.isyajin?'已退款':'未退款'}}</view>
			<image src="@/static/right.png" mode="heightFix" ></image>
		
		
	</view>
</template>

<script>
	export default {
		name:"Cartprcie",
		props:['data','index'],
		data() {
			return {
				datas:{
					isyajin:false,//是否退款
					index:1,//序号
					time:'2023-8-9 17:04',//结束时间
					price:100,//押金大小
					isFx:false
				},
				
			};
		},
		methods:{
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
				if(boler)
				{
					currentHour=currentHour>9?currentHour:'0'+currentHour
					currentMinute=currentMinute>9?currentMinute:'0'+currentMinute
					return `${currenyear}-${mouin+1}-${day} ${currentHour}:${currentMinute}`
				}
				else
				{
					return `${currentHour}:${currentMinute}`
				}
				
			
				
				
			}
			,
			setdatas(){
				if(this.data.pledge_state===3)//是否退款
				{
					this.datas.isyajin=true
				}else
				{
						this.datas.isyajin=false
				}
				this.datas.index=this.index>9?this.index:'0'+this.index//序号
				// gittiem(this.data.)//结束时间
				this.datas.time=this.gittiem(this.data.start_time*1000)
				
				this.datas.price=this.data.pledge_desc
					this.isFx=true//开启
			}
		},
		beforeMount(){
		this.setdatas()
		}
	}
</script>

<style scoped lang="scss">
.Cartpcie{
	width: 750rpx;
	height: 100rpx;
	
	border-bottom: 1rpx solid #CCCCCC;
	display: flex;
	
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	flex-wrap: nowrap;
	image{
		height: 50rpx;
		margin-left: 2em;
	
	}
	text
	{
		margin-left: 1.5em;
	}
	
	text:nth-child(1)
	{
		margin-left:0em;
		font-size: .8em;
		display: inline-block;
		
		
		
		
	}
	text:nth-child(2)
	{
		font-size: 1em;
	}
	text:nth-child(3)
	{
		font-size: .8em;
		
	}
	view{
		font-size: .8em;
		margin-left: .8em;
	}
	
}
.ys{
	background: green;
	color: #FFFFFF;
}
.ys2{
	background: #6495ED;
		color: #FFFFFF;
}


</style>