import React from 'react';

import { NinjaSkeleton, NinjaSkeletonTheme } from '../../../external/components/skeleton/skeleton.comp';
import { IPricingModel } from '../../../external/types/plan.types';

import './pricingCycleSelector.scss';

export const CycleSelectorLoader = () => {
  return (
    <NinjaSkeletonTheme leadColor="#f7f7f7">
      <div className="select-cycle-wrapper center">
        <div className="select-cycle" style={{ width: '200px' }}>
          <div>
            <NinjaSkeleton />
          </div>
          <div>
            <NinjaSkeleton height={40} />
          </div>
          <div className="one-month-p">
            <NinjaSkeleton />
          </div>
        </div>
      </div>
    </NinjaSkeletonTheme>
  );
}


export const CycleSelector = ({ planData, activeCycleId, setActiveCycleId }: { planData: IPricingModel, activeCycleId: number, setActiveCycleId: (id: number) => void }) => {

  if (planData.cycles.length === 0) return <></>
  return (
    <div className="select-cycle-wrapper center">
      <div className="select-cycle">
        <div className="cycle-selector">
          {/* {
            planData.cycles.map((cycle: ICycle, idx: number) => (
              // <span 
              //   className={activeCycleId === idx ? 'active' : ''} 
              //   key={`cycle_${cycle.period}`}
              //   onClick={() => setActiveCycleId(idx)}
              // >{cycle.description}</span>
              <>
                <div onClick={() => setActiveCycleId(idx)} className="test">
                  {idx}
                </div>

              </>
            ))
          } */}
          <h4 className={`${(activeCycleId === 0) ? 'active' : ''}`}>{planData.cycles[0].period}ly</h4>
          <label className="switch">
            <input type="checkbox" onChange={
              (e) => setActiveCycleId((e.target.checked) ? 0 : 1)
            } checked={activeCycleId === 0 ? true : false} />
            <span className="slider"></span>
          </label>
          <h4 className={`${(activeCycleId === 1) ? 'active' : ''}`}>{planData.cycles[1].period}ly</h4>

        </div>
      </div>
      {/* <p className="one-month-p">
        Looking to buy for just one month or event?
        <span className="local-tooltip">Subscribe at the monthly rate and cancel at any time. Your account will remain premium until the end of your billing period.</span>
      </p> */}
    </div>
  );
}