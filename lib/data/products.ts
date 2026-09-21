import {
  Activity,
  BarChart3,
  Building2,
  CalendarClock,
  Headset,
  HeartHandshake,
  LayoutTemplate,
  Lightbulb,
  Repeat,
  SlidersHorizontal,
  Smartphone,
  Smile,
  TrendingUp,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * How a product's designed page is dressed. The copy stays in `Product`; this
 * only holds presentation: the hero photograph and an icon for each feature and
 * benefit (in the same order as the copy).
 */
export type ProductDetailPage = {
  hero: {
    /** Trailing words of the headline, set in the accent colour. */
    highlight: string;
    /** The full-bleed hero photograph. */
    image: { src: string; alt: string };
  };
  featureIcons: LucideIcon[];
  benefitIcons: LucideIcon[];
};

/** A key feature or a benefit: its name and the paragraph under it. */
export type ProductPoint = { title: string; description: string };

export type Product = {
  slug: string;
  title: string;
  /** The page's headline. */
  headline: string;
  /** The opening paragraph. */
  intro: string;
  keyFeatures: ProductPoint[];
  benefits: ProductPoint[];
  /** The closing call to action: its statement and its button. */
  closing: { statement: string; ctaLabel: string };
  detailPage: ProductDetailPage;
};

/**
 * PINT is the only product WeSearch offers. LabelEase and Asset Tracker were
 * removed from the site on 2026-09-21 at the client's request; they remain in
 * git history should they ever return.
 *
 * PINT's copy is taken from the client's own PINT page,
 * https://www.strebentechnik.com/PINT (read 2026-09-21), and only from there:
 * nothing is added or reworded (the record is docs/content/pint.md). Two stray
 * full stops in that page ("data-driven. decisions", "inquiries are. thorough")
 * are dropped. Its yellow closing band also carries "Ensure that every product
 * is accounted for, every time.", which is the LabelEase / Asset Tracker line
 * rather than PINT's, so it is left out.
 */
export const products: Product[] = [
  {
    slug: "pint",
    title: "PINT",
    headline: "Boosting Workplace Satisfaction With Continuous Feedback",
    intro: "PINT is a cutting-edge solution crafted to significantly boost workplace satisfaction and productivity by fostering a culture of continuous improvement and engagement. At the heart of this product is our comprehensive feedback system, a versatile tool that collects invaluable insights from your employees on every facet of their work experience.",
    keyFeatures: [
      { title: "Work Environment Evaluations", description: "Examine the physical setup, safety protocols, and cultural atmosphere of your workplace. These evaluations help identify areas where improvements can enhance productivity and employee satisfaction. Regular reviews can also detect potential issues early, allowing for prompt action." },
      { title: "Workplace Happiness Reviews", description: "Gauge employee satisfaction and morale through in-depth feedback, identifying areas of strength and opportunities for improvement. By consistently measuring workplace happiness, you can cultivate a positive work culture that boosts employee engagement and retention." },
      { title: "HR Feedback", description: "Collect targeted insights on HR practices such as recruitment, onboarding, and performance management. This feedback helps refine strategies, ensuring they align with organizational goals and enhance the overall employee experience." },
      { title: "Customizable Feedback Tools", description: "Create tailored questionnaires that address your organization’s specific needs. By customizing the content, you ensure that the feedback you receive is both relevant and actionable, helping to address specific concerns or areas of interest in any of the practices." },
      { title: "Scheduled Feedback Cycles", description: "Automate the distribution of feedback requests at regular intervals to maintain a consistent flow of insights. This approach ensures that feedback is timely and relevant, without the need for manual follow-up, allowing you to track changes and improvements over time." },
      { title: "Customer Service Feedback", description: "Gather insights directly from your customers regarding their experiences with your service. This feedback is crucial for identifying areas where customer interactions can be improved, helping you to enhance satisfaction and loyalty." },
      { title: "Response Monitoring", description: "Track participation in feedback processes, ensuring that all voices are heard. By following up with those who haven’t responded, you can maximize engagement and gather more comprehensive data for your analysis." },
      { title: "Detailed Analytics", description: "Access comprehensive reports and analytics that provide deep insights into the feedback you receive. These tools help identify trends, uncover recurring issues, and measure progress, allowing you to make data-driven decisions that support continuous improvement." },
      { title: "Feedback Templates", description: "Utilize a collection of pre-designed templates tailored to common workplace, HR, and customer service topics. These templates provide a quick and effective way to gather feedback, ensuring that your inquiries are thorough and aligned with industry best practices." },
    ],
    benefits: [
      { title: "Employee Engagement", description: "Regularly collecting feedback is a powerful way to show your commitment to your employees' well-being and development. By actively seeking their input, you foster a culture of open communication and trust, where employees feel valued and heard. This ongoing engagement not only boosts morale but also increases loyalty and reduces turnover. When employees know that their opinions matter and that the organization is willing to act on their feedback, they are more likely to be engaged, motivated, and committed to their roles." },
      { title: "Pre-Defined Intervals", description: "Our system allows you to schedule feedback collection at regular intervals, ensuring continuous monitoring and timely input from your employees or customers. This automated approach guarantees that you’re consistently gathering valuable insights, allowing you to keep a close watch on employee or customer satisfaction and engagement. By maintaining a steady flow of feedback, you can quickly identify emerging issues and address them before they impact productivity or morale." },
      { title: "Actionable Insights", description: "The feedback gathered through our platform is not just data; it’s a wealth of actionable insights. Each piece of input is analysed to provide you with clear, practical recommendations that can be implemented to improve your workplace. These insights empower leaders to make informed decisions that directly enhance employee satisfaction and overall productivity. Whether it's refining a process, improving communication, or addressing specific concerns, the actionable insights gained drive meaningful change." },
      { title: "Real-Time Reporting", description: "Our platform offers robust real-time reporting capabilities, allowing you to access and analyze data as soon as it’s collected. This immediacy means you can quickly spot trends, identify areas that need attention, and respond swiftly to any issues. Comprehensive reports can be generated at the click of a button, providing you with a detailed overview of the feedback landscape. With real-time reporting, you gain a dynamic and up-to-date understanding of your workplace, enabling proactive management." },
      { title: "Benchmarking", description: "Understanding your organization’s progress is crucial, and our tool provides powerful benchmarking features. You can compare feedback results over time, assessing improvements or identifying areas where further effort is needed. Additionally, by benchmarking your results against industry standards or similar organizations, you can gain insights into how your workplace stacks up in the broader market. This comparative analysis helps you set realistic goals, measure progress, and stay competitive in attracting and retaining top talent." },
      { title: "Integration with HR Systems", description: "To provide a complete picture of employee engagement and satisfaction, our feedback collection tool integrates seamlessly with your existing HR systems. This integration allows you to combine employee input with other HR data, such as performance reviews, attendance records, and career development plans. By doing so, you gain a holistic view of each employee’s journey and can tailor your HR strategies to better meet the needs of your workforce. This comprehensive approach enhances your ability to make strategic decisions that benefit both employees and the organization." },
      { title: "Mobile-Friendly", description: "In today’s fast-paced world, convenience is key. Our feedback tool is fully optimized for mobile devices, ensuring that your employees can provide input anytime, anywhere. Whether they’re in the office, working remotely, or on the go, the mobile-friendly design allows for quick and easy participation. This accessibility increases response rates and ensures that you’re capturing input from your entire workforce, regardless of their location or schedule. By making it easy for employees to share their thoughts, you’re more likely to receive honest, timely, and comprehensive feedback." },
    ],
    closing: {
      statement: "Empower your organization with PINT’s survey tool and create a thriving workplace where employees feel heard, valued, and engaged.",
      ctaLabel: "Let's have a chat",
    },
    detailPage: {
      hero: {
        highlight: "Continuous Feedback",
        image: {
          src: "/pint-hero.jpg",
          alt: "Four colleagues smiling as they review information together on a laptop",
        },
      },
      featureIcons: [
        Building2,
        Smile,
        Users,
        SlidersHorizontal,
        CalendarClock,
        Headset,
        Activity,
        BarChart3,
        LayoutTemplate,
      ],
      benefitIcons: [HeartHandshake, Repeat, Lightbulb, Zap, TrendingUp, Workflow, Smartphone],
    },
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

/** The first sentence of a product's opening paragraph: its own words, short enough for a meta description. */
export function productSummary(product: Product) {
  return product.intro.split(/(?<=[.!?])\s+/)[0];
}
