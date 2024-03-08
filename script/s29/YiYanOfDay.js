const $=new Env("YiYan");
var type=$.getdata("type");
var url="https://v1.hitokoto.cn?encode=json&c="+type;


$httpClient.get(
  url,
  function (error, response, data) {
    // 检查是否有错误发生
    if (error) {
      console.error("请求错误:", error);
      return;
    }

    // 解析 JSON 数据
    var jsonData = JSON.parse(data);

    // 提取句子内容
    var hitokoto = jsonData.hitokoto;
    var author=jsonData.from_who;
    var tp=jsonData.type;

    // 发送通知
    $notification.post("每日一言-", author, hitokoto);
  }
);
