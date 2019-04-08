<template>
  <div
    class="search-component"
    ref="leftPanel"
  >
    <div class="inputbox">
      <input
        type="text"
        placeholder=""
        v-model="keyword"
      >
      <input
        type="button"
        value="so"
      >
    </div>
    <div class="clearall">
      <a href="javascript:;">清空所有选项</a>
    </div>
    <div class="solution">
      <h3
        :class="{active:sltActive}"
        @click="sltActive=!sltActive"
      >解决方案领域</h3>
      <ul class="">

        <li
          v-for="(item, index) in solutions"
          :key="index"
        >
          <h4
            :class="{active:item.active}"
            @click="toggleShowStatus(item)"
          >{{item.title}}</h4>
          <transition
            name="component-fade"
            @after-enter="afterEnter"
            @after-leave="afterLeave"
            @leave-cancelled="leaveCancelled"
          >
            <ul
              v-show="item.active"
              class="opts"
            >
              <li
                class="item"
                v-for="(opt,idx) in item.options"
                :key="idx"
              >
                <label>
                  <input
                    type="checkbox"
                    :value="opt.title=='全部' ? `${item.title}_${opt.title}`:`${opt.title}`"
                    v-model="sltChecked"
                  ><span>{{opt.title}}</span>
                </label>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </div>
    <div class="industry">
      <h3
        :class="{active:indActive}"
        @click="indActive=!indActive"
      >行业</h3>
      <ul class="opts">

        <li
          class="item"
          v-for="(ind, index) in industries"
          :key="index"
        >
          <label><span>{{ind}}</span><input
              type="radio"
              :value="ind"
              name="indu"
              v-model="indChecked"
            ></label>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
var WheelIndicator = require("wheel-indicator");

