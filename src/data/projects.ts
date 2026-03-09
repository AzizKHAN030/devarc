
export interface Project {
  id: number;
  title: string;
  category: 'Architecture' | 'Interior' | 'Exterior';
  image: string;
  year: string;
  description: string;
  gallery: string[];
}

export const PROJECTS: Project[] = [
  { 
    id: 1, 
    title: 'The Obsidian Villa', 
    category: 'Architecture', 
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200', 
    year: '2024',
    description: 'A monolithic masterpiece carved from dark basalt and glass, designed to merge seamlessly with the volcanic landscape of the northern coast. The Obsidian Villa redefines luxury through raw materiality and expansive spatial volumes.',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  { 
    id: 2, 
    title: 'Nordic Light Loft', 
    category: 'Interior', 
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200', 
    year: '2023',
    description: 'An exploration of light and shadow in a minimalist urban setting. This loft utilizes pale oak, soft textiles, and strategic skylights to create a sanctuary of calm amidst the bustling city.',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  { 
    id: 3, 
    title: 'Azure Garden Estate', 
    category: 'Exterior', 
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200', 
    year: '2024',
    description: 'A sprawling landscape design that integrates Mediterranean flora with contemporary water features. The estate is designed as a series of outdoor rooms, each offering a unique sensory experience.',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  { 
    id: 4, 
    title: 'Crystal Pavilion', 
    category: 'Architecture', 
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200', 
    year: '2022',
    description: 'A transparent structure that blurs the line between interior and exterior. The Crystal Pavilion uses advanced structural glazing to support a floating roof, offering 360-degree views of the surrounding forest.',
    gallery: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1503387762-592dec5832f2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  { 
    id: 5, 
    title: 'Ethereal Living', 
    category: 'Interior', 
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200', 
    year: '2023',
    description: 'Soft curves and a muted palette define this residential interior. Every piece of furniture is custom-designed to complement the architectural flow of the space.',
    gallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  { 
    id: 6, 
    title: 'Serenity Poolside', 
    category: 'Exterior', 
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200', 
    year: '2024',
    description: 'A minimalist pool design that emphasizes the horizon. The use of infinity edges and natural stone creates a seamless transition from the water to the sky.',
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1200'
    ]
  },
];
