const Contact: React.FC = () => {
return (
<section id="contact" className="max-w-5xl mx-auto py-20 px-4">
<h2 className="text-2xl font-semibold mb-6">Start a Project</h2>
<form className="grid grid-cols-1 gap-6 max-w-xl">
<input type="text" placeholder="Name" className="border p-3 rounded" />
<input type="email" placeholder="Email" className="border p-3 rounded" />
<textarea placeholder="Project details" className="border p-3 rounded" rows={4} />
<button type="submit" className="px-6 py-3 border rounded">Submit</button>
</form>
</section>
);
};


export default Contact;