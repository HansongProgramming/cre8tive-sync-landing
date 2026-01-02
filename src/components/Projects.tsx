const Projects: React.FC = () => {
    return (
        <section id="projects" className="max-w-7xl mx-auto py-20 px-4">
            <h2 className="text-2xl font-semibold mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border p-6 rounded">Project One</div>
                <div className="border p-6 rounded">Project Two</div>
                <div className="border p-6 rounded">Project Three</div>
            </div>
        </section>
    );
};


export default Projects;