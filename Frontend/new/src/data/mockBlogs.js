export const mockBlogs = [
    {
        _id: '1',
        title: "The Complete Roadmap to Full Stack Development in 2025",
        slug: "complete-roadmap-full-stack-2025",
        content: `
      <h2>Introduction</h2>
      <p>The landscape of web development is constantly evolving. As we step into 2025, the demand for Full Stack Developers who can bridge the gap between frontend and backend technologies is higher than ever. This guide will walk you through the essential skills and technologies you need to master.</p>
      
      <h2>1. The Foundation: HTML, CSS, and JavaScript</h2>
      <p>Before diving into frameworks, ensure your fundamentals are rock solid. Modern JavaScript (ES6+) is non-negotiable. Understand closures, promises, and async/await inside out.</p>

      <h2>2. Frontend Frameworks</h2>
      <p>React remains the industry standard. However, the ecosystem has shifted towards meta-frameworks. <strong>Next.js</strong> is now the default for many enterprise applications due to its server-side rendering capabilities.</p>

      <h2>3. The Backend</h2>
      <p>Node.js continues to dominate. Pair it with <strong>Express</strong> or <strong>NestJS</strong> for robust APIs.</p>

      <h2>Conclusion</h2>
      <p>Start small, build projects, and keep learning. The journey is long but rewarding.</p>
    `,
        excerpt: "Discover the essential skills, tools, and frameworks needed to become a high-paid Full Stack Developer in 2025.",
        coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
        category: "Learning & Career Guidance",
        author: "Sathish Kumar",
        tags: ["Full Stack", "React", "Node.js", "Career"],
        readTime: 8,
        views: 1250,
        createdAt: "2025-01-15T10:00:00Z",
        isPublished: true
    },
    {
        _id: '2',
        title: "Understanding React Server Components",
        slug: "understanding-react-server-components",
        content: `
      <h2>What are Server Components?</h2>
      <p>React Server Components (RSC) allow developers to write components that render exclusively on the server. This reduces the bundle size sending to the client and improves initial load performance.</p>
      
      <h2>Why use them?</h2>
      <ul>
        <li><strong>Zero Bundle Size:</strong> Dependencies used in server components stay on the server.</li>
        <li><strong>Direct Backend Access:</strong> Query your database directly from your component.</li>
      </ul>
    `,
        excerpt: "A deep dive into one of React's most revolutionary features and how it changes the way we build web apps.",
        coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
        category: "Course & Skill-Based",
        author: "Jane Doe",
        tags: ["React", "Web Development", "Performance"],
        readTime: 5,
        views: 890,
        createdAt: "2025-01-20T14:30:00Z",
        isPublished: true
    },
    {
        _id: '3',
        title: "AI Tools Transforming Software Engineering",
        slug: "ai-tools-software-engineering",
        content: `
      <p>Artificial Intelligence is no longer just a buzzword; it's a daily productivity booster for developers.</p>
      <h3>GitHub Copilot</h3>
      <p>Your AI pair programmer that suggests code snippets in real-time.</p>
      <h3>ChatGPT & Claude</h3>
      <p>Excellent for debugging, explaining complex codebases, and generating boilerplate code.</p>
    `,
        excerpt: "Explore how tools like GitHub Copilot and ChatGPT are enhancing developer productivity and changing workflows.",
        coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
        category: "Industry & Tech Updates",
        author: "Prolync Team",
        tags: ["AI", "Productivity", "Tools"],
        readTime: 4,
        views: 2100,
        createdAt: "2025-02-01T09:15:00Z",
        isPublished: true
    },
    {
        _id: '4',
        title: "Case Study: Building Scalable LMS Architecture",
        slug: "case-study-scalable-lms",
        content: `
      <p>In this case study, we break down how we architected Prolync to handle thousands of concurrent users.</p>
      <h3>Microservices vs Monolith</h3>
      <p>We started with a modular monolith to ensure speed of development but kept boundaries clean for future splitting.</p>
      <h3>Database Design</h3>
      <p>Using MongoDB for flexible schema design allowing easy course structure updates.</p>
    `,
        excerpt: "A behind-the-scenes look at how Prolync handles data, users, and video streaming at scale.",
        coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
        category: "Project & Case Study",
        author: "System Architect",
        tags: ["Architecture", "System Design", "Scalability"],
        readTime: 12,
        views: 3400,
        createdAt: "2025-01-05T16:45:00Z",
        isPublished: true
    },
    {
        _id: '5',
        title: "From Non-Tech to Software Engineer: Rahul's Story",
        slug: "student-success-rahul",
        content: `
      <p>Rahul was a mechanical engineer who felt stuck in his career. After joining Prolync's Full Stack Bootcamp, he dedicated 6 months to learning.</p>
      <h3>The Challenge</h3>
      <p>Balancing a full-time job and learning to code was tough.</p>
      <h3>The Result</h3>
      <p>Rahul is now an SDE-1 at a leading Fintech startup earning 3x his previous salary.</p>
    `,
        excerpt: "Inspiring journey of a Prolync student who successfully transitioned into a tech career.",
        coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
        category: "Student Success & Community",
        author: "Community Manager",
        tags: ["Success Story", "Motivation"],
        readTime: 3,
        views: 5000,
        createdAt: "2025-02-10T11:20:00Z",
        isPublished: true
    },
    {
        _id: '6',
        title: "New Feature: Interactive Coding Playgrounds",
        slug: "new-feature-coding-playgrounds",
        content: `
      <p>We are excited to announce the launch of our in-browser IDE!</p>
      <p>Now you can practice what you learn without leaving the lesson page. It supports HTML, CSS, JS, and Python.</p>
    `,
        excerpt: "Announcing our latest platform update that lets you code directly within the browser.",
        coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
        category: "Company & Platform Updates",
        author: "Prolync Product Team",
        tags: ["Update", "Feature"],
        readTime: 2,
        views: 1500,
        createdAt: "2025-02-15T08:00:00Z",
        isPublished: true
    }
];
