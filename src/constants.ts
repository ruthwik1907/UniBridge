import { Destination, Connection, Post, University } from './types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'uk',
    name: 'United Kingdom',
    region: 'Europe',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
    universities: '130+',
    mentors: '4k+',
    tuition: '$15k - $30k',
    flag: '🇬🇧',
    description: 'Experience world-class education amidst historic landmarks.'
  },
  {
    id: 'usa',
    name: 'United States',
    region: 'North America',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800',
    universities: '450+',
    mentors: '12k+',
    tuition: '$25k - $60k',
    flag: '🇺🇸'
  },
  {
    id: 'australia',
    name: 'Australia',
    region: 'Oceania',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800',
    universities: '43',
    mentors: '2k+',
    tuition: '$20k - $40k',
    flag: '🇦🇺'
  },
  {
    id: 'canada',
    name: 'Canada',
    region: 'North America',
    image: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&q=80&w=1200',
    universities: '96',
    mentors: '3k+',
    tuition: '$12k - $30k',
    flag: '🇨🇦'
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    region: 'Europe',
    image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&q=80&w=800',
    universities: '14',
    mentors: '1k+',
    tuition: '$6k - $15k',
    flag: '🇳🇱'
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
    region: 'Asia Pacific',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    universities: '25',    mentors: '400',
    tuition: 'Affordable',
    flag: '🇮🇩'
  }
];

export const UNIVERSITIES: University[] = [
  {
    id: 'oxford',
    name: 'University of Oxford',
    location: 'Oxford, United Kingdom',
    image: 'https://images.unsplash.com/photo-1543906965-f9520aa2ed8a?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    courses: '250+',
    mentors: '4k+',
    tags: ['#1 UK', 'Historic', 'Top 10 Global']
  },
  {
    id: 'imperial',
    name: 'Imperial College London',
    location: 'London, United Kingdom',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    courses: '180+',
    mentors: '2k+',
    tags: ['STEM', 'Global', 'Russell Group']
  },
  {
    id: 'cambridge',
    name: 'Cambridge University',
    location: 'Cambridge, United Kingdom',
    image: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    courses: '300+',
    mentors: '3.5k+',
    tags: ['Historic', 'Research', 'Top 10 Global']
  },
  {
    id: 'harvard',
    name: 'Harvard University',
    location: 'Cambridge, United States',
    image: 'https://images.unsplash.com/photo-1576014131795-d440191a8e8b?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    courses: '400+',
    mentors: '8k+',
    tags: ['Ivy League', 'Top 10 Global']
  },
  {
    id: 'melbourne',
    name: 'University of Melbourne',
    location: 'Melbourne, Australia',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    courses: '200+',
    mentors: '1.5k+',
    tags: ['Oceania', 'Research']
  },
  {
    id: 'toronto',
    name: 'University of Toronto',
    location: 'Toronto, Canada',
    image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    courses: '350+',
    mentors: '5k+',
    tags: ['Top 10 Global', 'Research', 'Canada']
  },
  {
    id: 'ubc',
    name: 'University of British Columbia',
    location: 'Vancouver, Canada',
    image: 'https://images.unsplash.com/photo-1525921429624-479b6a29d84c?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    courses: '280+',
    mentors: '3k+',
    tags: ['Scenic', 'Research', 'Canada']
  },
  {
    id: 'mcgill',
    name: 'McGill University',
    location: 'Montreal, Canada',
    image: 'https://images.unsplash.com/photo-1564981797816-1043d01bf53d?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    courses: '300+',
    mentors: '4k+',
    tags: ['Historic', 'Research', 'Canada']
  },
  {
    id: 'uva',
    name: 'University of Amsterdam',
    location: 'Amsterdam, Netherlands',
    image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    courses: '200+',
    mentors: '1.2k+',
    tags: ['Top 100 Global', 'International', 'Netherlands']
  },
  {
    id: 'tudelft',
    name: 'Delft University of Technology',
    location: 'Delft, Netherlands',
    image: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    courses: '150+',
    mentors: '800+',
    tags: ['Engineering', 'Tech', 'Netherlands']
  },
  {
    id: 'leiden',
    name: 'Leiden University',
    location: 'Leiden, Netherlands',
    image: 'https://images.unsplash.com/photo-1564981797816-1043d01bf53d?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    courses: '180+',
    mentors: '600+',
    tags: ['Historic', 'Law', 'Netherlands']
  }
];

export const CONNECTIONS: Connection[] = [
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    university: 'University of Oxford, United Kingdom',
    major: 'MSc Computer Science',
    rating: 4.9,
    reviews: 120,
    price: 30,
    tags: ['Visa', 'Scholarships', 'Housing'],
    lastMessage: 'Hey! How is your application going?',
    isOnline: true
  },
  {
    id: 'james-wilson',
    name: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    university: 'Harvard University, United States',
    major: 'MBA Candidate',
    rating: 5.0,
    reviews: 85,
    price: 50,
    tags: ['GMAT', 'Interviews'],
    lastMessage: 'I can help with the interview prep.',
    isOnline: false
  },
  {
    id: 'elena-sterling',
    name: 'Eleanor Sterling',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    university: 'University of Amsterdam, Netherlands',
    major: 'Intl. Business Law',
    rating: 4.9,
    reviews: 42,
    price: 35,
    tags: ['Housing', 'Student Life', 'Visa'],
    lastMessage: 'The housing market in Amsterdam is tough.',
    isOnline: true
  },
  {
    id: 'alex-kim',
    name: 'Alex Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    university: 'University of Toronto, Canada',
    major: 'BSc Engineering',
    rating: 4.8,
    reviews: 64,
    price: 25,
    tags: ['Engineering', 'Canada', 'Co-op'],
    lastMessage: 'Toronto is great for tech jobs!',
    isOnline: true
  },
  {
    id: 'maya-patel',
    name: 'Maya Patel',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    university: 'McGill University, Canada',
    major: 'MA Economics',
    rating: 4.9,
    reviews: 51,
    price: 30,
    tags: ['Economics', 'Montreal', 'Bilingual'],
    lastMessage: 'Let me know if you need help with the SOP.',
    isOnline: false
  }
];

export const POSTS: Post[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
      university: 'Psychology @ NYU',
      isVerified: true
    },
    time: '2h ago',
    category: 'Accommodation',
    title: 'Found a hidden gem apartment in Greenwich Village! 🏠',
    content: "Just signed the lease for a studio that's surprisingly affordable. For anyone looking near NYU, check out the older buildings on 3rd Ave. The management is super chill and they accept international guarantors!",
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1449156001935-d28bc1cd7ead?auto=format&fit=crop&q=80&w=800'
    ],
    likes: 245,
    comments: 42
  },
  {
    id: '2',
    author: {
      name: 'David Chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      university: 'CS @ Imperial College London',
      isVerified: true
    },
    time: '5h ago',
    category: 'Visa & Immigration',
    title: 'Tier 4 Student Visa update for 2024 applicants 🛂',
    content: 'Just wanted to share that the processing times seem to be faster this month. I got my decision in just 5 working days with priority service! Make sure your bank statements are dated within 31 days of application.',
    likes: 89,
    comments: 15
  }
];
