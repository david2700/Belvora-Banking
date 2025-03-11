"use client";

import React from 'react'
import CountUp from 'react-countup'

const AnimatedCounter = ({amount}: {amount: number}) => {
  return (
    <div>
        <CountUp
            duration={2.7}
            end={amount}
            prefix="£"
            decimal="."
        />
    </div>
  )
}

export default AnimatedCounter