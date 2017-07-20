/**
 * 文件管理
 */
function fileConfig(data){
	
	var self=this;
	var m_Editor;
	var user;

	this.init=function(){
		
		var redis = require("redis");
    	client = redis.createClient(data.redis.port, data.redis.server);
		
		client.get("user", function(err, reply) {
		    user = JSON.parse(reply);
		});
		
		$("#dropzone").dropzone({
		    paramName: "file",
		    url:data.host.url+"file/upload/"+user.id,
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
    	});
    		
	}
	
	self.init();
	
}
