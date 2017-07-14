/**
 * 文章管理
 */
function articlePageConfig(data){
	
	var self=this;
	var m_Editor;
	var user;
	var articleTable;

	this.init=function(){
		var redis = require("redis");
    	client = redis.createClient(data.redis.port, data.redis.server);

		client.on("error", function(err){
		    console.log("Error: " + err);
		});
		
		client.get("user", function(err, reply) {
		    user = JSON.parse(reply);
		    self.articleList();
		});
		
		$('#addArticle').bind('click',function(){
			layer.open({
				title :'添加文章',
				maxmin:false,
				type: 2,
				area: ['100%', '100%'],
				fixed: false, //不固定
				content: 'addArticle.html'
			});
		});
	
	}
	
	//文章列表
	this.articleList=function(){
		$.post(data.host.url+"article/articleList",{"id":user.id,"page":0},function(data){
			
			var result = data.data;
			var htmlContent="";
			
			$.each(result, function(index, itemobj) {
				var title=result[index].title;
				var createTime=result[index].createTime;
				var hits=result[index].hits;
				var status=result[index].status;
				
				 var $tr = $("<tr>"+  
					 "<td></td>"+  
	                "<td>"+title+"</td>"+  
	                "<td>"+createTime+"</td>"+  
	                "<td>"+hits+"</td>"+  
	                "<td>"+status+"</td>"+  
	                "<td><a href='deleteEmp?id="+name+"'>删除</a></td>"  
	                +"</tr>"); 
                
//				htmlContent+="<tr><td>"+title+"</td><td>"+createTime+"</td><td>"+hits+"</td><td>"+status+"</td><td>"+刪除+"</td></tr>";
				$("#articleDatas").append($tr);
			});
		});
	}
	
	self.init();
	
}


