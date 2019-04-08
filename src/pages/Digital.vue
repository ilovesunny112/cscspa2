<template>
  <div
    :key="handleDate"
    v-if="componentShow"
  >
    <div class="banner">
      <ul>
        <li v-show="scenario=='customer'">
          <img
            src="https://www.microsoft.com/china/casestudies/images/CaseClass1.jpg"
            alt=""
          >
          <div class="container">
            <div class="info">
              <h3>密切客户沟通</h3>
              <p>
                Engage Customers
              </p>

            </div>
          </div>
        </li>
        <li v-show="scenario=='employee'">
          <img
            src="https://www.microsoft.com/china/casestudies/images/CaseClass2.jpg"
            alt=""
          >
          <div class="container">
            <div class="info">
              <h3>予力赋能员工
              </h3>
              <p>
                Empower Employees
              </p>
            </div>
          </div>
        </li>
        <li v-show="scenario=='business'">
          <img
            src="https://www.microsoft.com/china/casestudies/images/CaseClass3.jpg"
            alt=""
          >
          <div class="container">
            <div class="info">
              <h3>优化业务运营</h3>
              <p>
                Optimize Operations
              </p>
            </div>
          </div>
        </li>
        <li v-show="scenario=='service'">
          <img
            src="https://www.microsoft.com/china/casestudies/images/CaseClass4.jpg"
            alt=""
          >
          <div class="container">
            <div class="info">
              <h3>转型产品服务
              </h3>
              <p>
                Transform Products
              </p>

            </div>
          </div>
        </li>
      </ul>

    </div>
    <div class="main">
      <div
        class="digital"
        v-if="!digitalPage"
      >
        <h3>数字化转型领域</h3>
        <ul>
          <li>
            <router-link :to="{name:'customer connection'}">
              密切客户沟通</router-link>
          </li>
          <li>
            <router-link :to="{name:'power employee'}">
              予力赋能员工
            </router-link>
          </li>
          <li>
            <router-link :to="{name:'optimize business'}">
              优化业务运营</router-link>
          </li>
          <li>
            <router-link :to="{name:'transform service'}">
              转型产品服务</router-link>
          </li>
        </ul>
      </div>

      <div class="container">
        <div class="search fl" :class="{fixed:leftFixed}" ref="leftPanel">
          <left-search
            @solution-update="solutionUpdate"
            @industry-update="industryUpdate"
            :fixed="leftFixed"
          ></left-search>

        </div>
        <div class="caselist fr">
          <vue-data-loading
            :loading="loading"
            :listens="[  'infinite-scroll']"
            :completed="completed"
            @infinite-scroll="infiniteScroll"
            @pull-down="pullDown"
          >
            <case-list
              :cur-page="1"
              :caseArr="caseArr"
            ></case-list>
            <div slot="infinite-scroll-loading"> <span>努力的加载...</span></div>
          </vue-data-loading>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import {
  getAllMetaData,
  getListByPage,
  getListByKeyword
} from "../data/index.js";
import CaseList from "../components/CaseList/List";
import VueDataLoading from "vue-data-loading";
import { setTimeout, clearTimeout } from "timers";
import LeftSearch from "../components/LeftSearch/Left";

