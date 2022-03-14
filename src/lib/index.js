// aqui exportaras las funciones que necesites

export const myFunction = () => {
  // aqui tu codigo
  //console.log('Hola mundo!');
};

const register = document.getElementById("register");
register.addEventListener("click", () => {
  const pageTwo= document.getElementById("containerPageTwo");
  const pageOne= document.getElementById("containerPageOne");
  pageOne.style.display="none";
  pageTwo.style.display="";
});

const eyeLogo= document.querySelector(".fa-eye");
const eyeSlashLogo= document.querySelector(".fa-eye-slash");
const password= document.querySelector("#password");
eyeLogo.addEventListener("click", () => {
  eyeLogo.style.display="none";
  eyeSlashLogo.style.display="";
  password.type= "text";
});
eyeSlashLogo.addEventListener("click", () => {
  eyeLogo.style.display="";
  eyeSlashLogo.style.display="none";
  password.type= "password";
});
const eyeLogo2= document.querySelector("#eyeLogo");
const eyeSlashLogo2= document.querySelector("#eyeSlashLogo");
const password2= document.querySelector("#newUserPassword");
eyeLogo2.addEventListener("click", () => {
  eyeLogo2.style.display="none";
  eyeSlashLogo2.style.display="";
  password2.type= "text";
});
eyeSlashLogo2.addEventListener("click", () => {
  eyeLogo2.style.display="";
  eyeSlashLogo2.style.display="none";
  password2.type= "password";
});

