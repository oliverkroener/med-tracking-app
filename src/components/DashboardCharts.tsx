import ReactECharts from 'echarts-for-react';
import { makeStyles, tokens, useThemeClassName } from '@fluentui/react-components';

const useStyles = makeStyles({
  chartGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '2rem',
    marginTop: '2rem',
  },
  chartContainer: {
    background: tokens.colorNeutralBackground1,
    borderRadius: '8px',
    padding: '1rem',
    boxShadow: tokens.shadow4,
  }
});

export function DashboardCharts() {
  const styles = useStyles();
  const theme = useThemeClassName();

const chartOptions = {
    lineChart: {
        tooltip: { trigger: 'axis', textStyle: { textShadow: 'none' } },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLabel: { color: theme.colorNeutralForeground1, textShadow: 'none' }
        },
        yAxis: {
            type: 'value',
            axisLabel: { color: theme.colorNeutralForeground1, textShadow: 'none' }
        },
        series: [{
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
            smooth: true,
            lineStyle: { color: theme.colorBrandBackground }
        }]
    },
    barChart: {
        tooltip: { trigger: 'axis', textStyle: { textShadow: 'none' } },
        xAxis: {
            type: 'category',
            data: ['Q1', 'Q2', 'Q3', 'Q4'],
            axisLabel: { color: theme.colorNeutralForeground1, textShadow: 'none' }
        },
        yAxis: {
            type: 'value',
            axisLabel: { color: theme.colorNeutralForeground1, textShadow: 'none' }
        },
        series: [{
            data: [120, 200, 150, 80],
            type: 'bar',
            itemStyle: { color: theme.colorBrandBackground }
        }]
    },
    pieChart: {
        tooltip: { 
            trigger: 'item',
            backgroundColor: 'darkgray', // Example of custom tooltip background
            borderColor: theme.colorNeutralStroke1,
            textStyle: {
                color: 'white',
                textShadow: 'none'
            }
        },
        legend: {
            orient: 'vertical',
            right: '10%',
            top: 'middle',
            textStyle: {
                color: theme.colorNeutralForeground1,
                textShadow: 'none'
            }
        },
        series: [{
            type: 'pie',
            radius: '60%',
            data: [
                { value: 1048, name: 'Antibiotics' },
                { value: 735, name: 'Pain Relief' },
                { value: 580, name: 'Chronic' },
                { value: 484, name: 'Other' }
            ],
            label: {
                show: true,
                formatter: '{b}: {d}%',
                color: theme.colorNeutralForeground1,
                fontSize: 14,
                textShadow: 'none'
            },
            emphasis: { 
                label: {
                    show: true,
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: theme.colorBrandBackground,
                    textShadow: 'none'
                }
            }
        }]
    },
    scatterChart: {
        tooltip: { trigger: 'item', textStyle: { textShadow: 'none' } },
        xAxis: { 
            type: 'value',
            axisLabel: { color: theme.colorNeutralForeground1, textShadow: 'none' }
        },
        yAxis: { 
            type: 'value',
            axisLabel: { color: theme.colorNeutralForeground1, textShadow: 'none' }
        },
        series: [{
            symbolSize: 20,
            data: [[1, 30], [2, 90], [3, 60], [4, 20], [5, 70]],
            type: 'scatter'
        }]
    },
    gaugeChart: {
        series: [{
            type: 'gauge',
            progress: { show: true },
            detail: { 
                valueAnimation: true, 
                formatter: '{value}%',
                textStyle: { textShadow: 'none' }
            },
            data: [{ value: 78 }]
        }]
    },
    areaChart: {
        tooltip: { trigger: 'axis', textStyle: { textShadow: 'none' } },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            axisLabel: { color: theme.colorNeutralForeground1, textShadow: 'none' }
        },
        yAxis: {
            type: 'value',
            axisLabel: { color: theme.colorNeutralForeground1, textShadow: 'none' }
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330],
            type: 'line',
            areaStyle: { color: theme.colorBrandBackground },
            smooth: true
        }]
    }
};

  return (
    <div className={styles.chartGrid}>
      <div className={styles.chartContainer}>
        <h3 className="text-lg font-semibold mb-4">Monthly Prescriptions</h3>
        <ReactECharts option={chartOptions.lineChart} style={{ height: '300px' }} />
      </div>
      <div className={styles.chartContainer}>
        <h3 className="text-lg font-semibold mb-4">Quarterly Revenue</h3>
        <ReactECharts option={chartOptions.barChart} style={{ height: '300px' }} />
      </div>
      <div className={styles.chartContainer}>
        <h3 className="text-lg font-semibold mb-4">Prescription Types</h3>
        <ReactECharts option={chartOptions.pieChart} style={{ height: '300px' }} />
      </div>
      <div className={styles.chartContainer}>
        <h3 className="text-lg font-semibold mb-4">Patient Age Distribution</h3>
        <ReactECharts option={chartOptions.scatterChart} style={{ height: '300px' }} />
      </div>
      <div className={styles.chartContainer}>
        <h3 className="text-lg font-semibold mb-4">System Health</h3>
        <ReactECharts option={chartOptions.gaugeChart} style={{ height: '300px' }} />
      </div>
      <div className={styles.chartContainer}>
        <h3 className="text-lg font-semibold mb-4">Patient Growth</h3>
        <ReactECharts option={chartOptions.areaChart} style={{ height: '300px' }} />
      </div>
    </div>
  );
}