export default {
  props: {
    digitalPage: {
      type: Boolean,
      default: false
    },
    scenario: String
  },
  data() {
    return {
      indChecked: [],
      solutions: [],
      industry: [],
      caseArr: [],
      curPage: 1,
      loading: false,
      solutionChecked: [],
      timer: null,
      queryObj: null,
      completed: false,
      keyword: "",
      componentShow: true,
      leftFixed: false
    };
  },
  components: {
    CaseList,
    VueDataLoading,
    LeftSearch
  },

  watch: {
    solutionChecked() {
      this.initNewSearch();
    },
    indChecked() {
      this.initNewSearch();
    },
    keyword() {
      clearTimeout(this.timer);
      this.curPage = 0;
      this.timer = null;

      if (this.keyword.length > 1) {
        this.completed = false;
        this.caseArr = [];
        this.timer = setTimeout(() => {
          this.fetchDataByKeyword(this.curPage, this.keyword);
        }, 500);
      }
    }
  },

  computed: {
    // solutionChecked(){

    // },
    handleDate() {
      return new Date().getTime();
    }
  }, 
  methods: {
    toggleShowStatus(item) {
      item.active = !item.active;
    },
    async init() {
      let that = this;
      return new Promise(async (resolve, reject) => {
        try {
          that.loading = true;
          let [solutionResp, indResp] = await getAllMetaData();

          that.solutions = solutionResp.data;
          that.industry = indResp.data;

          let caseResp = await getListByPage(that.curPage);
          let caseData = caseResp.data;

          if (caseData.code == 0) {
            that.caseArr = that.caseArr.concat(caseData.data);
          } else {
          }

          that.loading = false;
          resolve(caseData);
          this.$Progress.finish();
        } catch (err) {
          reject(err);
        }
      });
    },
    infiniteScroll() {
      console.log("infiniteScroll invoked");
      this.loading = true;
      if (this.keyword) {
        this.fetchDataByKeyword();
      } else {
        this.fetchData();
      }
    },
    pullDown() {
      console.log("pulldown invoked");
    },
    async fetchData() {
      try {
        this.$Progress.start();
        console.log("curpage is ", this.curPage);

        let page = this.curPage + 1;

        let caseResp;
        if (
          this.queryObj &&
          (this.queryObj.solution || this.queryObj.industry)
        ) {
          caseResp = await getListByPage(page, this.queryObj);
        } else {
          caseResp = await getListByPage(page);
        }

        let caseData = caseResp.data;
        if (caseData.code == 0) {
          this.caseArr = this.caseArr.concat(caseData.data);
          if (caseData.data.length < 12) {
            this.completed = true;
          }
        } else {
        }

        this.curPage = page;
        this.loading = false;
        this.$Progress.finish();
      } catch (err) {
        console.log(err);
      }
    },

    initNewSearch() {
      this.queryObj = {
        solution: this.solutionChecked,
        industry: [this.indChecked]
      };
      this.curPage = 0;
      this.caseArr = [];
      this.loading = true;
      this.fetchData();
    },

    async fetchDataByKeyword() {
      this.curPage++;
      this.$Progress.start();
      let caseListRsp = await getListByKeyword(this.curPage, this.keyword);
      let data = caseListRsp.data;
      this.loading = false;
      if (data.code == 0 && data.data.length > 0) {
        this.caseArr = this.caseArr.concat(data.data);
      } else {
        this.completed = true;
      }
      this.$Progress.finish();
    },

    setFixedClass() {
      console.log(this.$refs.leftPanel);
      let el = this.$refs.leftPanel;

      let targetH = getElementTop(el);
      targetH = targetH < 376 ? 376 : targetH;
      let that = this;
      console.log("target h",targetH)
      window.addEventListener("scroll", function() {
        let newTargetH = getElementTop(el);

        if (newTargetH > targetH) {
          targetH = newTargetH;
        }

       

        var scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop;

        if (scrollTop > targetH - 20) {
          that.leftFixed = true;
        } else {
          that.leftFixed = false;
        }
      });
    },
    solutionUpdate(solution) {
      this.solutionChecked = solution;
    },
    industryUpdate(industry) {
      this.indChecked = industry;
    }
  },
  async created() {
    await this.init();
    console.log(2);
  },
  async mounted() {
    this.$Progress.start();
     this.setFixedClass();
  },
  beforeUpdate() {
    this.componentShow = false;
    console.log("before update");
    this.componentShow = true;
  }
};

