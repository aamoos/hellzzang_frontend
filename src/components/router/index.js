import {createRouter, createWebHistory} from 'vue-router'

//나만의 운동
import MyExerciseMain from '../views/myExercise/MyExerciseMain.vue'
import MyExercise from '../views/myExercise/MyExercise.vue'
import MyExerciseCopy from '../views/myExercise/MyExerciseCopy.vue'
import MyExerciseMove from '../views/myExercise/MyExerciseMove.vue'
import MyExercisePlan from '../views/myExercise/MyExercisePlan.vue'

//커뮤니티
import CommunityMain from '../views/community/CommunityMain.vue'
import CommunitySave from '../views/community/CommunitySave.vue'

//짐웨어&장비
import GymWearMain from '../views/gymwear/GymWearDetail.vue'
import GymWearDetail from '../views/gymwear/GymWearMain.vue'

//회원정보
import UserInfoMain from '../views/userInfo/UserInfoMain.vue'






import TabUserEdit from '../views/tab/tabForUser/TabUserEdit.vue'
import TabUserJoin from '../views/tab/tabForUser/TabUserJoin.vue'
import TabUserLogin from '../views/tab/tabForUser/TabUserLogin.vue'
import TabUserEditPassword from '../views/tab/tabForUser/TabUserEditPassword.vue'
import PostWrite from '../views/tab/tabContent/TabPostWrite.vue'

//error page
import NotFound from '../views/NotFound.vue'
import UserjoinError from '../views/UserJoinError.vue'

//oauth2 redirect
import RedirectView from "../views/tab/tabForUser/RedirectView.vue";

// 라우터 설계
const routes = [

    //나만의운동
    {path: '/', component: MyExerciseMain},
    {path: '/exercise/', component: MyExercise},
    {path: '/exercise/copy/:exerciseDate', component: MyExerciseCopy},
    {path: '/exercise/move/:exerciseDate', component: MyExerciseMove},
    {path: '/exercise/plan/:exerciseDate', component: MyExercisePlan},

    //커뮤니티
    {path: '/community', component: CommunityMain},
    {path: '/community/write', component: CommunitySave},
    {path: '/community/update/:id', component: CommunitySave},

    //짐웨어 & 장비
    {path: '/gymwear', component: GymWearMain},
    {path: '/gymwear/:id', component: GymWearDetail},

    //회원 및 게시글, 쇼핑 관련
    {path: '/userInfo', component: UserInfoMain},
    {path: '/user/edit', component: TabUserEdit},
    {path: '/userJoin/:checkcode', component: TabUserJoin, meta: {requiresAuth: true}},
    {path: '/userLogin', component: TabUserLogin, meta: {requiresAuth: true}},
    {path: '/userEditPassword', component: TabUserEditPassword},
    {path: '/postWrite', component: PostWrite},

    //회원가입 에러 페이지
    {path: '/userJoinError', component: UserjoinError},
    
    // 404 페이지
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    },

    //oauth2 redirect page
    {path: '/oauth2/redirect', component: RedirectView},
]

// 라우터 생성
const router = createRouter({
    history: createWebHistory(),
    routes
});


// router.afterEach((to) => {
//   if (!to.matched.some(record => record.meta.requiresAuth)) {
//     const exp = store.getters.getUser.exp;
//     let tokenExpired = false;
//     const currentTime = Date.now() / 1000;

//     if (exp < currentTime) {
//       //토큰 만료
//       tokenExpired = true;
//     } else {
//       // 토큰이 유효함
//       tokenExpired = false;
//     }

//     //토큰 시간 만료
//     if(tokenExpired){
//         alert("로그인 시간이 만료되었습니다.")
//         localStorage.removeItem('token');
//         this.$router.push('/userLogin');
//     }
//   }
// })

// 라우터 추출 (main.js에서 import)
export {router}
