import { eventBus } from '../../../../../services/event-bus-service.js'
import noteEditorEditBar from '../../../cmps/note-editor-edit-bar.cmp.js';

export default {
    props: ['note'],
    template: `
        <section class="note-editor modal-editor" :style="{'background-color': getColor}">
            <div class="editor-header">
            <button class="close-editor-btn" @click="closeEditor"></button>
                <input class="title-input" type="text" :placeholder="titlePlaceholder" v-model="editedNote.info.title" @keyup.enter="closeEditor">
                <button class="edit-pin edit-btns" @click="pinNote()" :style="{ color: pinnedNoteStyle}"></button>
            </div>
            <hr>
            <div class="editor-main">
            <ul>
                <li class="todo" v-for="(todo, idx) in editedNote.info.todos" :key="idx">
                    <div class="todo-row" @click="markTodo(idx)">
                        <div  :class="isCheck(idx)" ></div>
                        <div :style="{'text-decoration': isMark(idx)}">{{todo.txt}}</div>
                    </div>
                    <button class="remove-todo-btn" @click="removeTodo(idx)"></button>
                </li>
                <input class="todo-input" type="text" placeholder="New Todo here..." v-model="newTodo" @keyup.enter="addTodo">
                <button class="add-todo-btn" @click="addTodo"></button>

            </ul>


            </div>
            <div class="editor-footer">
                <note-editor-edit-bar :note="note"/>
            </div>
        </section>
    `,
    data() {
        return {
            editedNote: null,
            titlePlaceholder: "Enter your KEEP title here...",
            newTodo: null
        };
    },
    created() {
        this.editedNote = this.note;
        eventBus.$on('changeBgColor', this.setBgColor)
        eventBus.$on('sendNote', this.sendNote)
    },
    computed: {
        getColor() {
            return this.editedNote.style.backgroundColor
        },
        pinnedNoteStyle() {
            if (this.editedNote.isPinned)
                return '#ffa500'
        },
        
    },
    methods: {
        closeEditor() {
            eventBus.$emit('toggleModal', this.editedNote)
        },
        pinNote() {
            this.editedNote.isPinned = !this.editedNote.isPinned
            eventBus.$emit('updateNote', this.editedNote)
        },
        setBgColor(color) {
            this.editedNote.style.backgroundColor = color
        },
        sendNote() {
            eventBus.$emit('updateNote', this.editedNote)
            this.$router.push({ path: `/mail/compose?subject=${this.editedNote.info.title}` })
        },

        markTodo(idx) {
            if (this.editedNote.info.todos[idx].doneAt) {
                this.editedNote.info.todos[idx].doneAt = null
            }
            else {
                this.editedNote.info.todos[idx].doneAt = Date.now()
            }
        },
        isMark(idx) {
            if (this.editedNote.info.todos[idx].doneAt) {
                return "line-through"
            }
            else {
                return "none"

            }
        },

        isCheck(idx) {
            if (this.editedNote.info.todos[idx].doneAt) {
                return "check-todo"
            }
            else {
                return "unchek-todo"

            }
        },

        removeTodo(idx) {
            console.log(idx);
            this.editedNote.info.todos.splice(idx, 1)
            console.log(this.editedNote);
        },

        addTodo(){
            const newTodo = {
                txt: this.newTodo,
                doneAt: null,
            }
            this.editedNote.info.todos.push(newTodo)
            this.newTodo=null
        }

    },

    components: {
        noteEditorEditBar,
        eventBus
    },
}