function math_ranArrAtNum(arr,num){
	var tt_arr=new Array;
	tt_arr=arr.concat();
	var arr1=new Array;
	var k;
	//var j:int=tt_arr.length;
	for (var i=0; i<num; i++) {
		k=Math.floor(Math.random()*tt_arr.length);
		arr1.push(tt_arr[k]);
		tt_arr.splice(k,1);
	}
	return arr1;
}