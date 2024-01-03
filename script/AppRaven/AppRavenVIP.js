/* 
脚本功能: 生成 appraven 会员账号
@tips:
  两周会员时间, 到期换号
*/

const $ = new Env("appraven");

var userIds = [];
var cookies = [];
var accounts = [];

(async () => {
  await register();
  await register();
  if (userIds.length == 2 && cookies.length == 2 && accounts.length == 2) {
    await redeem(userIds[0], cookies[1]);
  }
})()
  .catch((e) => $.logErr(e))
  .finally(() => {
    $.setdata(accounts, "appraven_accounts");
    $.log("ok");
    $.done();
  });

async function redeem(userId, redeem_cookie) {
  var redeem_body = {
    query:
      "mutation UseReferralCode($id: ID!) {\n  useReferralCode(id: $id) {\n    __typename\n    ...MyUserData\n  }\n}\nfragment MyUserData on User {\n  __typename\n  ...UserDetail\n  info {\n    __typename\n    ...UserInfo\n  }\n  settings {\n    __typename\n    ...UserSettings\n  }\n}\nfragment UserDetail on User {\n  __typename\n  id\n  username\n  customName\n  displayName\n  iconLarge\n  banner\n  description\n  territory\n  languages\n  premium\n  registrationDate\n  score\n  role\n  youFollowHim\n  heFollowsYou\n  youBlockHim\n  totalWorth\n  userOptions {\n    __typename\n    privateProfile\n    showRegion\n  }\n  links {\n    __typename\n    ...UserLink\n  }\n  appCount\n  commentCount\n  followers(pageSize: 3) {\n    __typename\n    totalElements\n    content {\n      __typename\n      iconSmall\n    }\n  }\n  follows(pageSize: 3) {\n    __typename\n    totalElements\n    content {\n      __typename\n      iconSmall\n    }\n  }\n  upvotedApps: apps(type: UPVOTED, pageSize: 3) {\n    __typename\n    totalElements\n    content {\n      __typename\n      artworkUrl\n    }\n  }\n  downvotedApps: apps(type: DOWNVOTED, pageSize: 3) {\n    __typename\n    totalElements\n    content {\n      __typename\n      artworkUrl\n    }\n  }\n  watchedApps: apps(type: WATCHED, pageSize: 3) {\n    __typename\n    totalElements\n    content {\n      __typename\n      artworkUrl\n    }\n  }\n  ownedApps: apps(type: OWNED, pageSize: 3) {\n    __typename\n    totalElements\n    content {\n      __typename\n      artworkUrl\n    }\n  }\n  ownedIAPs(pageSize: 15) {\n    __typename\n    totalElements\n    content {\n      __typename\n      app {\n        __typename\n        artworkUrl\n      }\n    }\n  }\n  createdCollections: collections(\n    type: CREATED\n    sort: {by: CREATION_DATE}\n    pageSize: 3\n  ) {\n    __typename\n    totalElements\n    content {\n      __typename\n      ...CollectionThumbnail\n    }\n  }\n  comments(sort: {by: TIMESTAMP, direction: DESC}, pageSize: 5) {\n    __typename\n    totalElements\n    content {\n      __typename\n      ...CommentWithApp\n    }\n  }\n  upvotedDevelopers: developers(\n    type: UPVOTED\n    sort: {by: DEFAULT, direction: DESC}\n    pageSize: 1\n  ) {\n    __typename\n    totalElements\n  }\n  downvotedDevelopers: developers(\n    type: DOWNVOTED\n    sort: {by: DEFAULT, direction: DESC}\n    pageSize: 1\n  ) {\n    __typename\n    totalElements\n  }\n  watchedDevelopers: developers(\n    type: WATCHED\n    sort: {by: DEFAULT, direction: DESC}\n    pageSize: 1\n  ) {\n    __typename\n    totalElements\n  }\n  watchedAppTags(sort: {by: DEFAULT}, pageSize: 3) {\n    __typename\n    totalElements\n    content {\n      __typename\n      ...AppTagThumbnail\n    }\n  }\n}\nfragment UserLink on UserLink {\n  __typename\n  id\n  type\n  icon\n  title\n  displayTitle\n  value\n  url\n}\nfragment CollectionThumbnail on Collection {\n  __typename\n  id\n  title\n  appCount\n  suggestionCount\n  watchCount\n  score\n  user {\n    __typename\n    id\n    displayName\n  }\n  topItems {\n    __typename\n    id\n    app {\n      __typename\n      id\n      artworkUrl\n    }\n  }\n}\nfragment CommentWithApp on Comment {\n  __typename\n  id\n  text\n  timestamp\n  user {\n    __typename\n    id\n    displayName\n    iconSmall\n    premium\n    role\n  }\n  premiumOnly\n  entity {\n    __typename\n    id\n    ... on App {\n      __typename\n      ...AppThumbnail\n    }\n  }\n  parent {\n    __typename\n    id\n    user {\n      __typename\n      id\n      displayName\n    }\n  }\n  upvoteCount\n  downvoteCount\n  myVote {\n    __typename\n    type\n  }\n  hasReplies\n  replyCount\n  commentCount\n  deleted\n}\nfragment AppThumbnail on App {\n  __typename\n  id\n  title\n  artworkUrl\n  priceTier\n  rating\n  ratingCount\n  preorder\n  game\n  arcade\n  onStore\n  hasInAppPurchases\n  ratingInfo {\n    __typename\n    topPosition\n  }\n  developer {\n    __typename\n    name\n  }\n  lastActivity {\n    __typename\n    ...AppActivity\n  }\n  genres {\n    __typename\n    ...AppGenre\n  }\n  devices\n  upvoteCount\n  downvoteCount\n  commentCount\n  myWatch {\n    __typename\n    ...WatchInteractionInfo\n  }\n  youOwn\n}\nfragment AppActivity on AppActivity {\n  __typename\n  timestamp\n  ... on AppActivityAvailability {\n    __typename\n    availabilityChangeType: type\n  }\n  ... on AppActivityPriceChange {\n    __typename\n    priceChangeType: type\n    priceTierFrom\n  }\n  ... on AppActivityUpdate {\n    __typename\n    updateSize\n    versionTo\n  }\n}\nfragment AppGenre on AppGenre {\n  __typename\n  ITunesId\n  title\n  parentITunesId\n}\nfragment WatchInteractionInfo on WatchInteraction {\n  __typename\n  price\n  inAppPurchases\n  maxPriceTier\n  rareOnly\n  updates\n  availability\n  comments\n  newAppAdded\n  notificationLevel\n}\nfragment AppTagThumbnail on AppTag {\n  __typename\n  id\n  title\n  appCount\n  watchCount\n  myWatch {\n    __typename\n    ...WatchInteractionInfo\n  }\n}\nfragment UserInfo on UserInfo {\n  __typename\n  id\n  premium\n  usesAppleId\n  emailVerified\n  referralCodeUsed\n}\nfragment UserSettings on UserSettings {\n  __typename\n  username\n  email\n  options {\n    __typename\n    privateProfile\n    showRegion\n    hideGames\n  }\n  notificationOptions {\n    __typename\n    userFollow\n    userComment\n    userMention\n    userNewCollection\n    userReferralCodeUsed\n    commentReply\n    collectionNewItem\n    collectionNewSuggestion\n    collectionNewComment\n    appPriceDrop\n    appPriceRise\n    appUpdate\n    appRelease\n    appPreorderRelease\n    appRemoval\n  }\n}",
    variables: {
      id: userId,
    },
    operationName: "UseReferralCode",
  };

  let options = {
    url: `https://v2.appraven.net/appraven/graphql`,
    headers: {
      Host: "v2.appraven.net",
      Accept: "*/*",
      "apollographql-client-version": "2.0-21",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/json",
      "User-Agent": "AppRaven/21 CFNetwork/1335.0.2 Darwin/21.6.0",
      "X-APOLLO-OPERATION-TYPE": "mutation",
      "apollographql-client-name": "net.appraven.app-apollo-ios",
      Connection: "keep-alive",
      Cookie: redeem_cookie,
      "X-APOLLO-OPERATION-NAME": "UseReferralCode",
    },
    body: JSON.stringify(redeem_body),
  };

  return $.http.post(options).then((resp) => {
    var obj = JSON.parse(resp.body);

    const flag = obj.data.useReferralCode.info.premium;
    const flag2 = obj.data.useReferralCode.premium;

    if (flag || flag2) {
      $.log("------------------------");
      $.log("🎉兑换成功!");
      $.log("🎉两个都是会员账号!");
      $.log(accounts[0]);
      $.log(accounts[1]);
    } else {
      $.log("🔴兑换会员失败!");
      $.log(resp.body);
      $.done();
    }
  });
}

