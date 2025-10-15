<script setup lang="ts">
    const route = useRoute();
</script>

<template>
    <h1>Equipment with ID: {{ route.params.id }}</h1>
</template>