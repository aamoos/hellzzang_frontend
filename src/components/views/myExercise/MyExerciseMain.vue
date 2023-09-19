<template>
  <main>
      <div>
        <canvas ref="barChart" :height="height"/>
      </div>

    <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
      <div class="col-md-5 p-lg-5 mx-auto my-5">
        <router-link to="/exercise">
          <button type="button" class="btn btn-outline-primary btn-sm">오늘의 운동 계획하기</button>
        </router-link>
      </div>
    </div>
    <div>
      <swiper
          :spaceBetween="30"
          :centeredSlides="true"
          :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
                }"
          :pagination="{
                clickable: true,
                }"
          :navigation="true"
          :modules="modules"
          class="mySwiper"
      >
        <swiper-slide style="height: 100px" v-for="img in swiperImg" :key="img.id"><img :src="img.thumbNail"/></swiper-slide>
        <!-- <swiper-slide><img src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide>
        <swiper-slide><img src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide> -->

      </swiper>
    </div>
  </main>
</template>

<script>
// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import {Autoplay, Pagination, Navigation} from 'swiper';

//chartjs
import {Chart, registerables} from 'chart.js'

Chart.register(...registerables)

let chart;
export default {
  name: 'BarChart',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    height: {
      type: String,
      required: true
    },
    sun: {
      type: String,
      required: true
    },
    mon: {
      type: String,
      required: true
    },
    tue: {
      type: String,
      required: true
    },
    wed: {
      type: String,
      required: true
    },
    thu: {
      type: String,
      required: true
    },
    fri: {
      type: String,
      required: true
    },
    sat: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      timer: null,
      nowWeek: '',
      nowDate: '',
      nowTime: '',
      swiperImg: [],
      chartData: {
        labels: ['일', '월', '화', '수', '목', '금', '토'],
        datasets: [{
          label: '이번주 운동완료 건수',
          data: [],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '주간 운동 완료 그래프'
          }
        },
        scales: {
          y: {
            ticks: {
              precision: 0 // 소수점 자리수
            }
          }
        }
      }
    }
  },

  watch: {
    sun() {
      this.createChart()
    },
    mon() {
      this.createChart()
    },
    tue() {
      this.createChart()
    },
    wed() {
      this.createChart()
    },
    thu() {
      this.createChart()
    },
    fri() {
      this.createChart()
    },
    sat() {
      this.createChart()
    },
    deep: true
  },

  setup() {

    return {
      modules: [Autoplay, Pagination, Navigation],
    };
  },

  mounted() {
    this.$nextTick(function () {
      this.createChart()
    })

    //스와이퍼 이미지 가져오기
    this.getSwiperImage();

  }

  , methods: {
    //차트생성
    createChart() {
      if (chart !== undefined) {
        chart.destroy()
      }
      chart = new Chart(this.$refs.barChart, {
        type: 'bar',
        data: this.chartData,
        options: this.options
      })

      this.$http.post('/exercise/statistics', {})
          .then(response => {
            console.log(response.data);
            //데이터 정렬
            const values = Object.keys(response.data).sort().map(key => response.data[key]);

            //일자별로 차트 데이터 set
            const dataCount = Object.keys(response.data).length;
            for (let i = 0; i < dataCount; i++) {
              chart.data.datasets[0].data[i] = values[i];
            }
            chart.update()

          })
          .catch(error => {
            console.log(error)
          })
    },

    getSwiperImage() {
      const params = {
        bannerPath: window.location.pathname
      }

      this.$http.post('/banner/list', params)
          .then(response => {
            const obj = response.data;
            console.log(process.env);
            for (let i = 0; i < obj.length; i++) {
              // obj[i].thumbNail = "http://192.168.0.39:8280/thumbnail/"+obj[i].id
              obj[i].thumbNail = process.env.VUE_APP_URL + "/thumbnail/" + obj[i].id
            }

            this.swiperImg = obj;
            console.log(this.swiperImg);
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>