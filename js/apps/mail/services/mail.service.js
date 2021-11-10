import { storageService } from "../../../services/async-storage-service.js";
import { utilService } from "../../../services/utils-service.js";

export const mailService = {
    query,
    getById,
    getLoggedUser

}

const MAIL_KEY = 'emails';


const loggedinUser = {
    email: 'kodirules@appsus.com',
    fullname: 'Kodi Yalouf'
}

const gEmails = [
    {
        id: utilService.makeId(),
        status: 'sent',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com'
    },
    {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Your dad just calls me Katya',
        body: 'How the heck are ya?',
        isRead: false,
        isStarred: false,
        sentAt: 1636538339420,
        from: 'YekaterinaZamolodchikova@dragqueen.com'
    },
    {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Come judge for us!',
        body: 'Dear Adi&Kobi, we would be honored if you would consider judging in the next season of Drag Race. Love, RuPaul',
        isRead: true,
        isStarred: true,
        sentAt: 1636538339420,
        from: 'Rupaul@wowproductions.com'
    },
    {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Come on Appsus, lets get sickening!!!!',
        body: '',
        isRead: false,
        isStarred: false,
        sentAt: 1636538339420,
        from: 'laganjaestranja@hausofedwards.com'
    },
]

function getLoggedUser() {
    return loggedinUser
}

function query(criteria) {
    let emails = storageService.query(MAIL_KEY)
    if (!emails || !emails.length) {
        emails = gEmails;
        storageService.save(MAIL_KEY, emails)
    }
    const { display, isRead, txt, isStarred } = criteria
    // strs = txt.toLowerCase().split(' ')
    // console.log(strs)
    let filteredMails = emails.filter(email => {
        return email.status === display
    }).filter(email => {
        if (isRead === null) return true
        else return (isRead === email.isRead)
    }).filter(email => {
        // const txts = [email.body.toLowerCase(), email.subject.toLowerCase()]
        // console.log(txts)
        return email.body.toLowerCase().includes(txt) || email.subject.toLowerCase().includes(txt)
    })
    console.log(filteredMails)
    return Promise.resolve(filteredMails);
}


function getById(emailId) {
    return storageService.get(MAIL_KEY, emailId)
}