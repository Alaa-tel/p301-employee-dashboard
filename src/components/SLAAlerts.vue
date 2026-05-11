<template>
  <v-card class="alerts-card">
    <v-card-item>
      <div class="card-header">
        <h3>SLA Risk Alerts</h3>
        <v-badge :content="alerts.length" color="error"></v-badge>
      </div>
    </v-card-item>
    <v-card-text>
      <div v-if="alerts.length === 0" class="empty-state">
        <v-icon icon="mdiCheckCircle" size="40" color="success"></v-icon>
        <p>No SLA risks at this time</p>
      </div>
      <div v-else class="alerts-list">
        <div v-for="alert in alerts" :key="alert.id" class="alert-item" :class="alert.severity">
          <div class="alert-severity">
            <v-icon 
              :icon="getSeverityIcon(alert.severity)"
              :color="getSeverityColor(alert.severity)"
              size="small"
            ></v-icon>
          </div>
          <div class="alert-content">
            <div class="alert-client">{{ alert.clientName }}</div>
            <div class="alert-message">{{ alert.message }}</div>
            <div class="alert-time">{{ formatTime(alert.timestamp) }}</div>
          </div>
          <v-btn 
            variant="text" 
            size="small" 
            icon
            @click="goToCase(alert.caseId)"
          >
            <v-icon icon="mdiChevronRight"></v-icon>
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Alert } from '../types'

interface Props {
  alerts: Alert[]
}

defineProps<Props>()

const router = useRouter()

function getSeverityIcon(severity: string): string {
  switch (severity) {
    case 'critical':
      return 'mdiAlert'
    case 'warning':
      return 'mdiAlertOutline'
    default:
      return 'mdiInformation'
  }
}

function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'critical':
      return '#FF5252'
    case 'warning':
      return '#FB8C00'
    default:
      return '#2196F3'
  }
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  
  if (diffMins < 60) {
    return `${diffMins} min ago`
  } else if (diffHours < 24) {
    return `${diffHours}h ago`
  } else {
    return date.toLocaleDateString()
  }
}

function goToCase(caseId: string): void {
  router.push(`/case/${caseId}`)
}
</script>

<style scoped>
.alerts-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
}

.card-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  color: #999;
  text-align: center;
}

.empty-state p {
  margin-top: 0.5rem;
  font-size: 0.875rem;
}

.alerts-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.alert-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  background-color: #f8f9fa;
  border-left: 3px solid #999;
  transition: all 0.2s ease;
}

.alert-item.critical {
  border-left-color: #FF5252;
  background-color: #ffebee;
}

.alert-item.warning {
  border-left-color: #FB8C00;
  background-color: #fff3e0;
}

.alert-item.info {
  border-left-color: #2196F3;
  background-color: #e3f2fd;
}

.alert-severity {
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.alert-content {
  flex: 1;
  min-width: 0;
}

.alert-client {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
}

.alert-message {
  font-size: 0.8125rem;
  color: #555;
  margin-bottom: 0.25rem;
  line-height: 1.4;
}

.alert-time {
  font-size: 0.75rem;
  color: #999;
}
</style>
