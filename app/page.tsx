'use client';

import { useMemo, useState } from 'react';

type QuizAnswers = {
  goal?: 'routine' | 'wellness' | 'balanced' | 'baking';
  usage?: 'drink' | 'food' | 'baking' | 'guided';
  texture?: 'smooth' | 'flavor' | 'whole' | 'flexible';
  organic?: 'must' | 'nice' | 'open' | 'bulk';
};

type Product = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  badges: string[];
  image: string;
  url: string;
  why: string[];
};

type Recipe = {
  id: string;
  title: string;
  time: string;
  difficulty: 'easy' | 'medium' | 'advanced';
  imageType: 'drink' | 'bowl' | 'baking';
  ingredients: string[];
  steps: string[];
  fitTags: string[];
  note: string;
};

const products: Product[] = [
  {
    id: 'organic-powder',
    name: 'Psyllium Husk Powder — Organic',
    subtitle: 'Fine texture for flexible everyday use',
    description:
      'A versatile organic psyllium option with a fine texture that mixes smoothly into drinks, oats, smoothies, and everyday kitchen routines.',
    badges: ['USDA Organic', 'Fine Powder', 'Versatile', 'Easy to Mix'],
    image: '/images/psyllium-organic-powder.png',
    url: 'https://www.znaturalfoods.com/products/psyllium-husk-powder-organic',
    why: [
      'A good fit for a simple daily fiber routine.',
      'Easy to use in drinks, oats, and simple recipes.',
      'A strong fit for shoppers who prefer organic options and a smooth texture.',
    ],
  },
  {
    id: 'pineapple-orange',
    name: 'Psyllium Husk Powder (Pineapple Orange Flavor)',
    subtitle: 'Flavor-forward option for drink lovers',
    description:
      'A flavored psyllium powder for people who prefer a more enjoyable taste profile when mixing into water, shakes, or smoothies.',
    badges: ['Flavored', 'Drink Friendly', 'Easy Routine'],
    image: '/images/psyllium-pineapple-orange.png',
    url: 'https://www.znaturalfoods.com/products/psyllium-husk-powder-pineapple-orange-flavor',
    why: [
      'A more enjoyable option for a daily fiber routine.',
      'A natural fit for water, juice, and smoothie-style routines.',
      'Works well for shoppers who want taste to be part of the experience.',
    ],
  },
  {
    id: 'whole-husk',
    name: 'Psyllium Husk (Whole Flakes) — Organic',
    subtitle: 'Whole husk format with a closer-to-nature feel',
    description:
      'A whole husk option for shoppers who prefer minimal processing and a more natural format for baking or everyday use.',
    badges: ['USDA Organic', 'Whole Husk', 'Minimal Processing'],
    image: '/images/psyllium-whole-husk.png',
    url: 'https://www.znaturalfoods.com/products/psyllium-husk-whole-flakes-organic',
    why: [
      'A good fit for baking and food-based routines.',
      'A strong match for shoppers who prefer a whole-format option.',
      'A versatile option for kitchen use.',
    ],
  },
];

