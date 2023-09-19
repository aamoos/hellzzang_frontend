<template>
  <div class="container mt-5">
    <ul class="list-group">
      <router-link to="/user/edit"><li class="list-group-item"><a>프로필 수정</a></li></router-link>
      <li class="list-group-item"><a>찜한 상품</a></li>
      <li class="list-group-item"><a>장바구니</a></li>
      <li class="list-group-item"><a>구매내역</a></li>
      <li class="list-group-item"><a>내가 쓴 글</a></li>
      <li @click="lightbox" class="list-group-item"><a>회원탈퇴</a></li>
    </ul>
  </div>
</template>