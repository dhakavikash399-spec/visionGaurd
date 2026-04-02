// ========== Types ==========

export interface Author {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    coverImage: string;
    author: Author;
    readTime: string;
    publishedAt: string;
    slug: string;
    tags: string[];
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    originalPrice?: string;
    rating: number;
    reviewCount: number;
    image: string;
    affiliateLink: string;
    category: string;
    badge?: string;
    features: string[];
}

export interface ProductCategory {
    id: string;
    name: string;
    description: string;
    icon: string;
    productCount: number;
}

// ========== Product Categories ==========

export const productCategories: ProductCategory[] = [
    {
        id: 'security-cameras',
        name: 'Security Cameras',
        description: 'Indoor & outdoor cameras with night vision, motion detection, and AI-powered alerts',
        icon: '📹',
        productCount: 24,
    },
    {
        id: 'video-doorbells',
        name: 'Video Doorbells',
        description: 'Smart doorbells with HD video, two-way audio, and package detection',
        icon: '🔔',
        productCount: 18,
    },
    {
        id: 'nvr-systems',
        name: 'NVR Systems',
        description: 'Network video recorders for multi-camera setups with cloud storage',
        icon: '🖥️',
        productCount: 12,
    },
    {
        id: 'smart-locks',
        name: 'Smart Locks',
        description: 'Keyless entry with fingerprint, PIN, and smartphone access control',
        icon: '🔐',
        productCount: 15,
    },
    {
        id: 'sensors-alarms',
        name: 'Sensors & Alarms',
        description: 'Motion sensors, window alarms, and smart detection systems',
        icon: '🚨',
        productCount: 20,
    },
    {
        id: 'accessories',
        name: 'Accessories',
        description: 'Mounts, solar panels, cables, and storage solutions',
        icon: '🔧',
        productCount: 30,
    },
];

// ========== Sample Products ==========

export const products: Product[] = [
    {
        id: 'p1',
        name: 'Ring Video Doorbell 4',
        description: 'Enhanced features with Quick Replies, 1080p HD video, improved motion detection, and color Pre-Roll previews.',
        price: '₹13,999',
        originalPrice: '₹17,999',
        rating: 4.5,
        reviewCount: 12453,
        image: '/images/products/ring-doorbell.jpg',
        affiliateLink: '#',
        category: 'video-doorbells',
        badge: 'Best Seller',
        features: ['1080p HD Video', 'Color Night Vision', 'Two-Way Talk', 'Quick Replies'],
    },
    {
        id: 'p2',
        name: 'Arlo Pro 5S 2K Spotlight Camera',
        description: '2K HDR video quality, integrated spotlight, color night vision, and 160° diagonal viewing angle.',
        price: '₹18,499',
        originalPrice: '₹22,999',
        rating: 4.6,
        reviewCount: 8921,
        image: '/images/products/arlo-pro.jpg',
        affiliateLink: '#',
        category: 'security-cameras',
        badge: 'Editor\'s Choice',
        features: ['2K HDR Video', '160° View', 'Spotlight', 'Wire-Free'],
    },
    {
        id: 'p3',
        name: 'Google Nest Cam (Battery)',
        description: 'Intelligent alerts, HDR video, night vision, and 3 hours of free event video history with Google account.',
        price: '₹11,999',
        rating: 4.4,
        reviewCount: 15678,
        image: '/images/products/nest-cam.jpg',
        affiliateLink: '#',
        category: 'security-cameras',
        features: ['HDR Video', 'AI Detection', 'Battery Powered', 'Google Home'],
    },
    {
        id: 'p4',
        name: 'Eufy Video Doorbell Dual',
        description: 'Dual camera system with 2K resolution, package detection camera, and no monthly fee local storage.',
        price: '₹15,999',
        originalPrice: '₹19,999',
        rating: 4.3,
        reviewCount: 6734,
        image: '/images/products/eufy-doorbell.jpg',
        affiliateLink: '#',
        category: 'video-doorbells',
        features: ['Dual Camera', '2K Resolution', 'No Monthly Fee', 'Package Detection'],
    },
    {
        id: 'p5',
        name: 'Reolink 8CH 4K Security System',
        description: 'Complete 8-channel NVR system with 4 bullet cameras, 2TB HDD storage, and PoE connectivity.',
        price: '₹34,999',
        originalPrice: '₹42,999',
        rating: 4.7,
        reviewCount: 3456,
        image: '/images/products/reolink-system.jpg',
        affiliateLink: '#',
        category: 'nvr-systems',
        badge: 'Top Rated',
        features: ['4K Ultra HD', '8 Channels', '2TB Storage', 'PoE Setup'],
    },
    {
        id: 'p6',
        name: 'Yale Assure Lock 2 Plus',
        description: 'Wi-Fi connected smart lock with touchscreen keypad, auto-lock, and DoorSense technology.',
        price: '₹21,999',
        rating: 4.5,
        reviewCount: 4567,
        image: '/images/products/yale-lock.jpg',
        affiliateLink: '#',
        category: 'smart-locks',
        features: ['Wi-Fi Built-in', 'Touch Keypad', 'Auto-Lock', 'DoorSense'],
    },
    {
        id: 'p7',
        name: 'Wyze Cam v3 Pro',
        description: 'Budget-friendly indoor/outdoor camera with 2K QHD, color night vision, and smoke alarm detection.',
        price: '₹3,499',
        originalPrice: '₹4,999',
        rating: 4.2,
        reviewCount: 28956,
        image: '/images/products/wyze-cam.jpg',
        affiliateLink: '#',
        category: 'security-cameras',
        badge: 'Budget Pick',
        features: ['2K QHD', 'Color Night Vision', 'IP65 Rated', 'Smoke Detect'],
    },
    {
        id: 'p8',
        name: 'Ring Alarm Pro 8-Piece Kit',
        description: 'All-in-one security system with built-in eero Wi-Fi 6 router, contact sensors, and motion detectors.',
        price: '₹27,999',
        rating: 4.4,
        reviewCount: 7234,
        image: '/images/products/ring-alarm.jpg',
        affiliateLink: '#',
        category: 'sensors-alarms',
        features: ['Wi-Fi 6 Router', '8 Pieces', 'Alexa Guard', '24/7 Monitoring'],
    },
];

