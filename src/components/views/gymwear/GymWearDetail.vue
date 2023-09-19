<template>
  <!-- 짐웨어&장비 상세 -->
  <main>
    <div class="container mt-5">
      <div class="input-group mb-3">
        <input type="text" id="searchVal" class="form-control" placeholder="검색어를 입력해주세요"
               aria-label="Search for products" aria-describedby="search-button">
        <button class="btn btn-primary btn-sm" type="button" id="search-button" @click="selectGymWear">검색</button>
      </div>
    </div>

    <div v-for="gymWear in items" :key="gymWear.id" class="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
      <div class="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
        <div class="my-3 p-3">
          <router-link :to="`/gymwear/${gymWear.id}`"><h2 class="display-5">{{ gymWear.title }}</h2></router-link>
          <p class="lead">{{ gymWear.price }}\</p>
        </div>
        <!-- 이미지를 중앙 정렬하는 부분 -->
        <div class="bg-body d-flex justify-content-center align-items-center shadow-sm mx-auto"
             :style="'width: 100%;  border-radius: 21px 21px 0 0; background-image: url(' + gymWear.thumbnailUrl + ')'">
          <router-link :to="`/gymwear/${gymWear.id}`"><img :src="gymWear.thumbnailUrl" alt="Product Image"
                                                               style="max-width: 100%; max-height: 100%;"/>
          </router-link>
        </div>
        <!-- 이미지를 중앙 정렬하는 부분 끝 -->
      </div>
    </div>
    <br><br><br><br><br><br>
  </main>


</template>

<script>
export default {
  data() {
    return {
      menuToggled: false,
      detailToggled: false,
      previousElement: null,

      menus: [],
      activeMenu: null,
      items: [],
      page: 0,
      size: 6
    }
  },

  mounted() {
    //짐웨어 조회
    this.selectGymWear();
  },

  methods: {
    //짐웨어 조회하기
    selectGymWear() {
      const __this = this;
      const params = {
        title: document.querySelector('#searchVal').value,
        page: __this.page,
        size: __this.size
      }

      console.log(params);

      __this.$http.post('/gymWear/list', params)
          .then(response => {
            console.log(response.data.content);
            let content = response.data.content;
            console.log(content);
            for (let i = 0; i < content.length; i++) {
              //content[i].thumbnailUrl = "http://localhost:8280/thumbnail/"+content[i].thumbnailIdx;
              content[i].thumbnailUrl = process.env.VUE_APP_URL + "/thumbnail/" + content[i].thumbnailIdx;
            }

            __this.items = content;

            console.log(content);
          })
          .catch(error => {
            console.log(error)
          })
    },

  }
}
</script>