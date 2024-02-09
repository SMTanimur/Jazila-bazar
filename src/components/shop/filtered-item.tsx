import { Icons } from "../ui/icons";


interface Props {
  itemKey: string;
  itemValue: string;
  onClick: () => void;
}

export const FilteredItem = ({ itemKey, itemValue, onClick }: Props) => {
  return (
    <button
      className="group flex shrink-0 m-1 items-center border border-border rounded-lg text-[13px] px-2.5 py-1.5 capitalize text-gray-600 dark:text-gray-100 cursor-pointer transition duration-200 ease-in-out hover:border-primary"
      role="button"
      onClick={onClick}
    >
      {itemKey && itemValue}
      <Icons.close className="text-sm text-gray-400 w-4  ml-2 shrink-0  mt-0.5 transition duration-200 ease-in-out group-hover:text-gray-900" />
    </button>
  );
};
