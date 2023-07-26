<template>
	<view class="fishshop">
		<Cart :fishshop="true"></Cart>
		
		<view class="center">
			<text>一池塘(3小时)</text>
			<text>48</text>
		</view>
		<view class="fkshop">
			<view class="left">
				￥360（240+ 100 押金）
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
import { log } from "util";
	export default {
		components:{
			Cart
		},
		data() {
			return {
				id:0
			};
		},
		onLoad(e)
		{
			
			this.id=e.id
			console.log(this.id);
			wx.login().then(res=>{
				console.log(res);
			})
		},
		methods:{
			goapi() //付款
			{
				wx.login().then(info=>{
					$gos.request({
						url:'/fish',
						method:'POST',
						data:{
							code:info.code
							
						}
					}).then(res=>{
						uni.showLoading({title:'支付中....', mask:true})
						$gos.request({
							url:'/fish2',
							method:'POST',
							data:{
								code:res.data
								
							}}).then(resf=>{
								setTimeout(()=>{
										uni.hideLoading()
										uni.showToast({		title: '支付成功',	duration: 1500,
										success:res=>{
											console.log('支付成功');
										wx.switchTab({
											url:"../index/index"
										})
										}});
								},1000)
							
							}).catch(res=>{
								uni.hideLoading()
								uni.showToast({		title: '支付失败',	duration: 1500});})
					
					
								})
				
								})
		
				
									}
		}
	}
</script>

<style lang="scss">
.fishshop{
	width: 750rpx;
	
	height: 90vh;
}
.center{
	padding: 20rpx;
	width: 580rpx;
	border-radius: 1em;
	margin: auto;
	
	height: 200rpx;
	background: #7585FE;
	text-align: center;
	text{
		display: block;
		color:#C8CDE9;
		font-size: 1.5em;
		margin-top: .2em;
		font-weight: bold;
	}
	
	&>text:nth-child(2)
	{
		font-size: 1.8em;
		margin-top: .8em;
		font-weight: bold;
	}
}
.fkshop{
	position: fixed;
	bottom: 0;
	height: 3rem;
	background: #7284FD;
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
</style>
