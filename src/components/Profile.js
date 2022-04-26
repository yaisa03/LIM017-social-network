/* istanbul ignore file */
// eslint-disable-next-line import/no-cycle
import { auth } from '../lib/Firestore.js';

export const Profile = () => {
  const user = auth.currentUser;
  let url = '';
  if (user.photoURL === null) {
    url = 'Images/userImage.jpeg';
  } else {
    url = user.photoURL;
  }
  const errorMessage = '<p id="message"></p>';
  const containerProfile = `<header>
                             <div id="logoContainer">
                               <img id="FoodLogoHead" src="Images/FoodBookHead.jpg">
                             </div>
                             <nav>
                              <ul>
                               <li><i id="Homeicon" class="fa fa-home"> </i></li>
                               <li><i id="Usericon" class="fa fa-user" > </i></li>
                               <li><i id="logOut" class="fa fa-power-off"></i></li>
                              </ul>
                             </nav>
                            </header>
                            <main id="mainContainer">
                              <div id="profileInfo">
                               <div id="profilePhotoDiv">
                                <img id="profilePhoto" src= ${url} class="profilePicture">
                                <i class="fa fa-camera" id="EditPhoto" style="font-size:24px"></i>
                                </div>
                                <div class="container" id="cont">
                                  <div class="modal">
                                    <i class="fa fa-remove" style="font-size:30px;color:red"></i>
                                    <h3>Elige la imagen</h3>
                                    <label for="chooseFile" class="chooseImage" style="border-radius:8px;height: 35px;"> Click para elegir</label>
                                    <input id="chooseFile" type="file" accept=".png, .jpg, .jpeg" class="choose" style="display: none;"/>
                                    <div id="info"></div>
                                    <button id="uploadImage">Subir</button>
                                  </div>
                                </div>  
                                <div id="containerUser">
                                  <p id="userName">${user.displayName}</p>
                                  <p id="userEmail">${user.email}</p>
                                  <button id="editProfileButton">Editar Perfil</button>
                                  <div class="container" id="cont2">
                                    <div class="modalEditProfile modal">
                                      <i class="fa fa-remove" id="closeModal" style="font-size:30px;color:red"></i>
                                      <label id="editDisplayName"> Cambia tu nombre de usuario </label>
                                      <input id="newDisplayName" type="text"></input>
                                    <div id="editProfileButtons">
                                      <button id="saveProfileChanges">Guardar cambios</button>
                                      <button id="deleteAccount">Eliminar cuenta</button>
                                    </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div id="PageContent">
                                <form id="createPost">
                                  <p id="messagePost"></p>
                                  <input id="title" placeholder="Titulo">
                                  <textarea id="post" placeholder="Descripcion"></textarea>
                                  <div id="selectsContainer">
                                  <p id="selectLevel">Dificultad:
                                  <select name="level" id="level">
                                    <option value="Facil">Facil</option>
                                    <option value="Intermedio">Intermedio</option>
                                    <option value="Avanzado">Avanzado</option>
                                  </select>
                                  </p>
                                  <p id="selectType">Tipo de plato:
                                  <select name="type" id="type">
                                    <option value="Entrada">Entrada</option>
                                    <option value="Plato Fuerte">Plato Fuerte</option>
                                    <option value="Postre">Postre</option>
                                  </select>
                                  </p>
                                  </div>
                                  <img id="namePostImage" src=""></img>
                                  <div id="addPhotoDiv">
                                  <i class="fa fa-photo" id="addPhotoIcon"></i>
                                  <div class="container" id="cont3">
                                  <div class="modal">
                                    <i class="fa fa-remove" id="closeModalPhotoPost"style="font-size:30px;color:red"></i>
                                    <h3>Elige la imagen</h3>
                                    <label for="chooseFilePost" class="chooseImage" style="border-radius:8px;height: 35px;"> Click para elegir</label>
                                    <input id="chooseFilePost" type="file" accept=".png, .jpg, .jpeg" class="choose" style="display: none;"/>
                                    <button id="uploadImagePost">Subir</button>
                                  </div>
                                  </div> 
                                  <button id="postButton">Publicar</button>
                                  </div>
                                </form>
                                <div id="postsContainer"></div>
                              </div>
                            </main>`;
  const profileDivs = errorMessage + containerProfile;
  return profileDivs;
};
/* onerror="this.src='Images/userImage.jpg';" */
/* <button id="EditPhoto"> Editar Foto </button> */
