<template>
    <div class="List">
        <h3 v-if="todos.length == 0">
            Loading...
        </h3>

        <div v-for="todo in todos" :key="todo.taskkey">
            <ListItem   :taskObject=todo 
                        v-on:TaskDeleted="deleteTask"
                        v-on:TaskUpdated="updateTask"
                        v-on:TaskToggled="toggleTask">
            </ListItem>
        </div>
    </div>
</template>

<script>
    import ListItem from './ListItem';

    export default {
        name: 'List',
        components: { ListItem },
        props: {
            todos: {type: Array, required: true}
        },
        methods: {
            deleteTask(id) {
                this.$emit("EmitDeleteTask", id);
            }, 

            updateTask(obj) {
                this.$emit("EmitUpdateTask", obj);
            },

            toggleTask(obj) {
                this.$emit("EmitToggleTask", obj);
            }
        }
}
</script>

<style lang="scss">
    @import '../scss/components/List.scss';
</style>
