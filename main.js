// I want you to create one function called updateLastUserActivityTime which returns a promise.
// Every time the user creates a post, the user's lastActivity time should get called (should execute in 1 second)
// .When both the promises resolve (createPost and updateLastUserActivityTime ),
// I want you to console log all the posts created and lastActivityTime of the user. [If stuck for long watch the hint 2]
// Once both the above promises are resolved , I want you to delete the last post by calling the deletion promise. Once successfully deleted, I want you to log the new set of Posts of the user.

function createPost() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          name: "John Doe",
          lastseen:new Date()
        };
        resolve(newUser);
      }, 1000);
    });
  }
  
  function updateLastUserActivityTime(user) {
    return new Promise((resolve) => {
      setTimeout(() => {
        user.lastActivityTime = new Date(); 
        resolve(user);
      }, 1000);
    });
  }
  
  function deleteUser(user) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(user.lastseen);
      }, 1000);
    });
  }
  
  function logUsers(users) {
    console.log("Users:", users);
  }
  
  // Create users and update lastActivityTime
  const createUserPromise = createPost();
  const updateLastActivityTimePromise = createUserPromise.then(updateLastUserActivityTime);
  
  Promise.all([createUserPromise, updateLastActivityTimePromise])
    .then(([user, updatedUser]) => {
      console.log("User created:", user);
      console.log("Last activity time updated:", updatedUser.lastActivityTime);
  
      // Delete the last user
      deleteUser(updatedUser)
        .then(deletedUser => {
          console.log(`User with lastseen ${deletedUser} deleted.`);
          const remainingUsers = [user]; // Assuming only one user is created for simplicity
          logUsers(remainingUsers);
        })
        .catch(error => {
          console.error("Failed to delete the user:", error);
        });
    })
    .catch(error => {
      console.error("Failed to create or update user:", error);
    });
  