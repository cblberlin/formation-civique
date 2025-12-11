import React from 'react';
import { Topic, ContentBlock } from '../types';
import { ExternalLink, Info, BookOpen, Quote } from 'lucide-react';

interface TopicViewProps {
  topic: Topic;
}

export const TopicView: React.FC<TopicViewProps> = ({ topic }) => {
  const content = topic.content || [];

  const renderHeading = (text: string, level: number = 2, lang: 'fr' | 'cn') => {
    const Tag = level === 1 ? 'h2' : 'h3'; 
    const isFr = lang === 'fr';
    
    // DSFR typography styles
    const baseStyle = "font-bold mb-4 leading-tight scroll-mt-24";
    const frColor = "text-[#161616]"; 
    const cnColor = "text-gray-700 font-chinese";

    const sizeClass = level === 1
      ? (isFr ? 'text-3xl mt-10 text-marianne-blue' : 'text-2xl mt-10 text-marianne-blue/80') 
      : (isFr ? 'text-2xl mt-8' : 'text-xl mt-8');
    
    return (
      <Tag className={`${baseStyle} ${isFr ? frColor : cnColor} ${sizeClass}`}>
        {text}
      </Tag>
    );
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 mb-8 pb-8">
        <div className="flex flex-col gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-blue-50 text-marianne-blue text-xs font-bold uppercase mb-4 rounded">
              Fiche Officielle
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#161616] mb-2 tracking-tight">
              {topic.titleFR}
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-500 font-chinese font-light">
              {topic.titleCN}
            </h2>
          </div>
          
          {topic.url && (
            <div className="flex">
              <a 
                href={topic.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-marianne-blue hover:bg-blue-50 px-4 py-2 rounded transition-colors -ml-4"
              >
                <ExternalLink size={16} />
                <span>Voir sur le site officiel (interieur.gouv.fr)</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Bilingual Content Table */}
      {content.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-12 gap-y-8">
          {/* Header Row for large screens */}
          <div className="hidden xl:block pb-4 border-b-2 border-marianne-blue mb-4">
            <span className="font-bold text-marianne-blue tracking-widest text-sm uppercase">Français</span>
          </div>
          <div className="hidden xl:block pb-4 border-b-2 border-gray-200 mb-4">
            <span className="font-bold text-gray-400 tracking-widest text-sm uppercase">中文 (Chinois)</span>
          </div>

          {content.map((block: ContentBlock, idx: number) => {
            const isHeading = block.type === 'heading';
            const isBox = block.type === 'intro-box';
            const isCallout = block.type === 'callout';
            const isList = block.type === 'list-item';
            const isImage = block.type === 'image';

            return (
              <React.Fragment key={idx}>
                {/* French Block */}
                <div className={`
                  ${isHeading ? 'col-span-1 xl:col-span-2 grid grid-cols-1 xl:grid-cols-2 gap-12' : ''}
                  ${!isHeading ? 'mb-6 xl:mb-0' : ''}
                `}>
                  <div className={isHeading ? "" : "prose prose-blue max-w-none text-[#161616]"}>
                    {/* Mobile Label */}
                    {!isHeading && <div className="xl:hidden text-xs font-bold text-marianne-blue uppercase mb-1">FR</div>}

                    {isHeading && renderHeading(block.fr, block.level, 'fr')}

                    {isBox && (
                      <div className="bg-[#f6f6f6] border-l-4 border-marianne-blue p-6">
                        <h4 className="font-bold text-lg mb-2">Objectifs</h4>
                        <p className="text-lg leading-relaxed">{block.fr}</p>
                      </div>
                    )}

                    {isCallout && (
                      <div className="bg-[#ececfc] p-6 rounded-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#6a6af4]"></div>
                        <h4 className="font-bold text-[#161616] mb-2 flex items-center gap-2">
                          <Info size={18} className="text-[#6a6af4]" />
                          Pour aller plus loin
                        </h4>
                        <p className="text-[#000091] font-medium">{block.fr}</p>
                      </div>
                    )}

                    {isList && (
                      <div className="flex gap-3">
                        <span className="text-marianne-blue font-bold text-lg">•</span>
                        <p className="text-lg leading-relaxed m-0">{block.fr}</p>
                      </div>
                    )}

                    {block.type === 'paragraph' && (
                      <p className="text-lg leading-relaxed text-justify hyphens-auto m-0">
                        {block.fr}
                      </p>
                    )}

                    {isImage && (
                      <div className="my-4 p-4 border border-gray-100 bg-gray-50 flex items-center justify-center text-gray-400 text-sm italic">
                        <BookOpen size={16} className="mr-2"/>
                        Image: {block.fr}
                      </div>
                    )}
                  </div>

                  {/* If heading, we render the Chinese counterpart immediately in the second column slot within this wrapper */}
                  {isHeading && (
                    <div className="mt-2 xl:mt-0">
                       {renderHeading(block.cn, block.level, 'cn')}
                    </div>
                  )}
                </div>

                {/* Chinese Block - Only render if NOT heading (headings handled above for alignment) */}
                {!isHeading && (
                  <div className="prose prose-gray max-w-none text-gray-600 xl:border-l xl:border-dashed xl:border-gray-200 xl:pl-12">
                    {/* Mobile Label */}
                    <div className="xl:hidden text-xs font-bold text-gray-400 uppercase mb-1 mt-2">CN</div>

                    {isBox && (
                      <div className="bg-white border border-gray-200 p-6 shadow-sm h-full">
                        <h4 className="font-bold font-chinese text-base mb-2 text-gray-900">学习目标</h4>
                        <p className="font-chinese text-base leading-relaxed">{block.cn}</p>
                      </div>
                    )}

                    {isCallout && (
                      <div className="bg-gray-50 p-6 rounded-sm h-full flex flex-col justify-center">
                        <h4 className="font-bold font-chinese text-sm mb-1 text-gray-500">延伸阅读</h4>
                        <p className="font-chinese font-medium text-gray-800">{block.cn}</p>
                      </div>
                    )}

                    {isList && (
                      <div className="flex gap-3">
                        <span className="text-gray-300 font-bold text-lg">•</span>
                        <p className="font-chinese text-base leading-relaxed m-0">{block.cn}</p>
                      </div>
                    )}

                    {block.type === 'paragraph' && (
                      <p className="font-chinese text-base leading-relaxed text-justify m-0 group-hover:text-gray-900 transition-colors">
                        {block.cn}
                      </p>
                    )}
                    
                    {isImage && (
                      <div className="hidden xl:block h-full"></div>
                    )}
                  </div>
                )}
                
                {/* Divider for mobile */}
                {!isHeading && <div className="xl:hidden w-full h-px bg-gray-100 my-4"></div>}
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center bg-gray-50 border border-gray-100 rounded-lg">
          <Info className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Aucun contenu disponible</h3>
          <p className="mt-1 text-gray-500">暂无内容 / No content available</p>
        </div>
      )}
    </div>
  );
};