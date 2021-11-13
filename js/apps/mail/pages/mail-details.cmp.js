import { eventBus } from '../../../services/event-bus-service.js';
import { mailService } from "../services/mail.service.js";
import { utilService } from '../../../services/utils-service.js';

export default {
    template: `
    <div class="mail-details flex app-main" v-if="email">
    
        <h3 v-if="email.from">From: {{email.from}}</h3>
        <h3 v-if="email.to">To: {{email.to}}</h3>
        <h4>At: {{renderDate}}</h4>
         
        <div class="actions">
            <button title="reply" class="btn-reply" @click="createReply(email.from, email.subject)"></button>
            <button title="delete" class="btn-delete" @click="remove(email.id)"></button>
            <button title="save to note" class="btn-note"></button>
        </div>
        <div class="expand-line flex space-between">
            <h4>Subject: {{email.subject}}</h4>
        </div>
        <p>{{email.body}}</p>
        <button title="Go back" class="btn-back" @click="redirectToList"></button>
        
    </div>
    <div v-else>Loading...</div>
    `,
    data() {
        return {
            email: null,
        }
    },
    methods: {
        redirectToList() {
            this.$router.push({ path: '/apps/mail' })
        },
        createReply(from, subject) {
            this.$router.push({ path: `/mail/compose?subject=RE: ${subject}&from=${from}` })
        },
        // saveToNote(email) {
        //     console.log(email)
        //     var txt = 'subject:' + email.subject
        //     txt += 'from:' + email.from
        //     txt += 'body:' + email.body
        //     var newNote = {
        //         id: utilService.makeId(),
        //         type: "note-txt",
        //         isPinned: false,
        //         info: {
        //             txt: txt
        //         },
        //         backgroundColor: '#F4976C'
        //     }
        //     eventBus.$emit('mailToNote', newNote);

        // this.$router.push({ path: `/apps/keep?title=${email.subject}&body=${email.body}` })
        // console.log('saving...')
        // eventBus.$emit('showMsg', { txt: 'kushilirabak!!!', type: 'error' })
        // eventBus.$emit('sendToNote', email)
        // }
    },
    computed: {
        renderDate() {
            var result = "";
            var d = new Date(this.email.sentAt)
            result += d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + ' ' +
                d.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                })
            return result;
        }
    },
    watch: {
        '$route.params.mailId': {
            handler() {
                const { mailId } = this.$route.params;
                mailService.getById(mailId)
                    .then(email => this.email = email)
            },
            immediate: true
        }
    }
}