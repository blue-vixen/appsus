import { storageService } from "../../../services/async-storage-service.js";
import { utilService } from "../../../services/utils-service.js";

export const mailService = {
    query,
    getById,
    getLoggedUser,
    remove,
    save

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
        sentAt: 1636619401881,
        from: 'YekaterinaZamolodchikova@dragqueen.com'
    },
    {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Come judge for us!',
        body: 'Dear Adi&Kobi, we would be honored if you would consider judging in the next season of Drag Race. Love, RuPaul',
        isRead: false,
        isStarred: true,
        sentAt: 1636538339420,
        from: 'RuPaul@wowproductions.com'
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
    {
        id: utilService.makeId(),
        status: 'sent',
        subject: 'You are the king!',
        body: 'but please stop puking on the bus!',
        isRead: false,
        isStarred: false,
        sentAt: 1636538339420,
        to: 'anerbitton@awesomebittons.com'
    },
    {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Duh for short',
        body: 'Miss Creme if you\'re nasty',
        isRead: false,
        isStarred: false,
        sentAt: Date.now(),
        from: 'bendelacreme@terminallydelightful.com'
    },
]

function getLoggedUser() {
    return loggedinUser
}

function remove(emailId) {
    console.log(emailId)
    // return Promise.reject('Big balagan!')
    return storageService.remove(MAIL_KEY, emailId);
}

function save(newMail) {
    newMail.id = utilService.makeId();
    newMail.sentAt = Date.now();
    console.log(newMail)
    gEmails.push(newMail)
    return storageService.post(MAIL_KEY, newMail)
}


function _createMails() {
    let emails = loadFromStorage(MAIL_KEY);
    if (!emails || !emails.length) {
        emails = gEmails;
        saveToStorage(MAIL_KEY, emails);
    }
    return emails;
}

function query(criteria) {
    let emails = _createMails()
    const { display, isRead, txt, isStarred } = criteria
    let filteredMails = emails.filter(email => {
        return email.status === display
    }).filter(email => {
        if (isRead === null) return true
        else return (isRead === email.isRead)
    }).filter(email => {

        return email.body.toLowerCase().includes(txt) || email.subject.toLowerCase().includes(txt)
    })
    console.log(filteredMails)
    return Promise.resolve(filteredMails);
}


function getById(emailId) {
    return storageService.get(MAIL_KEY, emailId)
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}