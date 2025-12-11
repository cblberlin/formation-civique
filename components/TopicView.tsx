import React from 'react';
import { Topic, ContentBlock } from '../types';
import { ExternalLink, Info, BookOpen } from 'lucide-react';

interface TopicViewProps {
  topic: Topic;
}

export const TopicView: React.FC<TopicViewProps> = ({ topic }) => {
  const content = topic.content || [];

  const renderHeading = (text: string, level: number = 2, lang: 'fr' | 'cn') => {
    const Tag = level === 1 ? 'h2' : 'h3';
    const isFr = lang === 'fr';
    
    const baseStyle = "font-bold mb-4 leading-tight scroll-mt-24";
    const frColor = "text-gray-900"; 
    const cnColor = "text-gray-600 font-chinese font-normal";

    const sizeClass = level === 1
      ? (isFr ? 'text-3xl mt-12 text-marianne-blue' : 'text-2xl mt-2 text-marianne-blue/80') 
      : (isFr ? 'text-2xl mt-10' : 'text-xl mt-2');
    
    return (
      <Tag className={`${baseStyle} ${isFr ? frColor : cnColor} ${sizeClass}`}>
        {text}
      </Tag>
    );
  };

  return (
    <div className="animate-fade-in pb-20 bg-white p-6 lg:p-10 rounded-xl shadow-sm border border-gray-100">
      {/* Header Section */}
      <div className="border-b border-gray-200 pb-8 mb-8">
        <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-marianne-blue uppercase bg-blue-50 rounded-full">
          Fiche Officielle
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
          {topic.titleFR}
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-500 font-chinese font-light">
          {topic.titleCN}
        </h2>
        
        {topic.url && (
          <div className="mt-6">
            <a 
              href={topic.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-marianne-blue hover:underline decoration-1 underline-offset-4"
            >
              <ExternalLink size={16} />
              <span>Voir sur le site officiel (interieur.gouv.fr)</span>
            </a>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-12">
        {content.length > 0 ? (
          content.map((block: ContentBlock, idx: number) => {
            const isHeading = block.type === 'heading';
            const isBox = block.type === 'intro-box';
            const isCallout = block.type === 'callout';
            const isList = block.type === 'list-item';
            const isImage = block.type === 'image';

            if (isHeading) {
              return (
                <div key={idx} className="border-t border-gray-100 pt-8 first:border-0 first:pt-0">
                  {renderHeading(block.fr, block.level, 'fr')}
                  {renderHeading(block.cn, block.level, 'cn')}
                </div>
              );
            }

            return (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start group hover:bg-gray-50/50 p-4 rounded-lg transition-colors -mx-4">
                {/* French Column */}
                <div className="prose prose-blue max-w-none">
                  {isBox && (
                    <div className="bg-[#f5f5fe] border-l-4 border-marianne-blue p-6 text-marianne-blue">
                      <p className="font-bold mb-2 text-sm uppercase tracking-wide">L'essentiel</p>
                      <p className="text-lg font-medium leading-relaxed m-0">{block.fr}</p>
                    </div>
                  )}

                  {isCallout && (
                    <div className="bg-orange-50 p-6 rounded-lg text-gray-800 flex gap-4">
                      <Info className="shrink-0 text-orange-500" />
                      <div>
                        <p className="font-bold mb-1">Bon à savoir</p>
                        <p className="m-0">{block.fr}</p>
                      </div>
                    </div>
                  )}

                  {isList && (
                    <div className="flex gap-4">
                      <span className="text-marianne-blue font-bold text-xl leading-none">•</span>
                      <p className="text-lg text-gray-800 leading-relaxed m-0">{block.fr}</p>
                    </div>
                  )}

                  {block.type === 'paragraph' && (
                    <p className="text-lg text-gray-800 leading-relaxed text-justify hyphens-auto m-0">
                      {block.fr}
                    </p>
                  )}

                  {isImage && (
                    <div className="bg-gray-100 p-8 flex flex-col items-center justify-center text-gray-400 rounded-lg">
                      <BookOpen size={32} className="mb-2 opacity-50"/>
                      <span className="text-sm font-medium italic text-center">{block.fr}</span>
                    </div>
                  )}
                </div>

                {/* Chinese Column */}
                <div className="prose prose-gray max-w-none md:border-l md:border-gray-100 md:pl-12">
                  <div className="md:hidden text-xs font-bold text-gray-400 uppercase mb-2 mt-2">Traduction</div>
                  
                  {isBox && (
                    <div className="bg-white border border-gray-200 p-6 h-full rounded-r-lg shadow-sm">
                      <p className="font-chinese text-base leading-relaxed text-gray-700 m-0">{block.cn}</p>
                    </div>
                  )}

                  {isCallout && (
                    <div className="text-gray-600 h-full flex items-center">
                      <p className="font-chinese m-0">{block.cn}</p>
                    </div>
                  )}

                  {isList && (
                    <div className="flex gap-4">
                      <span className="text-gray-300 font-bold text-xl leading-none">•</span>
                      <p className="font-chinese text-base text-gray-600 leading-relaxed m-0">{block.cn}</p>
                    </div>
                  )}

                  {block.type === 'paragraph' && (
                    <p className="font-chinese text-base text-gray-600 leading-relaxed text-justify m-0">
                      {block.cn}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-20 text-center bg-gray-50 border border-gray-100 rounded-lg border-dashed">
            <Info className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Contenu en cours de rédaction</h3>
            <p className="mt-1 text-gray-500 font-chinese">内容正在编写中...</p>
          </div>
        )}
      </div>
    </div>
  );
};