import React, { useState, useRef, useEffect } from "react";
import "./ServiceQuote.css";

interface Service {
  id: string;
  name: string;
  price: number;
  category: 'core' | 'addon' | 'bundle' | 'maintenance';
  description: string;
  default?: boolean;
  includes?: string[];
  savings?: string;
  conflicts?: string[];
}

const SERVICES: Service[] = [
  // Core Services
  { id: 'web', name: "Web Development", price: 12000, category: 'core', description: "Base Price" },
  { id: 'mobile', name: "Mobile Development", price: 15000, category: 'core', description: "Base Price" },
  { id: 'iot', name: "IoT Solutions", price: 8999, category: 'core', description: "Internet of Things integration (Subject to Change)" },
  { id: 'manuscript', name: "Manuscript Writing", price: 4999, category: 'core', description: "Technical documentation" },
  { id: 'consult', name: "Technical Consultations", price: 1999, category: 'core', description: "Expert guidance", default: true },
  { id: 'pitchdeck', name: "Pitch Deck Design", price: 6599, category: 'core', description: "Professional pitch decks" },
  { id: 'slides', name: "Slide Design", price: 4500, category: 'core', description: "Professional slide decks" },

  // Add-ons
  { id: 'data', name: "Data Analytics", price: 2500, category: 'addon', description: "Business intelligence" },
  { id: 'ai', name: "Artificial Intelligence", price: 3999, category: 'addon', description: "ML & AI integration" },
  { id: 'ar', name: "Augmented Reality", price: 4599, category: 'addon', description: "AR experiences" },
  { id: 'vr', name: "Virtual Reality", price: 4599, category: 'addon', description: "VR development" },
  { id: 'cv', name: "Computer Vision", price: 6500, category: 'addon', description: "Image recognition" },

  // Bundles
  {
    id: 'master', name: "Master of Emerging Tech", price: 9599, category: 'bundle', description: "All emerging tech included",
    includes: ['data', 'ai', 'ar', 'vr', 'cv'], savings: "Save ₱14,598"
  },
  {
    id: 'aipack', name: "AI Pack", price: 5999, category: 'bundle', description: "Data + AI + Vision",
    includes: ['data', 'ai', 'cv'], savings: "Save ₱7,000"
  },
  {
    id: 'virtualpack', name: "Virtual Pack", price: 5999, category: 'bundle', description: "VR + AR combined",
    includes: ['vr', 'ar'], savings: "Save ₱3,199"
  },
  {
    id: 'presentors', name: "The Presentors", price: 6599, category: 'bundle', description: "Pitch Deck + Slides combo",
    includes: ['pitchdeck', 'slides'], savings: "Save ₱3,199"
  },

  // Maintenance
  { id: 'maint_backend', name: "Backend Maintenance", price: 2500, category: 'maintenance', description: "Monthly backend support" },
  { id: 'maint_frontend', name: "Frontend Maintenance", price: 1000, category: 'maintenance', description: "Monthly frontend support" },
  {
    id: 'maint_full', name: "Full Stack Maintenance", price: 3000, category: 'maintenance', description: "Complete maintenance",
    conflicts: ['maint_backend', 'maint_frontend']
  }
];

