
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

const generateDynamicConfig = (data: { name: string, value: number }[]) => {
  const config: Record<string, { label: string, color?: string }> = {
    value: { label: "Devis" }
  };
  
  data.forEach((item, i) => {
    config[item.name] = {
      label: item.name,
      color: COLORS[i % COLORS.length]
    };
  });
  
  return config;
};

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


    const dynamicConfig = React.useMemo(() => generateDynamicConfig(data), [data]);

  return (
    <ChartContainer
      config={dynamicConfig}
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
