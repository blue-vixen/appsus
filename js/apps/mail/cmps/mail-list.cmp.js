import mailPreview from './mail-preview.cmp.js';

export default {
    name: 'mail-list',
    props: ['emails'],
    template: `
        <ul class="mail-list">
            <li v-for="email in emails" :key="email.id">
                <mail-preview :email="email"/>
            </li>
        </ul>
    `,
    created() {
        console.log('Mail list created', this.emails)
    },
    components: {
        mailPreview
    }
}