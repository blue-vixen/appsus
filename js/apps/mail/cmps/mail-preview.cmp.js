import { eventBus } from '../../../services/event-bus-service.js'
import mailExpand from "../cmps/mail-expand.cmp.js";
import { mailService } from '../services/mail.service.js';

export default {
    name: 'mail-preview',
    props: ['email', 'selectedEmail'],
    template: `

        <ul class="mail-preview clean-list" :class="markRead" @click="updateRead(email)">
            <li class="star" :class="renderStarred" @click.stop="markStarred(email)"></li>
            <li class="bold">{{email.to || email.from}}</li>
            <li><span class="bold">{{email.subject}}</span><span> - {{email.body}}</span></li>
            <li>{{renderDate}}</li>
            <!-- <div class="actions">
                <button title="delete" class="btn-delete" @click="remove(email.id)"></button>
                <button title="expand" class="btn-expand" @click="redirectToMail(email.id)"></button>
                <button title="save to note" class="btn-note"></button>
            </div>     -->
        </ul>

    `,
    data() {
        return {

        }
    },
    created() {

    },
    destroyed() {

    },
    methods: {
        remove(emailId) {
            eventBus.$emit('remove', emailId);
        },
        redirectToMail(emailId) {
            this.$router.push({ path: '/mail/' + emailId })
        },
        updateRead(email) {
            mailService.markRead(email)
        },
        markStarred(email) {
            console.log('starred')
            mailService.markStarred(email)
            eventBus.$emit('updated')
        }
    },
    computed: {
        markRead() {
            const { isRead } = this.email
            if (isRead) return 'read'
            else {
                this.unreadCount++
                return 'unread'
            }
        },
        renderStarred() {
            const { isStarred } = this.email
            if (isStarred) return 'starred'
        },
        renderDate() {
            let mailDate = new Date(this.email.sentAt)
            let currDate = new Date();
            if (currDate.getDate() === mailDate.getDate()
                && currDate.getMonth() === mailDate.getMonth()
                && currDate.getFullYear() === mailDate.getFullYear()) {
                return mailDate.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                })
                // mailDate.getHours() + ':' + mailDate.getMinutes()
            } else {
                return ((mailDate.toString().slice(4, 7)) + ' ' + mailDate.getDate())
            }



        }

    }, components: {
        mailExpand
    }
}
