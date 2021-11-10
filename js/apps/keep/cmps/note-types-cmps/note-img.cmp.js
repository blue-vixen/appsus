
export default {
    props: ['note'],
    template: `
        <div class="note-img note-title">
            <h3> {{note.info.title}} </h3>
            <hr>
            <img :src="note.info.url" alt="">
        </div>
    `,
}