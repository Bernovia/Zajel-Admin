import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Books from '../components/books/Books'
import Book from '../components/books/Book'
import Users from '../components/users/Users'
import User from '../components/users/User'
import Languages from '../components/languages/Languages'
import LanguageForm from '../components/languages/Form'
import Genres from '../components/genres/Genres'
import GenreForm from '../components/genres/Form'

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
      name: 'LanguageNewForm',
      component: LanguageForm
    },
    {
      path: '/languages/:id/edit',
      name: 'LanguageEditForm',
      component: LanguageForm
    },
    {
      path: '/genres',
      name: 'Genres',
      component: Genres
    },
    {
      path: '/genres/new',
      name: 'GenreNewForm',
      component: GenreForm
    },
    {
      path: '/genres/:id/edit',
      name: 'GenreEditForm',
      component: GenreForm
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
