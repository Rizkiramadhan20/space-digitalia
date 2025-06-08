// Define the type for data layer items
type DataLayerItem = {
  event: string;
  pageType?: string;
  pageUrl?: string;
  articleData?: {
    title: string;
    description: string;
    slug: string;
    url: string;
    imageUrl: string;
  };
  projectData?: {
    title: string;
    description: string;
    typeCategory: string;
    url: string;
    imageUrl: string;
  };
  [key: string]: unknown;
};

// Initialize data layer
const dataLayer: DataLayerItem[] = [];

// Push initial page view
if (typeof window !== "undefined") {
  dataLayer.push({
    event: "pageview",
    pageType: document.title,
    pageUrl: window.location.href,
  });
}

// Helper function to push events to data layer
export function pushToDataLayer(data: {
  event: string;
  pageType?: string;
  pageUrl?: string;
  articleData?: {
    title: string;
    description: string;
    slug: string;
    url: string;
    imageUrl: string;
  };
  projectData?: {
    title: string;
    description: string;
    typeCategory: string;
    url: string;
    imageUrl: string;
  };
  [key: string]: unknown;
}) {
  if (typeof window !== "undefined") {
    dataLayer.push(data);
  }
}

// Helper function to track page views
export function trackPageView(pageTitle: string, pageUrl: string) {
  pushToDataLayer({
    event: "pageview",
    pageType: pageTitle,
    pageUrl: pageUrl,
  });
}

// Helper function to track article views
export function trackArticleView(article: {
  title: string;
  description: string;
  slug: string;
  url: string;
  imageUrl: string;
}) {
  pushToDataLayer({
    event: "article_view",
    articleData: article,
  });
}

// Helper function to track project views
export function trackProjectView(project: {
  title: string;
  description: string;
  typeCategory: string;
  url: string;
  imageUrl: string;
}) {
  pushToDataLayer({
    event: "project_view",
    projectData: project,
  });
}
