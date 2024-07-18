<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getClosestRegion } from "@utils/locationDetection";

const region = ref("Determining your region...");

onMounted(async () => {
  try {
    region.value = await getClosestRegion();
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <h1>{{ region }}</h1>
</template>

<style scoped></style>
