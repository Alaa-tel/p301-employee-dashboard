<template>
  <v-card class="kpi-card">
    <v-card-item>
      <div class="kpi-content">
        <div class="kpi-icon" :style="{ backgroundColor: iconBgColor }">
          <v-icon :icon="icon" size="large" color="white"></v-icon>
        </div>
        <div class="kpi-text">
          <div class="kpi-label">{{ label }}</div>
          <div class="kpi-value">{{ value }}</div>
          <div class="kpi-subtitle">{{ subtitle }}</div>
        </div>
      </div>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number] as PropType<string | number>,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    required: true
  },
  iconBgColor: {
    type: String,
    default: '#1976D2'
  }
})
</script>

<style scoped>
.kpi-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.kpi-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.kpi-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.kpi-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.kpi-text {
  flex: 1;
}

.kpi-label {
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.kpi-value {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.kpi-subtitle {
  font-size: 0.75rem;
  color: #999;
  font-weight: 400;
}
</style>
