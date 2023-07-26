export default{
baseUrl:"http://192.168.0.105:3000/api",
data:{},method:'GET',header: {'Content-Type': 'application/json'},
dataType:'json',request(obj={}){obj.url=this.baseUrl+obj.url
obj.data=obj.data||{}
obj.method=obj.method||this.method
obj.header=obj.header||this.header
obj.dataType=obj.dataType||this.dataType
return new Promise((res,rej)=>{
wx.request({...obj,success:(result)=>{if(result.statusCode!=200)return 
let data=result.data
res(data)}})})}}
