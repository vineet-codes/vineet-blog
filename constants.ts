import { Experience, Education, Publication, Certification, SkillCategory } from './types';

export const CONTACT = {
  linkedin: "www.linkedin.com/in/vineetsinghcs",
  location: "County Dublin, Ireland"
};

// PLACEHOLDER IMAGE:
// To use your own image:
// 1. Add your photo (e.g., 'vineet.jpg') to the public folder.
// 2. Change the line below to: export const PROFILE_IMAGE = "./vineet.jpg";
export const PROFILE_IMAGE = "./vineet.jpg";

export const SUMMARY = `I bridge the gap between complex engineering and user-centric product strategy. As a "crypto nerd," software engineer, and data scientist turned Product Director, I possess a rare bias for shipping tangible utility. Currently, I am architecting the future of the VeChain ecosystem, translating blockchain capabilities into real-world value.`;

// List of markdown files to fetch from public/blog/
export const BLOG_FILES = [
  'web3-ux-gap.md',
  'sustainability-gamified.md',
  'data-science-pm.md',
  'creative-coding.md',
  'minimalism-in-tech.md'
];

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
  }
];

export const PUBLICATIONS: Publication[] = [
  { title: "Cuckoo search algorithm and wind driven optimization based study of satellite image segmentation for multilevel thresholding using Kapur's entropy" },
  { title: "Performance of swarm based optimization techniques for designing digital FIR filter: A comparative study" },
  { title: "Design of two-channel filter bank using nature inspired optimization based fractional derivative constraints" }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "Neural Networks and Deep Learning" },
  { name: "Structuring Machine Learning Projects" },
  { name: "Improving Deep Neural Networks: Hyperparameter tuning, Regularization and Optimization" }
];
