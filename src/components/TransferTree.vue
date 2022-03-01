<template>
    <section class="transfer-tree">
        <ElTree
            class="left-tree"
            :data="leftData"
            v-bind="leftTreeOptions"
        ></ElTree>
        <ElTree
            class="right-tree"
            :data="rightData"
            :filter-node-method="filterRightTree"
            v-bind="rightTreeOptions"
        ></ElTree>
    </section>
</template>

<script lang="ts" setup>
import { ElTree } from 'element-plus';
import { TreeComponentProps } from 'element-plus/es/components/tree/src/tree.type';
import { watch, ref, onMounted, computed } from 'vue';

export interface TransferTreeNode {
    label: string;
    state?: 'none' | 'all' | 'part';
    path?: string;
    disabled?: boolean;
    parent?: TransferTreeNode;
    children?: TransferTreeNode[];
}

type Left = Partial<Omit<TreeComponentProps, 'data'>>;
type Right = Partial<
    Omit<TreeComponentProps, 'data' | 'showCheckbox' | 'filterNodeMethod'>
>;

interface TransferTreeProps {
    data: TransferTreeNode[];
    leftBind?: Left;
    rightBind?: Right;
}

const props = defineProps<TransferTreeProps>();

let leftData = ref<TransferTreeNode[]>([]);
let rightData = ref<TransferTreeNode[]>([]);

const leftTreeOptions = computed(() => {
    return {
        nodeKey: 'id',
        showCheckbox: true,
        ...props.leftBind
    };
});

const rightTreeOptions = computed(() => {
    return {
        ...leftTreeOptions.value,
        showCheckbox: false,
        ...props.rightBind
    };
});

const watchData = watch(
    () => props.data,
    val => {
        leftData.value = initLeftData(val);
        rightData.value = val;
    }
);

onMounted(() => {
    leftData.value = initLeftData(props.data);
    rightData.value = props.data;
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

function filterRightTree(value: string, data: any) {
    return data.state !== 'none';
}
</script>

<style scoped lang="less">
.transfer-tree {
    display: flex;

    .left-tree,
    .right-tree {
        flex: 1;
    }
}
</style>
