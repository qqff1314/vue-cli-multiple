<template>
  <div class="nav-bar bt">
    <a :href="item.url" :class="['nav-bar__item',index == num ? 'cur':'']" v-for="(item,index) in navList">
      <div class="nav-bar__item__icon"></div>
      <div class="nav-bar__item__text">{{item.title}}</div>
    </a>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        navList:[{title:'首页',url:'index.html'},{title:'理财',url:'card.html'},{title:'资讯',url:'notice.html'},{title:'我的',url:'center.html'}],
      }
    },
    props:['num']
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .nav-bar{
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    height: .98rem;
    background: #fff;
    z-index: 10;
    display: flex;

    &__item{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      &__icon{
        width: .44rem;
        height: .44rem;
      }
      &__text{
        font-size: .2rem;
        line-height: 1;
        color: #babfc9;
        margin-top: .1rem;
      }
      &:nth-child(1) &__icon{
        background: url("../assets/img/nav_icon1.png") no-repeat;
        background-size: contain;
      }
      &:nth-child(2) &__icon{
        background: url("../assets/img/nav_icon2.png") no-repeat;
        background-size: contain;
      }
      &:nth-child(3) &__icon{
        background: url("../assets/img/nav_icon3.png") no-repeat;
        background-size: contain;
      }
      &:nth-child(4) &__icon{
        background: url("../assets/img/nav_icon4.png") no-repeat;
        background-size: contain;
      }
      &.cur{
        .nav-bar__item__text{
          color: #ff5a59;
        }
      }
      &:nth-child(1).cur &__icon{
        background: url("../assets/img/nav_icon5.png") no-repeat;
        background-size: contain;
      }
      &:nth-child(2).cur &__icon{
        background: url("../assets/img/nav_icon6.png") no-repeat;
        background-size: contain;
      }
      &:nth-child(3).cur &__icon{
        background: url("../assets/img/nav_icon7.png") no-repeat;
        background-size: contain;
      }
      &:nth-child(4).cur &__icon{
        background: url("../assets/img/nav_icon8.png") no-repeat;
        background-size: contain;
      }

    }
  }
</style>
