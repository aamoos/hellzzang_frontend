<template>
  <!-- 짐웨어&장비 메인 -->
  <div class="container my-5">
    <div class="row">
      <div class="col-md-6">
        <h1>{{ gymWear.title }}</h1>
        <!-- Update the img tag with gymwear.thumbnail as the src -->
        <img alt="상품 이미지" class="img-fluid" :src="gymWear.thmunbnailUrl">
      </div>
      <div class="col-md-6">
        <p class="lead" v-html="gymWear.contents"></p>
        <p><strong>가격: {{ gymWear.price }}\</strong></p>
        <!-- Option Combo Box (e.g., Size) -->
        <div class="mb-3" v-if="gymWearOptions.length > 0">
          <label for="sizeSelect" class="form-label">사이즈</label>
          <select class="form-select" id="sizeSelect">
            <option v-for="gymWearOptions in gymWear.gymWearOptions" :key="gymWearOptions.id"
                    :value="gymWearOptions.optionName">{{ gymWearOptions.optionName }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <!-- Add to Cart Button -->
          <button class="btn btn-primary me-2">장바구니에 추가</button>

          <!-- Buy Now Button -->
          <button class="btn btn-success me-2">구매</button>

          <!-- Add to Wishlist Button -->
          <button class="btn btn-danger">찜하기</button>
        </div>
      </div>
    </div>
  </div>
  <br><br><br><br>
</template>

<script>
export default {
  data() {
    return {
      gymWear: {},
      gymWearOptions: []
    }
  },

  mounted() {
    //짐웨어 조회
    this.selectGymWearDetail();
  },

  methods: {
    //짐웨어 조회하기
    selectGymWearDetail() {
      const __this = this;
      const params = {
        id: this.$route.params.id
      }

      console.log(params);

      __this.$http.post('/gymWear/detail', params)
          .then(response => {
            console.log("============돌아오는데이터=================")
            console.log(response.data)
            console.log("============돌아오는데이터=================")
            __this.gymWear = response.data;
            __this.gymWearOptions = __this.gymWear.gymWearOptions;
            console.log(__this.gymWear);

            const thumbnailIdx = __this.gymWear.thumbnailIdx;

            // __this.gymWear.thmunbnailUrl = "http://localhost:8280/thumbnail/"+thumbnailIdx;
            __this.gymWear.thmunbnailUrl = process.env.VUE_APP_URL + "/thumbnail/" + thumbnailIdx;
            console.log(__this.gymWear.contents);

            const thumbnailUrl = process.env.VUE_APP_URL + "/thumbnail";

            __this.gymWear.contents = __this.gymWear.contents.replaceAll("/thumbnail", thumbnailUrl);

          })
          .catch(error => {
            console.log(error)
          })
    },
  }
}
</script>