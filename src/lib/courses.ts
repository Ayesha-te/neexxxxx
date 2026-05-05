export interface Course {
  id: string;
  name: string;
  category: string;
}

export const courses = {
  digital: {
    name: "💻 Digital & Online Earning Courses",
    icon: "💻",
    courses: [
      "Digital Marketing (Google Ads Included)",
      "Content Writing",
      "SEO (Search Engine Optimization)",
      "TikTok Monetization",
      "YouTube Automation",
      "Facebook Monetization Course",
      "Freelancing Course",
      "Amazon Course",
      "Trading",
    ],
  },
  creative: {
    name: "🎨 Creative & Design Courses",
    icon: "🎨",
    courses: [
      "Graphic Designing (Mobile Graphics)",
      "Canva Course",
      "Photo Editing",
      "Video Editing",
      "InShort Video Course",
      "Art Course",
      "Unique Drawing Course",
      "Paper Craft Course",
      "Handmade Jewellery Course",
    ],
  },
  technical: {
    name: "🌐 Technical & Computer Courses",
    icon: "🌐",
    courses: [
      "WordPress",
      "Web Development",
      "Microsoft Office",
      "Computer Course",
      "Mobile Software",
    ],
  },
  language: {
    name: "🌍 Language & Personal Skills",
    icon: "🌍",
    courses: [
      "Basic English Language",
      "Handwriting Course",
    ],
  },
  skills: {
    name: "🎯 Skill-Based Courses",
    icon: "🎯",
    courses: [
      "Mehndi Course",
      "Mehndi Advance Course",
      "Salai (Knitting) Course",
      "Cooking Course",
      "Baking Course",
    ],
  },
  islamic: {
    name: "🕌 Islamic & Personal Development",
    icon: "🕌",
    courses: [
      "Dua Series Course",
      "Parda Series Course",
      "Surah Mulk Tajweed Course",
      "Deeni aur Ikhlaqi Tarbiyat Course",
      "Hijab Tutorial Course",
    ],
  },
};

export const allCourses = Object.values(courses).flatMap((cat) =>
  cat.courses.map((name, idx) => ({
    id: `${cat.icon}-${idx}`,
    name,
    category: cat.icon,
  })),
);

export const totalCourses = Object.values(courses).reduce(
  (sum, cat) => sum + cat.courses.length,
  0,
);