function ServiceQuote() {
  const [selectedServices, setSelectedServices] = useState<Set<string>>(() => new Set(['consult']));
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [invoiceBlob, setInvoiceBlob] = useState<Blob | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '', visible: false });
  const [categoriesData, setCategoriesData] = useState({
    core: [] as JSX.Element[],
    addon: [] as JSX.Element[],
    bundle: [] as JSX.Element[],
    maintenance: [] as JSX.Element[]
  });
  const [selectedCount, setSelectedCount] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confirmBtnRef = useRef<HTMLButtonElement>(null);
  const logoImageRef = useRef<HTMLImageElement | null>(null);

  // Preload logo
  useEffect(() => {
    const img = new Image();
    img.src = '/dark.png';
    img.onload = () => {
      logoImageRef.current = img;
    };
  }, []);

  const isServiceDisabled = (service: Service): boolean => {
    if (service.category === 'addon') {
      const activeBundles = SERVICES.filter(s => s.category === 'bundle' && selectedServices.has(s.id));
      for (let bundle of activeBundles) {
        if (bundle.includes && bundle.includes.includes(service.id)) {
          return true;
        }
      }
    }

    if (service.conflicts) {
      for (let conflictId of service.conflicts) {
        if (selectedServices.has(conflictId)) return true;
      }
    }

    if (service.id === 'maint_backend' && selectedServices.has('maint_full')) return true;
    if (service.id === 'maint_frontend' && selectedServices.has('maint_full')) return true;

    return false;
  };

  const toggleService = (id: string) => {
    const service = SERVICES.find(s => s.id === id);
    if (!service) return;

    setSelectedServices(prev => {
      const newSet = new Set(prev);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);

        if (service.conflicts) {
          service.conflicts.forEach(conflictId => newSet.delete(conflictId));
        }
      }

      return newSet;
    });
  };

  const renderCategory = (category: 'core' | 'addon' | 'bundle' | 'maintenance'): JSX.Element[] => {
    const categoryServices = SERVICES.filter(s => s.category === category);

    return categoryServices.map(service => {
      const isSelected = selectedServices.has(service.id);
      const isDisabled = isServiceDisabled(service);
      const isDefault = service.default;

      let badges = '';
      if (isDefault) badges += `<span class="default-badge px-2 py-0.5 rounded text-xs font-bold mr-2">DEFAULT</span>`;
      if (service.savings) badges += `<span class="savings-badge px-2 py-0.5 rounded text-xs font-bold mr-2">${service.savings}</span>`;
      if (service.includes) badges += `<span class="bundle-badge px-2 py-0.5 rounded text-white text-xs mr-2">BUNDLE</span>`;

      let priceTagClass = 'price-tag';
      if (category === 'bundle') priceTagClass = 'price-tag-bundle';
      else if (category === 'addon') priceTagClass = 'price-tag-addon';
      else if (category === 'maintenance') priceTagClass = 'price-tag-maintenance';

      return (
        <div
          key={service.id}
          className={`service-item glass-card rounded-lg compact-row flex items-center justify-between group ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
          onClick={() => !isDisabled && toggleService(service.id)}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={isSelected}
              disabled={isDisabled}
              onClick={(e) => e.stopPropagation()}
              onChange={() => toggleService(service.id)}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center flex-wrap gap-1">
                <h3 className="text-white font-semibold text-sm truncate">{service.name}</h3>
                {badges && <div className="badges-container" dangerouslySetInnerHTML={{ __html: badges }} />}
              </div>
              <p className="text-white/60 text-xs truncate">{service.description}</p>
            </div>
          </div>
          <div className={`${priceTagClass} rounded-md px-3 py-1.5 ml-2 shrink-0`}>
            <span className="price-text text-white font-bold text-sm">₱{service.price.toLocaleString()}</span>
          </div>
        </div>
      );
    });
  };

  // Render categories whenever selectedServices changes
  useEffect(() => {
    setCategoriesData({
      core: renderCategory('core'),
      addon: renderCategory('addon'),
      bundle: renderCategory('bundle'),
      maintenance: renderCategory('maintenance')
    });
  }, [selectedServices]);

  // Update UI - Calculate total and count
  useEffect(() => {
    let total = 0;
    const countedServices = new Set<string>();

    for (let id of selectedServices) {
      const service = SERVICES.find(s => s.id === id);
      if (!service || isServiceDisabled(service)) continue;

      if (service.category === 'bundle') {
        total += service.price;
        if (service.includes) {
          service.includes.forEach(includedId => countedServices.add(includedId));
        }
      } else if (!countedServices.has(id)) {
        total += service.price;
      }
    }

    const currentTotal = animatedTotal;
    if (currentTotal === total) return;

    const duration = 300;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (total - currentTotal) + currentTotal);
      setAnimatedTotal(value);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);

    // Calculate count
    let count = 0;
    for (let id of selectedServices) {
      const service = SERVICES.find(s => s.id === id);
      if (service && !isServiceDisabled(service)) count++;
    }
    setSelectedCount(count);
  }, [selectedServices]);

  const generateInvoice = () => {
    const activeServices = [];
    for (let id of selectedServices) {
      const service = SERVICES.find(s => s.id === id);
      if (service && !isServiceDisabled(service)) {
        activeServices.push(service);
      }
    }

    if (activeServices.length === 0) {
      if (confirmBtnRef.current) {
        confirmBtnRef.current.style.animation = 'shake 0.5s';
        setTimeout(() => {
          if (confirmBtnRef.current) confirmBtnRef.current.style.animation = '';
        }, 500);
      }
      return;
    }

    const total = activeServices.reduce((sum, s) => sum + s.price, 0);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 800;
    const lineHeight = 35;
    const padding = 40;
    const headerHeight = 120;
    const footerHeight = 100;
    const serviceHeight = activeServices.length * lineHeight;
    const height = headerHeight + serviceHeight + footerHeight + padding * 2;

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    if (logoImageRef.current) {
      const logoHeight = 50;
      const logoWidth = (logoImageRef.current.width / logoImageRef.current.height) * logoHeight;
      const logoX = (width - logoWidth) / 2;
      ctx.drawImage(logoImageRef.current, logoX, padding - 10, logoWidth, logoHeight);
    }

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 32px Inter, sans-serif';
    ctx.fillText('SERVICE QUOTE', padding, padding + 40);

    ctx.fillStyle = '#666666';
    ctx.font = '16px Inter, sans-serif';
    ctx.fillText('Creative Sync', padding, padding + 70);
    ctx.fillText(new Date().toLocaleDateString(), width - padding - 150, padding + 70);

    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, headerHeight);
    ctx.lineTo(width - padding, headerHeight);
    ctx.stroke();

    let yPos = headerHeight + padding + 10;
    activeServices.forEach((service) => {
      ctx.fillStyle = '#000000';
      ctx.font = '18px Inter, sans-serif';
      ctx.fillText(service.name, padding, yPos);

      ctx.font = 'bold 18px Inter, sans-serif';
      const priceText = '₱' + service.price.toLocaleString();
      const priceWidth = ctx.measureText(priceText).width;
      ctx.fillText(priceText, width - padding - priceWidth, yPos);

      yPos += lineHeight;
    });

    yPos += 20;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(padding, yPos);
    ctx.lineTo(width - padding, yPos);
    ctx.stroke();

    yPos += 40;
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillText('TOTAL ESTIMATE', padding, yPos);

    ctx.font = 'bold 28px Inter, sans-serif';
    const totalText = '₱' + total.toLocaleString();
    const totalWidth = ctx.measureText(totalText).width;
    ctx.fillText(totalText, width - padding - totalWidth, yPos);

    yPos += 50;
    ctx.fillStyle = '#999999';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText('We wholeheartedly appreciate your trust in us!', padding, yPos);

    canvas.toBlob(blob => {
      if (blob) {
        setInvoiceBlob(blob);
        setShowModal(true);
        copyToClipboard(true);
      }
    });
  };

  const downloadInvoice = () => {
    if (!invoiceBlob) return;

    const url = URL.createObjectURL(invoiceBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showStatus('Invoice downloaded successfully!', 'success');
  };

  const copyToClipboard = async (silent = false) => {
    if (!invoiceBlob) return;

    try {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': invoiceBlob })
      ]);

      if (!silent) {
        showStatus('Invoice copied to clipboard!', 'success');
      }
    } catch (err) {
      if (!silent) {
        showStatus('Could not copy to clipboard. Please use download button.', 'error');
      }
    }
  };

  const showStatus = (message: string, type: 'success' | 'error') => {
    setStatusMessage({ text: message, type, visible: true });
    setTimeout(() => {
      setStatusMessage({ text: '', type: '', visible: false });
    }, 3000);
  };

  return (
    <div className="flex items-center justify-center p-4 relative min-h-screen">
      <main className="glass-panel rounded-3xl p-6 w-full max-w-2xl relative z-10">
        <header className="mb-3 relative">
          <img src="/light.png" alt="Logo" className="absolute top-0 left-0 h-12 w-auto" />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">Service Quote</h1>
            <p className="text-white/70 text-xs font-medium tracking-wide uppercase">Select services for your project</p>
          </div>
        </header>

        <div className="scroll-container space-y-3 mb-3 pr-2">
          <div>
            <div className="section-header px-3 py-2 rounded-r-lg mb-2">
              <h3 className="text-white/90 text-xs font-bold uppercase tracking-wider">Core Services</h3>
            </div>
            <div className="space-y-2">{categoriesData.core}</div>
          </div>

          <div>
            <div className="section-header px-3 py-2 rounded-r-lg mb-2">
              <h3 className="text-white/90 text-xs font-bold uppercase tracking-wider">Add-ons & Features</h3>
            </div>
            <div className="space-y-2">{categoriesData.addon}</div>
          </div>

          <div>
            <div className="section-header px-3 py-2 rounded-r-lg mb-2">
              <h3 className="text-white/90 text-xs font-bold uppercase tracking-wider">Bundles</h3>
            </div>
            <div className="space-y-2">{categoriesData.bundle}</div>
          </div>

          <div>
            <div className="section-header px-3 py-2 rounded-r-lg mb-2">
              <h3 className="text-white/90 text-xs font-bold uppercase tracking-wider">Monthly Maintenance (Optional)</h3>
            </div>
            <div className="space-y-2">{categoriesData.maintenance}</div>
          </div>
        </div>

        <div className="divider-glass my-4"></div>

        {selectedCount > 0 && (
          <div className="mb-4">
            <h3 className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-2">Selected Services</h3>
            <div className="selected-scroll space-y-1 text-xs text-white/90 overflow-y-auto pr-2">
              {Array.from(selectedServices).map(id => {
                const service = SERVICES.find(s => s.id === id);
                if (!service || isServiceDisabled(service)) return null;

                let note = '';
                if (service.category === 'bundle' && service.includes) {
                  note = ` (includes ${service.includes.length} technologies)`;
                }

                return (
                  <div key={id} className="flex justify-between items-center py-1 border-b border-white/10 last:border-0">
                    <span className="truncate mr-2">{service.name}{note}</span>
                    <span className="font-mono font-semibold shrink-0">₱{service.price.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="glass-card rounded-xl p-4 flex justify-between items-center">
          <div>
            <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Total Estimate</p>
            <p className="text-white/40 text-xs mt-0.5">{selectedCount} item{selectedCount !== 1 ? 's' : ''} selected</p>
          </div>
          <div className="text-right">
            <span className="text-white/60 text-xl font-light">₱</span>
            <span className="text-4xl font-bold text-white total-glow tracking-tight">{animatedTotal.toLocaleString()}</span>
          </div>
        </div>

        <button
          ref={confirmBtnRef}
          onClick={generateInvoice}
          className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 rounded-xl border border-white/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm text-sm"
        >
          Generate Invoice
        </button>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel rounded-2xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl font-bold">Invoice Generated</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/60 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <div className="bg-white rounded-lg p-4 mb-4">
              <canvas ref={canvasRef} className="w-full" />
            </div>
            <div className="flex gap-3">
              <button
                onClick={downloadInvoice}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 rounded-xl border border-white/30 transition-all"
              >
                Download Image
              </button>
              <button
                onClick={() => copyToClipboard()}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 rounded-xl border border-white/30 transition-all"
              >
                Copy to Clipboard
              </button>
            </div>
            {statusMessage.visible && (
              <p className={`text-center text-white/70 text-sm mt-3 ${statusMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {statusMessage.text}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { ServiceQuote };