const recipes: Recipe[] = [
  {
    id: 'fiber-water',
    title: 'Morning Fiber Water',
    time: '3–5 min',
    difficulty: 'easy',
    imageType: 'drink',
    ingredients: ['8 oz water', '1 tbsp **Organic Psyllium Husk Powder**'],
    steps: [
      'Pour water into a glass.',
      'Stir in **Organic Psyllium Husk Powder** until combined.',
      'Drink right away after mixing.',
    ],
    fitTags: ['drink', 'smooth', 'guided', 'routine'],
    note: 'A quick, low-effort starting point for a simple daily routine.',
  },
  {
    id: 'green-smoothie',
    title: 'Green Fiber Smoothie',
    time: '5–10 min',
    difficulty: 'medium',
    imageType: 'drink',
    ingredients: ['1 cup spinach', '1 banana', '1 cup almond milk', '1 tbsp **Organic Psyllium Husk Powder**'],
    steps: [
      'Add spinach, banana, and almond milk to a blender.',
      'Blend until smooth.',
      'Add **Organic Psyllium Husk Powder** and blend again briefly.',
      'Pour and enjoy right away.',
    ],
    fitTags: ['drink', 'smooth', 'flavor', 'wellness', 'balanced'],
    note: 'Great for shoppers who want a smooth, drink-friendly option.',
  },
  {
    id: 'mango-shake',
    title: 'Creamy Mango Fiber Shake',
    time: '10–15 min',
    difficulty: 'advanced',
    imageType: 'drink',
    ingredients: ['1/2 cup mango', '1 cup milk of choice', '1/2 banana', '1 tbsp **Organic Psyllium Husk Powder**'],
    steps: [
      'Add mango, milk, and banana to a blender.',
      'Blend until creamy.',
      'Add **Organic Psyllium Husk Powder** and blend briefly again.',
      'Pour into a chilled glass and serve.',
    ],
    fitTags: ['drink', 'flavor', 'balanced', 'wellness'],
    note: 'A more satisfying drink option for shoppers who enjoy a smoothie-style routine.',
  },
  {
    id: 'yogurt-bowl',
    title: 'Fruit & Yogurt Fiber Bowl',
    time: '3–5 min',
    difficulty: 'easy',
    imageType: 'bowl',
    ingredients: ['1 cup yogurt', 'Fresh berries', '1 tsp **Organic Psyllium Husk Powder**', 'Granola'],
    steps: [
      'Add yogurt to a bowl.',
      'Mix in **Organic Psyllium Husk Powder** well.',
      'Top with berries and granola.',
    ],
    fitTags: ['food', 'flavor', 'flexible', 'wellness'],
    note: 'A simple food-first option with familiar ingredients and almost no prep.',
  },
  {
    id: 'berry-oats-bowl',
    title: 'Berry Oats Fiber Bowl',
    time: '5–10 min',
    difficulty: 'medium',
    imageType: 'bowl',
    ingredients: ['1/2 cup oats', '1/2 cup yogurt', 'Fresh berries', '1 tsp **Organic Psyllium Husk Powder**'],
    steps: [
      'Prepare oats and let them cool slightly.',
      'Mix oats with yogurt in a bowl.',
      'Stir in **Organic Psyllium Husk Powder** until smooth.',
      'Top with fresh berries and serve.',
    ],
    fitTags: ['food', 'smooth', 'routine', 'balanced'],
    note: 'A practical middle-ground recipe for shoppers who prefer spoonable meals.',
  },
  {
    id: 'oatmeal',
    title: 'Creamy Oatmeal with Hidden Fiber',
    time: '10–15 min',
    difficulty: 'advanced',
    imageType: 'bowl',
    ingredients: ['1/2 cup oats', '1 cup milk or water', '1 tsp **Organic Psyllium Husk Powder**', 'Honey and cinnamon'],
    steps: [
      'Cook oats on the stovetop or in the microwave.',
      'Stir in **Organic Psyllium Husk Powder** while warm.',
      'Add honey and cinnamon to finish.',
      'Let it sit briefly, then serve warm.',
    ],
    fitTags: ['food', 'guided', 'smooth', 'routine'],
    note: 'An easy comfort-food style option for people who prefer food over drinks.',
  },
  {
    id: 'quick-pancakes',
    title: 'Quick Fiber Pancakes',
    time: '3–5 min',
    difficulty: 'easy',
    imageType: 'baking',
    ingredients: ['Pancake mix', '1 tsp **Organic Psyllium Husk Powder**', 'Water or milk'],
    steps: [
      'Mix pancake batter as directed.',
      'Stir in **Organic Psyllium Husk Powder**.',
      'Cook small pancakes on a hot pan until done.',
    ],
    fitTags: ['baking', 'guided', 'whole', 'balanced'],
    note: 'A fast starter recipe for shoppers who want a baking-style use with minimal effort.',
  },
  {
    id: 'pizza-dough',
    title: 'Gluten-Free Pizza Dough Helper',
    time: '5–10 min',
    difficulty: 'medium',
    imageType: 'baking',
    ingredients: ['Gluten-free flour blend', '1 tbsp **Organic Psyllium Husk Powder**', 'Warm water', 'Oil', 'Salt'],
    steps: [
      'Mix the dry ingredients together.',
      'Add warm water and oil.',
      'Stir in **Organic Psyllium Husk Powder** until a dough forms.',
      'Rest briefly before shaping.',
    ],
    fitTags: ['baking', 'whole', 'bulk', 'baking'],
    note: 'Useful for bakers looking for structure in gluten-free doughs.',
  },
  {
    id: 'muffins',
    title: 'Simple Fiber Muffins',
    time: '10–15 min',
    difficulty: 'advanced',
    imageType: 'baking',
    ingredients: ['1 muffin mix', '1 tbsp **Organic Psyllium Husk Powder**', 'Eggs or substitute', 'Liquid per package directions'],
    steps: [
      'Preheat oven and prep your muffin tray.',
      'Combine the mix with **Organic Psyllium Husk Powder**.',
      'Add the wet ingredients and stir well.',
      'Fill the tray and bake until done.',
      'Cool slightly before serving.',
    ],
    fitTags: ['baking', 'whole', 'guided', 'baking'],
    note: 'A practical choice for people who want a more hands-on kitchen recipe.',
  },
];

