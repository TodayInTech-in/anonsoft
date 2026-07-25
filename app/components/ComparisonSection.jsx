export default function ComparisonSection() {
  return (
    <section className="comparison">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Why Choose Us</div>
          <h2 className="section-title">TodayInTech vs Traditional Dev Agencies</h2>
        </div>

        <div className="comparison-table">
          <div className="comparison-col comparison-col-label">
            <div className="comparison-header-cell">Feature</div>
            <div className="comparison-cell">Time to Market</div>
            <div className="comparison-cell">Upfront Cost</div>
            <div className="comparison-cell">IP & Source Code</div>
            <div className="comparison-cell">HIPAA Compliance</div>
            <div className="comparison-cell">Customization</div>
          </div>

          <div className="comparison-col comparison-col-us">
            <div className="comparison-header-cell winner">TodayInTech (Fixed Hybrid)</div>
            <div className="comparison-cell winner-cell"><i className="fas fa-check" style={{ color: '#22c55e' }}></i> 4–8 Weeks</div>
            <div className="comparison-cell winner-cell"><i className="fas fa-check" style={{ color: '#22c55e' }}></i> $0 Upfront Prototype</div>
            <div className="comparison-cell winner-cell"><i className="fas fa-check" style={{ color: '#22c55e' }}></i> 100% Full Ownership</div>
            <div className="comparison-cell winner-cell"><i className="fas fa-check" style={{ color: '#22c55e' }}></i> Pre-Validated BAA</div>
            <div className="comparison-cell winner-cell"><i className="fas fa-check" style={{ color: '#22c55e' }}></i> Unlimited Custom Features</div>
          </div>

          <div className="comparison-col comparison-col-scratch">
            <div className="comparison-header-cell">Scratch Dev Agency</div>
            <div className="comparison-cell">6–12 Months</div>
            <div className="comparison-cell">$50k – $150k Deposit</div>
            <div className="comparison-cell">Rented / Restricted</div>
            <div className="comparison-cell">Requires Extra Audits</div>
            <div className="comparison-cell">Expensive Change Orders</div>
          </div>
        </div>
      </div>
    </section>
  );
}
