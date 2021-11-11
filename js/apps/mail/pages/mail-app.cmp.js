import { mailService } from "../services/mail.service.js";
import { eventBus } from '../../../services/event-bus-service.js'
import mailList from "../cmps/mail-list.cmp.js";
import mailFolderList from "../cmps/mail-folder-list.cmp.js";
import mailFilter from "../cmps/mail-filter.cmp.js";
import mailExpand from "../cmps/mail-expand.cmp.js";

export default {

    template: `
       <section class="mail-app app-main">
            <div class="side-bar">
                <h3>Welcome</h3>
                <button @click="composeNew">Compose</button>
                <mail-folder-list @filtered="setDisplay"/>
            </div>
            <div class="flex main-mail-display">
                <mail-filter @filtered="setFilter"/>
                <mail-list :emails="emails" @selected="selectEmail"/>
                
            </div>
        </section>
    
    `,
    data() {
        return {
            emails: null,
            criteria: {
                txt: '',
                display: 'inbox',
                isRead: null,
                isStarred: null
            },
            selectedEmail: null,
            unreadCount: 0
        }
    },
    created() {
        eventBus.$on('remove', this.removeEmail)
    },
    methods: {
        composeNew() {
            this.$router.push({ path: '/mail/compose' })
        },
        selectEmail(email) {
            this.selectedEmail = email
            console.log(this.selectedEmail)
        },
        removeEmail(emailId) {
            mailService.remove(emailId)
                .then(() => {
                    this.emails = this.emails.filter(email => email.id !== emailId)
                })
        },
        setDisplay(folder) {
            this.criteria.display = folder;
        },
        setFilter(filterBy) {
            const { msgStatus, txt } = filterBy
            if (msgStatus === 'Read') this.criteria.isRead = true
            else if (msgStatus === 'Unread') this.criteria.isRead = false
            else this.criteria.isRead = null
            this.criteria.txt = txt
        },
        update() {
            mailService.query(this.criteria)
                .then(emails => {
                    console.log(emails)
                    this.emails = emails
                })
        }

    },
    computed: {

    },
    components: {
        mailList,
        mailFolderList,
        mailFilter
    },
    watch: {
        criteria: {
            handler(newVal, oldVal) {

                console.log('criteria has changed!')
                mailService.query(this.criteria)
                    .then(emails => {
                        this.emails = emails
                        // emails.forEach(email => {
                        //     if (email.isRead !== true && email.status === 'inbox') this.unreadCount++
                        // })
                    })
            },
            deep: true,
            immediate: true
        },
        unreadCount: {
            handler() {
                eventBus.$emit('updateCount', this.unreadCount)
            }
        }
    },
    components: {
        mailList,
        mailFolderList,
        mailFilter,
        mailExpand
    }

}