async function register() {
  var rd = Math.random().toString(36).slice(-8);

  var register_body = {
    query:
      "mutation Register($username: String!, $email: String!, $password: String!) {\n  registerUser(username: $username, email: $email, password: $password) {\n    __typename\n    ...MyUserData\n  }\n}\nfragment MyUserData on User {\n  __typename\n  ...UserDetail\n  info {\n    __typename\n    ...UserInfo\n  }\n  settings {\n    __typename\n    ...UserSettings\n  }\n}\nfragment UserDetail on User {\n  __typename\n  id\n  username\n  customName\n  displayName\n  iconLarge\n  banner\n  description\n  territory\n  languages\n  premium\n  registrationDate\n  score\n  role\n  youFollowHim\n  heFollowsYou\n  youBlockHim\n  totalWorth\n  userOptions {\n    __typename\n    privateProfile\n    showRegion\n  }\n  links {\n    __typename\n    ...UserLink\n  }\n  appCount\n  commentCount\n  followers(pageSize: 3) {\n    __typename\n    totalElements\n    content {\n      __typename\n      iconSmall\n    }\n  }\n  follows(pageSize: 3) {\n    __typename\n    totalElements\n    content {\n      __typename\n      iconSmall\n    }\n  }\n  upvotedApps: apps(type: UPVOTED, pageSize: 3) {\n    __typename\n    totalElements\n    content {\n      __typename\n      artworkUrl\n    }\n  }\n  downvotedApps: apps(type: DOWNVOTED, pageSize: 3) {\n    __typename\n    totalElements\n    content {\n      __typename\n      artworkUrl\n    }\n  }\n  watchedApps: apps(type: WATCHED, pageSize: 3) {\n    __typename\n    totalElements\n    content {\n      __typename\n      artworkUrl\n    }\n  }\n  ownedApps: apps(type: OWNED, pageSize: 3) {\n    __typename\n    totalElements\n    content {\n      __typename\n      artworkUrl\n    }\n  }\n  ownedIAPs(pageSize: 15) {\n    __typename\n    totalElements\n    content {\n      __typename\n      app {\n        __typename\n        artworkUrl\n      }\n    }\n  }\n  createdCollections: collections(\n    type: CREATED\n    sort: {by: CREATION_DATE}\n    pageSize: 3\n  ) {\n    __typename\n    totalElements\n    content {\n      __typename\n      ...CollectionThumbnail\n    }\n  }\n  comments(sort: {by: TIMESTAMP, direction: DESC}, pageSize: 5) {\n    __typename\n    totalElements\n    content {\n      __typename\n      ...CommentWithApp\n    }\n  }\n  upvotedDevelopers: developers(\n    type: UPVOTED\n    sort: {by: DEFAULT, direction: DESC}\n    pageSize: 1\n  ) {\n    __typename\n    totalElements\n  }\n  downvotedDevelopers: developers(\n    type: DOWNVOTED\n    sort: {by: DEFAULT, direction: DESC}\n    pageSize: 1\n  ) {\n    __typename\n    totalElements\n  }\n  watchedDevelopers: developers(\n    type: WATCHED\n    sort: {by: DEFAULT, direction: DESC}\n    pageSize: 1\n  ) {\n    __typename\n    totalElements\n  }\n  watchedAppTags(sort: {by: DEFAULT}, pageSize: 3) {\n    __typename\n    totalElements\n    content {\n      __typename\n      ...AppTagThumbnail\n    }\n  }\n}\nfragment UserLink on UserLink {\n  __typename\n  id\n  type\n  icon\n  title\n  displayTitle\n  value\n  url\n}\nfragment CollectionThumbnail on Collection {\n  __typename\n  id\n  title\n  appCount\n  suggestionCount\n  watchCount\n  score\n  user {\n    __typename\n    id\n    displayName\n  }\n  topItems {\n    __typename\n    id\n    app {\n      __typename\n      id\n      artworkUrl\n    }\n  }\n}\nfragment CommentWithApp on Comment {\n  __typename\n  id\n  text\n  timestamp\n  user {\n    __typename\n    id\n    displayName\n    iconSmall\n    premium\n    role\n  }\n  premiumOnly\n  entity {\n    __typename\n    id\n    ... on App {\n      __typename\n      ...AppThumbnail\n    }\n  }\n  parent {\n    __typename\n    id\n    user {\n      __typename\n      id\n      displayName\n    }\n  }\n  upvoteCount\n  downvoteCount\n  myVote {\n    __typename\n    type\n  }\n  hasReplies\n  replyCount\n  commentCount\n  deleted\n}\nfragment AppThumbnail on App {\n  __typename\n  id\n  title\n  artworkUrl\n  priceTier\n  rating\n  ratingCount\n  preorder\n  game\n  arcade\n  onStore\n  hasInAppPurchases\n  ratingInfo {\n    __typename\n    topPosition\n  }\n  developer {\n    __typename\n    name\n  }\n  lastActivity {\n    __typename\n    ...AppActivity\n  }\n  genres {\n    __typename\n    ...AppGenre\n  }\n  devices\n  upvoteCount\n  downvoteCount\n  commentCount\n  myWatch {\n    __typename\n    ...WatchInteractionInfo\n  }\n  youOwn\n}\nfragment AppActivity on AppActivity {\n  __typename\n  timestamp\n  ... on AppActivityAvailability {\n    __typename\n    availabilityChangeType: type\n  }\n  ... on AppActivityPriceChange {\n    __typename\n    priceChangeType: type\n    priceTierFrom\n  }\n  ... on AppActivityUpdate {\n    __typename\n    updateSize\n    versionTo\n  }\n}\nfragment AppGenre on AppGenre {\n  __typename\n  ITunesId\n  title\n  parentITunesId\n}\nfragment WatchInteractionInfo on WatchInteraction {\n  __typename\n  price\n  inAppPurchases\n  maxPriceTier\n  rareOnly\n  updates\n  availability\n  comments\n  newAppAdded\n  notificationLevel\n}\nfragment AppTagThumbnail on AppTag {\n  __typename\n  id\n  title\n  appCount\n  watchCount\n  myWatch {\n    __typename\n    ...WatchInteractionInfo\n  }\n}\nfragment UserInfo on UserInfo {\n  __typename\n  id\n  premium\n  usesAppleId\n  emailVerified\n  referralCodeUsed\n}\nfragment UserSettings on UserSettings {\n  __typename\n  username\n  email\n  options {\n    __typename\n    privateProfile\n    showRegion\n    hideGames\n  }\n  notificationOptions {\n    __typename\n    userFollow\n    userComment\n    userMention\n    userNewCollection\n    userReferralCodeUsed\n    commentReply\n    collectionNewItem\n    collectionNewSuggestion\n    collectionNewComment\n    appPriceDrop\n    appPriceRise\n    appUpdate\n    appRelease\n    appPreorderRelease\n    appRemoval\n  }\n}",
    variables: {
      email: `${rd}@qqq.com`,
      username: `${rd}`,
      password: "12345678",
    },
    operationName: "Register",
  };

  let options = {
    url: `https://v2.appraven.net/appraven/graphql`,
    headers: {
      Host: "v2.appraven.net",
      Accept: "*/*",
      "apollographql-client-version": "2.0-20",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/json",
      "User-Agent": "AppRaven/21 CFNetwork/1335.0.2 Darwin/21.6.0",
      Connection: "keep-alive",
      "apollographql-client-name": "net.appraven.app-apollo-ios",
      "X-APOLLO-OPERATION-TYPE": "mutation",
      "X-APOLLO-OPERATION-NAME": "Register",
    },
    body: JSON.stringify(register_body),
  };

  return $.http.post(options).then((resp) => {
    // $.log(resp.body);
    var obj = JSON.parse(resp.body);

    if (obj.data) {
      $.log("🎉注册成功!");
      var set_cookie = resp.headers["Set-Cookie"];
      $.log(set_cookie);

      $.log("🟡正在处理cookie...");
      var reg = /JSESSIONID=[^;]+/;
      var reg2 = /remember-me=[^;]+/;
      var matches = set_cookie.match(reg);
      var matches2 = set_cookie.match(reg2);

      var ck1 = matches ? matches[0] : null;
      var ck2 = matches2 ? matches2[0] : null;

      if (ck1 && ck2) {
        var cookie = `${ck1}; ${ck2}`;
        var str = `🟢账号: ${rd}@qqq.com\n🟢密码: 12345678`;
        cookies.push(cookie);
        accounts.push(str);
        $.log("🎉处理cookie成功!");
        $.log(cookie);
        $.log(str);
      } else {
        $.log("🔴处理cookie失败!");
        $.log(set_cookie);
        $.done();
      }

      $.log("🟡正在获取用户id...");
      if (obj.data.registerUser.id) {
        var userId = obj.data.registerUser.id;
        $.log("🎉获取用户id成功!");
        $.log(userId);
        userIds.push(userId);
      } else {
        $.log("🔴获取用户id失败!");
        $.done();
      }
    } else {
      $.log("🔴注册失败");
      $.log(resp.body);
      $.done();
    }
    // return new Array(cookie, userId); // 返回cookie,userId
  });
}

