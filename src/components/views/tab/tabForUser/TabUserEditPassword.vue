<template>
    <div class="commonTab">
        <div class="userCommonContent">
            <div class="userInfoWrap">
                <div class="inputBox">
                    <div>기존 비밀번호</div>
                    <input v-model="oldPassword" class="inputInfo" type="password" required>
                    <p id="password" ref="oldPasswordCheck" class="warnText">기존 비밀번호를 입력하세요.</p>
                </div>
                <div class="inputBox">
                    <div>새 비밀번호</div>
                    <input v-model="newPassword" class="inputInfo" type="password" required>
                    <p id="newPassword" ref="newPasswordCheck" class="warnText">변경하실 비밀번호를 입력하세요.</p>
                </div>
                <div class="inputBox">
                    <div>비밀번호 확인</div>
                    <input v-model="passwordChk" class="inputInfo" type="password" required>
                    <p v-if="!(this.newPassword === this.passwordChk)" class="warnText">비밀번호가 일치하지 않습니다.</p>
                </div>
                <div class="inputBox">
                    <button type="button" @click="changePassword()" class="Btns">변경하기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue';
export default {
    setup() {
        const oldPasswordCheck = ref(null)
        const newPasswordCheck = ref(null)

        return{
            oldPasswordCheck,
            newPasswordCheck
        }
        
    },
    data(){
        return{
            oldPassword: '',
            newPassword: '',
            passwordChk: '',
            id: this.$store.getters.getUser.id
        }
    },

    methods:{
        changePassword(){
            const __this = this

            if(__this.newPassword === __this.passwordChk){
                __this.$http.post('/auth/userChangePassword', {
                    'id' : __this.id,
                    'oldPassword' : __this.oldPassword,
                    'newPassword' : __this.newPassword
                    })
                .then(response => {
                    console.log(response)
                    if(response.data === 't'){
                        alert("비밀번호가 변경되었습니다.")
                        __this.$router.push('/user')
                    }else{
                        __this.oldPasswordCheck.innerText = response.data
                    }
                })
                .catch(error => {
                    console.log(error)
                    let responseData = error.response.data.errors;
                    if(__this.newPasswordCheck.id === responseData[0].field){
                        __this.newPasswordCheck.innerText = responseData[0].defaultMessage
                    }
                })
            }else{
                alert("비밀번호가 올바르지 않습니다.")
            }
        },
    }


}
</script>
