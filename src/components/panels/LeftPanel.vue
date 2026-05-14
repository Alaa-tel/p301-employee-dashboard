<template>
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
</template>

<script setup lang="ts">
import type { Case, Alert } from '../../types'
import SLAAlerts from '../SLAAlerts.vue'
import MyCases from '../MyCases.vue'

defineProps<{
  cases: Case[]
  alerts: Alert[]
}>()
</script>

<style scoped>
.left-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.panel {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* Responsive Design */
@media (min-width: 1600px) {
  .left-column {
    gap: 2rem;
  }
}

@media (max-width: 1199px) {
  .left-column {
    gap: 1.25rem;
  }
}

@media (max-width: 1023px) {
  .left-column {
    gap: 1rem;
  }
}

@media (max-width: 767px) {
  .left-column {
    gap: 0.875rem;
  }

  .panel {
    border-radius: 6px;
  }
}

@media (max-width: 480px) {
  .left-column {
    gap: 0.75rem;
  }

  .panel {
    border-radius: 6px;
  }
}
</style>
