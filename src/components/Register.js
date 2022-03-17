export const Register = () => {
  const containerLogo = `<figure class="containerLogo">
                         <img src="Images/Icon.png" class="foodBookIcon">
                         <figcaption>FoodBook</figcaption>
                         </figure>`;
  const containerNewRegister = `<div id="containerNewRegister">
                                 <input type="text" id="newUser" placeholder="Ingresa tu correo">
                                 <div id="newPasswordContainer">
                                   <input type="password" id="newUserPassword" placeholder="Ingresa tu nueva constraseña">
                                   <i class="fa fa-eye" id="eyeLogo2"></i>
                                   <i class="fa fa-eye-slash" id="eyeSlashLogo2" style="display: none;"></i>
                                 </div>
                                </div>`;
  const registerButton = '<button id="registerButton">Registrate</button>';
  const registerDivs = containerLogo + containerNewRegister + registerButton;
  return registerDivs;
};
