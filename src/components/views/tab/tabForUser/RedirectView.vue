<template>
    <div>
    </div>
</template>

<script>

import jwtDecode from 'jwt-decode';

export default {
  created() {
    const token = this.$route.query.token
    const refreshToken = this.$route.query.refreshToken

    if (token) {
      this.$store.commit('setToken', token);
      this.$store.commit('setUser', jwtDecode(token));
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      this.$router.push({path:'/'})
    } else {
      window.alert('로그인에 실패하였습니다.')
      this.$router.push({path:'/userLogin'})
    }
  }
}
</script>

<style scoped>

</style>