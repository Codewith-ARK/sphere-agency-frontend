import { create } from 'zustand';
import axiosClient from '@/utils/axiosClient';

export const useTaskStore = create((set, get) => ({
    tasks: {},
    loading: false,
    
    fetchTasks: async (url) => {
        try {
            set({ loading: true });
            const { data } = await axiosClient.get("/api/tasks/kanban/");
            set({ tasks: data });
        } catch (err) {
            console.error("Kanban Board Error:", err.message);
        } finally {
            set({ loading: false });
        }
    },

    updateTaskStatus: async (taskId, newStatus) => {
        const { tasks } = get();
        try {
            // Optimistically update UI
            const updatedTasks = { ...tasks };
            let taskToMove;
            
            // Find and remove task from its current status
            Object.keys(updatedTasks).forEach(status => {
                const taskIndex = updatedTasks[status]?.findIndex(t => t.id === taskId);
                if (taskIndex !== -1 && taskIndex !== undefined) {
                    taskToMove = updatedTasks[status][taskIndex];
                    updatedTasks[status] = updatedTasks[status].filter(t => t.id !== taskId);
                }
            });

            // Add task to new status
            if (taskToMove) {
                updatedTasks[newStatus] = [...(updatedTasks[newStatus] || []), { ...taskToMove, status: newStatus }];
                set({ tasks: updatedTasks });
            }

            // Make API call to update backend
            const {data} = await axiosClient.patch(`/api/tasks/${taskId}/update-status/`, { status: newStatus });

            return data;

        } catch (err) {
            console.error("Task Update Error:", err.message);
            // Revert optimistic update on error
            get().fetchTasks();

            return {error: err?.response?.data?.error}
        }
    },

    assignEmployee: async (taskId, employeeId) => {
        const { tasks } = get();
        try {
            // Find the task in any status column
            const updatedTasks = { ...tasks };
            let taskToUpdate;
            let taskStatus;

            // Find the task and its status
            Object.keys(updatedTasks).forEach(status => {
                const taskIndex = updatedTasks[status]?.findIndex(t => t.id === taskId);
                if (taskIndex !== -1 && taskIndex !== undefined) {
                    taskToUpdate = { ...updatedTasks[status][taskIndex] };
                    taskStatus = status;
                    // Update the task in place
                    updatedTasks[status][taskIndex] = {
                        ...taskToUpdate,
                        assigned_to: employeeId
                    };
                }
            });

            if (taskToUpdate && taskStatus) {
                // Update UI optimistically
                set({ tasks: updatedTasks });

                // Make API call to update backend
                const { data } = await axiosClient.post(`/api/tasks/${taskId}/assign/`, {
                    employeeId
                });

                return data;
            }
        } catch (err) {
            console.error("Task Assignment Error:", err.message);
            // Revert optimistic update on error
            get().fetchTasks();

            return { error: err?.response?.data?.error }
        }
    },

    deleteTask: async (taskId) => {
        const { tasks } = get();
        const originalTasks = { ...tasks };
        
        try {
            // Find and remove task from its current status
            const updatedTasks = { ...tasks };
            let taskStatus;

            // Find which status the task is in
            Object.keys(updatedTasks).forEach(status => {
                if (updatedTasks[status]?.some(t => t.id === taskId)) {
                    taskStatus = status;
                }
            });

            if (taskStatus) {
                // Optimistically update UI
                updatedTasks[taskStatus] = updatedTasks[taskStatus].filter(t => t.id !== taskId);
                set({ tasks: updatedTasks });

                // Make API call to backend
                const { data } = await axiosClient.delete(`/api/tasks/${taskId}/delete/`);
                return data;
            }

            throw new Error('Task not found');

        } catch (err) {
            console.error("Task Delete Error:", err.message);
            // Revert to original state on error
            set({ tasks: originalTasks });
            return { 
                error: err?.response?.data?.error || "Failed to delete task" 
            };
        }
    }
}));
