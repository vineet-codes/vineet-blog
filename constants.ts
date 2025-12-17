import { Experience, Education, Publication, Certification, SkillCategory, TravelEntry } from './types';

export const CONTACT = {
  linkedin: "www.linkedin.com/in/vineetsinghcs",
  location: "County Dublin, Ireland"
};

// PLACEHOLDER IMAGE:
// To use your own image:
// 1. Add your photo (e.g., 'vineet.jpg') to the public folder.
// 2. Change the line below to: export const PROFILE_IMAGE = "./vineet.jpg";
export const PROFILE_IMAGE = "./vineet.png";

export const SUMMARY = `I build things that make people move, think, and stick around.

Started as a nerd playing with blockchains and data for fun. Kept going long after everyone else moved on to the next buzzword. Ten years later, I still like shipping real products more than talking about them.

My edge is simple: I understand the code, the numbers, and the humans using it. I can sit with engineers and argue about architecture, then turn around and rewrite the product story so it actually lands.

I like clean systems, sharp incentives, and feedback loops that punish laziness and reward momentum. Payments, Crypto, fitness, sustainability, behavior design, tokenomics – different arenas, same game.

This site is where I turn experiments into words, and words back into products.`;

export const EXPERIENCE: Experience[] = [
  {
    company: "VeChain",
    role: "Director of Product",
    period: "Sep 2024 - Present",
    location: "Dublin, Ireland",
    logo: "https://cryptologos.cc/logos/vechain-vet-logo.png",
    description: [
      "Spearheading the product vision and execution for the entire VeChain ecosystem.",
      "Leading cross-functional teams to deliver scalable blockchain solutions for enterprise and retail users."
    ]
  },
  {
    company: "VeChain",
    role: "Senior Product Manager",
    period: "Jun 2022 - Sep 2024",
    location: "Dublin, Ireland",
    logo: "https://cryptologos.cc/logos/vechain-vet-logo.png",
    description: [
      "Product lead for VeBetter, an app-based gamified ecosystem rewarding sustainable user activities.",
      "Managed VeWorld, a self-custody wallet critical to the network's user experience.",
      "Defined product strategy and roadmap, bridging technical capabilities with market needs."
    ]
  },
  {
    company: "Pluto Digital",
    role: "DeFi Product Manager",
    period: "Nov 2021 - May 2022",
    location: "Dublin, Ireland",
    // Using a clear placeholder/icon as specific Pluto Digital logo availability is inconsistent
    logo: "https://ui-avatars.com/api/?name=Pluto+Digital&background=000&color=fff&size=128&font-size=0.4", 
    description: [
      "Built an on-chain yield aggregator for Ethereum (Yield Optimization Protocol).",
      "Orchestrated product development from concept to deployment in the decentralized finance sector."
    ]
  },
  {
    company: "Citi",
    role: "Product Manager (Global Payments & Receivables)",
    period: "Oct 2019 - Nov 2021",
    location: "Dublin, Ireland",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Citi.svg/200px-Citi.svg.png",
    description: [
      "Revolutionized cross-border payment processing, reducing time from 5 days to minutes.",
      "Digitized ~30 million pages annually by building a regulatory document processing platform.",
      "Launched in 10+ countries within 18 months; scaled commercialization across South Africa, Philippines, Thailand, and Vietnam.",
      "Managed investment allocation, global governance, and C-suite engagement for strategic product rollouts."
    ]
  },
  {
    company: "Citi Innovation Lab",
    role: "Senior Software Engineer & Disruptive Tech Lead",
    period: "Sep 2016 - Oct 2019",
    location: "Dublin, Ireland",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Citi.svg/200px-Citi.svg.png",
    description: [
      "Led research in blockchain constituents: Hash Functions, Digital Signatures, Consensus Mechanisms, ZK-Proofs, and MPC.",
      "Re-imagined supply chain financing using secure consensus-driven distributed systems.",
      "Developed a document negotiation tool utilizing NLP and state tracking neural networks."
    ]
  },
  {
    company: "Citi Innovation Lab",
    role: "Data Scientist",
    period: "Aug 2015 - Aug 2016",
    location: "Dublin, Ireland",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Citi.svg/200px-Citi.svg.png",
    description: [
      "Deployed containerized ML APIs for global cards business credit risk optimization using structured and unstructured data.",
      "Developed ensemble models (Random Forest + 4-layer NN) to predict client attrition.",
      "Researched Zero-Knowledge Proofs and homomorphic encryption (Zcash benchmarking)."
    ]
  },
  {
    company: "Fast.ai",
    role: "International Fellow",
    period: "Mar 2018 - Nov 2021",
    location: "Remote / Global",
    logo: "https://avatars.githubusercontent.com/u/20547620?s=200&v=4",
    description: [
      "Implemented and debugged state-of-the-art deep learning techniques in computer vision and NLP.",
      "Explored cutting-edge research in robotics, time-series analysis, and large-scale satellite imaging."
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    institution: "Trinity College, Dublin",
    degree: "M.Sc. Computer Science",
    details: "Specialization in Mobile and Ubiquitous Computing"
  },
  {
    institution: "Indian Institute of Information Technolofy, Design and Manufacturing",
    degree: "Bachelor of Technology in Electronics and Communication Engineering",
    details: "4 years undergraduate program"
  }
];

export const PUBLICATIONS: Publication[] = [
  { title: "Cuckoo search algorithm and wind driven optimization based study of satellite image segmentation for multilevel thresholding using Kapur's entropy", url : "https://www.sciencedirect.com/science/article/abs/pii/S0957417413008919" },
  { title: "Performance of swarm based optimization techniques for designing digital FIR filter: A comparative study", url :"https://www.sciencedirect.com/science/article/pii/S2215098615303785" },
  { title: "Design of two-channel filter bank using nature inspired optimization based fractional derivative constraints", url: "https://www.sciencedirect.com/science/article/abs/pii/S0019057814001256?via%3Dihub" }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "Innovation Strategy Formulation and Execution, Disruptive Strategy, HBX | Harvard Business School" },
  { name: "Neural Networks and Deep Learning" },
  { name: "Structuring Machine Learning Projects" },
  { name: "Improving Deep Neural Networks: Hyperparameter tuning, Regularization and Optimization" }
];

