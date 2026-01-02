const Header: React.FC = () => {
    return (
        <header className="w-full">
            <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
                <div className="font-bold text-lg">Creative Sync</div>
                <ul className="flex gap-6">
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#values">Values</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <button className="px-4 py-2 border rounded">Start Project</button>
            </nav>
        </header>
    );
};


export default Header;