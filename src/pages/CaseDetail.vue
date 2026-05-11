<template>
  <div class="case-detail">
    <router-link to="/">← Back to Dashboard</router-link>
    <h1>Case Details</h1>
    <p v-if="id">Case ID: {{ id }}</p>
    <p v-else>No case selected</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const id = router.currentRoute.value.params.id
</script>

<style scoped>
.case-detail {
  padding: 2rem;
}

a {
  color: #0066cc;
  text-decoration: none;
  margin-bottom: 1rem;
  display: block;
}

a:hover {
  text-decoration: underline;
}
</style>
