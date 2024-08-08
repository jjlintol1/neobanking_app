"use client";

import React from 'react'

import { BarChart, Card } from '@tremor/react';
import { formatUSD } from '@/lib/utils';

const chartdata = [
  {
    name: 'Jan',
    'Total Expenses': 3488,
  },
  {
    name: 'Feb',
    'Total Expenses': 2488,
  },
  {
    name: 'Mar',
    'Total Expenses': 2488,
  },
  {
    name: 'Apr',
    'Total Expenses': 2488,
  },
  {
    name: 'May',
    'Total Expenses': 2488,
  },
  {
    name: 'Jun',
    'Total Expenses': 2488,
  }
];

function MonthlyExpensesBar() {
  return (
    <Card className='flex h-[350px] w-full flex-col items-center gap-5 rounded-md border-none bg-card-light shadow-md dark:bg-card-dark md:w-3/5'>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Total Expenses by Month
      </h3>
      <BarChart
        className="mt-6 h-[250px]"
        data={chartdata}
        index="name"
        categories={['Total Expenses']}
        colors={['#00F5A0']}
        valueFormatter={formatUSD}
        yAxisWidth={70}
      />
    </Card>
  );
}

export default MonthlyExpensesBar