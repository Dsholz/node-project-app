const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchInput.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then(({ error, location, forecast }) => {
      if (error) {
        return (messageOne.textContent = error);
      }

      messageOne.textContent = location;
      messageTwo.textContent = forecast;
    });
  });
});
