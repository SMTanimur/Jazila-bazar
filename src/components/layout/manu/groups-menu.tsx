
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import * as groupIcons from '@/components/icons/groups';
import { usePathname } from 'next/navigation';

import { IType } from '@/types';
import { cn } from '@/lib/utils';
import Scrollbar from '@/components/ui/scrollbar';
import Link from 'next/link';
import { useTypes } from '@/hooks/api/type/useGetTypes';
import { useIsHomePage } from '@/hooks/use-is-homepage';
import { Icons } from '@/components/ui/icons';
import { getIcon } from '@/lib/get-icon';
import { CaretDown } from '@/components/icons/caret-down';


interface GroupsMenuProps {
  className?: string;
  groups?: IType[];
  defaultGroup?: IType;
  variant?: 'colored' | 'minimal';
}

const GroupsMenu: React.FC<GroupsMenuProps> = ({
  className,
  groups,
  defaultGroup,
  variant = 'colored',
}) => {
  const pathname = usePathname()
  const selectedMenu =
    groups?.find((type) => pathname.includes(type?.slug)) ?? defaultGroup;
  return (
    <Menu
      as="div"
      className="relative inline-block text-left rtl:text-right"
    >
      <Menu.Button
        className={cn(
          'flex h-11 shrink-0 items-center text-sm font-semibold text-heading focus:outline-0 md:text-base xl:px-4',
          {
            'rounded-lg border border-gray-500 bg-gray-50 px-3':
              variant === 'minimal',
            'rounded border-gray-400 bg-white xl:min-w-150 xl:border xl:text-primary':
              variant === 'colored',
          },
          className
        )}
      >
        {({ open }) => (
          <>
            {variant === 'colored' && selectedMenu?.icon && (
              <span className="flex h-5 w-5 items-center justify-center mr-2 rtl:ml-2">
                {getIcon({
                  iconList: groupIcons,
                  iconName: selectedMenu?.icon,
                  className: 'max-h-full max-w-full',
                })}
              </span>
            )}
            <span className="whitespace-nowrap">{selectedMenu?.name}</span>
            <span className="flex pt-1 ml-auto pl-2.5 mr-auto pr-2.5">
              {variant === 'colored' && (
                <CaretDown
                  className={open ? 'rotate-180 transform' : undefined}
                />
              )}

              {variant === 'minimal' && (
                <Icons.arrowDown
                  className={cn('h-3 w-3', {
                    'rotate-180 transform': open,
                  })}
                />
              )}
            </span>
          </>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className={cn(
            'absolute mt-2 h-56 max-h-56 min-h-40 w-48 overflow-hidden rounded bg-white py-2 shadow-700 focus:outline-none focus-visible:outline-0 sm:max-h-72 lg:h-72 2xl:h-auto 2xl:max-h-screen',
            {
              'border border-gray-200 right-0 origin-top-right left-0 rtl:origin-top-left':
                variant === 'minimal',
              'right-0 origin-top-right rtl:left-0 rtl:origin-top-left xl:right-auto xl:left-0 xl:origin-top-left rtl:xl:left-auto rtl:xl:right-0 rtl:xl:origin-top-right':
                variant !== 'minimal',
            }
          )}
        >
          <Scrollbar
            className="h-full w-full"
            options={{
              scrollbars: {
                autoHide: 'never',
              },
            }}
          >
            {groups?.map(({ _id, name, slug, icon }) => (
              <Menu.Item key={_id}>
                {({ active }) => (
                  // FIX: Add ref to Link component
                  <div>
                    <Link
                      href={`/${slug}`}
                      className={cn(
                        'flex w-full items-center space-x-4 px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-primary focus:outline-0 focus-visible:outline-0 rtl:space-x-reverse',
                        active ? 'text-primary' : 'text-gray-800'
                      )}
                    >
                      {icon && variant === 'colored' && (
                        <span className="flex h-5 w-5 items-center justify-center">
                          {getIcon({
                            iconList: groupIcons,
                            iconName: icon,
                            className: 'max-h-full max-w-full',
                          })}
                        </span>
                      )}
                      <span>{name}</span>
                    </Link>
                  </div>
                )}
              </Menu.Item>
            ))}
          </Scrollbar>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

type GroupsDropdownMenuProps = {
  variant?: 'colored' | 'minimal';
};

const GroupsDropdownMenu: React.FC<GroupsDropdownMenuProps> = ({ variant }) => {
  const { types }: any = useTypes({
    limit: 15,
  });
  //FIXME: remove this
  const { homePage }: any = useIsHomePage();
  return (
    <GroupsMenu groups={types} defaultGroup={homePage} variant={variant} />
  );
};

export default GroupsDropdownMenu;
