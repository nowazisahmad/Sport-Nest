const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

export type Sport = {
  id: string;
  name: string;
  facilities: number;
  image: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
};

export const bannerImage = unsplash("1459865264687-595d652de67e");

export const popularSports: Sport[] = [
  { id: "football", name: "Football", facilities: 48, image: unsplash("1574629810360-7efbbe195018") },
  { id: "basketball", name: "Basketball", facilities: 32, image: unsplash("1546519638-68e109498ffc") },
  { id: "tennis", name: "Tennis", facilities: 27, image: unsplash("1554068865-24cecd4e34b8") },
  { id: "badminton", name: "Badminton", facilities: 41, image: unsplash("1626224583764-f87db24ac4ea") },
  { id: "cricket", name: "Cricket", facilities: 19, image: unsplash("1531415074968-036ba1b575da") },
  { id: "swimming", name: "Swimming", facilities: 15, image: unsplash("1576610616656-d3aa5d1f4534") },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rafiq Hasan",
    role: "Sunday League Captain",
    quote:
      "Booking a turf for our weekly match used to take a dozen phone calls. With SportsNest it takes under a minute, and the slots are always accurate.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Nadia Islam",
    role: "Badminton Enthusiast",
    quote:
      "I love being able to compare courts by price and rating. Found an indoor court five minutes from my office that I never knew existed.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Tanvir Ahmed",
    role: "Tennis Coach",
    quote:
      "I schedule all my coaching sessions through SportsNest. Instant confirmation and secure payment make it easy for me and my students.",
    rating: 4,
  },
];
