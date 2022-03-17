export const ResetPassword = () => {
  const containerLogo = `<figure class="containerLogo">
                           <img src="Images/Icon.png" class="foodBookIcon">
                           <figcaption>FoodBook</figcaption>
                           </figure>`;
  const containerResetPassword = `<div id="containerResetPassword">
                                   <input type="text" id="emailReset" placeholder="Ingresa tu correo">
                                  </div>`;
  const resetPasswordButton = '<button id="resetPasswordButton">Reestablecer contraseña</button>';
  const resetPasswordDivs = containerLogo + containerResetPassword + resetPasswordButton;
  return resetPasswordDivs;
};
