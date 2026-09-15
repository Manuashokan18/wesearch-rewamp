export type Product = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  intro: string;
  keyFeatures: string[];
  benefits: string[];
};

export const products: Product[] = [
  {
    slug: "labelease",
    title: "LabelEase",
    tagline: "Seamless Barcode and Label Printing Made Simple",
    description:
      "LabelEase an innovative barcode and label printing software is specifically designed to streamline and simplify the creation and printing of labels.",
    intro:
      "LabelEase is an innovative barcode and label printing software specifically designed to streamline and simplify the creation and printing of labels. With its user-friendly interface and advanced features, you can effortlessly design and print high-quality labels that meet your specific business requirements.",
    keyFeatures: [
      "Reduced printing and processing time using ZPLII for faster label output.",
      "Seamless integration with leading barcode scanners and Zebra printers.",
      "Print custom labels tailored to your business needs by importing data.",
      "Compatible with thermal, inkjet and laser printers.",
      "Support for multiple languages and fonts for global operations.",
      "Generate barcodes, QR codes and data matrices.",
      "Print up to 300 labels per minute.",
      "Import data for efficient, streamlined information entry.",
    ],
    benefits: [
      "Simultaneously manage multiple products using one label template, with options for barcodes, data matrices and QR codes.",
      "Advanced filtering and reporting to track printed labels and monitor inventory.",
      "Adaptable across industries like retail and healthcare.",
      "Assess progress of finalized and pending tasks, with selective printing when details are missing.",
      "Tailor product labels for unique identification and integrate inventory management across your supply chain.",
    ],
  },
  {
    slug: "asset-tracker",
    title: "Asset Tracker",
    tagline: "Precision Inventory Tracking With RFID Technology",
    description:
      "Asset Tracker uses advanced RFID technology to deliver accurate, real-time control over your assets, transforming how you manage and monitor inventory.",
    intro:
      "Asset Tracker is a state-of-the-art solution designed to provide comprehensive tracking for your inventory. Leveraging RFID technology, Asset Tracker offers unparalleled precision and control over your assets.",
    keyFeatures: [
      "RFID tagging for precise, real-time tracking throughout a product's lifecycle.",
      "Location tracking to pinpoint exact storage location within your facility.",
      "Inventory count with real-time data on stock, missing and misplaced items.",
      "Missing and misplaced item detection with alerts for swift corrective action.",
      "Scalability to support small or large inventory volumes.",
      "User-friendly interface that minimizes the learning curve for your team.",
      "Enhanced security restricting access to sensitive inventory data.",
    ],
    benefits: [
      "Enhanced accuracy — precise tracking and monitoring, reducing errors in inventory management.",
      "Increased efficiency — streamlined tracking processes and reduced manual labor.",
      "Improved visibility — full visibility into inventory for better decision-making.",
      "Quick resolution — promptly address missing or misplaced items.",
      "Cost saving — reduced operational costs from less manual labor and fewer losses.",
      "Customer satisfaction — reliable operations from accurate asset tracking.",
    ],
  },
  {
    slug: "pint",
    title: "PINT",
    tagline: "Transforming Workplace Satisfaction and Productivity",
    description:
      "PINT's feedback system gathers key insights to drive engagement and continuous improvement across your team's work experience.",
    intro:
      "PINT is a cutting-edge solution crafted to significantly boost workplace satisfaction and productivity by fostering a culture of continuous improvement and engagement. At the heart of this product is a comprehensive feedback system that collects invaluable insights from your employees on every facet of their work experience.",
    keyFeatures: [
      "Work environment evaluations covering physical setup, safety and culture.",
      "Workplace happiness reviews to gauge employee satisfaction and morale.",
      "HR feedback on recruitment, onboarding and performance management.",
      "Customizable feedback tools tailored to your organization's needs.",
      "Scheduled feedback cycles automated at regular intervals.",
      "Customer service feedback gathered directly from your customers.",
      "Response monitoring to track participation and maximize engagement.",
      "Detailed analytics and reports to identify trends and measure progress.",
      "Feedback templates for common workplace, HR and customer service topics.",
    ],
    benefits: [
      "Employee engagement — fosters open communication, trust and reduced turnover.",
      "Pre-defined intervals — scheduled, continuous monitoring of satisfaction and engagement.",
      "Actionable insights — clear, practical recommendations to improve the workplace.",
      "Real-time reporting — spot trends and respond swiftly with up-to-date data.",
      "Benchmarking — compare results over time and against industry standards.",
      "Integration with HR systems — a holistic view combining feedback with HR data.",
      "Mobile-friendly — accessible participation anytime, anywhere.",
    ],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
