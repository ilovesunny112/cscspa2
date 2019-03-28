<script>
export default {
  props:["id"],
  data(){
    return {
      loaded:true
    }
  }
}
</script>


<template>
  <div>
    {{id}}
    <div class="banner" v-if="loaded">
      <div class="img">
        <img :src="'https://www.microsoft.com/china/casestudies/CaseImages/banners/'" alt="">
      </div>

    </div>
    <div class="casebody" v-if="loaded">
      <div class="left casemeta">
          <div class="logo">
            <img :src="'https://www.microsoft.com/china/casestudies/CaseImages/logos/' + logo" alt="">
          </div>
          <dl>
            <dt>客户</dt>
            <dd>公司名</dd>
            <dt>数字化转型领域</dt>
            <dd>转型</dd>
            <dt>解决方案领域</dt>

            <dd>解决</dd>

            <dt>行业</dt>
            <dd>行业</dd>

          </dl>
      </div>
      <div class="right casetext">
        <h3 class="title">
          标题
        </h3>
        <iframe src="https://www.microsoft.com/en-us/videoplayer/embed/RE2K1G3" frameborder="0" allowfullscreen></iframe>
        <div class="maincontent" v-html="quote"></div>
        <div class="maincontent" v-html="body"></div>


      </div>

  </div>

    <div class="related">
        <div class="related_in">
          <h3>
            推荐案例
          </h3>

          

        </div>

    </div>


 
  </div>
</template>
<style lang="less" scoped>
// case detail page
.casebody {
  // max-width: 1600px;
  max-width: 1280px;
  padding: 0 2.5%;

  margin: 0 auto;
  padding-top: 60px;
  margin-bottom: 120px;
  overflow: hidden;

  .casemeta {
    width: 20%;
    height: 200px;

    .logo {
      border: 1px solid #787878;
      padding: 10px 0;
      text-align: center;
      img {
        max-width: 80%;
      }
    }

    dl {
      dt {
        height: 40px;
        background-color: #646464;
        padding-left: 10px;
        color: #fff;
        font-size: 16px;
        line-height: 40px;
        font-weight: bold;
      }
      dd {
        line-height: 28px;
        font-size: 12px;
        color: #505050;
        padding-left: 10px;
      }
    }
  }

  .casetext {
    width: 76%;

    .title {
      line-height: 30px;
      font-size: 18px;
      font-weight: normal;
      margin-bottom: 15px;
    }
    iframe {
      width: 100%;
      height: 400px;
    }
    .maincontent {
      line-height: 200%;
      font-size: 12px;
    }
  }
}
</style>

