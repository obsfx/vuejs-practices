<template>
    <div>
		<div class="userInfo">
			<div><strong> <i class="fas fa-user-astronaut"></i> username : </strong> {{ userData.username }}</div>
			<div><strong> <i class="fas fa-key" style="margin-left: -1px"></i> userkey : </strong> {{ userData.userkey }}</div>
			<div><a href="javascript:void()" @click="emitLogOut">Log Out</a></div>
		</div>
      	<AddTodo v-on:TaskAdded="addTask"></AddTodo>
      	<List :todos=todos 
	  		v-on:EmitDeleteTask="deleteTask"
			v-on:EmitUpdateTask="updateTask"
			v-on:EmitToggleTask="toggleTask">
		</List>
    </div>
</template>

<script>
	import AddTodo from "./AddTodo";
	import List from "./List";
	import service from "../service";

	export default {
		name: "Main",
		components: { AddTodo, List },
		props: {
			userData: { type: Object, required: true }
		},
		data() {
			return {
				todos: []
			}
		},
		created() {
			this.getTasks();
		},
		methods: {
			getTasks() {
				service.getTodos(this.userData.userkey)
				.then((res) => this.todos = res);
			},

			addTask(taskData) {
				taskData.userkey = this.userData.userkey;
				service.addTodo(taskData)
				.then(() => this.getTasks());
			},

			deleteTask(id) {
				service.deleteTodo(id)
				.then(() => this.getTasks());
			},

			updateTask(obj) {
				service.updateTodo(obj)
				.then(() => this.getTasks());
			},

			toggleTask(obj) {
				service.updateTodoStatus(obj);
			},
			 
			emitLogOut() {
				this.$emit("LogOut");
			}
		}
	};
</script>
