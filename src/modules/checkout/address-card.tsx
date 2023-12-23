import { CardContent } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { IAddress } from "@/types";


interface AddressProps {
  address: IAddress
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
        'group relative cursor-pointer rounded border p-4 hover:border-primary',
        {
          'border-primary shadow-sm': checked,
          'border-transparent bg-gray-100': !checked,
        }
      )}
    >
      
      <CardContent className='flex flex-col gap-3 p-6 min-h-[350px] '>
        <div className='text-gray-800 dark:text-white font-bold'>{address?.name}</div>
        <div className='flex text-gray-500 text-lg'>
          {address.country}

          <br />
          {`${address.postcode}, ${address.city}`}
          <br />
          {address.street}
        </div>
        <div className='flex flex-col  '>
          <div className='text-lg text-gray-500 '>
            <span>Phone Number</span>
          </div>
          <div className='text-lg text-gray-500  font-bold'>
            {address.phone}
          </div>
        </div>
        <div className='flex flex-col '>
          <div className='text-lg text-gray-600'>
            <span>Email Address</span>
          </div>
          <div className='text-lg text-gray-500  font-bold'>
            {address.email}
          </div>
        </div>

      
      </CardContent>
      <div className="absolute top-4 flex space-x-2 opacity-0 group-hover:opacity-100 right-4  ">
        {onEdit && (
          <button
            className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white"
            onClick={onEdit}
          >
            <span className="sr-only">Edit</span>
            <Icons.edit className="h-3 w-3" />
          </button>
        )}
        {onDelete && (
          <button
            className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white"
            onClick={onDelete}
          >
            <span className="sr-only">Delete</span>
            <Icons.close className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
