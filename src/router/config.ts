import {lazy, LazyExoticComponent} from 'react'

export interface RouteObj {
  path: string;
  component: LazyExoticComponent<any>;
  exact?: boolean;
}
interface Routes extends RouteObj {
  routes?: RouteObj[];
}


const Config: Routes[] = [
  {
    path: "/login",
    component: lazy(() => import("@components/login/login")),
  },{
    path: "/404",
    component: lazy(() => import("@components/404/404")),
  },{
    path: "/",
    component: lazy(() => import("@components/main/main")),
    routes: [
      {
        path: "/",
        component: lazy(() => import("@components/home/home")),
      }
    ]
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
