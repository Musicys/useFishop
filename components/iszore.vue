<template>
	<view class="tis">
		
	<view >
		<image :src="url" mode="heightFix"></image>
		<text>{{title}}</text>
	</view>
		</view>
</template>

<script>
	export default {
		name:"iszore",
		props:{
			title:{
				default(){
					return '暂无计时'
				}
			},
			url:{
				default(){
					return '../static/getfish.png'
				}
			}
		}
		,
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.tis{
	width: 750rpx;
	height: 80vh;
	
	display: flex;
	justify-content: center;
	align-items: center;

	view{
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		image{
			width: 250rpx;
			height: 200rpx;
			
		}
		text{
			display: block;
			color: #6495ED;
			font-size: 1.2em;
			font-weight: bold;
			margin-top: .5em;
		}
	}
	
}
</style>