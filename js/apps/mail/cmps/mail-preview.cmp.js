import { eventBus } from '../../../services/event-bus-service.js'

export default {
    name: 'mail-preview',
    props: ['email'],
    template: `
        <ul class="mail-preview clean-list" :class="markRead">
            <li class="star"></li>
            <li class="bold">{{email.to || email.from}}</li>
            <li><span class="bold">{{email.subject}} -</span> {{email.body}}</li>
            <li>{{renderDate}}</li>
            <div class="actions">
                <button title="delete" class="btn-delete" @click="remove(email.id)"></button>
                <button title="expand" class="btn-expand"></button>
                <button title="save to note" class="btn-note"></button>
            </div>         
        </ul>
    `,
    data() {
        return {

        }
    },
    methods: {
        remove(emailId) {
            eventBus.$emit('remove', emailId);
        }
    },
    computed: {
        markRead() {
            const { isRead } = this.email
            if (isRead) return 'read'
            else return 'unread'
        },
        renderDate() {
            let mailDate = new Date(this.email.sentAt)
            let currDate = new Date();
            if (currDate.getDate() === mailDate.getDate()
                && currDate.getMonth() === mailDate.getMonth()
                && currDate.getFullYear() === mailDate.getFullYear()) {
                return mailDate.getHours() + ':' + mailDate.getMinutes()
            } else {
                return (mailDate.getDate() + '/' + (mailDate.getMonth() + 1) + '/' + mailDate.getFullYear())
            }



        }
    }
}