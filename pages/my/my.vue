<template>
	<view class="my">
		<view class="mindex" v-if="iserwm">
			
		</view>
		<view class="erwm" @click="allerhm()" v-if="iserwm">
			<image src="https://fish-pool-1319717401.cos.ap-shanghai.myqcloud.com/fish_user/erwm.jpg" mode="widthFix"></image>
		</view>
<view class="my_top">
	
	<view class="use">
		<image :src="user.user_src"
		></image>
		<text>{{user.user_name}}</text>
	
	</view>
	 <!-- @click="goLogin" -->
		<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="dlu" v-if="user.isuser===0">登录</button>
		<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="dlu" v-else>重新登录</button>
	<!-- 	<button open-type="chooseAvatar" bind:chooseavatar="onChooseAvatar" class="dlu" v-if="user.isuser===1">完善信息</button> -->

</view>
<view class="my_ctner">
<text>订单</text>
	<view><button class="btnzoro" @click="gomypoist" >查看订单</button></view>
	<view><button class="btnone" @click="gomyorders">我的押金</button></view>
	<view><button class="btntwo" @click="gofish">我的计时</button></view>	
</view>
<view class="my_ctner">
	<text>其他</text>

	<view><button class="btnthree" @click="allerhm()">分享程序</button></view>
	<view><button class="btnfive" @click="phun()">联系后台</button></view>	
		<view></view>
</view>

	</view>
	
	

</template>


<script>
	import $go from "@/common/api/request.js"

	export default {
		data() {
			return {
			openId:'',
			unionid:'',
			session_key:'',
			user:{
				isuser:0 ,//是否登录
				user_src:'../../static/userx.png',
				user_name:'未登录',
				openid:''
			},
			iserwm:false
			
			
			
			}
		},
		
		methods: {
			phun(){
				
				wx.showActionSheet({
				  itemList: ['18456596091','18326300050'],
				  success:res=> {
					  console.log(res);
					  if(res.tapIndex===0)
					  {
						  wx.makePhoneCall({
						      phoneNumber: '18456596091' // 此处填入需要拨打的电话号码
						    });
					  }
					  if(res.tapIndex===1)
					  {
						  wx.makePhoneCall({
						      phoneNumber: '18326300050' // 此处填入需要拨打的电话号码
						    });
					  }
					  
					}})
				
			},
			allerhm()
			{
				this.iserwm=!this.iserwm
				
			},
			gomypoist(){
				wx.navigateTo({
					url:"../mydepoist/mydepoist"
				})
			}
			,
			gomyorders(){
				wx.navigateTo({
				url:"../myorders/myorders"
						})
			}
			,
			gofish()//去钓鱼界面
			{
				getApp().usetabflish=true
				wx.switchTab({
					url:"../index/index"
				})
				
			},
			//  goLogin() {
			// 	 wx.getUserProfile({
			// 	  desc: '用于完善会员资料', 
			// 	  success: (res) => {
				 
			// 	 	 	try {
			// 	 	 	  var value = wx.getStorageSync('user');
						
			// 	 	 	  if (value) {
							  
			// 			let a=JSON.parse(value)
						
			// 			a.user_name=res.userInfo.nickName
			// 			a.user_src=res.userInfo.avatarUrl  
			// 			a.isuser=2
			// 	 	 	this.user=a
						
			// 			wx.setStorageSync('user', JSON.stringify(a));
						
			// 	 	 	  }
			// 	 	 	} catch (e) {
			// 	 	 	  // 处理错误
			// 	 	 	  console.log(e);
			// 	 	 	}
				 				   
			// 	 	 }
			// 	 	  })
					
					
			// 		},
			getPhoneNumber(e) {
			 
				if(e.target.errMsg==="getPhoneNumber:ok")
				{
				
				
					wx.login({
						success:res=>{
							
							
							
							this.setuser( res.code,e.detail.code)
						}
					})
					// 错误码（失败时返回）
						
				}
				else{
					
				}
			
			},
			setuser(e,code)//用户信息
			{
				
			
			
				// 
				$go.request({
					url:'https://bjcore01.vanshin.fun/fish/user/login',
					data:{
						appid:'wx406e8d19fbc32bab',
						code:e,
						mobile_code:code
					},
				}).then(res=>{
			
					
					uni.showToast({		title: '登录成功',	duration: 1000});
					let usename =res.data.username
					let a=''
					for(let i=0; i<usename.length;i++)
					{
						if(i<3||i>6)
						{
							a=a+usename[i]
						}
						else
						{
							a=a+'*'
						}
						
						
						
					}
				
				
					
					this.user={
						isuser:1,//是否登录
						respcd:res.respcd,
						user_src:'https://fish-pool-1319717401.cos.ap-shanghai.myqcloud.com/fish_user/user.jpg',
						user_name:a,
						openid:res.data.openid,
						sessionid:res.data.sessionid
					}
					
					
					//电话 
					//userid
					//opneid
					let str =JSON.stringify(this.user)
					wx.setStorageSync('user',str)		
						
				}).catch(res=>{
				
				})
				
			},
			lotsetuser(){
				try {
				  var value = wx.getStorageSync('user');
				  if (value) {
				  
				  this.user=JSON.parse(value)
				  }
				} catch (e) {
				  // 处理错误
				
				}
			}
			
			
		},
		
		onShow(){
		this.lotsetuser()
		
		},
		mounted(){
		//用户缓存
		this.lotsetuser()
		},

		
	}
</script>

<style lang="scss" scoped>
.mindex{
	position: absolute;
	width: 750rpx;
	height: 100vh;
	background: black;
	opacity: .5;
	z-index: 10;
}
.erwm{
	position: absolute;
	width: 500rpx;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 30rpx;
	padding: 20rpx;
	height: 500rpx;

		
	background: #cccccc;
	image{
		display: block;
		width: 90%;
		margin: 5% auto;
	}
	
	z-index: 11;
}
	
	.my_top{
		position: fixed;
		top:0;
		width: 750rpx;
		height: 150rpx;
		background: #6495ED;
		position: relative;
		.use{
			
			image{
				position: absolute;
				width: 100rpx;
				height: 100rpx;
				bottom: 5rpx;
				left: 5rpx;
				border-radius: 50%;
			
				display: inline-block;
			}
			text{
				margin-top: 1em;
				display: inline-block;
				margin-left: 120rpx;
				color: #FFFFFF;
				font-size: 1.3em;
				line-height: 100rpx;
				
			}
		}
		.dlu{
			width: 200rpx;
			height: 60%;
			position: absolute;
		
			bottom: 0;
			right: 5%;
			color: #FFFFFF;
			background: #6495ED;
		}
	
		
	}
		.my_ctner{
			width: 750rpx;
			height: 350rpx;
			
			display: flex;
			flex-direction: row;
			justify-content:space-between;
	
			position: relative;
			
			text{
			
				position: absolute;
				top: 5%;
				font-size: 1.2em;
				left: 2%;
			}
			view{
				padding-top: 1em;
				flex:1;
				display: flex;
				justify-content: center;
				align-items: center;
				
			border-bottom: 1rpx solid  #cccccc;;
				button
				{
					
					display: block;
					width: 80%;
					height: 30%;
					color: #FFFFFF;
					
				}
				
			}
		}
		.btnone{
			background: #58BE6A;
		}
		.btntwo{
			background: pink;
		}
		.btnzoro{
			background: #7B8CFE;
		}
		.btnthree{
		
			background: #7f8fa6;
		}
		.btnfive{
			background: #0097e6;
		}
	
		button{
			font-size: 1.1em;
			
		}
		
</style>
