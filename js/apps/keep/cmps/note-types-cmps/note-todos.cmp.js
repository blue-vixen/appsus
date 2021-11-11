
export default {
    props: ['note'],
    template: `
        <div class="note-todos  note-title">
            <h3> {{note.info.title}} </h3>
            <hr>
            <ul>
            <li v-for="(todo, idx) in note.info.todos" :key="idx">
                {{todo.txt}}
            </li>
        </ul>

        </div>
    `,
}