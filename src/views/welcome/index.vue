<script setup lang="ts">
import { getTest } from "@/api/testApi";
import { onMounted } from "vue";

defineOptions({
  name: "Welcome"
});

// 获取数据的方法
const fetchData = async () => {
  try {
    const result = await getTest();
    console.info("getTest:" + result);
  } catch (error) {
    console.error(error);
  } finally {
  }
};

// 页面加载时获取数据
onMounted(() => {
  fetchData();
});
</script>

<template>
  <h1>welcome to moyu-auth!</h1>
</template>
