<template>
  <div>
    <!-- 确保容器大小充足 -->
    <div ref="chartContainer" style="width: 100%; height: 300px;"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import * as echarts from 'echarts';

export default defineComponent({
  name: 'PatientChart',
  setup() {
    const chartContainer = ref(null); // 获取容器引用

    const chartData = {
      labels: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05'],
      datasets: [
        {
          label: '血压 (mmHg)',
          data: [120, 125, 130, 135, 140],
          color: '#409EFF',
        },
        {
          label: '血糖 (mmol/L)',
          data: [5.5, 5.8, 6.0, 6.2, 6.5],
          color: '#67C23A',
        },
      ],
    };

    const chartOptions = {
      title: {
        text: '健康数据',
        subtext: '血压与血糖趋势',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        data: chartData.datasets.map(item => item.label),
        top: '10%',
        left: 'center',
      },
      xAxis: {
        type: 'category',
        data: chartData.labels,
        axisLabel: {
          rotate: 45, // 使标签斜着显示
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}',
        },
      },
      series: chartData.datasets.map(dataset => ({
        name: dataset.label,
        type: 'line',
        data: dataset.data,
        color: dataset.color,
        smooth: true, // 平滑曲线
        areaStyle: {},
      })),
    };

    onMounted(() => {
      // 确保图表容器已挂载
      const chartInstance = echarts.init(chartContainer.value);
      chartInstance.setOption(chartOptions);

      // 监听窗口变化，自动调整图表大小
      window.addEventListener('resize', () => {
        chartInstance.resize();
      });
    });

    return {
      chartContainer,
    };
  },
});
</script>

<style scoped>
div {
  width: 100%;
  height: 300px;
}
</style>
