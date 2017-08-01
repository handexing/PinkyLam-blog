/**
 * 首页管理
 */
function indexConfig(data,user){
	
	var self=this;
	var userId;

	this.init=function(){
		
		$.post(data.host.url+"index/getMySelfInfo/"+user.id,{},function(data){
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

	}
	
	self.init();
	
}
