<template>
  <div id="app">

    <div class="nav">
      <div class="logo"><img
          src="./assets/mslogo.png"
          alt=""
        ></div>
      <transition name="fade">
        <ul :class="{active:active}">
          <li class="navitem"><a href="javascript:;">商店</a></li>
          <li class="navitem"><a href="javascript:;">产品</a></li>
          <li class="navitem"><a href="javascript:;">支持</a></li>

        </ul>
      </transition>
      <ul class="header-toggle">
        <li>
          <button
            class="header-toggle-menu"
            @click="toggleMenu"
            :class="[active?'close':'open']"
          ></button>
        </li>
        <li>
          <button class="header-toggle-menu search"></button>
        </li>
      </ul>
      <div class="searchbox">
        <input
          type="text"
          placeholder="在 Microsft.com 中搜索"
        >
        <input
          type="button"
          value="so"
        >
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
      <router-view v-if="routeLoaded" />
    </transition>
    <!-- 组件结束 -->

    <!-- notification -->

    <!-- notification end -->
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
@import url("./assets/less/reset.less");

.nav {
  max-width: 1280px;
  margin: 0 auto;
  height: 50px;

  .logo {
    float: left;
    height: 100%;
    width: 108px;
    position: relative;
    img {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
  ul {
    margin-left: 24px;
    list-style: none;
    overflow: hidden;
    float: left;
    .navitem {
      float: left;
      line-height: 50px;
      width: 100px;

      a {
        display: block;
        height: 100%;
        line-height: 50px;
        font-size: 16px;
        transition: 0.6s all;
      }

      a:link,
      a:visited,
      a:hover,
      a:active {
        text-decoration: none;
        color: #2f2f2f;
      }

      a:hover {
        color: #2c3e50;
        background-color: #f1f1f1;
      }
    }

    .togglebtn {
      display: none;
    }
  }
  .header-toggle {
    display: none;
  }
  .searchbox {
    float: right;
    border: 1px solid #a9a9a9;
    margin-top: 7px;
    height: 34px;
    overflow: hidden;

    input[type="text"] {
      border: none;
      height: 34px;
      line-height: 34px;
      font-size: 16px;
      padding: 0 12px;
      outline: none;
    }
    input[type="button"] {
      width: 34px;
      height: 34px;
      line-height: 34px;
      border: none;
      outline: none;
      padding: 0;
      margin: 0;
      background-color: #f1f1f1;
    }
  }
}

.header {
  background: #2f2f2f;
  height: 65px;
  .container {
    max-width: 1280px;
    padding: 0 20px;
    margin: 0 auto;

    h1 {
      font-size: 20px;
      font-weight: normal;
      color: #fff;
      float: left;

      a {
        display: block;
        height: 100%;
        line-height: 65px;

        color: #fff;
      }
      a:hover {
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

.fl {
  float: left;
}
.fr {
  float: right;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media screen and (max-width: 1199px) {
}

@media screen and (max-width: 991px) {
  .nav {
    width: 100%;
    margin: 0 auto;
    height: 50px;
    position: relative;

    .logo {
      float: left;
      height: 100%;
      width: 108px;
      position: relative;
      padding-left: 30px;
      img {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
    ul {
      list-style: none;

      margin: 0;
      padding: 0;
      padding-bottom: 10px;
      border-top: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
      float: left;
      display: none;
      position: absolute;
      top: 50px;
      left: 0;
      width: 100%;
      background-color: #f2f2f2;
      z-index: 999;

      &.active {
        display: block;
      }

      .navitem {
        line-height: 40px;
        height: 40px;
        width: 100%;
        border-bottom: 1px solid #e6e6e6;

        a {
          display: block;
          height: 100%;
          line-height: 40px;
          font-size: 16px;
          transition: 0.6s all;
        }

        a:link,
        a:visited,
        a:hover,
        a:active {
          text-decoration: none;
          color: #2f2f2f;
        }

        a:hover {
          color: #2c3e50;
          background-color: #f1f1f1;
        }
      }

      .togglebtn {
        display: block;
      }
    }
    .header-toggle {
      display: block;
      position: absolute;
      top: 0px;
      right: 0;
      left: auto;
      height: 50px;
      background-color: #fff;
      border: none;
      width: 100px;
      padding: 0;
      margin: 0;
      float: none;

      li {
        float: right;
        padding-right: 20px;

        button {
          width: 16px;
          height: 16px;
          margin: 0;
          padding: 0;
          margin-top: 18px;
          border: none;
          outline: none;
        }

        button.close {
          background: url("./assets/images/close.png") no-repeat;
          background-size: contain;
        }

        button.open {
          background: url("./assets/images/3line.png") no-repeat;
          background-size: contain;
        }

        button.search {
          background: url("./assets/images/search.png") no-repeat;
          background-size: contain;
        }
      }
    }
    .searchbox {
      display: none;
    }
  }

  .header {
    background: #2f2f2f;
    height: 55px;
    .container {
      width: auto;
      padding: 0 10px;
      margin: 0 auto;

      h1 {
        font-size: 20px;
        font-weight: normal;
        color: #fff;
        float: left;

        a {
          display: block;
          height: 100%;
          line-height: 55px;

          color: #fff;
        }
        a:hover {
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
      width: 100%;
      margin: 0 auto;
      overflow: hidden;

      .locale {
        display: none;
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
        width: 100%;
        ul {
          display: flex;
          float: none;
          width: 100%;
          height: 60px;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          li {
            float: none;
            flex: 1;
            padding: 0;
            a {
              font-size: 12px;
              color: #626262;
              line-height: 60px;
            }

            &:nth-child(n + 4) {
              display: none;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
}
@media screen and (max-width: 749px) {
}
@media screen and (max-width: 639px) {
}
@media screen and (max-width: 414px) {
  .nav {
    width: 100%;
    margin: 0 auto;
    height: 50px;
    position: relative;

    .logo {
      float: left;
      height: 100%;
      width: 108px;
      position: relative;
      padding-left: 30px;
      img {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
    ul {
      list-style: none;

      margin: 0;
      padding: 0;
      padding-bottom: 10px;
      border-top: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
      float: left;
      display: none;
      position: absolute;
      top: 50px;
      left: 0;
      width: 100%;
      background-color: #f2f2f2;
      z-index: 999;

      &.active {
        display: block;
      }

      .navitem {
        line-height: 40px;
        height: 40px;
        width: 100%;
        border-bottom: 1px solid #e6e6e6;

        a {
          display: block;
          height: 100%;
          line-height: 40px;
          font-size: 16px;
          transition: 0.6s all;
        }

        a:link,
        a:visited,
        a:hover,
        a:active {
          text-decoration: none;
          color: #2f2f2f;
        }

        a:hover {
          color: #2c3e50;
          background-color: #f1f1f1;
        }
      }

      .togglebtn {
        display: block;
      }
    }
    .header-toggle {
      display: block;
      position: absolute;
      top: 0px;
      right: 0;
      left: auto;
      height: 50px;
      background-color: #fff;
      border: none;
      width: 100px;
      padding: 0;
      margin: 0;
      float: none;

      li {
        float: right;
        padding-right: 20px;

        button {
          width: 16px;
          height: 16px;
          margin: 0;
          padding: 0;
          margin-top: 18px;
          border: none;
          outline: none;
        }

        button.close {
          background: url("./assets/images/close.png") no-repeat;
          background-size: contain;
        }

        button.open {
          background: url("./assets/images/3line.png") no-repeat;
          background-size: contain;
        }

        button.search {
          background: url("./assets/images/search.png") no-repeat;
          background-size: contain;
        }
      }
    }
    .searchbox {
      display: none;
    }
  }

  .header {
    background: #2f2f2f;
    height: 55px;
    .container {
      width: auto;
      padding: 0 10px;
      margin: 0 auto;

      h1 {
        font-size: 20px;
        font-weight: normal;
        color: #fff;
        float: left;

        a {
          display: block;
          height: 100%;
          line-height: 55px;

          color: #fff;
        }
        a:hover {
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
      width: 100%;
      margin: 0 auto;
      overflow: hidden;

      .locale {
        display: none;
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
        width: 100%;
        ul {
          display: flex;
          float: none;
          width: 100%;
          height: 60px;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          li {
            float: none;
            flex: 1;
            padding: 0;
            a {
              font-size: 12px;
              color: #626262;
              line-height: 60px;
            }

            &:nth-child(n + 4) {
              display: none;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 375px) {
}
</style>


<script>
import { getAllMetaData, getListByPage } from "./data/index.js";
import CaseList from "./components/CaseList/List";
import VueDataLoading from "vue-data-loading";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      routeLoaded: true,
      active: false
    };
  },
  components: {
    VueDataLoading
  },
  mounted() {
    let router = this.$router;
    router.beforeEach((to, from, next) => {
      this.routeLoaded = false;
      console.log("路由变化");
      next();
    });
    router.afterEach((to, from) => {
      setTimeout(() => {
        this.routeLoaded = true;
        console.log("路由变化结束");
      }, 400);
    });

    this.$notify({
      content: "测试测试",
      btn: "close"
    });
    setTimeout(() => {
      this.$notify({
        content: "测试测试2",
        btn: "close"
      });
    }, 1000);

    setTimeout(() => {
      this.$notify({
        content: "测试测试3",
        btn: "close"
      });
    }, 2000);
  },

  methods: {
    toggleMenu() {
      this.active = !this.active;
    },
    beforeEnter() {
      console.log("transition before enter");
    }
  }
};
</script>
