<template>
    <div class="i">
        <span class="input-mark"></span> {{ socketName }}
    </div>
</template>

<script>
export default {
    name: "InputSocket",
    props: [ "socketName" ]
};
</script>

<style>
</style>
