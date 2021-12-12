import { useCallback, useEffect } from "react";

import { useTranslation } from "react-i18next";

import ContentLayout from "@app/components/layouts/ContentLayout/ContentLayout";
import * as modalAction from "@app/helpers/modal.helper";
import useSearchParams from "@app/hooks/useSearchParams";
import { useAppDispatch } from "@app/redux/store";

import { getDonations } from "../../redux/donations.slice";
import { DonationDef } from "../../types/donations.types";
import DonationsFilter, {
  DonationsFilterProps,
} from "./components/DonationsFilter/DonationsFilter";
import DonationsModal from "./components/DonationsModal/DonationsModal";
import DonationsTable from "./components/DonationsTable/DonationsTable";

const DonationsScreen = () => {
  const { t } = useTranslation();
  const { search, updateSearchParams } =
    useSearchParams<DonationsFilterProps>();
  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    dispatch(getDonations({ page: search?.page, per_page: search?.pageSize }));
  }, [dispatch, search?.page, search?.pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCloseModal = () => updateSearchParams(modalAction.close());

  const handleSubmittedModal = () => {
    fetchData();
    handleCloseModal();
  };

  const statusReject = (donation: DonationDef) => {
    // TODO: API to duplicate donation
    // eslint-disable-next-line no-console
    console.log("reject donation", donation);
  };

  const statusApprove = (donation: DonationDef) => {
    // TODO: API to duplicate donation
    // eslint-disable-next-line no-console
    console.log("approve donation", donation);
  };

  return (
    <ContentLayout
      header={{ title: t("donations.title") }}
      filters={<DonationsFilter />}
    >
      <DonationsTable
        statusApprove={statusApprove}
        statusReject={statusReject}
      />

      {/* Modal to Create / Edit User */}
      <DonationsModal
        onClose={handleCloseModal}
        onSubmitted={handleSubmittedModal}
      />
    </ContentLayout>
  );
};

export default DonationsScreen;
