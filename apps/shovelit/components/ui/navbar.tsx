"use client";

import React from "react";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

const NavBar = (props: Props) => {
  return (
    <header className="bg-slate-900/90 backdrop-blur-sm border-b border-amber-400/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-amber-400 rounded flex items-center justify-center shadow-lg">
            <span className="text-black font-black text-4xl" style={{fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '900', letterSpacing: '0.05em'}}>S</span>
          </div>
          <div>
            <h1 className="text-2xl font-light text-white" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
              Shovel<span className="text-amber-400 font-medium">Up!</span>
            </h1>
            <p className="text-xs text-amber-400">Construction Network</p>
          </div>
        </div>
        
        {/* Content from props.children or default buttons */}
        {props.children || (
          <div className="flex gap-3">
            <button className="px-4 py-2 text-white border border-amber-400 rounded-lg hover:bg-amber-400/10 transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 bg-amber-400 text-black rounded-lg hover:bg-amber-500 transition-all shadow-lg font-semibold">
              Get Started
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;