import React from 'react';
import { Topic } from '../types';
import { ChevronRight } from 'lucide-react';

interface CategoryViewProps {
  category: Topic;
  onNavigate: (id: string) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({ category, onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{category.titleCN}</h2>
        <h3 className="text-xl text-gray-500">{category.titleFR}</h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {category.children?.map((child) => (
          <div 
            key={child.id}
            onClick={() => onNavigate(child.id)}
            className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 p-6 cursor-pointer transition-all duration-200 hover:-translate-y-1 group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-marianne-blue font-bold text-lg group-hover:bg-marianne-blue group-hover:text-white transition-colors">
                {child.titleFR.charAt(0)}
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-marianne-blue transition-colors" />
            </div>
            
            <h4 className="font-bold text-gray-900 text-lg mb-1">{child.titleCN}</h4>
            <p className="text-sm text-gray-500">{child.titleFR}</p>
            
            {child.children && (
              <div className="mt-4 pt-4 border-t border-gray-50">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {child.children.length} 个主题 (Sujets)
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};