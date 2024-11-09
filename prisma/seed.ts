import { prisma } from '@/infrastructure/utils/prisma';

async function main() {
  // Create a user and store the result to get the user ID
  const user = await prisma.user.create({
    data: {
      username: 'testuser',
      email: 'test@example.com',
      password: 'securepassword', // Make sure to hash this in production
    },
  });

  // Use the created user's ID for the ownerId field
  await prisma.coffeeshop.create({
    data: {
      name: 'Central Perk',
      lat: 6.17511,
      long: 106.827153,
      geojson: JSON.stringify({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [106.827153, 6.17511],
        },
        properties: {
          name: 'Central Perk',
          hasWifi: true,
          notes: 'A cozy place for coffee lovers',
        },
      }),
      hasWifi: true,
      notes: 'A cozy place for coffee lovers',
      ownerId: user.id, // Use the ID from the created user
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
