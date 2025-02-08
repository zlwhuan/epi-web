<template>
  <el-table :data="history" style="width: 100%">
    <el-table-column prop="date" label="日期" width="180" />
    <el-table-column prop="record" label="就诊记录" />
  </el-table>
</template>

<script>
export default {
  name: 'PatientHistory',
  props: {
    history: {
      type: Array,
      required: true,
    },
  },
}
</script>
