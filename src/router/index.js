import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Books from '../components/books/Books'
import NewBooks from '../components/books/NewBooks'
import UpdateBook from '../components/books/UpdateBook'
import Book from '../components/books/Book'
import SignIn from '../components/users/SignIn.vue';
import Users from '../components/users/Users'
import User from '../components/users/User'
import Languages from '../components/languages/Languages'
import LanguageForm from '../components/languages/Form'
import Genres from '../components/genres/Genres'
import GenreForm from '../components/genres/Form'
import Requests from '../components/requests/Requests'
import WebRequests from '../components/web_requests/WebRequests'

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
      path: '/newbooks',
      name: 'NewBooks',
      component: NewBooks
    },
    {
      path: '/books/:id',
      name: 'Book',
      component: Book
    },
    {
      path: '/books/:id/edit',
      name: 'UpdateBook',
      component: UpdateBook
    },
    {
      path: '/login',
      name: 'SignIn',
      component: SignIn
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
    },
    {
      path: '/requests',
      name: 'Requests',
      component: Requests
    },
    {
      path: '/web_requests',
      name: 'WebRequests',
      component: WebRequests
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
