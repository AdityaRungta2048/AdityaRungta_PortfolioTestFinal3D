interface ProjectUrl {
  text: string;
  url: string;
}

export interface ProjectStep {
  label: string;
  sub?: string;
  muted?: boolean;
}

export interface ProjectSection {
  heading: string;
  body: string;
}

export interface Project {
  title: string;
  date: string;
  subtext: string;
  url?: string;
  urls?: ProjectUrl[];
  // Rich detail shown in the hover panel
  icon?: string;
  type?: string;
  tagline?: string;
  tech?: string[];
  flowTitle?: string;
  flow?: ProjectStep[];
  flowCaption?: string;
  sections?: ProjectSection[];
}
