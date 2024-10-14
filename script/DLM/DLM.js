#!name=签到-达乐美披萨
#!desc=达乐美披萨优惠券抽奖
#!author=Sliverkiss
#!icon=https://raw.githubusercontent.com/S29-zg/Picture/main/icon/DLM.PNG
#!select=dlm_score,true,false
#!select=dlm_notify,true,false
#!input=dlm_date
#!input=dlm_game
#!input=dlm_data

[Argument]
cron=input,"31 10 * * *",tag=定时参数,desc定时任务调度
switch=switch,true,tag=启用获取Cookie脚本,desc=获取Coikie脚本开关

[Script]
cron {cron} script-path=https://gist.githubusercontent.com/Sliverkiss/6b4da0d367d13790a9fd1d928c82bdf8/raw/dlm.js, timeout=300, tag=达美乐披萨

http-request ^https:\/\/game\.dominos\.com\.cn\/.+\/game\/gameDone script-path=https://gist.githubusercontent.com/Sliverkiss/6b4da0d367d13790a9fd1d928c82bdf8/raw/dlm.js, requires-body=true, timeout=10, tag=达美乐披萨获取token,enable={switch}

[MITM]
hostname = game.dominos.com.cn