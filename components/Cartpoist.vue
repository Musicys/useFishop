<template>
	<view class="cart" :class="isvip?'ys3':'ys4'">
		<image src="/static/hy.png" mode="heightFix"></image>
			<text>{{usedata.time}}</text>
		<text>{{usedata.name}}</text>
		<text>{{usedata.price}}</text>
		<text :class="usedata.pledge_state=='2'?'ys':'ys2'">{{usedata.pledge_state=='2'?'未退款':'已退款'}}</text>
		<image src="../static/right.png" mode="heightFix"></image>
	</view>
</template>

<script>
	export default {
		name:"Cartpoist",
		props:{
			data:{
				default(){
					return {
						amt: 1,
						busicd: "800201",
						ctime: "2023-08-22 14:28:49",
						detail: '{"id":72,"pool_id":32,"duration":10800,"price":0,"pledge":1,"state":1,"menu_type":1,"over_price":1,"description":"测试","enable_time":null,"ctime":"2023-08-22 14:26:33","utime":"2023-08-22 14:26:33","enable_time_desc":"","repuchase":0,"pool_name":"纯玩塘口","pool_image_url":"fish-pool-1319717401.cos.ap-shanghai.myqcloud.com/fish/32.jpg","pool_description":0,"vip_repuchase":0,"price_desc":0,"pledge_desc":0,"duration_desc":"3小时"}',
						id: 1182,
						item_id: 72,
						orig_syssn: "",
						pay_succ_time: "2023-08-22 14:29:03",
						pick_code: "3",
						pledge_state: 2,
						refund_amt: 0,
						retcd: "0000",
						syssn: "20230822142849000045",
						total_amt: 1,
						total_amt_desc: 0.01,
						userid: 2,
						utime: "2023-08-22 14:29:02",
						wx_details: "支付成功",
						wx_syssn: "4200001902202308223379573771"
					} 
				}
			},
			isvip:{
				default(){
					return false
				}
			}
		},
		data() {
			return {
				usedata:{
					name:'',
					time:'',
					price:'',
					pledge_state:'已经推'
				}
			};
		},
		methods:{
			setusedata(){
			
			this.usedata={
			name:`${JSON.parse(this.data.detail).pool_name}${this.data.pick_code}号`,
			time:this.data.ctime.slice(0, 10),
			price:this.data.pledge_desc,
			pledge_state:this.data.pledge_state
			}
			
			
			}
		},
		mounted(){
			this.setusedata()
		}
	}
</script>

<style lang="scss" scoped >
.cart{
	width: 750rpx;
	height: 90rpx;
	display: flex;
	justify-content: space-between;
	align-items:center;
	image{
		height: 80%;
		width: 60rpx;
	}
	
	text{
		font-size: .9em;
	}
}
.ys2{
	background: green;
	color: #FFFFFF;
}
.ys{
	background: #6495ED;
		color: #FFFFFF;
}

.ys3{
	border-bottom: 1rpx solid #6495ED;
}
.ys4{
	border-bottom: 1rpx solid  #6495ED;
}
</style>