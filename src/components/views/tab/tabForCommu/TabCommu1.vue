<template>
    <div class="commuWrap">

        <div v-for="item in postItem" :key="item.id" class="commuUserBoard">
            <div class="commuUserInfo">
                <img src="~@/assets/images/noImage.jpg" alt=""><div class="commuWriter">{{item.nickname}}</div>
                <div class="commuReplyCount">
                    <div class="commuEtcImage replyImage"/>
                    <div class="commuEtcCounts">{{item.comments}}</div>
                </div>
                <div class="commuLike">
                    <div class="commuEtcImage likeImage"/>
                    <div class="commuEtcCounts">{{item.likes}}</div>
                </div>
            </div>
            <div class="commuUserContent">
                <!-- <router-link to="/detailContent"><h1 class="commuTitle">{{item.title}}</h1></router-link> -->
                <router-link :to="{ path:'/detailContent', query: {postId: item.id} }"><h1 class="commuTitle">{{item.title}}</h1></router-link>
            </div>
            <div class="commuUserImageWrap">
                <router-link :to="{ path:'/detailContent', query: {postId: item.id} }"><div class="commuUserImage" /></router-link>
            </div>
        </div>


        <!-- 게시글 추가 버튼 -->
        <div class="writePostBtn" @click="writePostBtn()">+</div>

        <router-link to="/postWrite" :class="{'writePost' : writePostToggle, 'writePostNone': !writePostToggle }">게시글 작성</router-link>

        <!-- <div class="commuUserBoard">
            <div class="commuUserInfo">
                <img src="~@/assets/images/noImage.jpg" alt=""><div class="commuWriter">작성자</div>
                <div class="commuReplyCount">
                    <div class="commuEtcImage replyImage"/>
                    <div class="commuEtcCounts">5</div>
                </div>
                <div class="commuLike">
                    <div class="commuEtcImage likeImage"/>
                    <div class="commuEtcCounts">5</div>
                </div>
            </div>
            <div class="commuUserContenta">
                <router-link to="/detailContent"><h1 class="commuTitle">Title</h1></router-link>
                <router-link to="/detailContent"><div class="commuContent">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione praesentium harum voluptas autem. Aliquam quia tempore unde aut placeat, natus iusto quibusdam. Quisquam doloremque voluptatum facilis. Culpa corporis eos quod!</div></router-link>
            </div>
            <div class="commuUserImageWrap">
                <router-link to="/detailContent"><div class="commuUserImage" /></router-link>
            </div>
        </div> -->


        <!-- <div class="commuUserBoard">
            <div class="commuUserInfo">
                <img src="~@/assets/images/noImage.jpg" alt=""><div class="commuWriter">작성자</div>
                <div class="commuReplyCount">
                    <div class="commuEtcImage replyImage"/>
                    <div class="commuEtcCounts">5</div>
                </div>
                <div class="commuLike">
                    <div class="commuEtcImage likeImage"/>
                    <div class="commuEtcCounts">5</div>
                </div>
            </div>
            <div class="commuUserContentb">
                <router-link to="/detailContent"><h1 class="commuTitle">Title</h1></router-link>
            </div>
            <div class="commuUserImageWrap">
                <router-link to="/detailContent"><div class="commuUserImage" /></router-link>
            </div>
        </div> -->





        <!-- <div class="commuBoard">
            <div class="commuImageWrap">
                <router-link to="/detailContent"><div class="commuImage" /></router-link>
            </div>
            <div class="commuInfo">
                <router-link to="/detailContent"><h1 class="commuTitle">Title</h1></router-link>
                <div class="commuContent"><router-link to="/detailContent">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione praesentium harum voluptas autem. Aliquam quia tempore unde aut placeat, natus iusto quibusdam. Quisquam doloremque voluptatum facilis. Culpa corporis eos quod!</router-link></div>
                <div class="commuEtc">
                    <img src="~@/assets/images/noImage.jpg" alt=""><div class="commuWriter">작성자</div>
                    <div class="commuReplyCount">
                        <div class="commuEtcImage replyImage"/>
                        <div class="commuEtcCounts">5</div>
                    </div>
                    <div class="commuLike">
                        <div class="commuEtcImage likeImage"/>
                        <div class="commuEtcCounts">5</div>
                    </div>
                </div>
            </div>
        </div> -->


    </div>
</template>

<script>
export default {
    data(){
        return{ 
            postItem:[],
            boardId : '',
            writePostToggle:false,
        }
    },
    mounted(){
        if(this.$route.query.boardId != null){
            this.boardId = this.$route.query.boardId
            this.postList();
        } else{
            this.boardId = 1  //처음 커뮤니티 카테고리 클릭 시
            this.postList();
        }
    },
    methods:{
        //게시글 리스트
        postList(){
            const __this = this;
            __this.$http.get(`/board/post/lists/${__this.boardId}`)
            .then(response => {
                console.log("---------------커뮤니티 : 백에서 가져온 자유게시판 데이터 리스트-------------------")
                console.log(response)
                const transformedData = this.transformData(response.data);
                __this.postItem = transformedData;
            })
            .catch(error => {
                console.log(error)
            })
        },
        transformData(data) {
            console.log("------------------자유게시판 게시글 리스트 데이터 배열로 정렬----------------------")
            console.log(data)
            console.log("--------------------------------------------------------------------------------")
            return data.map(response => {
                
                return {
                    id: response.id,
                    title : response.title,
                    content : response.content,
                    likes : response.likes,
                    nickname : response.nickname,
                    comments : response.comments
                };
            });
        },

        writePostBtn(){
            const __this = this
            __this.writePostToggle = !__this.writePostToggle
        },
    }
}
</script>