import noteTxt from '../cmps/note-types-cmps/edit.cmps/note-txt-edit.cmp.js';
import noteImg from '../cmps/note-types-cmps/edit.cmps/note-img-edit.cmp.js';
import noteTodos from '../cmps/note-types-cmps/edit.cmps/note-todos-edit.cmp.js';
import noteYoutube from '../cmps/note-types-cmps/edit.cmps/note-youtube-edit.cmp.js';


export default {
    props: ['note'],
    template: `
        <div class="note-editor">
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
    noteTodos,
    noteYoutube
},
}