const recipeImages = {
  drink: {
    'fiber-water': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80',
    'green-smoothie': 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=1200&q=80',
    'mango-shake': 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
  },
  bowl: {
    oatmeal: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=1200&q=80',
    'yogurt-bowl': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
    'berry-oats-bowl': 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1200&q=80',
  },
  baking: {
    muffins: 'https://images.unsplash.com/photo-1604882406195-d94d45b27a98?auto=format&fit=crop&w=1200&q=80',
    'pizza-dough': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    'quick-pancakes': 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
  },
};

const questions = [
  {
    key: 'goal',
    label: 'Question 1 of 4',
    title: 'What is your main reason for taking psyllium?',
    options: [
      {
        value: 'routine',
        icon: '🌿',
        title: 'An everyday fiber routine',
        desc: 'A simple choice for daily use',
      },
      {
        value: 'wellness',
        icon: '❤️',
        title: 'A balanced wellness routine',
        desc: 'A thoughtful option for everyday habits',
      },
      {
        value: 'balanced',
        icon: '⚖️',
        title: 'A more balanced daily routine',
        desc: 'A practical fit for mindful habits',
      },
      {
        value: 'baking',
        icon: '🍞',
        title: 'Baking and cooking',
        desc: 'A useful option for gluten-free and everyday recipes',
      },
    ],
  },
  {
    key: 'usage',
    label: 'Question 2 of 4',
    title: 'How would you most likely use it?',
    options: [
      {
        value: 'drink',
        icon: '🥤',
        title: 'Mixed into a drink',
        desc: 'Water, juice, or smoothies',
      },
      {
        value: 'food',
        icon: '🥣',
        title: 'Stirred into food',
        desc: 'Oats, yogurt, cereal, or bowls',
      },
      {
        value: 'baking',
        icon: '🧁',
        title: 'Used in baking',
        desc: 'Bread, muffins, dough, and recipes',
      },
      {
        value: 'guided',
        icon: '🤝',
        title: 'Whatever fits me best',
        desc: 'Show me the easiest match',
      },
    ],
  },
  {
    key: 'texture',
    label: 'Question 3 of 4',
    title: 'What texture or taste experience sounds best?',
    options: [
      {
        value: 'smooth',
        icon: '✨',
        title: 'Smooth and barely noticeable',
        desc: 'I want something easy to blend in',
      },
      {
        value: 'flavor',
        icon: '🍊',
        title: 'A little flavor is welcome',
        desc: 'I enjoy something more pleasant tasting',
      },
      {
        value: 'whole',
        icon: '🌾',
        title: 'Whole and less processed',
        desc: 'I like a closer-to-nature format',
      },
      {
        value: 'flexible',
        icon: '👍',
        title: 'I’m flexible',
        desc: 'I care more about overall fit than texture',
      },
    ],
  },
  {
    key: 'organic',
    label: 'Question 4 of 4',
    title: 'How important is organic certification to you?',
    options: [
      {
        value: 'must',
        icon: '🏷️',
        title: 'Very important',
        desc: 'I strongly prefer certified organic',
      },
      {
        value: 'nice',
        icon: '👌',
        title: 'Nice to have',
        desc: 'Important, but not my only factor',
      },
      {
        value: 'open',
        icon: '🎯',
        title: 'I’m open',
        desc: 'I mainly want the best fit overall',
      },
      {
        value: 'bulk',
        icon: '📦',
        title: 'Value matters most',
        desc: 'I go through it often and think practically',
      },
    ],
  },
] as const;

