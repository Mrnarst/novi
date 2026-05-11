const scriptURLPost = "https://script.google.com/macros/s/AKfycbxIqcosTAVg5DH_IODb1nWjHnq_htEiGPECXfmzRX6mKNErv7t91DSjLHntrkZl2A3Y_A/exec";
const form = document.forms["titip-pesan"];
const btnKirim = document.querySelector(".btn-kirim");
const btnLoading = document.querySelector(".btn-loading");
const myAlert = document.querySelector(".alert-warning");
const container = document.querySelector("#message-box");
const scriptURLGet =
  "https://script.google.com/macros/s/AKfycbxIqcosTAVg5DH_IODb1nWjHnq_htEiGPECXfmzRX6mKNErv7t91DSjLHntrkZl2A3Y_A/exec";

fetchMessage();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  e.stopPropagation();

  btnKirim.classList.add("d-none");
  btnLoading.classList.remove("d-none");

  try {
    const response = await fetch(scriptURLPost, {
      method: "POST",
      body: new FormData(form),
    });

    form.reset();

    btnKirim.classList.remove("d-none");
    btnLoading.classList.add("d-none");

    myAlert.classList.remove("d-none");

    setTimeout(() => {
      myAlert.classList.add("d-none");
    }, 3000);

    fetchMessage();

  } catch (error) {
    console.error("Error!", error.message);

    btnKirim.classList.remove("d-none");
    btnLoading.classList.add("d-none");

    alert("Pesan gagal dikirim");
  }

  return false;
});

function fetchMessage() {
  container.innerHTML = `
    <div class="spinner-border text-warning mt-5"
    style="width: 2.5rem; height: 2.5rem;"
    role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`;

  fetch(scriptURLGet)
    .then((resp) => resp.json())
    .then((data) => {
      maker(data);
    })
    .catch((err) => {
      console.error(err);
    });
}

function maker(data) {
  let content = "";

  data.reverse().forEach((message) => {
    content += `
      <div class="col-lg-7 col-md-10 col-12 mb-3">
        <div class="bubble-message d-flex align-items-start">

          <div class="user-photo me-3">
            <img src="assets/img/user-icon.svg" width="50" />
          </div>

          <div class="message">
            <p class="fw-bolder mb-1">${message.nama}</p>
            <p class="mb-0">${message.pesan}</p>
          </div>

        </div>
      </div>
    `;
  });

  container.innerHTML = content;
}