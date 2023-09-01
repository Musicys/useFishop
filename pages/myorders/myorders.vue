<template>
<view class="cart">
		
		<iszore url="../static/prios.png" title="暂无押金" v-if="isyaj"></iszore>
		
		<view v-else>
			<view class="top">
			
				<view class="rigt">
					<text>剩余押金￥ {{arrprice}}</text>
					
				</view>
			</view>
			<scroll-view scroll-y="true"  class="fishCart" >
			
			<Cartprice v-for="(i,k) in usedata" :key="k" @click.native="gopost(k)" :data="i" :index="k+1" ></Cartprice>
				
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import iszore from "@/components/iszore.vue"
	import Cartprice from "@/components/Cartprcie.vue"
	import $go from "@/common/api/request.js"
	export default {

		data() {
			return {
				
				usedata:[],
				isyaj:false,
				arrprice:'',
				arruseprice:'',
				isFx:false
			};
		},
		components:{
			iszore,
			Cartprice
		},
		methods:{
			gopost(e){
				uni.navigateTo({
					url:`/pages/post/post?id=${e}&use=${true}`,
					
				})
			},
			fishroot(){
					
					if(wx.getStorageSync('user'))
					{
						$go.request({
							url:'https://bjcore01.vanshin.fun/fish/user/pledge_list',//个人所有账单的界面
							header:{
								sessionid:JSON.parse(wx.getStorageSync('user')).sessionid
							}
						}).then(res=>{
						
							this.usedata=res.data
							
							this.setprice()
							
							
						})
					}
				},
			//初始化总金额和
			setprice(){
				// arrprice:'',
				// arruseprice:''
				let a=0
				let b=0
				this.usedata.map(i=>{
				a+=i.pledge_desc
				b+=i.refund_amt_desc
				})
				this.arrprice=a
				this.arruseprice=b
				this.isFx=true//开启
				
				if ( this.usedata.length === 0) {
				  // 数组为空
				
					this.isyaj=true
				}
			
			}
			
		},
		beforeMount(){
			this.fishroot()
			
		
		},
		onShow()
		{
			this.fishroot()
		}
	}
</script>

<style lang="scss" scoped>

.cart{
width: 750rpx;
height:100vh;

.top{
	width: 750rpx;
	background: linear-gradient(180deg,#6495ED,#0456FF);
	height: 15%;
	display: flex;
	justify-content: center;
	align-items: center;

	.rigt{
		text-align: center;
		text{
	
			font-size: 1.2em;
			display: block;
			margin-right: 1em;
			margin-top: .2em;
			color:#FFFFFF;
			margin-bottom: 1em;
		}
		text:nth-child(2)
		{
			margin-top: .5em;
		}
	}
}
.fishCart{
	width: 750rpx;
	height: 85%;
	
}
	

}

</style>