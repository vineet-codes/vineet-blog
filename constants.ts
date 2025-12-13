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

// List of markdown files to fetch from public/blog/
// We use import.meta.glob to find files, then extract just the filenames
const blogModules = import.meta.glob('/public/blog/*.md');

export const BLOG_FILES = Object.keys(blogModules)
  .map((path) => path.split('/').pop() || '')
  .filter(Boolean);

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
    institution: "HBX | Harvard Business School",
    degree: "Certificate in Disruptive Strategy",
    details: "Innovation Strategy Formulation and Execution"
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
  { name: "Neural Networks and Deep Learning" },
  { name: "Structuring Machine Learning Projects" },
  { name: "Improving Deep Neural Networks: Hyperparameter tuning, Regularization and Optimization" }
];

export const TRAVEL_DATA: TravelEntry[] = [
  { year: "2023", city: "Reykjavík", country: "Iceland", lat: 64.1466, lng: -21.9426, tags: ["Geothermal", "Brutalist"] },
  { year: "2023", city: "Kyoto", country: "Japan", lat: 35.0116, lng: 135.7681, tags: ["Heritage", "Minimalism"] },
  { year: "2022", city: "Berlin", country: "Germany", lat: 52.5200, lng: 13.4050, tags: ["Techno", "Industrial"] },
  { year: "2021", city: "Medellín", country: "Colombia", lat: 6.2476, lng: -75.5658, tags: ["Urbanism", "Transformation"] },
  { year: "2020", city: "Copenhagen", country: "Denmark", lat: 55.6761, lng: 12.5683, tags: ["Design", "Systems"] }
];

// Theme Configuration
export type ThemeKey = 'red' | 'orange' | 'blue' | 'green';

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
      activeNav: 'text-red-600 font-bold pl-4 border-red-600',
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
      activeNav: 'text-orange-600 font-bold pl-4 border-orange-600',
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
      activeNav: 'text-blue-600 font-bold pl-4 border-blue-600',
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
      activeNav: 'text-green-600 font-bold pl-4 border-green-600',
      proseLink: 'prose-a:text-green-600',
      proseQuote: 'prose-blockquote:border-green-600',
      placeholder: 'placeholder:text-green-300',
      ring: 'focus:ring-green-600'
    }
  }
};
