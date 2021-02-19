import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/tabbar/Home/Home'
import Vip from '../components/tabbar/Vip/Vip'
import Cart from '../components/tabbar/Cart/Cart'
import Search from '../components/tabbar/Search/Search'
import NewsList from '../components/homeTest/NewsList/NewsList';
import Marquee from "../components/homeTest/Marquee/Marquee";
import BrandList from "../components/homeTest/BrandList/BrandList";
import BrandListRequest from "../components/homeTest/BrandListRequest/BrandListRequest";
import Cartoon from "../components/homeTest/Cartoon/Cartoon";
import Comment from "../components/homeTest/Comment/Comment";
import Account from "../components/homeTest/ChildRouter/Account";
import Login from "../components/homeTest/ChildRouter/Login";
import Register from "../components/homeTest/ChildRouter/Register";
import ClassicLayout from "../components/homeTest/ClassicLayout/ClassicLayout";
import HeaderBox from "../components/homeTest/ClassicLayout/HeaderBox";
import LeftBox from "../components/homeTest/ClassicLayout/LeftBox";
import MainBox from "../components/homeTest/ClassicLayout/MainBox";
import NameBind from "../components/homeTest/NameBind/NameBind";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/vip',
      name: 'vip',
      component: Vip
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/news',
      name: 'newsList',
      component: NewsList
    },
    {
      path: '/marquee',
      name: 'marquee',
      component: Marquee
    },
    {
      path: '/brand/list',
      name: 'brandList',
      component: BrandList
    },
    {
      path: '/brand/list/request',
      name: 'brandListRequest',
      component: BrandListRequest
    },
    {
      path: '/cartoon',
      name: 'cartoon',
      component: Cartoon
    },
    {
      path: '/comment',
      name: 'comment',
      component: Comment
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'register',
          name: 'register',
          component: Register
        }
      ]
    },
    {
      path: '/classic/layout',
      component: ClassicLayout,
      children: [
        {
          path: '/',
          name: 'classicLayout',
          components: {
            'headerBox': HeaderBox,
            'leftBox': LeftBox,
            'mainBox': MainBox
          },
        }
      ]
    },
    {
      path: '/name/bind',
      name: 'nameBind',
      component: NameBind
    },
    {
      path: '/',
      redirect: '/home'
    }
  ],
  linkActiveClass: 'mui-active' //覆盖默认的路由高亮类
})
