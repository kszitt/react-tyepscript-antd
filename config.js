const proxy = [
  // {path: ['/admin/api/v1', '/main/api/v1', '/startup/api/v1'], target: 'http://172.168.1.146:8000'}, // 刘葛
  // {path: ['/admin/api/v1', '/main/api/v1', '/startup/api/v1'], target: 'http://172.168.1.245:8000'}, // 武哥
  {path: ['/api/kszitt'], target: 'http://localhost:8001'}, // 自己
  // {path: ['/admin/api/v1', '/main/api/v1', '/startup/api/v1'], target: 'http://apl.apluslabs.com.cn'},  // 测试
  { path: ['/admin/api/v1', '/main/api/v1', '/startup/api/v1'], target: 'https://oa.apluslabs.com'}  // 线上
];

module.exports = {
  ip: "localhost",
  port: 3000,
  proxy
};
