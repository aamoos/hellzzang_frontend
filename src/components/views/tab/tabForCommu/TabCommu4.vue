<template>
    <div>커뮤4</div>

    <!-- <div v-text="msg"></div> -->
        <!-- <div>{{books}}</div> -->
        
        

        <div class="home">
    <!-- <p>{{ person1.name }} {{ person1.age }}</p>
    <p>{{ person2.name }} {{ person2.age }}</p> -->
    <!-- <p>{{ person2.name }} {{ person2.age }}</p> -->
    <button @click="handleClick">click</button>



    <div class="homed">
        <input type="text" v-model="search" />
        <p>검색값 : {{ search }}</p>
        <div v-for="name in matchingNames" :key="name">
        {{ name }}
        </div>
        <button @click="handleClick">watchEffect 중지하기</button>
    </div>
  </div>
    
</template>


<script>
import { computed, ref, watch, watchEffect } from "vue";

export default {
  name: "HOME",
  setup() {
    // 데이터를 ref, reactive로 감싸면 반응형으로 바뀝니다.
    // const person1 = ref({ name: "첫번째1", age: 29 });
    // const person2 = reactive({ name: "두번째2", age: 26 });

    // const handleClick = () => {
    //   // ref로 감싼 값을 변경할 때는 value로 한번 들어가주고 값을 바꿉니다.
    //   person1.value.age = 530;

    //   // reactive는 바로 값을 바꿉니다.
    //   person2.name = '두번째2가 눌림';
    //   person2.age = 30;
    // };

    // ref값은 return을 거치게되면 person1.value.age는 person1.age로 바뀝니다. (template에서는 person1.age로 사용합니다)
    // return { person1, person2, handleClick };

    const search = ref("");
    const names = ref(["qq", "aa", "zz", "dd"]);

    const matchingNames = computed(() => {
      return names.value.filter(name => name.includes(search.value));
    });

    // watch(search, () => {
    //   "search 값이 바뀔 때 마다 실행되는 함수";
    // });
    
    // watchEffect(() => {
    //   console.log(
    //     "search value가 정의됬기에 search가 바뀔때마다 실행된다",
    //     search.value
    //   );
    // });

    // return { names, search, matchingNames };
    ///////////////////////////////////////////////////////////////////////////////

    
    const stopWatch = watch(search, () => {
        console.log(
            "search 값이 바뀔 때 마다 실행되는 함수 아래 방식과 같음"
        );
    });

    const stopWatchEffect = watchEffect(() => {
      console.log(
        "search value가 정의됬기에 search가 바뀔때마다 실행된다",
        search.value
      );
    });

    const handleClick = () => {
      stopWatch();
      stopWatchEffect();
    };

    return { names, search, handleClick, matchingNames };
  }
};
</script>