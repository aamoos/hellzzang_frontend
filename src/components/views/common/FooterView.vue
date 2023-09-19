<template>
  <!--    <div class="footer">-->
  <!--        <ul class="footerMenu">-->
  <!--            <li><router-link to="/">나만의 운동</router-link></li>-->
  <!--            <li><router-link to="/community">커뮤니티</router-link></li>-->
  <!--            <li><router-link to="/gymwear">짐웨어&장비</router-link></li>-->
  <!--            <li><router-link to="/user">회원정보</router-link></li>-->
  <!--        </ul>-->
  <!--    </div>-->
  <!-- Bottom Navigation Bar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-bottom" v-if="showFooter">
    <div class="container">
      <div class="d-flex justify-content-between w-100">
        <router-link to="/"><button class="btn btn-pretty" :class="{ 'active': $route.path.includes('/exercise') || $route.path === '/' }">나만의 운동</button></router-link>
        <router-link to="/community"><button class="btn btn-sm btn-pretty" :class="{ 'active': $route.path.includes('/community') }">커뮤니티</button></router-link>
        <router-link to="/gymwear"><button class="btn btn-pretty" :class="{ 'active': $route.path.includes('/gymwear') }">짐웨어&장비</button></router-link>
        <router-link to="/userInfo"><button class="btn btn-pretty" :class="{ 'active': $route.path === '/userInfo' }">회원정보</button></router-link>
      </div>
    </div>
  </nav>
</template>
<style>
/* 사용자 정의 스타일을 여기에 추가하세요 */
  .footer {
      background-color: #333;
      padding: 20px 0;
      color: white;
  }
  .footer-menu {
      display: flex;
      justify-content: center;
      list-style: none;
      padding: 0;
  }
  .footer-menu-item {
      margin: 0 10px;
  }
  .footer-menu-item a {
      text-decoration: none;
      color: white;
      font-weight: bold;
      transition: color 0.3s;
  }
  .footer-menu-item a:hover {
      color: #ffc107; /* 호버 시 색상 변경 */
  }
</style>
<script>
export default {
  computed: {
    showFooter() {
      return this.$route.path !== '/userLogin' && !this.$route.path.includes('/userJoin');
    }
  }
};
</script>
