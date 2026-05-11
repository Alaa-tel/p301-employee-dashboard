<template>
  <v-card class="cases-card">
    <v-card-item>
      <div class="card-header">
        <h3>My Cases</h3>
        <div class="header-actions">
          <v-text-field
            v-model="searchQuery"
            placeholder="Search cases..."
            prepend-inner-icon="mdiMagnify"
            density="compact"
            variant="outlined"
            hide-details
            style="max-width: 300px"
          ></v-text-field>
        </div>
      </div>
    </v-card-item>
    <v-card-text class="pa-0">
      <v-table class="cases-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Priority</th>
            <th>Status</th>
            <th>SLA Due</th>
            <th>Next Action</th>
            <th>Last Touch</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="caseItem in filteredCases" :key="caseItem.id" class="case-row" @click="goToCase(caseItem.id)">
            <td>
              <div class="client-cell">
                <div class="client-name">{{ caseItem.clientName }}</div>
                <div class="case-id">{{ caseItem.id }}</div>
              </div>
            </td>
            <td>
              <v-chip 
                :color="getPriorityColor(caseItem.priority)"
                text-color="white"
                size="small"
              >
                {{ caseItem.priority }}
              </v-chip>
            </td>
            <td>
              <v-chip 
                :color="getStatusColor(caseItem.status)"
                text-color="white"
                size="small"
              >
                {{ caseItem.status }}
              </v-chip>
            </td>
            <td>
              <div class="sla-cell" :class="{ 'at-risk': caseItem.slaAtRisk }">
                <v-icon v-if="caseItem.slaAtRisk" icon="mdiAlert" size="small" color="error"></v-icon>
                <span>{{ formatDate(caseItem.slaDate) }}</span>
              </div>
            </td>
            <td>
              <div class="action-cell">{{ caseItem.nextAction }}</div>
            </td>
            <td>
              <div class="timestamp">{{ formatTimestamp(caseItem.lastTouchpoint) }}</div>
            </td>
            <td>
              <v-icon icon="mdiChevronRight" color="primary"></v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Case } from '../types'

interface Props {
  cases: Case[]
}

const props = defineProps<Props>()

const router = useRouter()
const searchQuery = ref('')

const filteredCases = computed(() => {
  if (!searchQuery.value) return props.cases
  
  const query = searchQuery.value.toLowerCase()
  return props.cases.filter((c: Case) => 
    c.clientName.toLowerCase().includes(query) ||
    c.id.toLowerCase().includes(query)
  )
})

function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'high':
      return '#FF5252'
    case 'medium':
      return '#FB8C00'
    case 'low':
      return '#4CAF50'
    default:
      return '#999'
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'active':
      return '#2196F3'
    case 'pending':
      return '#FB8C00'
    case 'resolved':
      return '#4CAF50'
    default:
      return '#999'
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow'
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

function goToCase(caseId: string): void {
  router.push(`/case/${caseId}`)
}
</script>

<style scoped>
.cases-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.card-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.cases-table {
  width: 100%;
  border-collapse: collapse;
}

.cases-table thead {
  background-color: #f5f5f5;
  border-bottom: 2px solid #e0e0e0;
}

.cases-table th {
  padding: 1rem;
  text-align: left;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cases-table tbody tr {
  border-bottom: 1px solid #e8e8e8;
  transition: all 0.2s ease;
  cursor: pointer;
}

.cases-table tbody tr:hover {
  background-color: #f8f9fa;
}

.case-row td {
  padding: 1rem;
  font-size: 0.875rem;
  color: #555;
}

.client-cell {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.client-name {
  font-weight: 600;
  color: #1a1a1a;
}

.case-id {
  font-size: 0.8rem;
  color: #999;
}

.sla-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #555;
}

.sla-cell.at-risk {
  color: #FF5252;
  font-weight: 600;
}

.action-cell {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.timestamp {
  font-size: 0.8rem;
  color: #999;
}
</style>
