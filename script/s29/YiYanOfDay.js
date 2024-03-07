$httpClient.get('https://v1.hitokoto.cn?c=a&encode=json', function(error, response, data) {   
    // 检查是否有错误发生
    if (error) {
        console.error("请求错误:", error);
        return;
    }
    
    // 解析 JSON 数据
    var jsonData = JSON.parse(data);
    
    // 提取句子内容
    var hitokoto = jsonData.hitokoto;
    
    // 发送通知
    $notification.post('每日一言', 'by s29', hitokoto);
});