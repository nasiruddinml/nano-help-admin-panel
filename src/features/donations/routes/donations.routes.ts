import { PermissionEnum } from "@app/features/permissions/permissions";
import { RouteItemDef } from "@app/types/route.types";

import { DonationsPathsEnum } from "../constants/donations.paths";
import DonationsScreen from "../screens/DonationsScreen/DonationsScreen";

const DONATIONS_SCREEN: RouteItemDef = {
  id: "home",
  path: DonationsPathsEnum.DONATIONS,
  navigationTitle: "donations.navigationTitle",
  component: DonationsScreen,
  permissions: [PermissionEnum.DASHBOARD],
};

export const DONATIONS_ROUTES = [DONATIONS_SCREEN];
