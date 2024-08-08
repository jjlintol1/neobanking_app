"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
    {
        month: "January",
        income: 10000,
        expenses: 5000,
    },
    {
        month: "February",
        income: 12000,
        expenses: 6000,
    },
    {
        month: "March",
        income: 8000,
        expenses: 7500,
    },
    {
        month: "April",
        income: 11000,
        expenses: 8000,
    },
    {
        month: "May",
        income: 7000,
        expenses: 9000,
    },
    {
        month: "June",
        income: 15000,
        expenses: 10000,
    },
]

const IncomeChart = () => {
  return (
    <ResponsiveContainer width="100%" aspect={16 / 9}>
        <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#20d3fc" />
            <Line type="monotone" dataKey="expenses" stroke="#a036fc" />
        </LineChart>
    </ResponsiveContainer>
  );
};

export default IncomeChart;
