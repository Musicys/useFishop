<template>
	

		<view >
			
			<swiper :indicator-dots="false" :duration="300"  class="nr" :current='usetab' @change="setTabid" >
				<swiper-item>
					<!-- 首页 -->
					<view class="index" >
						<view class="index_top">
							<image src="https://fish-pool-1319717401.cos.ap-shanghai.myqcloud.com/fish_user/fish_user.jpg" mode="scaleToFill"></image>
							<view class="top_bt">
								<text>冠军垂钓俱乐部</text>
								<text></text>
							</view>
						</view>
						
						<view class="index_but">
							<scroll-view scroll-y="true"  class="scrollview" :scroll-with-animation="true" :scroll-into-view="'to'+usey">
								<view class="top" id="to1">
									
									<view class="up_top">
											<!-- 按钮一 -->
										<view class="buttonone" @click="goshop">
										
											<text>我的计时</text>
										<text>点击查看</text></view>
										
										<view class="up_top_right">
											<!-- 按钮二 -->
										<view class="buttontwo">预约正钓
										
											<text>（暂未开发）</text>
										</view>
											<!-- 按钮三-->
											<!-- <view class="buttonthree" @click="gowallet" :class="isvip?'ys':'ys1'"><text>会员系统</text> <text>{{isvip?'(已开通)':'（未开通）'}}</text></view> -->
											<view class="buttonthree ys">订餐系统
											
											<text>（暂未开放）</text>
											</view>
										</view>
									</view>
									<view class="up_but">
											<!-- 按钮四-->
										
												<!-- 按钮无 -->
											<view class="buttonfive">渔获分享（暂未开放）</view>
									</view>
									
								
									
								</view>
								
								<view class="but"  id="to2">
									<text class="bt">
										塘口信息
									</text>
										
									
										
											<Cart v-for="(i,k) of fishinfo" :key="i.id" :data='i'>
												
											</Cart>
						
										
							
								</view>
							</scroll-view>
						</view>
						
						</view>
				</swiper-item>
				
				
				<swiper-item>
					<view class="js" >
						<view class="js_top" >
							<text>我的计时</text>
							<view class="jt" @click="sytab">
								
							</view>
						</view>
						<template v-if="isfishnuber" >
							<view class="tsxx" v-if="isfishend">
								<image src="../../static/clicok.png" mode=""></image>
								还有半个小时，请及时回鱼离场
								
							</view>
							<view class="js_cnter"  >
							
							
								<view class="zt">
									当前鱼塘：<text>{{usefishnmber.name}}</text>
								</view>
								<view class="xh">
									当前序号<text>{{usefishnmber.pick_code}}号</text>
								</view>
							</view>
							
							<view class="user"  v-if="isusetop">
								
						
						
								</view>
								<view class="useindex .fade-to" v-if="isusetop">
									
									<scroll-view scroll-y="true"  class="scrolltwo " :scroll-with-animation="true"  >
										<view class="bt">
											全部套餐
										</view>
									<view class="use" v-for="(i,k) in usesetopdata" :key="k" :class="i.usezt=='已结束'?' opacity':''" @click="setuseindex(k,i.usezt)">
										     <text>{{i.name}}</text>  <text>结束时间：{{i.endtime}}</text>  <text>{{i.usezt}}</text> <image src="../../static/right.png" mode=""></image>
									</view>
								
									</scroll-view>
									<button @click="setisusetop()">取消</button>
									</view>
							
							<view class="js_clock"  >
								<view class="js_yuan">
									<view class="js_cd">
										
									</view>
									<view class="js_zd">
										<view>剩余时间</view>
									
										<view>{{usefishnmber.end_tiem}}</view>
										<view>总时长{{usefishnmber.satart_time}}小时</view>
									</view>
								</view>
							</view>
							<view class="btnfor"  >
								<button @click="setisusetop()">展示套餐（{{usefishnmber.nber}})</button>
								<button @click="addfishonetiem()">续费加时</button>
								<button @click="fishroot()">刷新计时</button>
								<button class="end" @click="endprice">{{tuik?'退款中':"结束退押金"}}</button>
							</view>
						</template>
						
						<template v-else> 
						<iszore url="../static/getfish.png"  title="暂无计时(点击切换订单)" @click.native='setisusetop()'></iszore>
						<view class="user"  v-if="isusetop">
							
												
												
							</view>
							<view class="useindex .fade-to" v-if="isusetop">
								
								<scroll-view scroll-y="true"  class="scrolltwo " :scroll-with-animation="true"  >
									<view class="bt">
										全部套餐
									</view>
								<view class="use" v-for="(i,k) in usesetopdata" :key="k" :class="i.usezt=='已结束'?' opacity':''" @click="setuseindex(k,i.usezt)">
									     <text>{{i.name}}</text>  <text>结束时间：{{i.endtime}}</text>  <text>{{i.usezt}}</text> <image src="../../static/right.png" mode=""></image>
								</view>
							
								</scroll-view>
								<button @click="setisusetop()">取消</button>
								</view>
						</template>
					</view>
					
				
				
				</swiper-item>
			</swiper>
			
	

		</view>
	<!-- 计时 -->

		
		
	
	
	

