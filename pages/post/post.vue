<template>
	<view v-show="isFx">
		<Cartxx :index='useindex' v-if="isuse" :use="true" ></Cartxx>
		
	</view>
</template>

<script>
	import Cartxx from "@/components/Cartxx.vue"
	export default {
		data() {
			return {
				useindex:"",
				isuse:false,
				use:false,
				isFx:false
			}
		},
		methods: {
			
		},
		components:{
			Cartxx 
		},
		onLoad(e)
		{
			
			this.use=e.use
			this.useindex=e.id
			this.isuse=true
			this.isFx=true//开启
		}
	}
</script>

<style>

</style>