function getElementTop(el) {
  var actualTop = el.offsetTop;
  var current = el.offsetParent;

  while (current) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop;
}
</script>
<style lang="less" scoped>
.banner {
  ul {
    width: 100%;
    overflow: hidden;

    li {
      position: relative;
      float: left;
      width: 100%;
      margin-right: -100%;

      &.active {
        margin-right: 0;
      }

      img {
        width: 100%;
        float: left;
      }
      .container {
        max-width: 1280px;
        height: 100%;
        margin: 0 auto;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        .info {
          position: absolute;
          padding: 15px;
          left: 40px;
          top: 40px;
          width: 322px;
          height: 120px;
          background: rgba(0, 0, 0, 0.5);
          text-align: left;
          color: #fff;

          h3 {
            font-size: 20px;
            line-height: 48px;
          }

          p {
            line-height: 26px;
            font-size: 16px;
          }
          .cta {
            a:link,
            a:visited,
            a:hover,
            a:active {
              color: #fff;
              font-size: 16px;
              // font-weight: bold;
              line-height: 34px;
              display: inline-block;
            }

            a:after {
              content: ">";
              display: inline-block;
              transform: translateX(4px) scale(1);
              transition: all 0.5s;
            }

            a:hover:after {
              transform: translateX(12px) scale(1);
            }
          }
        }
      }
    }
  }
}
.main {
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 11px;
  text-align: left;
  overflow: hidden;

  .digital {
    h3 {
      line-height: 66px;
      font-size: 18px;
    }

    ul {
      margin-left: -2%;
      overflow: hidden;
      // max-width: 1280px;
      li {
        float: left;
        width: 23%;
        box-sizing: border-box;
        margin-left: 2%;
        background: #646464;
        text-align: center;

        a {
          display: block;
          line-height: 52px;
          font-size: 14px;
          color: #fff;
          transition: all 0.6s;
        }
        a:hover {
          background-color: #3c3c3c;
        }
      }
    }
  }

  .container {
    overflow: hidden;
    //  margin-left: -2%;
    padding-top: 30px;

    .search {
      width: 23%;
      max-width: 281px;
      transition: all.5s;
      top: 0px;


      &.fixed {
        position: fixed;
        top: 20px;
      }


      .inputbox {
        border: 1px solid #b5b5b5;
        line-height: 30px;
        height: 30px;
        overflow: hidden;
        position: relative;

        input {
          height: 30px;
          border: none;
          background-color: #fff;
          margin: 0;
          padding: 0;
          display: inline-block;
          outline: none;
          box-sizing: border-box;
        }

        input:first-child {
          width: 100%;
          padding: 0 40px 0 10px;
        }
        input:last-child {
          width: 30px;
          height: 30px;
          position: absolute;
          right: 0;
          top: 0;
        }
      }

      .clearall {
        margin-top: 24px;
        border-top: 1px solid #787878;

        a {
          line-height: 40px;
          height: 40px;
          font-size: 12px;
          color: #05a4ee;
          padding-left: 10px;
        }
      }
      h3 {
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        background: #646464;
      }
      .solution {
        ul {
          li {
            margin-top: 1px;
            h4 {
              height: 35px;
              line-height: 35px;
              background-color: #dcdedf;
              padding-left: 44px;
              color: #505050;
              font-size: 13px;
              position: relative;
              cursor: pointer;
              & + ul {
                height: 0px;
              }
              &:after {
                content: "";
                display: block;
                position: absolute;
                width: 8px;
                height: 8px;
                border: 1px solid #6b6270;
                border-bottom-color: transparent;
                border-right-color: transparent;
                top: 16px;
                right: 10px;
                transition: all 0.6s;
                transform: rotateZ(45deg) scale(0.8);
                transform-origin: 50%;
              }

              &.active {
                &:after {
                  transform: rotate(945deg);
                  top: 10px;
                }

                & + ul.opts {
                  height: auto;
                  transform: scaleY(1);
                  max-height: 270px;
                }
              }
            }

            .opts {
              // height: 0px;
              // transform: scaleY(0);
              overflow: hidden;
              transform-origin: top;
              transition: all 0.9s;
              max-height: 0;
              height: 0;
              .item {
                label {
                  line-height: 30px;
                  height: 30px;
                  font-size: 12px;
                  display: block;
                  cursor: pointer;
                  padding-left: 10px;

                  input {
                    margin: 0;
                    padding: 0;
                    margin-top: -2px;
                    margin-bottom: 1px;
                    vertical-align: middle;
                  }

                  span {
                    padding-left: 12px;
                  }
                }
              }
            }
          }
        }
      }

      .industry {
        margin-top: 40px;

        .opts {
          .item {
            line-height: 40px;
            border-bottom: 1px solid #c1c1c1;
            font-size: 12px;

            label {
              display: block;
              cursor: pointer;
              padding-left: 10px;
              position: relative;
              input {
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

    .caselist {
      width: 75%;
      padding-left: 10px;
      box-sizing: border-box;
      padding-bottom: 100px;
    }
  }
}
@media screen and (max-width: 1199px) {
.banner {
    ul {
      width: 100%;
      overflow: hidden;

      li {
        position: relative;
        float: left;
        width: 100%;
        margin-right: -100%;

        &.active {
          margin-right: 0;
        }

        img {
          width: 100%;
          float: left;
        }
        .container {
          max-width: 1280px;
          height: 100%;
          margin: 0 auto;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;

          .info {
            position: absolute;
            padding: 10px;
            left: 20px;
            top: 20px;
            width: 420px;
            height: 100px;
            background: rgba(0, 0, 0, 0.5);
            text-align: left;
            color: #fff;

            h3 {
              font-size: 16px;
              line-height: 32px;
            }

            p {
              line-height: 24px;
              font-size: 14px;
            }
            .cta {
              a:link,
              a:visited,
              a:hover,
              a:active {
                color: #fff;
                font-size: 16px;
                // font-weight: bold;
                line-height: 34px;
                display: inline-block;
              }

              a:after {
                content: ">";
                display: inline-block;
                transform: translateX(4px) scale(1);
                transition: all 0.5s;
              }

              a:hover:after {
                transform: translateX(12px) scale(1);
              }
            }
          }
        }
      }
    }
  }
  .main {
    max-width: 1280px;
    margin: 0 auto;
    margin-top: 5px;
    text-align: left;
    overflow: hidden;
    padding: 0 10px;

    .digital {
      h3 {
        line-height: 36px;
        font-size: 14px;
      }

      ul {
        margin-left: -2%;
        overflow: hidden;
        // max-width: 1280px;
        li {
          float: left;
          width: 23%;
          box-sizing: border-box;
          margin-left: 2%;
          background: #646464;
          text-align: center;

          a {
            display: block;
            line-height: 38px;
            font-size: 14px;
            color: #fff;
            transition: all 0.6s;
          }
          a:hover {
            background-color: #3c3c3c;
          }
        }
      }
    }

    .container {
      overflow: hidden;
      //  margin-left: -2%;
      padding-top: 20px;

      .search {
        width: 23%;

        .inputbox {
          border: 1px solid #b5b5b5;
          line-height: 20px;
          height: 20px;
          overflow: hidden;
          position: relative;

          input {
            height: 20px;
            border: none;
            background-color: #fff;
            margin: 0;
            padding: 0;
            display: inline-block;
            outline: none;
            box-sizing: border-box;
          }

          input:first-child {
            width: 100%;
            padding: 0 40px 0 10px;
          }
          input:last-child {
            width: 20px;
            height: 20px;
            position: absolute;
            right: 0;
            top: 0;
          }
        }

        .clearall {
          margin-top: 24px;
          border-top: 1px solid #787878;

          a {
            line-height: 30px;
            height: 30px;
            font-size: 12px;
            color: #05a4ee;
            padding-left: 10px;
          }
        }
        h3 {
          height: 30px;
          line-height: 30px;
          padding-left: 10px;
          color: #fff;
          font-size: 14px;
          font-weight: bold;
          background: #646464;
        }
        .solution {
          ul {
            li {
              margin-top: 1px;
              h4 {
                height: 30px;
                line-height: 30px;
                background-color: #dcdedf;
                padding-left: 14px;
                color: #505050;
                font-size: 13px;
                position: relative;
                cursor: pointer;
                & + ul {
                  height: 0px;
                }
                &:after {
                  content: "";
                  display: block;
                  position: absolute;
                  width: 8px;
                  height: 8px;
                  border: 1px solid #6b6270;
                  border-bottom-color: transparent;
                  border-right-color: transparent;
                  top: 16px;
                  right: 10px;
                  transition: all 0.6s;
                  transform: rotateZ(45deg) scale(0.8);
                  transform-origin: 50%;
                }

                &.active {
                  &:after {
                    transform: rotate(945deg);
                    top: 10px;
                  }

                  & + ul.opts {
                    height: auto;
                    transform: scaleY(1);
                    max-height: 270px;
                  }
                }
              }

              .opts {
                // height: 0px;
                // transform: scaleY(0);
                overflow: hidden;
                transform-origin: top;
                transition: all 0.9s;
                max-height: 0;
                height: 0;
                .item {
                  label {
                    line-height: 30px;
                    height: 30px;
                    font-size: 12px;
                    display: block;
                    cursor: pointer;
                    padding-left: 10px;

                    input {
                      margin: 0;
                      padding: 0;
                      margin-top: -2px;
                      margin-bottom: 1px;
                      vertical-align: middle;
                    }

                    span {
                      padding-left: 4px;
                    }
                  }
                }
              }
            }
          }
        }

        .industry {
          margin-top: 40px;

          .opts {
            .item {
              line-height: 40px;
              border-bottom: 1px solid #c1c1c1;
              font-size: 12px;

              label {
                display: block;
                cursor: pointer;
                padding-left: 10px;
                position: relative;
                input {
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

      .caselist {
        width: 75%;
        padding-left: 10px;
        box-sizing: border-box;
        padding-bottom: 100px;
      }
    }
  }

}
@media screen and (max-width: 991px) {
  
}

@media screen and (max-width: 767px) {
}
@media screen and (max-width: 749px) {
}
@media screen and (max-width: 639px) {
}
@media screen and (max-width: 414px) {
  .banner {
    ul {
      width: 100%;
      height: 440px;

      li {
        position: relative;
        float: left;
        width: 100%;
        margin: 0;
        height: 440px;

        &.active {
          margin-right: 0;
        }

        img {
          width: auto;
          height: 240px;
        }
        .container {
          width: 100%;
          height: 200px;
          background: #333;
          position: absolute;
          top: 240px;
          margin: 0;
          padding: 0;
          text-align: center;

          .info {
            width: 90%;
            height: 160px;
            text-align: left;
            margin: 0 auto;
            padding: 0;

            color: #fff;
            background: none;
            text-align: center;
            position: static;
            h3 {
              font-size: 20px;
              line-height: 48px;
            }

            p {
              line-height: 26px;
              font-size: 16px;
            }
            .cta {
              a:link,
              a:visited,
              a:hover,
              a:active {
                color: #fff;
                font-size: 16px;
                // font-weight: bold;
                line-height: 34px;
                display: inline-block;
              }

              a:after {
                content: ">";
                display: inline-block;
                transform: translateX(4px) scale(1);
                transition: all 0.5s;
              }

              a:hover:after {
                transform: translateX(12px) scale(1);
              }
            }
          }
        }
      }
    }
  }
  .main {
    width: 100%;
    margin: 0 auto;
    margin-top: 11px;
    text-align: left;
    overflow: hidden;

    .digital {
      width: 95%;
      margin: 0 auto;
      h3 {
        line-height: 46px;
        font-size: 18px;
      }

      ul {
        margin: 0 auto;
        overflow: hidden;
        // max-width: 1280px;
        li {
          width: 100%;
          box-sizing: border-box;
          margin: 0;
          background: #646464;
          text-align: center;
          margin-top: 10px;

          a {
            display: block;
            line-height: 42px;
            font-size: 14px;
            color: #fff;
            transition: all 0.6s;
          }
          a:hover {
            background-color: #3c3c3c;
          }
        }
      }
    }

    .container {
      overflow: hidden;
      //  margin-left: -2%;
      width: 95%;
      margin: 0 auto;
      padding-top: 20px;

      .search {
        width: 100%;
        float: none;
        .inputbox {
          border: 1px solid #b5b5b5;
          line-height: 30px;
          height: 30px;
          overflow: hidden;
          position: relative;

          input {
            height: 30px;
            border: none;
            background-color: #fff;
            margin: 0;
            padding: 0;
            display: inline-block;
            outline: none;
            box-sizing: border-box;
          }

          input:first-child {
            width: 100%;
            padding: 0 40px 0 10px;
          }
          input:last-child {
            width: 30px;
            height: 30px;
            position: absolute;
            right: 0;
            top: 0;
          }
        }

        .clearall {
          margin-top: 24px;
          border-top: 1px solid #787878;

          a {
            line-height: 40px;
            height: 40px;
            font-size: 12px;
            color: #05a4ee;
            padding-left: 10px;
          }
        }
        h3 {
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          color: #fff;
          font-size: 16px;
          font-weight: bold;
          background: #646464;
        }
        .solution {
          h3 {
            position: relative;

            &::after {
              content: "+";
              text-align: center;
              width: 40px;
              height: 40px;
              display: block;
              color: #fff;
              font-size: 26px;
              font-weight: 100;
              position: absolute;
              top: 0;
              right: 0px;
              transition: 0.5s all;
              transform: rotateZ(0deg) scale(0.6);
            }

            &.active:after {
              content: "-";
              transform: rotateZ(540deg) scale(1.2);
            }

            & + ul {
              max-height: 0;
              transition: 0.5s all;
              overflow: hidden;
            }

            &.active + ul {
              max-height: 700px;
            }
          }

          ul {
            li {
              margin-top: 1px;
              h4 {
                height: 35px;
                line-height: 35px;
                background-color: #dcdedf;
                padding-left: 44px;
                color: #505050;
                font-size: 13px;
                position: relative;
                cursor: pointer;
                & + ul {
                  height: 0px;
                }
                &:after {
                  content: "";
                  display: block;
                  position: absolute;
                  width: 8px;
                  height: 8px;
                  border: 1px solid #6b6270;
                  border-bottom-color: transparent;
                  border-right-color: transparent;
                  top: 16px;
                  right: 10px;
                  transition: all 0.6s;
                  transform: rotateZ(45deg) scale(0.8);
                  transform-origin: 50%;
                }

                &.active {
                  &:after {
                    transform: rotate(945deg);
                    top: 10px;
                  }

                  & + ul.opts {
                    height: auto;
                    transform: scaleY(1);
                    max-height: 270px;
                  }
                }
              }

              .opts {
                // height: 0px;
                // transform: scaleY(0);
                overflow: hidden;
                transform-origin: top;
                transition: all 0.9s;
                max-height: 0;
                height: 0;
                .item {
                  label {
                    line-height: 30px;
                    height: 30px;
                    font-size: 12px;
                    display: block;
                    cursor: pointer;
                    padding-left: 10px;

                    input {
                      margin: 0;
                      padding: 0;
                      margin-top: -2px;
                      margin-bottom: 1px;
                      vertical-align: middle;
                    }

                    span {
                      padding-left: 12px;
                    }
                  }
                }
              }
            }
          }
        }

        .industry {
          margin-top: 10px;

          h3 {
            position: relative;

            &::after {
              content: "+";
              text-align: center;
              width: 40px;
              height: 40px;
              display: block;
              color: #fff;
              font-size: 26px;
              font-weight: 100;
              position: absolute;
              top: 0;
              right: 0px;
              transition: 0.5s all;
              transform: rotateZ(0deg) scale(0.6);
            }

            &.active:after {
              content: "-";
              transform: rotateZ(540deg) scale(1.2);
            }

            & + ul {
              max-height: 0;
              transition: 0.5s all;
              overflow: hidden;
            }

            &.active + ul {
              max-height: 750px;
            }
          }

          .opts {
            .item {
              line-height: 40px;
              border-bottom: 1px solid #c1c1c1;
              font-size: 12px;

              label {
                display: block;
                cursor: pointer;
                padding-left: 10px;
                position: relative;
                input {
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

      .caselist {
        padding-top: 20px;
        width: 95%;
        margin: 0 auto;

        padding-bottom: 100px;
        float: none;
      }
    }
  }
}
@media screen and (max-width: 375px) {
}
</style>

