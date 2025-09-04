
"use client"

import * as React from "react"
import { Pie, PieChart, Cell } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"];

const chartConfig = {
  value: {
    label: "Devis",
  },
  "Accepté (Converti)": {
    label: "Accepté (Converti)",
    color: "hsl(var(--chart-1))",
  },
  "Accepté (Non converti)": {
    label: "Accepté (Non converti)",
    color: "hsl(var(--chart-2))",
  },
  "Refusé": {
    label: "Refusé",
    color: "hsl(var(--chart-3))",
  },
} satisfies import("@/components/ui/chart").ChartConfig


export function QuotesStatusChart({ data }: { data: { name: string, value: number }[] }) {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-[350px] text-center text-muted-foreground">
                <p>Pas de données sur les statuts des devis pour le moment.</p>
            </div>
        )
    }

    const totalValue = React.useMemo(() => {
        return data.reduce((acc, curr) => acc + curr.value, 0)
    }, [data])


  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-full"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          strokeWidth={5}
        >
             {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
        <ChartLegend
            content={<ChartLegendContent nameKey="name" />}
            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  )
}
