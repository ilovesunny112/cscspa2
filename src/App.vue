<template>
  <div id="app">
    
    <div class="nav">
      <div class="logo"><img src="./assets/mslogo.png" alt=""></div>
      <ul>
        <li class="navitem"><a href="javascript:;">商店</a></li>
        <li class="navitem"><a href="javascript:;">产品</a></li>
        <li class="navitem"><a href="javascript:;">支持</a></li>
      </ul>

      <div class="searchbox">
        <input type="text" placeholder="在 Microsft.com 中搜索">
        <input type="button" value="so">
      </div>
    </div>
    <div class="header">
      <div class="container">
        <h1>
          <router-link :to="{name:'home'}">
            微软中国案例中心
          </router-link>
        </h1>
      </div>
    </div>


    <!-- 从这开始 是 组件 的内容 -->
    <transition name="fade">
      <router-view/>
    </transition>
    <!-- 组件结束 -->
    <div class="footer">
      <div class="main">
      <div class="locale fl">
        <i class="earth"></i>
        <span>中文（中华人民共和国）</span>
      </div>
      <div class="contact fr">
        <ul>
          <li><a href="#">联系我们</a></li>
          <li><a href="#">隐私与 Cookie</a></li>
          <li><a href="#">使用条款</a></li>
          <li><a href="#">商标</a></li>
          <li><a href="#">关于我们的广告</a></li>
          <li><a href="#">京ICP备09042378号-6</a></li>
          <li><a href="#">京公网安备 11010802023178</a></li>
        </ul>
      </div>
    </div>
  </div>



    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/detail/577">Detail</router-link>
    </div> -->
    
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<style lang="less">
@import url('./assets/less/reset.less');

.nav{
  max-width: 1280px;
  margin: 0 auto;
  height: 50px;
  


  .logo{
    float: left;
    height: 100%;
    width: 108px;
    position: relative;;
    img{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }

    
  }
  ul{
      margin-left: 24px;
      list-style: none;
      overflow: hidden;
      float: left;
      .navitem{
        float: left;
        line-height: 50px;
        width: 100px;

        a{
          display: block;
          height: 100%;
          line-height: 50px;
          font-size: 16px;
          transition: .6s all;
        }

        a:link,
        a:visited,
        a:hover,
        a:active{
          text-decoration: none;
          color: #2f2f2f;
        }

        a:hover{
          color: #2c3e50;
          background-color: #f1f1f1;
        }
      }
    }





  
  .searchbox{
    float:right;
    border: 1px solid #a9a9a9;
    margin-top: 7px;
    height: 34px;
    overflow: hidden;

    input[type=text]{
       
      border: none;
      height: 34px;
      line-height: 34px;
      font-size: 16px;
      padding: 0 12px;
      outline: none;
    }
    input[type=button]{
      width: 34px;
      height: 34px;
      line-height: 34px;
      border: none;
      outline: none;
      padding:0;
      margin: 0;
      background-color: #f1f1f1;
    }
  }
  }







.header{
  background: #2f2f2f;
  height: 65px;
  .container{
   max-width: 1280px;
   padding: 0 20px;
   margin: 0 auto;

   h1{
     font-size: 20px;
     font-weight: normal;
     color: #fff;
     float: left;
      
     
     a{
       display: block;
       height: 100%;
       line-height: 65px;
     
       color: #fff;
     }
     a:hover{
       background-color: #464646;
     }
     
   }
  }
}


.footer {
  height: 60px;
  position: fixed;
  background: #f2f2f2;
  bottom: 0;
  width: 100%;

  a:hover {
    text-decoration: underline;
  }

  .main {
    max-width: 1280px;
    margin: 0 auto;
    overflow: hidden;

    .locale {
      position: relative;
      padding-left: 40px;
      padding-top: 18px;
      height: 60px;
      .earth {
        display: block;

        background: url(./assets/images/earth.png) no-repeat;
        width: 30px;
        height: 30px;
        left: 0;
        top: 16px;
        position: absolute;
      }
      span {
        font-size: 12px;
      }
    }

    .contact {
      li {
        float: left;
        padding-right: 30px;
        padding-top: 18px;
        a {
          font-size: 12px;
          color: #626262;
        }
      }
    }
  }
}



.fl{
  float: left;
}
.fr{
  float: right;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>


<script>
import {getAllMetaData, getListByPage} from './data/index.js'
import CaseList from './components/CaseList/List'
import VueDataLoading from 'vue-data-loading'
 



export default {
   
  data(){
    return {
       
    }
  },
  components:{
   
    VueDataLoading
  },
    



}
</script>
