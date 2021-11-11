import { mailService } from "../services/mail.service.js";

export default {
    template: `
    <div class="mail-details flex app-main" v-if="email">
    
        <h3>From: {{email.from}}</h3>
        <h4>At: {{renderDate}}</h4>
         
        <div class="actions">
            <button title="delete" class="btn-delete" @click="remove(email.id)"></button>
            <button title="save to note" class="btn-note"></button>
        </div>
        <div class="expand-line flex space-between">
            <h4>Subject: {{email.subject}}</h4>
        </div>
        <p>{{email.body}}</p>    
    </div>
    <div v-else>Loading...</div>
    `,
    data() {
        return {
            email: null,
        }
    },
    computed: {
        renderDate() {
            var result = "";
            var d = new Date(this.email.sentAt)
            result += d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() +
                " " + d.getHours() + ":" + d.getMinutes()
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