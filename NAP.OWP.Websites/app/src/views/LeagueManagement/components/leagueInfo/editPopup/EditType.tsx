import { TDataSource } from "../table/TableType";

type TOption = {
  value: number;
  label: string | null;
};

type TProps = {
  data: TDataSource;
}

export { TOption, TProps };