import { getAllMetaData } from "../../data/index.js";
import { parse } from "path";
export default {
  props: {
    fixed: {
      type: Boolean
    }
  },
  data() {
    return {
      solutions: [],
      industries: [],
      keyword: "",
      sltChecked: [],
      indChecked: [],
      sltActive: false,
      indActive: false,
      offsetHeight: 0,
      parentNode: null
    };
  },
  async created() {
    this.init();
  },
  mounted() {
    let { leftPanel } = this.$refs;
    this.parentNode = leftPanel.parentNode;
    this.refreshHeight();
    let that = this;

    let parent = this.$refs.leftPanel.parentNode;

    var indicator = new WheelIndicator({
      elem: leftPanel,
      callback: e => {
        let styleObj = window.getComputedStyle(parent, null);

        if (styleObj.getPropertyValue("position") == "fixed") {
          if (e.direction == "up") {
            that.scrollUp();
          } else {
            that.scrollDown();
          }
        }
      }
    });

    this.bindTap();
  },

  watch: {
    sltChecked() {
      this.$emit("solution-update", this.sltChecked);
    },
    indChecked() {
      this.$emit("industry-update", this.indChecked);
    },
    keyword() {
      this.$emit("keyword-update", this.keyword);
    },
    fixed(newVal, oldVal) {
      console.log("fixed change");
      console.log("before : ", oldVal);
      console.log("now : ", newVal);
      if (newVal == false) {
        this.parentNode.style = "";
      }
    }
  },

  methods: {
    async init() {
      let metaReq = getAllMetaData();
      let metaResp = await metaReq;
      console.log(metaResp);
      let [solutionRsp, induscryRsp] = metaResp;
      this.solutions = solutionRsp.data;
      this.industries = induscryRsp.data;
      this.$nextTick(this.refreshHeight);
    },
    toggleShowStatus(item) {
      item.active = !item.active;
    },

    refreshHeight() {
      let { leftPanel } = this.$refs;
      this.offsetHeight = leftPanel.offsetHeight;
    },

    afterLeave() {
      console.log("after leave");
      this.refreshHeight();
    },
    afterEnter() {
      console.log("after enter");
      this.refreshHeight();
    },
    leaveCancelled() {
      console.log("leave canceld");
      this.refreshHeight();
    },
    scrollDown() {
      console.log("down")
      this.$nextTick(() => {
        if(this.offsetHeight < document.documentElement.clientHeight - 80 || this.fixed == false) return;
        let parent = this.parentNode;
        let styleObj = window.getComputedStyle(parent, null);
        let targetTop = parseInt(styleObj.top) - this.offsetHeight * 0.2;

        let minTop =
          document.documentElement.clientHeight - this.offsetHeight - 80;
        console.log(minTop);
        if (targetTop > minTop) {
        } else {
          targetTop = minTop;
        }

        parent.style.top = targetTop + "px";
      });
    },
    scrollUp() {
      this.$nextTick(() => {
        if(this.offsetHeight < document.documentElement.clientHeight - 80 || this.fixed == false) return;
        
        let parent = this.parentNode;
        let styleObj = window.getComputedStyle(parent, null);
        let targetTop = parseInt(styleObj.top) + this.offsetHeight * 0.2;

        let minTop = 20;
        console.log(minTop);
        if (targetTop > minTop) {
          targetTop = minTop;
        } else {
        }

        parent.style.top = targetTop + "px";
      });
    },
    bindTap() {
      let parentNode = this.parentNode;

      let that = this;
      let touchTop = false,
        touchBottom = false;
      let sy, ny, nowTop, targetTop, startTime, endTime;

      parentNode.addEventListener(
        "touchstart",
        function(e) {
          // reset

          // parentNode.removeListener("touchend", that.touchTop.bind(that));
          // parentNode.removeListener("touchend", that.touchBottom.bind(that));
          // reset end

          startTime = Date.now();
          e.stopPropagation();

          sy = e.changedTouches[0].clientY;

          nowTop = parseInt(window.getComputedStyle(parentNode).top);
        },
        false
      );
      parentNode.addEventListener("touchmove", function(e) {
        ny = e.changedTouches[0].clientY;

        parentNode.style.transition = "none";
        targetTop = nowTop + (ny - sy);

        if (targetTop > 100) {
          targetTop = 100;
          
        }
        if(targetTop>20){
          touchTop = true
        }

        if (
          targetTop <
          document.documentElement.clientHeight - that.offsetHeight - 150
        ) {
          touchBottom = true;
          targetTop =
            document.documentElement.clientHeight - that.offsetHeight - 150;
        }
        parentNode.style.top = targetTop + "px";

        e.stopPropagation();
        e.preventDefault();
      });
      parentNode.addEventListener("touchend", function(e) {
        console.log("几次 end");
        let endTime = Date.now();
        e.stopPropagation();

        let ny = e.changedTouches[0].clientY;

        if (Math.abs(ny - sy) > 20 && endTime - startTime < 200) {
          if (ny > sy) {
            that.scrollUp();
          } else {
            that.scrollDown();
          }
        }

        if (touchTop) {
          touchTop = false;
          that.touchTop();
        }
        if (touchBottom) {
          touchBottom = false;
          that.touchBottom();
        }
      });
    },
    touchTop() {
      this.parentNode.style.transition = "all .5s";
      this.parentNode.style.top = "20px";
    },
    touchBottom() {
      this.parentNode.style.transition = "all .5s";
      this.parentNode.style.top =
        document.documentElement.clientHeight - this.offsetHeight - 100 + "px";
    }
  }
};
</script>
























<style lang="less" scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  max-height: 230px;
  height: 100%;
  transition: all 0.3s;
}
.component-fade-enter, .component-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  // opacity: 0;
  max-height: 0;
  height: 1px;
}

.search-component {
  width: 100%;
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
            // height: 0px;
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
              // height: auto;
              // transform: scaleY(1);
              // max-height: 270px;
            }
          }
        }

        .opts {
          // height: 0px;
          // transform: scaleY(0);
          overflow: hidden;
          transform-origin: top;
          transition: all 0.9s;
          // max-height: 0;
          // height: 0;
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

@media screen and (max-width: 1199px) {
  //<=1199的设备
}

@media screen and (max-width: 991px) {
  //<=991的设备
}

@media screen and (max-width: 767px) {
  //<=768的设备
}
@media screen and (max-width: 749px) {
}
@media screen and (max-width: 639px) {
}
@media screen and (max-width: 414px) {
}
@media screen and (max-width: 375px) {
}
</style>

