export default function TestimonialsSection() {
  const reviews = [
    {
      name: 'Dr. Sarah Jenkins',
      role: 'Clinic Owner, Texas Virtual Care',
      text: 'TodayInTech delivered our white-label telemedicine platform in just 4 weeks. Their zero upfront payment guarantee gave us total peace of mind.',
      avatar: '/assets/reviewer-1.png'
    },
    {
      name: 'Michael Chang',
      role: 'Founder, MedNow Telehealth',
      text: 'The FHIR integration with Athenahealth was flawless. They saved us months of engineering time and over $80,000 in custom dev costs.',
      avatar: '/assets/reviewer-2.png'
    },
    {
      name: 'Rachel Adams',
      role: 'Director, Senior Care EVV',
      text: 'The GPS EVV mobile app for our caregivers exceeded expectations. Outstanding quality and responsiveness from their development team.',
      avatar: '/assets/reviewer-3.png'
    }
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Client Stories</div>
          <h2 className="section-title">Trusted By Founders & Medical Directors</h2>
        </div>

        <div className="testimonials-grid">
          {reviews.map((r, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="testimonial-stars">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <div className="testimonial-text">{r.text}</div>
              <div className="testimonial-author">
                <img src={r.avatar} alt={r.name} className="testimonial-avatar-img" />
                <div>
                  <div className="testimonial-name">{r.name}</div>
                  <div className="testimonial-role">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
