<template>
  <VDatePicker v-model="date" is-expanded/>
  <br>
  <div class="text-center bg-light">
    <div class="col-md-5 p-lg-5 mx-auto my-5">
      <button @click="moveExercise" type="button" class="btn btn-outline-primary btn-sm">이동</button>
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
    async moveExercise() {
      const __this = this;

      const successCallback = function () {
        const params = {
          moveDate: moment(__this.date).format("YYYY-MM-DD")
          , targetDate: moment(__this.$route.params.exerciseDate).format("YYYY-MM-DD")
        }
        console.log(params);

        //완료여부 업데이트
        __this.$http.post('/exercise/move', params)
            .then(response => {
              console.log(response.data.data);
              //location.href = "/exercise";
              __this.$router.push('/exercise');
            })
            .catch(error => {
              console.log(error)
            })
      }

      await this.$confirmPop("정말로 이동하시겠습니까?", successCallback);
    }
  }
}
</script>
