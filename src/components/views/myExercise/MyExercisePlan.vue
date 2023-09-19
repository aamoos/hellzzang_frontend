<template>
  <body class="bg-light">
  <div class="container">
    <main>
      <div class="row g-5">
        <div class="col-md-7 col-lg-8">
          <h4 class="mb-3">운동등록</h4>
          <form id="exerciseForm" @submit.prevent="insertExercise" class="needs-validation" novalidate="">
            <div v-for="exercise in items" :key="exercise.id">
              <div class="row g-3">
                <div class="col-sm-6">
                  <label for="firstName" class="form-label">운동명</label>
                  <input type="text" class="form-control" id="firstName" placeholder="" v-model="exercise.exerciseName"
                         required="">
                  <div class="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
              </div>
              <div class="row g-3">
                <div class="col-sm-6">
                  <label for="firstName" class="form-label">세트</label>
                  <input type="number" class="form-control" id="firstName" placeholder="" maxlength="2"
                         v-model="exercise.setCount" required="">
                  <div class="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
              </div>
              <div class="row g-3">
                <div class="col-sm-6">
                  <label for="firstName" class="form-label">kg</label>
                  <input type="number" class="form-control" id="firstName" placeholder="" maxlength="3"
                         v-model="exercise.kilogram" required="">
                  <div class="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
              </div>
              <div class="row g-3">
                <div class="col-sm-6">
                  <label for="firstName" class="form-label">회</label>
                  <input type="number" class="form-control" id="firstName" placeholder="" maxlength="3"
                         v-model="exercise.reps" required="">
                  <div class="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
              </div>
              <hr class="my-4">
              <div class="col-md-5 p-lg-5 mx-auto my-5">
                <button @click="deleteSet" type="button" class="btn btn-outline-danger btn-sm">삭제</button>
              </div>
            </div>
            <div class="text-center bg-light">
              <div class="col-md-5 p-lg-5 mx-auto my-5">
                <button @click="addSet" type="button" class="btn btn-outline-primary btn-sm">추가</button>
                <button type="submit" class="btn btn-outline-primary btn-sm">저장</button>
              </div>
            </div>
            <br><br><br>
          </form>
        </div>
      </div>
    </main>
  </div>
  </body>
</template>

<script>
import moment from 'moment';

export default {

  data() {
    return {
      exerciseName: '',
      setCount: 0,
      kilogram: 0,
      reps: 0,
      exerciseDate: moment(this.$route.params.exerciseDate).format("YYYY-MM-DD"),
      items: [],
      listSize: 0,
      completeYn: "N"
    }
  },

  mounted() {
    this.selectExercise();
  },

  methods: {
    //상세 조회하기
    selectExercise() {
      const __this = this;

      const params = {
        exerciseDate: moment(__this.$route.params.exerciseDate).format("YYYY-MM-DD"),
      }

      console.log(params);

      __this.$http.post('/exercise/list', params)
          .then(response => {
            __this.items = response.data.data;
            console.log(response.data.data);
            __this.listSize = response.data.count;

            //리스트 사이즈가 없을경우
            if (__this.listSize == 0) {
              this.addSet();
            }

          })
          .catch(error => {
            console.log(error)
          })
    },

    //저장하기
    async insertExercise() {
      const __this = this;

      const successCallback = function () {
        console.log(__this.items);
        __this.$http.post('/exercise/save', __this.items).then(response => {
          console.log(response.data)
          //location.href = "/exercise";
          __this.$router.push('/exercise');
        }).catch(error => {
          console.log(error.response.data[0].defaultMessage)
          __this.$alert("필수값을 입력해주세요.", error.response.data[0].defaultMessage, "Y");
        })
      }

      await this.$confirmPop("정말로 저장하시겠습니까?", successCallback);
    },

    //세트추가
    addSet() {
      const __this = this;
      const tempObj = {
        userId: this.$store.getters.getUser.id,
        exerciseName: "",
        setCount: 0,
        kilogram: 0,
        reps: 0,
        exerciseDate: moment(this.exerciseDate).format("YYYY-MM-DD"),
        delYn: 'N',
        completeYn: 'N'
      };

      __this.items.push(tempObj);
    },

    //세트삭제
    deleteSet() {
      const __this = this;
      if (__this.items.length == 1) {
        __this.$alert("", "운동은 한개이상 등록되어야 합니다.", "Y");
      } else {
        __this.items.splice(-1, 1);
      }
    }

  }
};
</script>
