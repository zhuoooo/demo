<template>
    <section class="draggable-demo">
        <el-table
            :data="data"
            ref="table"
            stripe
            height="300"
            style="width: 100%"
        >
            <el-table-column type="index" />
            <el-table-column prop="date" label="日期" width="180" />
            <el-table-column prop="name" label="昵称" width="180" />
            <el-table-column prop="address" label="地址" />
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
import { onMounted, ref } from 'vue-demi';
import { tableData } from './data';

const data: Record<string, any>[] = tableData;
const table = ref(ElTable);

onMounted(() => {
    const tbody = document.querySelector('.el-table tbody');

    Sortable.create(tbody, {
        onEnd() {
            // 这里去发起请求
            // 刷新列表
            // console.log('end');
        }
    });
});

const scrollTop = (y: number) => {
    table.value.$refs.scrollWrapper.setScrollTop(y);
};
</script>
