import { memo, useEffect } from "react";

import { Col, Input } from "antd";
import _toNumber from "lodash/toNumber";
import { useTranslation } from "react-i18next/";

import { Item, useForm } from "@app/components/atoms/Form/Form";
import FormModal from "@app/components/atoms/FormModal/FormModal";
import { ItemModalEnum } from "@app/constants/route.constants";
import { getDonationById } from "@app/features/donations/donations";
import useShowModal from "@app/hooks/useShowModal";
import { useAppDispatch, useAppSelector } from "@app/redux/store";

import { DonationDef } from "../../../../types/donations.types";

interface DonationsModalProps {
  onClose: () => void;
  onSubmitted: () => void;
}

const DonationsModal = memo(({ onClose, onSubmitted }: DonationsModalProps) => {
  // Hooks
  const { t } = useTranslation();
  const { showModal, action, entryId } = useShowModal();
  const [form] = useForm<DonationDef>();
  const dispatch = useAppDispatch();
  const { donation, loading } = useAppSelector(state => ({
    donation: state.donations.donation,
    loading: state.donations.loading,
  }));

  // Constants
  const donationId = _toNumber(entryId);
  const editMode = action === ItemModalEnum.EDIT;

  useEffect(() => {
    if (showModal) {
      if (editMode && donationId) {
        dispatch(getDonationById(donationId));
      }
    }
  }, [showModal, editMode, donationId, dispatch]);

  const handleClose = () => onClose();

  const handleFinish = (values: Partial<DonationDef>) => {
    // TODO: Create / Update user
    // eslint-disable-next-line no-console
    console.log(values);
    onSubmitted();
  };

  const getFormValues = () => donation;

  return (
    <FormModal
      title={
        editMode
          ? t("settingsUsers.editUserTitle")
          : t("settingsUsers.addUserTitle")
      }
      visible={showModal}
      onClose={handleClose}
      onFinish={handleFinish}
      form={form}
      values={getFormValues()}
      destroyOnClose
      loadingContent={loading}
    >
      <Col span={24}>
        <Item name="first_name" label={t("donations.inputFirstNameLabel")}>
          <Input
            type="text"
            placeholder={t("donations.inputFirstNamePlaceholder")}
          />
        </Item>
      </Col>
      <Col span={24}>
        <Item name="last_name" label={t("donations.inputLastNameLabel")}>
          <Input
            type="text"
            placeholder={t("donations.inputLastNamePlaceholder")}
          />
        </Item>
      </Col>
    </FormModal>
  );
});

export default DonationsModal;
