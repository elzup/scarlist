// @flow

import * as React from 'react'
import _ from 'lodash'
import { ResponsiveHeatMap } from '@nivo/heatmap'
import type { DayHeatMapFields } from '../../types'

type Props = {
  data: DayHeatMapFields[],
}

const DayHeatMap = (props: Props) => (
  <div style={{ height: '1000px', width: '1000px' }}>
    <ResponsiveHeatMap
      data={props.data}
      keys={_.range(0, 24)}
      indexBy="userId"
      margin={{
        top: 100,
        right: 60,
        bottom: 60,
        left: 60,
      }}
      forceSquare={true}
      axisTop={{
        orient: 'top',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: 'hour',
        legendOffset: 36,
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'user',
        legendPosition: 'center',
        legendOffset: -40,
      }}
      cellOpacity={1}
      cellBorderColor="inherit:darker(0.4)"
      labelTextColor="inherit:darker(1.8)"
      defs={[
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(0, 0, 0, 0.1)',
          rotation: -45,
          lineWidth: 4,
          spacing: 7,
        },
      ]}
      fill={[
        {
          id: 'lines',
        },
      ]}
      animate={true}
      motionStiffness={80}
      motionDamping={9}
      hoverTarget="cell"
      cellHoverOthersOpacity={0.25}
    />
  </div>
)
export default DayHeatMap
