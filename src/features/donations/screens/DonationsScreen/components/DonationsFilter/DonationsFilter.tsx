import { memo } from "react";

import { Select, Slider, DatePicker } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";

import DebouncedInput from "@app/components/atoms/DebouncedInput/DebouncedInput";
import PageFilter, {
  FilterItem,
} from "@app/components/molecules/PageFilter/PageFilter";
import { useAppSelector } from "@app/redux/store";

const { Option } = Select;
const { RangePicker } = DatePicker;

export interface DonationsFilterProps {
  dates?: [moment.Moment, moment.Moment];
  name?: string;
  region?: string;
  amount?: number;
}

const DonationsFilter = () => {
  const { t } = useTranslation();
  const { donations, loading } = useAppSelector(state => ({
    donations: state.donations.donations,
    loading: state.donations.loading,
  }));

  return (
    <PageFilter<DonationsFilterProps>
      showSubmitButton
      showResetButton
      parseDates
      parseNumbers={["name"]}
    >
      <FilterItem label={t("donations.filterSearchLabel")} name="search">
        {/* Remove `showSubmitButton` to see the difference */}
        <DebouncedInput wait={500} />
      </FilterItem>
      <FilterItem label={t("donations.filterDatesLabel")} name="dates">
        <RangePicker />
      </FilterItem>
      <FilterItem label={t("donations.filterNameLabel")} name="name">
        {donations.length && (
          <Select
            placeholder={t("donations.filterNamePlaceholder")}
            allowClear
            loading={loading}
          >
            {donations.map(donation => (
              <Option key={donation.id} value={donation.id}>
                {donation.first_name} {donation.last_name}
              </Option>
            ))}
          </Select>
        )}
      </FilterItem>
      <FilterItem label={t("donations.filterAmountLabel")} name="amount">
        <Slider range defaultValue={[20, 50]} />
      </FilterItem>
      <FilterItem label={t("donations.filterRegionLabel")} name="region">
        {donations.length && (
          <Select
            placeholder={t("donations.filterRegionPlaceholder")}
            allowClear
            loading={loading}
          >
            {donations?.map(donation => (
              <Option key={donation.id} value={donation.region}>
                {donation.region}
              </Option>
            ))}
          </Select>
        )}
      </FilterItem>
    </PageFilter>
  );
};

export default memo(DonationsFilter);
