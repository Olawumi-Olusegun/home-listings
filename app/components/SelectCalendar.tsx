"use client";

import { eachDayOfInterval } from 'date-fns';
import React, { FC, useState } from 'react'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

type ReservationProps = {
    reservation: {
        startDate: Date;
        endDate: Date;

    }[] | undefined;
}

const SelectCalendar: FC<ReservationProps> = ({reservation}) => {

    const [state, setState] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    }]);

    let disabledDate: Date[] = [];

    reservation?.forEach((reservationItem) => {
        const dateRange = eachDayOfInterval({
            start: new Date(reservationItem.startDate),
            end: new Date(reservationItem.endDate),
        });
        disabledDate = [...disabledDate, ...dateRange];
    })

  return (
    <>
    <input type="hidden" hidden name='startDate' value={state[0].startDate.toISOString()} />
    <input type="hidden" hidden name='endDate' value={state[0].endDate.toISOString()} />
    <DateRange 
       date={new Date()}
        showDateDisplay={false}
        rangeColors={["#FF5A5F"]}
        ranges={state}
        onChange={(item) => setState([item.selection] as any)}
        minDate={new Date()}
        direction="vertical"
        disabledDates={disabledDate}
    />
    
    </>
  )
}

export default SelectCalendar