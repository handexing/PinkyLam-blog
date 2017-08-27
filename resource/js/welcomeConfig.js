/**
 * 欢迎界面管理
 */
function welcomeConfig(data){
	
	var self=this;
	var userId;
	
	var redis = require("redis");
	var schedule = require("node-schedule");
	
	var m_dialog = new mdui.Dialog('#remind_dialog');
	var r_dialog = document.getElementById('remind_dialog');
	
	var colors = new Array("pink","red","orange","blue","brown","purple","teal","green","cyan","amber","deep-orange","lime")

	this.init=function(){
		
		//配置redis
		client = redis.createClient(data.redis.port, data.redis.ip);
		client.on("error", function(err){
		    console.log("Error: " + err);
		});
		
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
				$("#remindCnt").text(result.remindCnt);
				$("#remindDesc").text("备忘录提醒共"+result.remindCnt+"条！");
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
				client.set("memoRemind", JSON.stringify(result));
				if(result.length!=0){
					
					var html = "";
					$.each(result, function(index, itemobj) {
						var id = result[index].id;
						var describe = result[index].describe;
						var remindTime = result[index].remindTime;
						var color = random(0,10);
						
						html += "<label class=\"mdui-list-item mdui-ripple\">";
				    		html += "<div class=\"mdui-list-item-avatar mdui-color-"+colors[color]+"\">"+(index+1)+"</div>";
							html += "<div class=\"mdui-list-item-content\">";
							    html += "<div class=\"mdui-list-item-title\">"+describe+"</div>";
							    html += "<div class=\"mdui-list-item-text mdui-list-item-one-line\"><span class=\"mdui-text-color-black-secondary\">提醒时间：</span>"+remindTime+"</div>";
							html += "</div>";
							html += "<label class=\"mdui-switch\">";
						        html += "<input class=\"m_remind\" data="+id+" type=\"checkbox\"/>";
						        html += "<i class=\"mdui-switch-icon\"></i>";
						    html += "</label>";
			  			html += "</label>";
					});
					$("#memoRemind").html(html);
				}else{
					$("#memoRemind").html("<p style=\"font-weight: 400;font-size: 25px;margin-left: 40%;margin-top: 200px;\">未有提醒事项...</p>");
				}
			} 
		});
		
		$("body").on("click",".m_remind",function(){
			var id = $(this).attr("data"); 
//			alert(id);
//			layer.confirm('确认关闭提醒吗？', {
//		  		btn: ['确认','取消'] 
//				}, function(){
					$.post(data.host.url+"remind/closeRemind/"+id+"/"+userId,{},function(data){
						if(data.success){
							var result = data.data;
							client.set("memoRemind", JSON.stringify(result));
							if(result.length!=0){
								
								var html = "";
								$.each(result, function(index, itemobj) {
									var id = result[index].id;
									var describe = result[index].describe;
									var remindTime = result[index].remindTime;
									var color = random(0,10);
									
									html += "<label class=\"mdui-list-item mdui-ripple m_remind\" data="+id+">";
							    		html += "<div class=\"mdui-list-item-avatar mdui-color-"+colors[color]+"\">"+(index+1)+"</div>";
										html += "<div class=\"mdui-list-item-content\">";
										    html += "<div class=\"mdui-list-item-title\">"+describe+"</div>";
										    html += "<div class=\"mdui-list-item-text mdui-list-item-one-line\"><span class=\"mdui-text-color-black-secondary\">提醒时间：</span>"+remindTime+"</div>";
										html += "</div>";
										html += "<label class=\"mdui-switch\">";
									        html += "<input type=\"checkbox\"/>";
									        html += "<i class=\"mdui-switch-icon\"></i>";
									    html += "</label>";
						  			html += "</label>";
								});
								$("#memoRemind").html(html);
							}else{
								$("#memoRemind").html("<p style=\"font-weight: 400;font-size: 25px;margin-left: 40%;margin-top: 200px;\">未有提醒事项...</p>");
							}
							
							layer.msg('关闭成功！', {icon: 1});
						}else{
							layer.msg('关闭失败，稍后再试！', {icon: 1});
						}
					});
//				}, function(){
//			});
        })    
        
        //每十秒查询redis一次，获取日历提醒数据
		var j = schedule.scheduleJob('*/1 * * * *', function(){
			client.get("memoRemind", function(err, res) {
			    var result = JSON.parse(res);
			    $.each(result, function(index, itemobj) {
			    	var id = result[index].id;
					var describe = result[index].describe;
					var remindTime = result[index].remindTime;
					var status = result[index].status;
					
					var dateTime = getDateTime();//获取当前时间
					
					if(compareDate(dateTime,remindTime)){
						$("#remindTitle").text(describe);
						$("#remindId").val(id);
						m_dialog.open();
						return false;
					}
					
			    });
			});
		});
		
		r_dialog.addEventListener('confirm.mdui.dialog', function () {
			var id = $("#remindId").val();
			$.post(data.host.url+"remind/closeRemind/"+id+"/"+userId,{},function(data){
						if(data.success){
							var result = data.data;
							client.set("memoRemind", JSON.stringify(result));
							if(result.length!=0){
								var html = "";
								$.each(result, function(index, itemobj) {
									var id = result[index].id;
									var describe = result[index].describe;
									var remindTime = result[index].remindTime;
									var color = random(0,10);
									
									html += "<label class=\"mdui-list-item mdui-ripple m_remind\" data="+id+">";
							    		html += "<div class=\"mdui-list-item-avatar mdui-color-"+colors[color]+"\">"+(index+1)+"</div>";
										html += "<div class=\"mdui-list-item-content\">";
										    html += "<div class=\"mdui-list-item-title\">"+describe+"</div>";
										    html += "<div class=\"mdui-list-item-text mdui-list-item-one-line\"><span class=\"mdui-text-color-black-secondary\">提醒时间：</span>"+remindTime+"</div>";
										html += "</div>";
										html += "<label class=\"mdui-switch\">";
									        html += "<input type=\"checkbox\"/>";
									        html += "<i class=\"mdui-switch-icon\"></i>";
									    html += "</label>";
						  			html += "</label>";
								});
								$("#memoRemind").html(html);
							}else{
								$("#memoRemind").html("<p style=\"font-weight: 400;font-size: 25px;margin-left: 40%;margin-top: 200px;\">未有提醒事项...</p>");
							}
						}
					});
		});

	}
	
	self.init();
	
//	m_dialog.open();
	
}


//获取范围内的随机数
 function random(min,max){
    return Math.floor(min+Math.random()*(max-min));
}