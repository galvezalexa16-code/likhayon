// src/pages/About.jsx
import { Target, Eye, Users, Leaf, Award, BookOpen, ArrowRight, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

const TEAM = [
  { name: 'Dr. Maria Santos', role: 'Project Lead & Cultural Heritage Officer', org: 'Provincial Government of Bulacan', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
  { name: 'Engr. Ramon Cruz', role: 'Logistics & Facilities Manager', org: 'Bulacan Infrastructure Office', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
  { name: 'Prof. Ana Reyes', role: 'Cultural Documentation Lead', org: 'Bulacan State University', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
  { name: 'Juan dela Cruz', role: 'Community Outreach & Partnerships', org: 'Kabalikat ng Bulacan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
];

const OBJECTIVES = [
  { icon: <Leaf size={20} className="text-[#2d5a27]" />, title: 'Reduce Post-Festival Waste', desc: 'Collect and preserve reusable materials that would otherwise be discarded after celebrations.' },
  { icon: <BookOpen size={20} className="text-[#2d5a27]" />, title: 'Document Cultural Heritage', desc: 'Build a digital archive of Bulacan\'s tangible cultural practices and festival traditions.' },
  { icon: <Users size={20} className="text-[#2d5a27]" />, title: 'Enable Community Access', desc: 'Give schools, parishes, and organizations affordable access to authentic cultural materials.' },
  { icon: <Award size={20} className="text-[#2d5a27]" />, title: 'Promote Cultural Pride', desc: 'Foster a sense of identity and pride in Bulaqueño heritage across generations.' },
];

const PARTNERS = [
  'Provincial Government of Bulacan',
  'Bulacan State University',
  'National Commission for Culture and the Arts (NCCA)',
  'Bulacan Provincial Tourism Office',
  'Municipal LGUs of Obando, Bocaue, Pulilan, Malolos',
  'Kabalikat ng Bulacan (NGO)',
];

export default function About() {
  return (
    <div className="page-enter">
      {/* Header */}
      <div
        className="relative pt-28 pb-16 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a1a18 0%, #1e3d1a 50%, #2d5a27 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=1200&q=40')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <p className="text-[#c9942a] text-xs font-semibold tracking-widest uppercase mb-3">The Initiative</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4 max-w-2xl leading-tight">
            About LIKHAYON
          </h1>
          <p className="text-white/75 max-w-2xl text-sm sm:text-base leading-relaxed mb-6">
            LIKHAYON is a proposed community innovation initiative submitted under the Provincial Innovation Program. This website serves as the interactive prototype of the digital platform component.
          </p>
          <div className="inline-block px-3.5 py-1.5 bg-[#c9942a]/20 border border-[#c9942a]/40 rounded-full text-[#f5c06a] text-xs font-medium">
            ⚠ PROTOTYPE — All data and records are fictional samples
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1e3d1a] rounded-2xl p-8 text-white">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-5">
              <Target size={20} className="text-[#c9942a]" />
            </div>
            <h2 className="font-serif text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-white/80 leading-relaxed">
              To preserve Bulacan's tangible cultural heritage by creating a sustainable community system for collecting, cataloguing, and sharing festival materials — reducing waste, lowering event costs, and ensuring that cultural resources remain accessible to all communities, large or small.
            </p>
          </div>
          <div className="bg-[#f0ebe0] rounded-2xl p-8">
            <div className="w-10 h-10 rounded-full bg-[#1e3d1a]/10 flex items-center justify-center mb-5">
              <Eye size={20} className="text-[#1e3d1a]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a18] mb-4">Our Vision</h2>
            <p className="text-[#6b6b5e] leading-relaxed">
              A Bulacan where no cultural material goes to waste — where the bamboo arch from last year's Obando festival becomes the gateway to this year's school parade, and where every community, regardless of budget, can celebrate with authentic pride. <em>Likha Noon, Likha Ngayon.</em>
            </p>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="bg-[#f0ebe0] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#c9942a] text-xs font-semibold tracking-widest uppercase mb-3">The Problem We Solve</p>
              <h2 className="font-serif text-3xl font-bold text-[#1a1a18] mb-6">After Every Festival, Heritage Is Lost</h2>
              <div className="space-y-4 text-[#6b6b5e] text-sm leading-relaxed">
                <p>
                  In Bulacan alone, hundreds of festivals are celebrated annually across its 24 municipalities. Each celebration involves significant investment in bamboo structures, costumes, banners, lanterns, and props — many of which are discarded or abandoned after the event ends.
                </p>
                <p>
                  This creates two compounding problems: cultural materials with deep historical significance are lost forever, and smaller communities without the budget to create new materials cannot participate meaningfully in celebrations.
                </p>
                <p>
                  LIKHAYON addresses both by creating a circular system — where each festival enriches the next. <em>Likha Noon, Likha Ngayon.</em>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '60%', label: 'of festival materials discarded post-event' },
                { num: '₱0', label: 'cost to qualifying community borrowers' },
                { num: '24', label: 'municipalities served across Bulacan' },
                { num: '300+', label: 'years of living tradition to preserve' },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-xl p-5 text-center shadow-sm">
                  <p className="font-serif text-3xl font-bold text-[#1e3d1a] mb-1">{stat.num}</p>
                  <p className="text-xs text-[#6b6b5e]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <p className="text-[#c9942a] text-xs font-semibold tracking-widest uppercase mb-3">Goals</p>
          <h2 className="font-serif text-3xl font-bold text-[#1a1a18]">LIKHAYON Program Objectives</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {OBJECTIVES.map((obj, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-[#f0ebe0] flex items-center justify-center mb-4">
                {obj.icon}
              </div>
              <h3 className="font-serif font-semibold text-[#1a1a18] mb-2">{obj.title}</h3>
              <p className="text-sm text-[#6b6b5e] leading-relaxed">{obj.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#f0ebe0] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#c9942a] text-xs font-semibold tracking-widest uppercase mb-3">The People</p>
            <h2 className="font-serif text-3xl font-bold text-[#1a1a18]">Core Team (Sample)</h2>
            <p className="text-[#6b6b5e] text-sm mt-2">Fictional sample team for the LIKHAYON prototype demonstration.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm text-center">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-2 ring-[#e0d8cc]"
                  onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=2d5a27&color=fff&size=80`; }}
                />
                <h3 className="font-serif font-semibold text-[#1a1a18] mb-0.5">{member.name}</h3>
                <p className="text-xs text-[#c9942a] font-medium mb-1">{member.role}</p>
                <p className="text-xs text-[#9e9e8f]">{member.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <p className="text-[#c9942a] text-xs font-semibold tracking-widest uppercase mb-3">Collaboration</p>
          <h2 className="font-serif text-3xl font-bold text-[#1a1a18]">Partner Agencies</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PARTNERS.map((partner, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#f0ebe0] flex items-center justify-center flex-shrink-0">
                <Award size={14} className="text-[#2d5a27]" />
              </div>
              <p className="text-sm text-[#1a1a18] font-medium">{partner}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-[#1e3d1a] py-16 text-center text-white">
        <h2 className="font-serif text-3xl font-bold mb-3">Want to Get Involved?</h2>
        <p className="text-white/75 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
          Donate materials, volunteer as a cultural documenter, or partner with us to expand LIKHAYON to your municipality.
        </p>
        <Link
          to="/borrow"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#c9942a] text-white rounded-full hover:bg-[#d4a843] transition-colors font-semibold text-sm shadow-lg shadow-[#c9942a]/25"
        >
          Start with a Borrowing Request <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
