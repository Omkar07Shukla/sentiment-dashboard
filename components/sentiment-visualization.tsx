"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, PieChartIcon } from "lucide-react"

interface SentimentData {
  name: string
  value: number
  color: string
}

interface SentimentVisualizationProps {
  data: SentimentData[]
}

export function SentimentVisualization({ data }: SentimentVisualizationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Analysis Results</CardTitle>
        <CardDescription>Visual representation of sentiment analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar">
          <div className="flex justify-center mb-4">
            <TabsList>
              <TabsTrigger value="bar" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Bar Chart
              </TabsTrigger>
              <TabsTrigger value="pie" className="flex items-center gap-2">
                <PieChartIcon className="h-4 w-4" />
                Pie Chart
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="bar">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Count">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="pie">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.filter((item) => item.value > 0)}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
