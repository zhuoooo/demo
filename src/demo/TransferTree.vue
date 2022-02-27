<template>
    <TransferTree :data="data"></TransferTree>
</template>

<script lang="ts" setup>
import TransferTree from '../components/TransferTree.vue';

const data = [
    {
        label: '全部',
        children: [
            {
                label: '子组1'
            }
        ]
    }
];
</script>
