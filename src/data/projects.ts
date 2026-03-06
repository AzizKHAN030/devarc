
export interface Project {
  id: number;
  title: string;
  category: 'Architecture' | 'Interior' | 'Exterior';
  image: string;
  year: string;
}

export const PROJECTS: Project[] = [
  { id: 1, title: 'The Obsidian Villa', category: 'Architecture', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200', year: '2024' },
  { id: 2, title: 'Nordic Light Loft', category: 'Interior', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200', year: '2023' },
  { id: 3, title: 'Azure Garden Estate', category: 'Exterior', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200', year: '2024' },
  { id: 4, title: 'Crystal Pavilion', category: 'Architecture', image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200', year: '2022' },
  { id: 5, title: 'Ethereal Living', category: 'Interior', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200', year: '2023' },
  { id: 6, title: 'Serenity Poolside', category: 'Exterior', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200', year: '2024' },
  { id: 7, title: 'The Zenith Tower', category: 'Architecture', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200', year: '2024' },
  { id: 8, title: 'Velvet Lounge', category: 'Interior', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200', year: '2023' },
  { id: 9, title: 'Emerald Oasis', category: 'Exterior', image: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&q=80&w=1200', year: '2024' },
  { id: 10, title: 'Modern Monolith', category: 'Architecture', image: 'https://images.unsplash.com/photo-1503387762-592dec5832f2?auto=format&fit=crop&q=80&w=1200', year: '2022' },
  { id: 11, title: 'Minimalist Sanctuary', category: 'Interior', image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=1200', year: '2023' },
  { id: 12, title: 'Coastal Retreat', category: 'Exterior', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1200', year: '2024' },
];
