import { Table } from "antd";
import { useTranslation } from "react-i18next";

import Button from "@app/components/atoms/Button/Button";
import TableView, {
  TableViewProps,
} from "@app/components/molecules/TableView/TableView";
import useSearchParams from "@app/hooks/useSearchParams";
import { useAppSelector } from "@app/redux/store";

import { DonationDef } from "../../../../types/donations.types";

interface DonationsTableProps extends TableViewProps<DonationDef> {
  onAdd?: () => void;
  statusApprove?: (donation: DonationDef) => void;
  statusReject?: (donation: DonationDef) => void;
}

export enum DonationActionMenuEnum {
  DUPLICATE = "duplicate",
}

const DonationsTable = ({
  onAdd,
  statusApprove,
  statusReject,
  ...props
}: DonationsTableProps) => {
  const { t } = useTranslation();
  const { donations, loading, pagination } = useAppSelector(state => ({
    donations: state.donations.donations,
    loading: state.donations.loading,
    pagination: state.donations.pagination,
  }));
  const { getOrderByDirection } = useSearchParams();

  return (
    <TableView
      dataSource={donations}
      loading={loading}
      actionTitle={t("default.columnAction")}
      pagination={{
        ...pagination,
        showSizeChanger: true,
        pageSizeOptions: ["6", "8", "10", "15", "25"],
      }}
      title={() => (
        <Button type="primary" onClick={onAdd}>
          {t("donations.buttonAddDonations")}
        </Button>
      )}
      extraActions={(donation: DonationDef) => [
        <Button key={donation.id} onClick={() => statusApprove?.(donation)}>
          {t("donations.buttonApprove")}
        </Button>,
        <Button key={donation.id} onClick={() => statusReject?.(donation)}>
          {t("donations.buttonReject")}
        </Button>,
      ]}
      {...props}
    >
      <Table.Column
        title={t("donations.columnName")}
        key="first_name"
        dataIndex="first_name"
        render={(firstName: DonationDef["first_name"]) => firstName}
        sorter
        sortOrder={getOrderByDirection("name")}
      />
      <Table.Column
        title={t("donations.columnLastName")}
        key="last_name"
        dataIndex="last_name"
        render={(lastName: DonationDef["last_name"]) => lastName}
        sorter
        sortOrder={getOrderByDirection("last_name")}
      />
      <Table.Column
        title={t("donations.columnReason")}
        key="reason"
        dataIndex="reason"
        render={(reason: DonationDef["reason"]) => reason}
        sorter
        sortOrder={getOrderByDirection("reason")}
      />
      <Table.Column
        title={t("donations.columnAmount")}
        key="amount"
        dataIndex="amount"
        render={(amount: DonationDef["amount"]) => amount}
        sorter
        sortOrder={getOrderByDirection("amount")}
      />
      <Table.Column
        title={t("donations.columnRegion")}
        key="region"
        dataIndex="region"
        render={(region: DonationDef["region"]) => region}
        sorter
        sortOrder={getOrderByDirection("region")}
      />
      <Table.Column
        title={t("donations.columnStatus")}
        key="status"
        dataIndex="status"
        render={(status: DonationDef["status"]) => status}
        sorter
        sortOrder={getOrderByDirection("status")}
      />
    </TableView>
  );
};

export default DonationsTable;
