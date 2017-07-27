/**
 * 文件管理
 */
function fileConfig(data){
	
	var self=this;
	var userId;
	
	this.init=function(){
		
		//获取父窗口用户标识ID
		userId = window.parent.document.getElementById('userId').value;
		
		var redis = require("redis");
    	client = redis.createClient(data.redis.port, data.redis.server);

    	self.attachList(0,true);
	}
	
		//文章列表
	this.attachList=function(pageNum,flag){
		
		var host = data.host.url;
		
		$.post(data.host.url+"file/attachList",{"userId":userId,"page":pageNum},function(data){
			
			var result = data.data;
			var htmlContent="";
			
			$.each(result, function(index, itemobj) {
				var id=result[index].id;  
				var name=result[index].name;
				var type=result[index].type;
				var url=result[index].url;
				
				var imgPath = host+url;

				htmlContent +="<div class=\"mdui-col mdui-m-t-2 mdui-hoverable\"  style=\"border-radius:5px;\">";
				if(type == "image"){
					htmlContent +="<img src='"+imgPath+"' height=\"125\" style=\"width: 100%;\"/>";
				}else{
					htmlContent +="<img src=\"../resource/img/attach.png\" height=\"125\" style=\"width: 100%;\"/>";
				}
				htmlContent +="<div class=\"mdui-row mdui-m-t-1 mdui-p-b-1\">";
				htmlContent +="<span class=\"mdui-col-xs-6 mdui-text-center mdui-color-red\" onclick='m_file.copyLink("+imgPath+")' style=\"height: 20px;width: 40%;line-height: 20px;border-radius:25px;margin-left: 20px;\">链接</span>";
				htmlContent +="<span class=\"mdui-col-xs-6 mdui-text-center mdui-color-blue\" style=\"height: 20px;width: 40%;line-height: 20px;border-radius:25px;\">删除</span>";
				htmlContent +="</div></div>";
				
			});
			
			$("#attachList").html(htmlContent);
			
			if(flag){
				self.pageable(data.totalPageNumber);
			}
			 
		});
		
	}
	
	//分页
	this.pageable=function(totalPageNumber){
		layui.use(['laypage', 'layer'], function(){
  			var laypage = layui.laypage;
  			layer = layui.layer;
  			
		  	laypage({
		    	cont: 'm_page'
		    	,pages: totalPageNumber //得到总页数
		    	,jump: function(obj){
		    		self.attachList(obj.curr-1,false);
		    	}
		  	});
  
		});
	}
	
	//复制链接
	this.copyLink=function(url){
		alert(url);
	}
	
	self.init();
	
}
