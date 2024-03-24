// Bg imgs array
var bgImgsList = [
    {
        bg: 'teal',
        url: 'painting-mountain-lake-with-mountain-background.jpg'
    },
    {
        bg: 'maroon',
        url: 'majestic-mountain-peak-tranquil-winter-landscape-generated-by-ai.jpg'
    },
    {
        bg: 'peach',
        url: 'geometric-vintage-retro-background-ai-generated-image.jpg'
    },
    {
        bg: 'purple',
        url: 'ultra-detailed-nebula-abstract-wallpaper-10.jpg'
    },
];

// Select elements from HTML
// login page
var userEmailInput = document.getElementById("userEmail");
var userPasswordInput = document.getElementById("userPassword");
var loginBtn = document.getElementById("login");
var signupLink = document.getElementById("signupLink");
var msgSpanLogin = document.querySelector("#login-sec #msg");

// signup page
var registerNameInput = document.getElementById("registerName");
var registerEmailInput = document.getElementById("registerEmail");
var registerPasswordInput = document.getElementById("registerPassword");
var signupBtn = document.getElementById("signup");
var signinLink = document.getElementById("signinLink");
var msgSpanSignup = document.querySelector("#signup-sec #msg");

// home page
var userNameInput = document.getElementById("userName");
var logoutBtn = document.getElementById("logout");
var dropdownThemes = document.getElementById("maroon");
var themeSwitcher = document.querySelector('#theme-switcher');

// Img slider
var sliderBtn = document.querySelector('#img-slider #slider');
var prevBtn = document.querySelector('#img-slider #prev');
var nextBtn = document.querySelector('#img-slider #next');
var bgImgBody = document.getElementById('img-slider');



// Initialize global variables
var usersList;
var currUser;
var currUserIndex;
var counter;
var themeId;

// Fill usersList from localStorage after loading the page
if(localStorage.getItem("usersList")) {
    usersList = JSON.parse(localStorage.getItem("usersList"));
} else {
    usersList = [];
}



// Add user on click
if(location.pathname == '/signup.html') {
    signupBtn.addEventListener('click', addUser);
}

// Login user on click
if(location.pathname == '/index.html') {
    loginBtn.addEventListener('click', login);
}

if(location.pathname == '/home.html') {
    // show current user name
    welcomUser(JSON.parse(localStorage.getItem('currUser')).name);

    // Logout and delete current user's data from localstorage
    logoutBtn.addEventListener('click', logout);

    
    // Change color theme
    // dropdownThemes.addEventListener('click', () => {
        //     changeTheme('maroon');
    // });
        
    if (!localStorage.getItem(itemName)) {
        // Set the value for the first time
        localStorage.setItem('theme', 0);
    }
    themeSwitcher.addEventListener('change', (event) => {
        var selectedTheme = event.target.value;
        document.documentElement.style.setProperty('--theme', selectedTheme);
        localStorage.setItem('theme', selectedTheme);
    });
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        document.documentElement.style.setProperty('--theme', storedTheme);
    }
    
    // Sliders for bg imgs for welcome page
    sliderBtn.addEventListener('click', showSliderBtns);
    nextBtn.addEventListener('click', () => {
        slider(1);
    });
    prevBtn.addEventListener('click', () => {
        slider(-1);
    });
}



// Main functions
function addUser() {
    // Data validation condition to continue process
    if(isValidRegisterName(registerNameInput.value) && isValidRegisterEmail(registerEmailInput.value) && isValidRegisterPassword(registerPasswordInput.value)) {
        // Creating an object for a new user
        var user = {
            name: registerNameInput.value,
            email: registerEmailInput.value,
            password: registerPasswordInput.value,
        }
        usersList.push(user);
        // usersList = [];
        fromListToLocalStorage(Object.keys({usersList})[0], usersList);
        clearSignupInputsValues();
        successMsg(msgSpanSignup);
    } else {
        failMsg(msgSpanSignup, registerEmailInput, registerPasswordInput, registerNameInput);
    }
}

