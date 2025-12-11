import React from 'react';
import { Topic } from '../types';
import { ArrowRight } from 'lucide-react';

interface CategoryViewProps {
  category: Topic;
  onNavigate: (id: string) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({ category, onNavigate }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12 border-b border-gray-200 pb-8">
        <span className="text-marianne-blue font-bold tracking-widest text-sm uppercase mb-2 block">Thématique</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{category.titleFR}</h2>
        <h3 className="text-2xl text-gray-500 font-chinese font-light">{category.titleCN}</h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {category.children?.map((child) => (
          <div 
            key={child.id}
            onClick={() => onNavigate(child.id)}
            className="group bg-white border border-gray-200 p-6 cursor-pointer hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[200px]"
          >
            <div>
              <h4 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-marianne-blue transition-colors">
                {child.titleFR}
              </h4>
              <p className="text-gray-500 font-chinese text-sm leading-relaxed">
                {child.titleCN}
              </p>
            </div>
            
            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                {child.children && child.children.length > 0 ? `${child.children.length} CHAPITRES` : 'FICHE'}
              </span>
              <div className="w-8 h-8 rounded-full bg-marianne-blue text-white flex items-center justify-center opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ArrowRight size={16} />
              </div>
            </div>

            {/* Bottom Border Highlight */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-marianne-blue transition-all duration-300 group-hover:w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};