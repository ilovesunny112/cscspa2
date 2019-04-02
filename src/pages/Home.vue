<template>
  <div :key="handleDate">
<div class="banner">
      <ul>
        <li class="active">
          <img src="https://www.microsoft.com/china/casestudies/CaseImages/banners/huafeng-banner.jpg" alt="">
          <div class="container">
            <div class="info">
              <h3>华风爱科气象科技（北京）有限公司</h3>
              <p>
                Azure 的虚拟机、存储以及 PaaS 层服务保障华风爱科的气象数据安全高效的实现每秒数万次访问
              </p>
              <div class="cta"><a href="javascript:;">了解详情</a></div>
            </div>
          </div>
        </li>
         <li>
          <img src="https://www.microsoft.com/china/casestudies/CaseImages/banners/huafeng-banner.jpg" alt="">
          <div class="container">
            <div class="info">
              <h3>华风爱科气象科技（北京）有限公司</h3>
              <p>
                Azure 的虚拟机、存储以及 PaaS 层服务保障华风爱科的气象数据安全高效的实现每秒数万次访问
              </p>
              <div class="cta"><a href="javascript:;">了解详情</a></div>
            </div>
          </div>
        </li>
         <li>
          <img src="https://www.microsoft.com/china/casestudies/CaseImages/banners/huafeng-banner.jpg" alt="">
          <div class="container">
            <div class="info">
              <h3>华风爱科气象科技（北京）有限公司</h3>
              <p>
                Azure 的虚拟机、存储以及 PaaS 层服务保障华风爱科的气象数据安全高效的实现每秒数万次访问
              </p>
              <div class="cta"><a href="javascript:;">了解详情</a></div>
            </div>
          </div>
        </li>
      </ul>


    </div>
    <div class="main">
      <div class="digital" v-if="!digitalPage">
        <h3>数字化转型领域</h3>
        <ul>
          <li><router-link :to="{name:'customer connection'}">
            密切客户沟通</router-link></li>
          <li><router-link :to="{name:'power employee'}">
            予力赋能员工
            </router-link></li>
          <li><router-link :to="{name:'optimize business'}">
            优化业务运营</router-link></li>
          <li><router-link :to="{name:'transform service'}">
            转型产品服务</router-link></li>
        </ul>
      </div>


      <div class="container">
        <div class="search fl">
          <div class="inputbox">
            <input type="text" placeholder="" v-model="keyword" >
            <input type="button" value="so" >
          </div>
          <div class="clearall">
            <a href="javascript:;">清空所有选项</a>
          </div>
          <div class="solution">
            <h3>解决方案领域</h3>
            <ul class="">
  
            <li v-for="(item, index) in solutions" :key="index" >
              <h4 :class="{active:item.active}"  @click="toggleShowStatus(item)">{{item.title}}</h4>
              <ul class="opts">
                <li class="item" v-for="(opt,idx) in item.options" :key="idx" >
                  <label>
                    <input type="checkbox" :value="opt.title=='全部' ? `${item.title}_${opt.title}`:`${opt.title}`" v-model="solutionChecked" ><span>{{opt.title}}</span>
                  </label>
                </li>
              </ul>
            </li>
            </ul>
          </div>
          <div class="industry">
            <h3>行业</h3>
            <ul class="opts">
              
              <li class="item" v-for="(ind, index) in industry" :key="index" >
                <label><span>{{ind}}</span><input type="radio" :value="ind" name="indu" v-model="indChecked"></label>
              </li>
            </ul>
          </div>
          
        </div>
        <div class="caselist fr">
          <vue-data-loading   :loading="loading"
              :listens="['pull-down', 'infinite-scroll']"
              :completed="completed"
              @infinite-scroll="infiniteScroll"
              @pull-down="pullDown">
            <case-list :cur-page="1" :caseArr="caseArr"></case-list>
            <div slot="infinite-scroll-loading"> <span>努力的加载...</span></div>
          </vue-data-loading>
        </div>
      </div>
    </div>


  </div>
</template>
<script>
import {getAllMetaData, getListByPage, getListByKeyword} from '../data/index.js'
import CaseList from '../components/CaseList/List'
import VueDataLoading from 'vue-data-loading'
import { setTimeout, clearTimeout } from 'timers';

