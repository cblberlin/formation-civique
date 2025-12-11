import React from 'react';
import { Topic, ContentBlock } from '../types';
import { ExternalLink, Info, BookOpen } from 'lucide-react';

interface TopicViewProps {
  topic: Topic;
}

export const TopicView: React.FC<TopicViewProps> = ({ topic }) => {
  const content = topic.content || [];

  // Helper to render dynamic headings
  const renderHeading = (text: string, level: number = 2, lang: 'fr' | 'cn') => {
    // Determine tag and style based on level
    // In the scraped HTML, h3 is often the top sub-heading, so we treat level 2 as h2/h3 visual equivalent
    const Tag = level === 1 ? 'h2' : 'h3'; 
    
    const baseClass = lang === 'fr' ? 'font-sans font-bold text-[#1e1e1e]' : 'font-sans font-bold text-gray-800';
    const sizeClass = level === 1
      ? (lang === 'fr' ? 'text-3xl mt-8 text-[#000091]' : 'text-2xl mt-8') 
      : (lang === 'fr' ? 'text-2xl mt-6 text-[#000091]' : 'text-xl mt-6');
    
    return (
      <Tag className={`${baseClass} ${sizeClass} mb-4 leading-tight`}>
        {text}
      </Tag>
    );
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in px-4 py-8">
      {/* Official Header Style */}
      <div className="mb-12 pb-8 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#1e1e1e] tracking-tight mb-3 font-sans">
              {topic.titleFR}
            </h1>
            <h2 className="text-xl md:text-3xl text-gray-500 font-medium font-sans">
              {topic.titleCN}
            </h2>
          </div>
          
          {topic.url && (
            <a 
              href={topic.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#000091] hover:bg-[#1212ff] text-white text-sm font-bold transition-colors shadow-sm"
            >
              <span>Source officielle</span>
              <ExternalLink size={16} />
            </a>
          )}
        </div>
        
        {/* Decorative Marianne line */}
        <div className="flex w-24 h-1.5 mb-8">
          <div className="w-full h-full bg-[#000091]"></div>
          <div className="w-full h-full bg-white"></div>
          <div className="w-full h-full bg-[#E1000F]"></div>
        </div>
      </div>

      {/* Bilingual Content */}
      {content.length > 0 && (
        <div className="space-y-8">
          {/* Column Headers */}
          <div className="hidden md:grid md:grid-cols-2 gap-12 mb-8 sticky top-20 bg-gray-50/95 backdrop-blur py-4 z-10 border-b border-gray-200">
            <div className="flex items-center gap-2 text-[#000091]">
              <span className="text-xs font-bold uppercase tracking-widest border border-[#000091] px-2 py-0.5">Français</span>
              <span className="text-xs text-gray-500 font-medium">Version originale</span>
            </div>
            <div className="flex items-center gap-2 text-[#E1000F]">
              <span className="text-xs font-bold uppercase tracking-widest border border-[#E1000F] px-2 py-0.5">Chinois</span>
              <span className="text-xs text-gray-500 font-medium">Traduction / 翻译</span>
            </div>
          </div>

          {/* Content Rows */}
          {content.map((block: ContentBlock, idx: number) => {
            const isHeading = block.type === 'heading';
            const isBox = block.type === 'intro-box'; // "Objectifs" (Gray card)
            const isCallout = block.type === 'callout'; // "Pour aller plus loin" (Blue border)
            const isList = block.type === 'list-item';
            const isImage = block.type === 'image';

            return (
              <div 
                key={idx} 
                className={`grid md:grid-cols-2 gap-8 md:gap-12 group ${isHeading ? 'pt-2' : ''}`}
              >
                {/* French Column */}
                <div className="relative">
                  <div className="md:hidden mb-1 flex items-center gap-2">
                     <div className="w-1 h-4 bg-[#000091]"></div>
                     <span className="text-xs font-bold text-[#000091] uppercase">FR</span>
                  </div>

                  {isHeading && renderHeading(block.fr, block.level, 'fr')}

                  {/* Intro Box: Matches .fr-card--grey from official site */}
                  {isBox && (
                    <div className="bg-[#f6f6f6] p-6 my-2 text-[#1e1e1e] border-b-2 border-[#000091]">
                      <h4 className="font-bold text-lg mb-2 text-[#1e1e1e]">Objectifs :</h4>
                      <p className="font-medium text-lg leading-relaxed">{block.fr}</p>
                    </div>
                  )}

                  {/* Callout: Matches .fr-callout from official site */}
                  {isCallout && (
                    <div className="bg-[#f5f5fe] border-l-[4px] border-[#6a6af4] p-6 my-4">
                      <h4 className="font-bold text-lg mb-2 text-[#1e1e1e]">Pour aller plus loin</h4>
                      <p className="text-[#000091] font-medium underline underline-offset-4 cursor-pointer">
                        {block.fr}
                      </p>
                    </div>
                  )}

                  {isList && (
                    <div className="flex gap-4 pl-2">
                      <span className="text-[#000091] font-bold text-xl leading-none mt-1">•</span>
                      <p className="text-[#1e1e1e] text-lg leading-relaxed">{block.fr}</p>
                    </div>
                  )}

                  {block.type === 'paragraph' && (
                    <p className="text-[#1e1e1e] text-lg leading-relaxed font-sans text-justify hyphens-auto">
                      {block.fr}
                    </p>
                  )}

                  {isImage && (
                    <div className="my-6">
                      <img src={block.fr} alt="Illustration" className="w-full h-auto object-cover border border-gray-200" />
                    </div>
                  )}
                </div>

                {/* Chinese Column */}
                <div className={`relative ${isHeading ? 'md:pt-1' : ''}`}>
                   <div className="md:hidden mt-4 mb-1 flex items-center gap-2">
                     <div className="w-1 h-4 bg-[#E1000F]"></div>
                     <span className="text-xs font-bold text-[#E1000F] uppercase">CN</span>
                  </div>

                  {isHeading && renderHeading(block.cn, block.level, 'cn')}

                  {isBox && (
                    <div className="bg-white border border-gray-100 p-6 my-2 text-gray-600 text-base leading-relaxed relative shadow-sm h-full">
                       <h4 className="font-bold text-base mb-2 text-gray-800">学习目标：</h4>
                      {block.cn}
                    </div>
                  )}

                  {isCallout && (
                    <div className="bg-gray-50 border-l-[4px] border-gray-300 p-6 my-4 h-full">
                       <h4 className="font-bold text-base mb-2 text-gray-700">延伸阅读</h4>
                       <p className="text-gray-600 font-medium">
                        {block.cn}
                      </p>
                    </div>
                  )}

                  {isList && (
                    <div className="flex gap-4 pl-2">
                      <span className="text-gray-300 font-bold text-xl leading-none mt-1">•</span>
                      <p className="text-gray-600 text-base leading-relaxed text-justify">{block.cn}</p>
                    </div>
                  )}

                  {block.type === 'paragraph' && (
                    <p className="text-gray-600 text-base leading-relaxed text-justify group-hover:text-gray-900 transition-colors">
                      {block.cn}
                    </p>
                  )}
                  
                  {isImage && (
                    <div className="my-6 flex flex-col items-center justify-center h-full bg-gray-50 border border-dashed border-gray-200 text-gray-400 text-sm p-4">
                      <BookOpen size={24} className="mb-2 opacity-50"/>
                      <span>{block.cn || "官方插图"}</span>
                    </div>
                  )}
                </div>
                
                {/* Visual separator for flow */}
                {!isHeading && <div className="hidden md:block col-span-2 border-b border-gray-50 my-1"></div>}
              </div>
            );
          })}
        </div>
      )}

      {content.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <Info size={48} className="text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium text-lg">Sélectionnez un sujet dans le menu</p>
          <p className="text-gray-400 mt-2">请从左侧菜单选择一个具体的子主题</p>
        </div>
      )}
    </div>
  );
};