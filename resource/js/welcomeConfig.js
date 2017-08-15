/**
 * 欢迎界面管理
 */
function welcomeConfig(data){
	
	var self=this;
	var userId;
	
	var colors = new Array("pink","red","orange","blue","brown","purple","teal","green","cyan","amber","deep-orange","lime")

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

		

		$.post(data.host.url+"remind/getMemoRemindList/"+userId,{},function(data){
			if(data.success){
				var result = data.data;
				if(result.length!=0){
					
					var html = "";
					$.each(result, function(index, itemobj) {
						var id = result[index].id;
						var describe = result[index].describe;
						var remindTime = result[index].remindTime;
						var color = random(0,10);
						
						html += "<label class=\"mdui-list-item mdui-ripple m_remind\" data="+id+">";
				    		html += "<div class=\"mdui-list-item-avatar mdui-color-"+colors[color]+"\">"+(index+1)+"</div>";
				    		html += "<div class=\"mdui-list-item-content\">"+describe+"</div>";
				    		html += "<div class=\"mdui-checkbox\">";
				      			html += "<input id="+id+" type=\"checkbox\"/>";
				      			html += "<i class=\"mdui-checkbox-icon\"></i>";
				    		html += "</div>";
				  		html += "</label>";
										
					});
					$("#memoRemind").html(html);
				}else{
					$("#memoRemind").html("<p style=\"font-weight: 400;font-size: 25px;margin-left: 40%;margin-top: 200px;\">未有提醒事项...</p>");
				}
			} 
		});
		
		$('.m_remind').bind('click',function(){
			var id = $(this).attr("data"); 
//			alert(id);
//			if ($("#"+id).attr("checked") == "checked") {
//				alert(id); 
//			}
		});
		
	}
	
	self.init();
	
}


//获取范围内的随机数
 function random(min,max){
    return Math.floor(min+Math.random()*(max-min));
}