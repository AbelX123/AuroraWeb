import { ref } from "vue";

// 中间变量
const activeItemId = ref();

// 鼠标悬停省略号
const hoveredBox = ref()

// 鼠标进入历史记录区域显示省略号并修改背景颜色
function handleMouseEnterEllipsis(contentId: string) {
    hoveredBox.value = contentId;
}

function isActice(id: string) {
    return id === activeItemId.value;
}

// 鼠标离开历史记录区域隐藏省略号并取消背景颜色
function handleMouseLeaveEllipsis() {
    hoveredBox.value = "-1";
}

function isHidden(id: string) {
    return id != hoveredBox.value
}

function activeState(id: string) {
    // 当前激活
    activeItemId.value = id === activeItemId.value ? null : id;
}

export default { activeItemId, hoveredBox, handleMouseEnterEllipsis, isActice, handleMouseLeaveEllipsis, isHidden, activeState }