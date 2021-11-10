import noteTxt from '../cmps/note-types-cmps/note-txt.cmp.js';
import noteImg from '../cmps/note-types-cmps/note-img.cmp.js';
import noteTodos from '../cmps/note-types-cmps/note-todos.cmp.js';



export default {
    props: ['note'],
    template: `
        <div class="note-details">
            <component
                :note="note" 
                :is="note.type"> 
            </component>
        </div>
    `,
data() {
    return {

    };
},

components: {
    noteTxt,
    noteImg,
    noteTodos
},
}