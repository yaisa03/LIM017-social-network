export const ShowPosts = (doc, e) => {
  const containerPosts = `<div class="postDiv">
                              <textarea class="title" readonly>${e.postTitle}</textarea>
                              <textarea class="description" readonly>${e.content}</textarea>
                              <img id="uploadPostImages" src="${e.image}"></img>
                              <span id="likeCount"><i id="${doc.id}" class="fa fa-heart likeButton"></i>${e.likes.length}</span>
                            </div>`;
  return containerPosts;
};
export const ShowPostsById = (doc, e) => {
  const containerPosts = `<div class="postDiv">
                              <textarea class="title text${doc.id}" readonly>${e.postTitle}</textarea>
                              <textarea class="description text${doc.id}" readonly>${e.content}</textarea>
                              <img id="uploadPostImages" src="${e.image}"></img>
                              <div>
                              <button id="${doc.id}" class="editButton ${doc.id}">Editar</button>
                              <button id="${doc.id}" class="publishButton ${doc.id} hide">Publicar</button>
                              <button id="${doc.id}" class="deleteButton ${doc.id}">Borrar</button>
                              </div>
                            </div>`;
  return containerPosts;
};
