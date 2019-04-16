import Vue from 'vue'
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component)

const instanceArr = []
let seed = 1

const removeInstance = (instance) => {
    if (!instance) return;
    const len = instanceArr.length;

    if (len <= 1) return;
    const index = instanceArr.findIndex(item => item.id == instance.id)

    instanceArr.splice(index, 1)

    const removeHeight = instance.vm.height;
    console.log("removeHeight is ", removeHeight)
    console.log("index is ", index)
    console.log("len is ", len)
    for (let i = index; i < len - 1; i++) {
        console.log("减了")
        instanceArr[i].verticalOffset = parseInt(instanceArr[i].verticalOffset) - removeHeight - 16
    }

}


const notify = (options) => {
    if (Vue.prototype.$isServer) return;

    const { autoClose, ...rest } = options

    const instance = new NotificationConstructor({
        propsData: {
            ...rest
        },
        data: {
            autoClose: autoClose || 3000
        }

    })
    instance.id = `notification_${seed++}`
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    instance.vm.visible = true;

    console.log(instance.vm)
    console.log(instance)
    console.log(instance === instance.vm)
    instance.vm.$on("closed", () => {
        removeInstance(instance)
        document.body.removeChild(instance.vm.$el)
        instance.vm.$destroy()
    })

    instance.vm.$on("close", () => {
        instance.vm.visible = false
    })

    let verticalOffset = 0;
    instanceArr.forEach(item => {
        verticalOffset += item.$el.offsetHeight + 16;
    })
    verticalOffset += 16;
    instance.verticalOffset = verticalOffset

    instanceArr.push(instance)

    return instance.vm
}


export default notify
