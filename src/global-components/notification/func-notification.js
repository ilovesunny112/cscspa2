import Notification from './notification.vue'


export default {
    extends: Notification,
    computed: {
        styleObj() {
            return {
                position: 'fixed',
                right: '20px',
                bottom: `${this.verticalOffset}px`
            }
        }
    },
    data() {
        return {
            verticalOffset: 0,
            autoClose: 3000,
            timer: null,
            height: 0
        }
    },

    methods: {
        createTimer() {
            if (this.autoClose) {
                this.timer = setTimeout(() => {
                    this.visible = false;
                }, this.autoClose)
            }
        },

        clearTimer() {
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = null
            }
        },
        afterEnter() {
            this.height = this.$el.offsetHeight;
        }
    },

    beforeDestroy() {
        this.clearTimer()
    },
    mounted() {
        this.createTimer()
    },
}

