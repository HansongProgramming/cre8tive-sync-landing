import React, { useState, useRef } from "react";
import "./ServiceQuote.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const services = [
  { name: "Web Development", price: 12000 },
  { name: "Mobile Development", price: 15000 },
  { name: "Manuscript Writing", price: 4999 },
  { name: "Technical Consultations", price: 1999, defaultChecked: true },
];

const addons = [
  { name: "Data Analytics", price: 2500 },
  { name: "Artificial Intelligence", price: 3999 },
  { name: "Augmented Reality", price: 4599 },
  { name: "Virtual Reality", price: 4599 },
  { name: "Computer Vision", price: 6500 },
];

const bundles = [
  {
    name: "Master of Emerging tech",
    price: 7599,
    includes: [
      "Data Analytics",
      "Artificial Intelligence",
      "Augmented Reality",
      "Virtual Reality",
      "Computer Vision",
    ],
  },
  {
    name: "AI Pack",
    price: 5999,
    includes: ["Data Analytics", "Artificial Intelligence", "Computer Vision"],
  },
  {
    name: "Virtual Pack",
    price: 5999,
    includes: ["Virtual Reality", "Augmented Reality"],
  },
];

const maintenance = [
  { name: "Backend", price: 2500 },
  { name: "Frontend", price: 1000 },
  { name: "Full stack", price: 3000 },
];

