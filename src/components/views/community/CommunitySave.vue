<template>
  <div class="container my-5">
    <form @submit.prevent="submitPost" enctype="multipart/form-data">
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="community.title"
        >
        <div class="text-danger" v-if="errors.title">{{ errors.title[0] }}</div>
      </div>

      <div class="mb-3">
        <label for="content" class="form-label">내용</label>
        <textarea
          class="form-control"
          id="content"
          v-model="community.contents"
          rows="4"
          
        ></textarea>
        <div class="text-danger" v-if="errors.contents">{{ errors.contents[0] }}</div>
      </div>

      <div class="mb-3">
        <label for="fileInput" class="form-label">파일 선택</label>
        <input
          type="file"
          id="fileInput"
          ref="fileInput"
          class="form-control"
          multiple
          accept="image/*"
          @change="handleFileChange"
        >
      </div>

    <!-- 이미지 슬라이더 -->
    <div id="imageSlider" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div
          v-for="(file, index) in community.communityFiles"
          :key="index"
          :class="['carousel-item', index === 0 ? 'active' : '']"
        >
          <img :src="file.previewURL" class="d-block w-100" alt="Uploaded Image">
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#imageSlider"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#imageSlider"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <br>
     <button type="submit" class="btn btn-outline-primary btn-sm">저장</button>
     </form>
     <br><br>
  </div>
</template>

<script>
export default {
  data() {
    return {
      community: {
        title: '',
        contents: '',
        communityFiles: [] //파일업로드 첨부파일
      },
      errors: {}
    };
  },
  methods: {
    handleFileChange() {
      // 파일이 선택되면 해당 파일들을 files 배열에 추가합니다.
      const fileInput = this.$refs.fileInput;
      const fileInfo = Array.from(fileInput.files);
      for (const file of fileInfo) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.community.communityFiles.push({
            name: file.name,
            size: file.size,
            previewURL: event.target.result, // 미리보기 이미지 URL
          });
        };
        reader.readAsDataURL(file);
      }
    },

    async submitPost() {
      const formData = new FormData(); // FormData 객체 생성

      // FormData에 데이터 추가
      formData.append('title', this.community.title);
      formData.append('contents', this.community.contents);

      // 파일 업로드된 경우 FormData에 파일 추가
       const fileInput = this.$refs.fileInput;
      const fileInfo = Array.from(fileInput.files);
      Array.from(fileInfo).forEach((el) => {
        formData.append("communityFiles", el);
      });
      console.log("=========formData=========");
      console.log(formData);
      console.log("=========formData=========");
      try {
        const response = await this.$http.post('/community/save', formData, {
          headers: {
            'Content-Type': 'multipart/form-data' // 파일 전송 시 Content-Type 설정
          }
        });
        
        console.log(response.data);
        this.$router.push("/community");
      } catch (error) {
        this.errors = error.response.data.errors;
        console.log(this.errors);
      }
    },

  },
};
</script>

<style>
/* 이미지 슬라이더 스타일링 */
.carousel {
  max-width: 600px; /* 슬라이더 너비 조절 */
  margin: 0 auto; /* 가운데 정렬 */
}

.carousel img {
  max-height: 300px; /* 이미지 높이 조절 */
  margin: 0 auto; /* 가운데 정렬 */
}
</style>
