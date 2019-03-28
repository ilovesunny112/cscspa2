<script>
import {getCaseById} from '../data/index.js'
import { release } from 'os';
import CaseList from '../components/CaseList/List.vue'
export default {
  props:["id"],
  components:{
    CaseList
  },
  data(){
    return {
      loaded:false,
      caseBody:{

      },
      related:[]
    }
  },
  async created(){
    let data = await this.fetchData(this.id)
    console.log(data)
    let {body, related} = data
    this.caseBody = body 
    this.related = related
    this.loaded = true
  },
  mounted(){

  },
  methods:{
    fetchData(id){
      
      return new Promise(async (resolve, reject)=>{
        try{
          let res = await getCaseById(id)
          let data = res.data;
          
          resolve(data)
        }catch(err){
          reject(err)
        }
      })
    }
  }
}
</script>


<template>
  <div class="detail"> 
    <div class="banner" v-if="loaded">
      <div class="img">
        <img :src="`https://www.microsoft.com/china/casestudies/CaseImages/banners/${caseBody.banner}`" alt="">
      </div>

    </div>
    <div class="casebody" v-if="loaded">
      <div class="fl casemeta">
          <div class="logo">
            <img :src="'https://www.microsoft.com/china/casestudies/CaseImages/logos/' + caseBody.logo" alt="">
          </div>
          <dl>
            <dt>客户</dt>
            <dd>{{caseBody.company}}</dd>
            <dt>数字化转型领域</dt>
            <dd>{{caseBody.digital}}</dd>
            <dt>解决方案领域</dt>

            <dd>{{caseBody.solution}}</dd>

            <dt>行业</dt>
            <dd>{{caseBody.industry}}</dd>

          </dl>
      </div>
      <div class="fr casetext">
        <h3 class="title">
          {{caseBody.title}}
        </h3>
        <iframe src="https://www.microsoft.com/en-us/videoplayer/embed/RE2K1G3" frameborder="0" allowfullscreen></iframe>
        <div class="maincontent" v-html="caseBody.quote"></div>
        <div class="maincontent" v-html="caseBody.body"></div>


      </div>

  </div>

    <div class="related">
        <div class="related_in">
          <h3>
            推荐案例
          </h3>
          <case-list :caseArr="related" :colomn=4></case-list>
          

        </div>

    </div>


 
  </div>
</template>
<style lang="less" scoped>

.detail{

  .banner{
    .img{
      width: 100%;
      img{
        width: 100%;
      }
    }

  }
  .casebody { 
    text-align: left;
    max-width: 1280px;
    

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

.related{
  background: #ebebeb;


  .related_in{
    max-width: 1280px;
    margin: 0 auto;
    text-align: left;

    h3{
      font-size: 18px;
      padding-left: 2%;
      line-height: 70px;
    }
    li{
      margin-left: 2%;
    }
  }
}

}
// case detail page

</style>

