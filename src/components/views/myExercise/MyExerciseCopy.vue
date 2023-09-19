<template>
  <VDatePicker v-model="range" is-range is-expanded/>
  <div class="text-center bg-light">
    <div class="col-md-5 p-lg-5 mx-auto my-5">
      <button @click="copyExercise" type="button" class="btn btn-outline-primary btn-sm">복사</button>
    </div>
  </div>
</template>

<script>
import 'v-calendar/dist/style.css';
import moment from 'moment';

export default {

  data() {
    return {
      range: {},
    }
  },

  methods: {
    async copyExercise() {
      const __this = this;

      const successCallback = function () {
        const params = {
          startDate: moment(__this.range.start).format("YYYY-MM-DD")
          , endDate: moment(__this.range.end).format("YYYY-MM-DD")
          , targetDate: moment(__this.$route.params.exerciseDate).format("YYYY-MM-DD")
        }

        console.log(params);

        //완료여부 업데이트
        __this.$http.post('/exercise/copy', params)
            .then(response => {
              console.log(response.data.data);
              //location.href = "/exercise";
              __this.$router.push('/exercise');

            })
            .catch(error => {
              console.log(error)
            })
      }

      await this.$confirmPop("정말로 복제하시겠습니까?", successCallback);
    }
  }
}
</script>
