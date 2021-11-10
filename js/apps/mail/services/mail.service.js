import { storageService } from "../../../services/async-storage-service.js";
import { utilService } from "../../../services/utils-service.js";

export const mailService = {
    query,
    getById,
    // loggedinUser

}

const MAIL_KEY = 'emails';


// const loggedinUser = {
//     email: 'kodirules@appsus.com',
//     fullname: 'Kodi Yalouf'
// }

const gEmails = [
    {
        id: utilService.makeId(),
        status: 'sent',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com'
    },
    {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Your dad just calls me Katya',
        body: 'How the heck are ya?',
        isRead: false,
        sentAt: 1636538339420,
        from: 'YekaterinaZamolodchikova@dragqueen.com'

    }
]

function query(criteria) {
    let emails = storageService.query(MAIL_KEY)
    if (!emails || !emails.length) {
        emails = gEmails;
        storageService.save(MAIL_KEY, emails)
    }
    return Promise.resolve(emails);
}


function getById(emailId) {
    return storageService.get(MAIL_KEY, emailId)
}