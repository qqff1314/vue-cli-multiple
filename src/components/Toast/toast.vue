<template>
  <transition name="fade">
  <div v-show="visible" class="toast-box">{{message}}</div>
  </transition>
</template>

<script>
  export default {
    name: 'toast',
    props: {
      message: [String, Number],
    },
    data() {
      return {
        visible: false
      };
    },
  };
</script>
<style>
  .toast-box{
    position: fixed;
    top: 50%;
    font-size: 16px;
    line-height: 30px;
    padding: 8px 24px;
    background: rgba(0,0,0,.7);
    max-width: 500px;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    color: #fff;
    border-radius: 4px;
  }
</style>
