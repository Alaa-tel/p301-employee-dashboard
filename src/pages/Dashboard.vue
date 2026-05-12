<template>
  <div class="dashboard">
    <!-- Header Bar -->
    <div class="dashboard-header">
      <div class="header-content">
        <h1>Dashboard</h1>
        <p class="header-subtitle">{{ greeting }}, Sarah</p>
      </div>
      <div class="header-time">{{ currentTime }}</div>
    </div>

    <!-- KPI Cards - Full Width Top -->
    <div class="kpi-section">
      <div class="kpi-grid">
        <KPICard
          label="Active Cases"
          :value="activeCasesCount"
          subtitle="Under management"
          icon="mdiFileDocument"
          icon-bg-color="#1976D2"
        />
        <KPICard
          label="SLA Risk"
          :value="slaRiskCount"
          subtitle="Require attention"
          icon="mdiAlert"
          icon-bg-color="#FF5252"
        />
        <KPICard
          label="Follow-ups Due"
          :value="followUpsDueCount"
          subtitle="Today"
          icon="mdiChecklistClock"
          icon-bg-color="#FB8C00"
        />
        <KPICard
          label="Queue Wait"
          :value="`${avgQueueWait}m`"
          subtitle="Average"
          icon="mdiClock"
          icon-bg-color="#4CAF50"
        />
      </div>
    </div>

    <!-- Main Workspace - 2 Column Layout -->
    <div class="workspace">
      <!-- Left Column (70%) - Cases and Alerts -->
      <div class="left-column">
        <!-- SLA Alerts -->
        <div class="panel">
          <SLAAlerts :alerts="alerts" />
        </div>

        <!-- My Cases Table -->
        <div class="panel">
          <MyCases :cases="cases" />
        </div>
      </div>

      <!-- Right Column (30%) - Tasks and Summary -->
      <div class="right-column">
        <!-- Follow-up Tasks -->
        <div class="panel">
          <FollowUpTasks :tasks="tasksToday" @toggle-task="toggleTask" />
        </div>

        <!-- Quick Stats Panel -->
        <div class="panel stats-panel">
          <div class="stats-title">Quick Stats</div>
          <div class="stat-row">
            <span class="stat-label">Cases Resolved</span>
            <span class="stat-value">{{ dailyMetricsTotal.resolved }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Cases Escalated</span>
            <span class="stat-value escalated">{{ dailyMetricsTotal.escalated }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Cases Created</span>
            <span class="stat-value">{{ dailyMetricsTotal.created }}</span>
          </div>
          <div class="divider"></div>
          <div class="stat-row">
            <span class="stat-label">Avg Queue Wait</span>
            <span class="stat-value">{{ avgQueueWait }}m</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Full Width Sections Below -->
    <div class="full-width-section">
      <!-- Charts Row -->
      <div class="charts-grid">
        <div class="chart-container">
          <QueueStatus :queues="queues" />
        </div>
        <div class="chart-container">
          <DailyMetrics :metrics="dailyMetrics" />
        </div>
      </div>

      <!-- Recent Touchpoints -->
      <div class="touchpoints-container">
        <RecentTouchpoints :touchpoints="touchpoints" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import KPICard from '../components/KPICard.vue'
import MyCases from '../components/MyCases.vue'
import SLAAlerts from '../components/SLAAlerts.vue'
import FollowUpTasks from '../components/FollowUpTasks.vue'
import QueueStatus from '../components/QueueStatus.vue'
import RecentTouchpoints from '../components/RecentTouchpoints.vue'
import DailyMetrics from '../components/DailyMetrics.vue'
import {
  mockCases,
  mockTasks,
  mockTouchpoints,
  mockAlerts,
  mockQueueMetrics,
  mockDailyMetrics,
  getActiveCaseCount,
  getSLARiskCount,
  getFollowUpDueCount,
  getAverageQueueWait
} from '../services/mockData'

const cases = ref(mockCases)
const tasks = ref(mockTasks)
const touchpoints = ref(mockTouchpoints)
const alerts = ref(mockAlerts.filter(a => a.type === 'sla_risk'))
const queues = ref(mockQueueMetrics)
const dailyMetrics = ref(mockDailyMetrics)

const currentTime = ref('')
const greeting = ref('')

const activeCasesCount = computed(() => getActiveCaseCount())
const slaRiskCount = computed(() => getSLARiskCount())
const followUpsDueCount = computed(() => getFollowUpDueCount())
const avgQueueWait = computed(() => getAverageQueueWait())

const tasksToday = computed(() => tasks.value.filter(t => t.dueDate === '2026-05-11'))

const dailyMetricsTotal = computed(() => ({
  resolved: dailyMetrics.value.reduce((sum, m) => sum + m.resolved, 0),
  escalated: dailyMetrics.value.reduce((sum, m) => sum + m.escalated, 0),
  created: dailyMetrics.value.reduce((sum, m) => sum + m.created, 0)
}))

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})

