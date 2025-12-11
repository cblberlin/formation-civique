export interface ContentBlock {
  fr: string[];
  cn: string[];
}

export interface Topic {
  id: string;
  titleFR: string;
  titleCN: string;
  type: 'category' | 'topic';
  url?: string;
  keyPoints?: string[]; // Chinese key points for exam prep
  content?: ContentBlock;
  children?: Topic[];
}

export type ViewState = {
  activeId: string;
  expandedIds: string[];
};