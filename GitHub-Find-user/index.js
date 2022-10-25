const inputName = document.querySelector('#user-name__input')
const userInfoWrapper = document.querySelector('#user__wrapper')

inputName.addEventListener('keyup', function(){
    if(inputName.value != ''){
        fetch(`https://api.github.com/users/${inputName.value}`).then((res)=>{
            console.log(res)
            return res.json()
        }).then((res)=>{
            createUser(res)
        })
    }else(
        clear()
    )
});

function createUser(response){
    console.log(response)
    userInfoWrapper.style.display = 'flex'

    if(response.name == undefined){
        userInfoWrapper.innerHTML = `
        <div class="user-img__wrapper">
            </div>
            <div class="user-info__wrapper">
                <div class="user-info__text">Name: <span>Null</span></div>
                <div class="user-info__text">BIO: <span>Null</span></div>
                <div class="user-info__text">Location: <span>Null</span></div>
                <div class="user-info__text">Company: <span>Null</span></div> 
                <div class="user-info__text">ID: <span>Null</span></div> 
            </div>
        `  
    }else {
        userInfoWrapper.innerHTML = `
        <div class="user-img__wrapper">
                <img class="user-img" src="${response.avatar_url}" />
            </div>
            <div class="user-info__wrapper">
                <div class="user-info__text">Name: <span>${response.name}</span></div>
                <div class="user-info__text">BIO: <span>${response.bio}</span></div>
                <div class="user-info__text">Location: <span>${response.location}</span></div>
                <div class="user-info__text">Company: <span>${response.company}</span></div> 
                <div class="user-info__text">ID: <span>${response.id}</span></div> 
            </div>
        `
    }
}

function clear(){
    userInfoWrapper.style.display = 'none'
}