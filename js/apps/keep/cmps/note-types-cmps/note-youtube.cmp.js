
export default {
    props: ['note'],
    template: `
        <div class="note-youtube  note-title">
            <h3> {{note.info.title}} </h3>
            <hr>
            <iframe width=100% :src="getVideoUrl" frameBorder="0" allowfullscreen > 
            </iframe>       
        </div>
    `,
    methods: {
        getId(url) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);

            return (match && match[2].length === 11)
                ? match[2]
                : null;
        },
    },

    computed: {

        getVideoUrl() {
            const videoId = this.getId(this.note.info.url);
            const fixedUrl = 'https://www.youtube.com/embed/' + videoId
            return fixedUrl;
        },


    },
}