function ServiceQuote() {
  const [selected, setSelected] = useState(() => ({ "Technical Consultations": true }));
  const quoteRef = useRef<HTMLDivElement>(null);
  const confirmBtnRef = useRef<HTMLButtonElement>(null);

  // Shake animation for empty state
  const shakeButton = () => {
    if (confirmBtnRef.current) {
      confirmBtnRef.current.style.animation = 'shake 0.5s';
      setTimeout(() => {
        if (confirmBtnRef.current) confirmBtnRef.current.style.animation = '';
      }, 500);
    }
  };

  const handleToggle = (name: string) => {
    setSelected((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleBundle = (bundle: typeof bundles[0]) => {
    setSelected((prev) => {
      const newSelected = { ...prev };
      bundle.includes.forEach((name) => {
        newSelected[name] = true;
      });
      return newSelected;
    });
  };

  const handleConfirm = async () => {
    const selectedCount = Object.values(selected).filter(Boolean).length;
    if (selectedCount === 0) {
      shakeButton();
      return;
    }
    if (!quoteRef.current) return;
    const element = quoteRef.current;
    // Generate image
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    // Generate PDF
    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    // Scale image to fit page
    const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
    const width = imgWidth * ratio;
    const height = imgHeight * ratio;
    pdf.addImage(imgData, "PNG", (pageWidth - width) / 2, 40, width, height);
    pdf.save("service-quote.pdf");
    // Optionally, allow user to download image
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "service-quote.png";
    link.click();
  };

  const getTotal = () => {
    let total = 0;
    services.forEach((s) => {
      if (selected[s.name]) total += s.price;
    });
    addons.forEach((a) => {
      if (selected[a.name]) total += a.price;
    });
    maintenance.forEach((m) => {
      if (selected[m.name]) total += m.price;
    });
    // Bundles override individual prices
    bundles.forEach((b) => {
      if (selected[b.name]) {
        b.includes.forEach((name) => {
          selected[name] = false;
        });
        total += b.price;
      }
    });
    return total;
  };

  // Animate total value
  const [animatedTotal, setAnimatedTotal] = useState(getTotal());
  React.useEffect(() => {
    const start = animatedTotal;
    const end = getTotal();
    if (start === end) return;
    const duration = 300;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      setAnimatedTotal(value);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTotal()]);

  return (
    <div className="service-quote-glass">
      <h2 className="text-4xl font-bold mb-2 tracking-tight">Service Quote</h2>
      <div className="service-quote-box" ref={quoteRef}>
        <div className="divider-glass" />
        <h3>Services</h3>
        {services.map((s) => (
          <div className={`glass-card rounded-xl p-4 flex items-center justify-between service-item ${selected[s.name] ? 'selected' : ''}`} key={s.name}>
            <div className="flex items-center gap-4 flex-1">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={!!selected[s.name]}
                onChange={() => handleToggle(s.name)}
                disabled={s.defaultChecked}
              />
              <div className="flex-1">
                <span className="font-semibold text-lg">{s.name}</span>
                <span className="text-sm text-gray-500 ml-2">{s.price.toLocaleString()} Pesos</span>
              </div>
            </div>
            <div className="price-tag ml-4">{s.price.toLocaleString()} Pesos</div>
          </div>
        ))}
        <div className="divider-glass" />
        <h3>Addons</h3>
        {addons.map((a) => (
          <div className={`glass-card rounded-xl p-4 flex items-center justify-between service-item ${selected[a.name] ? 'selected' : ''}`} key={a.name}>
            <div className="flex items-center gap-4 flex-1">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={!!selected[a.name]}
                onChange={() => handleToggle(a.name)}
              />
              <div className="flex-1">
                <span className="font-semibold text-lg">{a.name}</span>
                <span className="text-sm text-gray-500 ml-2">{a.price.toLocaleString()} Pesos</span>
              </div>
            </div>
            <div className="price-tag ml-4">{a.price.toLocaleString()} Pesos</div>
          </div>
        ))}
        <div className="divider-glass" />
        <h3>Bundles</h3>
        {bundles.map((b) => (
          <div className={`glass-card rounded-xl p-4 flex items-center justify-between service-item ${selected[b.name] ? 'selected' : ''}`} key={b.name}>
            <div className="flex items-center gap-4 flex-1">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={!!selected[b.name]}
                onChange={() => handleToggle(b.name)}
              />
              <div className="flex-1">
                <span className="font-semibold text-lg">{b.name}</span>
                <span className="text-sm text-gray-500 ml-2">{b.price.toLocaleString()} Pesos</span>
              </div>
            </div>
            <button type="button" className="price-tag ml-4" onClick={() => handleBundle(b)}>
              Select Bundle
            </button>
          </div>
        ))}
        <div className="divider-glass" />
        <h3>Monthly Maintenance (optional)</h3>
        {maintenance.map((m) => (
          <div className={`glass-card rounded-xl p-4 flex items-center justify-between service-item ${selected[m.name] ? 'selected' : ''}`} key={m.name}>
            <div className="flex items-center gap-4 flex-1">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={!!selected[m.name]}
                onChange={() => handleToggle(m.name)}
              />
              <div className="flex-1">
                <span className="font-semibold text-lg">{m.name}</span>
                <span className="text-sm text-gray-500 ml-2">{m.price.toLocaleString()} Pesos</span>
              </div>
            </div>
            <div className="price-tag ml-4">{m.price.toLocaleString()} Pesos</div>
          </div>
        ))}
        <div className="divider-glass" />
        {/* Selected Items Summary */}
        {Object.values(selected).filter(Boolean).length > 0 && (
          <div className="glass-card rounded-2xl p-6 mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3">Selected Services</h4>
            <ul className="space-y-2 text-sm">
              {Object.entries(selected)
                .filter(([name, checked]) => checked)
                .map(([name]) => (
                  <li key={name} className="flex justify-between items-center">
                    <span>{name}</span>
                    <span className="font-mono">
                      {(() => {
                        const all = [...services, ...addons, ...maintenance, ...bundles];
                        const item = all.find(i => i.name === name);
                        return item ? item.price.toLocaleString() + ' Pesos' : '';
                      })()}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        )}
        {/* Total Section */}
        <div className="glass-card rounded-2xl p-6 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider">Total Estimate</p>
            <p className="text-xs mt-1" id="itemCount">
              {Object.values(selected).filter(Boolean).length} item{Object.values(selected).filter(Boolean).length !== 1 ? 's' : ''} selected
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-light">₱</span>
            <span className="text-5xl font-bold total-glow tracking-tight">{animatedTotal.toLocaleString()}</span>
          </div>
        </div>
        {/* Action Button */}
        <button
          ref={confirmBtnRef}
          className="service-quote-confirm w-full mt-6 bg-white/20 hover:bg-white/30 font-semibold py-4 rounded-xl border border-white/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm"
          onClick={handleConfirm}
        >
          Confirm & Generate PDF/Image
        </button>
      </div>
    </div>
  );
}

export { ServiceQuote };
