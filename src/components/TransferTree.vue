<template>
    <ElTree :data="leftData" :show-checkbox="true"></ElTree>
</template>

<script lang="ts" setup>
import { ElTree } from 'element-plus';
import { watch, ref, onMounted } from 'vue';

export interface TransferTreeNode {
    label: string;
    state?: 'none' | 'all' | 'part';
    path?: string;
    disabled?: boolean;
    parent?: TransferTreeNode;
    children?: TransferTreeNode[];
}

interface TransferTreeProps {
    data: TransferTreeNode[];
}

const props = defineProps<TransferTreeProps>();

let leftData = ref<TransferTreeNode[]>([]);
const watchData = watch(
    () => props.data,
    val => {
        leftData.value = initLeftData(val);
    }
);

onMounted(() => {
    leftData.value = initLeftData(props.data);
});

function initLeftData(val: TransferTreeNode[]) {
    const cas = (tree: TransferTreeNode, parentPath: string) => {
        tree.state = 'all';
        tree.path = parentPath;

        tree.children?.forEach((item, index) =>
            cas(item, `${parentPath}.children[${index}]`)
        );
    };

    val.forEach((item, index) => cas(item, `[${index}]`));

    return val;
}
</script>

<style scoped></style>
