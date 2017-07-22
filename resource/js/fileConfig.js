/**
 * 文件管理
 */
function fileConfig(data){
	
	var self=this;
	var m_Editor;
	var userId;
	
	this.init=function(){
		
		//获取父窗口用户标识ID
//		userId = window.parent.document.getElementById('userId').value;
		
//		var redis = require("redis");
//  	client = redis.createClient(data.redis.port, data.redis.server);

		/*uploadUrl = data.host.url+"file/upload/"+1;
		alert(uploadUrl);
		$("#dropzone").dropzone({
		    paramName: "file",
		    url:"http://127.0.0.1:8888/file/upload/"+userId,,
		    maxFilesize: 5,
		    init: function () {
		    	this.on("success", function (file, data) {
//		            alert(JSON.stringify(data));
					if(data.success){
			            setTimeout(function () {
			                window.location.reload();
			            }, 200);
					}else{
						layer.msg('上传大小不能超过5MB！', {icon: 7});
					}
		        });
		    },
		    sending:function(){
		        $(".dz-message").hide();
		    }
    	});*/
    		
	}
	
	self.init();
	
}
