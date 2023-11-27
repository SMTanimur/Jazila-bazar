import Rate from 'rc-rate';
import { RateProps } from 'rc-rate/es/Rate';
import 'rc-rate/assets/index.css';
import { Controller } from 'react-hook-form';

interface RateInputProps extends RateProps {
  control: any;
  name: string;
}

const RateInput = ({ control, name, ...rateProps }: RateInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, ...rest } }) => (
        <Rate {...rest} {...rateProps} />
      )}
    />
  );
};

export default RateInput;
