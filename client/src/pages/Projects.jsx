import { useEffect, useState } from "react";
import { createProject, getProjects, createTask, getTasksByProject,updateTask } from "../services/api";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({ name: "", description: "" });
    const [selectedProject, setSelectedProject] = useState(null);
    const [tasks, setTasks] = useState([]);

    const [taskForm, setTaskForm] = useState({
        title: "",
        description: "",
        assigned_to: "",
        due_date: ""
    });

    const loadTasks = async (projectId) => {
        const res = await getTasksByProject(projectId);
        setTasks(res);
        setSelectedProject(projectId);
    };

    const handleCreateTask = async () => {
        const res = await createTask({
            ...taskForm,
            project_id: selectedProject
        });

        if (res.taskId) {
            setTaskForm({
                title: "",
                description: "",
                assigned_to: "",
                due_date: ""
            });

            loadTasks(selectedProject);
        } else {
            alert(res.msg);
        }
    };

    const changeStatus = async (id, status) => {
        await updateTask(id, status);
        loadTasks(selectedProject);
    };

    // Load projects
    const loadProjects = async () => {
        const res = await getProjects();
        setProjects(res);
    };

    useEffect(() => {
        loadProjects();
    }, []);

    // Create project
    const handleCreate = async () => {
        if (!form.name) return alert("Name required");

        const res = await createProject(form);

        if (res.projectId) {
            setForm({ name: "", description: "" });
            loadProjects();
        } else {
            alert(res.msg);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Projects</h1>

            {/* CREATE PROJECT */}
            <div className="bg-white p-4 shadow rounded mb-6">
                <h2 className="font-semibold mb-2">Create Project</h2>

                <input
                    className="border p-2 w-full mb-2"
                    placeholder="Project Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <textarea
                    className="border p-2 w-full mb-2"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                />

                <button
                    onClick={handleCreate}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Create
                </button>
            </div>

            {/* LIST PROJECTS */}
            <div>
                <h2 className="font-semibold mb-2">My Projects</h2>

                {projects.length === 0 ? (
                    <p>No projects found</p>
                ) : (
                    <div className="grid gap-3">
                       {projects.map((p) => (
    <div
        key={p.id}
        onClick={() => {
            setSelectedProject(p.id);
            loadTasks(p.id);
        }}
        className="border p-3 rounded cursor-pointer hover:bg-gray-100"
    >
        <h3 className="font-bold">{p.name}</h3>
        <p className="text-sm text-gray-600">{p.description}</p>
    </div>
))}
                    </div>
                )}
            </div>
            {selectedProject && (
                <div className="mt-6">
                    <h2 className="font-bold text-lg mb-2">Tasks</h2>

                    {/* CREATE TASK */}
                    <div className="bg-white p-4 shadow rounded mb-4">
                        <input
                            className="border p-2 w-full mb-2"
                            placeholder="Task Title"
                            value={taskForm.title}
                            onChange={(e) =>
                                setTaskForm({ ...taskForm, title: e.target.value })
                            }
                        />

                        <input
                            className="border p-2 w-full mb-2"
                            placeholder="Assign To (User ID)"
                            value={taskForm.assigned_to}
                            onChange={(e) =>
                                setTaskForm({ ...taskForm, assigned_to: e.target.value })
                            }
                        />

                        <input
                            type="date"
                            className="border p-2 w-full mb-2"
                            onChange={(e) =>
                                setTaskForm({ ...taskForm, due_date: e.target.value })
                            }
                        />

                        <button
                            onClick={handleCreateTask}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Create Task
                        </button>
                    </div>

                    {/* TASK LIST */}
                    <div className="grid gap-3">
                        {tasks.map((t) => (
                            <div key={t.id} className="border p-3 rounded">
                                <h3 className="font-bold">{t.title}</h3>
                                <p className="text-sm">{t.description}</p>
                                <p className="text-xs text-gray-500">
                                    Status: {t.status}
                                </p>

                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={() => changeStatus(t.id, "todo")}
                                        className="px-2 py-1 bg-gray-200"
                                    >
                                        Todo
                                    </button>

                                    <button
                                        onClick={() => changeStatus(t.id, "in-progress")}
                                        className="px-2 py-1 bg-yellow-200"
                                    >
                                        Progress
                                    </button>

                                    <button
                                        onClick={() => changeStatus(t.id, "done")}
                                        className="px-2 py-1 bg-green-200"
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}