import React, { useState, useMemo } from 'react';
import { Layout } from './components/Layout';
import { TopicView } from './components/TopicView';
import { CategoryView } from './components/CategoryView';
import { civicData } from './data';
import { Topic, ViewState } from './types';

// Helper to flatten tree for easier searching/finding
const flattenTopics = (topics: Topic[]): Record<string, Topic> => {
  let flat: Record<string, Topic> = {};
  topics.forEach(t => {
    flat[t.id] = t;
    if (t.children) {
      Object.assign(flat, flattenTopics(t.children));
    }
  });
  return flat;
};

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>({
    activeId: 'republiques-valeurs', // Default start
    expandedIds: ['republiques-valeurs']
  });

  const topicMap = useMemo(() => flattenTopics(civicData), []);
  const activeTopic = topicMap[viewState.activeId];

  const handleNavigate = (id: string) => {
    setViewState(prev => ({
      ...prev,
      activeId: id,
      expandedIds: prev.expandedIds.includes(id) 
        ? prev.expandedIds 
        : [...prev.expandedIds, id] // Auto expand parent if navigating directly
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleExpand = (id: string) => {
    setViewState(prev => ({
      ...prev,
      expandedIds: prev.expandedIds.includes(id)
        ? prev.expandedIds.filter(e => e !== id)
        : [...prev.expandedIds, id]
    }));
  };

  return (
    <Layout 
      topics={civicData} 
      viewState={viewState} 
      onNavigate={handleNavigate}
      onToggleExpand={handleToggleExpand}
    >
      {activeTopic ? (
        activeTopic.children && activeTopic.children.length > 0 ? (
          <CategoryView 
            category={activeTopic} 
            onNavigate={(id) => {
              handleToggleExpand(activeTopic.id); // Ensure parent is expanded in sidebar
              handleNavigate(id);
            }} 
          />
        ) : (
          <TopicView topic={activeTopic} />
        )
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          Select a topic to begin
        </div>
      )}
    </Layout>
  );
};

export default App;