import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

import {
  auth
} from '@/api/firebase'

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/workouts',
      name: 'workouts',
      component: () => import( /* webpackChunkName: "workouts" */ './views/Workouts.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/workouts/:workout_id',
      name: 'workout',
      component: () => import( /* webpackChunkName: "workout" */ './views/Workout.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/logs/:log_id',
      name: 'log',
      component: () => import( /* webpackChunkName: "workout-log" */ './views/Log.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: () => import( /* webpackChunkName: "statistics" */ './views/Statistics.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/statistics/:exercise_id',
      name: 'statistics-exercise',
      component: () => import( /* webpackChunkName: "statistics-exercise" */ './views/Statistics.Exercise.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import( /* webpackChunkName: "not-found" */ './views/Not.Found.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // Is authenticated?
  if (requiresAuth && !currentUser) {
    return next('/');
  }

  // Has return url?
  if (to.query.returnUrl != from.path) {
    return next({ path: to.path, query: Object.assign(to.query, { returnUrl: from.path }) });
  }
    return next();
});

export default router;