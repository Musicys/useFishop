<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			 
		}
	}
</script>

<style>
	/*每个页面公共css */
	::-webkit-scrollbar
	{
		display: none;
		
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	html{
		font-size: 32rpx;
	}

</style>
