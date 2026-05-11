<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <div class="header-content">
        <h1>Dashboard</h1>
        <p class="header-subtitle">{{ greeting }}, Sarah</p>
      </div>
      <div class="header-time">{{ currentTime }}</div>
    </div>

    <!-- KPI Cards -->
    <v-row class="kpi-section">
      <v-col cols="12" sm="6" md="3">
        <KPICard
          label="Active Cases"
          :value="activeCasesCount"
          subtitle="Under management"
          icon="mdiFileDocument"
          icon-bg-color="#1976D2"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <KPICard
          label="SLA Risk"
          :value="slaRiskCount"
          subtitle="Require attention"
          icon="mdiAlert"
          icon-bg-color="#FF5252"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <KPICard
          label="Follow-ups Due"
          :value="followUpsDueCount"
          subtitle="Today"
          icon="mdiChecklistClock"
          icon-bg-color="#FB8C00"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <KPICard
          label="Queue Wait"
          :value="`${avgQueueWait}m`"
          subtitle="Average"
          icon="mdiClock"
          icon-bg-color="#4CAF50"
        />
      </v-col>
    </v-row>

    <!-- Main Content -->
    <v-row class="main-content">
      <!-- My Cases Table -->
      <v-col cols="12">
        <MyCases :cases="cases" />
      </v-col>
    </v-row>

    <!-- Alerts and Tasks Row -->
    <v-row class="alerts-tasks-row">
      <v-col cols="12" md="6">
        <SLAAlerts :alerts="alerts" />
      </v-col>
      <v-col cols="12" md="6">
        <FollowUpTasks :tasks="tasksToday" @toggle-task="toggleTask" />
      </v-col>
    </v-row>

    <!-- Charts Row -->
    <v-row class="charts-row">
      <v-col cols="12" md="6">
        <QueueStatus :queues="queues" />
      </v-col>
      <v-col cols="12" md="6">
        <DailyMetrics :metrics="dailyMetrics" />
      </v-col>
    </v-row>

    <!-- Recent Touchpoints -->
    <v-row class="touchpoints-row">
      <v-col cols="12">
        <RecentTouchpoints :touchpoints="touchpoints" />
      </v-col>
    </v-row>
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
  padding: 2rem;
  background-color: #fafbfc;
  min-height: 100vh;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e8e8e8;
}

.header-content h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
}

.header-subtitle {
  margin: 0;
  font-size: 1rem;
  color: #666;
  font-weight: 500;
}

.header-time {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1976D2;
  font-variant-numeric: tabular-nums;
}

.kpi-section {
  margin-bottom: 2rem;
}

.main-content {
  margin-bottom: 2rem;
}

.alerts-tasks-row {
  margin-bottom: 2rem;
}

.charts-row {
  margin-bottom: 2rem;
}

.touchpoints-row {
  margin-bottom: 2rem;
}

@media (max-width: 960px) {
  .dashboard {
    padding: 1rem;
  }

  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .header-content h1 {
    font-size: 1.5rem;
  }

  .header-time {
    font-size: 1.25rem;
  }
}
</style>
