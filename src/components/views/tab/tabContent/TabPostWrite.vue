<template>
    <div class="commonTab">
        <div class="postWriteWrap">
            <select v-model="selectedCategory">
                <option value="null">카테고리 선택</option>
                <option v-for="option in board" :value="option.id" :key="option.id">{{option.name}}</option>
            </select>
            <div class="completePost" @click="completePost()">작성하기</div>
        </div>
        <input class="postInputBox" type="text" placeholder="제목" v-model="postTitle">
        <quill-editor v-model:value="state.content"></quill-editor>
    </div>
</template>

<script>
import { reactive } from 'vue'

export default {
    name: 'App',
    data(){
        return{
            postTitle : '',
            board:[],
            boardId:'',
            selectedCategory: null //id값
        }
    },
    setup() {
        const state = reactive({
        content: '',
        _content: '',
        editorOption: {
            placeholder: '',
            modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ header: 1 }, { header: 2 }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }],
                [{ indent: '-1' }, { indent: '+1' }],
                [{ direction: 'rtl' }],
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ color: [] }, { background: [] }],
                [{ font: [] }],
                [{ align: [] }],
                ['clean'],
                ['link', 'image', 'video']
            ]
            }
            // more options
        },
        disabled: false
        })

        const onEditorBlur = (quill) => {
            console.log('editor blur!', quill)
        }
        const onEditorFocus = (quill) => {
            console.log('editor focus!', quill)
        }
        const onEditorReady = (quill) => {
            console.log('editor ready!', quill)
        }
        const onEditorChange = ({ quill, html, text }) => {
            console.log('editor change!', quill, html, text)
            state._content = html
        }

        setTimeout(() => {
            state.disabled = true
        }, 2000)
        
        return { state, onEditorBlur, onEditorFocus, onEditorReady, onEditorChange }
    },

    mounted(){
        this.boardList()
    },
    methods : {
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
        //게시글 작성
        completePost(){
            const __this = this

            const param = {
                "boardId" : __this.selectedCategory,             
                "userId" : __this.$store.getters.getUser.id,
                "title" : __this.postTitle,
                "content" : __this.state.content,
                "likes" : 0
            }

            console.log(param)

            __this.$http.post("/board/writePost", param)
            .then(response => {
                console.log(response)
                __this.$router.go(-1)
            })
            .catch(error => {
                console.log(error)
            })
        },
    }
}
</script>