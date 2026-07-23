"use client"

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  { name: "Tháng 1", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Tháng 2", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Tháng 3", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Tháng 4", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Tháng 5", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Tháng 6", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Tháng 7", total: Math.floor(Math.random() * 5000) + 1000 },
]

export function OverviewChart() {
  return (
    <div className="text-primary w-full h-full">
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="currentColor" stopOpacity={0.3} />
            <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}k`}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'var(--color-card)', 
            borderColor: 'var(--color-border)',
            color: 'var(--color-card-foreground)'
          }}
        />
        <Area
          type="monotone"
          dataKey="total"
          stroke="currentColor"
          fillOpacity={1}
          fill="url(#colorTotal)"
        />
      </AreaChart>
    </ResponsiveContainer>
    </div>
  )
}
