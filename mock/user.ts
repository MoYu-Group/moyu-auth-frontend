// // 用户接口mock
// import { defineFakeRoute } from "vite-plugin-fake-server/client";

// export default defineFakeRoute([
//   {
//     url: "/endpoint/user/loginUser",
//     method: "get",
//     response: ({ body }) => {
//       console.log("body", body);
//       return {
//         success: true,
//         code: "00000",
//         message: "",
//         content: {
//           avatar: "https://avatars.githubusercontent.com/u/7553053",
//           username: "admin",
//           nickname: "饭饭",
//           // 一个用户可能有多个角色
//           roles: ["admin"],
//           // 按钮级别权限
//           permissions: ["*:*:*"],
//           accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
//           refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
//           expires: "2030/10/30 00:00:00"
//         },
//         traceId: "3926172172084182a0f0ae7d4f880689"
//       };
//     }
//   }
// ]);
