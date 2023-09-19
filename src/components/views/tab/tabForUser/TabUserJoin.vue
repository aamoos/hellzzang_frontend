<template>
  <div class="container mt-5">
    <h1>헬짱 회원가입</h1>
    <form>
      <!-- Profile Image Preview -->
<!--      <div class="mb-3">-->
<!--        &lt;!&ndash; 이미지 미리보기 &ndash;&gt;-->

<!--        <img-->
<!--            v-if="user.previewUrl"-->
<!--            :style="{ width: '150px', height: '200px', backgroundImage: 'url(' + user.previewUrl + ')' }"-->
<!--            id="imagePreview"-->
<!--        />-->
<!--      </div>-->

      <!-- Profile Image -->
<!--      <div class="mb-3">-->
<!--        <label for="profileImage" class="form-label">Profile Image</label>-->
<!--        <input type="file" class="form-control" id="profileImage" ref="fileInput" @change="previewImage"-->
<!--               accept="image/*">-->
<!--      </div>-->
      <!-- Name -->
      <div class="mb-3">
        <label for="name" class="form-label">이름</label>
        <input type="text" class="form-control" id="name" v-model="user.username" required>
        <div class="text-danger" v-if="errors.username">{{ errors.username[0] }}</div>
      </div>
      <!-- id -->
      <div class="mb-3">
        <label for="name" class="form-label">아이디</label>
        <input type="text" class="form-control" id="name" v-model="user.userid" disabled>
      </div>
      <!-- Nickname -->
      <div class="mb-3">
        <label for="nickname" class="form-label">닉네임</label>
        <input type="text" class="form-control" id="nickname" v-model="user.nickname" required>
        <div class="text-danger" v-if="errors.nickname">{{ errors.nickname[0] }}</div>
      </div>
      <!-- Password -->
      <div class="mb-3">
        <label for="password" class="form-label">패스워드</label>
        <input type="password" class="form-control" id="password" v-model="user.password" required min="8" max="14">
        <div class="text-danger" v-if="errors.password">{{ errors.password[0] }}</div>
      </div>
      <!-- Password Confirmation -->
      <div class="mb-3">
        <label for="passwordConfirmation" class="form-label">패스워드 확인</label>
        <input type="password" class="form-control" id="passwordConfirmation" v-model="user.passwordChk" required
               min="8"
               max="14">
        <div class="text-danger" v-if="errors.password">{{ errors.password[0] }}</div>
      </div>
      <!-- Address -->
      <div class="mb-3">
        <label for="address" class="form-label">주소</label>
        <input type="text" class="form-control" id="address" v-model="user.address" readonly>
      </div>
      <div class="mb-3">
        <input type="text" class="form-control" id="address2" v-model="user.addressDetail">
        <button @click="search()" type="button" class="btn btn-primary btn-sm">주소 찾기</button>
      </div>

      <!-- Phone Number -->
      <div class="mb-3">
        <label for="phoneNumber" class="form-label">핸드폰 번호</label>
        <input v-model="user.phone" type="tel" class="form-control" id="phoneNumber" placeholder=" - 제외하여 입력하세요" required>
        <div class="text-danger" v-if="errors.phone">{{ errors.phone[0] }}</div>
      </div>
      <!-- Submit Button -->
      <button type="button" @click="join()" class="btn btn-danger btn-sm">회원가입</button>
    </form>
  </div>
</template>

<script>
export default {

  data() {
    return {
      user: {
        username: ''
        , userid: ''
        // , previewUrl: ''
        , nickname: ''
        , password: ''
        , passwordChk: ''
        , address: ''
        , addressDetail: ''
        , phone: ''
      },
      errors: {}
    }
  },

  mounted() {
    this.getUserId();
  },

  methods: {
    getUserId() {
      const __this = this;

      __this.$http.post('/auth/emailCheck', {
        'checkcode': __this.$route.params.checkcode
      })
          .then(response => {
            console.log(response);
            if (response.data != null && response.data != "") {
              __this.user.userid = response.data
            }else{
              //해당하는 아이디가 없는경우 팅겨내기
              this.$router.push("/userJoinError");
            }
          })
          .catch(error => {
            console.log(error);
          })
    },

    // previewImage() {  //이미지 미리보기
    //   const file = this.$refs.fileInput.files[0]; // 선택된 파일
    //   if (file) {
    //     const reader = new FileReader();
    //
    //     reader.onload = (event) => {
    //       this.user.previewUrl = event.target.result;
    //     };
    //
    //     reader.readAsDataURL(file);
    //   } else {
    //     this.user.previewUrl = null;
    //   }
    // },

    //회원가입
    async join() {
      const __this = this;

      const successCallback = function () {
        __this.$http.post('/auth/signup', __this.user).then(response => {
          console.log(response.data)
          //location.href = "/exercise";
          __this.$alert("회원가입이 완료되었습니다.", "", "Y");
        }).catch(error => {
          __this.errors = error.response.data.errors;
          console.log(__this.errors);
        })
      }

      await this.$confirmPop("회원가입 하시겠습니까?", successCallback);
    },

    //주소찾기
    search() { //@click을 사용할 때 함수는 이렇게 작성해야 한다.
      const __this = this;

      new window.daum.Postcode({
        oncomplete: (data) => { //function이 아니라 => 로 바꿔야한다.
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          const roadAddr = data.roadAddress; // 도로명 주소 변수
          let extraRoadAddr = ''; // 참고 항목 변수

          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraRoadAddr !== '') {
            extraRoadAddr = ' (' + extraRoadAddr + ')';
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          __this.user.address = '(' + data.zonecode + ') ' + roadAddr; //우편번호 + 도로명주소
          // document.getElementById("jibunAddress").value = data.jibunAddress; //지번주소

          // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
          if (roadAddr !== '') {
            __this.user.addressDetail = extraRoadAddr; //참고항목
          } else {
            __this.user.addressDetail = '';
          }

          // const guideTextBox = document.getElementById("guide");
          // // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
          // if(data.autoRoadAddress) {
          //     const expRoadAddr = data.autoRoadAddress + extraRoadAddr;
          //     guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
          //     guideTextBox.style.display = 'block';

          // } else if(data.autoJibunAddress) {
          //     const expJibunAddr = data.autoJibunAddress;
          //     guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
          //     guideTextBox.style.display = 'block';
          // } else {
          //     guideTextBox.innerHTML = '';
          //     guideTextBox.style.display = 'none';
          // }
        }
      }).open();
    }
  }
}
</script>