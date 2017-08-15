/**
 * 首页管理
 */
function indexConfig(data){
	
	var self=this;
	var userId;
	
	var inst = new mdui.Drawer('#drawer');
	var fab = new mdui.Fab('#fab');
	var menu = new mdui.Menu('#settingBtn', '#setting_menu');
	var m_dialog = new mdui.Dialog('#remind_dialog');
	var r_dialog = document.getElementById('remind_dialog');
	

	this.init=function(){
		
		userId = getUrlVars()['userId'];
		
		$("#authorName").text(getUrlVars()['userName']);
		$("#userId").val(userId);
		
		inst.close();//隐藏侧边菜单
		$("#m_Iframe").attr("src","welcome.html").attr("name","welcome");
			
		$('#home_panel').bind('click',function(){
			$("#m_Iframe").attr("src","welcome.html").attr("name","welcome");
		});
			
		$('#article_panel').bind('click',function(){
			$("#m_Iframe").attr("src","article.html").attr("name","article");
		});
			
		$('#cates_label_panel').bind('click',function(){
			$("#m_Iframe").attr("src","catesLabel.html").attr("name","catesLabel");
		});
			
		$('#file_panel').bind('click',function(){
			$("#m_Iframe").attr("src","filePage.html").attr("name","filePage");
		});
			
		if($(".iDate.full").length>0){
		    $(".iDate.full").datetimepicker({
		        locale: "zh-cn",
		        format: "YYYY-MM-DD HH:mm:ss",
		        dayViewHeaderFormat: "YYYY年 MMMM"
		    });
    	}
			
		//添加文章
		$('#addArticle').bind('click',function(){
			layer.open({
				title :'添加文章',
				maxmin:false,
				type: 2,
				area: ['100%', '100%'],
				fixed: false, //不固定
				content: 'addArticle.html?userId='+userId
			});
		});
		
		document.getElementById('settingBtn').addEventListener('click', function () {
		  	menu.open();
		});
				
		//左侧菜单
		document.getElementById('toggle').addEventListener('click', function () {
		  	inst.toggle();
		});
		
		//添加提醒
		document.getElementById('addRemind').addEventListener('click', function () {
		  	m_dialog.open();
		});
		
		r_dialog.addEventListener('confirm.mdui.dialog', function () {
			
			var describe = $.trim($("#describe").val());
			var remindTime = $.trim($("#remindTime").val());
			
			if(describe==null || describe==""){
				layer.msg('提醒描述不能为空！', {icon: 7});
				return;
			}
			
			if(remindTime==null || remindTime==""){
				layer.msg('提醒时间不能为空！', {icon: 7});
				return;
			}
			
			var memoRemind={};
			memoRemind.authorId = userId;
			memoRemind.describe = describe;
			memoRemind.remindTime = remindTime;
			
			$.ajax({
				url:data.host.url+'remind/saveMemoRemind',
	            type: "POST",
	            dataType: "json",//跨域ajax请求,返回数据格式为json
	            cache: false,
	            timeout: 10000,//请求超时时间,单位为毫秒
	            async: true,
	            global: false,//禁用Jquery全局事件
	            scriptCharset: 'UTF-8',
	            //processData : false,         // 告诉jQuery不要去处理发送的数据
	            contentType: 'application/json;charset=UTF-8',//请求内容的MIMEType
				data:JSON.stringify(memoRemind),
				success:function(responseData, status){
					if(responseData.success){
						window.location.reload();
						layer.msg('添加成功！', {icon: 1});
					}else{
						layer.msg('添加失败！', {icon: 5});
					}
	
				}
			});
			
		});

	}
	
	self.init();
	
}
