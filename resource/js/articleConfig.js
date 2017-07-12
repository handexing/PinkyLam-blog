/**
 * 文章管理
 */
function articleConfig(host){
	
	var self=this;
	var m_Editor;

	this.init=function(){
		
		editormd.emoji = {
            path  : "https://www.webpagefx.com/tools/emoji-cheat-sheet/graphics/emojis/",
            ext   : ".png"
        };
    
        // Twitter Emoji (Twemoji)  graphics files url path    
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
            
		
		$.post(host+"cateLabel/getCateLabelList/1",{},function(data){
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
			
			console.log(title+":："+tag+"：："+cateSelect+"：："+subTitle+"：："+content)
		});
	
	}
	
	self.init();
	
}


