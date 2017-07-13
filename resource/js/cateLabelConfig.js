/**
 * 类别标签
 */
function cateLabelConfig(host){
	
	var self=this;

	this.init=function(){
		
		$.post(host+"cateLabel/getCateLabelList/1",{},function(data){
			if(data.success){
				var result = data.data;
				var chips="";
				$.each(result, function(index, itemobj) {
					var id = result[index].id;
					var name = result[index].name;
					chips = chips + "<div class=\"mdui-chip\" m_id='"+id+"'><span class=\"mdui-chip-icon mdui-color-blue\"><i class=\"mdui-icon material-icons\">&#xe60e;</i></span>";
					chips = chips + "<span class=\"mdui-chip-title\">"+name+"</span></div>";
				});
				$("#cateList").html(chips)
			} 
		});
	
		$('#addCategory').bind('click',function(){
			var cataName = $.trim($("#cataName").val());
			if(cataName==null || cataName==""){
				layer.msg('类别名称不能为空！', {icon: 7});
				return;
			}

			$.post(host+"cateLabel/save/1/"+cataName,{},function(data){
				if(data.success){
					var result = data.data;
					if(result == -1){
						layer.msg("["+cataName+"]已存在!", {icon: 7});
					}else{
						layer.msg("添加成功！", {icon: 2});
						$("#cataName").val("");
						window.location.reload();
					}
					
				} else {
					layer.msg("添加失败!", {icon: 7});
				}
			}).fail(function(data){
				layer.msg("系统异常，请联系系统管理员!", {icon: 7});
			});
		});
	
		
	}
	
	self.init();
	
}


