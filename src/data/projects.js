import { VscEdit, VscMortarBoard, VscStarFull, VscBell } from "react-icons/vsc";
import { getCloudinaryUrl, getCloudinaryVideoUrl } from "../utils/cloudinary";

const RAW_PROJECTS = [
  {
    id: "punjab-immigration",
    name: "Punjab Immigration",
    slug: "punjab-immigration",
    aspectRatio: "16/10.5",
    logo: "/logos/punjab-immigration.png",
    industry: "Immigration Consultancy",
    category: "Immigration",
    year: "2025",
    color: "#F6C000",
    image: "/projects/punjab-immigration/PCVIEW-PI.png",
    summary: "Comprehensive digital transformation for a leading immigration consultancy.",
    challenge: "Punjab Immigration needed a reliable digital presence to handle a massive influx of leads, showcase their success stories, and build trust among prospective applicants navigating complex visa processes.",
    solution: "We designed a premium, user-friendly website integrated with an admin CRM, coupled with a highly targeted Meta and Google Ads strategy to capture high-intent leads and manage their social media reputation.",
    testimonial: {
      quote: "YENOH completely transformed how we capture and process leads. Our new digital infrastructure is handling 3x the volume effortlessly, and the brand feels premium.",
      author: "Director, Punjab Immigration"
    },
    deliverables: [
      "Custom Next.js Web Platform",
      "Lead Management CRM Integration",
      "Google Business Profile (GMB) Optimization",
      "Full Brand Identity Refresh",
      "Always-On Meta & Google Ads Funnel"
    ],
    brandIdentity: {
      colors: ["#F6C000", "#1D1D1D", "#FAF9F6", "#0D6EFD"],
      fonts: ["Inter", "Satoshi"]
    },
    duration: "4 Months",
    platforms: "Web, Instagram, Facebook, Google",
    services: [
      "Website Development",
      "Social Media Management",
      "Google Business Profile",
      "GMB SEO Optimization",
      "Instagram",
      "Facebook",
      "Google Ads",
      "Meta Ads",
      "Script Writing",
      "Reels",
      "Stories",
      "Posts",
      "Banners",
      "Flexes",
      "Marketing Creatives"
    ],
    results: [
      { metric: "300%", label: "Lead Generation Growth" },
      { metric: "15k+", label: "Monthly Web Traffic" },
      { metric: "50+", label: "Weekly High-Intent Leads Generated" }
    ],
    gallery: [
      { type: "image", category: "Website", src: "/projects/punjab-immigration/PCVIEW-PI.png", caption: "Official Web Platform Desktop Interface" },
      { type: "image", category: "Website", src: "/projects/punjab-immigration/MOBILE VIEW.jpeg", caption: "Mobile Responsive Layout & Lead Forms" },
      { type: "image", category: "Social Grid", src: "/projects/punjab-immigration/IMG_1597.PNG", caption: "Curated Instagram Grid Strategy" },
      { type: "image", category: "Graphics", src: "/projects/punjab-immigration/Study Visa  Visiter Visa  Work Visa  PR (1).png", caption: "Study & Work Visa Campaign Banners" },
      { type: "image", category: "Social", src: "/projects/punjab-immigration/_punjabimmigration_.jpg", caption: "Brand Authority Post Designs" },
      { type: "image", category: "Social", src: "/projects/punjab-immigration/_punjabimmigration_1.jpg", caption: "Client Testimonial Social Creative" },
      { type: "video", category: "Reels", src: "/projects/punjab-immigration/_punjabimmigration_1779962453_3906930387473549860_67354189286.mp4", caption: "Instagram Reel Campaign 01", aspectRatio: "9/16" },
      { type: "video", category: "Reels", src: "/projects/punjab-immigration/_punjabimmigration_1780976901_3915440290123332672_67354189286.mp4", caption: "Instagram Reel Campaign 02", aspectRatio: "9/16" },
      { type: "video", category: "Reels", src: "/projects/punjab-immigration/_punjabimmigration_1782473052_3927990342666598625_67354189286.mp4", caption: "Instagram Reel Campaign 03", aspectRatio: "9/16" },
      { type: "video", category: "Reels", src: "/projects/punjab-immigration/_punjabimmigration_1783960914_3940471885267945664_67354189286.mp4", caption: "Instagram Reel Campaign 04", aspectRatio: "9/16" }
    ],
    nextProjectSlug: "dolma-aunti-momos"
  },
  {
    id: "dolma-aunti-momos",
    name: "Dolma Aunti Momos",
    slug: "dolma-aunti-momos",
    aspectRatio: "1122/1402",
    logo: "/logos/dolma-aunti-momos.jpg",
    industry: "Food & Beverage",
    category: "Restaurants",
    year: "2024",
    color: "#ef4444",
    image: "/projects/dolma-aunti-momos/dolmapost.png",
    summary: "Viral launch movement filling a market gap for the legendary food brand.",
    challenge: "There was no viral momos spot in the local market. A massive gap existed in the street food landscape which needed an authentic, hype-building digital presence.",
    solution: "We identified the market gap and engineered an explosive viral content campaign around Reel 01 — generating 224,000+ views, 2,622 likes, and over 2,000 organic shares to establish instant brand dominance.",
    testimonial: {
      quote: "We didn't expect such a massive turnout during the initial days of our launch. But as YENOH's content went viral, the response was so overwhelming that our stock sold out completely day after day!",
      author: "Founder, Dolma Aunti Momos"
    },
    deliverables: [
      "Logo Design & Complete Brand Kit",
      "Google My Business (GMB) First Drive Setup",
      "Market Gap Positioning Playbook",
      "Viral Video Reels Campaign",
      "On-site Authentic Content Production",
      "Social Hype & Event Growth"
    ],
    brandIdentity: {
      colors: ["#EF4444", "#FCA5A5", "#1C1917"],
      fonts: ["Bangers", "Inter"]
    },
    duration: "3 Weeks",
    platforms: "Instagram, Google My Business, Local PR",
    services: [
      "Logo Design",
      "Brand Kit",
      "Google My Business (GMB)",
      "Instagram Launch",
      "Viral Content",
      "Content Planning",
      "Promotional Content"
    ],
    results: [
      { metric: "979K", label: "Views in 20 Days" },
      { metric: "627", label: "New Followers" },
      { metric: "15K", label: "Total Shares" },
      { metric: "10K", label: "Total Likes" },
      { metric: "1,151", label: "Bio Link Taps" },
      { metric: "23K", label: "Profile Visits" }
    ],
    viralSpotlight: {
      video: "/projects/dolma-aunti-momos/DAREEL1.mp4",
      title: "Breakthrough Viral Reel Campaign",
      metrics: [
        { label: "Views", value: "224K" },
        { label: "Shares", value: "4.5K" },
        { label: "Likes", value: "2.6K" },
        { label: "Saves", value: "800" }
      ]
    },
    gallery: [
      { type: "image", category: "Website", src: "/projects/dolma-aunti-momos/PCVIEW-DOLMA.png", caption: "Official Web Platform Desktop Interface" },
      { type: "image", category: "Website", src: "/projects/dolma-aunti-momos/MOBILE VIEW DOLMA.png", caption: "Official Web Platform Mobile Interface" },
      { type: "video", category: "Reels", src: "/projects/dolma-aunti-momos/DAREEL1.mp4", caption: "VIRAL REEL 01 — 224K+ VIEWS • 2.6K LIKES • 2K SHARES" },
      { type: "video", category: "Reels", src: "/projects/dolma-aunti-momos/DAREEL2.mp4", caption: "Reel Campaign 02" },
      { type: "video", category: "Reels", src: "/projects/dolma-aunti-momos/DAREEL3.mp4", caption: "Reel Campaign 03" },
      { type: "video", category: "Reels", src: "/projects/dolma-aunti-momos/DAREEL4.mp4", caption: "Reel Campaign 04" },
      { type: "video", category: "Reels", src: "/projects/dolma-aunti-momos/DAREEL5.mp4", caption: "Reel Campaign 05" },
      { type: "image", category: "Graphics", src: "/projects/dolma-aunti-momos/dolmapost.png", caption: "Official Brand Campaign Creative" }
    ],
    nextProjectSlug: "chaat-king-india"
  },
  {
    id: "chaat-king-india",
    name: "Chaat King India",
    slug: "chaat-king-india",
    logo: "/logos/chaat-king-india.jpg",
    aspectRatio: "4/5",
    industry: "Food & Beverage",
    category: "Restaurants",
    year: "2024",
    color: "#f97316",
    image: "/projects/chaat-king-india/post1.jpg",
    summary: "Meme marketing and UGC growth for a street food franchise.",
    challenge: "Chaat King needed to connect with a younger demographic and increase footfall across their multiple franchise locations.",
    solution: "We deployed a highly engaging, humor-driven meme marketing strategy coupled with User Generated Content (UGC) campaigns to make the brand highly relatable.",
    duration: "6 Months",
    platforms: "Instagram, Google My Business",
    services: [
      "Google Business Profile",
      "Google My Business (GMB)",
      "Instagram Growth",
      "UGC Content",
      "Meme Marketing",
      "Promotional Content",
      "Brand Awareness"
    ],
    deliverables: [
      "Google My Business Setup & Optimization",
      "Instagram Reel Marketing",
      "Meme Marketing Campaigns",
      "UGC Footfall Activation"
    ],
    results: [
      { metric: "40%", label: "Increase in Footfall" },
      { metric: "300K+", label: "Total Views" }
    ],
    gallery: [
      // 10 Unique Video Reels (Clean without text captions)
      { type: "video", category: "Reels", src: "/projects/chaat-king-india/cki1.mp4" },
      { type: "video", category: "Reels", src: "/projects/chaat-king-india/cki2.mp4" },
      { type: "video", category: "Reels", src: "/projects/chaat-king-india/cki3.mp4" },
      { type: "video", category: "Reels", src: "/projects/chaat-king-india/cki4.mp4" },
      { type: "video", category: "Reels", src: "/projects/chaat-king-india/cki5.mp4" },
      { type: "video", category: "Reels", src: "/projects/chaat-king-india/cki6.mp4" },
      { type: "video", category: "Reels", src: "/projects/chaat-king-india/cki7.mp4" },
      { type: "video", category: "Reels", src: "/projects/chaat-king-india/cki8.mp4" },
      { type: "video", category: "Reels", src: "/projects/chaat-king-india/cki9.mp4" },
      { type: "video", category: "Reels", src: "/projects/chaat-king-india/cki10.mp4" },
      // 8 Graphics
      { type: "image", category: "Graphics", src: "/projects/chaat-king-india/post1.jpg", caption: "Featured Brand Poster" },
      { type: "image", category: "Graphics", src: "/projects/chaat-king-india/chaatkingindia_amritsar_1776137400_3874844203449231394_77805671370.jpg", caption: "Social Brand Creative" },
      { type: "image", category: "Graphics", src: "/projects/chaat-king-india/chaatkingindia_amritsar_1766638816_3795163997260679746_77805671370.jpg", caption: "Brand Campaign Graphic 01" },
      { type: "image", category: "Graphics", src: "/projects/chaat-king-india/chaatkingindia_amritsar_1767016348_3798330889063706373_77805671370.jpg", caption: "Brand Campaign Graphic 02" },
      { type: "image", category: "Graphics", src: "/projects/chaat-king-india/chaatkingindia_amritsar_1767592840_3803166541228437980_77805671370.jpg", caption: "Brand Campaign Graphic 03" },
      { type: "image", category: "Graphics", src: "/projects/chaat-king-india/chaatkingindia_amritsar_1768078333_3807239462020431396_77805671370.jpg", caption: "Brand Campaign Graphic 04" },
      { type: "image", category: "Graphics", src: "/projects/chaat-king-india/chaatkingindia_amritsar_1768371356_3808247859272443870_77805671370.jpg", caption: "Brand Campaign Graphic 05" },
      { type: "image", category: "Graphics", src: "/projects/chaat-king-india/chaatkingindia_amritsar_1769407265_3818387354235267003_77805671370.jpg", caption: "Brand Campaign Graphic 06" }
    ],
    nextProjectSlug: "samarth-academy"
  },
  {
    id: "samarth-academy",
    name: "Samarth Academy",
    slug: "samarth-academy",
    logo: "/logos/samarth-academy.jpg",
    aspectRatio: "16/10.5",
    industry: "Education & EdTech",
    category: "Websites",
    year: "2024",
    color: "#3b82f6",
    image: "/projects/samarth-academy/PCVIEW-SAMARTH.png",
    summary: "Top-level EdTech web platform with custom admin CMS portal, live exam alerts, and 15+ video episodes & reels produced.",
    challenge: "Samarth Academy needed a top-tier digital platform capable of ranking #1 on Google for competitive exam queries, managing course syllabi in real-time, and hosting high-volume video content.",
    solution: "We engineered a top-level Next.js web application paired with a full-control admin portal for live blogs, course updates, and exam alerts, alongside producing 15+ broadcast-grade video episodes and social reels.",
    testimonial: {
      quote: "YENOH built us a top-level web platform that dominates Google search rankings. Managing our courses and exam alerts through the admin portal is seamless!",
      author: "Founder, Samarth Academy"
    },
    deliverables: [
      "Top-Level Custom EdTech Web Platform",
      "Full-Control Admin CMS Portal (Blogs, Courses, Reviews & Exam Alerts)",
      "15+ Broadcast-Grade Video Episodes & Reels Produced",
      "Google Search Engine Rank Dominance"
    ],
    duration: "5 Months",
    platforms: "Web, Instagram, YouTube",
    services: [
      "Website Development",
      "Admin Control Portal",
      "SEO Ranking Optimization",
      "15+ Video Episodes Production",
      "Live Exam Alerts System",
      "Course & Blog Management"
    ],
    results: [
      { metric: "#1", label: "Google SERP Search Ranking" },
      { metric: "15+", label: "Video Episodes & Reels Produced" },
      { metric: "Top-Tier", label: "Custom EdTech Web Platform & Admin CMS" }
    ],
    adminPortalSpotlight: {
      title: "Full-Control Admin Portal",
      features: [
        { icon: <VscEdit />, label: "Blog Management", desc: "Publish & edit SEO blogs for Google ranking" },
        { icon: <VscMortarBoard />, label: "Course Control", desc: "Add, update, or remove courses in real-time" },
        { icon: <VscStarFull />, label: "Reviews & Ratings", desc: "Approve and showcase student testimonials" },
        { icon: <VscBell />, label: "Exam Alerts", desc: "Push live exam notifications to all students" }
      ]
    },
    gallery: [
      { type: "image", category: "Website", src: "/projects/samarth-academy/PCVIEW-SAMARTH.png", caption: "High-Ranking Desktop Web Platform Interface" },
      { type: "image", category: "Website", src: "/projects/samarth-academy/mobile1.PNG", caption: "Mobile Responsive Student View 01" },
      { type: "image", category: "Website", src: "/projects/samarth-academy/mobile2.PNG", caption: "Mobile Responsive Student View 02" },
      // 8 Video Reels (Clean without text overlay)
      { type: "video", category: "Reels", src: "/projects/samarth-academy/gs1.mp4" },
      { type: "video", category: "Reels", src: "/projects/samarth-academy/gs2.mp4" },
      { type: "video", category: "Reels", src: "/projects/samarth-academy/gs3.mp4" },
      { type: "video", category: "Reels", src: "/projects/samarth-academy/gs4.mp4" },
      { type: "video", category: "Reels", src: "/projects/samarth-academy/gs5.mp4" },
      { type: "video", category: "Reels", src: "/projects/samarth-academy/gs6.mp4" },
      { type: "video", category: "Reels", src: "/projects/samarth-academy/gs7.mp4" },
      { type: "video", category: "Reels", src: "/projects/samarth-academy/gs8.mp4" },
      // 8 Graphics
      { type: "image", category: "Graphics", src: "/projects/samarth-academy/ggs1.jpg", caption: "Featured Course Announcement" },
      { type: "image", category: "Graphics", src: "/projects/samarth-academy/gyanm.samarth.academy_1762261641_3758445516439524575_53057653876.jpg", caption: "Exam Notification Creative 01" },
      { type: "image", category: "Graphics", src: "/projects/samarth-academy/gyanm.samarth.academy_1762261641_3758445516473045515_53057653876.jpg", caption: "Exam Notification Creative 02" },
      { type: "image", category: "Graphics", src: "/projects/samarth-academy/gyanm.samarth.academy_1762261641_3758445516481432486_53057653876.jpg", caption: "Course Syllabus Graphic 01" },
      { type: "image", category: "Graphics", src: "/projects/samarth-academy/gyanm.samarth.academy_1762261641_3758445516531822360_53057653876.jpg", caption: "Course Syllabus Graphic 02" },
      { type: "image", category: "Graphics", src: "/projects/samarth-academy/gyanm.samarth.academy_1762261641_3758445516867342196_53057653876.jpg", caption: "Student Testimonial Feature" },
      { type: "image", category: "Graphics", src: "/projects/samarth-academy/gyanm.samarth.academy_1763283000_3767013299192952802_53057653876.jpg", caption: "Academic Milestone Graphic" },
      { type: "image", category: "Graphics", src: "/projects/samarth-academy/gyanm.samarth.academy_1763283000_3767013299268446651_53057653876.jpg", caption: "Course Batch Alert" }
    ],
    nextProjectSlug: "learnmatics"
  },
  {
    id: "learnmatics",
    name: "Learnmatics",
    slug: "learnmatics",
    logo: "/logos/learnmatics.jpg",
    aspectRatio: "4/5",
    industry: "Coaching Institute",
    category: "Video Production",
    year: "2024",
    color: "#8b5cf6",
    image: "/projects/learnmatics/lmg1.jpg",
    summary: "High-converting video ads and strategic ad creatives for a coaching institute.",
    challenge: "Learnmatics coaching institute needed engaging video ads and ad creatives to boost brand reach and drive walk-in footfall.",
    solution: "We produced a series of high-impact video ads and designed eye-catching ad creatives tailored for digital performance campaigns.",
    duration: "2 Months",
    platforms: "Meta, YouTube",
    services: [
      "Video Ads Production",
      "Performance Ad Creatives",
      "Campaign Strategy Assets"
    ],
    results: [],
    gallery: [
      // 2 Video Reels (Clean without text captions)
      { type: "video", category: "Reels", src: "/projects/learnmatics/lm1.mp4" },
      { type: "video", category: "Reels", src: "/projects/learnmatics/lm2.mp4" },
      // 4 Graphics
      { type: "image", category: "Graphics", src: "/projects/learnmatics/lmg1.jpg", caption: "Performance Marketing Ad Creative 01" },
      { type: "image", category: "Graphics", src: "/projects/learnmatics/lmg2.jpg", caption: "Performance Marketing Ad Creative 02" },
      { type: "image", category: "Graphics", src: "/projects/learnmatics/lm3.jpg", caption: "Campaign Ad Design 03" },
      { type: "image", category: "Graphics", src: "/projects/learnmatics/lmg4.jpg", caption: "Performance Marketing Ad Creative 04" }
    ],
    nextProjectSlug: "books-route"
  },
  {
    id: "books-route",
    name: "Books Route",
    slug: "books-route",
    logo: "/logos/books-route.jpg",
    aspectRatio: "9/16",
    industry: "Bookstore & Publishing",
    category: "Creative Content",
    year: "2024",
    color: "#d97706",
    image: "/projects/books-route/sp1.mp4",
    summary: "Poetic storytelling, creative literature content, and engaging video reels for an independent bookstore.",
    challenge: "Books Route needed to connect with literature enthusiasts, build a vibrant reading community online, and bring book discovery to life through authentic digital storytelling.",
    solution: "We engineered a creative content strategy centered around evocative spoken-word poetry reels, aesthetic book highlights, and literary video campaigns that significantly uplifted the overall production quality of their brand.",
    testimonial: {
      quote: "YENOH brought a unique artistic touch to our brand. Their poetry reels and creative videos uplifted our production quality and resonated beautifully with our reading community.",
      author: "Founder, Books Route"
    },
    deliverables: [
      "Literary Poetry Video Reels",
      "Production Quality Uplift",
      "Creative Brand Storytelling",
      "Aesthetic Visual Content"
    ],
    duration: "3 Months",
    platforms: "Instagram, Social Media",
    services: [
      "Script Writing",
      "Poetry Content",
      "Reels Production",
      "Creative Content",
      "Social Media Strategy"
    ],
    results: [
      { metric: "210K+", label: "Organic Video Views Delivered" },
      { metric: "10+", label: "Creative & Poetic Video Reels Produced" },
      { metric: "100%", label: "Brand Content & Production Quality Uplifted" }
    ],
    gallery: [
      { type: "video", category: "Reels", src: "/projects/books-route/sp1.mp4", caption: "Creative Literature Reel 01", aspectRatio: "16/9" },
      { type: "video", category: "Reels", src: "/projects/books-route/sp2.mp4", caption: "Creative Literature Reel 02", aspectRatio: "16/9" },
      { type: "video", category: "Reels", src: "/projects/books-route/sp4.mp4", caption: "Creative Literature Reel 03", aspectRatio: "16/9" },
      { type: "video", category: "Reels", src: "/projects/books-route/sp5.mp4", caption: "Creative Literature Reel 04", aspectRatio: "16/9" },
      { type: "video", category: "Reels", src: "/projects/books-route/sp3.mp4", caption: "Creative Poetry Reel 05", aspectRatio: "9/16" },
      { type: "video", category: "Reels", src: "/projects/books-route/sp6.mp4", caption: "Creative Poetry Reel 06", aspectRatio: "9/16" },
      { type: "video", category: "Reels", src: "/projects/books-route/sp7.mp4", caption: "Creative Poetry Reel 07", aspectRatio: "9/16" },
      { type: "video", category: "Reels", src: "/projects/books-route/sp8.mp4", caption: "Creative Poetry Reel 08", aspectRatio: "9/16" }
    ],
    nextProjectSlug: "dsidein"
  },
  {
    id: "dsidein",
    name: "DSIDEIN Studio",
    slug: "dsidein",
    aspectRatio: "16/10.5",
    industry: "Survey & Research Software",
    category: "Web Application",
    year: "2025",
    color: "#14b8a6",
    image: "/projects/dsidein/PCVIEW1.png",
    summary: "Complete web application platform, enterprise UI/UX design, and brand identity kit for DSIDEIN Studio.",
    challenge: "DSIDEIN Studio needed a sleek, highly persuasive web platform and brand presentation to showcase their interactive survey software suite and win enterprise pilot clients.",
    solution: "We designed a full brand identity kit and built an end-to-end interactive web platform with high-performance UI/UX design optimized for desktop and mobile devices.",
    testimonial: {
      quote: "The web application and brand identity YENOH built for DSIDEIN communicates our enterprise value proposition perfectly. It gave prospective clients instant confidence during pilot demos.",
      author: "Founder, DSIDEIN Studio"
    },
    deliverables: [
      "Logo Design & Complete Brand Kit",
      "Interactive Product Web Platform",
      "Enterprise UI/UX Design System",
      "Frontend Web Application Build",
      "Interactive Product Showcase"
    ],
    duration: "3 Months",
    platforms: "Web, Mobile",
    services: [
      "Logo Design",
      "Brand Kit",
      "Product Website",
      "UI/UX Design",
      "Frontend Development",
      "Responsive Build",
      "Brand Presentation"
    ],
    results: [
      { metric: "12+", label: "Enterprise Pilots Secured" },
      { metric: "< 1s", label: "Page Load Speed" },
      { metric: "100%", label: "Mobile Responsive Build" }
    ],
    gallery: [
      { type: "image", category: "Website", src: "/projects/dsidein/PCVIEW1.png", caption: "Official Web Platform Desktop Interface" },
      { type: "image", category: "Website", src: "/projects/dsidein/MOBILEVIEW1.png", caption: "Mobile Responsive Layout & Interface", isMobile: true, aspectRatio: "9/16" }
    ],
    nextProjectSlug: "bds-blossoms"
  },
  {
    id: "bds-blossoms",
    name: "BDS Blossoms",
    slug: "bds-blossoms",
    logo: "/logos/bds-blossoms.png",
    aspectRatio: "16/10.5",
    industry: "Education",
    category: "Websites",
    year: "2024",
    color: "#ec4899",
    image: "/projects/bds-blossoms/PCVIEW1.png",
    summary: "A complete 7-page school website built with premium design to attract admissions and establish BDS Blossoms as the leading institution in their area.",
    challenge: "BDS Blossoms needed a proper, professional 7-page school website that parents would trust, that ranked well on Google, and that clearly communicated their academic strengths to drive admissions.",
    solution: "We built a complete 7-page school website with a premium design — covering Home, Admissions, Courses, Faculty, About, Gallery, and Contact — optimized for SEO and mobile-first performance.",
    testimonial: {
      quote: "The website YENOH built for us looks incredibly professional. Parents frequently tell us they chose BDS Blossoms because the website gave them confidence in our institution.",
      author: "Principal, BDS Blossoms"
    },
    deliverables: [
      "7-Page Full School Website",
      "Mobile-First Responsive Design",
      "Admissions & Contact System",
      "SEO Optimization"
    ],
    duration: "6 Weeks",
    platforms: "Web",
    services: [
      "Website Development",
      "UI/UX Design",
      "Mobile-Responsive Build",
      "SEO Setup"
    ],
    results: [
      { metric: "7", label: "Pages Built" },
      { metric: "100%", label: "Mobile Responsive" },
      { metric: "250+", label: "Admission Leads Generated" }
    ],
    gallery: [
      { type: "image", category: "Website", src: "/projects/bds-blossoms/PCVIEW1.png", caption: "School Website — Home Page" },
      { type: "image", category: "Website", src: "/projects/bds-blossoms/PCVIEW2.png", caption: "School Website — Inner Page" },
      { type: "image", category: "Website", src: "/projects/bds-blossoms/mobile1.PNG", caption: "Mobile View 01" },
      { type: "image", category: "Website", src: "/projects/bds-blossoms/mobile2.PNG", caption: "Mobile View 02" }
    ],
    nextProjectSlug: "first-drive"
  },
  {
    id: "first-drive",
    name: "First Drive",
    slug: "first-drive",
    logo: "/logos/first-drive.jpg",
    aspectRatio: "16/10.5",
    industry: "Driving School",
    category: "Websites",
    year: "2023",
    color: "#eab308",
    image: "/placeholder-firstdrive.jpg",
    summary: "Lead generation website for a premium driving school.",
    challenge: "First Drive relied on word-of-mouth and needed a digital engine to capture and convert local search traffic.",
    solution: "We designed a clean, mobile-first lead generation website with integrated booking and clear, trustworthy UI/UX.",
    duration: "6 Weeks",
    platforms: "Web",
    services: [
      "Website Development",
      "UI/UX Design",
      "Landing Page",
      "Lead Generation Website"
    ],
    results: [
      { metric: "40%", label: "Conversion Rate" },
      { metric: "3x", label: "Increase in Bookings" }
    ],
    gallery: [
      { type: "image", category: "Website", src: "/placeholder-17.jpg", caption: "Mobile Booking UI" },
      { type: "image", category: "Website", src: "/placeholder-firstdrive.jpg", caption: "Homepage Design" }
    ],
    nextProjectSlug: "yug-chintak"
  },
  {
    id: "yug-chintak",
    name: "Yug Chintak",
    slug: "yug-chintak",
    logo: "/logos/yug-chintak.jpg",
    aspectRatio: "16/9",
    industry: "Media & Infotainment",
    category: "Video Production",
    year: "2024",
    color: "#f59e0b",
    image: "https://img.youtube.com/vi/amm9OPukoEA/maxresdefault.jpg",
    summary: "Podcast & infotainment video production — scripting, shoot, editing, and publishing for Yug Chintak's growing YouTube channel.",
    challenge: "Yug Chintak needed a full production partner to bring their podcast and infotainment ideas to life with cinematic quality that would retain viewers and grow their subscriber base.",
    solution: "We handled everything — from scripting, professional shoots, premium editing, color grading, and thumbnail design — delivering a consistent content pipeline of high-retention podcast and infotainment episodes.",
    testimonial: {
      quote: "YENOH transformed our raw ideas into polished, engaging episodes. Our views and watch time grew dramatically after they took over our production.",
      author: "Founder, Yug Chintak"
    },
    deliverables: [
      "Full Podcast Video Production",
      "Infotainment Episode Editing",
      "Color Grading & Sound Mix",
      "Thumbnail & Branding"
    ],
    duration: "Ongoing",
    platforms: "YouTube",
    services: [
      "Podcast Video Production",
      "Professional Shoot",
      "Editing & Color Grading",
      "Thumbnail Design",
      "YouTube Publishing"
    ],
    results: [
      { metric: "3+", label: "Episodes Produced" },
      { metric: "100%", label: "In-House Production" },
      { metric: "↑", label: "Watch Time & Retention" }
    ],
    gallery: [
      { type: "youtube", category: "Videos", src: "https://www.youtube.com/embed/amm9OPukoEA?si=DCT9C1bmy-g1G8ki", caption: "Yug Chintak Episode 01" },
      { type: "youtube", category: "Videos", src: "https://www.youtube.com/embed/z_DqiYL1Y1Y?si=Ii3RcoBcAieIecdv", caption: "Yug Chintak Episode 02" },
      { type: "youtube", category: "Videos", src: "https://www.youtube.com/embed/MeLX6j-nPp0?si=rl9BDHnRAYJyIpaH", caption: "Yug Chintak Episode 03" }
    ],
    nextProjectSlug: "elect-punjab"
  },
  {
    id: "elect-punjab",
    name: "Elect Punjab",
    slug: "elect-punjab",
    logo: "/logos/elect-punjab.jpg",
    aspectRatio: "16/10.5",
    industry: "Political Media",
    category: "Political",
    year: "2024",
    color: "#0284c7",
    image: "/projects/elect-punjab/g1.jpg",
    aspectRatio: "4/5",
    summary: "Audience growth, political campaign creatives, and viral video reels for a political news & media platform.",
    challenge: "Elect Punjab needed to rapidly build a trusted, highly engaged digital audience ahead of state elections and dominate local political social feeds.",
    solution: "We managed their end-to-end social media ecosystem — running high-impact election ad campaigns, producing 5 viral political reels, and designing high-authority news graphics.",
    testimonial: {
      quote: "YENOH's digital media execution and video reels gave Elect Punjab massive reach during the elections. Their campaign creatives drove unprecedented follower growth and engagement.",
      author: "Editor-in-Chief, Elect Punjab"
    },
    deliverables: [
      "Political Media Growth Strategy",
      "Election Video Reels Production",
      "High-Authority News Graphics",
      "Meta Ads & Audience Expansion"
    ],
    duration: "8 Months",
    platforms: "Meta, Instagram, Facebook, X",
    services: [
      "Social Media Management",
      "Meta Ads",
      "Campaign Creatives",
      "Reels Production",
      "Audience Growth"
    ],
    results: [
      { metric: "1M+", label: "Monthly Reach" },
      { metric: "200K+", label: "Engaged Followers" },
      { metric: "5+", label: "Election Campaign Reels" }
    ],
    gallery: [
      // 5 Video Reels
      { type: "video", category: "Reels", src: "/projects/elect-punjab/ep1.mp4", caption: "Election News Reel 01" },
      { type: "video", category: "Reels", src: "/projects/elect-punjab/ep2.mp4", caption: "Election News Reel 02" },
      { type: "video", category: "Reels", src: "/projects/elect-punjab/ep3.mp4", caption: "Election News Reel 03" },
      { type: "video", category: "Reels", src: "/projects/elect-punjab/ep4.mp4", caption: "Election News Reel 04" },
      { type: "video", category: "Reels", src: "/projects/elect-punjab/ep5.mp4", caption: "Election News Reel 05" },
      // 3 Graphics
      { type: "image", category: "Graphics", src: "/projects/elect-punjab/g1.jpg", caption: "Featured News Campaign Creative 01" },
      { type: "image", category: "Graphics", src: "/projects/elect-punjab/g2.jpg", caption: "Political Authority Graphic 02" },
      { type: "image", category: "Graphics", src: "/projects/elect-punjab/g3.jpg", caption: "Election Coverage Post 03" }
    ],
    nextProjectSlug: "harman-sekhon"
  },
  {
    id: "harman-sekhon",
    name: "Harman Sekhon",
    slug: "harman-sekhon",
    logo: "/logos/harman-sekhon.jpg",
    aspectRatio: "4/5",
    industry: "Public Figure",
    category: "PR",
    year: "2024",
    color: "#d946ef",
    image: "/projects/harman-sekhon/Harman Sekhon.png",
    summary: "Personal brand management and PR growth strategy.",
    challenge: "Needed to establish a strong, coherent personal brand and digital presence for a rising public figure.",
    solution: "We developed a comprehensive content strategy, managed their social media, and executed targeted PR campaigns to elevate their public profile.",
    duration: "Ongoing",
    platforms: "Instagram, LinkedIn, PR",
    services: [
      "Personal Brand Management",
      "PR Growth",
      "Content Strategy",
      "Social Media Management"
    ],
    results: [
      { metric: "15+", label: "Major Media Placements" },
      { metric: "300%", label: "Profile Engagement" }
    ],
    gallery: [
      // 10 Video Reels (Clean without text captions)
      { type: "video", category: "Reels", src: "/projects/harman-sekhon/hs1.mp4" },
      { type: "video", category: "Reels", src: "/projects/harman-sekhon/hs2.mp4" },
      { type: "video", category: "Reels", src: "/projects/harman-sekhon/hs3.mp4" },
      { type: "video", category: "Reels", src: "/projects/harman-sekhon/hs4.mp4" },
      { type: "video", category: "Reels", src: "/projects/harman-sekhon/hs5.mp4" },
      { type: "video", category: "Reels", src: "/projects/harman-sekhon/hs6.mp4" },
      { type: "video", category: "Reels", src: "/projects/harman-sekhon/hs7.mp4" },
      { type: "video", category: "Reels", src: "/projects/harman-sekhon/hs8.mp4" },
      { type: "video", category: "Reels", src: "/projects/harman-sekhon/hs9.mp4" },
      { type: "video", category: "Reels", src: "/projects/harman-sekhon/hs10.mp4" },
      // 8 Graphics
      { type: "image", category: "Graphics", src: "/projects/harman-sekhon/Harman Sekhon.png", caption: "Official Branding Portrait" },
      { type: "image", category: "Graphics", src: "/projects/harman-sekhon/Harman Sekhon (1).png", caption: "Personal Branding Portrait (Alternative)" },
      { type: "image", category: "Graphics", src: "/projects/harman-sekhon/hsg1.jpg", caption: "Brand Event Feature" },
      { type: "image", category: "Graphics", src: "/projects/harman-sekhon/hsg2.jpg", caption: "Branding Campaign Creative" },
      { type: "image", category: "Graphics", src: "/projects/harman-sekhon/1badd576-1b36-4dcf-818a-528d6159799f.jpg", caption: "Campaign Poster Design" },
      { type: "image", category: "Graphics", src: "/projects/harman-sekhon/WhatsApp Image 2026-06-25 at 12.24.36 AM.jpeg", caption: "Public Relations Creative 01" },
      { type: "image", category: "Graphics", src: "/projects/harman-sekhon/WhatsApp Image 2026-06-25 at 12.24.37 AM.jpeg", caption: "Public Relations Creative 02" },
      { type: "image", category: "Graphics", src: "/projects/harman-sekhon/WhatsApp Image 2026-06-25 at 12.24.38 AM.jpeg", caption: "Public Relations Creative 03" },
      // 2 Instagram Grid Previews
      { type: "image", category: "Social Grid", src: "/projects/harman-sekhon/IMG_1616.PNG", caption: "Instagram Curation Feed 01" },
      { type: "image", category: "Social Grid", src: "/projects/harman-sekhon/IMG_1617.PNG", caption: "Instagram Curation Feed 02" }
    ],
    nextProjectSlug: "advocate-amarjeet-singh"
  },
  {
    id: "advocate-amarjeet-singh",
    name: "Advocate Amarjeet Singh Pannu",
    slug: "advocate-amarjeet-singh",
    logo: "/logos/advocate-amarjeet-singh.jpg",
    aspectRatio: "4/5",
    industry: "Political & Legal",
    category: "Political",
    year: "2024",
    color: "#0F172A",
    image: "/projects/advocate-amarjeet-singh/p2.jpg",
    summary: "",
    challenge: "Advocate Amarjeet Singh Pannu required a modern, data-driven digital campaign to mobilize local voters, build personal brand authority, and manage public messaging during a high-stakes campaign.",
    solution: "We deployed targeted Meta ad campaigns, produced high-impact video reels, managed community PR, and crafted authentic content that established overwhelming voter trust.",
    testimonial: {
      quote: "YENOH's strategic digital media execution gave our campaign massive reach and momentum. The video content and targeted ads resonated deeply across every constituency!",
      author: "Campaign Team, Advocate Amarjeet Singh Pannu"
    },
    deliverables: [
      "Political Campaign Strategy",
      "Targeted Meta & Social Ad Funnels",
      "High-Impact Reel Video Production",
      "Community PR & Public Relations"
    ],
    duration: "4 Months",
    platforms: "Meta, Instagram, Facebook, Local Media",
    services: [
      "Election Campaign",
      "Meta Ads",
      "Personal Branding",
      "PR Growth",
      "Campaign Content"
    ],
    results: [
      { metric: "2M+", label: "Voter Reach" },
      { metric: "100%", label: "Community Engagement" },
      { metric: "#2 Rank", label: "Close Finish Margin" }
    ],
    gallery: [
      // 6 Video Reels (Clean without text overlay)
      { type: "video", category: "Reels", src: "/projects/advocate-amarjeet-singh/asp1.mp4" },
      { type: "video", category: "Reels", src: "/projects/advocate-amarjeet-singh/asp2.mp4" },
      { type: "video", category: "Reels", src: "/projects/advocate-amarjeet-singh/asp3.mp4" },
      { type: "video", category: "Reels", src: "/projects/advocate-amarjeet-singh/asp4.mp4" },
      { type: "video", category: "Reels", src: "/projects/advocate-amarjeet-singh/asp5.mp4" },
      { type: "video", category: "Reels", src: "/projects/advocate-amarjeet-singh/asp6.mp4" },
      // 6 Graphics & Post Creatives
      { type: "image", category: "Graphics", src: "/projects/advocate-amarjeet-singh/p1.jpg", caption: "Campaign Manifesto Graphic" },
      { type: "image", category: "Graphics", src: "/projects/advocate-amarjeet-singh/p2.jpg", caption: "Official Leadership Portrait" },
      { type: "image", category: "Graphics", src: "/projects/advocate-amarjeet-singh/p3.jpg", caption: "Public Communication Creative" },
      { type: "image", category: "Graphics", src: "/projects/advocate-amarjeet-singh/p4.jpg", caption: "Constituency Outreach Post" },
      { type: "image", category: "Graphics", src: "/projects/advocate-amarjeet-singh/p5.jpg", caption: "Event Announcement Creative" },
      { type: "image", category: "Graphics", src: "/projects/advocate-amarjeet-singh/p6.jpg", caption: "Brand Authority Visual" },
      // 2 Instagram Grid Previews
      { type: "image", category: "Social Grid", src: "/projects/advocate-amarjeet-singh/IMG_1605.PNG", caption: "Instagram Campaign Feed 01" },
      { type: "image", category: "Social Grid", src: "/projects/advocate-amarjeet-singh/IMG_1606.PNG", caption: "Instagram Campaign Feed 02" }
    ],
    nextProjectSlug: "biinaii-studios"
  },
  {
    id: "biinaii-studios",
    name: "Biinaii Studios (Zikr Randhawa)",
    slug: "biinaii-studios",
    logo: "/logos/biinaii-studios.jpg",
    aspectRatio: "16/9",
    industry: "Music & Entertainment",
    category: "Video Production",
    year: "2025",
    color: "#ec4899",
    image: "/projects/biinaii-studios/teaserbn.mp4",
    summary: "Complete 360° music release ecosystem for Biinaii Studios & artist Zikr Randhawa — Golden Batt BTS shoot, official launch teaser, multi-platform global song distribution, Spotify management, and targeted Meta & Google ad campaigns.",
    challenge: "Biinaii Studios needed an end-to-end digital agency to execute the release for artist Zikr Randhawa — capturing on-set BTS video, producing the teaser, distributing songs across all global streaming platforms, and running performance ads to drive stream growth.",
    solution: "We produced both the official launch teaser and the Golden Batt Music Video BTS shoot, managed global song distribution across Spotify, Apple Music, YouTube Music & all major platforms, designed brand assets, and ran targeted Meta & Google ad funnels.",
    testimonial: {
      quote: "YENOH handled our entire release — from shooting the Golden Batt BTS and launch teaser to distributing our songs across all global platforms and running performance ads. Incredible results!",
      author: "Founder, Biinaii Studios"
    },
    deliverables: [
      "Golden Batt Music Video BTS Shoot",
      "Official Launch Teaser Video Production",
      "Multi-Platform Global Song Distribution (Spotify, Apple, YouTube Music, etc.)",
      "Spotify Artist Management & Catalog Curation",
      "Meta & Google Performance Ad Campaigns",
      "Brand Identity & Logo Design",
      "Social Reel Campaigns"
    ],
    duration: "3 Months",
    platforms: "Spotify, Apple Music, YouTube, Instagram, Meta Ads, Google Ads",
    services: [
      "BTS Video Shoot",
      "Official Teaser Production",
      "Multi-Platform Song Distribution",
      "Spotify Artist Management",
      "Meta Ads",
      "Google Ads",
      "Performance Marketing",
      "Logo & Brand Identity",
      "Reels Production",
      "Artist PR Strategy"
    ],
    results: [
      { metric: "6+", label: "Official Videos Shot & Produced (BTS, Teaser & Reels)" },
      { metric: "100%", label: "Global Streaming Song Distribution" },
      { metric: "Ads", label: "Meta & Google Targeted Campaigns" }
    ],
    gallery: [
      { type: "youtube", category: "Videos", src: "https://www.youtube.com/embed/ZVHXu8a-NJI?si=FLdU-qXg-oHnkORQ", caption: "Golden Batt Music Video BTS — Official Behind The Scenes", aspectRatio: "16/9" },
      { type: "video", category: "Reels", src: "/projects/biinaii-studios/teaserbn.mp4", caption: "Zikr Randhawa — Official Teaser Video Release", aspectRatio: "16/9" },
      { type: "video", category: "Reels", src: "/projects/biinaii-studios/bn1.mp4", caption: "Artist Reel 01" },
      { type: "video", category: "Reels", src: "/projects/biinaii-studios/bn2.mp4", caption: "Artist Reel 02" },
      { type: "video", category: "Reels", src: "/projects/biinaii-studios/bn3.mp4", caption: "Artist Reel 03" },
      { type: "video", category: "Reels", src: "/projects/biinaii-studios/bn4.mp4", caption: "Artist Reel 04" }
    ],
    nextProjectSlug: "political-pr-projects"
  },
  {
    id: "political-pr-projects",
    name: "Political PR Projects",
    slug: "political-pr-projects",
    industry: "Political & Governance",
    category: "PR & Reputation",
    year: "2022-2025",
    color: "#475569",
    image: "/projects/punjab-immigration/PCVIEW-PI.png",
    summary: "Confidential digital campaign management, public relations, and political leadership branding.",
    challenge: "Multiple confidential political leaders and public campaigns required high-impact, discreet digital communication and reputation management without revealing private client identities.",
    solution: "We engineered end-to-end digital communication ecosystems, produced over 400+ targeted campaign videos, managed 4 political pages, generated over 1 Million+ organic views, and cultivated over 15,000+ total followers while upholding strict client confidentiality.",
    testimonial: {
      quote: "YENOH executed our high-stakes political PR and digital video campaigns with extreme discretion and unprecedented speed. A masterclass in modern digital political communication.",
      author: "Senior Campaign Strategist (Protected NDA)"
    },
    deliverables: [
      "Discreet Digital Leadership Branding",
      "Confidential Video Content Production",
      "Public Relations & Crisis Management",
      "Multi-Page Social Media Growth"
    ],
    duration: "Ongoing",
    platforms: "Meta, Social Media, PR Media Outlets",
    services: [
      "Political Communication",
      "Leadership Branding",
      "Digital Campaign Management",
      "Public Relations",
      "Crisis Management"
    ],
    results: [
      { metric: "4", label: "Political Pages Managed" },
      { metric: "15K+", label: "Total Followers Built" },
      { metric: "1M+", label: "Organic Video Views Delivered" },
      { metric: "400+", label: "Videos Shot & Produced" }
    ],
    gallery: [],
    nextProjectSlug: "punjab-immigration"
  }
export const ALL_PROJECTS = RAW_PROJECTS.map(p => ({
  ...p,
  image: getCloudinaryUrl(p.image),
  video: p.video ? getCloudinaryUrl(p.video) : undefined,
  gallery: p.gallery ? p.gallery.map(g => ({
    ...g,
    src: getCloudinaryUrl(g.src)
  })) : p.gallery
}));

export const projectsData = ALL_PROJECTS.reduce((acc, p) => {
  acc[p.id] = p;
  return acc;
}, {});
