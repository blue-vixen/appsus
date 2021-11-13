
export default {
    props: ['note'],
    template: `
        <div class="note-todos  note-title">
            <h3> {{note.info.title}} </h3>
            <hr>
            <ul>
            <li v-for="(todo, idx) in note.info.todos" :key="idx">
            <div class="todo-row">
                        <div  :class="isCheck(idx)" ></div>
                        <div :style="{'text-decoration': isMark(idx)}">{{todo.txt}}</div>
                    </div>            </li>
        </ul>

        </div>
    `,
    methods: {
        isMark(idx) {
            if (this.note.info.todos[idx].doneAt) {
                return "line-through"
            }
            else {
                return "none"
            }
        },

        isCheck(idx) {
            if (this.note.info.todos[idx].doneAt) {
                return "check-todo"
            }
            else {
                return "unchek-todo"

            }
        },
    }
}