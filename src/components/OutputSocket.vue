<template>
    <div class="o">
        {{ socketName }} <span class="input-mark"></span>
    </div>
</template>

<script>
export default {
    name: "OutputSocket",
    props: [ "socketName" ]
};
</script>

<style>
</style>
