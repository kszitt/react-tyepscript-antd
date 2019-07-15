import {lazy, LazyExoticComponent} from 'react'

interface Router {
  path: string;
  component: LazyExoticComponent<any>;
  exact?: boolean;
}



const Config: Router[] = [
  {
    path: "/",
    component: lazy(() => import("@components/home/home")),
  },
  {
    path: "/about",
    component: lazy(() => import("@components/about/about")),
  },
  {
    path: "/login",
    component: lazy(() => import("@components/login/login")),
  },
  {
    path: "/python",
    component: lazy(() => import("@components/python/python")),
  },
];

export default Config;