function login() {
    // Data validation
    if(!isValidRegisterName(userEmailInput.value) || !isValidRegisterEmail(userPasswordInput.value)) {
        failMsg(msgSpanLogin, userEmailInput, userPasswordInput);
    }

    if(usersList.find(e => e.email === userEmailInput.value) && usersList.find(e => e.password === userPasswordInput.value)) {
        currUserIndex = usersList.map(e => e.email).indexOf(userEmailInput.value);
        currUser = usersList[currUserIndex];
        fromListToLocalStorage(Object.keys({currUser})[0], currUser);
        location.pathname = '/home.html';
        return currUser;
    }
}

function welcomUser(name) {
    userNameInput.innerHTML = `<span>${name}</span>`;
}

function logout() {
    localStorage.removeItem('currUser');
    location.pathname = '/index.html';
}

// function changeTheme(theme) {
//     document.body.classList.remove(...document.body.classList); 
//     document.body.classList.toggle(`${theme}`);
// }

function showSliderBtns() {
    sliderBtn.classList.add('d-none');
    prevBtn.classList.replace('d-none', 'd-block');
    nextBtn.classList.replace('d-none', 'd-block');

    counter = 0;
    bgImgBody.style.backgroundImage = `url('Assets/img/${bgImgsList[counter].url}')`;
}

function slider(num) {
    counter += num;
    if(counter < 0) {
        counter = bgImgsList.length-1;
    }
    if(counter >= bgImgsList.length) {
        counter = 0;
    }
    bgImgBody.style.backgroundImage = `url('Assets/img/${bgImgsList[counter].url}')`;
}

//Associative functions
function fromListToLocalStorage(itemName, itemValue) {
    localStorage.setItem(`${itemName}`, JSON.stringify(itemValue));
}

function clearLoginInputsValues() {
    userEmailInput.value = '';
    userPasswordInput.value = '';
}

function clearSignupInputsValues() {
    registerNameInput.value = '';
    registerEmailInput.value = '';
    registerPasswordInput.value = '';
}

function isValidRegisterName(name) {
    return String(name)
        .match(
            /^[a-zA-Z0-9_\.]{3,}$/
        );
}

function isValidRegisterEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

function isValidRegisterPassword(password) {
    return String(password)
        .match(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
        );
}

function isLikelyEnglish(text) {
    const englishChars = /^[a-zA-Z\s\,\!\?\.]+$/;
    return englishChars.test(text);
}

function successMsg(msg) {
    msg.style.color = 'var(--text-pass)';
    msg.innerHTML = `Success`;
}

function failMsg(msg, email, password, name) {
    msg.style.color = 'var(--text-fail)';
    msg.innerHTML = ``;
    if(!isLikelyEnglish(password.value)) {
        msg.innerHTML += `Letters should be in English<br />`;
    }
    if(location.pathname == "/signup.html") {
        if((!name.value) || !email.value || !password.value) {
            msg.innerHTML += `All inputs are required<br />`;
        }
        if(name.value && usersList.find(e => e.name === name.value)) {
            msg.innerHTML += `Name already exists<br />`;
        }
        if(email.value && usersList.find(e => e.email === email.value)) {
            msg.innerHTML += `Email already exists<br />`;
        }
        if(name.value && !isValidRegisterName(name.value)) {
            msg.innerHTML += `Name should be more than 2 letters<br />`;
        }
    }
    if(location.pathname == "/index.html") {
        if(!email.value || !password.value) {
            msg.innerHTML = `All inputs are required<br />`;
        }
        if((email.value && !usersList.find(e => e.email === email.value)) || (password.value && !usersList.find(e => e.password === password.value))) {
            msg.innerHTML = `Incorrect email or password<br />`;
        }
    }
    if(email.value && !isValidRegisterEmail(email.value)) {
        msg.innerHTML += `Email is not valid<br />`;
    }
    if(password.value && !isValidRegisterPassword(password.value)) {
        msg.innerHTML += `Password must include uppercase and lowercase letters and numbers and be more than 7 characters!`;
    }
}