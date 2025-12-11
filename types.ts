export type BlockType = 'paragraph' | 'heading' | 'intro-box' | 'list-item' | 'image' | 'callout';

export interface ContentBlock {
  type: BlockType;
  fr: string;
  cn: string;
  level?: number; // For headings (1, 2, 3)
}

export interface Topic {
  id: string;
  titleFR: string;
  titleCN: string;
  type: 'category' | 'topic';
  url?: string;
  // We removed keyPoints as requested
  content?: ContentBlock[]; 
  children?: Topic[];
}

export type ViewState = {
  activeId: string;
  expandedIds: string[];
};