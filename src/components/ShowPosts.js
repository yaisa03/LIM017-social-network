export const ShowPosts = (e) => {
  const containerPosts = `<div class="postDiv">
                              <textarea class="title" readonly>${e.postTitle}</textarea>
                              <textarea class="description" readonly>${e.content}</textarea>
                              <span><i id="likeButton" class="fa fa-heart"></i>0</span>
                            </div>`;
  return containerPosts;
};
export const ShowPostsById = (doc, e) => {
  const containerPosts = `<div class="postDiv">
                              <textarea id="title${doc.id}" class="title" >${e.postTitle}</textarea>
                              <textarea id="description${doc.id}" class="description" >${e.content}</textarea>
                              <div>
                              <button id="${doc.id}" class="editButton">Editar</button>
                              <button id="${doc.id}" class="deleteButton">Borrar</button>
                              </div>
                            </div>`;
  return containerPosts;
};
