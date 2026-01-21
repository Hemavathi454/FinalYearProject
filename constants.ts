
import { OrganicTreatment } from './types';

export const COLORS = {
  primary: '#1B3A1A',
  secondary: '#2D5A27',
  accent: '#F4A261',
  error: '#E76F51',
  success: '#4CAF50'
};

export const MOCK_TREATMENTS: Record<string, OrganicTreatment> = {
  'Healthy': {
    pesticides: ['No organic pesticides needed'],
    fertilizers: ['Balanced vermicompost', 'Seaweed extract spray'],
    preventiveMeasures: ['Regular crop monitoring', 'Maintain proper soil moisture', 'Ensure 6+ hours of sunlight'],
    dosageInstructions: 'Continue current care. Apply compost every 3 months to maintain soil health.'
  },
  'Late Blight': {
    pesticides: ['Copper-based organic fungicide', 'Neem oil concentrate'],
    fertilizers: ['Potassium sulfate (organic source)'],
    preventiveMeasures: ['Improve air circulation', 'Prune lower leaves', 'Avoid evening watering'],
    dosageInstructions: 'Mix 2 tbsp Neem oil per gallon of water. Spray every 7 days, targeting leaf undersides.'
  },
  'Leaf Rust': {
    pesticides: ['Sulfur dust', 'Baking soda and soap spray'],
    fertilizers: ['Slow-release organic nitrogen'],
    preventiveMeasures: ['Remove and burn infected leaves', 'Sanitize garden shears', 'Avoid high humidity'],
    dosageInstructions: 'Mix 1 tsp baking soda with 1L water and a drop of dish soap. Spray twice weekly.'
  },
  'Powdery Mildew': {
    pesticides: ['Milk-water solution (30/70 ratio)', 'Horticultural oil'],
    fertilizers: ['Compost tea foliar spray'],
    preventiveMeasures: ['Increase spacing between plants', 'Plant in full sun'],
    dosageInstructions: 'Apply milk spray in direct sunlight. The protein reacts with light to create a natural fungicide.'
  },
  'Aphids': {
    pesticides: ['Pure castile soap spray', 'Garlic-Chili infusion'],
    fertilizers: ['Fish emulsion'],
    preventiveMeasures: ['Encourage ladybugs and lacewings', 'Install sticky yellow traps'],
    dosageInstructions: 'Mix 1 tbsp castile soap with 1L water. Spray directly on aphid clusters until soaked.'
  },
  'Yellow Leaf Curl': {
    pesticides: ['Yellow sticky traps for Whiteflies', 'Pyrethrin spray'],
    fertilizers: ['Epsom salt (Magnesium sulfate)'],
    preventiveMeasures: ['Use silver reflective mulches', 'Screen-off vulnerable plants'],
    dosageInstructions: 'Apply Pyrethrin in early morning. Dissolve 1 tbsp Epsom salt in 1L water for soil drench.'
  }
};
