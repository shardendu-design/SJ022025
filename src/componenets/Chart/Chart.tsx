// src/components/Chart/Chart.tsx
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface ChartData {
  name: string;
  dataSeries: { value: number; date: string }[];
  xAxisName: string;
  yAxisName: string;
}

interface ChartProps {
  data: ChartData;
}

const Chart = ({ data }: ChartProps) => {
  const options = {
    title: { text: data.name },
    xAxis: {
      type: 'datetime',
      title: { text: data.xAxisName },
    },
    yAxis: {
      title: { text: data.yAxisName },
    },
    series: [
      {
        name: data.name,
        data: data.dataSeries.map((point) => [
          new Date(point.date).getTime(),
          point.value,
        ]),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;