<template>
    <svg width="100%" height="100%"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        >
        <path
        vector-effect="non-scaling-stroke"
        d="M 0,0 C 0.5,0 0.5,1 1,1"/>
    </svg>
</template>

<script>
export default {
    name: "Connection" 
};
</script>

<style>
svg {
    overflow: visible;
}

svg path {
    fill:none;
    stroke:#000000;
    stroke-width:3px;
    stroke-linecap:round;
}
</style>
