import { useState, useEffect } from 'react';
import { RadioGroup } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { useCheckoutStore } from '@/store/checkout';


const deliveryDateSchedule = [
  'Sat, Jul 03, 2021',
  'Sun, Jul 04, 2021',
  'Mon, Jul 05, 2021',
  'Tus, Jul 06, 2021',
  'Wed, Jul 07 ,2021 ',
];
const deliveryTimeSchedule = ['9am to 10am', '3pm to 5pm', '6pm to 8pm'];

export default function Schedule() {
  const { delivery_time, setDeliveryTime } = useCheckoutStore();
  const [dateSchedule, setDateSchedule] = useState(deliveryDateSchedule[0]);
  const [timeSchedule, setTimeSchedule] = useState(deliveryTimeSchedule[0]);

  // Initialize from store if available
  useEffect(() => {
    if (delivery_time) {
      const parts = delivery_time.description?.split(' - ') || [];
      if (parts.length === 2) {
        setDateSchedule(parts[0]);
        setTimeSchedule(parts[1]);
      }
    }
  }, [delivery_time]);

  // Update store when selection changes
  useEffect(() => {
    const deliveryTimeString = `${dateSchedule} - ${timeSchedule}`;
    setDeliveryTime({
      id: `${dateSchedule}-${timeSchedule}`,
      title: 'Delivery Schedule',
      description: deliveryTimeString,
    });
  }, [dateSchedule, timeSchedule, setDeliveryTime]);
  function getDay(date: string) {
    const day = date.split(',');
    return day[0];
  }
  function getMonth(date: string) {
    const month = date.split(',');
    return month[1];
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900 px-4 py-6 rounded-lg shadow-sm">
      <div className="w-full mx-auto">
        <RadioGroup value={dateSchedule} onChange={setDateSchedule}>
          <RadioGroup.Label className="sr-only">
          
            Delivery Schedule
          </RadioGroup.Label>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {deliveryDateSchedule.map((date) => (
              <RadioGroup.Option
                key={date}
                value={date}
                className={({ active, checked }) =>
                  cn(
                    'relative rounded-lg px-5 py-3 cursor-pointer focus:outline-none',
                    checked ? 'bg-primary text-primary/10' : 'bg-gray-100'
                  )
                }
              >
                {({ checked }) => (
                  <div className="text-center">
                    <RadioGroup.Label
                      as="p"
                      className={`text-base font-semibold  ${
                        checked ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {getDay(date)}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className={`text-15px ${
                        checked ? 'text-white' : 'text-gray-500'
                      }`}
                    >
                      {getMonth(date)}
                    </RadioGroup.Description>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        {/* End of date schedule */}

        <RadioGroup
          className="mt-10"
          value={timeSchedule}
          onChange={setTimeSchedule}
        >
          <RadioGroup.Label className="sr-only">
     
            Delivery Schedule
          </RadioGroup.Label>
          <div className="flex flex-wrap justify-between grid-cols-2 gap-4 lg:grid sm:grid-cols-3 lg:grid-cols-5">
            {deliveryTimeSchedule.map((time) => (
              <RadioGroup.Option
                key={time}
                value={time}
                className="cursor-pointer focus:outline-none"
              >
                {({ active, checked }) => (
                  <div className="flex items-center">
                    <span
                      className={cn(
                        'flex w-6 h-6 rounded-full',
                        checked
                          ? 'border-[6px] border-primary'
                          : 'border-2 border-gray-200'
                      )}
                    />
                    <RadioGroup.Label
                      as="p"
                      className="text-sm text-black dark:text-white ml-2 "
                    >
                      {time}
                    </RadioGroup.Label>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        {/* End of time schedule */}
      </div>
    </div>
  );
}
