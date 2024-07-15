import { memo } from 'react'
import { Pie } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleOrdinal } from '@visx/scale'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import { colors } from '@styles/colorPalette'

interface ChartData {
  label: string
  amount: number
}

interface CategoryChartProps {
  chartData: ChartData[]
  width: number
  height: number
}

const margin = { top: 20, right: 20, bottom: 20, left: 20 }

const getValue = (d: ChartData) => d.amount

function CategoryChart({ chartData, width, height }: CategoryChartProps) {
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  const radius = Math.min(innerWidth, innerHeight) / 2
  const centerY = innerHeight / 2
  const centerX = innerWidth / 2
  const top = centerY + margin.top
  const left = centerX + margin.left

  const getPieColor = scaleOrdinal({
    domain: chartData.map((l) => l.amount),
    range: [
      colors.blue,
      colors.blue60,
      colors.blue100,
      colors.blue500,
      colors.teal900,
    ],
  })

  return (
    <svg width={width} height={height}>
      <Group top={top} left={left}>
        <Pie data={chartData} pieValue={getValue} outerRadius={radius}>
          {(pie) => {
            return pie.arcs.map((arc) => {
              const { label, amount } = arc.data
              const [centroidX, centroidY] = pie.path.centroid(arc)
              const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1
              const arcPath = pie.path(arc) ?? ''
              const arcFill = getPieColor(amount)
              return (
                <g key={label}>
                  <path d={arcPath} fill={arcFill} />
                  {hasSpaceForLabel && (
                    <text
                      x={centroidX}
                      y={centroidY}
                      dy=".33em"
                      fill="#ffffff"
                      fontSize={14}
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      {label}
                    </text>
                  )}
                </g>
              )
            })
          }}
        </Pie>
      </Group>
    </svg>
  )
}

interface ChartWrapperProps {
  chartData: ChartData[]
  height?: number
}

function ChartWrapper({ chartData, height = 200 }: ChartWrapperProps) {
  return (
    <ParentSize>
      {({ width }) => (
        <CategoryChart chartData={chartData} width={width} height={height} />
      )}
    </ParentSize>
  )
}

export default memo(ChartWrapper)
