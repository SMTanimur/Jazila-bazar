
import cn from 'classnames';
import { Icons } from './icons';

type RatingProps = {
  className?: any;
  rating: number | undefined;
  totalRating?: number | undefined;
  variant?: 'xs' | 'small' | 'large';
  boxed?: boolean;
};

const RatingsBadge: React.FC<RatingProps> = ({
  className = '',
  rating,
  totalRating,
  variant = 'small',
  boxed,
  ...props
}) => {
  return (
    <div className=' flex items-center gap-6'>
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-xl bg-primary text-white',
        {
          'px-2 py-[3px] text-sm': variant === 'xs',
          'px-2 py-1 text-base': variant === 'small',
          'px-4 py-1 text-3xl font-semibold': variant === 'large',
          '!rounded': boxed,
        },
        className
      )}
      {...props}
    >
      {rating}
      <Icons.starIcon
        className={cn({
          'h-2.5 w-2.5 ': variant === 'xs',
          'h-3 w-3 ': variant === 'small',
          'h-6 w-6  ': variant === 'large',
        })}
      />
    </span>

    <p className="text-lg mb-4" >{totalRating} Overall Rating</p>
    </div>
  );
};

export default RatingsBadge;
