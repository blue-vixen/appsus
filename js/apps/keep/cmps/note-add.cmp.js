import { eventBus } from '../../../services/event-bus-service.js'


export default {
    template: `
        <div class="note-add-bar">
            <input class="txt-input" type="text" :placeholder="placeholder" v-model="inputVal" @keyup.enter="createNewNote">
            <div class="note-type-btns">
                <button class="add-txt" @click="changeType('noteText')"></button>
                <button class="add-img" @click="changeType('noteImg')"></button>
                <button class="add-youtube" @click="changeType('noteYoutube')"></button>
                <button class="add-todos" @click="changeType('noteTodos')"></button>
                <div class="separator"></div>
                <button class="add-keep-btn" @click="createNewNote"></button>
            </div>
        </div>
    `,
    data() {
        return {
            inputVal: null,
            noteType: 'noteText',
            placeholder: "What's on your mind..."
        }
    },
    created() {
    },
    computed: {
    },

    methods: {
        mailToNote(email) {
            console.log(email)
        },
        createNewNote() {
            let noteType = this.noteType
            switch (noteType) {
                case 'noteText':
                    this.creatTxtNote()
                    break;
                case 'noteImg':
                    this.creatImgNote()
                    break;
                case 'noteYoutube':
                    this.creatYoutubeNote()
                    break;
                case 'noteTodos':
                    this.creatTodosNote()
                    break;
            }
            this.inputVal = null
        },

        changeType(type) {
            this.noteType = type
            switch (type) {
                case 'noteText':
                    this.placeholder = "What's on your mind..."
                    break;
                case 'noteImg':
                    this.placeholder = "Enter image URL..."
                    break;
                case 'noteYoutube':
                    this.placeholder = "Enter YouTube URL..."
                    break;
                case 'noteTodos':
                    this.placeholder = "Enter comma separated list..."
                    break;
            }
            console.log(this.noteType);
        },

        creatTxtNote() {
            const note = {
                id: null,
                type: "note-txt",
                isPinned: false,
                isArchive: false,
                info: {
                    title: this.inputVal,
                    txt: "Insert your text here..."
                },
                style: { backgroundColor: "#f5f5f5" }
            }
            eventBus.$emit('addNewNote', note)
        },

        creatImgNote() {
            const note = {
                id: null,
                type: "note-img",
                isPinned: false,
                isArchive: false,
                info: {
                    url: this.inputVal,
                    title: "Your Image..."
                },
                style: { backgroundColor: "#f5f5f5" }
            }
            eventBus.$emit('addNewNote', note)
        },

        creatYoutubeNote() {
            const note = {
                id: null,
                type: "note-youtube",
                isPinned: false,
                isArchive: false,
                info: {
                    url: this.inputVal,
                    title: "Your Video..."
                },
                style: { backgroundColor: "#f5f5f5" }
            }
            eventBus.$emit('addNewNote', note)
        },

        creatTodosNote() {
            const note = {
                id: null,
                type: "note-todos",
                isPinned: false,
                isArchive: false,
                info: {
                    title: this.inputVal,
                    todos: [
                        {
                            txt: "buy...",
                            doneAt: null
                        },
                        {
                            txt: "call...",
                            doneAt: null
                        }
                    ]
                },
                style: { backgroundColor: "#fff475" }
            }
            eventBus.$emit('addNewNote', note)
        },




    }
}