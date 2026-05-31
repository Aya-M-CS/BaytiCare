// REGISTER
const registerForm = document.getElementById("form-log");

if (registerForm && document.getElementById("customerName")) {
registerForm.addEventListener("submit", async function(e){

e.preventDefault();

const role = document.getElementById("role").value;

const nameField =
role === "CUSTOMER"
? document.getElementById("customerName").value.trim()
: document.getElementById("ownerName").value.trim();

const emailField =
role === "CUSTOMER"
? document.getElementById("customerEmail").value.trim()
: document.getElementById("ownerEmail").value.trim();

const phoneField =
role === "CUSTOMER"
? document.getElementById("customerPhone").value.trim()
: document.getElementById("ownerPhone").value.trim();

const sessionData = {
name: nameField,
email: emailField,
phone: phoneField,
role: role.toLowerCase()
};

if(role !== "CUSTOMER"){
const categorySelect = document.getElementById("storeSpecialty");

sessionData.category = categorySelect.value;
sessionData.storeCategory = categorySelect.options[categorySelect.selectedIndex].text;
sessionData.address = document.getElementById("ownerCity").value;
sessionData.ownerCity = document.getElementById("ownerCity").value;
sessionData.storeName = document.getElementById("storeName").value.trim();
sessionData.storeDescription = document.getElementById("storeDescription").value.trim();
sessionData.ownerName = nameField;
sessionData.ownerEmail = emailField;
sessionData.ownerPhone = phoneField;
sessionData.approved = false;
}
const passwordField =
role === "CUSTOMER"
? document.getElementById("customerPassword").value.trim()
: document.getElementById("ownerPassword").value.trim();

if(passwordField.length < 8){
  alert("Password must be at least 8 characters ❌");
  return;
}

try {

 const response = await fetch("https://tartness-open-exfoliate.ngrok-free.dev/api/auth/register", {
method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({

fullName: nameField,
email: emailField,
phone: phoneField,
password: passwordField,
role: role,

storeName: document.getElementById("storeName")?.value || null,
ownerCity: document.getElementById("ownerCity")?.value || null,
storeSpecialty: document.getElementById("storeSpecialty")?.value || null,
storeDescription: document.getElementById("storeDescription")?.value || null

})

});

const data = await response.json();

if(response.ok){

    if(role === "PROVIDER"){
        alert("Your request has been sent to admin approval ⏳");
        window.location.href = "login2.html"; 
    } else {
        alert("Registration successful ✅");
        
        let newCustomerSession = {
            name: nameField,
            email: emailField,
            phone: phoneField,
            role: "CUSTOMER"
        };
        
        localStorage.setItem("fakhama_session", JSON.stringify(newCustomerSession));
        
        let oldUsers = JSON.parse(localStorage.getItem("fakhama_users")) || [];
        oldUsers.push(newCustomerSession);
        localStorage.setItem("fakhama_users", JSON.stringify(oldUsers));

        window.location.href = "index.html";
    }

} else {
    alert(data.message || "Registration failed ❌");
}
} catch(error) {
    console.error(error);
    alert("Server connection failed ❌");
}
});

}

/////// LOGIN ////////////

// LOGIN
const loginForm = document.getElementById("form-log");

if (loginForm && document.getElementById("loginEmail")) {

loginForm.addEventListener("submit", async function(e){

e.preventDefault();

const email = document.getElementById("loginEmail").value.trim();
const password = document.getElementById("loginPassword").value.trim();
if(email === "admin@bayticare.com" && password === "1234"){

alert("Welcome Admin ✅");

window.location.href = "admin.html";

return;
}
try {

const response = await fetch("https://tartness-open-exfoliate.ngrok-free.dev/api/auth/login", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
email: email,
password: password
})
});

const data = await response.json();

if(response.ok){

let oldUsers =
JSON.parse(localStorage.getItem("fakhama_users")) || [];

let fullUser =
oldUsers.find(u => u.email === data.email);

let sessionUser = {

...fullUser,
...data

};

localStorage.setItem(
"fakhama_session",
JSON.stringify(sessionUser)
);

alert("You have logged in successfully ✅");

if(data.role === "ADMIN"){
window.location.href = "admin.html";
}else{
window.location.href = "index.html";
}

}else{
alert(data.message || "The account does not exist ❌");
}

}catch(error){

console.error(error);
alert("Connection to server failed ❌");

}

});

}

function toggleFavorite(storeData, buttonElement) {
    const sessionStr = localStorage.getItem('fakhama_session');
    if (!sessionStr) {
        alert("You must log in as a customer to add shops to your favorites.");
        window.location.href = "login2.html";
        return;
    }

    const currentUser = JSON.parse(sessionStr);

    if (currentUser.role !== 'CUSTOMER') {
        alert("The favorites feature is available to customers only.");
        return;
    }

    const favsKey = 'fakhama_favs_' + currentUser.email;
    let favs = JSON.parse(localStorage.getItem(favsKey)) || [];

    const existingIndex = favs.findIndex(store => store.id === storeData.id);

    if (existingIndex > -1) {
        favs.splice(existingIndex, 1);
        buttonElement.style.color = "gray";
        buttonElement.innerHTML = "<i class='fa fa-heart-o'></i>";
    } else {
        favs.push(storeData);
        buttonElement.style.color = "#E53935";
        buttonElement.innerHTML = "<i class='fa fa-heart'></i>";
    }

    localStorage.setItem(favsKey, JSON.stringify(favs));
}


  let currentLang = "en";

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: "en",
    autoDisplay: false,
    includedLanguages: "ar,en"
  }, "google_translate_element");
}

document.addEventListener("DOMContentLoaded", function () {
  const langBtn = document.getElementById("langToggle");
  
  if (langBtn) {
    langBtn.addEventListener("click", function () {
      currentLang = currentLang === "en" ? "ar" : "en";
      
      let combo = document.querySelector(".goog-te-combo");
      
      if (combo) {
        combo.value = currentLang;
        combo.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
      } else {
        document.cookie = `googtrans=/en/${currentLang}; path=/`;
        window.location.reload();
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const darkBtn = document.getElementById('darkModeToggle');
    const body = document.body;

    if (localStorage.getItem('fakhama_darkmode') === 'enabled') {
        body.classList.add('dark-mode');
        if (darkBtn) darkBtn.textContent = '☀️'; 
    }

    if (darkBtn) {
        darkBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('fakhama_darkmode', 'enabled');
                darkBtn.textContent = '☀️';
            } else {
                localStorage.setItem('fakhama_darkmode', 'disabled');
                darkBtn.textContent = '🌙';
            }
        });
    }
});
