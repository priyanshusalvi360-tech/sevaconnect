// pages/Donate.jsx — Donation placeholder page (UI only, no payment gateway)
import { Helmet } from 'react-helmet-async';
import { Heart, CreditCard, Smartphone, Building, Info } from 'lucide-react';

const DONATION_AMOUNTS = [100, 250, 500, 1000, 2500, 5000];

const Donate = () => (
  <>
    <Helmet>
      <title>Donate — SevaConnect NGO</title>
      <meta name="description" content="Support SevaConnect's mission. Your donation helps fund education, health, environment, and rural development programs." />
    </Helmet>

    <section className="hero-gradient py-28 text-center" aria-labelledby="donate-heading">
      <div className="container">
        <Heart size={52} className="mx-auto mb-4 text-white" fill="white" />
        <h1 id="donate-heading" className="font-heading text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Support Our Cause
        </h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Every rupee you donate goes directly toward empowering communities in education, health, and sustainability.
        </p>
      </div>
    </section>

    <section className="section" style={{ background: 'var(--color-bg)' }}>
      <div className="container max-w-2xl">

        {/* Notice */}
        <div className="flex items-start gap-3 p-4 rounded-xl mb-8 text-sm"
          style={{ background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.3)', color: '#92600A' }}>
          <Info size={18} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-accent)' }} />
          <p>
            <strong>Demo Notice:</strong> This is a UI demonstration. Online payment processing is not yet configured.
            To donate, please contact us at <a href="mailto:donate@sevaconnect.org" className="underline">donate@sevaconnect.org</a> or use the bank details below.
          </p>
        </div>

        <div className="card p-8">
          <h2 className="font-heading text-2xl font-bold mb-6" style={{ color: 'var(--color-dark)' }}>
            Choose Donation Amount
          </h2>

          {/* Preset Amounts */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {DONATION_AMOUNTS.map((amount) => (
              <button
                key={amount}
                className="py-3 rounded-lg font-semibold text-sm border-2 transition-all hover:scale-105"
                style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'var(--color-primary)'; }}
                aria-label={`Donate ₹${amount.toLocaleString()}`}
              >
                ₹{amount.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="form-group">
            <label className="form-label" htmlFor="custom-amount">Or enter custom amount (₹)</label>
            <input
              id="custom-amount"
              type="number"
              className="form-input"
              placeholder="Enter amount…"
              min={10}
            />
          </div>

          {/* Payment Methods — visual only */}
          <h3 className="font-semibold mb-3 mt-4" style={{ color: 'var(--color-dark)' }}>Payment Method</h3>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { icon: CreditCard, label: 'Card' },
              { icon: Smartphone, label: 'UPI' },
              { icon: Building, label: 'Net Banking' },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex flex-col items-center gap-2 py-4 rounded-lg border-2 border-gray-200 hover:border-teal-500 transition-all text-sm font-medium text-gray-600"
              >
                <Icon size={22} style={{ color: 'var(--color-primary)' }} />
                {label}
              </button>
            ))}
          </div>

          <button
            className="btn-accent w-full justify-center text-base"
            onClick={() => alert('Online payment coming soon! Please contact us to donate.')}
          >
            ❤️ Donate Now (Demo)
          </button>
        </div>

        {/* Bank Details */}
        <div className="card p-6 mt-6">
          <h3 className="font-heading text-lg font-bold mb-4" style={{ color: 'var(--color-dark)' }}>
            Direct Bank Transfer
          </h3>
          <dl className="space-y-2 text-sm">
            {[
              ['Account Name', 'SevaConnect NGO Trust'],
              ['Bank', 'State Bank of India'],
              ['Account Number', '00000012345678901'],
              ['IFSC Code', 'SBIN0001234'],
              ['Branch', 'Andheri West, Mumbai'],
            ].map(([term, detail]) => (
              <div key={term} className="flex gap-2">
                <dt className="text-gray-500 w-36 flex-shrink-0">{term}:</dt>
                <dd className="font-medium" style={{ color: 'var(--color-dark)' }}>{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  </>
);

export default Donate;
