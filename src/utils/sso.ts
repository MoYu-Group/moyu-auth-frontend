import { removeToken, setToken, type DataInfo } from "./auth";
import { subBefore, getQueryMap } from "@pureadmin/utils";

// SSO配置
const SSO_CONFIG = {
  // SSO系统地址
  SSO_URL: "http://server.ffis.me:9001/ssoLogin.html",
  SSO_LOGOUT_URL: "http://server.ffis.me:9001/ssoLogout"
};

/**
 * 跳转到SSO退出登录页
 * @param currentUrl 当前页面地址（可选，默认为当前页面URL）
 */
export function redirectToSSOLogout(currentUrl?: string) {
  console.log("redirectToSSOLogout");
  // 1. 获取回跳地址
  const backUrl = encodeURIComponent(currentUrl || window.location.href);
  // 2. 构建SSO登录URL
  const ssoLoginUrl = `${SSO_CONFIG.SSO_LOGOUT_URL}?backUrl=${backUrl}`;
  // 3. 跳转到SSO登录页
  window.location.href = ssoLoginUrl;
}

/**
 * 跳转到SSO登录页
 * @param currentUrl 当前页面地址（可选，默认为当前页面URL）
 */
export function redirectToSSOLogin(currentUrl?: string) {
  console.log("redirectToSSOLogin");
  // 1. 获取回跳地址
  const backUrl = encodeURIComponent(currentUrl || window.location.href);
  // 2. 构建SSO登录URL
  const ssoLoginUrl = `${SSO_CONFIG.SSO_URL}?backUrl=${backUrl}`;
  // 3. 跳转到SSO登录页
  window.location.href = ssoLoginUrl;
}

/**
 * 处理API响应，检查是否需要跳转SSO
 * @param response API响应数据
 * @returns boolean 是否已处理跳转
 */
export function handleApiResponse(response: any): boolean {
  console.log("handleApiResponse");
  // 检查是否是登录过期
  if (response?.code === "A0230" && response?.message === "用户登录已过期") {
    // 清除本地token
    removeToken();

    // 记录当前页面URL并跳转SSO
    redirectToSSOLogin();
    return true;
  }
  return false;
}

/**
 * 简版前端单点登录，根据实际业务自行编写，平台启动后本地可以跳后面这个链接进行测试 http://localhost:8848/#/permission/page/index?username=sso&roles=admin&accessToken=eyJhbGciOiJIUzUxMiJ9.admin
 * 划重点：
 * 判断是否为单点登录，不为则直接返回不再进行任何逻辑处理，下面是单点登录后的逻辑处理
 * 1.清空本地旧信息；
 * 2.获取url中的重要参数信息，然后通过 setToken 保存在本地；
 * 3.删除不需要显示在 url 的参数
 * 4.使用 window.location.replace 跳转正确页面
 */
// (function () {
//   // 获取 url 中的参数
//   const params = getQueryMap(location.href) as DataInfo<Date>;
//   const must = ["username", "roles", "accessToken"];
//   const mustLength = must.length;
//   if (Object.keys(params).length !== mustLength) return;

//   // url 参数满足 must 里的全部值，才判定为单点登录，避免非单点登录时刷新页面无限循环
//   let sso = [];
//   let start = 0;

//   while (start < mustLength) {
//     if (Object.keys(params).includes(must[start]) && sso.length <= mustLength) {
//       sso.push(must[start]);
//     } else {
//       sso = [];
//     }
//     start++;
//   }

//   if (sso.length === mustLength) {
//     // 判定为单点登录

//     // 清空本地旧信息
//     removeToken();

//     // 保存新信息到本地
//     setToken(params);

//     // 删除不需要显示在 url 的参数
//     delete params.roles;
//     delete params.accessToken;

//     const newUrl = `${location.origin}${location.pathname}${subBefore(
//       location.hash,
//       "?"
//     )}?${JSON.stringify(params)
//       .replace(/["{}]/g, "")
//       .replace(/:/g, "=")
//       .replace(/,/g, "&")}`;

//     // 替换历史记录项
//     window.location.replace(newUrl);
//   } else {
//     return;
//   }
// })();
