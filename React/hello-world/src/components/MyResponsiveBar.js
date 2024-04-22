import { ResponsiveBar } from '@nivo/bar';

const MyResponsiveBar = ({ data }) => (
  <ResponsiveBar
    data={data}
    keys={['Accepted', 'Lost']}
    indexBy="country"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={['#0bb502', '#db1616']} // Bright green for Accepted and red for Lost
    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Client',
      legendPosition: 'middle',
      legendOffset: 32,
      truncateTickAt: 0,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Number of Packets',
      legendPosition: 'middle',
      legendOffset: -40,
      truncateTickAt: 0,
    }}
    enableTotals={true}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [{ on: 'hover', style: { itemOpacity: 1 } }],
      },
    ]}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`}
    theme={{
      background: '#121111',
      text: {
        fontSize: 11,
        fill: '#000000',
        outlineWidth: 0,
        outlineColor: '#000000',
      },
      axis: {
        domain: {
          line: {
            stroke: '#ffffff',
            strokeWidth: 1,
          },
        },
        legend: {
          text: {
            fontSize: 12,
            fill: '#ffffff',
            outlineWidth: 0,
            outlineColor: '#1f1f1f',
          },
        },
        ticks: {
          line: {
            stroke: '#fafafa',
            strokeWidth: 1,
          },
          text: {
            fontSize: 11,
            fill: '#f5f5f5',
            outlineWidth: 0,
            outlineColor: 'transparent',
          },
        },
      },
      grid: {
        line: {
          stroke: '#ffffff',
          strokeWidth: 1,
        },
      },
      legends: {
        title: {
          text: {
            fontSize: 11,
            fill: '#ffffff',
            outlineWidth: 0,
            outlineColor: 'transparent',
          },
        },
        text: {
          fontSize: 11,
          fill: '#ffffff',
          outlineWidth: 0,
          outlineColor: 'transparent',
        },
        ticks: {
          line: {},
          text: {
            fontSize: 10,
            fill: '#333333',
            outlineWidth: 0,
            outlineColor: 'transparent',
          },
        },
      },
      annotations: {
        text: {
          fontSize: 13,
          fill: '#333333',
          outlineWidth: 2,
          outlineColor: '#ffffff',
          outlineOpacity: 1,
        },
        link: {
          stroke: '#ffffff',
          strokeWidth: 1,
          outlineWidth: 2,
          outlineColor: '#ffffff',
          outlineOpacity: 1,
        },
        outline: {
          stroke: '#000000',
          strokeWidth: 2,
          outlineWidth: 2,
          outlineColor: '#ffffff',
          outlineOpacity: 1,
        },
        symbol: {
          fill: '#000000',
          outlineWidth: 2,
          outlineColor: '#ffffff',
          outlineOpacity: 1,
        },
      },
      tooltip: {
        container: {
          background: '#ffffff',
          color: '#333333',
          fontSize: 12,
        },
        basic: {},
        chip: {},
        table: {},
        tableCell: {},
        tableCellValue: {},
      },
    }}
  />
);

export default MyResponsiveBar;
