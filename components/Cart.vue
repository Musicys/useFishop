<template>
	<view >
		
	
	<view class="Cart">
		<view class="top">
			<view class="left">
				<image src="https://tse2-mm.cn.bing.net/th/id/OIP-C.Xhg3AagkYbO8MNcE5FK5xQHaD0?pid=ImgDet&rs=1" mode="aspectFill"></image>
				<view class="left_text">
					正钓 7 月 2 日
				</view>
			</view>
			 <view class="right">
			
			<view class="right_bt">  <image src="/static/shayu.png" mode=""></image>一号额鱼塘</view>
			 	<view class="right_cl">7月1日放什么鱼1000今</view >
			 	<view class="jg">
						<!-- <image src="/static/hg.png" mode="" ></image> -->
			 		<view class="jg_hy"> <image src="../static/hg.png" mode=""></image>会员价格25/斤</view><text>散客20/斤</text>
			 	</view>
			 </view> 
		</view> 
		<view class="but" v-if="!fishshop">
			<view class="but_left">
				<view class="lets">￥240
				<view class="yaj">+100押金</view>
				<view class="time">（四小时）</view>
				</view>
				
			</view>
			<view class="but_right" @click="navgoshop" >
				购票+押金
			</view>
		</view>
		</view>
	</view>
	
	
	
	
</template>

<script>
	export default {
		name:"Cart",
		props:{
			fishshop:{
				default(){
					return false
				}
			}
		}
		,
		data() {
			return {
				id:1
			};
		},
		methods:{
			navgoshop(){
				
				uni.navigateTo({
					url:"/pages/fishshop/fishshop?id="+this.id,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
.Cart{
	width:620rpx;
	height: 350rpx;
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