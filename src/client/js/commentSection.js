const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  fetch(`/api/videos/${videoId}/comment`, {
    //fetch는 url변경없이 request를 보내게해줌.
    method: "POST",
    //header에서 이렇게 지정해줌으로써 백엔드로 텍스트를 보내는것이아니라
    //JSON을 보내고 있다는 것을 알려주어야함.
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  }); // fetch로 부터 오는 file은 주로(?) JSON형태임
  // 매우 큰 object를 프론트엔드에서 백엔드로 보낼때 쓰는 방법.
  textarea.value = ""; // <-- getter이면서 setter임.
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
