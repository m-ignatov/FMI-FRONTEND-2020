(() => {
  const db = firebase.database();
  const tweetsDB = db.ref('/tweets');
  const postContainer = document.getElementById('post-container');
  const newPost = document.getElementById('new-post');
  const loader = document.getElementById("loader");
  const userName = document.getElementById("profile-name");
  const profilePostsCount = document.getElementById("profile-posts-count");
  const profileLikesCount = document.getElementById("profile-likes-count");
  let hasPosts = false;
  let userInfo;
  let userRef;

  const post = data => {
    const state = data.val();

    return `<figure class="profile-avatar post-section-avatar">
              <img src="images/avatar.png" alt="BP" class="profile-image">
          </figure>
          <div class="post-content">
              <div class="post-author">
                  <h3 class="post-author-name">${state.username}</h3>
                  <span class="post-delimiter fa fa-circle"></span>
                  <span class="post-date">${time_ago(new Date(state.date))}</span>
              </div>
              <p class="post-text">${state.message}</p>
              <div class="post-footer">
                  <div class="post-reaction">
                      <button class="far fa-thumbs-up like-btn" data-id="${data.key}"></button>
                      <span class="post-likes">${state.likes}</span>
                  </div>

                  <div class="post-reaction dislike-container">
                      <button class="far fa-thumbs-down dislike-btn" data-id="${data.key}"></button>
                      <span class="post-dislikes">${state.dislikes}</span>
                  </div>
              </div>
          </div>
          <div class="post-close">
              <button class="post-close fa fa-times" data-id="${data.key}"></button>
          </div>`;
  };

  newPost.addEventListener('submit', event => {
    event.preventDefault();

    if (validateUser()) {
      userInfo = firebase.auth().currentUser;
      userRef = auth.getUserStats(userInfo.uid);
      userRef.once('value').then(snapshot => {
        if (snapshot.val()) {
          snapshot.val().tweets = snapshot.val().tweets ? snapshot.val().tweet++ : 0;
        }
      });
    }

    let message = document.getElementById("new-post-text");
    tweet.post(message.value);
    message.value = "";
  });

  firebase.auth().onAuthStateChanged(user => {

    // Update profile posts information
    if (validateUser()) {
      userName.innerText = user.displayName ? user.displayName : "Anonymous";

      if (user && user.uid) {
        userInfo = user;
        const userId = user.uid;
        userRef = auth.getUserStats(userId);

        userRef.once('value').then(snapshot => {
          if (snapshot.val()) {
            profilePostsCount.innerText = snapshot.val().tweets ? snapshot.val().tweets : 0;
            profileLikesCount.innerText = snapshot.val().likes ? snapshot.val().likes : 0;
          }
        });

        userRef.on('child_changed', data => {
          if (data.key === 'tweets') {
            profilePostsCount.innerText = data.val() ? data.val() : 0;

          } else if (data.key == 'likes') {
            profileLikesCount.innerText = data.val() ? data.val() : 0;

          }
        })
      }
    } else {
      alert("Please login to display data.");
    }

  });

  tweetsDB.on('child_added', data => {
    if (!hasPosts) {
      hasPosts = true;
      loader.style.display = "none";
    }

    if (data.val() && data.val().message) {
      hasPosts = true;

      const htmlPost = post(data);
      const divWrapper = document.createElement("div");

      divWrapper.classList.add("post");
      divWrapper.innerHTML = htmlPost;
      postContainer.appendChild(divWrapper);

      if (data.key) {
        const postInfo = data.val();
        const buttons = document.body.querySelectorAll(`[data-id=${data.key}]`);

        [...buttons].forEach(button => {
          const postId = button.getAttribute("data-id");

          if (button.classList.contains("like-btn")) {
            button.addEventListener("click", (event) => {
              tweet.incrementLikes(postId);
              if (postInfo.userId === userInfo.uid) {
                changeUserReactions(+1);
              }
            });
          } else if (button.classList.contains("dislike-btn")) {
            button.addEventListener("click", (event) => {
              tweet.incrementDislikes(postId);

              if (postInfo.userId === userInfo.uid) {
                changeUserReactions(-1);
              }
            });

          } else if (button.classList.contains("post-close")) {
            button.addEventListener("click", (event) => {
              db.ref('tweets/').once('value').then(snapshot => {
                Object.keys(snapshot.val()).forEach(currentPostId => {
                  if (currentPostId === postId) {
                    const post = snapshot.val()[postId];

                    if (post && post.userId == userInfo.uid) {
                      tweet.delete(postId);
                      decrementUserPost();
                    } else {
                      alert("You can delete only onw posts.");
                    }
                  }
                })
              });
            });
          }
        })
      }
    }
  });

  tweetsDB.on('child_changed', data => {
    const postButtons = document.body.querySelectorAll(`[data-id=${data.key}]`);
    [...postButtons].forEach(button => {
      const parrentEl = button.parentElement;

      if (button.classList.contains("like-btn")) {
        const countContainer = parrentEl.getElementsByClassName('post-likes')[0];
        countContainer.innerText = data.val().likes;
      }
      else if (button.classList.contains("dislike-btn")) {
        const countContainer = parrentEl.getElementsByClassName('post-dislikes')[0];
        countContainer.innerText = data.val().dislikes;
      }
    })
  });

  function validateUser() {
    if (!firebase.auth().currentUser) {
      window.location = 'index.html?error=accessDenied';
      return false;
    }
    return true;
  }

  function decrementUserPost() {
    const userRef = auth.getUserStats(userInfo.uid);

    userRef.once('value').then(snapshot => {
      if (snapshot.val()) {
        const updatedPost = snapshot.val().tweets !== undefined ? snapshot.val().tweets - 1 : 0;
        userRef.update({ "tweets": updatedPost });
      }
    });
  }

  function changeUserReactions(number) {
    const userRef = auth.getUserStats(userInfo.uid);

    userRef.once('value').then(snapshot => {
      if (snapshot.val()) {
        const updatedLikes = snapshot.val().likes !== undefined ? snapshot.val().likes + number : 0;
        userRef.update({ "likes": updatedLikes });
      }
    });
  }

  function time_ago(time) {
    const time_formats = [
      [60, 'seconds', 1], // 60
      [120, '1 minute ago', '1 minute from now'], // 60*2
      [3600, 'minutes', 60], // 60*60, 60
      [7200, '1 hour ago', '1 hour from now'], // 60*60*2
      [86400, 'hours', 3600], // 60*60*24, 60*60
      [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
      [604800, 'days', 86400], // 60*60*24*7, 60*60*24
      [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
      [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
      [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
      [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
      [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];

    let seconds = (+new Date() - time) / 1000,
      token = 'ago',
      list_choice = 1;

    if (seconds === 0) {
      return 'Just now'
    }
    if (seconds < 0) {
      seconds = Math.abs(seconds);
      token = 'from now';
      list_choice = 2;
    }
    let i = 0, format;

    while (format = time_formats[i++])
      if (seconds < format[0]) {
        if (typeof format[2] === 'string')
          return format[list_choice];
        else
          return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
      }
    return time;
  }

})();