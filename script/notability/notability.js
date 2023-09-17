/**

 项目名称：Notability
 时间：2023/9/17

 **************************************

 [rewrite_local]
 ^https?:\/\/notability\.com\/(global|subscriptions) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/notability.js

 [mitm]
 hostname = notability.com

**/


var infinity_time = JSON.parse($response.body);

infinity_time = {
    "data" : {
        "processAppleReceipt" : {
            "error" : 0,
            "subscription" : {
                "productId" : "com.gingerlabs.Notability.premium_subscription",
                "originalTransactionId" : "570001184068302",
                "tier" : "premium",
                "refundedDate" : null,
                "refundedReason" : null,
                "isInBillingRetryPeriod" : false,
                "expirationDate" : "2099-09-09T09:09:09.000Z",
                "gracePeriodExpiresAt" : null,
                "overDeviceLimit" : false,
                "expirationIntent" : null,
                "__typename" : "AppStoreSubscription",
                "user" : null,
                "status" : "canceled",
                "originalPurchaseDate" : "2022-09-09T09:09:09.000Z"
            },
            "__typename" : "SubscriptionResult"
        }
    }
};

$done({body : JSON.stringify(infinity_time)});