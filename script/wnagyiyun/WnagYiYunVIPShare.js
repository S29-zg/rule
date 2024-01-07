/*
脚本作者：佚名
脚本日期：2023-11-18 19:13:23
引用地址：
*/
var headers = $request.headers;

var ck = $persistentStore.read("163_Cookie");
var ua = $persistentStore.read("163_User-Agent");
var mi = $persistentStore.read("163_MConfig-Info");

if (headers['Cookie'] != undefined) {
    headers['Cookie'] = ck;
} else {
    headers['cookie'] = ck;
}
if (headers['User-Agent'] != undefined) {
    headers['User-Agent'] = ua;
} else {
    headers['user-agent'] = ua;
}
if (headers['MConfig-Info'] != undefined) {
    headers['MConfig-Info'] = mi;
} else {
    headers['mconfig-info'] = mi;
}

$done({ 'headers': headers });