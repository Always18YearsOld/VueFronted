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
import NewsDetail from "../components/homeTest/NewsList/NewsDetail";
import PhotoList from "../components/photoList/PhotoList";
import TestPage from "../components/TestPage/TestPage";
import TestLoad from "../components/TestPage/TestLoad";
import GoodsList from "../components/GoodsList/GoodsList";
import GoodDetail from "../components/GoodsList/GoodDetail";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        showBottomTabBar: true
      }
    },
    {
      path: '/vip',
      name: 'vip',
      component: Vip,
      meta: {
        showBottomTabBar: true
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta: {
        showBottomTabBar: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        showBottomTabBar: true
      }
    },
    {
      path: '/home/newsList',
      name: 'newsList',
      component: NewsList
    },
    {
      path: '/home/newsDetail/:id',
      name: 'NewsDetail',
      component: NewsDetail
    },
    {
      path: '/home/photoList',
      name: 'photoList',
      component: PhotoList
    },
    {
      path: '/home/goodsList',
      name: 'goodsList',
      component: GoodsList
    },
    {
      path: '/home/goodDetail/:id',
      name: 'goodDetail',
      component: GoodDetail
    },
    {
      path: '/home/marquee',
      name: 'marquee',
      component: Marquee
    },
    {
      path: '/home/brand/list',
      name: 'brandList',
      component: BrandList
    },
    {
      path: '/home/testPage',
      name: 'TestPage',
      component: TestPage
    },
    {
      path: '/home/testLoad',
      name: 'testLoad',
      component: TestLoad
    },
    {
      path: '/home/brand/list/request',
      name: 'brandListRequest',
      component: BrandListRequest
    },
    {
      path: '/home/cartoon',
      name: 'cartoon',
      component: Cartoon
    },
    {
      path: '/home/comment',
      name: 'comment',
      component: Comment
    },
    {
      path: '/home/account',
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
      path: '/home/classic/layout',
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
      path: '/home/name/bind',
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
