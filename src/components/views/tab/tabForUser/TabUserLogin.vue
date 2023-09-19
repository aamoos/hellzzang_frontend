<head>
</head>
<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">

              <div class="mb-md-5 mt-md-4 pb-5">

                <h2 class="fw-bold mb-2 text-uppercase">HellZZang</h2>
                <p class="text-white-50 mb-5"></p>

                <div class="form-outline form-white mb-4">
                  <input type="email" id="typeEmailX" class="form-control form-control-lg" required placeholder="이메일" v-model="userid" />
                  <label id="userid" ref="userIdCheck" class="form-label" for="typeEmailX"></label>

                </div>

                <div class="form-outline form-white mb-4">
                  <input type="password" id="typePasswordX" class="form-control form-control-lg" required placeholder="패스워드" v-model="password" />
                  <label class="form-label" for="typePasswordX"></label>
                </div>

                <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">패스워드 찾기</a></p>

                <button @click="userExistenceCheck" class="btn btn-outline-light btn-sm px-5">Login</button>
                <br><br>
                <button @click="redirectToNaver" class="btn btn-outline-light btn-sm px-5">Naver Login</button>
                <br><br>
                <button @click="redirectToKakao" class="btn btn-outline-light btn-sm px-5">KaKao Login</button>
                <br><br>
                <button @click="redirectToGoogle" class="btn btn-outline-light btn-sm px-5">Google Login</button>
<!--                <div class="d-flex justify-content-center text-center mt-4 pt-1">-->
<!--                  <a href="#!" class="text-white"><i class="fab fa-facebook-f fa-lg"></i></a>-->
<!--                  <a href="#!" class="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2"></i></a>-->
<!--                  <a href="#!" class="text-white"><i class="fab fa-google fa-lg"></i></a>-->
<!--                </div>-->

              </div>

<!--              <div>-->
<!--                <p class="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a>-->
<!--                </p>-->
<!--              </div>-->

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
<!-- naver -->
<!--    <div class="commonTab">-->
<!--        <div class="userCommonContent">-->
<!--            <div class="userInfoWrap">-->
<!--                <div class="inputBox">-->
<!--                    <div>아이디</div>-->
<!--                    <input class="inputInfo" type="text" required v-model="userid">-->
<!--                    <p id="userid" ref="userIdCheck" class="warnText">아이디는 이메일 형식입니다.</p>-->
<!--                </div>-->
<!--                <div class="inputBox">-->
<!--                    <div>비밀번호</div>-->
<!--                    <input class="inputInfo" type="password" required v-model="password">-->
<!--                </div>-->
<!--                <div class="inputBox loginBtn">-->
<!--                    <div>-->
<!--                        <input type="checkbox" v-model="rememberIdCheckBox"><span>&nbsp;아이디 기억하기</span>-->
<!--                    </div>-->
<!--                    <button @click="userExistenceCheck" class="userLogin"><p>{{loginBtnMessage}}</p></button>-->
<!--                </div>-->
<!--                <div class="flatFormLogin">-->
<!--                    <button @click="redirectToNaver" id="naver_id_login" class="naverLogin"><div class="naver" /><p>네이버 로그인</p></button>-->
<!--                    <button @click="redirectToKakao" class="kakaoLogin"><div class="kakao" /><p>카카오 로그인</p></button>-->
<!--                    <button @click="redirectToGoogle" class="googleLogin"><div class="google" /><p>구글 로그인</p></button>-->
<!--                    &lt;!&ndash; <button class="facebookLogin"><div class="facebook" /><p>페이스북 로그인</p></button> &ndash;&gt;-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
</template>

<style>
.gradient-custom {
  /* fallback for old browsers */
  background: #6a11cb;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))
}
</style>

<script>
import {ref} from 'vue';
export default {
    setup(){
        const userIdCheck = ref(null)

        return{
            userIdCheck
        }
    },
    data() {
        return {
            userid : 'admin@naver.com'
            ,password : 'admin'
            ,loginBtnMessage : '로그인'
            ,rememberIdCheckBox : false
            ,env : process.env.NODE_ENV
        };
    },
    mounted() {
        const __this = this
        if(__this.$cookies.isKey("userId")){
            __this.userid = __this.$cookies.get("userId")
            __this.rememberIdCheckBox = __this.$cookies.get("rememberIdCheckBox")
        }
    },

    methods: {
        userExistenceCheck(){
            const __this = this;

            __this.$http.post('/auth/userExistenceCheck', {
                'userid' : __this.userid
                })
                .then(response => {
                    console.log(response);
                    //해당 회원이 존재한다면 login() 호출
                    if(response.data == true){
                        __this.login();
                        //아이디 기억하기 체크 시 쿠키에 아이디 저장
                        if(__this.rememberIdCheckBox){
                            const expTime = 60 * 60
                            __this.$cookies.set("userId", __this.userid, expTime) //마지막 쿠키 만료시간(초단위)
                            __this.$cookies.set("rememberIdCheckBox", true, expTime)
                        }else{
                            __this.$cookies.remove("userId")
                            __this.$cookies.remove("rememberIdCheckBox")
                        }
                    }else{  //회원이 존재하지 않으면 메일 전송
                        __this.$alert("회원가입 메일이 전송되었습니다.", "", "Y");
                        __this.$http.post('/auth/sendEmail', {
                            'userid' : __this.userid
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    }
                })
                .catch(error => {
                    let responseData = error.response.data
                    if(__this.userIdCheck.id === responseData[0].field){
                        __this.userIdCheck.textContent = responseData[0].defaultMessage
                    }
                    console.log(error)
                })
        },

        redirectToNaver(){
            
            if(this.env == "local"){
                window.location.href = 'http://localhost:8180/oauth2/authorize/naver?redirect_uri=http://localhost:8080/oauth2/redirect';
            }else{
                window.location.href = 'http://192.168.0.39:8180/oauth2/authorize/naver?redirect_uri=http://192.168.0.39:8080/oauth2/redirect';
            }
        },

        redirectToKakao(){
            if(this.env == "local"){
                window.location.href = 'http://localhost:8180/oauth2/authorize/kakao?redirect_uri=http://localhost:8080/oauth2/redirect';
            }else{
                window.location.href = 'http://192.168.0.39:8180/oauth2/authorize/kakao?redirect_uri=http://192.168.0.39:8080/oauth2/redirect';
            }
        },

        //테스트 불가
        redirectToGoogle(){
             if(this.env == "local"){
                window.location.href = 'http://localhost:8180/oauth2/authorize/google?redirect_uri=http://localhost:8080/oauth2/redirect';
             }else{
                window.location.href = 'http://192.168.0.39:8180/oauth2/authorize/google?redirect_uri=http://192.168.0.39:8080/oauth2/redirect';
             }
            
        },

        async login() {
            const __this = this
            try {
                await __this.$store.dispatch('login', {
                    "userid" : __this.userid,
                    "password" : __this.password
                });
                // Redirect to home page after login
                __this.$router.push('/');
            } catch (err) {
                if(err.response.data != ""){
                    __this.userIdCheck.textContent = err.response.data
                }else{
                    __this.userIdCheck.textContent = "정보가 없거나 아이디 혹은 비밀번호가 일치하지 않습니다."
                }
                console.log(err);
            }
        }
    }
}
</script>