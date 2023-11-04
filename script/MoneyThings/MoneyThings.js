/*************************************

项目名称：MoneyThings-记账
下载地址：https://apps.apple.com/us/app/moneythings-finance-tracker/id1549694221
项目名称：SalesCat-RevenueCat客户端
下载地址：https://apps.apple.com/us/app/salescat-for-revenuecat/id6447881882
项目名称：MatrixClocca-矩阵时钟
下载地址：https://apps.apple.com/us/app/salescat-for-revenuecat/id6447881882
脚本作者：chxm1023

**************************************

[rewrite_local]
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/S29-zg/rule/main/script/MoneyThings/MoneyThings.js
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/S29-zg/rule/main/script/MoneyThings/MoneyThings.js

[mitm]
hostname = api.revenuecat.com

*************************************/


const pro = {};
const pro1 = JSON.parse(typeof $response != "undefined" && $response.body || null);const app = 'cm';const list = {'cm':{name: 'Premium', id: 'com.lishaohui.cashflow.lifetime'}};
const data = {
	"Author": "chxm1023",
	"Telegram" : "https://t.me/chxm1023",
	"warning": "仅供学习，禁止转载或售卖",
	"original_purchase_date": "2022-09-09T09:09:09Z",
	"purchase_date": "2022-09-09T09:09:09Z",
	"expires_date": "2099-09-09T09:09:09Z",
	"ownership_type": "PURCHASED"
};

if (typeof $response == "undefined") {
	delete $request.headers["x-revenuecat-etag"];
	delete $request.headers["X-RevenueCat-ETag"];
	pro.headers = $request.headers;
} else if (pro1 && pro1.subscriber) {
	pro1.subscriber.subscriptions = pro1.subscriber.subscriptions || {};
	pro1.subscriber.entitlement = pro1.subscriber.entitlement || {};
     for (const i in list) {
if (new RegExp(`^${i}`, `i`).test(app)) {
	pro1.subscriber.subscriptions[list[i].id] = data;
	pro1.subscriber.entitlements[list[i].name] = JSON.parse(JSON.stringify(data));
	pro1.subscriber.entitlements[list[i].name].product_identifier = list[i].id;
			break;
		}
	}
    pro.body = JSON.stringify(pro1);
}

$done(pro);