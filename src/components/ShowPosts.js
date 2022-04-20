export const ShowPosts = (doc, e) => {
  const containerPosts = `<div class="postDiv">
                              <div id="userInfo">
                              <img src="${e.userImage}" class="profilePhoto">
                              <p>${e.userName}</p>
                              </div>
                              <img id="uploadPostImages" src="${e.image}"></img>
                              <textarea class="title" readonly>${e.postTitle}</textarea>
                              <p>Dificultad: ${e.postLevel}</p>
                              <p>Tipo: ${e.postType}</p>
                              <textarea class="description" readonly>${e.content}</textarea>
                              <span id="likeCount"><i id="${doc.id}" class="fa fa-heart likeButton"></i>${e.likes.length}</span>
                            </div>`;
  return containerPosts;
};
export const ShowPostsById = (doc, e) => {
  const containerPosts = `<div class="postDiv">
                             <div id="userInfo">
                               <img src="${e.userImage}" class="profilePhoto">
                               <p>${e.userName}</p>
                              </div>
                              <img id="uploadPostImages" src="${e.image}"></img>
                              <textarea class="title text${doc.id}" readonly>${e.postTitle}</textarea>
                              <p>Dificultad: ${e.postLevel}</p>
                              <p>Tipo: ${e.postType}</p>
                              <textarea class="description text${doc.id}" readonly>${e.content}</textarea>
                              <div>
                              <button id="${doc.id}" class="editButton ${doc.id}">Editar</button>
                              <button id="${doc.id}" class="editPostPhoto ${doc.id} hide">Editar Foto</button>
                              <div class="container" id="cont4">
                                  <div class="modal">
                                    <i class="fa fa-remove" id="closeModalPhoto"style="font-size:30px;color:red"></i>
                                    <h3>Elige la imagen</h3>
                                    <label for="chooseFilePost1" class="chooseImage" style="border-radius:8px;height: 35px;"> Click para elegir</label>
                                    <input id="chooseFilePost1" type="file" accept=".png, .jpg, .jpeg" class="choose" style="display: none;"/>
                                    <button id="changeImagePost">Subir</button>
                                  </div>
                              </div> 
                              <button id="${doc.id}" class="publishButton ${doc.id} hide">Publicar</button>
                              <button id="${doc.id}" class="deleteButton ${doc.id}">Borrar</button>
                              </div>
                            </div>`;
  return containerPosts;
};
