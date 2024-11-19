import { prisma } from '@/infrastructure/utils/prisma';

async function main() {
  // Create a test user
  const user = await prisma.user.create({
    data: {
      username: 'testuser',
      email: 'test@example.com',
      password: 'securepassword', // Make sure to hash this in production
    },
  });

  // Coffee shop data array
  const coffeeShops = [
    {
      name: 'Central Perk',
      lat: -6.17511,
      long: 106.827153,
      hasWifi: true,
      notes: 'A cozy place for coffee lovers',
      geojson: JSON.stringify({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [106.827153, -6.17511],
        },
        properties: {
          name: 'Central Perk',
          hasWifi: true,
          notes: 'A cozy place for coffee lovers',
        },
      }),
    },
    {
      name: 'Starbucks Reserve',
      lat: -6.182311,
      long: 106.821903,
      hasWifi: true,
      notes: 'Premium coffee experience with high-speed internet',
      geojson: JSON.stringify({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [106.821903, -6.182311],
        },
        properties: {
          name: 'Starbucks Reserve',
          hasWifi: true,
          notes: 'Premium coffee experience with high-speed internet',
        },
      }),
    },
    {
      name: 'Anomali Coffee',
      lat: -6.224188,
      long: 106.809788,
      hasWifi: true,
      notes: 'Local Indonesian coffee specialist',
      geojson: JSON.stringify({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [106.809788, -6.224188],
        },
        properties: {
          name: 'Anomali Coffee',
          hasWifi: true,
          notes: 'Local Indonesian coffee specialist',
        },
      }),
    },
    {
      name: 'Coffee Theory',
      lat: -6.193125,
      long: 106.849033,
      hasWifi: false,
      notes: 'Artisanal coffee roasters with great atmosphere',
      geojson: JSON.stringify({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [106.849033, -6.193125],
        },
        properties: {
          name: 'Coffee Theory',
          hasWifi: false,
          notes: 'Artisanal coffee roasters with great atmosphere',
        },
      }),
    },
    {
      name: 'Djournal Coffee',
      lat: -6.201491,
      long: 106.823151,
      hasWifi: true,
      notes: 'Modern workspace with excellent coffee',
      geojson: JSON.stringify({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [106.823151, -6.201491],
        },
        properties: {
          name: 'Djournal Coffee',
          hasWifi: true,
          notes: 'Modern workspace with excellent coffee',
        },
      }),
    },
  ];

  // Create coffee shops
  for (const shop of coffeeShops) {
    await prisma.coffeeshop.create({
      data: {
        ...shop,
        ownerId: user.id,
      },
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