export default {
  props:{
    digitalPage:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      indChecked:[],
      solutions:[],
      industry:[],
      caseArr:[],
      curPage:1,
      loading:false,
      solutionChecked:[],
      timer:null,
      queryObj:null,
      completed:false,
      keyword:"",
      
    }
  },
  components:{
    CaseList,
    VueDataLoading
  },

  watch:{
    solutionChecked(){
      this.initNewSearch()
    },
    indChecked(){
      this.initNewSearch()
    },
    keyword(){
      clearTimeout(this.timer)
      this.curPage = 0
      this.timer = null;
      
      if(this.keyword.length > 1){
        this.completed = false
        this.caseArr = []
        this.timer = setTimeout(()=>{
          this.fetchDataByKeyword(this.curPage, this.keyword )
        },500)
      }
    }
    
  },

  computed:{
    // solutionChecked(){

    // },
    handleDate(){
    return new Date().getTime()
    }
  },
   methods:{
    toggleShowStatus(item){
      item.active = !item.active
    },
    async init(){
     
      let that = this
      return new Promise(async (resolve, reject)=>{
        try{

        
        that.loading = true
        let [solutionResp, indResp] = await getAllMetaData()
        
        that.solutions = solutionResp.data
        that.industry = indResp.data

        let caseResp = await getListByPage(that.curPage)
        let caseData = caseResp.data;

        if(caseData.code == 0 ){
          that.caseArr = that.caseArr.concat(caseData.data)   
        }
        else {

        }

        

        that.loading = false 
        resolve(caseData)
        this.$Progress.finish()
        } catch(err){
          reject(err)
        }
      })
      
    },
    infiniteScroll(){
      console.log("infiniteScroll invoked");
      this.loading = true;
      if(this.keyword){
        this.fetchDataByKeyword()
      }
      else {
        this.fetchData();
      }
      
    },
    pullDown(){
      console.log("pulldown invoked");
    },
    async fetchData(){
      try{
        this.$Progress.start()
        console.log("curpage is ", this.curPage)


        let page = this.curPage + 1

        let caseResp
        if(this.queryObj && (this.queryObj.solution || this.queryObj.industry)){
          caseResp = await getListByPage(page, this.queryObj)
        }
        else {
          caseResp = await getListByPage(page)
        }
        
        let caseData = caseResp.data;
        if(caseData.code == 0){

          this.caseArr = this.caseArr.concat(caseData.data)
          if(caseData.data.length<12){
            this.completed = true
          }
        }
        else {

        }

        this.curPage = page
        this.loading = false
        this.$Progress.finish()
      }
      catch(err){
        console.log(err)
      }
    },

    initNewSearch(){
      this.queryObj = {
        solution:this.solutionChecked,
        industry:[this.indChecked]
      }
      this.curPage = 0
      this.caseArr = []
      this.loading = true;
      this.fetchData();
    },

    async fetchDataByKeyword(){
      this.curPage++
      this.$Progress.start()
      let caseListRsp = await getListByKeyword(this.curPage, this.keyword)
      let data = caseListRsp.data;
      this.loading = false
      if(data.code == 0 && data.data.length >0){
        this.caseArr = this.caseArr.concat(data.data)
      }
      else {
        this.completed = true
      }
      this.$Progress.finish()
    }

  },
  async created(){
   await this.init()
   console.log(2)
  },
  async mounted(){
    this.$Progress.start()
  }
}
</script>
<style lang="less" scoped>
.banner{

  ul{
    width: 100%;
    overflow: hidden;
    
    li{
      position: relative;
      float: left;
      width: 100%;
      margin-right: -100%;

      &.active{
        margin-right: 0;
      }

      img{
        width: 100%;
        float: left;
      } 
      .container{
        max-width: 1280px;
        height: 100%;
        margin:0 auto;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        
        


        .info{
          position: absolute;
          padding: 15px;
          left: 40px;
          top: 40px;
          width: 322px;
          height: 160px;
          background: rgba(0,0,0,.5);
          text-align: left;
          color: #fff;


          h3{
            font-size: 20px;
            line-height: 48px;  
          }

          p{
            line-height: 26px;
            font-size: 16px;
          }
          .cta{
            a:link,
            a:visited,
            a:hover,
            a:active{
              color: #fff;
              font-size: 16px;
              // font-weight: bold;
              line-height: 34px;
              display: inline-block;
              
              
            }

            a:after{
              content: ">";
              display: inline-block;
              transform: translateX(4px) scale(1.0);
              transition: all .5s;
              
            }

            
            a:hover:after{
              transform: translateX(12px) scale(1.0)
            }
          }
        }
      }
    }
  }


}
.main{

  max-width: 1280px;
  margin: 0 auto;
  margin-top: 11px;
  text-align: left;
  overflow: hidden;

 .digital{
    h3{
    line-height: 66px;
    font-size: 18px;
  }

  ul{
    margin-left: -2%;
    overflow: hidden;
    // max-width: 1280px;
    li{
      float: left;
      width: 23%;
      box-sizing: border-box;
      margin-left: 2%;
      background: #646464;
      text-align: center;


      a{
        display: block;
        line-height: 52px;
        font-size: 14px;
        color: #fff;
        transition: all .6s;
      }
      a:hover{
        background-color: #3c3c3c;
      }

    }
  }
 }

 .container{
   overflow: hidden;
  //  margin-left: -2%;
   padding-top: 30px;


   .search{

    width: 23%;
     

 

    .inputbox{
      border: 1px solid #b5b5b5;
      line-height: 30px;
      height: 30px;
      overflow: hidden;
      position: relative;

      input{
        height: 30px;
        border: none;
        background-color: #fff;
        margin: 0;
        padding: 0;
        display: inline-block;
        outline:none;
        box-sizing: border-box;
      }

      input:first-child{
        width: 100%;
        padding:0 40px 0 10px;
        
      }
      input:last-child{
        width: 30px;
        height: 30px;
        position: absolute;
        right: 0;
        top: 0;
      }
    }

    .clearall{
      margin-top: 24px;
      border-top: 1px solid #787878;

      a{
        line-height: 40px;
        height: 40px;
        font-size: 12px;
        color: #05a4ee;
        padding-left: 10px;
      }
    }
    h3{
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        background: #646464;
      }
    .solution{
      

      ul{

        li{
          margin-top: 1px;
          h4{
            height: 35px;
            line-height: 35px;
            background-color: #dcdedf;
            padding-left: 44px;
            color: #505050;
            font-size: 13px;
            position: relative;
            cursor: pointer;
            &+ul{
              height: 0px;
            }
            &:after{
              content:"";
              display: block;
              position: absolute;
              width: 8px;
              height: 8px;
              border: 1px solid #6b6270;
              border-bottom-color: transparent;
              border-right-color: transparent;
              top: 16px;
              right: 10px;
              transition: all .6s;
              transform: rotateZ(45deg) scale(0.8);
              transform-origin: 50%;
              
            }

            &.active{
              &:after{
                transform: rotate(945deg);
                top:10px;
              }

              &+ul.opts{
                height: auto;
                transform: scaleY(1);
                max-height: 270px;
              }
            }
          }

          .opts{
            // height: 0px;
            // transform: scaleY(0);
            overflow: hidden;
            transform-origin: top;
            transition: all .9s;
            max-height:0;
            height: 0;
            .item{
              label{
                line-height: 30px;
                height: 30px;
                font-size: 12px;
                display: block;
                cursor: pointer;
                padding-left: 10px;

                input{
                  margin: 0;
                  padding: 0;
                  margin-top: -2px;
                  margin-bottom: 1px;
                  vertical-align: middle
                  
                }

                span{
                  padding-left: 12px;
                }
              }
            }
          }
        }
      }
    }

    .industry{
      margin-top: 40px;
      

      .opts{

        .item{
          line-height: 40px;
          border-bottom: 1px solid #c1c1c1;
          font-size: 12px;

          label{
            display: block;
            cursor: pointer;
            padding-left: 10px;
            position: relative;
            input{
              margin-top: -2px;
              margin-bottom: 1px;
              vertical-align: middle;
              position: absolute;
              right: 10px;
              top: 16px;
            }
          }
        }
      }
    }

   }

   .caselist{
     width: 75%;
     padding-left: 10px;
     box-sizing: border-box;
     padding-bottom: 100px;
   }
 }
  
  
}

</style>

