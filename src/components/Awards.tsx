const Awards: React.FC = () => {
    return (
        <section className="max-w-7xl mx-auto py-20 px-4">
            <h2 className="text-2xl font-semibold mb-6">Recognition</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border p-6 rounded">Community Impact Award – 2025</div>
                <div className="border p-6 rounded">Innovation Award – 2025</div>
                <div className="border p-6 rounded">Champion Award – 2025</div>
            </div>
        </section>
    );
};


export default Awards;