export default {
    db: firebase.database(),

    authUser(username, pass) {
        return this.db.ref("users").orderByChild("username").equalTo(username).once("value").then((snapshot) => {
            if (snapshot.val() != null) {
                const userKey = Object.keys(snapshot.val())[0];
                const userPass = snapshot.val()[userKey].password;
                return (userPass == pass) ? userKey : false;
            } else {
                return false;
            } 
        });
    },

    thisUsernameAlreadyExist(username) {
        return this.db.ref("users").orderByChild("username").equalTo(username).once("value").then((snapshot) => {
            return (snapshot.val() != null) ? true : false;
        });
    },

    setNewUser(username, pass) {
        return this.db.ref(`users/user-id-${Math.random().toString(36).substr(2, 9)}--${Math.random().toString(36).substr(2, 9)}`).set({
            username: username,
            password: pass
        });
    },

    getSignUpStatus() {
        return this.db.ref("appOptions/signUpStatus").once("value").then((res) => res.val());
    },

    getTodos(userkey) {
        return this.db.ref("todos").orderByChild("userkey").equalTo(userkey).once("value").then((snapshot) => {
            if (snapshot.val() != null) {
                let taskData = [];
                const taskKeys = Object.keys(snapshot.val());

                taskKeys.forEach((key) => {
                    taskData.push(snapshot.val()[key]);
                });

                taskData.sort((a, b) => {
                    return b.time - a.time;
                })

                return taskData;
            } else {
                return [];
            } 
        });
    },

    addTodo(taskData) {
        return this.db.ref(`todos/${taskData.id}`).set({
            taskName: taskData.taskName,
            done: taskData.done,
            userkey: taskData.userkey,
            taskkey: taskData.id,
            time: new Date().getTime()
        });
    },

    deleteTodo(taskid) {
        return this.db.ref(`todos/${taskid}`).remove();
    },

    updateTodo(obj) {
        return this.db.ref(`todos/${obj.taskkey}`).update({
            taskName: obj.value,
            time: new Date().getTime()
        });
    },

    updateTodoStatus(obj) {
        return this.db.ref(`todos/${obj.taskkey}`).update({
            done: obj.value
        });
    }
}