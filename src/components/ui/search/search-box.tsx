import { cn } from '@/lib/utils';
import { InputHTMLAttributes } from 'react';
import { Icons } from '../icons';


export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label: string;
  variant?: 'minimal' | 'normal' | 'with-shadow' | 'flat';
  onSubmit: (e: any) => void;
  onClearSearch: (e: any) => void;
}

const classes = {
  normal:
    'bg-light pl-6 pr-6 pr-14 rtl:pl-14 rounded-tr-none rtl:rounded-tl-none rounded-br-none rtl:rounded-bl-none  border border-r-0 rtl:border-l-0 border-transparent focus:border-accent',
  minimal:
    'search-minimal bg-gray-100 pl-10 rtl:pr-10 pr-4 rtl:pl-4 md:pl-14 rtl:md:pr-14 border border-transparent focus:border-accent focus:bg-light',
  flat: 'bg-white pl-10 rtl:pr-10 pr-4 rtl:pl-4 md:pl-14 rtl:md:pr-14 border-0',
  'with-shadow':
    'search-with-shadow bg-light pl-10 rtl:pr-10 pr-12 rtl:pl-12 md:pl-14 rtl:md:pr-14 focus:bg-light border-0',
};

const SearchBox: React.FC<Props> = ({
  className,
  label,
  onSubmit,
  onClearSearch,
  variant = 'normal',
  value,
  ...rest
}) => {

  return (
    <form onSubmit={onSubmit} className={cn('w-full', className)}>
      <div
        className={cn('relative flex rounded md:rounded-lg', {
          'h-14 shadow-900': variant === 'normal',
          'h-11 md:h-12': variant === 'minimal',
          'h-auto !rounded-none': variant === 'flat',
          'h-16 shadow-downfall': variant === 'with-shadow',
        })}
      >
        <label htmlFor={label} className="sr-only">
          {label}
        </label>

        <input
          id={label}
          type="text"
          value={value}
          autoComplete="off"
          className={cn(
            'focus:ring-primary item-center flex h-full w-full appearance-none overflow-hidden truncate rounded-lg text-sm text-stone-200 placeholder-gray-500 transition duration-300 ease-in-out focus:outline-0 focus:ring-1',
            {
              'placeholder:text-slate-400': variant === 'flat',
            },
            classes[variant]
          )}
          {...rest}
        />
        {value && (
          <button
            type="button"
            onClick={onClearSearch}
            className={cn(
              'absolute flex h-full w-10 cursor-pointer items-center justify-center text-gray-400 transition-colors duration-200 hover:text-primary/80 focus:text-primary/80 focus:outline-0 md:w-14',
              {
                'right-36 rtl:left-36': variant === 'normal',
                'right-0 rtl:left-0': variant !== 'normal',
              }
            )}
          >
            <span className="sr-only">close</span>
            <Icons.close className="h-3.5 w-3.5 md:h-3 md:w-3" />
          </button>
        )}

        {variant === 'normal' ? (
          <button className="flex h-full min-w-[143px] items-center justify-center rounded-r-xl bg-primary px-8 font-semibold text-white transition-colors duration-200 hover:bg-primary/80 focus:bg-primary/80 focus:outline-0  ">
            <Icons.search className="h-4 w-4 mr-2.5 rtl:ml-2.5" />
            search
          </button>
        ) : (
          <button className="absolute flex h-full w-10 items-center justify-center  transition-colors duration-200 hover:text-primary/60 focus:text-primary/80 focus:outline-0 left-0 right-0 md:w-14">
            <span className="sr-only">search</span>
            <Icons.search className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBox;
