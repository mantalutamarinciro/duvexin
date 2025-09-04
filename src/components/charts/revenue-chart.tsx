
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"


export function RevenueChart({ data }: { data: { name: string, total: number }[] }) {
  if (!data || data.length === 0) {
    return (
        <div className="flex items-center justify-center h-[350px] text-center text-muted-foreground">
            <p>Pas assez de données pour afficher le graphique des revenus.</p>
        </div>
    )
  }

  return (
    <ChartContainer config={{}} className="min-h-[200px] w-full h-[350px]">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis />
        <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
        <Bar dataKey="total" fill="var(--color-primary)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
