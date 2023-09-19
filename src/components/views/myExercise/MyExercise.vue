<template>
  <div class="commonTab tab1">
    <VDatePicker v-model="date" :attributes="attributes" is-expanded/>
    <br>
    <div class="text-center bg-light">
      <div>
        <button v-if="listSize>0" @click="copy" type="button" class="btn btn-outline-primary btn-sm">복사</button>
        <button v-if="listSize>0" @click="move" type="button" class="btn btn-outline-primary btn-sm">이동</button>
        <button v-if="listSize>0" @click="updateDelYn" type="button" class="btn btn-outline-danger btn-sm">삭제</button>
      </div>
    </div>
    <br>
    <div class="text-center bg-light">
      <div class="col-md-5 p-lg-5 mx-auto my-5">
        <p class="bold"></p>
        <h1 class="display-4 fw-normal">{{ selectedDate }}</h1>
        <button @click="search" type="button" class="btn btn-outline-primary btn-sm">운동 계획하기</button>
      </div>
    </div>
    <!-- 운동계획이 있는경우만 table 표출 -->
    <div v-if="items.length > 0">
      <table class="table caption-top">
        <caption>운동계획</caption>
        <thead class="table-dark">
        <tr>
          <th scope="col">운동명</th>
          <th scope="col">세트</th>
          <th scope="col">kg</th>
          <th scope="col">회</th>
          <th scope="col">완료여부</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="exercise in items" :key="exercise.id">
          <td>{{ exercise.exerciseName }}</td>
          <td>{{ exercise.setCount }}</td>
          <td>{{ exercise.kilogram }}</td>
          <td>{{ exercise.reps }}</td>
          <td>
            <!-- Active Button -->
            <button v-if="exercise.completeYn === 'Y'" @click="updateCompleteYn(exercise.id, exercise.completeYn)"
                    type="button" class="btn btn-primary btn-sm active">완료
            </button>

            <!-- Inactive Button -->
            <button v-else @click="updateCompleteYn(exercise.id, exercise.completeYn)" type="button"
                    class="btn btn-secondary btn-sm">미완료
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import {ref} from 'vue';
import axios from 'axios';

const token = localStorage.getItem('token');

let data = [];
let attributes = ref(null);

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const fetchData = async () => {
  try {
    // Make an API request with the authenticated token
    const response = await axios.post('/exercise/getCalendarData');
    console.log(response.data);

    //default
    let option = {
      // Boolean
      dot: 'red',
      dates: []
    }

    for (let i = 0; i < response.data.length; i++) {
      let obj = response.data;
      let dateArr = obj[i].exerciseDate.split("-");
      let year = Number(dateArr[0]);
      let month = Number(dateArr[1]);
      let day = Number(dateArr[2]);

      option.dates.push(new Date(year, month - 1, day));
    }

    data.push(option);
    attributes = ref(data);
  } catch (error) {
    console.error(error);
  }
};

fetchData();

</script>
<script>
import 'v-calendar/dist/style.css';
import moment from 'moment';

export default {

  data() {
    return {
      items: [],
      attrs: [
        {
          key: 'today',
          highlight: true,
          dates: new Date()
        },
      ],
      date: new Date(),
      listSize: 0
    };
  },

  methods: {

    //운동 계획하기 클릭시 선택한 달력의 plan으로 이동 
    search() {
      // location.href="/exercise/plan/"+this.exerciseDate;
      this.$router.push('/exercise/plan/' + this.exerciseDate);
    },

    //리스트 조회하기
    selectExercise() {
      const isLoggedIn = this.$store.getters.isLoggedIn;
      const user = this.$store.getters.getUser;
      console.log("=============")
      console.log(isLoggedIn);
      console.log(user)
      console.log("=============")

      const params = {
        exerciseDate: moment(this.exerciseDate).format("YYYY-MM-DD")
      }

      this.$http.post('/exercise/list', params)
          .then(response => {
            this.items = response.data.data;
            console.log(response.data.count);
            this.listSize = response.data.count;
          })
          .catch(error => {
            console.log(error)
          })
    },

    //등록한 캘린더 데이터 가져오기
    selectCalendarData() {
      this.$http.post('/exercise/getCalendarData')
          .then(response => {
            console.log(response.data);

            let data = [];

            for (let i = 0; i < response.data.length; i++) {
              let obj = response.data;
              let dateArr = obj[i].exerciseDate.split("-");
              let year = Number(dateArr[0]);
              let month = Number(dateArr[1]);
              let day = Number(dateArr[2]);

              let calOption = {
                key: 'today',
                highlight: {
                  color: 'purple',
                  fillMode: 'solid',
                  contentClass: 'italic',
                },
                dates: new Date(year, month, day),
              }
              data.push(calOption);
            }
            this.attributes = ref(data);
            console.log(data);

          })
          .catch(error => {
            console.log(error)
          })

    },

    //운동 삭제처리 하기
    async updateDelYn() {
      const __this = this;

      const successCallback = function () {
        const params = {
          exerciseDate: moment(__this.exerciseDate).format("YYYY-MM-DD")
          , delYn: 'Y'
        }

        console.log(params);

        //완료여부 업데이트
        __this.$http.post('/exercise/updateDelYn', params)
            .then(response => {
              console.log(response.data.data);
              __this.selectExercise()
            })
            .catch(error => {
              console.log(error)
            })
      }

      await this.$confirmPop("정말로 삭제하시겠습니까?", successCallback);
    },

    //복사하기
    copy() {
      //location.href="/exercise/copy/"+this.exerciseDate;
      this.$router.push('/exercise/copy/' + this.exerciseDate);
    },

    //이동하기
    move() {
      // location.href="/exercise/move/"+this.exerciseDate;
      this.$router.push('/exercise/move/' + this.exerciseDate);
    },

    //체크 아이콘 클릭 (완료여부 업데이트)
    updateCompleteYn(id, completeYn) {
      console.log(id);
      console.log(completeYn);

      //완료 여부값이 N이면 Y로변경, 아닌경우 N
      if (completeYn == "N") {
        completeYn = "Y";
      } else {
        completeYn = "N";
      }

      const params = {
        id: id
        , completeYn: completeYn
      }

      console.log(params);

      //완료여부 업데이트
      this.$http.post('/exercise/updateCompleteYn', params)
          .then(response => {
            console.log(response.data.data);
            this.selectExercise()
          })
          .catch(error => {
            console.log(error)
          })
    }
  },

  mounted() {
    this.selectExercise();
    // this.selectCalendarData();
  },

  //계산된
  computed: {
    //선택한 날짜 가공
    selectedDate() {
      this.selectExercise();
      // 연도, 월, 일 추출
      let month = this.date.getMonth() + 1;
      let day = this.date.getDate();

      // 월, 일의 경우 한자리 수 값이 있기 때문에 공백에 0 처리
      if (month < 10) {
        month = '0' + month;
      }

      if (day < 10) {
        day = '0' + day;
      }

      // 최종 포맷 (ex - '2021-10-08')
      return month + '월' + day + '일';
    },

    //YYYY-MM-DD (운동날짜)
    exerciseDate() {
      let month = this.date.getMonth() + 1;
      let day = this.date.getDate();

      // 월, 일의 경우 한자리 수 값이 있기 때문에 공백에 0 처리
      if (month < 10) {
        month = '0' + month;
      }

      if (day < 10) {
        day = '0' + day;
      }

      return this.date.getFullYear() + month + day;
    }
  }
}
</script>
