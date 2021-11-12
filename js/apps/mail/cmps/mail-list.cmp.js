import { mailService } from '../services/mail.service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import mailPreview from './mail-preview.cmp.js';
import mailExpand from "../cmps/mail-expand.cmp.js";
import mailDetails from '../pages/mail-details.cmp.js';

export default {
    name: 'mail-list',
    props: ['emails'],
    template: `
        <ul class="mail-list clean-list">
            <li v-for="email in emails" :key="email.id">
                <mail-preview :email="email" @click.native="select(email)"/>
                <mail-expand :email="selectedEmail" v-if="selectedEmail && selectedEmail === email"/>
            </li>
        </ul>
    `,
    data() {
        return {
            selectedEmail: null
        }

    },
    created() {

    },
    methods: {

        select(email) {
            if (this.selectedEmail === email) this.selectedEmail = null
            else this.selectedEmail = email

        },

    },
    watch: {
        selectedEmail: {
            handler() {
                eventBus.$emit('updateCount', this.unreadCount);
            }
        }
    },
    components: {
        mailPreview,
        mailExpand,
        mailDetails
    }
}