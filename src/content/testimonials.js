// REAL client testimonials only.
//
// Do NOT add invented or placeholder testimonials here. Fake reviews violate
// Google's policies, can get listings suspended, and destroy trust with buyers.
// Populate this from real clients who have given permission to be quoted.
//
// Each entry shape:
// {
//   quote: 'What the client actually said.',
//   name: 'First L.',            // real name or initials, with permission
//   role: 'Owner',              // their role
//   business: 'Business name',  // real business (or "a dental practice" if anonymized)
//   city: 'Austin, TX',         // ties the testimonial to a local market
//   result: '+180% organic traffic in 9 months', // optional, only if true & measured
// }
//
// The homepage testimonials section and Review/AggregateRating schema only render
// when this array has entries — so an empty array simply shows nothing.

export const testimonials = [];
