<template>
  <div class="scroll-text">{{text}}</div>
</template>
<script>
export default {
  props:{
      canScroll:{
          type:Boolean,
          default:true
      }
  },
  computed:{
      text(){
          if(this.canScroll){
              return '上拉加载更多...'
          }else{
              return '暂无更多数据'
          }
      }
  }
}
</script>
