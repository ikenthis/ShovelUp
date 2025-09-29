// components/sections/PlatformPreviewSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { PLATFORM_PREVIEW } from '@/constants/features';
import { cn } from '@/utils/cn';

interface PlatformPreviewSectionProps {
  id?: string;
  className?: string;
}

export const PlatformPreviewSection = ({ 
  id = "platform-preview", 
  className 
}: PlatformPreviewSectionProps) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'chat' | 'metrics'>('timeline');
  const [isVisible, setIsVisible] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimateProgress(true), 500);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById(id);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [id]);

  return (
    <section 
      id={id} 
      className={cn("section-padding relative", className)}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-amber-900/40" />
      
      <div className="container relative z-10">
        <SectionHeader
          title="See ShovelUp! in Action"
          description="Get a preview of how our platform transforms construction project management and team collaboration in real-time."
        />

        {/* Platform Mockup */}
        <div className={cn(
          "max-w-7xl mx-auto transition-all duration-1000",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          <PlatformMockup 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            animateProgress={animateProgress}
          />
        </div>

        {/* Feature highlights */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <FeatureHighlight
            icon="⚡"
            title="Real-Time Updates"
            description="See changes instantly across all team members and devices"
            delay={0}
          />
          <FeatureHighlight
            icon="📊"
            title="Live Analytics"
            description="Track progress, budget, and performance metrics in real-time"
            delay={200}
          />
          <FeatureHighlight
            icon="🔄"
            title="Seamless Sync"
            description="All data syncs automatically across web and mobile platforms"
            delay={400}
          />
        </div>
      </div>
    </section>
  );
};

interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader = ({ title, description }: SectionHeaderProps) => (
  <div className="text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-light text-white mb-6 font-system">
      {title}
    </h2>
    <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
      {description}
    </p>
  </div>
);

interface PlatformMockupProps {
  activeTab: 'timeline' | 'chat' | 'metrics';
  onTabChange: (tab: 'timeline' | 'chat' | 'metrics') => void;
  animateProgress: boolean;
}

const PlatformMockup = ({ activeTab, onTabChange, animateProgress }: PlatformMockupProps) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200/20 backdrop-blur-sm">
      {/* Mock Header */}
      <div className="bg-gradient-to-r from-amber-400 to-amber-500 p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-amber-400 font-bold text-lg">S</span>
          </div>
          <div>
            <span className="text-black font-semibold text-lg">
              {PLATFORM_PREVIEW.header.projectName}
            </span>
            <div className="flex items-center space-x-3 text-black/80 text-sm">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-2" />
                {PLATFORM_PREVIEW.header.status}
              </span>
              <span>•</span>
              <span className="font-medium">{PLATFORM_PREVIEW.header.progress}% Complete</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-black/10 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-black text-xs font-medium">Live</span>
          </div>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-400 rounded-full" />
            <div className="w-3 h-3 bg-red-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <div className="flex space-x-8">
          {[
            { key: 'timeline', label: 'Timeline', icon: '📅' },
            { key: 'chat', label: 'Team Chat', icon: '💬' },
            { key: 'metrics', label: 'Metrics', icon: '📊' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key as any)}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative",
                activeTab === tab.key
                  ? "bg-white text-amber-600 shadow-md scale-105"
                  : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
              )}
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.label}</span>
              {activeTab === tab.key && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-400 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="h-[500px] overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        {activeTab === 'timeline' && <TimelineView />}
        {activeTab === 'chat' && <ChatView />}
        {activeTab === 'metrics' && <MetricsView animateProgress={animateProgress} />}
      </div>
    </div>
  );
};

const TimelineView = () => (
  <div className="p-8 h-full">
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-semibold text-gray-800 text-xl flex items-center">
        <span className="text-2xl mr-3">📅</span>
        Project Timeline
      </h3>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">Updated 2 min ago</span>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </div>
    </div>
    <div className="space-y-4 max-h-[400px] overflow-y-auto">
      {PLATFORM_PREVIEW.timeline.map((item, index) => (
        <TimelineItem key={index} item={item} index={index} />
      ))}
    </div>
  </div>
);

