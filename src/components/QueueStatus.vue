<template>
  <v-card class="queue-card">
    <v-card-item>
      <h3>Queue Status</h3>
    </v-card-item>
    <v-card-text>
      <div class="queue-chart">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
      <div class="queue-details">
        <div v-for="queue in queues" :key="queue.name" class="queue-item">
          <div class="queue-info">
            <div class="queue-name">{{ queue.name }}</div>
            <div class="queue-stats">
              <span class="queue-count">{{ queue.count }} items</span>
              <span class="queue-wait">{{ queue.avgWait }}m avg wait</span>
            </div>
          </div>
          <div class="queue-bar">
            <div class="queue-progress" :style="{ width: (queue.count / 15 * 100) + '%' }"></div>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import type { ChartOptions } from 'chart.js'
import type { QueueMetric } from '../types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Props {
  queues: QueueMetric[]
}

const props = defineProps<Props>()

const chartData = computed(() => ({
  labels: props.queues.map(q => q.name),
  datasets: [
    {
      label: 'Queue Items',
      data: props.queues.map(q => q.count),
      backgroundColor: '#1976D2',
      borderRadius: 6,
      borderSkipped: false
    },
    {
      label: 'Avg Wait (min)',
      data: props.queues.map(q => q.avgWait),
      backgroundColor: '#FB8C00',
      borderRadius: 6,
      borderSkipped: false
    }
  ]
}))

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: { size: 12 },
        padding: 15,
        usePointStyle: true
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 20,
      ticks: { font: { size: 11 } },
      grid: { color: '#f0f0f0' }
    },
    x: {
      ticks: { font: { size: 11 } },
      grid: { display: false }
    }
  }
}
</script>

<style scoped>
.queue-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
}

.queue-card h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.queue-chart {
  margin-bottom: 1.5rem;
  height: 250px;
}

.queue-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: 1px solid #e8e8e8;
  padding-top: 1rem;
}

.queue-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.queue-info {
  flex: 1;
}

.queue-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
}

.queue-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: #999;
}

.queue-count {
  display: flex;
  align-items: center;
}

.queue-wait {
  display: flex;
  align-items: center;
}

.queue-bar {
  flex: 1;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.queue-progress {
  height: 100%;
  background: linear-gradient(90deg, #1976D2, #42A5F5);
  transition: width 0.3s ease;
}
</style>
