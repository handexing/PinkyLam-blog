/**
 * 首页管理
 */
function indexConfig(data,user){
	
	var self=this;
	var userId;

	this.init=function(){
		
		//获取父窗口用户标识ID
		userId = window.parent.document.getElementById('userId').value;
		
		$.post(data.host.url+"index/getMySelfInfo/"+userId,{},function(data){
			if(data.success){
				var result = data.data;
//				alert(JSON.stringify(result));
				$("#articleCnt").text(result.articleCnt);
				$("#articleDesc").text("已经写了"+result.articleCnt+"篇文章了，继续努力！");
				$("#attachCnt").text(result.attachCnt);
				$("#attachDesc").text("已经上传了"+result.attachCnt+"个附件！");
				$("#writingTime").text(Math.ceil(result.writingTime/60));
				$("#writingTimeDesc").text("写作时间大概已经花费"+Math.ceil(result.writingTime/60)+"分钟！");
				$("#commentCnt").text(result.commentCnt);
				$("commentDesc").text("文章累计评论共"+result.commentCnt+"次！");
			} 
		});
		
		$.post(data.host.url+"article/getLatelyArticleList/"+userId,{},function(data){
			if(data.success){
				var result = data.data;
				if(result.length!=0){
//					alert(JSON.stringify(result));
					var html = "";
					$.each(result, function(index, itemobj) {
						var id = result[index].id;
						var title = result[index].title;
						var subtitle = result[index].subtitle;
						
						html += "<div class=\"mdui-card mdui-col-xs-3\">";
							html += "<div class=\"mdui-card-media\">";
							    html += "<img src=\"../resource/img/head.gif\"/>";
							    html += "<div class=\"mdui-card-menu\">";
							      	html += "<button class=\"mdui-btn mdui-btn-icon mdui-text-color-white\"><i class=\"mdui-icon material-icons\">&#xe80d;</i></button>";
							    html += "</div>";
							  	html += "<div class=\"mdui-card-media-covered\">";
							      	html += "<div class=\"mdui-card-primary\">";
							        	html += "<div class=\"mdui-card-primary-title\" style=\"font-size:18px;\">"+title+"</div>";
							      	html += "</div>";
							    html += "</div>";
							html += "</div>";
							html += "<div class=\"mdui-card-content\">"+subtitle+"</div>";
						html += "</div>";
										
					});
					$("#tab1-content").html(html);
				}else{
					$("#tab1-content").html("<p style=\"font-weight: 400;font-size: 25px;margin-left: 40%;margin-top: 200px;\">近期还没有写一篇文章...</p>");
				}
			} 
		});

	}
	
	self.init();
	
}
