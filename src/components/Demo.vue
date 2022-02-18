<template>
    <section class="draggable-demo">
        <el-table :data="data" stripe height="300" style="width: 100%">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
        </el-table>
    </section>
</template>

<style scoped>
.draggable-demo {
    height: 50vh;
}
</style>

<script lang="ts" setup>
import { ElTable, ElTableColumn } from 'element-plus';
import Sortable from 'sortablejs';
import { onMounted } from 'vue-demi';
import { tableData } from './data';

const data: Record<string, any>[] = tableData;

onMounted(() => {
    const tbody = document.querySelector('.el-table tbody');

    Sortable.create(tbody);
});
</script>
