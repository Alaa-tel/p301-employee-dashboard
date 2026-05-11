<template>
  <v-card class="touchpoints-card">
    <v-card-item>
      <h3>Recent Touchpoints</h3>
    </v-card-item>
    <v-card-text>
      <div class="touchpoints-list">
        <div v-for="touchpoint in touchpoints" :key="touchpoint.id" class="touchpoint-item">
          <div class="touchpoint-icon" :style="{ backgroundColor: getTypeColor(touchpoint.type) }">
            <v-icon :icon="getTypeIcon(touchpoint.type)" color="white" size="small"></v-icon>
          </div>
          <div class="touchpoint-content">
            <div class="touchpoint-header">
              <div class="touchpoint-client">{{ touchpoint.clientName }}</div>
              <div class="touchpoint-time">{{ formatTime(touchpoint.timestamp) }}</div>
            </div>
            <div class="touchpoint-type">{{ formatType(touchpoint.type) }}</div>
            <div class="touchpoint-description">{{ touchpoint.description }}</div>
          </div>
          <v-btn 
            variant="text" 
            size="small" 
            icon
            @click="goToCase(touchpoint.caseId)"
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
import type { Touchpoint } from '../types'

interface Props {
  touchpoints: Touchpoint[]
}

defineProps<Props>()

const router = useRouter()

function getTypeIcon(type: string): string {
  switch (type) {
    case 'call':
      return 'mdiPhone'
    case 'email':
      return 'mdiEmail'
    case 'meeting':
      return 'mdiVideo'
    case 'note':
      return 'mdiNoteText'
    default:
      return 'mdiInformation'
  }
}

function getTypeColor(type: string): string {
  switch (type) {
    case 'call':
      return '#42A5F5'
    case 'email':
      return '#AB47BC'
    case 'meeting':
      return '#29B6F6'
    case 'note':
      return '#66BB6A'
    default:
      return '#999'
  }
}

function formatType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 60) {
    return `${diffMins}m ago`
  } else if (diffHours < 24) {
    return `${diffHours}h ago`
  } else if (diffDays === 1) {
    return 'Yesterday'
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
}

function goToCase(caseId: string): void {
  router.push(`/case/${caseId}`)
}
</script>

<style scoped>
.touchpoints-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
}

.touchpoints-card h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.touchpoints-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.touchpoint-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  background-color: #f8f9fa;
  transition: all 0.2s ease;
}

.touchpoint-item:hover {
  background-color: #f0f1f3;
}

.touchpoint-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.touchpoint-content {
  flex: 1;
  min-width: 0;
}

.touchpoint-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.touchpoint-client {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1a1a1a;
}

.touchpoint-time {
  font-size: 0.75rem;
  color: #999;
  flex-shrink: 0;
}

.touchpoint-type {
  font-size: 0.75rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
  font-weight: 600;
}

.touchpoint-description {
  font-size: 0.8125rem;
  color: #555;
  line-height: 1.4;
}
</style>
