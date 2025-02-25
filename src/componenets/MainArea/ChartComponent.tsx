import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface ChartProps {
  data: { x: number; y: number }[];
}

const ChartComponent: React.FC<ChartProps> = ({ data }) => {
  const options: Highcharts.Options = {
    title: { text: 'Sensor Data' },
    xAxis: { type: 'datetime' },
    yAxis: { title: { text: '°C' } },
    series: [{ type: 'line', data }],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ChartComponent;