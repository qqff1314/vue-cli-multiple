<template>
  <div id="main">
    <div class="bubble-box" :style="{'top':top + 'px'}">
      <bubble :y="bubbleY"></bubble>
    </div>
    <scroll ref="wrapper" class="news-list" :data="list"
            :canScroll="canScroll"
            :listenScroll="true"

            :pullup="pullup"
            :pulldown="pulldown"

            @scroll="scroll"
            @scrollToEnd="toBottom"
            @pulldown="toTop">
      <div>
        <div class="news-item" v-for="(item,index) in list">
          <div class="news-item__content">
            <div class="news-item__content__title">{{item.title}}</div>
            <div class="news-item__content__time">{{item.create_at}}</div>
          </div>
          <div class="news-item__image bg-over" v-if="item.photo" :style="{backgroundImage:'url('+item.photo+')'}"></div>
        </div>
      </div>
    </scroll>
    <nav-bar :num="1"></nav-bar>
  </div>
</template>
<script>
  import Navbar from '../../components/footer.vue'
  import scroll from '../../components/scroll.vue'
  import Bubble from '../../components/Bubble'
  export default {
    data(){
      return{
        list:[],

        pageNo:1,
        limit:10,

        pullup: true,//上拉加1
        pulldown: true,//下拉1

        Total:0,//总页面

        posY: 0,
        bubbleY: 0,

      }
    },
    computed: {
      top() {
        return this.posY - 80
      },
      canScroll() {  //判断是否为最后一页，是否能再次加载
        if (this.pageNo >= Math.ceil(this.Total / this.limit)) {
          return false
        } else {
          return true
        }
      }
    },
    mounted(){
      this.ajax();
    },
    methods: {
      //this.$refs.wrapper.refresh()//重新计算高度
      scroll(pos) {
        this.posY = pos.y;
        this.bubbleY = pos.y - 80
      },
      toTop(){
        this.pageNo=1;
        this.ajax();
      },
      toBottom(){
        this.pageNo++;
        this.ajax();
      },
      ajax(){
        let t = this;
        t.$loading.open({
          text: '加载中...',
        });
        t.$http.get('/project/list?type=-1&page='+t.pageNo+'&size='+t.limit+'&status=-1&rate=-1&cycle=-1&sort=-1')
          .then(function(res) {
            if(t.pageNo == 1){
              t.list = res.data.returnData.list;
            }
            else{
              t.list = t.list.concat(res.data.returnData.list);
            }
            t.Total=Number(res.data.returnData.total);
            t.$loading.close();
          }).catch(function () {
          t.$loading.close();
        })
      }
    },
    components: {
      'bubble': Bubble,
      'nav-bar':Navbar,
      'scroll': scroll,
    },
  }
</script>
<style lang="scss" scoped>
  .mint-indicator-wrapper{
    z-index: 999;
  }
  .bubble-box {
    position: absolute;
    left: 50%;
    margin-left: -25px;
  }
  .scroll-text{
    text-align: center;
    font-size: .3rem;
    line-height: .6rem;
    height: .6rem;
    color: #999;
  }


  .news-list{
    width: 100%;
    position: absolute;
    top: 0;
    bottom: .98rem;
    left: 0;
    overflow: hidden;
  }
  .news-item{
    display: flex;
    padding: .3rem 0.3rem;
    background: #fff;
    border-bottom: 1px solid #eee;
    height: 2.7rem;
    &__content{
      flex:1;
      &__title{
        font-size: .34rem;
        line-height: .49rem;
        height: 0.98rem;
        overflow: hidden;
      }
      &__time{
        font-size: .24rem;
        line-height: 1;
        color: #aaa;
        margin-top: 0.75rem;
      }
    }
    &__image{
      width: 2rem;
      height: 2rem;
      margin-left: 0.4rem;
      border-radius: .1rem;
      overflow: hidden;
    }
  }
</style>
