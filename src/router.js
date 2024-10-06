import Vue from 'vue'
import Router from 'vue-router'

import TheLogin from '@/views/TheLogin.vue'
import TheHome from '@/views/TheHome.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{ path: '/', name: 'TheHome', component: TheHome },
		{ path: '/login', name: 'TheLogin', component: TheLogin }
	]
})
