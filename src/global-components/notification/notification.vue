<template>
  <transition
    name="notify"
    @after-leave="afterLeave"
    @after-enter="afterEnter"
  >
    <div
      class="notification"
      :style="styleObj"
      v-show="visible"
    >
      <span class="content">
        {{content}}
      </span>
      <a
        href=""
        class="btn"
        @click="handleClose"
      >{{ btn }}</a>
    </div>
  </transition>
</template>

<script>
export default {
  name: "notification",
  props: {
    content: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: "关闭"
    }
  },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    styleObj() {
      return {};
    }
  },
  methods: {
    handleClose(e) {
      e.preventDefault();
      this.$emit("close");
    },
    afterLeave() {
      this.$emit("closed");
    },
    afterEnter() {
      console.log("after enter invoked");
    }
  }
};
</script>


<style lang="less" scoped>
.notify-enter {
  opacity: 0;
}
.notify-enter-to {
  opacity: 1;
}
.notify-leave-to {
  opacity: 0;
}
.notify-leave-active,
.notify-enter-active {
  transition: opacity 0.4s;
}

.notification {
  display: flex;
  background-color: #303030;
  color: #fff;
  align-items: center;
  padding: 20px;
  position: fixed;
  min-width: 280px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.4);
  flex-wrap: wrap;
  transition: all 0.6s;

  .content {
    padding: 0;
  }

  .btn {
    color: #ff4081;
    padding-left: 24px;
    margin-left: auto;
    cursor: pointer;
  }
}
</style>
