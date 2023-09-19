<template>
    <div class="commonTab">
        <div class="subMenu">
            <ul>
                <li v-for="item in board" :key="item.id">
                    <router-link :to="{ path:`/commu/commu${item.id}`, query: {boardId: item.id} }">{{item.name}}</router-link>
                </li>
            </ul>
        </div>
            <router-view />
    </div>
</template>

<script>
export default {
    data(){
        return{
            board:[],
            boardId:''
        }
    },
    mounted(){
        this.boardList();
    },
    methods:{

        //게시판 리스트
        boardList(){
            const __this = this;
            __this.$http.get('/board/board/list')
            .then(response => {
                console.log("--------------커뮤니티 : 백으로부터 가져온 '게시판' 리스트 데이터----------------")
                console.log(response)
                const transformedData = this.transformData(response.data);
                __this.board = transformedData;
            })
            .catch(error => {
                console.log(error)
            })
        },
        transformData(data) {
            console.log("----------------------게시판 리스트 데이터를 배열로 정렬------------------------")
            console.log(data)
            console.log("-----------------------------------------------------------------------------")
            return data.map(response => {
                
                return {
                    name: response.boardName,
                    id: response.id
                };
            });
        },
    }
}
</script>