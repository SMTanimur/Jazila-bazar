// components/ProgressBar.js
import React from 'react';
import { useSpring, animated } from 'react-spring';


const ProgressBar = ({ quantity }:any) => {
    const percentage = (quantity / 15) * 100;

    const { snake } = useSpring({
      from: { snake: 3 },
      to: { snake: percentage },
      config: { duration: 1000 },
    });
    // const { barWidth, warningOpacity } = useSpring({
    //     barWidth: `${percentage}%`,
    //     warningOpacity: quantity < 15 ? 1 : 0,
    //     config: { duration: 1000 },
    //   });
    return (
      <div className="relative bg-gray-300 h-8 rounded-lg overflow-hidden">
        <animated.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-500 via-transparent"
          style={{
            width: snake.interpolate((s) => `${s}%`),
          }}
        />
        {quantity < 15 && (
          <div className="absolute inset-0 flex items-center justify-center">
          
            <span className="ml-2 text-red-500">Low stock! Only {quantity} left.</span>
          </div>
        )}
      </div>
    );

};

export default ProgressBar;