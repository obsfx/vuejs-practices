<template>
    <div class="List-item" :class="{done: taskObject.done}">

        <div class="List-item-head">
            <div class="List-item-head-checkbox" v-if="!editMode">
                <input  type="checkbox" 
                        :id="_uid" 
                        v-model="taskObject.done"
                        @change="toggleTask">
                <label :for="_uid">
                    <i class="fas fa-check"></i>
                </label>
            </div>
            <textarea   class="List-item-head-input textarea" 
                        type="text" 
                        v-model="itemValue" 
                        v-if="editMode">
            </textarea>

            <div class="List-item-head-input" v-if="!editMode" 
                :class="{isDone: taskObject.done}">
                {{ itemValue }}
                <p class="List-item-head-input-date">
                    <strong>Last Update :</strong> 
                    {{ lastUpdate }}
                </p>
            </div>
        </div>

        <div class="List-item-body">
            <button class="List-item-body-option"
                    v-if="!deleteDecision"
                    @click="deleteTask">
                <i class="fas fa-trash"></i>
                Delete
            </button>

            <button class="List-item-body-option deleteButton"
                    v-if="deleteDecision"
                    @click="deleteTaskEmit">
                <i class="fas fa-trash"></i>
                Are you sure ?
            </button>

            <button class="List-item-body-option"
                    v-if="deleteDecision"
                    @click="cancelTask">
                <i class="fas fa-times"></i>
                Cancel
            </button>

            <button class="List-item-body-option" 
                    @click="toggleEditMode" 
                    :class="{isEditting: editMode}" 
                    v-if="!taskObject.done && !deleteDecision">
                    
                <i class="fas fa-pen"></i>
                <span v-if="!editMode">Edit</span>
                <span v-if="editMode">Update Task</span>
            </button>
        </div>

    </div>
</template>

<script>

export default {
    name: 'ListItem',
    props: {
        taskObject: {type: Object, required: true}
    },
    data() {
        return {
            itemValue: this.taskObject.taskName,
            editMode: false,
            deleteDecision: false
        }
    },
    computed: {
        lastUpdate() {
            const date = new Date(this.taskObject.time);

            const day = date.getUTCDate();
            const month = date.getUTCMonth() + 1;
            const year = date.getUTCFullYear();

            let h = date.getUTCHours() + 3;
            let m = date.getUTCMinutes();

            if (h < 10) h = `0${h}`;
            if (m < 10) m = `0${m}`;

            return `${day} / ${month} / ${year} - ${h}:${m}`;
        }
    },
    methods: {
        toggleEditMode() {
            if (this.editMode) this.updateTask();
            this.editMode = !this.editMode;
        },

        toggleTask() {
            this.$emit("TaskToggled", {taskkey: this.taskObject.taskkey, value: this.taskObject.done});
        },

        updateTask() {
            if (this.itemValue != this.taskObject.taskName) 
            this.$emit("TaskUpdated", {taskkey: this.taskObject.taskkey, value: this.itemValue});
        },

        deleteTask() {
            if (!this.deleteDecision) 
            this.deleteDecision = true;
        },

        cancelTask() {
            this.deleteDecision = false;
        },

        deleteTaskEmit() {
            this.$emit("TaskDeleted", this.taskObject.taskkey);
        }
    }
}
</script>
