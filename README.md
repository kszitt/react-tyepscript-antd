## 技术栈
- react
- typescript
- redux
- antd
- 按需加载
- http代理

## 启动
``` json
 npm install
```
#### 开发模式
``` json
 npm run dev        // 启动服务
```
#### 生产模式
``` json
 npm run prod       // 启动服务
 npm run build      // 打包
```

## 配置
#### IP,PORT
`config.js`中配置
#### 代理
`config.js`中，`proxy`配置代理规则
#### 路由
`src/router/config.ts`中，添加自己的页面
#### 登录可见页面
`src/router/router.tsx`中，对应位置添加`<ComponentByUser Component={组件} props={{...props}}/>`
