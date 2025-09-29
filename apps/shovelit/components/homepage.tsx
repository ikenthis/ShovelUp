"use client";

import React, { useState } from "react";

const DesktopNavBar = () => {
  return (
    <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-amber-400 rounded flex items-center justify-center">
          <span
            className="text-black font-black text-xl tracking-wider"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: "900",
              letterSpacing: "0.05em",
            }}
          >
            S
          </span>
        </div>
        <span
          className="text-white font-light text-2xl"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          Shovel<span className="text-amber-400 font-medium">Up!</span>
        </span>
      </div>

      <div className="hidden md:flex items-center space-x-8">
        <a
          href="#"
          className="text-gray-300 hover:text-amber-400 transition-colors"
        >
          Features
        </a>
        <a
          href="#"
          className="text-gray-300 hover:text-amber-400 transition-colors"
        >
          Pricing
        </a>
        <a
          href="#"
          className="text-gray-300 hover:text-amber-400 transition-colors"
        >
          About
        </a>
        <a
          href="#"
          className="text-gray-300 hover:text-amber-400 transition-colors"
        >
          Contact
        </a>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-gray-300 hover:text-white transition-colors">
          Sign In
        </button>
        <button className="px-6 py-2 bg-amber-400 text-black rounded-lg font-medium hover:bg-amber-500 transition-colors">
          Get Started
        </button>
      </div>
    </nav>
  );
};

