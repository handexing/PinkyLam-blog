/**
 * 文章预览管理
 */
function previewPageConfig(data){
	
	var self=this;
	var m_Editor;

	this.init=function(){
		
		var articleId = getUrlVars()['articleId'];
		
		if(articleId!=null){
			editormd.emoji = {
	            path  : "https://www.webpagefx.com/tools/emoji-cheat-sheet/graphics/emojis/",
	            ext   : ".png"
        	};
    
        	editormd.twemoji = {
	            path : "http://twemoji.maxcdn.com/72x72/",
	            ext  : ".png"
        	};
        
			$.post(data.host.url+"article/getArticle",{"id":articleId},function(data){
				m_Editor = editormd("editormd", {
					toolbarIcons : function() {
            			return ["preview"]
       				},
					width  : "100%",
			        height : 650,
			        markdown : data.data.content,
			        path   : '../resource/plugins/editor/lib/',
			        emoji : true,      
			        onload : function() {
						m_Editor.previewing();
						$("#editormd .editormd-preview-close-btn").attr("style","display: none;");
					}
		        });
			});
		}
	
	}
	
	self.init();
	
}
