/**
 * 日期处理工具类
 */

/**
 * 获取当前日期
 */
function getDateTime() {
	
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth()+1;
	var day = myDate.getDate();
	var hour = myDate.getHours();       //获取当前小时数(0-23)
	var minute = myDate.getMinutes();     //获取当前分钟数(0-59)
	var second = myDate.getSeconds();     //获取当前秒数(0-59)
	
	if(month < 10){
		month = '0'+month;
	}
	if(day < 10){
		day = '0'+day;
	}

	return year+"-"+month+"-"+day+" "+hour+":"+minute;
}

/**
 * 比较两个日期时间大小
 * @param {Object} d1
 * @param {Object} d2
 */
function compareDate(d1,d2){
	var myDate = Date.parse(new Date(d1));
    var remindTime = Date.parse(new Date(d2));
    if(myDate==remindTime){  
        return true;  
    }  
    return false;  
}