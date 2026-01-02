const Hero: React.FC = () => {
    return (
        <section className="max-w-5xl mx-auto text-center py-24 px-4">
            <h1 className="text-4xl font-semibold mb-6">Be Creative. Start the Sync.</h1>
            <p className="max-w-3xl mx-auto mb-10">
                We engineer custom software, autonomous AI, immersive AR, and advanced digital platforms with precision, intent, and long-term performance in mind.
            </p>
            <div className="flex justify-center gap-4">
                <button className="px-6 py-3 border rounded">Explore Projects</button>
                <button className="px-6 py-3 border rounded">Our Vision</button>
            </div>
        </section>
    );
};


export default Hero;