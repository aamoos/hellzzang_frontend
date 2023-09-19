import { createApp } from 'vue'
import axioss from 'axios'
import App from './App.vue'
import AOS from 'aos';
import "aos/dist/aos.css";
// 생성한 뷰 라우터 받아오기
import { router } from './components/router/index'

//confirm
import Vue3ConfirmDialog from 'vue3-confirm-dialog';
import 'vue3-confirm-dialog/style';

//store
import store from '@/components/store/store'

//datepicker
import {DatePicker, Calendar} from 'v-calendar';

import jwtDecode from 'jwt-decode';

//cookie
import VueCookies from 'vue-cookies'

//quill editor
import { quillEditor } from 'vue3-quill'

//bootstrap-vue.css
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'; // Bootstrap CSS
import 'bootstrap-vue/dist/bootstrap-vue.css'; // BootstrapVue CSS
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';

//공통 css
import '@/assets/css/style.scss';
const app = createApp(App)

// Axios 인스턴스 생성
const axios = axioss.create({
  // baseURL: 'http://192.168.0.38:8080'
  //baseURL: 'http://localhost:8080'
  baseURL: process.env.APP_URL
})

// 요청 인터셉터
axios.interceptors.request.use(
  (config) => {
    const currentURL = window.location.pathname;

    if( !config.url.includes("/auth")){
      // 요청 전에 수행할 작업
      const token = localStorage.getItem('token');
      if (token) {
        const currentTime = Math.floor(Date.now() / 1000) // 현재 시간 (단위: 초)
        const jwtTokenExp = store.getters.getUser.exp
        const refreshTokenExp = jwtDecode(localStorage.getItem('refreshToken')).exp;


        console.log("=======================decode=========================")
        console.log(store.getters.getUser.exp + "/////" + jwtDecode(localStorage.getItem('refreshToken')).exp + "////////" +  Math.floor(Date.now() / 1000))
        console.log("=======================decode=========================")

        if (jwtTokenExp < currentTime) {
          // JWT 토큰이 만료된 경우 처리 로직 추가
          console.log('JWT 토큰이 만료되었습니다.')
        }

        if(refreshTokenExp < currentTime){
          console.log('JWT 리프레시 토큰이 만료되었습니다.')
          store.dispatch("logout");
        }

        else {
          // JWT 토큰이 만료되지 않은 경우 헤더에 JWT 토큰 추가
          config.headers.Authorization = `Bearer ${token}`
        }
      }else{
        console.log(currentURL);
        router.push("/userLogin");
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    console.log(error);
    const currentURL = window.location.pathname;

    //login 페이지에서는 refresh token 호출안되게 처리
    if(currentURL != "/userLogin"){
      if(error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
          // JWT 토큰 재발급 요청
          const response = await axios.post('/auth/refresh', {
            refreshToken: localStorage.getItem('refreshToken')
          })
          const token = response.data.token
          const refreshToken = response.data.refreshToken;

          // const jwtTokenExp = response.data.expires_at
          localStorage.setItem('token', token)
          localStorage.setItem('refreshToken', refreshToken);

          store.commit('setToken', token);
          store.commit('setUser', jwtDecode(token));
          console.log("=======================decode=========================")
          console.log(store.getters.getUser.exp + "/////" + jwtDecode(token).exp + "////////" +  Math.floor(Date.now() / 1000))
          console.log("=======================decode=========================")
          // 재발급된 JWT 토큰을 헤더에 추가하여 원래 요청 다시 보내기
          originalRequest.headers.Authorization = `Bearer ${token}`
          return axios(originalRequest)
        } catch (error) {
          // JWT 토큰 재발급 실패 처리 로직 추가
          console.log('JWT 토큰 재발급에 실패하였습니다.')
          return Promise.reject(error)
        }
      }
    }
    return Promise.reject(error)
  }
)

app.config.globalProperties.$http = axios

//alert 공통함수
app.config.globalProperties.$alert = function(title, errorMessage, flag) {
  if(flag == "Y"){
    // 공통 함수의 로직을 구현합니다.
    this.$confirm({
      title: title,
      message: errorMessage,
      button: {
        yes: '예'
      }
    })
  }else{
    this.$confirm({
      title: title,
      message: errorMessage,
    })
  }
};

//confirm 공통함수
app.config.globalProperties.$confirmPop = function(message, successCallback) {

    // 공통 함수의 로직을 구현합니다.
    this.$confirm({
        message: message,
        button: {
            no: '아니요',
            yes: '예'
        },
        /**
         * Callback Function
         * @param {Boolean} confirm
         */
        callback: confirm => {
            if (confirm) {
                successCallback();
            }
        }
    })
};
app.use(BootstrapIconsPlugin);
app.use(router)  // 라우터 사용
app.use(AOS)
app.use(store)  //vuex
app.use(Vue3ConfirmDialog);   //confirm
app.use(VueCookies) //cookie
app.use(quillEditor) //quill editor
app.component('VDatePicker', DatePicker)
app.component('VCalendar', Calendar)

app.component('vue3-confirm-dialog', Vue3ConfirmDialog.default)
app.mount('#app')
