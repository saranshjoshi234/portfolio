// Sticky navigation. `sections` lists the page section ids that highlight each item.
export const navItems = [
  { id: 'home', label: 'Home', sections: ['home'] },
  { id: 'about', label: 'About', sections: ['about', 'capabilities'] },
  { id: 'experience', label: 'Experience', sections: ['experience'] },
  { id: 'projects', label: 'Projects', sections: ['projects'] },
  { id: 'engineering', label: 'Engineering', sections: ['architecture', 'engineering'] },
  { id: 'ai-ml', label: 'AI/ML', sections: ['ai-ml'] },
  { id: 'contact', label: 'Contact', sections: ['contact'] },
]

/** Every section on the page, in order (including ones without their own nav item). */
export const pageSections = [
  'home',
  'about',
  'capabilities',
  'experience',
  'projects',
  'architecture',
  'engineering',
  'ai-ml',
  'leadership',
  'credentials',
  'writing',
  'contact',
]
