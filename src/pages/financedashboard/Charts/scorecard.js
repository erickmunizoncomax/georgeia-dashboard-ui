// ScoreCard.js
import React from 'react';

const ScoreCard = ({ title, currentPeriod, lastYear, percentageChange, arrowColor }) => {
  return (
    <div className="relative">
      <div className="score w-full">
        <div className="text-[#fff] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-normal">{title}</div>
        <div className="mt-[4px] xl:mt-[4px] 3xl:mt-[0.208vw] flex justify-between">
          <div>
            <div className="text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-normal text-[#fff] leading-none">Current Period</div>
            <div className="text-[15px] xl:text-[20px] 3xl:text-[30px] text-[#fff] font-normal leading-none mt-[5px] 3xl:mt-[0.26vw]">{currentPeriod}</div>
          </div>
          <div>
            <div className="text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-normal invisible leading-none">Current Period</div>
            <div className="flex gap-[16px]">
              <div>
                <div className="text-[#fff] text-[12px] xl:text-[12px] 3xl:text-[0.625vw]">Last Year</div>
                <div className="text-[#fff] text-[12px] xl:text-[12px] 3xl:text-[0.625vw]">{lastYear}</div>
              </div>
              <div className="flex items-end">
                <div className={`bg-[${arrowColor}] flex items-center gap-1 px-[6px] 3xl:px-[0.313vw] py-[2px] 3xl:py-[0.104vw] rounded-full`}>
                  <img
                    src={'/images/resources/arrow_green_up.svg'}
                    width={25}
                    height={11}
                    alt=""
                    className="w-[25px] 3xl:w-[1.458vw] h-[10px] 3xl:h-[0.573vw]"
                  />
                  <span className="text-[#fff] text-[12px] 3xl:text-[0.625vw] font-normal">{percentageChange}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