function pickPrimaryProduct(answers: QuizAnswers) {
  const scoreMap = products.map((product) => {
    let score = 0;

    if (product.id === 'organic-powder') {
      if (answers.goal === 'routine') score += 2;
      if (answers.goal === 'wellness') score += 1;
      if (answers.usage === 'drink') score += 2;
      if (answers.usage === 'food') score += 2;
      if (answers.usage === 'guided') score += 1;
      if (answers.texture === 'smooth') score += 3;
      if (answers.texture === 'flexible') score += 1;
      if (answers.organic === 'must') score += 3;
      if (answers.organic === 'nice') score += 2;
      if (answers.organic === 'open') score += 1;
    }

    if (product.id === 'pineapple-orange') {
      if (answers.goal === 'balanced') score += 2;
      if (answers.goal === 'wellness') score += 2;
      if (answers.usage === 'drink') score += 3;
      if (answers.usage === 'guided') score += 1;
      if (answers.texture === 'flavor') score += 4;
      if (answers.texture === 'smooth') score += 1;
      if (answers.organic === 'open') score += 2;
      if (answers.organic === 'nice') score += 1;
    }

    if (product.id === 'whole-husk') {
      if (answers.goal === 'baking') score += 4;
      if (answers.goal === 'routine') score += 1;
      if (answers.usage === 'baking') score += 4;
      if (answers.usage === 'food') score += 2;
      if (answers.texture === 'whole') score += 4;
      if (answers.texture === 'flexible') score += 1;
      if (answers.organic === 'must') score += 2;
      if (answers.organic === 'bulk') score += 3;
      if (answers.organic === 'nice') score += 1;
    }

    return { product, score };
  });

  scoreMap.sort((a, b) => b.score - a.score);
  return scoreMap[0].product;
}

function pickSecondaryProducts(primaryId: string) {
  return products.filter((product) => product.id !== primaryId).slice(0, 2);
}

function pickRecipes(answers: QuizAnswers) {
  const primaryTrack =
    answers.usage === 'drink'
      ? 'drink'
      : answers.usage === 'food'
        ? 'bowl'
        : answers.usage === 'baking'
          ? 'baking'
          : answers.goal === 'baking'
            ? 'baking'
            : answers.texture === 'whole'
              ? 'baking'
              : answers.texture === 'flavor'
                ? 'drink'
                : answers.goal === 'routine'
                  ? 'bowl'
                  : 'drink';

  const difficultyOrder = { easy: 1, medium: 2, advanced: 3 };

  const scoreRecipe = (recipe: Recipe) => {
    let score = 0;
    if (recipe.imageType === primaryTrack) score += 8;
    if (answers.goal && recipe.fitTags.includes(answers.goal)) score += 4;
    if (answers.usage && recipe.fitTags.includes(answers.usage)) score += 4;
    if (answers.texture && recipe.fitTags.includes(answers.texture)) score += 3;
    if (answers.organic === 'bulk' && recipe.fitTags.includes('bulk')) score += 2;
    if (answers.usage === 'guided' && recipe.fitTags.includes('guided')) score += 2;
    return score;
  };

  const trackRecipes = recipes.filter((recipe) => recipe.imageType === primaryTrack);

  const selected = (['easy', 'medium', 'advanced'] as const)
    .map((difficulty) => {
      const candidates = trackRecipes.filter((recipe) => recipe.difficulty === difficulty);
      if (!candidates.length) return null;
      return [...candidates].sort((a, b) => scoreRecipe(b) - scoreRecipe(a))[0];
    })
    .filter(Boolean) as Recipe[];

  if (selected.length === 3) {
    return selected.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
  }

  const fallbackPool = [...recipes].sort((a, b) => scoreRecipe(b) - scoreRecipe(a));
  fallbackPool.forEach((recipe) => {
    if (!selected.find((item) => item.id === recipe.id) && selected.length < 3) {
      selected.push(recipe);
    }
  });

  return selected.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
}

