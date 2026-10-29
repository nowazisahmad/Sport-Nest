// Dummy data for the homepage. Replace with API calls once the server is ready.

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

export type Sport = {
  id: string;
  name: string;
  facilities: number;
  image: string;
};

export type Facility = {
  _id?: string;
  id: string;
  name: string;
  sport: string;
  location: string;
  pricePerHour: number;
  rating: number;
  reviews: number;
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

export const featuredFacilities: Facility[] = [
  {
    _id: "f1",
    id: "f1",
    name: "Green Field Arena",
    sport: "Football",
    location: "Gulshan, Dhaka",
    pricePerHour: 2500,
    rating: 4.9,
    reviews: 214,
    image: unsplash("1574629810360-7efbbe195018"),
  },
  {
    _id: "f2",
    id: "f2",
    name: "Downtown Hoops Court",
    sport: "Basketball",
    location: "Dhanmondi, Dhaka",
    pricePerHour: 1800,
    rating: 4.7,
    reviews: 132,
    image: unsplash("1546519638-68e109498ffc"),
  },
  {
    _id: "f3",
    id: "f3",
    name: "Ace Tennis Club",
    sport: "Tennis",
    location: "Banani, Dhaka",
    pricePerHour: 2000,
    rating: 4.8,
    reviews: 98,
    image: unsplash("1622279457486-62dcc4a431d6"),
  },
  {
    _id: "f4",
    id: "f4",
    name: "Shuttle Point Indoor",
    sport: "Badminton",
    location: "Uttara, Dhaka",
    pricePerHour: 900,
    rating: 4.6,
    reviews: 176,
    image: unsplash("1626224583764-f87db24ac4ea"),
  },
  {
    _id: "f5",
    id: "f5",
    name: "Aqua Blue Pool",
    sport: "Swimming",
    location: "Mirpur, Dhaka",
    pricePerHour: 700,
    rating: 4.5,
    reviews: 87,
    image: unsplash("1576610616656-d3aa5d1f4534"),
  },
  {
    _id: "f6",
    id: "f6",
    name: "Pro Fit Training Hub",
    sport: "Gym",
    location: "Bashundhara, Dhaka",
    pricePerHour: 500,
    rating: 4.8,
    reviews: 251,
    image: unsplash("1571019613454-1cb2f99b2d8b"),
  },
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
