
export default {
    props: ['note'],
    template: `
        <div class="note-txt  note-title">
            <h3> {{note.info.title}} </h3>
            <hr>
            <p> {{note.info.txt}} </p>
        </div>
    `,
}