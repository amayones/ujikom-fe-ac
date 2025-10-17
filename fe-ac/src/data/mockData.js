// Mock data untuk tampilan frontend
export const mockMovies = [
  {
    id: 1,
    title: "Spider-Man: No Way Home",
    genre: "Action, Adventure",
    duration: "148 min",
    rating: "PG-13",
    poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Spider-Man",
    description: "Peter Parker's secret identity is revealed to the entire world.",
    price: 50000,
    status: "now_playing"
  },
  {
    id: 2,
    title: "The Batman",
    genre: "Action, Crime",
    duration: "176 min", 
    rating: "PG-13",
    poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Batman",
    description: "Batman ventures into Gotham City's underworld.",
    price: 55000,
    status: "now_playing"
  },
  {
    id: 3,
    title: "Doctor Strange 2",
    genre: "Action, Fantasy",
    duration: "126 min",
    rating: "PG-13", 
    poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Dr+Strange",
    description: "Doctor Strange unleashes an unspeakable evil.",
    price: 60000,
    status: "coming_soon"
  }
];

export const mockSchedules = [
  { id: 1, movieId: 1, time: "10:00", studio: "Studio 1", availableSeats: 45 },
  { id: 2, movieId: 1, time: "13:00", studio: "Studio 2", availableSeats: 32 },
  { id: 3, movieId: 2, time: "16:00", studio: "Studio 1", availableSeats: 28 },
  { id: 4, movieId: 2, time: "19:00", studio: "Studio 3", availableSeats: 50 }
];

export const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "customer" },
  { id: 2, name: "Jane Admin", email: "admin@example.com", role: "admin" },
  { id: 3, name: "Bob Owner", email: "owner@example.com", role: "owner" }
];

export const mockOrders = [
  { id: 1, movieTitle: "Spider-Man", date: "2024-01-15", time: "19:00", seats: "A1, A2", total: 100000, status: "paid" },
  { id: 2, movieTitle: "Batman", date: "2024-01-16", time: "16:00", seats: "B5", total: 55000, status: "pending" }
];