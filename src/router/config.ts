import {lazy, LazyExoticComponent} from 'react'

export interface RouteObj {
  path: string;
  name: string;
  icon?: string;
  component: LazyExoticComponent<any>;
  exact?: boolean;
}
interface Routes extends RouteObj {
  routes?: RouteObj[];
}


const Config: Routes[] = [
  {
    path: "/",
    name: "首页",
    component: lazy(() => import("@components/main/main")),
    routes: [
      {
        path: "/",
        name: "首页",
        icon: "icon-shouye",
        component: lazy(() => import("@components/home/home")),
      }
    ]
  },{
    path: "/login",
    name: "登录",
    component: lazy(() => import("@components/login/login")),
  },{
    path: "/404",
    name: "404",
    component: lazy(() => import("@components/404/404")),
  }
];

function handle(routes:Routes, parentRoute:Routes){
  if(!routes) return;

  if(!eval(`/^${parentRoute.path.replace(/\//g, "\\/").replace(/\*/g, "\\*")}/`).test(routes.path)){
    routes.path = parentRoute.path + routes.path;
  }
  routes.exact = !(routes.routes && routes.routes.length > 0);
  if(!routes.routes) return;

  routes.routes.forEach(item => {
    handle(item, routes);
  });
}
Config.forEach(item => {
  handle(item, item);
});

export default Config;
