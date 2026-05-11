<template>
  <v-card class="metrics-card">
    <v-card-item>
      <h3>Daily Activity Metrics</h3>
    </v-card-item>
    <v-card-text>
      <div class="metrics-chart">
        <Line :data="chartData" :options="chartOptions" />
      </div>
      <div class="metrics-summary">
        <div class="metric-stat">
          <div class="stat-label">Cases Resolved</div>
          <div class="stat-value">{{ totalResolved }}</div>
        </div>
        <div class="metric-stat">
          <div class="stat-label">Cases Escalated</div>
          <div class="stat-value">{{ totalEscalated }}</div>
        </div>
        <div class="metric-stat">
          <div class="stat-label">Cases Created</div>
          <div class="stat-value">{{ totalCreated }}</div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import type { ChartOptions } from 'chart.js'
import type { DailyMetric } from '../types'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface Props {
  metrics: DailyMetric[]
}

const props = defineProps<Props>()

const chartData = computed(() => ({
  labels: props.metrics.map(m => m.hour),
  datasets: [
    {
      label: 'Resolved',
      data: props.metrics.map(m => m.resolved),
      borderColor: '#4CAF50',
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#4CAF50',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6
    },
    {
      label: 'Escalated',
      data: props.metrics.map(m => m.escalated),
      borderColor: '#FF5252',
      backgroundColor: 'rgba(255, 82, 82, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#FF5252',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6
    },
    {
      label: 'Created',
      data: props.metrics.map(m => m.created),
      borderColor: '#2196F3',
      backgroundColor: 'rgba(33, 150, 243, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#2196F3',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6
    }
  ]
}))

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: true,
  interaction: {
    mode: 'index',
    intersect: false
  },
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: { size: 12 },
        padding: 15,
        usePointStyle: true,
        pointStyle: 'circle'
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleFont: { size: 12, weight: 'bold' },
      bodyFont: { size: 12 },
      borderColor: '#ddd',
      borderWidth: 1,
      displayColors: true,
      callbacks: {
        label: function(context) {
          return `${context.dataset.label}: ${context.parsed.y} cases`
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 5,
      ticks: { font: { size: 11 } },
      grid: { color: '#f0f0f0' }
    },
    x: {
      ticks: { font: { size: 11 } },
      grid: { display: false }
    }
  }
}

const totalResolved = computed(() => props.metrics.reduce((sum, m) => sum + m.resolved, 0))
const totalEscalated = computed(() => props.metrics.reduce((sum, m) => sum + m.escalated, 0))
const totalCreated = computed(() => props.metrics.reduce((sum, m) => sum + m.created, 0))
</script>

<style scoped>
.metrics-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
}

.metrics-card h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.metrics-chart {
  margin-bottom: 1.5rem;
  height: 300px;
}

.metrics-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  border-top: 1px solid #e8e8e8;
  padding-top: 1rem;
}

.metric-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0.75rem;
}

.stat-label {
  font-size: 0.75rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
}
</style>
