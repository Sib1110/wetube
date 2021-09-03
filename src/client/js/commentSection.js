const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteCommentBtn = document.getElementById("deleteComment");
const video__comment = document.getElementById("video__comment");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};
const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    //fetch는 url변경없이 request를 보내게해줌.
    method: "POST",
    //header에서 이렇게 지정해줌으로써 백엔드로 텍스트를 보내는것이아니라
    //JSON을 보내고 있다는 것을 알려주어야함.
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  }); // fetch로 부터 오는 file은 주로(?) JSON형태임
  // 매우 큰 object를 프론트엔드에서 백엔드로 보낼때 쓰는 방법.
  if (response.status === 201) {
    textarea.value = ""; // <-- getter이면서 setter임.
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const deleteComments = (deleteBtn) => {
  deleteBtn.parentNode.removeChild(deleteBtn);
};

const handleDelete = async () => {
  const deleteBtn = document.getElementById("video__comment");
  const id = video__comment.dataset.id;
  await fetch(`api/videos/${id}/delete`, {
    method: "DELETE",
  });
  deleteComments(deleteBtn);
};

deleteCommentBtn.addEventListener("click", handleDelete);

if (form) {
  form.addEventListener("submit", handleSubmit);
}