</template>

<script>
	import Cart from "@/components/Cart.vue"//卡片
	
	import iszore from "@/components/iszore.vue"
	
	import $go from "@/common/api/request.js"

export default {
		data() {
			return {
			
				usey:1,	// 控制滚动到购买页面
				usetab:0,//是否使用导航
				fishinfo:[],//鱼塘数据
				usefish:{},//使用的钓鱼对象
				usefishnmber:{//钓鱼数据
				end_tiem:1,
				satart_time:0,
				pick_code:'',
				syssn:'',//订单编号
				name:'',
				nber:0
				},//钓鱼时长和钓鱼总时间
				isfishnuber:false,//判断显示d钓鱼页面
				isfishend:false ,//小于30分钟的提示信息
				isshopfish:true,//能不能购买
				isvip:false,
				shopfish:'800202',//微信支付
				tuik:false,
				
				zdone:{  //20--30
					is:true,//是否可以震动
					nber:0	//秒
				} ,//秒,
				zdtwo:{ //10--20
					is:true,//是否可以震动
					nber:0  //秒
				}, //秒
				zdthreww:{//0--5
					is:true,//是否可以震动
					nber:0  //秒
				},
				zt:{
					is:true,//是否可以震动
					nber:0 
				},
				useindex:0,
				isusetop:false,
				usesetopdata:[
					
				]//展示套餐的数据
				
			}
		},
		components:{
			Cart,
			iszore
		},
		methods: {
			setisusetop(){
				if(this.usefishnmber.length===0)
				{
					return 	uni.showToast({	title: '无订单',icon:"none",	duration: 1500})
				}
			this.isusetop=!this.isusetop
			console.log(this.usefish);
			if(this.isusetop)
			{
				
			for(let i in this.usefish)
				{
					
					let a=''
					if(this.useindex==i)
					{
						a='展示中'
					}
					else
					{
						if(this.usefish[i].end_time*1000-Date.now()>0)
						{
							
							a="可切换"
						}
						else
						{
							a='已结束'
						}
					}
					
					
				
					this.usesetopdata.push({
						name:`${JSON.parse(this.usefish[this.useindex].detail).pool_name}${this.usefish[i].pick_code}号`,
						endtime:this.gittiem( this.usefish[i].end_time*1000),
						usezt:a
					})
					
				}
			
				
			}
			else
			{
				this.usesetopdata=[]
			}
			},
			setuseindex(k,use)
			{
				
				console.log(use);
				if(use!=='已结束')
				{
					this.useindex=k
					clearInterval(getApp().times)
					this.fishroot()
					this.setisusetop()
						uni.showToast({	title: '已切换',icon:"none",	duration: 1500})
					
				}
				else
				{
					uni.showToast({	title: '已结束,无法切换',icon:"none",	duration: 1500})
				}
			
			
				
			},
			endprice(){
			
			
				return uni.showToast({	title: '请联系后台退款',icon:"none",	duration: 1500})
			
					if(this.tuik){return }
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
				   		syssn:this.usefishnmber.syssn,
				   		refund_amt:'1',
				   		refund_detail:'测试'
				   	}
				   }).then(
				   res=>{
				   	
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
				   				
				   				uni.showToast({	title: '已退款',icon:"none",	duration: 1500})
				   				clearInterval(time)
				   				this.fishroot()
				   				that.tuik=false
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
						uni.showToast({	title: '已退款',icon:"none",	duration: 1500})
						this.fishroot()
					
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
			isvipbd(){
				$go.request({
					url:'https://bjcore01.vanshin.fun/fish/user/info',
					header:{
						sessionid:JSON.parse(wx.getStorageSync('user')).sessionid
					},
				}).then(res=>{
					this.isvip=res.data.is_vip
				})
			}
			,
			gowallet()//跳转会员界面
			{
				wx.navigateTo({
					url:"../wallet/wallet"
				})
			},
			addfishonetiem(){
				wx.showActionSheet({
				  itemList: ['微信支付', '会员钱包支付'],
				  success:res=> {
				    if(res.tapIndex===1)
					{
						this.shopfish='700004'
						
						
						this.addfishtiem()
					}
					else
					{
						this.shopfish='800202'
					
						this.addfishtiem()
						
					}
				  },
				  fail (res) {
				 
				  }
				})
			},
			addfishtiem(){//钓鱼增加时间的逻辑
			
			
		
			
				$go.request({
					
					url:'https://bjcore01.vanshin.fun/fish/menu/list?menu_type=2',
					header:{
						sessionid:JSON.parse(wx.getStorageSync('user')).sessionid
					}
					
				}).then(res=>{
				
				
				let that=this
				
				
				
					
					let a=res.data.list
					let arr=[]
					for(let i=0;i<a.length;i++)
					{
					arr.push(`${a[i].duration_desc}(${a[i].price_desc})`)	
					}

					let sysssn=this.usefishnmber.syssn
					arr=arr.filter((i,index)=>{
						return index<6
					})
					wx.showActionSheet({
					  itemList: arr,
					  success:res=> {
						
					
					
						
						$go.request({
							url:'https://bjcore01.vanshin.fun/fish/trade/append',
							header:{
								sessionid:JSON.parse(wx.getStorageSync('user')).sessionid
							},
							method:'POST',
							data:{
								item_id:a[res.tapIndex].id,
								menu:JSON.stringify(a[res.tapIndex]),
								syssn:sysssn,
								busicd:that.shopfish,//700004 储值续费 800202 微信续费
								openid:JSON.parse(wx.getStorageSync('user')).openid
							}
						}).then(res=>{
							
							let a=res.data.syssn
							if(that.shopfish=='700004')
							{
							
								if(res.respcd=='0000')
								{
									uni.showToast({		title: '支付成功',icon:"none",	duration: 1500})
									
									$go.request({
										url:'https://bjcore01.vanshin.fun/fish/trade/query',
										method:'POST',
										header: {
										
										sessionid:JSON.parse(wx.getStorageSync('user')).sessionid,
										
										},
										
										data:{
											syssn:a
										}
									}).then(
									res=>{
										
										that.fishroot()
									
										
									})  
												
									
									
								}
								else
								{
										uni.showToast({		title: '账号余额不足',icon:"none",	duration: 1500})
								}
								
							}
							else
							{
								wx.requestPayment({
								  timeStamp: res.data.timestamp,
								  nonceStr:res.data.nonce_str ,
								  package: `prepay_id=${res.data.prepay_id}`,
								  signType:res.data.sign_type,
								  paySign:res.data.pay_sign,				  
								  success: res=> {
									
									  if(res.errMsg=='requestPayment:ok')
									  {
									$go.request({
										url:'https://bjcore01.vanshin.fun/fish/trade/query',
										method:'POST',
										header: {
										
										sessionid:JSON.parse(wx.getStorageSync('user')).sessionid,
										
										},
										
										data:{
											syssn:a
										}
									}).then(
									res=>{
										
										that.fishroot()
									
										
									})  
										
									  }
								  },
								  fail (res) { 
								
									   
									   
									uni.showToast({		title: '支付失败',icon:"none",	duration: 1500})
									 
								  }
								})
							}
							
							
						})
						
					  },
					  fail (res) {
					   
					  }
					})
				})
				
				
			},
			setTabid(e)//滚动时useta发送变化
			{
				this.usetab=e.target.current
			},
			sytab()//切换到首页的箭头的方法
			{
				this.usetab=0
			
			
			},
			goshop(){
				this.usetab=1
			},
			getCode()
			{
				let code
				wx.login({
				provider: 'weixin',
				success:res=>{
					code =res.code
					
						        }
								});
								
				
			},
			
			// 钓鱼方法
		
			
			
			getfishinfo(menu_type=1){
				
				$go.request({		
					url:'https://bjcore01.vanshin.fun/fish/menu/list?menu_type=1',
					
				}).then(res=>{
					
					console.log('数据',res.data.list);
					this.fishinfo=res.data.list
				
				})
			},
			
			settime(){
				
				
				//判断为最新数据
				this.usefishnmber.nber=this.usefish.length
				for(let i=0;i<this.usefish.length;i++)
				{
					
				
					if(this.usefish[this.useindex].end_time*1000>Date.now())
					{
					this.usetab=1
					this.usefishnmber.syssn=this.usefish[this.useindex].syssn //赋值ssyn
					this.usefishnmber.pick_code=this.usefish[this.useindex].pick_code//赋值id
					let a=this.usefish[0].end_time-this.usefish[this.useindex].start_time//剩余时间戳
					this.usefishnmber.satart_time=this.gittiem(a*1000-3600000*8,false)
					this.usefishnmber.end_tiem=this.gittiem(this.usefish[this.useindex].end_time-Date.now()-3600000*8)
					this.usefishnmber.name=JSON.parse(this.usefish[this.useindex].detail).pool_name
					
					getApp().isshopfish=false
					
					return 
					}else{
				
					this.isfishnuber=false
				}
					
				}
				
				
				
				
				// }//钓鱼时长和钓鱼总时间
			
				
			
				
			
				
				
				
				
			
				
			},	
			gittiem(data,boler=true)
			{
				
				
				// 创建一个新的 Date 对象，并设置为当前时间
				let currentDate = new Date(data);		
				// 获取当前的小时和分钟数
				let currentHour = currentDate.getHours();
				let currentMinute = currentDate.getMinutes();
				if(boler)
				{
					currentHour=currentHour>	9?currentHour:'0'+currentHour
					currentMinute=currentMinute>9?currentMinute:'0'+currentMinute
					return `${currentHour}:${currentMinute}`
				}
				else
				{
					return `${currentHour}`
				}
				
			
				
				
			},
			fishtiemset(){//钓鱼计时器
				
		
				if(this.usefish.length==0)
				{
					return uni.showToast({		title: '暂无订单',icon:"none",	duration: 1500})
				}
				
				getApp().times=setInterval(()=>{
					
						if(this.usefish.length===0)
						{
							return clearInterval(getApp().times)
						}
					if(this.usefish[this.useindex].end_time*1000-Date.now()>0){
				
					let as=this.usefish[this.useindex].end_time*1000-Date.now()-3600000*8
						this.usefishnmber.end_tiem=this.gittiem(as)
							this.isfishnuber=true
						
							
						
						
						// zdone:{  //20--30
						// 	is:true,//是否可以震动
						// 	nber:3	//秒
						// } ,//秒,
						// zdtwo:{ //10--20
						// 	is:false,//是否可以震动
						// 	nber:3  //秒
						// }, //秒
						// zdthreww:{//0--5
						// 	is:false,//是否可以震动
						// 	nber:3  //秒
						// }
						if(as<1000*60*30-3600000*8)
						{
							this.isfishend=true
							
							console.log('震动123');
						
							let bs=as+3600000*8
							if(this.zdone.is)
							{
								
								
								this.zdone.nber=this.zdone.nber+1
								wx.vibrateLong()
								if(this.zdone.nber===4)
								{
									this.zdone.is=false
									uni.showToast({	title: '时间余额已不足',icon:'none',duration: 2000})
								}
								
							}
							if(this.zdtwo.is)
							{
								
								if(bs<1000*60*20)
								{
									this.zdtwo.nber=this.zdtwo.nber+1
									
									wx.vibrateLong()
									if(this.zdtwo.nber===4)
									{
										this.zdtwo.is=false
										uni.showToast({	title: '时间余额已不足',icon:'none',duration: 2000})
									}
								}
								
							}
							
							if(this.zdthreww.is)
							{
								if(bs<1000*60*5)
								{
									console.log(bs);
									
									this.zdthreww.nber=this.zdthreww.nber+1
									wx.vibrateLong()
									if(this.zdthreww.nber===4)
									{
										this.zdthreww.is=false
											wx.showModal({
											  title: '提示',
											  content: '请在时长结束内15分钟返回后台退款回鱼，否则押金扣除',
											  success(res) {
											    if (res.confirm) {
											      console.log('用户点击确定');
											      // 执行您的操作
											    }
											  }
											})
									}
								}
							}
							
							
							
							
						
						}
						else
						{
							this.zdone=this.zt
							this.zdtwo=this.zt
							this.zdthreww=this.zt
						}
						
					}else{
						
						
						
						this.isfishnuber=false
							if (Object.keys(this.usefishnmber).length !== 0)
							{
									uni.showToast({	title: '暂无计时',icon:'none',duration: 1000})
							}
							else{
								uni.showToast({	title: '暂无计时',icon:'none',duration: 1000})
							}
						
						clearInterval(getApp().times)
					}
						
				},1000)
				
			},
			satefish(){
				
				if(this.usefish[this.useindex])
				{
					if(this.usefish[this.useindex].end_time*1000-Date.now()>0) {
					
					
						
						this.settime()//赋值 
						this.fishtiemset()//开启计时
					} else {
						
						
						this.isfishnuber=false
					}
				}
				else
				{
					return 
					
				}
			
				
				
				
			},
			fishroot(){
			
				if(wx.getStorageSync('user'))
				{
					$go.request({
						url:'https://bjcore01.vanshin.fun/fish/user/pledge_list',
						header:{
							sessionid:JSON.parse(wx.getStorageSync('user')).sessionid
						}
					}).then(res=>{
					
						
						this.usefish=res.data
						
						if(this.usefish.length===0)
						{
							this.isfishnuber=false
							return 	
						}
						this.satefish()
							
					})
				}
			}
			
		
		},
		onLaunch(e){
	
			if(e)
			{
					getApp().usetab =this.usetab //读取赋值
				
			}
			
			
			
		},
		mounted(){
		getApp().isshopfish=true //初始化可购买
		this.fishroot()//获取首页数据
		this.isvipbd()//判断是否是会员
	
		},
		onShow(){
			
			
		if(getApp().fishusers)
		{
			this.fishroot()
			getApp().fishusers=false
			
		}
	
		if(getApp().addfishtiem)
		{
			this.addfishtiem()//跳转自动续费
			getApp().addfishtiem=false
		
		}
		
		
		if(this.usefish[this.useindex])
		{
			if(this.usefish[this.useindex].end_time*1000-Date.now()>0){
				this.usetab=1
			}
			else{
				getApp().isshopfish
			}
			
		}
		
			
			
			
			if(getApp().usetabflish)				//钓鱼计时的判断
			{
				
				this.usetab=1
				getApp().usetabflish=false
				this.fishroot()
				
			}
				
		
			
			
			if(getApp().usetab===1)
			{
				this.usetab= getApp().usetab
				this.fishroot()
				getApp().usetab=0
			}
			
		
		
			
		},
		beforeMount(){
			this.getfishinfo()//数据初始化
			// setInterval(()=>{
			// 		wx.vibrateLong()
			// },1000)
		},
		
		}
	
