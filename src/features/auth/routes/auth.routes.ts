import BlankLayout from "@app/components/layouts/BlankLayout/BlankLayout";
import { RouteItemDef } from "@app/types/route.types";

import { AuthPathsEnum } from "../constants/auth.paths";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import SignupScreen from "../screens/SignupScreen/SignupScreen";

const LOGIN_SCREEN: RouteItemDef = {
  id: "login",
  path: AuthPathsEnum.LOGIN,
  component: LoginScreen,
  navigationTitle: "auth.loginTitle",
  layout: BlankLayout,
};

const SIGNUP_SCREEN: RouteItemDef = {
  id: "signup",
  path: AuthPathsEnum.SIGNUP,
  component: SignupScreen,
  navigationTitle: "auth.signupTitle",
  layout: BlankLayout,
};

export const AUTH_ROUTES = [LOGIN_SCREEN, SIGNUP_SCREEN];
