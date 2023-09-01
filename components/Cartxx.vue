<template>
	<view class="cart" v-show="isFx">
		<view class="top">
			<view class="left">
				<image src="/static/time_cartxx.png" mode="heightFix"></image>{{usefishnmber.istail}}
			</view>
			<view class="rigt">
				<text>{{usefishnmber.ispritime}}</text>
				<text>支付金额￥{{usefishnmber.isprices}}</text>
			</view>
		</view>
		<view class="but">
			<Cart :fishshop="true" :data="usefishnmber.data" v-if='isCart'></Cart>
			
			<view class="buts">
				<view><image src="/static/nodd.png" mode="heightFix"></image>鱼塘编号： {{usefishnmber.pick_code}}号</view>
				<view><image src="/static/hysm.png"  mode="heightFix">使用状态： {{usefishnmber.isuse?'正在使用':'已结束使用'}}</view>
				<view><image src="/static/prios.png"  mode="heightFix">退款押金： {{usefishnmber.isprice}}.00</view>
				<view><image src="/static/times_cartxx.png"  mode="heightFix">门票时间： {{usefishnmber.usetiem}}</view>
				<view><image src="/static/price_cartxx.png"  mode="heightFix">支付方式： {{usefishnmber.isshop?'会员支付':'微信支付'}}</view>
				<view><image src="/static/hy.png" mode="heightFix">会员资格： {{usefishnmber.isshop?'会员用户':'普通用户'}}</view>
				
				<button :class="usefishnmber.istail=='已支付'?'ys':'ys1'" @click="goresd"  v-if="use">{{usefishnmber.istail=='已支付'?'申请退款':'已退款'}}</button>
				<button :class="usefishnmber.isuse?'ys':'ys1'" @click="gofish" v-else>{{usefishnmber.isuse?'续费加时':'已结束'}}</button>
				
			</view>
		</view>
	</view>
</template>

<script>
	import $go from "@/common/api/request.js"
	import Cart from "@/components/Cart.vue"
	export default {
		name:"Cartxx",
		props:{
			index:{
				default(){
					return 0
				}
			},
			use:{
				default(){
					return false
				}
			}
		},
		data() {
			return {
				isFx:false,
				usefish:
				{
					
				}//总数据
				,
				isCart:false,
				
				usefishnmber:{
					data:{
					
					},
					pick_code:'1',//鱼塘编号
					isuse:false,//使用状态
					isprice:'0.01',//剩余押金
					usetiem:'2023年8月8日 13:40-17:40',
					isshop:false,//普通用户微信支付就是false
					isminter:'',//年月
					isprices:'',//支付金额
					ispritime:'',//支付时间
					istail:''//pledge_state 1: 未支付 2: 已支付 3: 已退押金
				}//使用的数据
			};
		},
		components:{
			Cart
		},
		methods:{
			goresd(){//退款
			
				return uni.showToast({	title: '请联系后台退款',icon:"none",	duration: 1500})
			wx.showModal({
			  title: '结束退押金(时长将会结束)',
			 
			  success:res=> {
			    if (res.confirm) {
			   let that =this
			   $go.request({
			   	url:'https://bjcore01.vanshin.fun/fish/trade/refund',
			   	method:'POST',
			   	header: {
			   	
			   	sessionid:JSON.parse(wx.getStorageSync('user')).sessionid,
			   	
			   	},
			   	
			   	data:{
			   		syssn:this.usefish.syssn,
			   		refund_amt:'1',
			   		refund_detail:'测试'
			   	}
			   }).then(
			   res=>{
			   		
			 
				if(res.respcd==='2101')
				{
					uni.showToast({	title: res.respmsg,icon:"none",	duration: 1500})
					uni.navigateTo({
						url:'/pages/myorders/myorders'
					})
					
				}
			   	if(res.respcd==="1145")
			   	{
			   	  	uni.showToast({	title: '已申请退款',icon:"none",	duration: 1500})
			   		
			   	let time=setInterval(()=>{
			   		$go.request({//退款查询
			   			url:'https://bjcore01.vanshin.fun/fish/trade/refund_query',
			   			method:'POST',
			   			header:{
			   				sessionid:JSON.parse(wx.getStorageSync('user')).sessionid
			   			},
			   			
			   			data:{
			   				syssn:res.data.syssn
			   			},
			   			
			   		}).then(res=>{
			   			
			   		
			   			if(res.respcd==="0000")
			   			{
			   				
							getApp().fishusers=true
			   				uni.showToast({	title: '已退款',icon:"none",	duration: 1500})
			   				clearInterval(time)
			   				
			   				that.tuik=false
							uni.navigateTo({
								url:'/pages/myorders/myorders'
							})
			   			}
			   			else
			   			{
			   				
			   				
			   				that.tuik=true
			   			}
			   			
			   		})
			   	},3000)
			   		
			   	}
				else if(res.respcd==='0000')
				{
					
					
					this.fishroot()
					 wx.navigateBack({
					    delta: 1,  // 返回的页面数，如果 delta=1 则返回上一级页面
						success:res=>{
							getApp().fishusers=true
								uni.showToast({	title: '已退款',icon:"none",	duration: 1500})
						}
					  });
				}
			   	else
			   	{
			   		  	uni.showToast({	title: '已退款',icon:"none",	duration: 1500})
			   		
			   		
			   	}
			   	
			   })  
			    } else if (res.cancel) {
			     return 
			    }
			  }
			})
			},
			gofish(){
				getApp().addfishtiem=true
				getApp().usetab =1
				wx.switchTab({
					url:"../index/index"
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
				
							this.usefish=res.data[this.index]
							
						
						this.usefishnmber.data=JSON.parse(res.data[this.index].detail)
							this.isCart=true
							// 700004 储值续费 800202 微信续费判断是否是会员资格
						
							//页面渲染
							this.setusefishnmber()
						})
					}
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
				,
				setusefishnmber(){//页面渲染
					this.usefishnmber.pick_code=this.usefish.pick_code//鱼塘编号赋值
					
					if(this.usefish.end_time*1000>Date.now()){
						this.usefishnmber.isuse=true//使用状态
					}
					this.usefishnmber.isprice=this.usefish.refund_amt_desc//押金
					
				
					
					this.usefishnmber.usetiem=`${this.gittiem(this.usefish.start_time*1000)}~${this.gittiem(this.usefish.end_time*1000,false)}`//时间
					//是否会员
					console.log('使用数据',this.usefish);
					if(this.usefish.busicd==="800201")
					{
						this.usefishnmber.isshop=false
					}
					else
					{
						this.usefishnmber.isshop=true
					}
					this.usefishnmber.isprices=this.usefish.total_amt_desc
					this.usefishnmber.ispritime=this.usefish.pay_succ_time
					
					if(this.usefish.pledge_state===1)
					{
						this.usefishnmber.istail='未支付'
					
					}
					if(this.usefish.pledge_state===2)
					{
						this.usefishnmber.istail='已支付'
						
					}
					if(this.usefish.pledge_state===3)
					{
						this.usefishnmber.istail='已退押金'
					}
						this.isFx=true//开启
				}
				
				
			
			},
	
		beforeMount()
		{
			
			this.fishroot()
			
			
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