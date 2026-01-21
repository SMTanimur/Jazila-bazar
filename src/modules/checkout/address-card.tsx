import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { IAddress } from "@/types";

interface AddressProps {
  address: IAddress;
  checked: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  userId?: any;
}

const AddressCard: React.FC<AddressProps> = ({
  checked,
  address,
  userId,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className={cn(
        "group relative cursor-pointer rounded-lg border-2 p-5 transition-all hover:border-primary hover:shadow-md",
        {
          "border-primary bg-primary/5 dark:bg-primary/10 shadow-sm": checked,
          "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800": !checked,
        }
      )}
    >
      {/* Action buttons - visible on hover */}
      <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {onEdit && (
          <button
            className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            aria-label="Edit address"
          >
            <Icons.edit className="h-3.5 w-3.5" />
          </button>
        )}
        {onDelete && (
          <button
            className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            aria-label="Delete address"
          >
            <Icons.close className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Address content */}
      <div className="flex flex-col gap-4 pr-8">
        <div className="text-lg font-bold text-gray-900 dark:text-white">
          {address?.name}
        </div>

        <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-400">
          <div>{address.country}</div>
          <div>{`${address.postcode}, ${address.city}`}</div>
          <div>{address.street}</div>
          {address.state && <div>{address.state}</div>}
        </div>

        <div className="flex flex-col gap-1 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Phone Number
          </div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            {address.phone}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Email Address
          </div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            {address.email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
