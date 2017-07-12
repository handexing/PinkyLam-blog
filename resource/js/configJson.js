/**
 * 读取配置文件
 */

var result;

function getJson(){
	$.getJSON("../config.json", function (data) {
		result = data;
		console.log(result);
    });
    console.log("11111")
    return result;
}


var config={
	
	getJson:function(){
		
	}


}