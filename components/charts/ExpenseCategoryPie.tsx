"use client";

import { formatUSD } from "@/lib/utils";
import { Card, DonutChart, Legend } from "@tremor/react";

interface DonutChartUsageExampleProps {
  data: any;
}

export default function DonutChartUsageExample({
  data,
}: DonutChartUsageExampleProps) {
  return (
    <Card className="flex h-[350px] w-full flex-col items-center justify-between space-x-6 rounded-md bg-card-light shadow-md dark:bg-card-dark md:w-2/5">
      <h3 className="text-xl font-medium text-cardForeground-light dark:text-cardForeground-dark">
        Expenses this month
      </h3>
      <DonutChart
        data={data}
        category="total"
        index="category"
        valueFormatter={formatUSD}
        colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
        className="w-full"
      />
      <Legend
        categories={data.map((d: any) => d.category)}
        colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
        // colors={tremorColors}
        className="mt-5 w-full text-cardForeground-light dark:text-cardForeground-dark"
      />
    </Card>
  );
}