function updateTime(): void {
  const now = new Date()
  const hours = now.getHours()
  
  // Format time
  currentTime.value = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  
  // Set greeting based on time of day
  if (hours < 12) {
    greeting.value = 'Good morning'
  } else if (hours < 18) {
    greeting.value = 'Good afternoon'
  } else {
    greeting.value = 'Good evening'
  }
}

function toggleTask(taskId: string): void {
  const task = tasks.value.find(t => t.id === taskId)
  if (task) {
    task.completed = !task.completed
  }
}
</script>

<style scoped>
.dashboard {
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1.5rem;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.header-content h1 {
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
}

.header-subtitle {
  margin: 0;
  font-size: 0.9375rem;
  color: #666;
  font-weight: 500;
}

.header-time {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1976D2;
  font-variant-numeric: tabular-nums;
}

/* KPI Section - Full Width */
.kpi-section {
  padding: 1rem;
  background-color: #f5f5f5;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  max-width: 100%;
}

/* Main Workspace */
.workspace {
  display: grid;
  grid-template-columns: 1fr 0.43fr;
  gap: 1rem;
  padding: 1rem;
  flex: 1;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.panel {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* Stats Panel */
.stats-panel {
  padding: 1rem;
}

.stats-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e8e8e8;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  font-size: 0.875rem;
}

.stat-label {
  color: #666;
  font-weight: 500;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1976D2;
}

.stat-value.escalated {
  color: #FF5252;
}

.divider {
  height: 1px;
  background-color: #e8e8e8;
  margin: 0.75rem 0;
}

/* Full Width Section */
.full-width-section {
  padding: 1rem;
  background-color: #f5f5f5;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.chart-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  overflow: hidden;
}

.touchpoints-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  overflow: hidden;
}

/* Responsive Design */
@media (max-width: 1400px) {
  .workspace {
    grid-template-columns: 1fr 0.5fr;
  }
}

@media (max-width: 1024px) {
  .workspace {
    grid-template-columns: 1fr;
    padding: 0.75rem;
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .header-time {
    align-self: flex-start;
  }

  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 0;
  }

  .dashboard-header {
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
  }

  .header-content h1 {
    font-size: 1.5rem;
  }

  .kpi-section {
    padding: 0.75rem;
  }

  .kpi-grid {
    grid-template-columns: 1fr;
  }

  .workspace {
    padding: 0.75rem;
    gap: 0.75rem;
  }

  .full-width-section {
    padding: 0.75rem;
  }

  .charts-grid {
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .chart-container,
  .touchpoints-container,
  .panel {
    border-radius: 6px;
  }
}

@media (max-width: 480px) {
  .dashboard-header {
    padding: 0.75rem;
  }

  .header-content h1 {
    font-size: 1.25rem;
  }

  .header-time {
    font-size: 1.125rem;
  }

  .kpi-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .stat-row {
    padding: 0.5rem 0;
  }

  .stat-value {
    font-size: 1.125rem;
  }
}
</style>
