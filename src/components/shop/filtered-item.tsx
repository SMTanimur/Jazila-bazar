import { Icons } from "../ui/icons";


interface Props {
  itemKey: string;
  itemValue: string;
  onClick: () => void;
}

export const FilteredItem = ({ itemKey, itemValue, onClick }: Props) => {
  return (
    <div
      className="group flex shrink-0 m-1 items-center border border-border-base rounded-lg text-13px px-2.5 py-1.5 capitalize text-black cursor-pointer transition duration-200 ease-in-out hover:border-brand"
      onClick={onClick}
    >
      {itemKey && itemValue}
      <Icons.close className="text-sm text-body  mr-2 shrink-0  -ml-0.5 mt-0.5 transition duration-200 ease-in-out group-hover:text-heading" />
    </div>
  );
};
