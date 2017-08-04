/**
 * 添加文章管理
 */
function articleConfig(data){
	
	var self=this;
	var m_Editor;
	var writingTime = 1;//写作时间
	var userId;

	this.init=function(){
		
		userId = getUrlVars()['userId'];
		
		editormd.emoji = {
            path  : "https://www.webpagefx.com/tools/emoji-cheat-sheet/graphics/emojis/",
            ext   : ".png"
        };
    
        editormd.twemoji = {
            path : "http://twemoji.maxcdn.com/72x72/",
            ext  : ".png"
        };
                
        m_Editor = editormd("editormd", {
			toolbarIcons : function() {
            	return ["undo", "redo", "|", "bold","del","italic" ,"quote","ucwords","uppercase","lowercase",/*"|","h1","h2","h3","h4","h5","h6",*/"|","list-ul","list-ol","hr", "|","link"/*,"reference-link"*/,"image",
            			"code",/*"preformatted-text",*/"code-block","table","datetime", "emoji"/*,"html-entities"*/,"|",/*"goto-line",*/"search","preview", "watch",/* "|", "fullscreen",*/ "file", "faicon"]
       		},
			width  : "100%",
            height : 556,
            toc : true,
            emoji : true,       
            taskList : true,
            path   : '../resource/plugins/editor/lib/'
        });
            
            
        $('#tag').tagEditor({
            placeholder: '请输入文章所属标签...'
        });
            
		
		$.post(data.host.url+"cateLabel/getCateLabelList/1",{},function(data){
			if(data.success){
				var result = data.data;
				$.each(result, function(index, itemobj) {
					var id = result[index].id;
					var name = result[index].name;
					var options = "<option value='"+id+"'>"+name+"</option>";
					$('#cateSelect').append(options);
				});
			} 
		});
		
		$('#saveArticle').bind('click',function(){
			
			var title = $.trim($("#title").val());
			var tag = $.trim($("#tag").val());
			var cateSelect = $.trim($("#cateSelect").val());
			var subTitle = $.trim($("#subTitle").val());
			var content = m_Editor.getMarkdown();
			var id = $("#articleId").val();
			
			console.log(title+":："+tag+"：："+cateSelect+"：："+subTitle+"：："+content);
			
			if(title==null || title==""){
				layer.msg('文章标题不能为空！', {icon: 7});
				return;
			}
			
			if(tag==null || tag==""){
				layer.msg('文章标签不能为空！', {icon: 7});
				return;
			}
			
			if(cateSelect==null || cateSelect==""){
				layer.msg('文章类别不能为空！', {icon: 7});
				return;
			}
			
			if(subTitle==null || subTitle==""){
				layer.msg('文章副标题不能为空！', {icon: 7});
				return;
			}
			
			var article={};
			article.id = id;
			article.title = title;
			article.subtitle = subTitle;
			article.content = content;
			article.tag = tag;
			article.cateId = cateSelect;
			article.authorId = userId;
			article.writingTime = writingTime;
			
			$.ajax({
				url:data.host.url+'article/saveArticle',
	            type: "POST",
	            dataType: "json",//跨域ajax请求,返回数据格式为json
	            cache: false,
	            timeout: 10000,//请求超时时间,单位为毫秒
	            async: true,
	            global: false,//禁用Jquery全局事件
	            scriptCharset: 'UTF-8',
	            //processData : false,         // 告诉jQuery不要去处理发送的数据
	            contentType: 'application/json;charset=UTF-8',//请求内容的MIMEType
				data:JSON.stringify(article),
				success:function(responseData, status){
					if(responseData.success){
						layer.msg('添加成功！', {icon: 1});
						var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
						parent.layer.close(index); //再执行关闭
					}else{
						layer.msg('添加失败！', {icon: 5});
					}
	
				}
			});
			
		});
	
		var articleId= getUrlVars()['articleId'];
		
		if(typeof(articleId) != "undefined"){
			$("#articleId").val(articleId);
			$.post(data.host.url+"article/getArticle",{"id":articleId},function(data){
				if(data.success){
					$("#title").val(data.data.title);
//					$("#cateSelect").val();
					$("#subTitle").val(data.data.subtitle);
					m_Editor = editormd("editormd", {
			        	markdown : data.data.content
		        	});
		        	
		        	var labels = data.data.labels;
		        	
		        	$.each(labels, function(index, itemobj) {
		        		var name=labels[index].name;
						var type=labels[index].type;
						
						if(type == 1){
							
						}else{
							$('#tag').tagEditor('addTag', name);
						}
		        	});
				}else{
					layer.msg('程序出错！', {icon: 5});
				}
			});
		}else{
			$("#articleId").val("");
		}
	
		setInterval(function faddTime(){
			writingTime ++;
		},1000);
	
	}
	
	self.init();
	
}
