<template>
  <div id="main">
    <div class="news-list"  v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
      <div class="news-item" v-for="item in list">
        <div class="news-item__content">
          <div class="news-item__content__title">{{item.Name}}</div>
          <div class="news-item__content__time">{{item.DistrictName}}</div>
        </div>
        <div class="news-item__image bg-over" v-if="item.MainImage" :style="{backgroundImage:'url('+item.MainImage.MediumThumbnail+')'}"></div>
      </div>
    </div>
    <nav-bar :num="0"></nav-bar>
  </div>
</template>
<script>
    import $ from 'jquery'
    import plus from '../../utils/public'
    import Navbar from '../../components/footer.vue'
    export default {
        data(){
            return{
              list:[],
              pageNo:1,
              loading:false
            }
        },
        mounted(){
          plus.putToken('123')
        },
        methods: {
          loadMore(){

            let t = this;
            t.loading = true;
            t.$loading.open({
              text: '加载中...',
            });
            t.$http.get('/Api/v1/Mall/Goods/Recommend')
              .then(function(res) {
                if(t.pageNo==1){
                  t.list = res.data.data.Goods;
                  t.loading = (t.list.length!==10?true:false);
                }else{
                  t.list = t.list.concat(res.data.data.Goods);
                  if(t.pageNo < Math.ceil(parseInt(res.data.data.TotalCount) / 10)){
                    t.loading = false;
                  }
                }

                t.$nextTick(function () {
                  t.pageNo++;
                  t.$loading.close();
                })
              }).catch(function () {
              t.$loading.close();
              t.loading = true;
            })
          }
        },
        components: {
          'nav-bar':Navbar,
        },
    }
</script>
<style lang="scss" scoped>
  .news-list{
    width: 100%;
    position: absolute;
    top: 0;
    bottom: .98rem;
    left: 0;
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
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
