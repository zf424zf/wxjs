import Vue from 'vue'
import Router from 'vue-router'
import City from '@/components/City'
import Yueke from '@/components/Yueke'
import ClassLog from '@/components/ClassLog'
import SelectClass from '@/components/SelectClass'
import Pop from '@/components/Pop'
import Personal from '@/components/Personal'
import Gym from '@/components/Gym'
import  GymInfo from '@/components/GymInfo'
import ChooseClass from '@/components/ChooseClass'
import OverClass from '@/components/OverClass'
import NotOverClass from '@/components/NotOverClass'
import CoachInfo from '@/components/CoachInfo'
import Reg from '@/components/Reg'
import Login from  '@/components/Login'
import Pingjia from  '@/components/Pingjia'
import PasswordForget from  '@/components/PasswordForget'
import ResetPassword from  '@/components/ResetPassword'
import Map from '@/components/Map'
import Set from '@/components/Set'
import UpdateName from '@/components/UpdateName'
import ConfirmOrder from '@/components/ConfirmOrder'
import PayOrder from '@/components/PayOrder'
import OrderDetail from '@/components/OrderDetail'
import CoachPersonal from '@/components/Coach/UserInfo';
import Schedule from '@/components/Coach/Schedule';
import CoachOrder from '@/components/Coach/Order';
import Student from '@/components/Coach/Student';
import FinishOrder from '@/components/Coach/FinishOrder';
import ClassConsume from '@/components/Coach/ClassConsume';
import Sign from '@/components/Coach/Sign';
import StudentList from '@/components/Coach/StudentList';
import CoachYueKe from '@/components/Coach/Yueke';
import PingjiaList from '@/components/PingjiaList';
import  CoachChooseClass from '@/components/Coach/ChooseClass';
import UpdatePassword from '@/components/UpdatePassword';
import SaleList from '@/components/Coach/SaleList';
import CourseLogList from '@/components/Coach/CourseLogList';
Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/CoachList',
      name: 'CoachList',
      component: City
    },
    {
      path: '/ClassLog',
      name: 'ClassLog',
      component: ClassLog
    },
    {
      path: '/SelectClass',
      name: 'SelectClass',
      component: SelectClass
    },
    {
      path: '/Yueke',
      name: 'Yueke',
      component: Yueke
    }, {
      path: '/Pop',
      name: 'Pop',
      component: Pop
    },
    {
      path: '/Personal',
      name: 'Personal',
      component: Personal,
    },
    {
      path: '/Gym',
      name: 'Gym',
      component: Gym
    },
    {
      path: '/GymInfo',
      name: 'GymInfo',
      component: GymInfo
    }, {
      path: '/ChooseClass',
      name: 'ChooseClass',
      component: ChooseClass
    },
    {
      path: '/OverClass',
      name: 'OverClass',
      component: OverClass
    },
    {
      path: '/NotOverClass',
      name: 'NotOverClass',
      component: NotOverClass
    },
    {
      path: '/CoachInfo',
      name: 'CoachInfo',
      component: CoachInfo
    },
    {
      path: '/Reg',
      name: 'Reg',
      component: Reg
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Pingjia',
      name: 'Pingjia',
      component: Pingjia
    },
    {
      path: '/PasswordForget',
      name: 'PasswordForget',
      component: PasswordForget
    },
    {
      path: '/ResetPassword',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/Map',
      name: 'Map',
      component: Map
    },
    {
      path: '/Set',
      name: 'Set',
      component: Set
    },
    {
      path: '/UpdateName',
      name: 'UpdateName',
      component: UpdateName
    },
    {
      path: '/ConfirmOrder',
      name: 'ConfirmOrder',
      component: ConfirmOrder
    },
    {
      path: '/PayOrder',
      name: 'PayOrder',
      component: PayOrder
    },
    {
      path: '/OrderDetail',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/Coach/Personal',
      name: 'CoachPersonal',
      component: CoachPersonal
    },
    {
      path: '/Coach/Schedule',
      name: 'Schedule',
      component: Schedule
    },
    {
      path: '/Coach/Order',
      name: 'CoachOrder',
      component: CoachOrder
    },
    {
      path: '/Coach/Student',
      name: 'Student',
      component: Student
    },
    {
      path: '/Coach/FinishOrder',
      name: 'FinishOrder',
      component: FinishOrder
    },
    {
      path: '/Coach/ClassConsume',
      name: 'ClassConsume',
      component: ClassConsume
    },
    {
      path: '/Coach/Sign',
      name: 'Sign',
      component: Sign
    }, {
      path: '/Coach/StudentList',
      name: 'StudentList',
      component: StudentList
    },
    {
      path: '/Coach/Yueke',
      name: 'CoachYueKe',
      component: CoachYueKe
    }, {
      path: '/PingjiaList',
      name: 'PingjiaList',
      component: PingjiaList
    }, {
      path: '/Coach/ChooseClass',
      name: 'CoachChooseClass',
      component: CoachChooseClass
    }, {
      path: '/UpdatePassword',
      name: 'UpdatePassword',
      component: UpdatePassword
    },
    {
      path: '/Coach/SaleList',
      name: 'SaleList',
      component: SaleList
    },{
      path: '/Coach/CourseLogList',
      name: 'CourseLogList',
      component: CourseLogList

    }
  ]
});

// router.beforeEach((to, from, next) => {
//
//   console.log(localStorage.getItem('uid'))
//   // if (!sessionStorage.getItem('accessToken')) {
//   //   next({
//   //     path: '/login',
//   //     query: { redirect: to.fullPath }
//   //   })
//   // } else {
//   //   next()
//   // }
//   next()
// })

export default router;
