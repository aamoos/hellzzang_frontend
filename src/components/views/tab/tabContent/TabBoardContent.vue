<template>
    <div class="commonTab">
        <div class="contentWrap">
            <div class="contentTitle"><h1>{{postTitle}}</h1></div>
            <div class="contentInfoBox">
                <div class="userContentBox">
                    <div class="contentUserImage" />
                    <div class="contentWriter">{{nickname}}</div>
                    <div class="contentDate">{{postDate}}</div>
                    <div v-if="userId === $store.getters.getUser.id" class="contentOption" @click="postOptionToggle()"/>
                </div>
                <div :class="{'contentOptionBox':postOptionToggled, 'contentOptionBoxNone':!postOptionToggled}">
                    <button @click="postUpdateBtn(postId)">수정</button>
                    <button @click="postDeleteBtn(postId)">삭제</button>
                </div>
            </div>
            <div class="contentDetail" v-html="postContent"></div>
            <div class="replyWriteBox">
                <input type="text" v-model="reply" class="replyWrite" placeholder="댓글 입력">
                <div class="writeBtn" @click="replyWrite(reply,)">입력</div>
            </div>

            <div v-if="commentListData != ''" class="contentReplyBox">
                <div>모든 댓글</div>
                <div :class="{'contentReplyShow':!replyBoxToggled, 'contentReplyHide':replyBoxToggled}" @click="replyToggle()" />
                <div :class="{'likeBtn':!heartToggled, 'likeCancel':heartToggled}" @click="heartToggle()"/>
                <div class="postLikes">{{postLikes}}</div>
            </div>
            <div v-else class="noReply">댓글이 존재하지 않습니다.</div>
            <div :class="{'show':!replyBoxToggled, 'hide':replyBoxToggled}">
                <div v-for="comment in commentListData" :key="comment">
                    <div class="contentInfoBox">
                        <div class="userContentBox">
                            <div class="contentUserImage" />
                            <div class="contentWriter">{{comment.nickname}}</div>
                            <div class="contentDate">{{comment.commentDate}}</div>
                            <div v-if="comment.userId === $store.getters.getUser.id" class="contentOption" @click="optionToggle(comment.commentId)"/>
                        </div>
                        <div :class="{'contentOptionBox': comment.commentId === userOptionToggled, 'contentOptionBoxNone': comment.commentId != userOptionToggled}">
                            <button @click="replyUpdateBtn(comment.commentId)">수정</button>
                            <button @click="replyDeleteBtn(comment.commentId)">삭제</button>
                        </div>
                        <div :class="{'writeRereplyBoxNone': comment.commentId === replyUpdateToggle, 'contentReply': comment.commentId != replyUpdateToggle}">{{comment.comment}}</div>
                        <div :class="{'reReplyWriteBox': comment.commentId === replyUpdateToggle, 'writeRereplyBoxNone': comment.commentId != replyUpdateToggle}">
                            <input type="text" v-model="updateReply" class="replyWrite" >
                            <div class="writeBtn" @click="replyUpdate(updateReply, comment.commentId)">입력</div>
                        </div>

                        <div :class="{'writeRereply': comment.commentId != selectedComment,'writeRereplyBoxNone': comment.commentId === selectedComment}" @click="selectComment(comment.id)">답글쓰기</div>
                        <div :class="{'writeRereplyBoxNone': comment.commentId != selectedComment,'reReplyWriteBox': comment.commentId === showRereplyWriteBox}">
                            <input type="text" v-model="reReply" class="replyWrite" placeholder="댓글 입력">
                            <div class="writeBtn" @click="replyWrite(reReply, comment.commentId)">입력</div>
                        </div>
                    </div>


                    <div :v-if="comment.childCommentIdx && comment.childCommentIdx.length > 0" >
                        <div v-for="(childCommentIdx, index) in comment.childCommentIdx" :key="index" class="contentInfoBox">
                            <div class="userContentBox">
                                <div class="contentRereply"></div>
                                <div class="contentUserImage" />
                                <div class="contentWriter">{{comment.childNickName[index]}}</div>
                                <div class="contentDate">{{comment.childCommentDate[index]}}</div>
                                <div v-if="comment.childUserId[index] === $store.getters.getUser.id" class="contentOption" @click="optionToggle(comment.childCommentIdx[index])"/>
                            </div>
                            <div :class="{'contentOptionBox': comment.childCommentIdx[index] === userOptionToggled, 'contentOptionBoxNone': comment.childCommentIdx[index] != userOptionToggled}">
                                <button @click="replyUpdateBtn(comment.childCommentIdx[index])">수정</button>
                                <button @click="replyDeleteBtn(comment.childCommentIdx[index])">삭제</button>
                            </div>
                            <div :class="{'writeRereplyBoxNone': comment.childCommentIdx[index] === replyUpdateToggle, 'contentReply': comment.childCommentIdx[index] != replyUpdateToggle}">{{comment.childComment[index]}}</div>
                            <div :class="{'reReplyWriteBox': comment.childCommentIdx[index] === replyUpdateToggle, 'writeRereplyBoxNone': comment.childCommentIdx[index] != replyUpdateToggle}">
                            <input type="text" v-model="updateReply" class="replyWrite" >
                            <div class="writeBtn" @click="replyUpdate(updateReply, comment.childCommentIdx[index])">입력</div>
                        </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    data(){
        return{
            postOptionToggled : false,
            userOptionToggled : null,
            replyBoxToggled : false,
            heartToggled : false,
            reReplyWriteBoxToggled : false,
            replyUpdateToggle : null,
            reReplyUpdateToggle : null,
            postId : '',
            postTitle : '',
            postContent : '',
            postDate : '',
            postLikes : '',
            nickname : '',
            userId : '',
            commentListData : [],
            reply: '',
            reReply : '',
            updateReply: '',
            updateRereply: '',
            parentId : '',
            selectedComment:null,
            showRereplyWriteBox:null
        }
    },
    mounted(){
        this.postId = this.$route.query.postId
        this.detailContent()
        this.commentList()
    },

    methods: {
        postOptionToggle(){
            const __this = this;
            __this.postOptionToggled = !__this.postOptionToggled;
        },
        replyToggle(){
            const __this = this;
            __this.replyBoxToggled = !__this.replyBoxToggled;
        },
        optionToggle(target){
            const __this = this;
            if(__this.userOptionToggled === null || (__this.userOptionToggled != null & __this.userOptionToggled !=target)){
                __this.userOptionToggled = target;
            }else if(__this.userOptionToggled === target){
                __this.userOptionToggled = null;
            }
        },
        heartToggle(){
            const __this = this;
            __this.heartToggled = !__this.heartToggled;
        },
        selectComment(target){
            const __this = this;
            __this.selectedComment = target; // 선택된 댓글 업데이트
            __this.showRereplyWriteBox = target; // 선택된 댓글 업데이트
        },

        //댓글 입력
        replyWrite(reply, parentId){
            const __this = this;

            const param = {
                "postId" : __this.postId,
                "userId" : __this.$store.getters.getUser.id,
                "parentId" : parentId,
                "comment" : reply
            }

            console.log(param)

            __this.$http.post("/board/writeReply", param)
            .then(response => {
                console.log(response)
                __this.$router.go(0)
            })
            .catch(error => {
                console.log(error)
            })
        },
        //댓글 수정버튼
        replyUpdateBtn(target){
            const __this = this;
            __this.userOptionToggled = null

            if(__this.replyUpdateToggle === null || (__this.replyUpdateToggle != null & __this.replyUpdateToggle !=target)){
                __this.replyUpdateToggle = target;
                
                __this.$http.post("/board/replyInfo", {"id" : target})
                .then(response => {
                    console.log(response)
                    __this.updateReply = response.data.content
                })
                .catch(error => {
                    console.log(error)
                })
            }else if(__this.replyUpdateToggle === target){
                __this.replyUpdateToggle = null;
            }
        },
        //댓글 수정
        replyUpdate(reply, target){
            const __this = this
            const param = {
                "id" : target,
                "comment" : reply
            }
            
            console.log(param)

            __this.$http.post("/board/updateReply", param)
            .then(response => {
                console.log(response)
                __this.$router.go(0)
            })
            .catch(error => {
                console.log(error)
            })
        },

        //게시글 상세 페이지 데이터
        detailContent(){
            const __this = this
            __this.$http.get(`/board/detailContent/${__this.postId}`)
            .then(response => {
                console.log("-----------------------------게시글 작성자 데이터-------------------------------")
                console.log(response)
                __this.postId = response.data.postId
                __this.postTitle = response.data.title
                __this.postContent = response.data.content
                __this.postDate = response.data.postDate
                __this.postLikes = response.data.likes
                __this.nickname = response.data.nickname
                __this.userId = response.data.userId

                __this.postDate = moment(response.data.postDate).format("YYYY-MM-DD")
                __this.postContent = __this.postContent.replace(/<p>/g, "").replace(/<\/p>/g, "<br>");

            })
            .catch(error => {
                console.log(error)
            })
        },

        //게시글에 해당하는 댓글 리스트
        commentList(){
            const __this = this
            __this.$http.get(`/board/commentList/${__this.postId}`)
            .then(response => {
                console.log("----------------게시글의 댓글리스트 : 페이지 로드 시 가져온 데이터------------------")
                console.log(response)
                const transformedData = this.transformData(response.data);
                __this.commentListData = transformedData;
            })
            .catch(error => {
                console.log(error)
            })
        },
        //백으로부터 가져온 데이터를 배열로 치환
        transformData(data) {
            console.log("---------------------게시글 댓글리스트 데이터를 배열로 정렬-----------------------")
            console.log(data)
            console.log("-------------------------------------------------------------------------------")
            return data.map(response => {
                
                return {
                    commentId: response.commentId,
                    userId: response.userId,
                    comment : response.commentContent,
                    commentDate : moment(response.commentDate).format("YYYY-MM-DD"),
                    nickname : response.nickname,
                    childCommentIdx : response.children.map(child => child.commentId),
                    childUserId : response.children.map(child => child.userId),
                    childComment : response.children.map(child => child.commentContent),
                    childCommentDate : response.children.map(child => moment(child.commentDate).format("YYYY-MM-DD"),),
                    childNickName : response.children.map(child => child.nickname),
                };
            });
        },

        postUpdateBtn(target){
            alert("update 개발예정 : "+target)
        },
        postDeleteBtn(target){
            alert("delete 개발예정 : "+target)
        },
        replyDeleteBtn(target){
            alert("delete 개발예정 : "+target)
        }
    }
}
</script>