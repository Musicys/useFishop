<template>
	<view class="index">
	<view class="index_top">
		<image src="../../static/usefish.png" ></image>
		<view class="top_bt">
			<text>冠军垂钓俱乐部</text>
			<text>副标题</text>
		</view>
	</view>
	
	<view class="index_but">
		<scroll-view scroll-y="true"  class="scrollview" :scroll-with-animation="true" :scroll-into-view="'to'+usey">
			<view class="top" id="to1">
				
				<view class="up_top">
						<!-- 按钮一 -->
					<view class="buttonone" @click="goshop"><text>当日票</text>
					<text>去购买</text></view>
					
					<view class="up_top_right">
						<!-- 按钮二 -->
					<view class="buttontwo">预约真钓</view>
						<!-- 按钮三-->
						<view class="buttonthree"><text>会员系统</text> <text>（暂未开放）</text></view>
					</view>
				</view>
				<view class="up_but">
						<!-- 按钮四-->
						<view class="buttonfour">渔获分享</view>
							<!-- 按钮无 -->
						<view class="buttonfive">订餐系统</view>
				</view>
				
			
				
			</view>
			
			<view class="but"  id="to2">
				
			</view>
		</scroll-view>
	</view>
	</view>
</template>

<script>
	import Cart from "@/components/Cart.vue"//卡片
	export default {
		data() {
			return {
			
				usey:1	// 控制滚动到购买页面
				
			}
		},
		onLoad() {

		},
		methods: {
			goshop(){
				this.usey=2
				setTimeout(()=>{
					this.usey=0
				})
			}
		}
	}
</script>

<style lang="scss" >
	.index{
		
		width: 750rpx;
		height: 100vh;
		background: gray;
		position: relative;
	}
	
	/* /index_top */
	
	.index_top{
			height: 40%;
			width: 750rpx;
			background: green;
			position: relative;
			image{
					width: 100%;
					height: 110%;
					position: absolute;
					top: -120rpx;
					z-index: 0;
					
				}
			.top_bt{
				z-index: 2;
				top: 30%;
				position: absolute;
				color: #FFFFFF;
				padding-left: 50rpx;
				
				&>text:nth-child(1){
					font-weight: bold;
					font-size: 56rpx;
					display: block;
					
				}
			}
	}

	

	.index_but
	{
		width: 750rpx;
		height: 70%;
	
		bottom: 0;
		position: absolute;
		border-radius: 25rpx 25rpx 0rpx 0rpx;
		overflow: hidden;
		.scrollview{
			width: 100%;
			height: 100%;
			background: green;
			.top{
				width: 100%;
				background: ghostwhite;
				height: 49%;
				background: #F6F6F6;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
			
				.up_top{
					
					display: flex;
					
					
				view
				{
					border-radius: 20rpx;
				}
					.buttonone{
						background: linear-gradient(to left ,#5392F2,#427DF1);
						width: 300rpx;
						height: 300rpx;
						margin-right: 20rpx;
						text:nth-child(1)
						{
							margin-top: 30rpx;
							font-weight: bold;
							color: #E0EBFC;
						}
						text:nth-child(2)
						{
							margin-top: 5rpx;
							color: #B9D1F9;
							font-size: 25rpx;
						}
						text{
							
							padding-left: 30rpx;
							display: block;
							
						}
						
						
					}
					.up_top_right{
							display: flex;
							flex-direction: column;
							width: 300rpx;
							height: 300rpx;
						.buttontwo{
							margin-bottom: 10rpx;
							flex: 1;
							background: #58BE6A;
							color: #E0EBFC;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							font-weight: bold;
							
						}
						.buttonthree
						{
							border-top: 10rpx;
							flex: 1;
							
							background: #F2EBEB;
							margin-top: 2rpx;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							color:#A3AAB5;
							
							font-weight: bold;
							text:nth-child(2)
							{
								font-size: 25rpx;
							}
						}
					}
				}
				.up_but{
					
					
					display: flex;
					background: #EFEFEF;
					margin-top: 10rpx;
					border-radius: 20rpx;
					
					width: 620rpx;
					justify-content: space-between;
					view{
						width: 50%;
						
						text-align: center;
						height: 75rpx;
						border-radius: 20rpx;
						background: #FFFFFF;
						margin: 10rpx 20rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						color:#D6D9DE;
						font-weight: bold;
					}
				}
				
			}
	
		
			.but{
				width: 100%;
				background: dimgray;
				min-height: 100%;
			}
		}
	}
	
	


</style>