function difficultyLabel(difficulty: Recipe['difficulty']) {
  if (difficulty === 'easy') return 'Easiest way to start';
  if (difficulty === 'medium') return 'Next step';
  return 'More hands-on recipe';
}

function getRecipeImage(recipe: Recipe) {
  if (recipe.imageType === 'drink') {
    return recipeImages.drink[recipe.id as 'fiber-water' | 'green-smoothie' | 'mango-shake'] || recipeImages.drink.fallback;
  }

  if (recipe.imageType === 'bowl') {
    return recipeImages.bowl[recipe.id as 'oatmeal' | 'yogurt-bowl' | 'berry-oats-bowl'] || recipeImages.bowl.fallback;
  }

  if (recipe.imageType === 'baking') {
    return recipeImages.baking[recipe.id as 'muffins' | 'pizza-dough' | 'quick-pancakes'] || recipeImages.baking.fallback;
  }

  return recipeImages.drink.fallback;
}

function formatBoldText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

export default function PsylliumQuizPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const primaryProduct = useMemo(() => pickPrimaryProduct(answers), [answers]);
  const secondaryProducts = useMemo(() => pickSecondaryProducts(primaryProduct.id), [primaryProduct.id]);
  const matchedRecipes = useMemo(() => pickRecipes(answers), [answers]);


  const handleAnswer = (key: keyof QuizAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value as never }));
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      setSubmitError('Please enter your email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Subscription failed.');
      }

      setSubmitSuccess('Success! Your result is ready.');
      setSubmitted(true);
      setStep(6);
    } catch (error) {
      console.error('Subscribe error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans text-[#1a1a1a]">
      <header className="bg-white">
        <div className="flex items-center justify-between border-b border-[#ebebeb] px-8 py-2 text-[12px] text-[#555]">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">📦 Free shipping for orders within the contiguous US over $75</span>
            <span className="flex items-center gap-1.5">⏱ Mon-Fri 9AM-5:30PM EST</span>
            <span className="flex items-center gap-1.5">📞 (888) 963-6637</span>
          </div>
          <div className="flex items-center gap-2 text-[#1a1a1a]">
            <div className="flex items-center gap-1" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: '#f4b400' }} className="text-[18px] leading-none">★</span>
              ))}
            </div>
            <span className="text-[12px] font-extrabold tracking-[0.02em]">6293 REVIEWS</span>
          </div>
        </div>
        <div className="bg-[#23843E] px-4 py-3 text-center text-[13px] font-bold text-white">
          Be Sure to Check Out All of Our Specials!
        </div>
        <div className="flex items-center justify-between gap-4 border-b border-[#e8e8e8] px-8 py-3">
          <img src="/images/logo.png" alt="Z Natural Foods" className="h-[42px] w-auto object-contain" />
          <nav className="hidden items-center gap-10 text-[14px] font-medium text-[#222] md:flex">
            <a href="https://www.znaturalfoods.com/collections">Categories</a>
            <a href="https://www.znaturalfoods.com/pages/health-concerns">Health Concerns</a>
            <a href="https://www.znaturalfoods.com/specials" className="font-semibold text-[#e07b00]">🔥 Specials</a>
            <a href="https://www.znaturalfoods.com/blogs/articles">Articles</a>
            <a href="https://www.znaturalfoods.com/collections/bulk">Bulk</a>
            <a href="https://www.znaturalfoods.com/pages/about-us">About</a>
          </nav>
          <div className="flex min-w-[185px] items-center gap-2 rounded-[8px] border border-[#d4d4d4] px-4 py-2.5 text-[13px] text-[#8d8d8d]">
            <span>🔎</span>
            <span>Search</span>
          </div>
        </div>
      </header>

      <main className="px-4 pb-16 pt-12">
        <div className="mx-auto max-w-[760px]">
          <div className="mb-7 text-center">
            <h1 className="mb-3 text-[34px] font-bold leading-tight text-[#1a1a1a] md:text-[46px]">
              Find Your Perfect <span className="text-[#23843E]">Psyllium</span>
            </h1>
            <p className="mx-auto max-w-[560px] text-[15px] leading-7 text-[#555]">
              Answer 4 quick questions and we will match you with the right psyllium husk product for your needs — plus 3 ways to use it.
            </p>
          </div>

          <div className="mb-7 flex items-center justify-center">
            {[1, 2, 3, 4, 5].map((item, index) => {
              const isEmailStep = item === 5;
              const isDone = step > item;
              const isActive = step === item;
              return (
                <div key={item} className="flex items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                      isDone
                        ? 'border-[#23843E] bg-[#23843E] text-white'
                        : isActive
                          ? 'border-[#23843E] bg-white text-[#23843E]'
                          : 'border-[#ccc] bg-white text-[#aaa]'
                    }`}
                  >
                    {isEmailStep ? '✉' : item}
                  </div>
                  {index < 4 ? (
                    <div className={`h-[2px] w-14 ${step > item ? 'bg-[#23843E]' : 'bg-[#ddd]'}`} />
                  ) : null}
                </div>
              );
            })}
          </div>

          {step <= 4 ? (
            <div className="relative z-10 rounded-[12px] bg-white px-10 py-9 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
              <div className="mb-2 text-[12px] font-bold uppercase tracking-[0.08em] text-[#23843E]">
                {questions[step - 1].label}
              </div>
              <div className="mb-6 text-[19px] font-bold leading-tight text-[#1a1a1a] md:text-[32px]">
                {questions[step - 1].title}
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {questions[step - 1].options.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => handleAnswer(questions[step - 1].key, option.value)}
                    className="relative z-10 flex w-full cursor-pointer select-none items-start gap-3 rounded-[10px] border border-[#e0e0e0] bg-white p-4 text-left transition hover:border-[#23843E] hover:bg-[#f7fbf3]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#f5f5f5] text-[19px]">
                      {option.icon}
                    </div>
                    <div>
                      <div className="mb-1 text-[14px] font-semibold leading-5 text-[#1a1a1a]">{option.title}</div>
                      <div className="text-[12px] leading-5 text-[#777]">{option.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {step === 5 ? (
            <div className="rounded-[12px] bg-white px-10 py-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
              <div className="mb-4 text-5xl">🌾</div>
              <h2 className="mb-2 text-[28px] font-extrabold leading-tight md:text-[44px]">Your match is ready!</h2>
              <div className="mb-4 text-[22px] leading-tight text-[#1a1a1a] md:text-[24px]">
                Surprise <strong>GIFT</strong> — you got <strong>$10 OFF</strong>
              </div>
              <p className="mx-auto mb-7 max-w-[390px] text-[14.5px] leading-7 text-[#666]">
                Subscribe to get your coupon code and 3 psyllium recipes matched to your preferences.
              </p>
              <div className="mx-auto mb-4 flex max-w-[440px] flex-col gap-3">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name (optional)"
                  className="w-full rounded-[10px] border border-[#d0d5dd] px-5 py-4 text-[15px] outline-none focus:border-[#23843E]"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full rounded-[10px] border border-[#d0d5dd] px-5 py-4 text-[15px] outline-none focus:border-[#23843E]"
                />
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="mx-auto block w-full max-w-[440px] rounded-[10px] bg-[#23843E] px-5 py-4 text-[16px] font-bold text-white transition hover:bg-[#1a6330] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Submitting...' : 'Get My $10 OFF Code'}
              </button>

              {submitError ? <div className="mt-3 text-[13px] text-red-600">{submitError}</div> : null}

              {submitSuccess ? <div className="mt-3 text-[13px] text-green-700">{submitSuccess}</div> : null}
              <div className="mt-3 text-[12.5px] text-[#888]">🔒 No spam, ever. Unsubscribe anytime.</div>
            </div>
          ) : null}

          {step === 6 && submitted ? (
            <div className="rounded-[12px] bg-white px-8 py-10 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
              <div className="mb-2 text-center text-[30px] font-bold leading-tight md:text-[44px]">Your Perfect Psyllium Match</div>
              <div className="mb-7 text-center text-[15px] text-[#666]">
                Based on your answers, here is what fits your routine best.
              </div>

              <div className="mb-8 text-center">
                <div className="mb-5 inline-block rounded-full bg-[#23843E] px-5 py-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-white">
                  Best Match
                </div>
                <div className="rounded-[16px] border-2 border-[#23843E] bg-[#f9fdf9] px-8 py-8">
                  <img src={primaryProduct.image} alt={primaryProduct.name} className="mx-auto mb-5 h-[280px] w-[280px] object-contain md:h-[360px] md:w-[360px]" />
                  <div className="mb-2 text-[14px] text-[#888]">{primaryProduct.subtitle}</div>
                  <h3 className="mb-3 text-[28px] font-black leading-tight text-[#0d1f12]">{primaryProduct.name}</h3>
                  <p className="mx-auto mb-5 max-w-[540px] text-[14px] leading-7 text-[#555]">{primaryProduct.description}</p>
                  <div className="mb-6 flex flex-wrap justify-center gap-2">
                    {primaryProduct.badges.map((badge) => (
                      <span
                        key={badge}
                        className="rounded-full border border-[#23843E] px-4 py-1.5 text-[12px] font-semibold text-[#23843E]"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <a href={primaryProduct.url} className="relative z-10 inline-block rounded-[10px] bg-[#23843E] px-8 py-3.5 text-[16px] font-bold text-white">
                    Shop Now →
                  </a>
                </div>
              </div>

              <div className="mb-7 text-center">
                <div className="mb-3 text-[11.5px] font-extrabold uppercase tracking-[0.13em] text-[#556]">Why this is your match</div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {primaryProduct.why.map((item) => (
                    <div key={item} className="rounded-[12px] border border-[#e8e8e8] bg-white px-4 py-5 text-[13.5px] leading-6 text-[#444]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4 text-center text-[13px] font-bold text-[#1a1a1a]">
                🎁 3 ways to use it based on your answers
              </div>
              <div className="flex flex-col gap-5">
                {matchedRecipes.map((recipe, index) => (
                  <div key={recipe.id} className="overflow-hidden rounded-[12px] border border-[#e8e8e8] bg-white">
                    <img src={getRecipeImage(recipe)} alt={recipe.title} className="h-[220px] w-full object-cover" />
                    <div className="p-5">
                      <div className="mb-2 inline-block rounded-full bg-[#eef7ee] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#23843E]">
                        {index === 0 ? 'Start here' : difficultyLabel(recipe.difficulty)}
                      </div>
                      <div className="mb-1 text-[21px] font-extrabold text-[#1a1a1a]">{recipe.title}</div>
                      <div className="mb-4 text-[13px] font-semibold text-[#23843E]">⏱ {recipe.time}</div>
                      <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#23843E]">What you need</div>
                      <ul className="mb-4 list-disc pl-5 text-[13.5px] leading-7 text-[#333]">
                        {recipe.ingredients.map((item) => (
                          <li key={item}>{formatBoldText(item)}</li>
                        ))}
                      </ul>
                      <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#23843E]">How to make it</div>
                      <ol className="list-decimal pl-5 text-[13.5px] leading-7 text-[#333]">
                        {recipe.steps.map((item) => (
                          <li key={item}>{formatBoldText(item)}</li>
                        ))}
                      </ol>
                      <div className="mt-4 text-[12px] italic leading-6 text-[#777]">💡 {recipe.note}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-4 mt-9 text-center text-[11.5px] font-extrabold uppercase tracking-[0.13em] text-[#556]">
                Also worth trying
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {secondaryProducts.map((product) => (
                  <div key={product.id} className="rounded-[14px] border border-[#e8e8e8] bg-white p-5 text-center">
                    <img src={product.image} alt={product.name} className="mx-auto mb-4 h-[180px] w-full object-contain bg-[#f9f9f9] p-3" />
                    <div className="mb-1 text-[16px] font-extrabold leading-6 text-[#0d1f12]">{product.name}</div>
                    <div className="mb-3 text-[13px] text-[#999]">{product.subtitle}</div>
                    <p className="mb-4 text-[13px] leading-6 text-[#555]">{product.description}</p>
                    <a href={product.url} className="relative z-10 inline-block rounded-[8px] bg-[#23843E] px-5 py-3 text-[14px] font-bold text-white">
                      View Product →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </main>

      <footer className="bg-[#314158] px-10 pb-0 pt-12">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 pb-10 md:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          <div>
            <img src="/images/logo.png" alt="Z Natural Foods" className="mb-4 h-[42px] w-auto object-contain" />
            <p className="max-w-[240px] text-[13px] leading-7 text-[#8d9db5]">
              Z Natural Foods is dedicated to bringing you the finest quality in hard-to-find whole, all natural and organic foods.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-[12px] font-bold uppercase tracking-[0.09em] text-white">Catalog</h4>
            <div className="space-y-2.5 text-[13px] text-[#8d9db5]">
              <a href="https://www.znaturalfoods.com/collections" className="block">All Products</a>
              <a href="https://www.znaturalfoods.com/specials" className="block">Specials</a>
              <a href="https://www.znaturalfoods.com/collections/new" className="block">New Products</a>
              <a href="https://www.znaturalfoods.com/pages/reviews" className="block">Reviews</a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-[12px] font-bold uppercase tracking-[0.09em] text-white">My Account</h4>
            <div className="space-y-2.5 text-[13px] text-[#8d9db5]">
              <a href="https://www.znaturalfoods.com/account/register" className="block">Register</a>
              <a href="https://www.znaturalfoods.com/account/addresses" className="block">My Address</a>
              <a href="https://www.znaturalfoods.com/account" className="block">Order History</a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-[12px] font-bold uppercase tracking-[0.09em] text-white">Information</h4>
            <div className="space-y-2.5 text-[13px] text-[#8d9db5]">
              <a href="https://www.znaturalfoods.com/pages/about-us" className="block">About Us</a>
              <a href="https://www.znaturalfoods.com/pages/contact-support" className="block">Contact Us</a>
              <a href="https://www.znaturalfoods.com/pages/faqs" className="block">FAQs</a>
              <a href="https://www.znaturalfoods.com/pages/shipping" className="block">Shipping</a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-[12px] font-bold uppercase tracking-[0.09em] text-white">Policies</h4>
            <div className="space-y-2.5 text-[13px] text-[#8d9db5]">
              <a href="https://www.znaturalfoods.com/policies/privacy-policy" className="block">Privacy Policy</a>
              <a href="https://www.znaturalfoods.com/policies/terms-of-service" className="block">Terms of Use</a>
              <a href="https://www.znaturalfoods.com/pages/accessibility" className="block">Accessibility</a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[1200px] border-t border-[#3d4f68] py-5 text-[12px] text-[#6b7f99]">
          Copyright © 2026, Z Natural Foods, LLC. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