const Homepage = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Smart Project Hub",
      description:
        "AI-powered project management with real-time collaboration, automated progress tracking, and predictive analytics for construction timelines.",
      icon: "🏗️",
    },
    {
      title: "Professional Network",
      description:
        "Connect with verified contractors, architects, and engineers. Build your reputation through skill endorsements and project showcases.",
      icon: "🤝",
    },
    {
      title: "Live Team Collaboration",
      description:
        "Real-time messaging, file sharing, and video calls integrated directly into your project workspace. Never miss a beat.",
      icon: "💬",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-yellow-900 to-amber-900">
      {/* Header/Navigation */}
      <header className="bg-slate-900/90 backdrop-blur-sm border-b border-amber-400/20 sticky top-0 z-50">
        <DesktopNavBar />
      </header>

      {/* Hero Section - Option 3: CSS background-image (more control) */}
      <section className="relative py-20 text-center text-white overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dylpmva1d/image/upload/v1756758523/SHUPUHD_xc4s1q.png"
            alt="ShovelUp Background Illustration"
            className="w-full h-full object-cover opacity-80 translate-x-60"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-slate-900/40 to-amber-900/40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left lg:text-left">
              <h2
                className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 bg-gradient-to-r from-white via-yellow-200 to-amber-400 bg-clip-text text-transparent"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                Build. Connect. Succeed.
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-3000 mb-4 font-light">
                The Future of Construction Management
              </p>
              <p className="text-lg text-gray-300 mb-12 leading-relaxed max-w-2xl">
                ShovelUp! revolutionizes construction workflows by combining
                enterprise-grade project management with professional
                networking. Connect teams, streamline projects, and scale your
                business.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <button className="px-10 py-4 bg-amber-400 text-black rounded-xl text-lg font-semibold hover:bg-amber-500 transition-all transform hover:scale-105 shadow-2xl">
                  Start Building Today
                </button>
                <button className="px-10 py-4 border-2 border-amber-400 text-white rounded-xl text-lg font-semibold hover:bg-amber-400/10 transition-all">
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-lg">
                <div className="text-center lg:text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-amber-400">
                    10K+
                  </div>
                  <div className="text-gray-300 text-sm lg:text-base">
                    Active Professionals
                  </div>
                </div>
                <div className="text-center lg:text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-amber-400">
                    2.5M+
                  </div>
                  <div className="text-gray-300 text-sm lg:text-base">
                    Projects Managed
                  </div>
                </div>
                <div className="text-center lg:text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-amber-400">
                    98%
                  </div>
                  <div className="text-gray-300 text-sm lg:text-base">
                    Success Rate
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Image space (on larger screens, the background image will be more visible here) */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </section>

      {/* Interactive Features Showcase */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <h3
            className="text-4xl md:text-5xl font-light text-center text-white mb-6"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            Why Construction Pros Choose ShovelUp!
          </h3>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Experience the perfect blend of social networking and project
            management, designed specifically for the construction industry.
          </p>

          {/* Interactive Feature Tabs */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-slate-700/50 rounded-full p-1">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`px-6 py-3 rounded-full transition-all ${
                    activeFeature === index
                      ? "bg-amber-400 text-black font-medium"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {feature.icon} {feature.title}
                </button>
              ))}
            </div>
          </div>

          {/* Feature Display */}
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-800 to-slate-700 border border-amber-400/20 rounded-2xl p-8 mb-16">
            <div className="text-center">
              <div className="text-6xl mb-4">
                {features[activeFeature].icon}
              </div>
              <h4
                className="text-3xl font-light text-white mb-6"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                {features[activeFeature].title}
              </h4>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                {features[activeFeature].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h3
            className="text-4xl font-light text-center text-white mb-16"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            Revolutionary Construction Tools
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* AI-Powered Features */}
            <div className="bg-slate-800/60 border border-amber-400/20 rounded-xl p-6 hover:border-amber-400/40 transition-all">
              <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center mb-4">
                <span className="text-black text-xl font-bold">🤖</span>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">
                AI Project Assistant
              </h4>
              <p className="text-gray-400 text-sm">
                Smart scheduling, risk prediction, and automated reporting
                powered by construction AI.
              </p>
            </div>

            {/* Real-time Collaboration */}
            <div className="bg-slate-800/60 border border-amber-400/20 rounded-xl p-6 hover:border-amber-400/40 transition-all">
              <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center mb-4">
                <span className="text-black text-xl font-bold">⚡</span>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">
                Live Collaboration
              </h4>
              <p className="text-gray-400 text-sm">
                Real-time document editing, instant messaging, and video calls
                integrated in workflows.
              </p>
            </div>

            {/* Mobile-First */}
            <div className="bg-slate-800/60 border border-amber-400/20 rounded-xl p-6 hover:border-amber-400/40 transition-all">
              <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center mb-4">
                <span className="text-black text-xl font-bold">📱</span>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">
                Mobile-First Design
              </h4>
              <p className="text-gray-400 text-sm">
                Full-featured mobile app for on-site project management and team
                communication.
              </p>
            </div>

            {/* Analytics */}
            <div className="bg-slate-800/60 border border-amber-400/20 rounded-xl p-6 hover:border-amber-400/40 transition-all">
              <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center mb-4">
                <span className="text-black text-xl font-bold">📊</span>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">
                Smart Analytics
              </h4>
              <p className="text-gray-400 text-sm">
                Advanced project insights, performance metrics, and predictive
                cost analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Preview */}
      <section className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3
              className="text-4xl font-light text-white mb-6"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              See ShovelUp! in Action
            </h3>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Get a preview of how our platform transforms construction project
              management and team collaboration.
            </p>
          </div>

          {/* Mock Platform Interface */}
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Mock Header */}
            <div className="bg-amber-400 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                  <span className="text-amber-400 font-bold">S</span>
                </div>
                <span className="text-black font-medium">
                  Downtown Plaza Project
                </span>
              </div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
            </div>

            {/* Mock Content */}
            <div className="grid md:grid-cols-3 gap-0 h-96">
              {/* Project Timeline */}
              <div className="p-6 border-r border-gray-200">
                <h4 className="font-medium text-gray-800 mb-4">
                  📅 Project Timeline
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Foundation Complete
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Framing in Progress
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-400">
                      Electrical Planned
                    </span>
                  </div>
                </div>
              </div>

              {/* Team Chat */}
              <div className="p-6 border-r border-gray-200">
                <h4 className="font-medium text-gray-800 mb-4">💬 Team Chat</h4>
                <div className="space-y-3">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="text-xs text-gray-500">
                      Mike Chen - Site Manager
                    </div>
                    <div className="text-sm text-gray-800">
                      Foundation inspection passed! 🎉
                    </div>
                  </div>
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <div className="text-xs text-gray-500">
                      Sarah Williams - Architect
                    </div>
                    <div className="text-sm text-gray-800">
                      Updated blueprints uploaded
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="p-6">
                <h4 className="font-medium text-gray-800 mb-4">
                  📊 Live Metrics
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-gray-800">67%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-amber-400 h-2 rounded-full"
                        style={{ width: "67%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Budget Used</div>
                    <div className="text-lg font-medium text-gray-800">
                      $847K / $1.2M
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Capabilities */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h3
            className="text-4xl font-light text-center text-white mb-16"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            Next-Generation Construction Management
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Internal Team Management */}
            <div className="bg-slate-800/60 border border-amber-400/20 rounded-xl p-8 hover:border-amber-400/40 transition-all">
              <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-black text-2xl font-bold">🏢</span>
              </div>
              <h4 className="text-xl font-medium text-white mb-4">
                Internal Team Hub
              </h4>
              <p className="text-gray-300 leading-relaxed mb-4">
                Centralized workspace for company teams with role-based access,
                skill tracking, and internal project coordination.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Employee skill matrices</li>
                <li>• Internal project assignments</li>
                <li>• Company-wide announcements</li>
                <li>• Performance dashboards</li>
              </ul>
            </div>

            {/* AI-Powered Insights */}
            <div className="bg-slate-800/60 border border-amber-400/20 rounded-xl p-8 hover:border-amber-400/40 transition-all">
              <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-black text-2xl font-bold">🧠</span>
              </div>
              <h4 className="text-xl font-medium text-white mb-4">
                AI Project Intelligence
              </h4>
              <p className="text-gray-300 leading-relaxed mb-4">
                Machine learning algorithms that predict delays, optimize
                resources, and suggest best practices based on historical data.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Predictive timeline analysis</li>
                <li>• Risk assessment automation</li>
                <li>• Resource optimization</li>
                <li>• Cost overrun prevention</li>
              </ul>
            </div>

            {/* Compliance & Safety */}
            <div className="bg-slate-800/60 border border-amber-400/20 rounded-xl p-8 hover:border-amber-400/40 transition-all">
              <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-black text-2xl font-bold">🛡️</span>
              </div>
              <h4 className="text-xl font-medium text-white mb-4">
                Safety & Compliance
              </h4>
              <p className="text-gray-300 leading-relaxed mb-4">
                Integrated safety protocols, compliance tracking, and automated
                reporting to keep projects safe and compliant.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Digital safety checklists</li>
                <li>• Compliance documentation</li>
                <li>• Incident reporting system</li>
                <li>• Certification tracking</li>
              </ul>
            </div>

            {/* External Network */}
            <div className="bg-slate-800/60 border border-amber-400/20 rounded-xl p-8 hover:border-amber-400/40 transition-all">
              <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-black text-2xl font-bold">🌐</span>
              </div>
              <h4 className="text-xl font-medium text-white mb-4">
                Professional Network
              </h4>
              <p className="text-gray-300 leading-relaxed mb-4">
                Connect with contractors, suppliers, and industry experts across
                the globe. Find talent, partnerships, and opportunities.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Verified professional profiles</li>
                <li>• Skill-based matching</li>
                <li>• Project collaboration invites</li>
                <li>• Industry knowledge sharing</li>
              </ul>
            </div>

            {/* Integration Ecosystem */}
            <div className="bg-slate-800/60 border border-amber-400/20 rounded-xl p-8 hover:border-amber-400/40 transition-all">
              <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-black text-2xl font-bold">🔗</span>
              </div>
              <h4 className="text-xl font-medium text-white mb-4">
                Smart Integrations
              </h4>
              <p className="text-gray-300 leading-relaxed mb-4">
                Seamlessly connect with existing tools and systems your team
                already uses for maximum efficiency.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• AutoCAD & BIM integration</li>
                <li>• Accounting software sync</li>
                <li>• Drone & IoT sensors</li>
                <li>• Supply chain management</li>
              </ul>
            </div>

            {/* Advanced Analytics */}
            <div className="bg-slate-800/60 border border-amber-400/20 rounded-xl p-8 hover:border-amber-400/40 transition-all">
              <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-black text-2xl font-bold">📈</span>
              </div>
              <h4 className="text-xl font-medium text-white mb-4">
                Business Intelligence
              </h4>
              <p className="text-gray-300 leading-relaxed mb-4">
                Deep insights into project performance, team productivity, and
                business growth opportunities.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Real-time project dashboards</li>
                <li>• ROI tracking & analysis</li>
                <li>• Team performance metrics</li>
                <li>• Market trend insights</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-4 text-center">
          <h3
            className="text-3xl md:text-4xl font-light text-white mb-12"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            Trusted by Industry Leaders
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70 mb-16">
            {["BuildCorp", "SteelWorks", "Urban Build", "ProConstruct"].map(
              (company, index) => (
                <div
                  key={index}
                  className="bg-slate-700/30 rounded-lg p-6 border border-amber-400/10"
                >
                  <div className="text-xl font-medium text-gray-300">
                    {company}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Testimonial */}
          <div className="max-w-4xl mx-auto">
            <blockquote
              className="text-2xl font-light text-gray-300 mb-6"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              "ShovelUp! transformed how our 500+ person construction company
              manages projects. We've seen 40% faster project delivery and 60%
              better team coordination."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold">JM</span>
              </div>
              <div className="text-left">
                <div className="text-white font-medium">James Martinez</div>
                <div className="text-gray-400 text-sm">
                  CEO, Martinez Construction Group
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-amber-400">
        <div className="container mx-auto px-4 text-center">
          <h3
            className="text-4xl md:text-5xl font-light text-black mb-6"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            Ready to ShovelUp! Your Success?
          </h3>
          <p className="text-xl text-amber-900 mb-10 max-w-3xl mx-auto">
            Join the fastest-growing construction community and transform how
            you build, connect, and manage projects. Your next big opportunity
            is just one connection away.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button className="px-12 py-4 bg-black text-amber-400 rounded-xl text-xl font-bold hover:bg-slate-800 transition-all transform hover:scale-105 shadow-2xl">
              Start Free Trial
            </button>
            <button className="px-12 py-4 border-2 border-black text-black rounded-xl text-xl font-semibold hover:bg-black/10 transition-all">
              Schedule Demo
            </button>
          </div>
          <p className="text-amber-800 mt-6 font-medium">
            No credit card required • 14-day free trial
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-amber-400/20 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-amber-400 rounded flex items-center justify-center">
                  <span
                    className="text-black font-black text-xl tracking-wider"
                    style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontWeight: "900",
                      letterSpacing: "0.05em",
                    }}
                  >
                    S
                  </span>
                </div>
                <span
                  className="text-white font-light text-2xl"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  Shovel<span className="text-amber-400 font-medium">Up!</span>
                </span>
              </div>
              <p className="text-gray-400 text-lg mb-6 max-w-sm">
                Empowering construction professionals to build better, connect
                smarter, and succeed faster.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-amber-400 transition-colors cursor-pointer">
                  <span className="text-white">📧</span>
                </div>
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-amber-400 transition-colors cursor-pointer">
                  <span className="text-white">💼</span>
                </div>
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-amber-400 transition-colors cursor-pointer">
                  <span className="text-white">🐦</span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-white font-medium text-lg mb-4">Platform</h5>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Mobile App
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-medium text-lg mb-4">Company</h5>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-medium text-lg mb-4">Support</h5>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
            <p>&copy; 2025 ShovelUp! All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-amber-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;