function Env(t, s) {
  class e {
    constructor(t) {
      this.env = t;
    }
    send(t, s = "GET") {
      t = "string" == typeof t ? { url: t } : t;
      let e = this.get;
      return (
        "POST" === s && (e = this.post),
        new Promise((s, i) => {
          e.call(this, t, (t, e, r) => {
            t ? i(t) : s(e);
          });
        })
      );
    }
    get(t) {
      return this.send.call(this.env, t);
    }
    post(t) {
      return this.send.call(this.env, t, "POST");
    }
  }
  return new (class {
    constructor(t, s) {
      (this.name = t),
        (this.http = new e(this)),
        (this.data = null),
        (this.dataFile = "box.dat"),
        (this.logs = []),
        (this.isMute = !1),
        (this.isNeedRewrite = !1),
        (this.logSeparator = "\n"),
        (this.encoding = "utf-8"),
        (this.startTime = new Date().getTime()),
        Object.assign(this, s),
        this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`);
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports;
    }
    isQuanX() {
      return "undefined" != typeof $task;
    }
    isSurge() {
      return (
        "undefined" != typeof $environment && $environment["surge-version"]
      );
    }
    isLoon() {
      return "undefined" != typeof $loon;
    }
    isShadowrocket() {
      return "undefined" != typeof $rocket;
    }
    isStash() {
      return (
        "undefined" != typeof $environment && $environment["stash-version"]
      );
    }
    toObj(t, s = null) {
      try {
        return JSON.parse(t);
      } catch {
        return s;
      }
    }
    toStr(t, s = null) {
      try {
        return JSON.stringify(t);
      } catch {
        return s;
      }
    }
    getjson(t, s) {
      let e = s;
      const i = this.getdata(t);
      if (i)
        try {
          e = JSON.parse(this.getdata(t));
        } catch {}
      return e;
    }
    setjson(t, s) {
      try {
        return this.setdata(JSON.stringify(t), s);
      } catch {
        return !1;
      }
    }
    getScript(t) {
      return new Promise((s) => {
        this.get({ url: t }, (t, e, i) => s(i));
      });
    }
    runScript(t, s) {
      return new Promise((e) => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        (r = r ? 1 * r : 20), (r = s && s.timeout ? s.timeout : r);
        const [o, h] = i.split("@"),
          a = {
            url: `http://${h}/v1/scripting/evaluate`,
            body: { script_text: t, mock_type: "cron", timeout: r },
            headers: { "X-Key": o, Accept: "*/*" },
            timeout: r,
          };
        this.post(a, (t, s, i) => e(i));
      }).catch((t) => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) return {};
      {
        (this.fs = this.fs ? this.fs : require("fs")),
          (this.path = this.path ? this.path : require("path"));
        const t = this.path.resolve(this.dataFile),
          s = this.path.resolve(process.cwd(), this.dataFile),
          e = this.fs.existsSync(t),
          i = !e && this.fs.existsSync(s);
        if (!e && !i) return {};
        {
          const i = e ? t : s;
          try {
            return JSON.parse(this.fs.readFileSync(i));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        (this.fs = this.fs ? this.fs : require("fs")),
          (this.path = this.path ? this.path : require("path"));
        const t = this.path.resolve(this.dataFile),
          s = this.path.resolve(process.cwd(), this.dataFile),
          e = this.fs.existsSync(t),
          i = !e && this.fs.existsSync(s),
          r = JSON.stringify(this.data);
        e
          ? this.fs.writeFileSync(t, r)
          : i
          ? this.fs.writeFileSync(s, r)
          : this.fs.writeFileSync(t, r);
      }
    }
    lodash_get(t, s, e) {
      const i = s.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of i) if (((r = Object(r)[t]), void 0 === r)) return e;
      return r;
    }
    lodash_set(t, s, e) {
      return Object(t) !== t
        ? t
        : (Array.isArray(s) || (s = s.toString().match(/[^.[\]]+/g) || []),
          (s
            .slice(0, -1)
            .reduce(
              (t, e, i) =>
                Object(t[e]) === t[e]
                  ? t[e]
                  : (t[e] = Math.abs(s[i + 1]) >> 0 == +s[i + 1] ? [] : {}),
              t
            )[s[s.length - 1]] = e),
          t);
    }
    getdata(t) {
      let s = this.getval(t);
      if (/^@/.test(t)) {
        const [, e, i] = /^@(.*?)\.(.*?)$/.exec(t),
          r = e ? this.getval(e) : "";
        if (r)
          try {
            const t = JSON.parse(r);
            s = t ? this.lodash_get(t, i, "") : s;
          } catch (t) {
            s = "";
          }
      }
      return s;
    }
    setdata(t, s) {
      let e = !1;
      if (/^@/.test(s)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(s),
          o = this.getval(i),
          h = i ? ("null" === o ? null : o || "{}") : "{}";
        try {
          const s = JSON.parse(h);
          this.lodash_set(s, r, t), (e = this.setval(JSON.stringify(s), i));
        } catch (s) {
          const o = {};
          this.lodash_set(o, r, t), (e = this.setval(JSON.stringify(o), i));
        }
      } else e = this.setval(t, s);
      return e;
    }
    getval(t) {
      return this.isSurge() ||
        this.isShadowrocket() ||
        this.isLoon() ||
        this.isStash()
        ? $persistentStore.read(t)
        : this.isQuanX()
        ? $prefs.valueForKey(t)
        : this.isNode()
        ? ((this.data = this.loaddata()), this.data[t])
        : (this.data && this.data[t]) || null;
    }
    setval(t, s) {
      return this.isSurge() ||
        this.isShadowrocket() ||
        this.isLoon() ||
        this.isStash()
        ? $persistentStore.write(t, s)
        : this.isQuanX()
        ? $prefs.setValueForKey(t, s)
        : this.isNode()
        ? ((this.data = this.loaddata()),
          (this.data[s] = t),
          this.writedata(),
          !0)
        : (this.data && this.data[s]) || null;
    }
    initGotEnv(t) {
      (this.got = this.got ? this.got : require("got")),
        (this.cktough = this.cktough ? this.cktough : require("tough-cookie")),
        (this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()),
        t &&
          ((t.headers = t.headers ? t.headers : {}),
          void 0 === t.headers.Cookie &&
            void 0 === t.cookieJar &&
            (t.cookieJar = this.ckjar));
    }
    get(t, s = () => {}) {
      if (
        (t.headers &&
          (delete t.headers["Content-Type"],
          delete t.headers["Content-Length"]),
        this.isSurge() ||
          this.isShadowrocket() ||
          this.isLoon() ||
          this.isStash())
      )
        this.isSurge() &&
          this.isNeedRewrite &&
          ((t.headers = t.headers || {}),
          Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })),
          $httpClient.get(t, (t, e, i) => {
            !t &&
              e &&
              ((e.body = i),
              (e.statusCode = e.status ? e.status : e.statusCode),
              (e.status = e.statusCode)),
              s(t, e, i);
          });
      else if (this.isQuanX())
        this.isNeedRewrite &&
          ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
          $task.fetch(t).then(
            (t) => {
              const { statusCode: e, statusCode: i, headers: r, body: o } = t;
              s(null, { status: e, statusCode: i, headers: r, body: o }, o);
            },
            (t) => s((t && t.error) || "UndefinedError")
          );
      else if (this.isNode()) {
        let e = require("iconv-lite");
        this.initGotEnv(t),
          this.got(t)
            .on("redirect", (t, s) => {
              try {
                if (t.headers["set-cookie"]) {
                  const e = t.headers["set-cookie"]
                    .map(this.cktough.Cookie.parse)
                    .toString();
                  e && this.ckjar.setCookieSync(e, null),
                    (s.cookieJar = this.ckjar);
                }
              } catch (t) {
                this.logErr(t);
              }
            })
            .then(
              (t) => {
                const {
                    statusCode: i,
                    statusCode: r,
                    headers: o,
                    rawBody: h,
                  } = t,
                  a = e.decode(h, this.encoding);
                s(
                  null,
                  { status: i, statusCode: r, headers: o, rawBody: h, body: a },
                  a
                );
              },
              (t) => {
                const { message: i, response: r } = t;
                s(i, r, r && e.decode(r.rawBody, this.encoding));
              }
            );
      }
    }
    post(t, s = () => {}) {
      const e = t.method ? t.method.toLocaleLowerCase() : "post";
      if (
        (t.body &&
          t.headers &&
          !t.headers["Content-Type"] &&
          (t.headers["Content-Type"] = "application/x-www-form-urlencoded"),
        t.headers && delete t.headers["Content-Length"],
        this.isSurge() ||
          this.isShadowrocket() ||
          this.isLoon() ||
          this.isStash())
      )
        this.isSurge() &&
          this.isNeedRewrite &&
          ((t.headers = t.headers || {}),
          Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })),
          $httpClient[e](t, (t, e, i) => {
            !t &&
              e &&
              ((e.body = i),
              (e.statusCode = e.status ? e.status : e.statusCode),
              (e.status = e.statusCode)),
              s(t, e, i);
          });
      else if (this.isQuanX())
        (t.method = e),
          this.isNeedRewrite &&
            ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
          $task.fetch(t).then(
            (t) => {
              const { statusCode: e, statusCode: i, headers: r, body: o } = t;
              s(null, { status: e, statusCode: i, headers: r, body: o }, o);
            },
            (t) => s((t && t.error) || "UndefinedError")
          );
      else if (this.isNode()) {
        let i = require("iconv-lite");
        this.initGotEnv(t);
        const { url: r, ...o } = t;
        this.got[e](r, o).then(
          (t) => {
            const { statusCode: e, statusCode: r, headers: o, rawBody: h } = t,
              a = i.decode(h, this.encoding);
            s(
              null,
              { status: e, statusCode: r, headers: o, rawBody: h, body: a },
              a
            );
          },
          (t) => {
            const { message: e, response: r } = t;
            s(e, r, r && i.decode(r.rawBody, this.encoding));
          }
        );
      }
    }
    time(t, s = null) {
      const e = s ? new Date(s) : new Date();
      let i = {
        "M+": e.getMonth() + 1,
        "d+": e.getDate(),
        "H+": e.getHours(),
        "m+": e.getMinutes(),
        "s+": e.getSeconds(),
        "q+": Math.floor((e.getMonth() + 3) / 3),
        S: e.getMilliseconds(),
      };
      /(y+)/.test(t) &&
        (t = t.replace(
          RegExp.$1,
          (e.getFullYear() + "").substr(4 - RegExp.$1.length)
        ));
      for (let s in i)
        new RegExp("(" + s + ")").test(t) &&
          (t = t.replace(
            RegExp.$1,
            1 == RegExp.$1.length
              ? i[s]
              : ("00" + i[s]).substr(("" + i[s]).length)
          ));
      return t;
    }
    queryStr(t) {
      let s = "";
      for (const e in t) {
        let i = t[e];
        null != i &&
          "" !== i &&
          ("object" == typeof i && (i = JSON.stringify(i)),
          (s += `${e}=${i}&`));
      }
      return (s = s.substring(0, s.length - 1)), s;
    }
    msg(s = t, e = "", i = "", r) {
      const o = (t) => {
        if (!t) return t;
        if ("string" == typeof t)
          return this.isLoon() || this.isShadowrocket()
            ? t
            : this.isQuanX()
            ? { "open-url": t }
            : this.isSurge() || this.isStash()
            ? { url: t }
            : void 0;
        if ("object" == typeof t) {
          if (this.isLoon()) {
            let s = t.openUrl || t.url || t["open-url"],
              e = t.mediaUrl || t["media-url"];
            return { openUrl: s, mediaUrl: e };
          }
          if (this.isQuanX()) {
            let s = t["open-url"] || t.url || t.openUrl,
              e = t["media-url"] || t.mediaUrl,
              i = t["update-pasteboard"] || t.updatePasteboard;
            return { "open-url": s, "media-url": e, "update-pasteboard": i };
          }
          if (this.isSurge() || this.isShadowrocket() || this.isStash()) {
            let s = t.url || t.openUrl || t["open-url"];
            return { url: s };
          }
        }
      };
      if (
        (this.isMute ||
          (this.isSurge() ||
          this.isShadowrocket() ||
          this.isLoon() ||
          this.isStash()
            ? $notification.post(s, e, i, o(r))
            : this.isQuanX() && $notify(s, e, i, o(r))),
        !this.isMuteLog)
      ) {
        let t = [
          "",
          "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3==============",
        ];
        t.push(s),
          e && t.push(e),
          i && t.push(i),
          console.log(t.join("\n")),
          (this.logs = this.logs.concat(t));
      }
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]),
        console.log(t.join(this.logSeparator));
    }
    logErr(t, s) {
      const e = !(
        this.isSurge() ||
        this.isShadowrocket() ||
        this.isQuanX() ||
        this.isLoon() ||
        this.isStash()
      );
      e
        ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack)
        : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t);
    }
    wait(t) {
      return new Promise((s) => setTimeout(s, t));
    }
    done(t = {}) {
      const s = new Date().getTime(),
        e = (s - this.startTime) / 1e3;
      this.log(
        "",
        `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${e} \u79d2`
      ),
        this.log(),
        this.isSurge() ||
        this.isShadowrocket() ||
        this.isQuanX() ||
        this.isLoon() ||
        this.isStash()
          ? $done(t)
          : this.isNode() && process.exit(1);
    }
  })(t, s);
}