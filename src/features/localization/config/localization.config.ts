import { NstackInstance } from "@nstack-io/javascript-sdk";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { ENV } from "@app/constants/env";

import { DEFAULT_NS, INITIAL_LANG } from "../constants/localization.constants";
import { NSTACK_ENV } from "../constants/localization.env";

export const nstackClient =
  (NSTACK_ENV.NSTACK_APP_ID &&
    NSTACK_ENV.NSTACK_API_KEY &&
    new NstackInstance({
      appId: NSTACK_ENV.NSTACK_APP_ID,
      apiKey: NSTACK_ENV.NSTACK_API_KEY,
      version: ENV.VERSION,
      initialLanguage: INITIAL_LANG,
      meta: `web;${ENV.NODE_ENV}`,
    })) ||
  undefined;

i18next.use(initReactI18next).init({
  fallbackLng: INITIAL_LANG,
  lng: INITIAL_LANG,
  interpolation: {
    escapeValue: false,
  },
  defaultNS: DEFAULT_NS,
  resources: {
    // TODO: Move translation to nstack
    "en-EN": {
      translation: {
        default: {
          notFoundTitle: "404 - Not found",
          notFoundText: "The page you were looking for was not found.",
          notFoundBackHomeButton: "Go to home",
          restrictAccessTitle: "Access denied",
          restrictAccessText:
            "Sorry! You don't have necessary permission to access this page!",
          columnAction: "Action",
          deleteTitle: "Delete",
          confirmDeleteTitle: "Are you sure to delete this?",
          confirmDeleteYes: "Yes",
          confirmDeleteNo: "No",
          duplicateTitle: "Duplicate",
          editTitle: "Edit",
          saveTitle: "Save",
          cancelTitle: "Cancel",
          okTitle: "Ok",
          moreTitle: "More",
          apply: "Apply",
          reset: "Reset",
          unsavedChangesTitle: "Are you sure you want to leave?",
          unsavedChangesText:
            "You have unsaved changes in the form, if you close it the changes will be discarded.",
          unsavedChangesCancelTitle: "Keep editing",
          unsavedChangesConfirmTitle: "Leave",
          inputErrorRequired: "Required field",
        },
        auth: {
          loginTitle: "Sign in",
          inputEmailLabel: "Email",
          inputPasswordLabel: "Password",
          inputConfirmPasswordLabel: "Confirm password",
          loginButton: "Sign in",
          logout: "Log out",
          messageSuccess: "Sign in success",
          messageError: "Sign in failed",
          signupTitle: "Sign up",
          signupButton: "Sign up",
          signupMessageSuccess: "Sign up success",
          signupMessageError: "Sign up failed",
        },
        home: {
          navigationTitle: "Home",
          title: "Home",
          text: "Content",
        },
        settings: {
          navigationTitle: "Settings",
          groupUsersSettings: "Manage roles",
        },
        settingsProjects: {
          navigationTitle: "Projects",
          title: "Projects",
          text: "Content",
        },
        settingsUsers: {
          navigationTitle: "Users",
          title: "Users",
          text: "Content",
          columnName: "Name",
          columnLastName: "Last Name",
          editUserTitle: "Edit user",
          addUserTitle: "Add user",
          buttonAddUser: "Add user",
          menuDuplicate: "Duplicate user",
          editUserRole: "Edit user role",
          buttonUserRole: "change role",
          filterSearchLabel: "Search",
          filterDatesLabel: "Dates",
          filterNameLabel: "Name",
          filterNamePlaceholder: "Select name",
          filterHasEmailLabel: "Has e-mail",
          inputFirstNameLabel: "First name",
          inputFirstNamePlaceholder: "Enter first name...",
          inputLastNameLabel: "Last name",
          inputLastNamePlaceholder: "Enter last name...",
        },
        donations: {
          navigationTitle: "Donations",
          title: "Donations requests",
          text: "Content",
          columnName: "Name",
          columnLastName: "Last Name",
          columnReason: "Reason",
          columnAmount: "Amount",
          columnRegion: "Region",
          columnStatus: "Status",
          editDonationsTitle: "Edit donations",
          addDonationsTitle: "Add donations",
          buttonAddDonations: "Add donations",
          buttonApprove: "Approve",
          buttonReject: "Reject",
          menuDuplicate: "Duplicate donations",
          editDonationsRole: "Edit donations role",
          buttonDonationsRole: "change role",
          filterSearchLabel: "Search",
          filterDatesLabel: "Dates",
          filterNameLabel: "Name",
          filterNamePlaceholder: "Select name",
          filterRegionLabel: "Region",
          filterAmountLabel: "Filter By Amount",
          filterReasonLabel: "Filter By Reason",
          inputFirstNameLabel: "First name",
          inputFirstNamePlaceholder: "Enter first name...",
          filterRegionPlaceholder: "Select region",
          filterAmountPlaceholder: "Select amount",
          inputLastNameLabel: "Last name",
          inputLastNamePlaceholder: "Enter last name...",
        },
        settingsVolunteer: {
          navigationTitle: "Volunteer",
          title: "Volunteer",
          text: "Content",
        },
      },
    },
  },
});

export default i18next;
