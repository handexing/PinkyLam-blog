/**
 * 文章管理
 */
function articlePageConfig(data){
	
	var self=this;
	var m_Editor;
	var articleTable;
	var userId;

	this.init=function(){
		
		//获取父窗口用户标识ID
		userId = window.parent.document.getElementById('userId').value;

		self.articleList(0,true);
		    
		$('#addArticle').bind('click',function(){
			layer.open({
				title :'添加文章',
				maxmin:false,
				type: 2,
				area: ['100%', '100%'],
				fixed: false, //不固定
				content: 'addArticle.html?userId='+userId,
				end: function(){
					self.articleList(0,true);
				}
			});
		});
		
		$('#searchBtn').bind('click',function(){
			self.articleList(0,true);
		});
	
	}
	
	//文章列表
	this.articleList=function(pageNum,flag){
		
		var title = $.trim($("#title").val());
		
		$.post(data.host.url+"article/articleList",{"id":userId,"title":title,"page":pageNum},function(data){
			
			var result = data.data;
			var htmlContent="";
			
			$("#articleDatas").text("");
			
			$.each(result, function(index, itemobj) {
				var id=result[index].id;
				var title=result[index].title;
				var createTime=result[index].createTime;
				var hits=result[index].hits;
				var status=result[index].status;
				var content=result[index].content;
				
				var $tr = $("<tr>"+  
					"<td class=\"mdui-table-cell-checkbox\"><label class=\"mdui-checkbox\"><input type=\"checkbox\"><i class=\"mdui-checkbox-icon\"></i></label></td>"+ 
	                "<td>"+title+"</td>"+  
	                "<td>"+createTime+"</td>"+
	                "<td>"+hits+"</td>"+
	                "<td>"+status+"</td>"+ 
	                "<td>"+
	                	"<a href=\"#\" onclick=\"m_article.preview('"+title+"','"+id+"')\" mdui-tooltip=\"{content: '预览'}\"><i class=\"mdui-icon material-icons\">&#xe8b6;</i></a>"+
//	                	"<a href=\"#\" mdui-tooltip=\"{content: '发布'}\" class=\"mdui-m-l-1\"><i class=\"mdui-icon material-icons\">&#xe569;</i></a>"+
	                	"<a href=\"#\" onclick=\"m_article.delArticle('"+title+"','"+id+"')\" mdui-tooltip=\"{content: '删除'}\" class=\"mdui-m-l-1\"><i class=\"mdui-icon material-icons\">&#xe872;</i></a>"+
	                	"<a href=\"#\" onclick=\"m_article.updateArticle("+id+")\" mdui-tooltip=\"{content: '修改'}\" class=\"mdui-m-l-1\"><i class=\"mdui-icon material-icons\">&#xe150;</i></a>"+
//	                	"<a href=\"#\" mdui-tooltip=\"{content: '启用'}\" class=\"mdui-m-l-1\"><i class=\"mdui-icon material-icons\">&#xe87d;</i></a>"+
//	                	"<a href=\"#\" mdui-tooltip=\"{content: '禁用'}\" class=\"mdui-m-l-1\"><i class=\"mdui-icon material-icons\">&#xe87e;</i></a>"+
	                "</td>"
	                +"</tr>"); 
                
				$("#articleDatas").append($tr);
			});
			
			mdui.updateTables();//刷新table
			
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
		    		self.articleList(obj.curr-1,false);
		    	}
		  	});
  
		});
	}
	
	//预览
	this.preview=function(title,id){
		layer.open({
			title :title,
			maxmin:false,
			type: 2,
			area: ['100%', '100%'],
			fixed: false, //不固定
			content: 'preview.html?articleId='+id
		});
	}
	
	//删除文章
	this.delArticle=function(title,id){
		layer.confirm('确定删除【'+title+'】这篇文章吗？', {
	  		btn: ['确认','取消'] 
			}, function(){
				$.post(data.host.url+"article/delArticle/"+id,{},function(data){
					if(data.success){
						layer.msg('删除成功！', {icon: 1});
						self.articleList(0,true);
					}else{
						layer.msg('删除失败！', {icon: 5});
					}
				});
			}, function(){
	  			
		});
	}
	
	//修改文章
	this.updateArticle=function(id){
		layer.open({
			title :'修改文章',
			maxmin:false,
			type: 2,
			area: ['100%', '100%'],
			fixed: false, //不固定
			content: 'addArticle.html?articleId='+id,
			end: function(){
				self.articleList(0,true);
			}
		});
	}
	
	self.init();
	
}
