const Footer: React.FC = () => {
    return (
        <footer className="border-t">
            <div className="max-w-7xl mx-auto p-6 flex justify-between">
                <div>© {new Date().getFullYear()} Creative Sync</div>
                <div className="flex gap-4">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                </div>
            </div>
        </footer>
    );
};


export default Footer;