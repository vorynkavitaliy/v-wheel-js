import './styles/styles.sass'
import components from './v-components'

import Vue from 'vue'
import App from './App/App.vue'
// import router from './App/router/'
import store from './App/store/'

Vue.config.productionTip = false

Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component)
})

new Vue({
    // router,
    store,
    render: (h) => h(App),
}).$mount('#app')
