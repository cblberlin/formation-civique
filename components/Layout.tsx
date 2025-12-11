import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight, Search } from 'lucide-react';
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
    <div className="select-none text-sm">
      <div 
        className={`
          flex items-start justify-between px-6 py-3 cursor-pointer group transition-all
          ${isActive ? 'bg-marianne-light text-marianne-blue font-bold border-l-4 border-marianne-blue' : 'text-gray-700 hover:bg-gray-100 hover:text-marianne-blue border-l-4 border-transparent'}
          ${depth > 0 ? 'pl-' + (6 + depth * 3) : ''}
        `}
        onClick={handleClick}
      >
        <div className="flex flex-col gap-0.5">
          <span className={`${depth === 0 ? 'text-base' : ''} leading-tight`}>{topic.titleFR}</span>
          <span className={`text-xs ${isActive ? 'text-marianne-blue/80' : 'text-gray-400'} font-chinese font-normal`}>{topic.titleCN}</span>
        </div>
        {hasChildren && (
          <div className={`mt-1 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
            <ChevronDown size={14} />
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
      {/* Official DSFR Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-auto py-4">
            
            {/* Logo Block */}
            <div className="flex items-start gap-6">
              <div className="hidden lg:block shrink-0">
                <div className="w-[88px] h-[80px] relative bg-white flex flex-col items-center border border-gray-100 p-2 shadow-sm">
                  {/* Marianne Logo Simulation */}
                  <div className="w-full flex h-1/2">
                     <div className="w-1/2 h-full">
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-black opacity-80">
                           <path d="M50 0 C20 0 10 30 10 50 C10 80 30 100 50 100 C70 100 90 80 90 50 C90 20 80 0 50 0 Z" fill="none" /> 
                           {/* Simplified silhouette representation */}
                           <path d="M30 90 Q20 60 40 40 Q60 20 70 50 Q80 80 50 90 Z" />
                        </svg>
                     </div>
                  </div>
                  <div className="text-[10px] font-bold leading-tight text-center mt-1 uppercase font-serif tracking-tight">
                    République<br/>Française
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 -ml-2 text-gray-900"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Site Title */}
              <div className="flex flex-col justify-center h-full pt-1">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 leading-none">
                  Livret Citoyen
                </h1>
                <p className="text-sm text-gray-600 mt-1 font-chinese">
                  法国公民入籍指南 / Guide Républicain
                </p>
              </div>
            </div>

            {/* Right Actions */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="bg-marianne-light px-3 py-1 text-xs text-marianne-blue font-bold rounded-sm border border-blue-100">
                BÊTA
              </div>
            </div>
          </div>
        </div>
        {/* Navigation Bar Line */}
        <div className="h-[2px] w-full bg-gray-100">
           <div className="h-full w-24 bg-marianne-blue ml-4 lg:ml-8"></div>
        </div>
      </header>

      <div className="flex flex-1 max-w-[1400px] mx-auto w-full">
        {/* Sidebar (Desktop) */}
        <aside className="hidden lg:block w-80 bg-white border-r border-gray-200 h-[calc(100vh-115px)] sticky top-[115px] overflow-y-auto scrollbar-thin">
          <div className="py-6">
            <h2 className="px-6 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Sommaire</h2>
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

        {/* Sidebar (Mobile Overlay) */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="relative w-4/5 max-w-xs bg-white h-full shadow-xl flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <span className="font-bold text-lg text-gray-900">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4">
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
        <main className="flex-1 min-w-0 bg-white lg:bg-[#f6f6f6]">
          <div className="h-full p-4 lg:p-10">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
};