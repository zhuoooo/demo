<template>
    <section class="draggable-demo">
        <el-table
            :data="data"
            ref="table"
            stripe
            height="300"
            :row-key="row => row.id"
        >
            <el-table-column width="100">
                <template #default="scope">
                    <span class="index">{{ scope.$index }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="日期" width="0.2" />
            <el-table-column prop="name" label="昵称" width="0.2" />
            <el-table-column prop="address" label="地址" width="0.4" />
            <el-table-column label="操作" width="0.2">
                <img
                    class="draggable-table-row__handler"
                    src="../assets/drag.png"
                    title="按住拖动"
                />
            </el-table-column>
        </el-table>
    </section>
</template>

<style>
.draggable-demo {
    height: 50vh;
}
.draggable-table-row__handler {
    cursor: move;
    cursor: grab;
    margin-right: 16px;
    width: 16px;
    height: 16px;
    user-select: none;
}

.draggable-table-row__handler:active {
    cursor: grabbing;
}
.dragging-cursor {
    cursor: grabbing;
}
.draggable-table-row__dragging {
    display: table;
    cursor: move;
    box-shadow: 0 0 0 1px #e0e0e0, 0 0 8px 0 rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    background: transparent;
}
</style>

<script lang="ts" setup>
import { ElTable, ElTableColumn } from 'element-plus';
import Sortable from 'sortablejs';
import { onMounted, ref } from 'vue';
import { tableData } from './data';

let data = ref(tableData);
const table = ref<Record<string, any>[]>([]);
const ua = navigator.userAgent.toLowerCase();

onMounted(() => {
    const tbody = document.querySelector('.el-table tbody');

    Sortable.create(tbody, {
        animation: 180,
        delay: 0,
        handle: '.draggable-table-row__handler',
        forceFallback: true,
        fallbackClass: 'draggable-table-row__dragging',
        ghostClass: 'dragging-cursor',
        scrollSensitivity: 40, // 当拖拽到可滚动区域最上/下方 40 px的地方时，自动向上/下滚动
        onEnd() {
            // 不管有没有进行拖拽移动，都会触发
        },
        onMove() {},
        onUpdate() {
            // 这里去发起请求
            // 刷新列表
            refreshTable();
        },
        setData: ua.includes('firefox')
            ? (dataTransfer: any) => {
                  // firefox 拖拽时会打开新窗口, 需要规避
                  dataTransfer.setData('noText', '');
                  dataTransfer.effectAllowed = 'move';
              }
            : null
    });
});

const refreshTable = async () => {
    setTimeout(() => {
        let ran = Math.max((tableData.length * Math.random()) >> 0, 2);
        data.value = tableData.slice(0, ran).reverse();
    }, 300);
};
</script>
