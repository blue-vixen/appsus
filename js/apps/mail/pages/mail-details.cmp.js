import { mailService } from "../services/mail.service.js";

export default {
    template: `
    <div class="mail-details flex app-main" v-if="email">
    
        <h3 v-if="email.from">From: {{email.from}}</h3>
        <h3 v-if="email.to">To: {{email.to}}</h3>
        <h4>At: {{renderDate}}</h4>
         
        <div class="actions">
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
        }
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