// ========== Blog Categories ==========

export const blogCategories = [
    { id: 'reviews', name: 'Product Reviews', icon: '⭐', count: 45 },
    { id: 'guides', name: 'Buying Guides', icon: '📖', count: 32 },
    { id: 'installation', name: 'Installation Tips', icon: '🔨', count: 28 },
    { id: 'smart-home', name: 'Smart Home', icon: '🏠', count: 38 },
    { id: 'security-tips', name: 'Security Tips', icon: '🛡️', count: 25 },
    { id: 'comparisons', name: 'Comparisons', icon: '⚖️', count: 20 },
    { id: 'news', name: 'Industry News', icon: '📰', count: 15 },
    { id: 'diy', name: 'DIY Projects', icon: '🛠️', count: 12 },
];

// ========== Sample Blog Posts ==========

export const blogPosts: BlogPost[] = [
    {
        id: 'b1',
        title: 'Best Doorbell Cameras of 2026: Complete Buying Guide',
        excerpt: 'We tested and reviewed the top 10 video doorbells of 2026, comparing features, video quality, smart home integration, and value for money.',
        content: '<p>Choosing the right video doorbell can be overwhelming with so many options on the market...</p>',
        category: 'guides',
        coverImage: '/images/blog/doorbell-guide.jpg',
        author: { id: 'a1', name: 'Priya Sharma', avatar: '/images/authors/priya.jpg', bio: 'Smart Home Expert' },
        readTime: '12 min',
        publishedAt: '2026-03-18',
        slug: 'best-doorbell-cameras-2026',
        tags: ['doorbell', 'buying guide', '2026'],
    },
    {
        id: 'b2',
        title: 'Ring vs Arlo vs Nest: Which Security Camera Is Right for You?',
        excerpt: 'An in-depth comparison of the three most popular security camera brands, covering video quality, AI features, pricing, and ecosystem compatibility.',
        content: '<p>The battle of the top security camera brands continues in 2026...</p>',
        category: 'comparisons',
        coverImage: '/images/blog/camera-comparison.jpg',
        author: { id: 'a2', name: 'Rahul Verma', avatar: '/images/authors/rahul.jpg', bio: 'Tech Reviewer' },
        readTime: '15 min',
        publishedAt: '2026-03-15',
        slug: 'ring-vs-arlo-vs-nest-comparison',
        tags: ['ring', 'arlo', 'nest', 'comparison'],
    },
    {
        id: 'b3',
        title: 'How to Install a Wired Doorbell Camera: Step-by-Step Guide',
        excerpt: 'Complete DIY installation guide for wired doorbell cameras. No electrician needed — just follow these simple steps with our detailed photos.',
        content: '<p>Installing a wired doorbell camera might seem intimidating, but it is actually quite straightforward...</p>',
        category: 'installation',
        coverImage: '/images/blog/install-guide.jpg',
        author: { id: 'a1', name: 'Priya Sharma', avatar: '/images/authors/priya.jpg', bio: 'Smart Home Expert' },
        readTime: '8 min',
        publishedAt: '2026-03-12',
        slug: 'install-wired-doorbell-camera',
        tags: ['installation', 'diy', 'doorbell'],
    },
    {
        id: 'b4',
        title: '10 Essential Home Security Tips Every Homeowner Should Know',
        excerpt: 'From smart camera placement to network security, here are the top 10 security practices to keep your home safe and secure in the digital age.',
        content: '<p>Home security goes beyond just installing cameras...</p>',
        category: 'security-tips',
        coverImage: '/images/blog/security-tips.jpg',
        author: { id: 'a3', name: 'Ankit Patel', avatar: '/images/authors/ankit.jpg', bio: 'Security Consultant' },
        readTime: '10 min',
        publishedAt: '2026-03-08',
        slug: 'essential-home-security-tips',
        tags: ['security', 'tips', 'home safety'],
    },
    {
        id: 'b5',
        title: 'Smart Home Security on a Budget: Best Cameras Under ₹5,000',
        excerpt: 'You don\'t need to spend a fortune to secure your home. We review the best budget security cameras that deliver great performance without breaking the bank.',
        content: '<p>Budget-friendly security cameras have come a long way...</p>',
        category: 'reviews',
        coverImage: '/images/blog/budget-cameras.jpg',
        author: { id: 'a2', name: 'Rahul Verma', avatar: '/images/authors/rahul.jpg', bio: 'Tech Reviewer' },
        readTime: '9 min',
        publishedAt: '2026-03-05',
        slug: 'best-budget-security-cameras',
        tags: ['budget', 'review', 'cameras'],
    },
    {
        id: 'b6',
        title: 'Building a Complete Smart Home Security System from Scratch',
        excerpt: 'A comprehensive guide to building an integrated smart home security ecosystem — from choosing cameras to setting up automation routines.',
        content: '<p>Building a smart home security system doesn\'t have to be complicated...</p>',
        category: 'smart-home',
        coverImage: '/images/blog/smart-home-setup.jpg',
        author: { id: 'a3', name: 'Ankit Patel', avatar: '/images/authors/ankit.jpg', bio: 'Security Consultant' },
        readTime: '14 min',
        publishedAt: '2026-03-01',
        slug: 'complete-smart-home-security',
        tags: ['smart home', 'guide', 'system'],
    },
];

