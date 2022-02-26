<script setup lang="ts">
import Demo from './demo/index';
import { ElMenu, ElMenuItem } from 'element-plus';
import { ref } from 'vue';

let menu = Object.keys(Demo);

let curActive = ref(menu[0]);

function changeCurActive(index: string) {
    curActive.value = index;
}
</script>

<template>
    <ElMenu
        :default-active="curActive"
        mode="horizontal"
        @select="changeCurActive"
    >
        <ElMenuItem :index="item" v-for="item of menu" :key="item">
            {{ item }}
        </ElMenuItem>
    </ElMenu>
    <component class="demo" :is="Demo[curActive]" />
</template>

<style scoped>
.demo {
    margin-top: 16px;
}
</style>
