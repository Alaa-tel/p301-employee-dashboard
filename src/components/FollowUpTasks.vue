<template>
  <v-card class="tasks-card">
    <v-card-item>
      <div class="card-header">
        <h3>Follow-up Tasks Due Today</h3>
        <v-chip size="small" color="primary">{{ tasks.length }}</v-chip>
      </div>
    </v-card-item>
    <v-card-text>
      <div v-if="tasks.length === 0" class="empty-state">
        <v-icon icon="mdiCheckAll" size="40" color="success"></v-icon>
        <p>All caught up!</p>
      </div>
      <div v-else class="tasks-list">
        <div v-for="task in tasks" :key="task.id" class="task-item" :class="task.priority">
          <v-checkbox 
            :model-value="task.completed"
            @update:model-value="toggleTask(task.id)"
            :disabled="task.completed"
          ></v-checkbox>
          <div class="task-content">
            <div class="task-description" :class="{ completed: task.completed }">
              {{ task.description }}
            </div>
            <div class="task-meta">Case: {{ task.caseId }}</div>
          </div>
          <div class="task-priority">
            <v-chip 
              size="x-small"
              :color="getPriorityColor(task.priority)"
              text-color="white"
            >
              {{ task.priority }}
            </v-chip>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Task } from '../types'

interface Props {
  tasks: Task[]
}

defineProps<Props>()

const emit = defineEmits<{
  toggleTask: [taskId: string]
}>()

function toggleTask(taskId: string): void {
  emit('toggleTask', taskId)
}

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
</script>

<style scoped>
.tasks-card {
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

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.task-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 8px;
  background-color: #f8f9fa;
  transition: all 0.2s ease;
  border-left: 3px solid #999;
}

.task-item.high {
  border-left-color: #FF5252;
  background-color: #ffebee;
}

.task-item.medium {
  border-left-color: #FB8C00;
  background-color: #fff3e0;
}

.task-item.low {
  border-left-color: #4CAF50;
  background-color: #f1f8e9;
}

.task-content {
  flex: 1;
  min-width: 0;
}

.task-description {
  font-size: 0.875rem;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.task-description.completed {
  text-decoration: line-through;
  color: #999;
}

.task-meta {
  font-size: 0.75rem;
  color: #999;
}

.task-priority {
  flex-shrink: 0;
  margin-top: 0.125rem;
}
</style>
