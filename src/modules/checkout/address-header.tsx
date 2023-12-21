import { Icons } from "@/components/ui/icons";


interface AddressHeaderProps {
  count: number | boolean;
  label: string;
  onAdd: () => void;
}

export const AddressHeader: React.FC<AddressHeaderProps> = ({
  onAdd,
  count,
  label,
}) => {
  return (
    <div className="mb-5 flex items-center justify-between md:mb-8">
      <div className="flex items-center space-x-3  md:space-x-4">
        {count && (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-base text-white lg:text-xl">
            {count}
          </span>
        )}
        <p className="text-lg capitalize text-heading lg:text-xl">{label}</p>
      </div>
      {onAdd && (
        <button
          className="flex items-center text-sm font-semibold text-primary transition-colors duration-200 hover:text-primary focus:text-primary focus:outline-0"
          onClick={onAdd}
        >
          <Icons.plus className="h-4 w-4 stroke-2 mr-0.5 " />
         Add
        </button>
      )}
    </div>
  );
};
