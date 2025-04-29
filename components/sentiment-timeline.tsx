"use client"

import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface SentimentTimelineProps {
  data: any[]
}

export function SentimentTimeline({ data }: SentimentTimelineProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" domain={[1, 5]} />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="positive" stackId="a" fill="#4ade80" name="Positive" />
          <Bar yAxisId="left" dataKey="neutral" stackId="a" fill="#94a3b8" name="Neutral" />
          <Bar yAxisId="left" dataKey="negative" stackId="a" fill="#f43f5e" name="Negative" />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="score"
            stroke="#0284c7"
            name="Sentiment Score"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
