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
      path: '/workouts/:workout_id/sets/:set_id',
      name: 'workout-set',
      component: () => import( /* webpackChunkName: "workout-set" */ './views/Workout.Set.vue'),
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

  if (requiresAuth && !currentUser) {
    return next('/');
  }

  return next();
});

export default router;