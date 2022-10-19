const inputName = document.querySelector('#inputName')
const inputPassword = document.querySelector('#inputPassword')
const buttonSignin = document.querySelector('#signin')
const buttonLogout = document.querySelector('#logout')

const authInfo = {
    login: 'admin',
    password: 'nimda'
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


if (buttonSignin) buttonSignin.addEventListener('click', function () {
    login = inputName.value
    password = inputPassword.value

    if (login === authInfo.login && password === authInfo.password) {
        document.cookie = 'auth=true'
        document.cookie = 'authLogin=' + login
        window.location = './app.html'
    } else {
        alert('Login or password is incorrect')
        inputPassword.value = ''
    }
})

if (buttonLogout) buttonLogout.addEventListener('click', function () {
    if (!getCookie('auth') || !getCookie('authLogin')) {
        return;
    }

    document.cookie = 'auth=; max-age=-1'
    document.cookie = 'authLogin=; max-age=-1'

    if (!getCookie('auth')) window.location.reload()
})

if (window.location.pathname == '/Contacts-app-with-login/index.html' && getCookie('auth') === 'true') {
    window.location = '/Contacts-app-with-login/app.html'
}

if (window.location.pathname == '/Contacts-app-with-login/app.html' && !getCookie('auth')) {
    window.location = '/Contacts-app-with-login/index.html'
}

// sessionStorage и localStorage
const addButton = document.querySelector('#add')
const inputContactName = document.querySelector('#input-name')
const inputPhone = document.querySelector('#input-phone')
let contactsData = []

let contactsUpdate = function(){
    let localContactsData = localStorage.getItem('contactsData');
    if (localContactsData.length > 0) contactsData = JSON.parse(localContactsData)
    
    let contacts = document.querySelector('.contacts')
    contacts.innerHTML = ''
        
    contactsData.forEach(function (contact, id) {
        let elemContact = document.createElement('div')
        elemContact.classList.add('contact')
        elemContact.innerHTML = `
                    <h1 class="contact__number">${id +1}</h1>
                    <div class="contact-info">
                        <div class="contact-info__name">${contact.name}</div>
                        <div class="contact-info__number">${contact.phone}</div>
                    </div>
        
        `
        contacts.appendChild(elemContact)
    })
}

if (window.location.pathname == '/Contacts-app-with-login/app.html'){
    contactsUpdate()
}

if (addButton) addButton.addEventListener('click', function () {
    if (!inputContactName.value || !inputPhone.value) {
        alert('Please fill out name or phone')
    } else {
        contactName = inputContactName.value    
        contactPhone = inputPhone.value

        let contact = {
            name: contactName,
            phone: contactPhone
        }


        contactsData.push(contact)
        localStorage.setItem('contactsData', JSON.stringify(contactsData))
        contactsUpdate()
        inputContactName.value = ''
        inputPhone.value = ''
    }
})


