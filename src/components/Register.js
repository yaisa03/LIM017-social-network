export const Register = () => {
  const containerLogo = `<figure class="containerLogo">
                         <img src="Images/Icon.png" class="foodBookIcon">
                         <figcaption>FoodBook</figcaption>
                         </figure>`;
  const containerNewRegister = `<div id="containerNewRegister">
                                 <input type="text" id="newUser">
                                 <div id="newPasswordContainer">
                                   <input type="password" id="newUserPassword">
                                   <i class="fa fa-eye" id="eyeLogo2"></i>
                                   <i class="fa fa-eye-slash" id="eyeSlashLogo2" style="display: none;"></i>
                                 </div>
                                </div>`;
  const registerButton = '<button id="registerButton">Registrate</button>';
  const containerNewReg = `<div id="containerNewReg">
                            <p>Registrate con:</p>
                            <div id="registerIconsNewUser">
                              <img src="Images/google.png" class="googleLogo">
                              <img src="Images/facebook.png" class="facebookLogo">
                            </div>
                           </div>`;
  const registerDivs = containerLogo + containerNewRegister + registerButton + containerNewReg;
  return registerDivs;
};
