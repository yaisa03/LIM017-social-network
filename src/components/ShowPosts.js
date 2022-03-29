export const ShowPosts = (e) => {
  const containerPosts = `<div class="postDiv">
                              <textarea class="title" readonly>${e.postTitle}</textarea>
                              <textarea class="description" readonly>${e.content}</textarea>
                              <span id="likeCount"><i id="likeButton" class="fa fa-heart"></i>0</span>
                            </div>`;
  return containerPosts;
};
export const ShowPostsById = (doc, e) => {
  const containerPosts = `<div class="postDiv">
                              <textarea class="title text${doc.id}" readonly>${e.postTitle}</textarea>
                              <textarea class="description text${doc.id}" readonly>${e.content}</textarea>
                              <div>
                              <button id="${doc.id}" class="editButton ${doc.id}">Editar</button>
                              <button id="${doc.id}" class="publishButton ${doc.id} hide">Publicar</button>
                              <button id="${doc.id}" class="deleteButton ${doc.id}">Borrar</button>
                              </div>
                            </div>`;
  return containerPosts;
};