const TimelineItem = ({ item, index }: { item: any; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const statusColors = {
    'completed': 'bg-green-500',
    'in-progress': 'bg-amber-400',
    'planned': 'bg-gray-300',
    'scheduled': 'bg-blue-400'
  };

  const statusBgColors = {
    'completed': 'bg-green-50 border-green-200',
    'in-progress': 'bg-amber-50 border-amber-200',
    'planned': 'bg-gray-50 border-gray-200',
    'scheduled': 'bg-blue-50 border-blue-200'
  };

  return (
    <div className={cn(
      "flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-500 cursor-pointer hover:shadow-lg group",
      statusBgColors[item.status as keyof typeof statusBgColors],
      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
    )}>
      <div className="relative">
        <div className={cn(
          "w-5 h-5 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-125",
          statusColors[item.status as keyof typeof statusColors]
        )} />
        {item.status === 'in-progress' && (
          <div className="absolute inset-0 w-5 h-5 bg-amber-400 rounded-full animate-ping opacity-30" />
        )}
      </div>
      <div className="flex-1">
        <span className="text-gray-800 font-medium text-base">{item.task}</span>
        <div className="text-sm text-gray-500 capitalize mt-1">{item.status.replace('-', ' ')}</div>
      </div>
      <span className="text-3xl transform transition-transform duration-300 group-hover:scale-110">
        {item.icon}
      </span>
    </div>
  );
};

const ChatView = () => {
  const [messages, setMessages] = useState(PLATFORM_PREVIEW.chat);
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-800 text-xl flex items-center">
          <span className="text-2xl mr-3">💬</span>
          Team Chat
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">5 active</span>
          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-6 h-6 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full border-2 border-white" />
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex-1 space-y-4 max-h-[300px] overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} index={index} />
        ))}
      </div>
      
      {/* Enhanced input */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-3 shadow-sm">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-3 py-2 text-sm outline-none"
          />
          <button className="px-6 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-black rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatMessage = ({ message, index }: { message: any; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200 transition-all duration-500 hover:shadow-md",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-xs">{message.user[0]}</span>
          </div>
          <span className="font-medium text-gray-800">{message.user}</span>
        </div>
        <span className="text-xs text-gray-500">{message.timestamp}</span>
      </div>
      <div className="text-xs text-amber-600 font-medium mb-2">{message.role}</div>
      <div className="text-gray-700">{message.message}</div>
    </div>
  );
};

const MetricsView = ({ animateProgress }: { animateProgress: boolean }) => (
  <div className="p-8 h-full">
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-semibold text-gray-800 text-xl flex items-center">
        <span className="text-2xl mr-3">📊</span>
        Live Metrics
      </h3>
      <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-green-700 text-xs font-medium">Real-time</span>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-8 mb-8">
      {/* Progress */}
      <div className="space-y-6">
        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-gray-600 font-medium">Overall Progress</span>
            <span className="text-gray-800 font-bold text-lg">
              {PLATFORM_PREVIEW.metrics.progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={cn(
                "bg-gradient-to-r from-amber-400 to-amber-500 h-4 rounded-full transition-all duration-2000 relative",
                "before:absolute before:inset-0 before:bg-white/30 before:animate-pulse"
              )}
              style={{ 
                width: animateProgress ? `${PLATFORM_PREVIEW.metrics.progress}%` : '0%' 
              }}
            />
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200">
          <div className="text-sm text-gray-600 mb-2">Budget Status</div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {PLATFORM_PREVIEW.metrics.budget.used} / {PLATFORM_PREVIEW.metrics.budget.total}
          </div>
          <div className="text-sm text-gray-500">
            {PLATFORM_PREVIEW.metrics.budget.percentage.toFixed(1)}% utilized
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-6">
        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200">
          <div className="text-sm text-gray-600 mb-2">Timeline</div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {PLATFORM_PREVIEW.metrics.timeline.remaining}
          </div>
          <div className={cn(
            "text-sm font-medium",
            PLATFORM_PREVIEW.metrics.timeline.onTrack
              ? "text-green-600"
              : "text-red-600"
          )}>
            {PLATFORM_PREVIEW.metrics.timeline.onTrack ? "✅ On Track" : "⚠️ Behind Schedule"}
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200">
          <div className="text-sm text-gray-600 mb-2">Active Team</div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {PLATFORM_PREVIEW.metrics.team.active}/{PLATFORM_PREVIEW.metrics.team.total}
          </div>
          <div className="text-sm text-gray-500">members online</div>
        </div>
      </div>
    </div>

    {/* Enhanced Chart */}
    <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200">
      <div className="text-sm text-gray-600 mb-4">Weekly Progress</div>
      <div className="h-32 bg-gradient-to-r from-amber-100/50 to-amber-50/50 rounded-xl flex items-end justify-center p-4 relative overflow-hidden">
        <div className="flex items-end space-x-2 h-full relative z-10">
          {[40, 65, 45, 80, 67, 55, 75].map((height, index) => (
            <div
              key={index}
              className={cn(
                "bg-gradient-to-t from-amber-400 to-amber-300 w-8 rounded-t-lg transition-all duration-1000 shadow-sm",
                "hover:from-amber-500 hover:to-amber-400 cursor-pointer"
              )}
              style={{ 
                height: animateProgress ? `${height}%` : '0%',
                transitionDelay: `${index * 100}ms`
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-amber-100/20 to-amber-200/10" />
      </div>
    </div>
  </div>
);

interface FeatureHighlightProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

const FeatureHighlight = ({ icon, title, description, delay }: FeatureHighlightProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={cn(
      "text-center transition-all duration-700 hover:scale-105",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <div className="text-5xl mb-6 transform transition-transform duration-300 hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
};

export default PlatformPreviewSection;