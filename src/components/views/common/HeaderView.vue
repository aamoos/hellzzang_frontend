<template>
  <header v-if="showHeader" class="py-3 mb-3 border-bottom">
    <div class="container-fluid d-grid gap-3 align-items-center" style="grid-template-columns: 1fr 2fr;">
      <div class="dropdown">
        <router-link to="/">
          <a class="navbar-brand">
            <span class="fs-4"><img src="~@/assets/images/hellzzangLogoBlack.png" style="background-size: cover;border-radius: 50%;
            border: 1px solid white;" alt="" width="30" height="30" class="d-inline-block align-text-top"> Hellzzang</span>
          </a>
        </router-link>
<!--        <a href="#" class="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none dropdown-toggle" id="dropdownNavLink" data-bs-toggle="dropdown" aria-expanded="false">-->
<!--          <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>-->
<!--        </a>-->
<!--        <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownNavLink" style="">-->
<!--          <li><a class="dropdown-item active" href="#" aria-current="page">Overview</a></li>-->
<!--          <li><a class="dropdown-item" href="#">Inventory</a></li>-->
<!--          <li><a class="dropdown-item" href="#">Customers</a></li>-->
<!--          <li><a class="dropdown-item" href="#">Products</a></li>-->
<!--          <li><hr class="dropdown-divider"></li>-->
<!--          <li><a class="dropdown-item" href="#">Reports</a></li>-->
<!--          <li><a class="dropdown-item" href="#">Analytics</a></li>-->
<!--        </ul>-->
      </div>

      <div class="d-flex align-items-center">
        <form class="w-100 me-3">
<!--          <input type="search" class="form-control" placeholder="Search..." aria-label="Search">-->
        </form>

        <div class="flex-shrink-0 dropdown">
          <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
          </a>
          <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2" style="">
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li v-if="!this.$store.getters.isLoggedIn"><a class="dropdown-item">
              <router-link to="/userLogin">로그인</router-link></a>
            </li>
            <li v-if="this.$store.getters.isLoggedIn">
              <router-link @click="logout" to="/userLogin">
                <a class="dropdown-item">
                  로그아웃
                </a>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>


<!--    <div class="header">-->
<!--        <router-link to="/">-->
<!--            <div class="headerImage hellzzangLogo logoSizeS"></div>-->
<!--        </router-link>-->
<!--        <div class="headerTitle"><router-link to="/">HellZZang</router-link></div>-->
<!--        <div class="headerUser">-->
<!--            &lt;!&ndash; <router-link to="/adminInsert">상품등록</router-link> &ndash;&gt;-->
<!--            <router-link v-if="!this.$store.getters.isLoggedIn" to="/userLogin">로그인</router-link>-->
<!--            <router-link v-if="this.$store.getters.isLoggedIn" @click="logout" to="/userLogin">로그아웃</router-link>-->
<!--        </div>-->
<!--        <div>-->
<!--        </div>-->
<!--    </div>-->
</template>

<script>
  export default {
      computed: {
        showHeader(){
          return this.$route.path !== '/userLogin'
              && !this.$route.path.includes('/userJoin');
        }
      },
      methods: {
          logout(){
              // //jwt token 제거
              // localStorage.removeItem("token");
              // location.href = "/userLogin";
              this.$store.dispatch("logout");
          }
      }
  };
</script>