// ========== Helper Functions ==========

export function getProductsByCategory(categoryId: string): Product[] {
    return products.filter(p => p.category === categoryId);
}

export function getBlogsByCategory(categoryId: string): BlogPost[] {
    return blogPosts.filter(b => b.category === categoryId);
}

export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find(b => b.slug === slug);
}

// ========== Stats Data ==========

export const stats = [
    { label: 'Products Reviewed', value: '500+', icon: '📹' },
    { label: 'Expert Articles', value: '200+', icon: '📝' },
    { label: 'Monthly Readers', value: '50K+', icon: '👥' },
    { label: 'Years of Expertise', value: '8+', icon: '🏆' },
];

// ========== FAQ Data ==========

export const faqs = [
    {
        question: 'What makes a good video doorbell camera?',
        answer: 'A great video doorbell should have at least 1080p HD video, wide-angle lens (150°+), night vision, two-way audio, motion zones, and reliable connectivity. Premium models add features like package detection, facial recognition, and color night vision.',
    },
    {
        question: 'Do security cameras work without Wi-Fi?',
        answer: 'Yes, some security cameras can work without Wi-Fi by recording to local storage such as SD cards or NVR systems. However, you will lose remote viewing, cloud storage, and smart alerts. Cellular-connected cameras are another option for locations without Wi-Fi.',
    },
    {
        question: 'How are affiliate products selected on VisionGuard?',
        answer: 'We independently test and review every product featured on VisionGuard. Our editorial team evaluates products based on video quality, features, reliability, value, and user reviews. We only recommend products we genuinely believe in.',
    },
    {
        question: 'Can I submit a blog post or product review?',
        answer: 'Absolutely! We welcome guest contributions from security enthusiasts and professionals. Visit our Submit Blog page to share your expertise with our community. All submissions go through an editorial review.',
    },
    {
        question: 'What is the best outdoor security camera for Indian weather?',
        answer: 'For Indian weather conditions, look for cameras with IP65 or higher weather resistance rating, operating temperature range of -20°C to 60°C, and anti-fog lens coating. Brands like Reolink, Hikvision, and CP Plus perform well in extreme heat and monsoon conditions.',
    },
];
