const userInfoContainer = document.querySelector('.user-info-container');
const avatar = document.querySelector('.avatar');
const githubName = document.querySelector('.github-name');
const joinDate = document.querySelector('.join-date');
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const usernameLink = document.querySelector('.username-link');
const bio = document.querySelector('.bio');
const reposCnt = document.querySelector('.repos-cnt');
const followersCnt = document.querySelector('.followers-cnt');
const followingCnt = document.querySelector('.following-cnt');
const userLocation = document.querySelector('.user-location');
const userWebsiteLink = document.querySelector('.user-website-link');
const userTwitterLink = document.querySelector('.user-twitter-link');
const userCompany = document.querySelector('.user-company');
const usernameInput = document.querySelector('.username-input');
const searchBtn = document.querySelector('.searchBtn');
const modeName = document.querySelector('.modeName');
const mode = document.querySelector('.mode');
const modeIcon = document.querySelector('.modeIcon');
const cross = document.querySelector('.cross');
const notFound = document.querySelector('.not-found');
const root = document.documentElement.style;

let currModeName = "dark";

async function fetchGithubDetails(username){
    try{
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();   
        renderGithubDetails(data);
    }
    catch(e){
        console.log('bhaisahab ye username present nhi hai');
        notFound.classList.add('active');
        userInfoContainer.classList.remove('active');
    }
}

function renderGithubDetails(data){
    userInfoContainer.classList.add('active');    

    avatar.src = `https://avatars.githubusercontent.com/u/${data?.id}?v=4`;
    githubName.innerText = data?.name;

    let date = getDate(data?.created_at);
    let month = getMonth(data?.created_at);
    let year = getYear(data?.created_at);
    joinDate.innerText = `Joined ${date} ${month} ${year}`;

    usernameLink.innerText = `@${data?.login}`
    usernameLink.href = `https://github.com/${data?.login}`;

    if(data?.bio===null)
        bio.innerText = `This profile has no bio`;
    else
        bio.innerText = data?.bio;

    reposCnt.innerText = data?.public_repos;

    followersCnt.innerText = data?.followers;
    
    followingCnt.innerText = data?.following;

    if(data?.location===null){
        userLocation.innerText = `Not Available`;
        userLocation.classList.add('null');
    }
    else{
        userLocation.innerText = data?.location;
        userLocation.classList.remove('null');
    }

    if(data?.blog===""){
        userWebsiteLink.innerText = `Not Available`;
        userWebsiteLink.classList.add('null');
    }
    else{
        userWebsiteLink.innerText = data?.blog;
        userWebsiteLink.href = data?.blog;
        userWebsiteLink.classList.remove('null');
    }
    
    if(data?.twitter_username===null){
        userTwitterLink.innerText = `Not Available`;
        userTwitterLink.classList.add('null');
    }
    else{
        userTwitterLink.innerText = data?.twitter_username;
        userTwitterLink.href = `https://twitter.com/${data?.twitter_username}`;
        userTwitterLink.classList.remove('null');
    }
    
    if(data?.company===null){
        userCompany.innerText = `Not Available`;
        userCompany.classList.add('null');
    }
    else{
        userCompany.innerText = data?.company;
        userCompany.classList.remove('null');
    }
}

function getMonth(value){
    let month = value[5] + value[6];
    return months[parseInt(month)-1];
}

function getDate(value){
    let date = value[8] + value[9];
    return date;
}

function getYear(value){
    let year = "";
    for(let i=0; i<4; i++)
        year += value[i];
    return year;
}

searchBtn.addEventListener('click', doSearch);

function doSearch(){
    if(usernameInput.value != ""){
        fetchGithubDetails(usernameInput.value);
    }
}
 
usernameInput.addEventListener('input', ()=>{
    if(usernameInput.value != ""){
        cross.classList.add('active');
    }
    else
        cross.classList.remove('active');
})

cross.addEventListener('click', ()=>{
    usernameInput.value = "";
    cross.classList.remove('active');
})

mode.addEventListener('click', swapMode);

function swapMode(){
    if(currModeName == 'dark'){
        currModeName = "light";
        modeName.innerText = currModeName;
        modeIcon.src = "./assets/images/sun-icon.svg";
        root.setProperty("--lm-bg", "#141D2F");
        root.setProperty("--lm-bg-content", "#1E2A47");
        root.setProperty("--lm-text", "white");
        root.setProperty("--lm-text-alt", "white");
        root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    }
    else{
        currModeName = "dark";
        modeName.innerText = currModeName;
        modeIcon.src = "./assets/images/moon-icon.svg";
        root.setProperty("--lm-bg", "#F6F8FF");
        root.setProperty("--lm-bg-content", "#FEFEFE");
        root.setProperty("--lm-text", "#4B6A9B");
        root.setProperty("--lm-text-alt", "#2B3442");
        root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    }
}

fetchGithubDetails('Shubhanshurav');
swapMode();