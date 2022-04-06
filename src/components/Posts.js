export const Posts = () => {
  const containerPosts = `<header>
                           <nav>
                            <ul>
                             <li><i id="Homeicon" class="fa fa-home"> </i></li>
                             <li><i id="Usericon" class="fa fa-user" > </i></li>
                             <li><i id="Bellicon" class="fa fa-bell" > </i></li>
                             <li><i id="logOut" class="fa fa-power-off"></i></li>
                            </ul>
                           </nav>
                          </header>
                          <div id="SearchContainer">
                          <input id="searchPost" type="text" placeholder="Buscar">
                          <i class="fa fa-search-minus"></i>
                          </div>
                          <form id="createPost">
                           <p id="messagePost"></p>
                           <input id="title" placeholder="Titulo">
                           <textarea id="post" placeholder="Descripcion"></textarea>
                           <div id="uploadPostImages"></div>
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
                          <div id="postsContainer" class="gridContainer"></div>`;
  const postsDivs = containerPosts;
  return postsDivs;
};
