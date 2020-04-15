import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Books from '../components/books/Books'
import Book from '../components/books/Book'
import Users from '../components/users/Users'
import User from '../components/users/User'
import Languages from '../components/languages/Languages'
import NewLanguage from '../components/languages/New'
import Genres from '../components/genres/Genres'
import NewGenre from '../components/genres/New'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/books',
      name: 'Books',
      component: Books
    },
    {
      path: '/books/:id',
      name: 'Book',
      component: Book
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/users/:id',
      name: 'User',
      component: User
    },
    {
      path: '/languages',
      name: 'Language',
      component: Languages
    },
    {
      path: '/languages/new',
      name: 'NewLanguage',
      component: NewLanguage
    },
    {
      path: '/genres',
      name: 'Genres',
      component: Genres
    },
    {
      path: '/genres/new',
      name: 'NewGenre',
      component: NewGenre
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
