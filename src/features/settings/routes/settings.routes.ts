import { PermissionEnum } from "@app/features/permissions/permissions";
import { RouteItemDef } from "@app/types/route.types";

import { SettingsPathsEnum } from "../constants/settings.paths";
import UsersScreen from "../screens/UsersScreen/UsersScreen";
import VolunteersScreen from "../screens/VolunteersScreen/VolunteersScreen";
import SettingsRoutes from "./SettingsRoutes";

const SETTINGS_SCREEN: RouteItemDef = {
  id: "settings",
  path: SettingsPathsEnum.SETTINGS,
  navigationTitle: "settings.navigationTitle",
  component: SettingsRoutes,
  nestedRoutes: [
    /**
     * A group of screens
     * - group title
     * - nested routes
     */
    {
      id: "admin-settings",
      groupTitle: "settings.groupUsersSettings",
      nestedRoutes: [
        {
          id: "volunteer",
          path: SettingsPathsEnum.VOLUNTEER,
          navigationTitle: "settingsVolunteer.navigationTitle",
          component: VolunteersScreen,
          permissions: [PermissionEnum.USERS_READ],
        },
        {
          id: "users",
          path: SettingsPathsEnum.USERS,
          navigationTitle: "settingsUsers.navigationTitle",
          component: UsersScreen,
          permissions: [PermissionEnum.USERS_READ],
        },
      ],
    },
  ],
};

export const SETTINGS_ROUTES = [SETTINGS_SCREEN];
