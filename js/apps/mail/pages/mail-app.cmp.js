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
                <button @click="composeNew"><span>Compose</span></button>
                <mail-folder-list @filtered="setDisplay"/>
            </div>
            <div class="flex main-mail-display">
                <mail-filter @filtered="setFilter" @sorted="setSort"/>
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
                isStarred: null,

            },
            selectedEmail: null,
            unreadCount: 0,
            sortBy: 'Date',
            updated: false
        }
    },
    created() {
        eventBus.$on('updated', this.setUpdated)
        eventBus.$on('remove', this.removeEmail)
    },
    methods: {
        createMsg(txt, type) {
            return {
                txt,
                type
            }
        },
        setUpdated() {
            this.updated = !this.updated
        },
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
                    const msg = this.createMsg('Mail deleted successfully!', 'success')
                    console.log(msg)
                    eventBus.$emit('showMsg', msg)
                })
        },
        setDisplay(folder) {
            this.criteria.display = folder;
            this.criteria.isStarred = !this.criteria.isStarred;
        },
        setFilter(filterBy) {
            const { msgStatus, txt } = filterBy
            if (msgStatus === 'Read') this.criteria.isRead = true
            else if (msgStatus === 'Unread') this.criteria.isRead = false
            else if (msgStatus === 'Starred') this.criteria.isStarred = true
            else this.criteria.isRead = null
            this.criteria.txt = txt
        },
        setSort(sortBy) {
            this.sortBy = sortBy
        },
        update() {
            mailService.query(this.criteria)
                .then(emails => {
                    console.log(emails)
                    this.emails = emails
                })
        },
        sortByDate(emails) {
            emails.sort(function (a, b) {
                var ar1 = a.sentAt;
                var ar2 = b.sentAt;
                if (ar1 < ar2) return -1;
                if (ar1 > ar2) return 1;
                return 0
            });
            return emails
        }

    },
    computed: {
        getEmailsToShow() {
            let emails = this.emails
            if (this.sortBy === 'Date') emails = sortByDate(emails)

            if (this.sortBy === "Subject") emails.sort(function (a, b) {
                var ar1 = a.subject.toUpperCase();
                var ar2 = b.subject.toUpperCase();
                if (ar1 < ar2) return -1;
                if (ar1 > ar2) return 1;
                return 0;
            })
            if (this.sortBy === "Sender") emails.sort(function (a, b) {
                var ar1 = a.sender.toUpperCase();
                var ar2 = b.sender.toUpperCase();
                if (ar1 < ar2) return -1;
                if (ar1 > ar2) return 1;
                return 0;
            })

            return emails
        }
    },
    components: {
        mailList,
        mailFolderList,
        mailFilter
    },
    watch: {
        updated: {
            handler() {
                console.log('updated')
                mailService.query(this.criteria)
                    .then(emails => {
                        emails.sort(function (a, b) {
                            var ar1 = a.sentAt;
                            var ar2 = b.sentAt;
                            if (ar1 < ar2) return 1;
                            if (ar1 > ar2) return -1;
                            return 0
                        })
                        this.emails = emails
                        let unreads = this.emails.filter(email => email.isRead === false)
                        this.unreadCount = unreads.length
                    })
                console.log('god damn it!')
            }
        },
        criteria: {
            handler(newVal, oldVal) {
                console.log('criteria has changed!')
                mailService.query(this.criteria)
                    .then(emails => {
                        emails.sort(function (a, b) {
                            var ar1 = a.sentAt;
                            var ar2 = b.sentAt;
                            if (ar1 < ar2) return 1;
                            if (ar1 > ar2) return -1;
                            return 0
                        })
                        this.emails = emails
                        let unreads = this.emails.filter(email => email.isRead === false)
                        this.unreadCount = unreads.length
                    })
            },
            deep: true,
            immediate: true
        },
        unreadCount: {
            handler() {
                eventBus.$emit('updateCount', this.unreadCount)
            }
        },
        sortBy: {
            handler() {
                let emails = this.emails
                if (this.sortBy === 'Date') emails.sort(function (a, b) {
                    var ar1 = a.sentAt;
                    var ar2 = b.sentAt;
                    if (ar1 < ar2) return 1;
                    if (ar1 > ar2) return -1;
                    return 0
                });

                if (this.sortBy === "Subject") emails.sort(function (a, b) {
                    var ar1 = a.subject.toUpperCase();
                    var ar2 = b.subject.toUpperCase();
                    if (ar1 < ar2) return -1;
                    if (ar1 > ar2) return 1;
                    return 0;
                })
                if (this.sortBy === "Sender") emails.sort(function (a, b) {
                    var ar1 = a.from.toUpperCase();
                    var ar2 = b.from.toUpperCase();
                    if (ar1 < ar2) return -1;
                    if (ar1 > ar2) return 1;
                    return 0;
                })


            },
        }
    },
    components: {
        mailList,
        mailFolderList,
        mailFilter,
        mailExpand
    }

}