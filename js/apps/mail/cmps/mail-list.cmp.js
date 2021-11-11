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
            <mail-preview :email="email" @updateCount="updateCount" @click.native="select(email)"/>
            <mail-expand :email="selectedEmail" v-if="selectedEmail === email"/>
            </li>
        </ul>
    `,
    data() {
        return {
            unreadCount: 0,
            selectedEmail: null
        }

    },
    created() {
        // console.log('Mail list created', this.emails)
    },
    methods: {
        updateCount() {
            this.unreadCount++
        },
        select(email) {
            if (this.selectedEmail === email) this.selectedEmail = null
            else this.selectedEmail = email
            // this.$emit('selected', email)
        }

    },
    watch: {
        unreadCount: {
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