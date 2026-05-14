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
      <LeftPanel :cases="cases" :alerts="alerts" />

      <!-- Right Column (30%) - Tasks and Summary -->
      <RightPanel
        :tasks="tasksToday"
        :daily-metrics="dailyMetrics"
        :avg-queue-wait="avgQueueWait"
        @toggle-task="toggleTask"
      />
    </div>

    <!-- Full Width Sections Below -->
    <BottomSection :queues="queues" :metrics="dailyMetrics" :touchpoints="touchpoints" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import KPICard from '../components/KPICard.vue'
import LeftPanel from '../components/panels/LeftPanel.vue'
import RightPanel from '../components/panels/RightPanel.vue'
import BottomSection from '../components/panels/BottomSection.vue'
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
  height: 100vh;
  overflow: hidden;
}

/* Header - Compact */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}

.header-content h1 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
}

.header-subtitle {
  margin: 0;
  font-size: 0.8125rem;
  color: #999;
  font-weight: 500;
}

.header-time {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1976D2;
  font-variant-numeric: tabular-nums;
}

/* KPI Section - Minimal height */
.kpi-section {
  padding: 0.75rem 1.5rem;
  background-color: #f5f5f5;
  flex-shrink: 0;
  border-bottom: 1px solid #e0e0e0;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

/* Main Workspace - Takes remaining space */
.workspace {
  display: grid;
  grid-template-columns: 1fr 0.43fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

/* Desktop */
@media (min-width: 1200px) {
  /* Compact workspace */
}

/* Tablet - Stack vertically */
@media (max-width: 1199px) {
  .workspace {
    grid-template-columns: 1fr;
  }

  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile */
@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .header-content h1 {
    font-size: 1.125rem;
  }

  .kpi-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .workspace {
    padding: 0.75rem 1rem;
    gap: 0.75rem;
  }
}
</style>
