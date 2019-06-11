import {History, Location} from 'history';
import { match } from "react-router";
import {Dispatch} from 'redux'
import {UserState} from "@store/actions/user"

export interface RouteProps {
  history: History;
  location: Location;
  match: match;
  dispatch?: Dispatch;
  User?: UserState
}
