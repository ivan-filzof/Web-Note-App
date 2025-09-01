import React from 'react';
import { Plus, FileText, Heart, Folder, Tag } from 'lucide-react';

interface SidebarProps {
  onNewNote: () => void;
  noteCount: number;
  favoriteCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  onNewNote, 
  noteCount, 
  favoriteCount 
}) => {
  const menuItems = [
    {
      icon: FileText,
      label: 'All Notes',
      count: noteCount,
      active: true,
    },
    {
      icon: Heart,
      label: 'Favorites',
      count: favoriteCount,
      active: false,
    },
    {
      icon: Folder,
      label: 'Categories',
      active: false,
    },
    {
      icon: Tag,
      label: 'Tags',
      active: false,
    },
  ];

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-6">
      <button
        onClick={onNewNote}
        className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium mb-8"
      >
        <Plus className="w-5 h-5" />
        <span>New Note</span>
      </button>

      <nav className="space-y-2">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button
              key={index}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors text-left ${
                item.active
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span className={`text-sm px-2 py-1 rounded-full ${
                  item.active 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
        <h3 className="font-medium text-gray-900 mb-2">Quick Stats</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Total Notes</span>
            <span className="font-medium">{noteCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Favorites</span>
            <span className="font-medium">{favoriteCount}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};