</script>
<style lang="scss" >
	.index{
		
		width: 750rpx;
		height: 100vh;
		
		position: relative;
	}
	
	/* /index_top */
	
	.index_top{
			height: 40%;
			width: 750rpx;
			background:#FFFFFF;
			position: relative;
			image{
					width: 100%;
					height: 110%;
					position: absolute;
					top: -150rpx;
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
						position: relative;
					
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
							text{
								font-size: .8em;
							}
							
						}
						.buttonthree
						{
							border-top: 10rpx;
							flex: 1;
							
						
							margin-top: 2rpx;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							
							text{
								font-size: .8em;
							}
							font-weight: bold;
							
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
						width:100%;
						
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
				background: #F7F7F7;
			
				.bt{
					display: block;
					margin-left: 8%;	
					color: #1B232E;
					padding-top: 2%;
					font-weight: bold;
					height: 8%;
				}
				.fishCart{
					height: 90%;
					width: 750rpx;
					
				}
			}
		}
	}
	
	
.nr{
	height: 100vh;
	width: 750rpx;
	
	.swiper-item{
		height: 100%;
		width: 750rpx;
	}
}
.js{
	
	.js_top{
		background:#6495ED;
		width: 750rpx;
		height: 150rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		text{
			font-size: 1em;
			display: block;
			margin-top: 1em;
			color: #FFFFFF;
		}
		.jt{
			left: 1em;
			position: absolute;
			top:2.5em;
			width: 20rpx;
			height: 20rpx;
			border-top:4rpx solid #FFFFFF ;
			border-left:4rpx solid #FFFFFF ;
			transform: rotate(-45deg);
		}
	
	}
	.tsxx{
		font-size: .9em;
		height: 80rpx;
		width: 750rpx;
		background: #FEEEDF;
		color: #FA9131;
	
		display:flex ;
		justify-content:start;
		align-items: center;
		image{
			display: block;
			margin-right: 1em;
			margin-left:1em ;
			height: 50rpx;
			width: 50rpx;
		}
	}
	.js_cnter{
		width:580rpx;
		height: 200rpx;
		border-radius: 25rpx;
		background:#6495ED;
		margin:2em auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		view{
			margin-left: 1em;
			flex:1;
			display: flex;
			justify-content:start;
			align-items: center;
			color: #D5DEFB;
			font-size: 1.2em;
			text{
				display: inline-block;
				
				font-weight: bold;
				color: #FFFFFF;
				margin: auto;
			}
		}
		
	}
	.user{
	width: 100vw;
	height: 100vh;
	position: absolute;
	top:150rpx;
	background: black;
	opacity: .5;
	z-index: 5;
		
	
	}
	.useindex{
	
		width: 750rpx;
		height: 40%;
		background:#E7EBFB;
		border-radius: 15rpx 15rpx 0 0;
		z-index: 6;
			bottom: 0;
			color: #6495ED;
			position: absolute;
	
			overflow: hidden;
	
		.scrolltwo{
			padding-top: 10rpx;
			width: 100%;
			height: 80%;
			.bt{
				width: 100%;
				height: 60rpx;
				font-size: 1em;
				text-align: center;
			
			}
			.use{
					color: #FFFFFF;
				font-size: 1em;
				border-bottom: 1rpx solid #CCCccc;
				width: 750rpx;
				
				background: #6495ED;;
				height: 80rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				image{
					width: 50rpx;
					height: 80%;
				}
			}
			
		}
		button{
			background:#E7EBFB; 
				color: #6495ED;
		}
	
	}
	.js_clock{
		width: 620rpx;
		height: 400rpx;
	
		margin: 50rpx auto;
		overflow: hidden;
		position: relative;
		
		.js_yuan
		{
			left: 50%;
			transform: translateX(-50%);
			position: absolute;
			width: 400rpx;
			border-radius: 50%;
			height: 400rpx;
			bottom: -2em;
			overflow: hidden;
			
			background:  linear-gradient(180deg,#6495ED,#E7EBFB);
			display: flex;
			justify-content: center;
			align-items: center;
				
			.js_cd{
				
				
				width: 100rpx;
				height: 450rpx;
				bottom: 50%;
				overflow: hidden;
				border-radius: 30rpx;
				
				animation: rotate 3s linear infinite;
				background:  linear-gradient(180deg ,#ECF0FB,#BBC3FE);
				position: absolute;
				z-index:1;
				transform-origin: bottom;
			}
			.js_zd{
				left: 50%;
				z-index: 3;
				transform: translateX(-50%);
				position: absolute;
				width: 85%;
				border-radius: 50%;
				height: 85%;
				overflow: hidden;
				background:  #FFFFFF;
				display: flex;
				justify-content: center;
				align-content: flex-start;
				flex-wrap:wrap;
				view{
					
					width: 80%;
					
					height: 50rpx;
					text-align: center;
					margin-top: .2em;
				}
				&>view:nth-child(1)
				{
						margin-top: 1.4em;
						font-size: 1.2em;
						
				}
				&>view:nth-child(2)
				{
					
					color: #6495ED;
					font-weight: bold;
					font-size: 2em;
				}
			&>view:nth-child(3)
			{
				
				margin-top: 1.9em;
				font-size: .8em;
			}
			}
		}
	}

.btnfor{
	width: 700rpx;
	margin:50rpx auto;
	height: 250rpx;
	
	display: flex;
	flex-wrap: wrap;
	
	button{
		width: 40%;
		height: 40%;
		border: .1rpx solid #F3F2FA;
		background: none;
		color: #484848;
		font-size: 1.1em;
		
		
	}
	.end
	{
		background:#FE5A37;
		color: #FFFFFF;
	}
}
}
.ys{
	background: #FE5A37;
	color: #FFFFFF;
}
.ys1{
	background: #F2EBEB;
	color:#A3AAB5;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
	
  }
  to {
    transform: rotate(360deg);
  }
}

.opacity{
	opacity: .6;
}

.fade-to {
	 animation: fade-to 0.5s;
}

@keyframes fade-to {
  from {
    height: 0;
  }
  to {
   height: 40%;
  }
}


</style>