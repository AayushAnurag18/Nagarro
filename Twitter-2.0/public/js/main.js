let page = "";
try {
  page = document.querySelector("#page").getAttribute("data-page");
} catch (error) {
  page = "";
}
console.log(page);

// HOME PAGE / PROFILE PAGE
const likeBtns = document.querySelectorAll(".like-btn");

likeBtns.forEach((likeBtn) => {
  likeBtn.addEventListener("click", (e) => {
    if (document.getElementById("userId").value !== null) {
      const likeIcon = e.target.firstElementChild;
      const likeCount = likeIcon.nextElementSibling;
      let isLiked = false;
      if (likeIcon.classList.toggle("fa-solid")) {
        likeCount.innerText = parseInt(likeCount.innerText) + 1;
        isLiked = true;
      } else {
        likeCount.innerText = parseInt(likeCount.innerText) - 1;
        isLiked = false;
      }
      const data = {
        tweetId: e.target.getAttribute("data-tweetId"),
        userId: document.getElementById("userId").value,
        isLiked,
      };
      // console.log(data);
      fetch("/tweet/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => {
        //   console.log("Request complete! response:", res);
      });
    }
  });
});

try {
  document.querySelector("#tweet-form").addEventListener("submit", (e) => {
    if (document.getElementById("tweet").value === "") {
      e.preventDefault();
    }
  });
} catch (error) {
  console.log(error);
}

document.querySelectorAll(".delete-tweet").forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", () => {
    const tweetId = deleteBtn.getAttribute("data-tweet-id");
    const userId = deleteBtn.getAttribute("data-tweet-user");
    // console.log(tweetId);
    const data = {
      tweetId,
      userId,
    };
    fetch("/tweet/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log("Request complete! response:", res);
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

// EXPLORE PAGE
try {
  document
    .querySelector("#search-profile-btn")
    .addEventListener("click", searchProfile);
  document
    .querySelector("#search-profile-input")
    .addEventListener("keyup", (e) => {
      // console.log(e.key);
      if (e.key === "Enter") {
        searchProfile();
      }
    });
} catch (error) {
  console.log(error);
}

function searchProfile() {
  const searchProfileInput = document.querySelector("#search-profile-input");
  const searchProfileValue = searchProfileInput.value;
  const resultContainer = document.querySelector("#result-container");
  const profileTemplate = document.querySelector("#profile-template");

  resultContainer.innerHTML = `<div class="loader"></div>`;

  console.log("here");
  fetch(`/search/profile?query=${searchProfileValue}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      resultContainer.innerHTML = "";
      if (data.length === 0) {
        resultContainer.innerHTML = `<div class="no-result">No result found</div>`;
      } else {
        data.forEach((user) => {
          const profile = profileTemplate.content.cloneNode(true).children[0];
          const profilePic = profile.querySelector(".profile-pic img");
          const profileName = profile.querySelector(".profile-name");
          const profileUsername = profile.querySelector(".profile-username");

          profilePic.src = user.avatar;
          profileName.innerText = user.name;
          profileUsername.innerText = user.username;
          profile.href = `/profile/${user.id}`;
          resultContainer.append(profile);
        });
      }
    });
}
