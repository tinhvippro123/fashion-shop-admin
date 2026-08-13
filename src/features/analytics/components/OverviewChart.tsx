"use client"

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { ChartData } from "../types/analytics.admin"

interface OverviewChartProps {
  data: ChartData[]
}

export function OverviewChart({ data }: OverviewChartProps) {
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
