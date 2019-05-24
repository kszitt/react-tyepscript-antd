import {History, Location} from 'history';
import { match } from "react-router";

export interface RouteProps {
  history: History,
  location: Location,
  match: match,
}
