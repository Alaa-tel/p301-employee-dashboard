<template>
  <div class="full-width-section">
    <!-- Charts Row -->
    <div class="charts-grid">
      <div class="chart-container">
        <QueueStatus :queues="queues" />
      </div>
      <div class="chart-container">
        <DailyMetrics :metrics="metrics" />
      </div>
    </div>

    <!-- Recent Touchpoints -->
    <div class="touchpoints-container">
      <RecentTouchpoints :touchpoints="touchpoints" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QueueMetric, DailyMetric, Touchpoint } from '../../types'
import QueueStatus from '../QueueStatus.vue'
import DailyMetrics from '../DailyMetrics.vue'
import RecentTouchpoints from '../RecentTouchpoints.vue'

defineProps<{
  queues: QueueMetric[]
  metrics: DailyMetric[]
  touchpoints: Touchpoint[]
}>()
</script>

<style scoped>
.full-width-section {
  width: 100%;
  padding: 1.5rem 2rem;
  background-color: #f5f5f5;
  box-sizing: border-box;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
}

.chart-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 1.25rem;
  overflow: hidden;
}

.touchpoints-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 1.25rem;
  overflow: hidden;
  width: 100%;
}

/* Responsive Design - Large Desktops (1600px+) */
@media (min-width: 1600px) {
  .full-width-section {
    padding: 2rem 3rem;
  }

  .charts-grid {
    gap: 2rem;
    margin-bottom: 2rem;
  }
}

/* Medium Desktop (1024px - 1199px) */
@media (max-width: 1199px) {
  .full-width-section {
    padding: 1.25rem 1.5rem;
  }

  .charts-grid {
    gap: 1.25rem;
    margin-bottom: 1.25rem;
  }
}

/* Tablet (768px - 1023px) */
@media (max-width: 1023px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }

  .full-width-section {
    padding: 1rem 1.25rem;
  }

  .charts-grid {
    gap: 1rem;
    margin-bottom: 1rem;
  }
}

/* Small Tablet (481px - 767px) */
@media (max-width: 767px) {
  .full-width-section {
    padding: 0.875rem 1rem;
  }

  .charts-grid {
    gap: 0.875rem;
    margin-bottom: 0.875rem;
  }

  .chart-container,
  .touchpoints-container {
    border-radius: 6px;
    padding: 1rem;
  }
}

/* Mobile (480px and below) */
@media (max-width: 480px) {
  .full-width-section {
    padding: 0.75rem;
  }

  .charts-grid {
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .chart-container,
  .touchpoints-container {
    border-radius: 6px;
    padding: 0.875rem;
  }
}
</style>
