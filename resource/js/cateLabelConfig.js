/**
 * 类别标签
 */
function cateLabelConfig(data){
	
	var self=this;

	this.init=function(){
		
		$.post(data.host.url+"cateLabel/getCateLabelList/1",{},function(data){
			if(data.success){
				var result = data.data;
				var chips="";
				$.each(result, function(index, itemobj) {
					var id = result[index].id;
					var name = result[index].name;
					chips = chips + "<div class=\"mdui-chip\" id='"+id+"'><span class=\"mdui-chip-icon mdui-color-orange\" onclick=\"m_cateLabel.delCateLabel("+id+")\"><i class=\"mdui-icon material-icons\">&#xe888;</i></span>";
					chips = chips + "<span class=\"mdui-chip-title\">"+name+"</span></div>";
				});
				$("#cateList").html(chips)
			} 
		});
		
		$.post(data.host.url+"cateLabel/getCateLabelList/2",{},function(data){
			if(data.success){
				var result = data.data;
				var chips="";
				$.each(result, function(index, itemobj) {
					var id = result[index].id;
					var name = result[index].name;
					chips = chips + "<div class=\"mdui-chip\" id='"+id+"'><span class=\"mdui-chip-icon mdui-color-orange\" onclick=\"m_cateLabel.delCateLabel("+id+")\"><i class=\"mdui-icon material-icons\">&#xe888;</i></span>";
					chips = chips + "<span class=\"mdui-chip-title\">"+name+"</span></div>";
				});
				$("#labelList").html(chips)
			} 
		});
	
		$('#addCategory').bind('click',function(){
			var cataName = $.trim($("#cataName").val());
			if(cataName==null || cataName==""){
				layer.msg('类别名称不能为空！', {icon: 7});
				return;
			}

			$.post(data.host.url+"cateLabel/save/1/"+cataName,{},function(data){
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
	
	this.delCateLabel=function(id){
		layer.confirm('确认删除吗？', {
	  		btn: ['确认','取消'] 
			}, function(){
				$.post(data.host.url+"cateLabel/delCateLabel/"+id,{},function(data){
					if(data.data==-1){
			  			layer.msg('删除失败，有其他文章引用！', {icon: 5});
					}else if(data.data==1){
						layer.msg('删除成功！', {icon: 1});
						$("#"+id).remove();
					}else{
						layer.msg('删除失败！', {icon: 5});
					}
				});
			}, function(){
	  			
		});
	}
	
	self.init();
	
}
