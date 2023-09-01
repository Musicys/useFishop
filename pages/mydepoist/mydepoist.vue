<template>
	<view >
<!-- 订单信息 -->
	<view class="scollcd " >
	
		<view :class="usetab===0?'ys':''" @click="settab(0)">
			<text>会员订单</text>
		</view>
		<view :class="usetab===1?'ys':''" @click="settab(1)">
			<text>普通订单</text>
		</view>
		

	</view>
	<swiper  :autoplay="false" 	:current="usetab" class="swiper" 	@change="use">
		<swiper-item>
		<scroll-view scroll-y="true"  class="scrolltwo" :scroll-with-animation="true" v-if="isuse" >
			
			<view class="cart" >
				<Cartpoist v-for=" (i,k) in isviopdata" :key="k" :data='i' :isvip="true" @click.native="gopost(i)" ></Cartpoist>
			</view>
		</scroll-view>
		<view class="ti" v-else>
			<iszore url="../static/nodd.png" title="暂无订单"  ></iszore>
		</view>
		
		</swiper-item>
		<swiper-item>
		<scroll-view scroll-y="true"  class="scrolltwo" :scroll-with-animation="true" v-if="isuse2" >
			
		<view class="cart" >
			<Cartpoist v-for=" (i,k) in isuserdata" :key="k" :data='i' :isvip="false" @click.native="gopost(i)"></Cartpoist>
		</view>
		</scroll-view>
		<view class="ti" v-else>
			<iszore url="../static/nodd.png" title="暂无订单"  ></iszore>
		</view>
		</swiper-item>
	</swiper>
		

	

		
	</view>
	
	
</template>

<script>
	import $go from "@/common/api/request.js"
		import Cartpoist from "@/components/Cartpoist.vue"
	import iszore  from "@/components/iszore.vue"

	export default {

		data() {
			return {
				isuse:true,
				isuse2:true,
				usedata:[],	//历史订单数据
				usetab:0,
				isviopdata:[],//700001
				isuserdata:[]//'800201
			};
		},
		methods:{
			use(e){
				this.usetab=e.detail.current
			},
			gopost(i){
				
				getApp().mypriceusedata=i
				uni.navigateTo({
					url:'/pages/usepost/usepost'
				})
			},
		settab(e){
			this.usetab=e
			
		},
		setdata(){
			$go.request({
				url:'https://bjcore01.vanshin.fun/fish/user/record_list',//个人所有账单的界面
				header:{
					sessionid:JSON.parse(wx.getStorageSync('user')).sessionid
				}
			}).then(res=>{
			
					console.log(res);
					this.usedata=res.data
					this.setusedata()
			})
				},
		setusedata()
			{
				
				this.isviopdata=this.usedata.filter(i=>{
					return i.busicd=="700001"&&i.pledge_state!==1
				})
				if(this.isviopdata.length===0){ this.isuse=false}
				this.isuserdata=this.usedata.filter(i=>{
					return i.busicd=="800201"&&i.pledge_state!==1
				})
				if(this.isuserdata.length===0){ this.isuse2=false}
				
				
			}
			
			},
			
	
		components:{
			 iszore,
			Cartpoist
		
		},
		beforeMount(){
		
		this.setdata()
	

		}
	}
	
</script>

<style lang="scss" scoped>
	.scrolltwo{
		height: 92vh;
		width: 750rpx;
	
	}
	.swiper{
		height: 92vh;
		
	}
	.scollcd{
			width: 750rpx;
			height: 8vh;
			white-space: nowrap;
			display: flex;
			justify-content: space-between;
		
			view{
				flex: 1;
				padding: 10rpx 30rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			
				text{
					
						font-size: 1.1em;
						
						
				}
			}
		}

.ys{
	border-bottom: 2rpx solid #6495ED ;
	color: #6495ED;
}

</style>