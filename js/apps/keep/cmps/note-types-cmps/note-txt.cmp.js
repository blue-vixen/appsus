
export default {
    props: ['note'],
    template: `
        <div class="note-txt">
            {{note.type}}
        </div>
    `,
}