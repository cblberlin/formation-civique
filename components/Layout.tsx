import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight, Home, Github } from 'lucide-react';
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

  return (
    <div className="select-none">
      <div 
        className={`
          flex items-start justify-between px-4 py-3 cursor-pointer group transition-colors duration-150
          ${isActive ? 'bg-marianne-light border-l-4 border-marianne-blue' : 'hover:bg-gray-100 border-l-4 border-transparent'}
          ${depth > 0 ? 'pl-' + (4 + depth * 4) : ''}
        `}
        onClick={handleClick}
      >
        <div className="flex flex-col gap-1 w-full">
          <span className={`font-medium ${isActive ? 'text-marianne-blue' : 'text-gray-900'}`}>
            {topic.titleFR}
          </span>
          <span className={`text-xs font-chinese ${isActive ? 'text-marianne-blue/80' : 'text-gray-500'}`}>
            {topic.titleCN}
          </span>
        </div>
        {hasChildren && (
          <div className={`mt-1 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
            <ChevronDown size={16} />
          </div>
        )}
      </div>
      
      {hasChildren && isExpanded && (
        <div className="border-l border-gray-100 ml-4">
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
    <div className="min-h-screen flex flex-col bg-[#f6f6f6] font-sans text-dsfr-text">
      {/* Official Header */}
      <header className="bg-white shadow-sm z-50 relative">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex items-start py-4 gap-6">
            
            {/* Marianne Block */}
            <div className="hidden lg:block shrink-0">
              <div className="w-[88px] relative bg-white flex flex-col items-center p-2 border border-gray-100 shadow-sm">
                <div className="w-12">
                   {/* Simplified Marianne Silhouette SVG */}
                   <svg viewBox="0 0 100 80" className="w-full fill-black opacity-90">
                      <path d="M50 0 C20 0 10 30 10 50 C10 80 30 100 50 100 C70 100 90 80 90 50 C90 20 80 0 50 0 Z" fill="none" stroke="none"/>
                      <path d="M20 80 Q50 10 80 80" stroke="black" strokeWidth="15" fill="none" />
                      <path d="M20 80 L80 80" stroke="black" strokeWidth="5" />
                   </svg>
                </div>
                <div className="text-[11px] font-bold leading-[1.1] text-center mt-2 uppercase font-serif tracking-tight">
                  République<br/>Française
                </div>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden p-2 -ml-2 text-gray-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Site Title */}
            <div className="flex flex-col justify-center pt-1">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                Formation Civique
              </h1>
              <p className="text-sm text-gray-600 mt-1 font-chinese">
                Formation Civique - 法国公民考试指南
              </p>
            </div>

            <div className="ml-auto hidden sm:flex items-center">
              <a 
                href="https://github.com/cblberlin/formation-civique" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-marianne-blue transition-colors"
              >
                <Github size={20} />
                <span className="text-sm font-chinese">GitHub</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Navigation Bar Strip (Blue Line) */}
        <div className="h-[2px] w-full bg-gray-100">
           <div className="h-full w-24 bg-marianne-blue ml-4 lg:ml-32"></div>
        </div>
      </header>

      <div className="flex flex-1 max-w-[1400px] mx-auto w-full">
        {/* Sidebar (Desktop) */}
        <aside className="hidden lg:block w-80 bg-white border-r border-gray-200 h-[calc(100vh-130px)] sticky top-[20px] overflow-y-auto scrollbar-hide my-6 rounded-lg shadow-sm ml-4">
          <nav className="py-4">
            <div 
              className="px-6 py-4 mb-2 flex items-center gap-3 cursor-pointer hover:bg-gray-50 text-marianne-blue font-bold border-b border-gray-100"
              onClick={() => onNavigate('root')}
            >
              <Home size={18} />
              <span>Accueil</span>
            </div>
            {topics.map(topic => (
              <SidebarItem 
                key={topic.id} 
                topic={topic} 
                viewState={viewState}
                onNavigate={onNavigate}
                onToggleExpand={onToggleExpand}
              />
            ))}
          </nav>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="absolute left-0 top-0 bottom-0 w-3/4 max-w-sm bg-white shadow-xl overflow-y-auto">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-marianne-blue text-white">
                <span className="font-bold">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)}><X size={20} /></button>
              </div>
              <div className="py-2">
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

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="p-4 lg:p-8 max-w-5xl mx-auto">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
};