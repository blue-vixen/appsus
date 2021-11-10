
export default {
    props: ['note'],
    template: `
        <div class="note-todos">
            {{note.type}}
        </div>
    `,
}