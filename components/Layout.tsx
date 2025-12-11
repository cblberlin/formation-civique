import React, { useState } from 'react';
import { Menu, X, BookOpen, GraduationCap, Scale, Globe, Home } from 'lucide-react';
import { Topic, ViewState } from '../types';

interface LayoutProps {
  topics: Topic[];
  viewState: ViewState;
  onNavigate: (id: string) => void;
  onToggleExpand: (id: string) => void;
  children: React.ReactNode;
}

interface SidebarItemProps {
  topic: Topic;
  depth?: number;
  viewState: ViewState;
  onNavigate: (id: string) => void;
  onToggleExpand: (id: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  topic, 
  depth = 0, 
  viewState, 
  onNavigate, 
  onToggleExpand 
}) => {
  const isExpanded = viewState.expandedIds.includes(topic.id);
  const isActive = viewState.activeId === topic.id;
  const hasChildren = topic.children && topic.children.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      onToggleExpand(topic.id);
    } else {
      onNavigate(topic.id);
    }
  };

  const getIcon = (id: string) => {
    if (id.includes('republiques')) return <Scale size={18} />;
    if (id.includes('systeme')) return <Home size={18} />;
    if (id.includes('histoire')) return <Globe size={18} />;
    if (id.includes('droits')) return <BookOpen size={18} />;
    return <GraduationCap size={18} />;
  };

  return (
    <div className="select-none">
      <div 
        className={`
          flex items-center justify-between px-4 py-3 cursor-pointer transition-colors duration-200
          ${isActive ? 'bg-blue-100 text-marianne-blue border-r-4 border-marianne-blue' : 'text-gray-700 hover:bg-gray-100'}
          ${depth > 0 ? 'pl-' + (4 + depth * 4) : ''}
        `}
        onClick={handleClick}
      >
        <div className="flex items-center gap-3">
          {depth === 0 && <span className="text-marianne-blue">{getIcon(topic.id)}</span>}
          <div className="flex flex-col">
            <span className={`text-sm ${depth === 0 ? 'font-semibold' : 'font-medium'}`}>{topic.titleCN}</span>
            <span className="text-xs text-gray-500">{topic.titleFR}</span>
          </div>
        </div>
        {hasChildren && (
          <span className="text-gray-400 text-xs">
            {isExpanded ? '▼' : '▶'}
          </span>
        )}
      </div>
      
      {hasChildren && isExpanded && (
        <div className="bg-gray-50 border-l border-gray-200 ml-4">
          {topic.children!.map((child) => (
            <SidebarItem 
              key={child.id} 
              topic={child} 
              depth={depth + 1} 
              viewState={viewState}
              onNavigate={onNavigate}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Layout: React.FC<LayoutProps> = ({ topics, viewState, onNavigate, onToggleExpand, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center w-10 h-10 bg-white border border-gray-200 shadow-sm rounded">
                <div className="w-full h-1/3 bg-marianne-blue"></div>
                <div className="w-full h-1/3 bg-white"></div>
                <div className="w-full h-1/3 bg-marianne-red"></div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-none">Livret Citoyen</h1>
                <p className="text-xs text-gray-500 mt-1">法国公民入籍指南</p>
              </div>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <div className="text-xs font-semibold text-marianne-blue tracking-widest uppercase">Liberté • Égalité • Fraternité</div>
            <div className="text-[10px] text-gray-400">RÉPUBLIQUE FRANÇAISE</div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar (Desktop) */}
        <aside className="hidden lg:block w-80 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto scrollbar-thin">
          <div className="py-4">
            {topics.map(topic => (
              <SidebarItem 
                key={topic.id} 
                topic={topic} 
                viewState={viewState}
                onNavigate={onNavigate}
                onToggleExpand={onToggleExpand}
              />
            ))}
          </div>
        </aside>

        {/* Sidebar (Mobile) */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white h-full overflow-y-auto">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              <div className="pt-5 pb-4">
                {topics.map(topic => (
                  <SidebarItem 
                    key={topic.id} 
                    topic={topic} 
                    viewState={viewState}
                    onNavigate={(id) => { onNavigate(id); setIsMobileMenuOpen(false); }}
                    onToggleExpand={onToggleExpand}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 lg:p-12 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};