export const TRAVEL_DATA: TravelEntry[] = [
  { year: "2024", city: "Jacksonville", country: "USA", lat: "30.3298° N", lng: "81.6592° W", tags: ["Summer", "Florida", "UFC", "Real life Hangover"] },
  { year: "2024", city: "Boston", country: "USA", lat: "42.3555° N", lng: "71.0565° W", tags: ["Harvard", "MIT", "Hackathon", "Inspiration"] },
  { year: "2024", city: "Austin", country: "USA", lat: "30.2672° N", lng: "97.7431° W", tags: ["Summer", "Consensus", "Ribs", "Cocktails"] },
  { year: "2024", city: "San Francisco", country: "USA", lat: "37.7749° N", lng: "122.4194° W", tags: ["Summer", "Golden Gate", "Palo Alto", "Waymo"] },
  { year: "2024", city: "Nice", country: "France", lat: "43.7102° N", lng: "7.2620° E", tags: ["Summer", "Beaches", "Wine"] },
  { year: "2024", city: "Milan", country: "Italy", lat: "45.4685° N", lng: "9.1824° E", tags: ["Summer", "Tiramisu", "Bosco Verticale", "Wine", "Steakhouse"] },
  { year: "2024", city: "Dubai", country: "United Arab Emirates", lat: "25.276987° N", lng: "55.296233° E", tags: ["Winter", "New Beginings", "Habibi"] },
  { year: "2024", city: "Madrid", country: "Spain", lat: "40.4167° N", lng: "3.7033° W", tags: ["Winter", "Oscar", "Wine", "Nightclub"] },
  { year: "2025", city: "Osaka", country: "Japan", lat: "34.6937° N", lng: "135.5023° E", tags: ["Summer", "Dotonbori", "sake", "sumo"] },
  { year: "2025", city: "Kyoto", country: "Japan", lat: "35.0116° N", lng: "135.7681° E", tags: ["Summer", "Greenery", "Wagyu", "Shinkansen"] },
  { year: "2025", city: "Tokyo", country: "Japan", lat: "35.6764° N", lng: "139.6500° E", tags: ["Summer", "Whiskey and Wagyu"] },
  { year: "2025", city: "Singapore", country: "Singapore", lat: "1°17 N", lng: "103.85° E", tags: ["Summer", "humidity and friends"] },
  { year: "2025", city: "Cascais", country: "Portugal", lat: "38.7237° N", lng: "9.4006° W", tags: ["Summer", "seaside"] },
  { year: "2025", city: "Dublin", country: "Ireland", lat: "53.3498° N", lng: "6.2603° W", tags: ["Summer", "Friends"] },
  { year: "2025", city: "Abu Dhabi", country: "United Arab Emirates", lat: "24.4539° N", lng: "54.3773° E", tags: ["Winter", "Abu Dhabi", "Ferrari World", "Yas Island"] },
];

