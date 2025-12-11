import React from 'react';
import { Topic } from '../types';
import { ExternalLink } from 'lucide-react';

interface TopicViewProps {
  topic: Topic;
}

export const TopicView: React.FC<TopicViewProps> = ({ topic }) => {
  // Helper to safely get paragraphs
  const frContent = topic.content?.fr || [];
  const cnContent = topic.content?.cn || [];
  const maxParagraphs = Math.max(frContent.length, cnContent.length);

  // Helper to detect if a line acts like a header
  const isHeader = (text: string) => {
    if (!text) return false;
    const trimmed = text.trim();
    // Headers typically don't end in punctuation (except maybe ?) and are relatively short
    return trimmed.length < 80 && 
           !trimmed.endsWith('.') && 
           !trimmed.endsWith('…') && 
           !trimmed.endsWith(':') &&
           !trimmed.startsWith('Dans cette fiche'); // Exclude intro sentences
  };

  // Helper to detect specific section markers
  const isObjective = (text: string) => text.trim().startsWith('Objectif');

  return (
    <div className="max-w-6xl mx-auto animate-fade-in px-4 py-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-sans tracking-tight">
          {topic.titleCN}
        </h2>
        <h3 className="text-xl md:text-2xl text-marianne-blue font-medium mb-6">
          {topic.titleFR}
        </h3>
        
        {topic.url && (
          <a 
            href={topic.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors"
          >
            <ExternalLink size={14} />
            <span>查看官方原文 / Voir la source officielle</span>
          </a>
        )}
      </div>

      {/* Bilingual Content */}
      {topic.content && (
        <div className="space-y-0 divide-y divide-gray-100">
          {/* Column Headers (Desktop only) */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 lg:gap-16 pb-6 border-b border-gray-200 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl shadow-sm rounded-full p-1 bg-white">🇫🇷</span>
              <span className="font-bold text-marianne-blue uppercase text-sm tracking-widest">Version Française</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl shadow-sm rounded-full p-1 bg-white">🇨🇳</span>
              <span className="font-bold text-marianne-red uppercase text-sm tracking-widest">中文翻译</span>
            </div>
          </div>

          {/* Content Rows */}
          {Array.from({ length: maxParagraphs }).map((_, idx) => {
            const frText = frContent[idx] || '';
            const cnText = cnContent[idx] || '';
            const headerRow = isHeader(frText);
            const objectiveRow = isObjective(frText);

            // Skip empty rows
            if (!frText && !cnText) return null;

            return (
              <div 
                key={idx} 
                className={`
                  grid md:grid-cols-2 gap-8 lg:gap-16 py-6 group hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2
                  ${headerRow ? 'mt-8 border-t-0' : ''}
                `}
              >
                {/* French Column */}
                <div className="flex flex-col justify-center">
                  {/* Mobile Label */}
                  <div className="md:hidden flex items-center gap-2 mb-2">
                    <span className="text-sm">🇫🇷</span>
                    <span className="text-[10px] font-bold text-marianne-blue uppercase">Français</span>
                  </div>
                  
                  {headerRow ? (
                    <h4 className="text-2xl font-bold text-marianne-blue leading-tight mb-2">
                      {frText}
                    </h4>
                  ) : objectiveRow ? (
                    <div className="bg-blue-50 border-l-4 border-marianne-blue p-4 text-marianne-blue font-medium text-sm">
                      {frText}
                    </div>
                  ) : (
                    <p className="text-gray-800 leading-relaxed text-lg text-justify hyphens-auto font-light">
                      {frText}
                    </p>
                  )}
                </div>

                {/* Chinese Column */}
                <div className="flex flex-col justify-center">
                  {/* Mobile Label */}
                   <div className="md:hidden flex items-center gap-2 mb-2 mt-4">
                    <span className="text-sm">🇨🇳</span>
                    <span className="text-[10px] font-bold text-marianne-red uppercase">中文</span>
                  </div>

                  {headerRow ? (
                    <h4 className="text-xl font-bold text-gray-900 leading-tight mb-2">
                      {cnText}
                    </h4>
                  ) : objectiveRow ? (
                    <div className="bg-red-50 border-l-4 border-marianne-red p-4 text-marianne-red font-medium text-sm">
                      {cnText}
                    </div>
                  ) : (
                    <p className="text-gray-600 leading-relaxed text-base text-justify">
                      {cnText}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!topic.content && !topic.keyPoints && (
        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">请从左侧菜单选择一个具体的子主题。</p>
          <p className="text-sm mt-2 text-gray-400">Veuillez sélectionner un sujet dans le menu.</p>
        </div>
      )}
    </div>
  );
};