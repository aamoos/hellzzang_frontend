<template>
    <div class="commonTab">
        <div class="userCommonContent">
            <div class="userImageWrap">
                <div class="commonImage userImage" v-if="thumnailUrl" :style="`background-image: url(${thumnailUrl});`"/>
                <div class="commonImage userImage" v-else />
                <div class="filebox">
                    <button class="Btns"><label for="file">이미지 변경</label></button>
                    <input type="file" id="file" ref="fileInput" @change="previewImage" accept="image/*">
                </div>
                <button class="Btns" @click="setBasicImage">기본 이미지 변경</button>
            </div>
            <div class="userInfoWrap">
                <div class="inputBox">
                    <div>이름</div>
                    <input v-model="username" class="inputInfo" type="text" disabled>
                </div>
                <div class="inputBox">
                    <div>아이디</div>
                    <input v-model="userid" class="inputInfo" type="text" disabled>
                </div>
                <div class="inputBox">
                    <div>닉네임</div>
                    <input v-model="nickname" class="inputInfo" type="text" disabled>
                </div>
                <div class="inputBox">
                    <div>주소</div>
                    <input v-model="address" class="inputInfo" type="text" required disabled>
                    <input v-model="addressFf" class="inputInfo" type="text" required disabled>
                    <input v-model="addressFs" class="inputInfo" type="text" required disabled>
                    <button @click="search()" class="Btns">주소찾기</button>
                </div>
                <div class="inputBox">
                    <div>상세 주소</div>
                    <input v-model="addressDetail" class="inputInfo" type="text" required>
                </div>
                <div class="inputBox">
                    <div>핸드폰</div>
                    <input v-model="phone" class="inputInfo" type="text" required>
                </div>
                <div class="userChangeBtns">
                    <div class="inputBox">
                        <button type="button" @click="changeUserImage" class="Btns">변경하기</button>
                    </div>
                    <div class="inputBox">
                        <router-link to="/userEditPassword">
                            <button type="button" class="Btns">비밀번호 변경</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            username: '',

            userid: '',

            nickname: '',
            nicknameValidPattern: /^[가-힣a-zA-Z0-9]{2,12}$/,
            idChk: '',
            
            password: '',
            passwordValidPattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,14}$/,
            passwordChk: '',

            address: '',
            addressFf: '',       
            addressFs: '',       
            addressDetail: '',  

            phone: '',

            file: null,
            thumbnailIdx : null,
            imageSrc : '',
            thumnailUrl : ''
        }
    },
    mounted(){
        this.userInfo();
    },

    methods: {
        //페이지 로드 시 유저 정보 가져옴
        userInfo(){
            const __this = this

            const userindex = __this.$store.getters.getUser.id
            __this.$http.post('/auth/userInfo', {id : userindex})
            .then(response => {
                __this.username = response.data.username
                __this.userid = response.data.userid
                __this.nickname = response.data.nickname
                __this.address = response.data.address
                __this.addressDetail = response.data.addressDetail
                __this.phone = response.data.phone
                __this.thumbnailIdx = response.data.thumbnailIdx
                console.log("---------User Index---------")
                console.log(__this.thumbnailIdx)
                console.log("-----------------------------")
                this.getUserImage();
            })
            .catch(error =>{
                console.log(error)
            })
        },
        //유저의 사진 가져옴
        getUserImage(){
            const __this = this

               __this.thumnailUrl = process.env.VUE_APP_URL+"/thumbnail/"+__this.thumbnailIdx;

            // __this.$http.get(`/thumbnail/${__this.thumbnailIdx}`)
            // .then(response => {
            //     console.log(response)

            //     const imageData = response.data.data;
            //     console.log(imageData)
            //     __this.imageSrc = `data:image/png;base64,${imageData}`
            // })
            // .catch(error => {
            //     console.log(error)
            // })
        },
        
        //이미지 미리보기
        previewImage(event) { 
            const selectedFile = this.$refs.fileInput.files[0]; // 선택된 파일
            const __this = this;
            if (selectedFile) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    __this.thumnailUrl = event.target.result;
                };

                __this.file = event.target.files[0];

                reader.readAsDataURL(selectedFile);
            } else {
                this.imageSrc = null;
            }
        },
        setBasicImage(){
            this.imageSrc = "/img/noImage.b0cac410.jpg";
        },

        //사진 업로드(단일 파일)
        changeUserImage(){
            const __this = this
            const formData = new FormData();
            formData.append('id', __this.$store.getters.getUser.id);
            formData.append('file', this.file);
            if(!(__this.address === '' || __this.addressDetail === '')){
                __this.$http.post('/file-upload', formData)
                .then(response => {
                    console.log("-----------------------------------")
                    console.log(response)
                    console.log(response.data.id)
                    console.log("-----------------------------------")

                    __this.thumbnailIdx = response.data.id
                    __this.changeInfo()
                })
            }else{
                alert("입력하신 정보를 확인해주세요.")
            }
        },

        //유저 정보 변경
        changeInfo(){
            const __this = this
            const phone = document.getElementById('phone');
            const params = {
                'id': __this.$store.getters.getUser.id,
                'address' : __this.address,
                'addressDetail' : __this.addressDetail,
                'phone' : __this.phone,
                'thumbnailIdx': __this.thumbnailIdx
            } 
            
            __this.$http.post('/auth/userChangeInfo',  params)
            .then(response => {
                alert("정보가 변경되었습니다.")
                __this.$router.push('/user')
                console.log(response)
            })
            .catch(error => {
                let responseData = error.response.data.errors;
                for(let i = 0; i < responseData.length; i++){
                    if(phone.id === responseData[i].field){
                        phone.textContent = responseData[i].defaultMessage
                    }
                }
                console.log(error)
                alert("입력하신 정보를 확인해주세요.")
            })
        },

        //정규식 체크
        ValidationP(validPattern, inputVal){
            if(inputVal == ''){
                return false;
            }
            else if(!validPattern.test(inputVal)){
                return true;
            } else{
                return false;
            }
        },

        //주소찾기
        search(){ //@click을 사용할 때 함수는 이렇게 작성해야 한다.
        const __this = this
            new window.daum.Postcode({
            oncomplete: (data) => { //function이 아니라 => 로 바꿔야한다.
                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                    // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    const roadAddr = data.roadAddress; // 도로명 주소 변수
                    let extraRoadAddr = ''; // 참고 항목 변수

                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraRoadAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraRoadAddr !== ''){
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }

                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    __this.addressFf = '(' + data.zonecode + ') ' + roadAddr; //우편번호 + 도로명주소
                    // document.getElementById("jibunAddress").value = data.jibunAddress; //지번주소
                    
                    // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
                    if(roadAddr !== ''){
                        __this.addressFs = extraRoadAddr; //참고항목
                        __this.address = __this.addressFf + __this.addressFs
                    } else {
                        __this.addressFs = '';
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