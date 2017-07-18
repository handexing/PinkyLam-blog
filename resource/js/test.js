/**
 * 文章管理
 */
function articlePageConfig(data){
	
	var self=this;
	var m_Editor;
	var user;
	var articleTable;

	this.init=function(){
		
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
	
	self.init();
	
}