// Theme Configuration
export type ThemeKey = 'green' | 'red' | 'orange' | 'blue' ;

export const THEMES: Record<ThemeKey, any> = {
  red: {
    hex: '#dc2626',
    classes: {
      text: 'text-red-600',
      bg: 'bg-red-600',
      border: 'border-red-600',
      hoverText: 'hover:text-red-600',
      hoverBg: 'hover:bg-red-600',
      hoverBorder: 'hover:border-red-600',
      groupHoverText: 'group-hover:text-red-600',
      groupHoverTextLight: 'group-hover:text-red-200',
      groupHoverTextLighter: 'group-hover:text-red-100',
      activeNav: 'text-red-600 font-bold pr-0 pl-4 border-red-600',
      proseLink: 'prose-a:text-red-600',
      proseQuote: 'prose-blockquote:border-red-600',
      placeholder: 'placeholder:text-red-300',
      ring: 'focus:ring-red-600'
    }
  },
  orange: {
    hex: '#ea580c',
    classes: {
      text: 'text-orange-600',
      bg: 'bg-orange-600',
      border: 'border-orange-600',
      hoverText: 'hover:text-orange-600',
      hoverBg: 'hover:bg-orange-600',
      hoverBorder: 'hover:border-orange-600',
      groupHoverText: 'group-hover:text-orange-600',
      groupHoverTextLight: 'group-hover:text-orange-200',
      groupHoverTextLighter: 'group-hover:text-orange-100',
      activeNav: 'text-orange-600 font-bold pr-0 pl-4 border-orange-600',
      proseLink: 'prose-a:text-orange-600',
      proseQuote: 'prose-blockquote:border-orange-600',
      placeholder: 'placeholder:text-orange-300',
      ring: 'focus:ring-orange-600'
    }
  },
  blue: {
    hex: '#2563eb',
    classes: {
      text: 'text-blue-600',
      bg: 'bg-blue-600',
      border: 'border-blue-600',
      hoverText: 'hover:text-blue-600',
      hoverBg: 'hover:bg-blue-600',
      hoverBorder: 'hover:border-blue-600',
      groupHoverText: 'group-hover:text-blue-600',
      groupHoverTextLight: 'group-hover:text-blue-200',
      groupHoverTextLighter: 'group-hover:text-blue-100',
      activeNav: 'text-blue-600 font-bold pr-0 pl-4 border-blue-600',
      proseLink: 'prose-a:text-blue-600',
      proseQuote: 'prose-blockquote:border-blue-600',
      placeholder: 'placeholder:text-blue-300',
      ring: 'focus:ring-blue-600'
    }
  },
  green: {
    hex: '#16a34a',
    classes: {
      text: 'text-green-600',
      bg: 'bg-green-600',
      border: 'border-green-600',
      hoverText: 'hover:text-green-600',
      hoverBg: 'hover:bg-green-600',
      hoverBorder: 'hover:border-green-600',
      groupHoverText: 'group-hover:text-green-600',
      groupHoverTextLight: 'group-hover:text-green-200',
      groupHoverTextLighter: 'group-hover:text-green-100',
      activeNav: 'text-green-600 font-bold pr-0 pl-4 border-green-600',
      proseLink: 'prose-a:text-green-600',
      proseQuote: 'prose-blockquote:border-green-600',
      placeholder: 'placeholder:text-green-300',
      ring: 'focus:ring-green-600'
    }
  }
};
