const proxy = [
  // {path: ['/admin/api/v1', '/main/api/v1', '/startup/api/v1', '/work/api/v1'], target: 'http://192.168.11.240:8995'}, // 刘葛
  // {path: ['/admin/api/v1', '/main/api/v1', '/startup/api/v1', '/work/api/v1'], target: 'http://192.168.11.3:8995'}, // 武哥
  // {path: ['/admin/api/v1', '/main/api/v1', '/startup/api/v1', '/work/api/v1'], target: 'http://apl.apluslabs.com.cn'},  // 测试
  // { path: ['/admin/api/v1', '/main/api/v1', '/startup/api/v1', '/work/api/v1'], target: 'https://work.apluslabs.com'},  // 线上
  { path: ['/api'], target: 'http://localhost:5000'},  // 本地
];

module.exports = {
  ip: "localhost",
  // ip: "192.168.11.30",
  port: 3005,
  proxy
};
