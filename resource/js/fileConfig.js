/**
 * 文件管理
 */
function fileConfig(data){
	
	var self=this;
	var userId;
	
	this.init=function(){
		
		//获取父窗口用户标识ID
		userId = window.parent.document.getElementById('userId').value;
		
    	self.attachList(0,true);
	}
	
		//文章列表
	this.attachList=function(pageNum,flag){
		
		var host = data.host.url;
		
		$.post(host+"file/attachList",{"userId":userId,"page":pageNum},function(data){
			
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
				htmlContent +="<span class=\"mdui-col-xs-6 mdui-text-center mdui-color-red copyBtn\" onclick=\"m_file.copyLink('"+imgPath+"')\" style=\"height: 20px;width: 40%;line-height: 20px;border-radius:25px;margin-left: 20px;cursor: pointer;\">链接</span>";
				htmlContent +="<span class=\"mdui-col-xs-6 mdui-text-center mdui-color-blue\" onclick=\"m_file.deleteFile('"+id+"')\" style=\"height: 20px;width: 40%;line-height: 20px;border-radius:25px;cursor: pointer;\">删除</span>";
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

		var clipboard = new Clipboard('span.copyBtn', {
	        text: function (trigger) {
	            return url;
	        }
	    });
	    
	    clipboard.on('success', function (e) {
	    	mdui.snackbar({
		  		message: '已复制到剪贴板！'
			});
	        e.clearSelection();
	    });
    
	}
	
	//删除文件
	this.deleteFile=function(id){
		layer.confirm('确定删除吗？', {
	  		btn: ['确认','取消'] 
			}, function(){
				$.post(data.host.url+"file/deleteFile/"+id,{},function(data){
					if(data.success){
						layer.msg('删除成功！', {icon: 1});
						self.attachList(0,true);
					}else{
						layer.msg('删除失败！', {icon: 5});
					}
				});
			}, function(){
	  			
		});
	}
	
	self.init();
	
}
