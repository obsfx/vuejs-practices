<template>
    <div class="Head">
        <div class="Head-search">
            <h1>VueJS Todo App</h1>
            <div class="Head-search-input">
                <input type="text" v-model="todoTask" @keypress.enter="addTodoEmit">
                <button type="button" @click="addTodoEmit">Add</button>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
  name: 'AddTodo',
    data() {
        return {
            todoTask: ""
        }
    },

    methods: {
        createTodoObject() {
            return {
                id: `task-id-${Math.random().toString(36).substr(2, 9)}--${Math.random().toString(36).substr(2, 9)}`,
                taskName: this.todoTask,
                done: false
            }
        },

        addTodoEmit() {
            if (this.todoTask) {
                const taskObject = this.createTodoObject();
                this.$emit("TaskAdded", taskObject);
                this.todoTask = "";
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import '../scss/components/AddTodo.scss';
</style>