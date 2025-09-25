import { AppDataSource } from './data-source';
import { User } from '../../users/entities/user.entity';
import { CharacterSheet } from '../../sheet/entities/sheet.entity';
import { CharacterAffinity } from '../../sheet/entities/affinity.entity';

async function seed() {
  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository(User)
  const admin = userRepo.create({
    name: 'Admin',
    email: 'admin@example.com',
    password: 'adminpassword',
    role: 'admin',
    active: true,
  })
  await userRepo.save(admin);

  // Create a regular user
  const user = userRepo.create({
    name: 'User',
    email: 'user@example.com',
    password: 'userpassword',
    role: 'user',
    active: true,
  })
  await userRepo.save(user)

  // Create a character sheet for the admin
  const sheetRepo = AppDataSource.getRepository(CharacterSheet);
  const adminSheet = sheetRepo.create({
    userID: admin.id,
    characterName: 'Gandalf',
    characterClass: 'Wizard',
    armorClass: 15,
    hp: 40,
    maxHP: 40,
    tempHP: 5,
    background: 'Sage',
    active: true,
  })
  await sheetRepo.save(adminSheet);

  // Create a character sheet for the user
  const userSheet = sheetRepo.create({
    userID: user.id,
    characterName: 'Aragorn',
    characterClass: 'Ranger',
    armorClass: 17,
    hp: 35,
    maxHP: 35,
    tempHP: 0,
    background: 'Noble',
    active: true,
  })
  await sheetRepo.save(userSheet)

  // Create affinity for admin's character
  const affinityRepo = AppDataSource.getRepository(CharacterAffinity);
  const adminAffinity = affinityRepo.create({
    characterID: adminSheet.id,
    bludgeoning: 'resistant',
    piercing: 'neutral',
    slashing: 'neutral',
    fire: 'immune',
    cold: 'neutral',
    acid: 'neutral',
    thunder: 'neutral',
    lightning: 'neutral',
    poison: 'neutral',
    radiant: 'neutral',
    necrotic: 'neutral',
    psychic: 'neutral',
    force: 'neutral',
  })
  await affinityRepo.save(adminAffinity)

  const userAffinity = affinityRepo.create({
    characterID: userSheet.id,
    bludgeoning: 'neutral',
    piercing: 'resistant',
    slashing: 'vulnerable',
    fire: 'neutral',
    cold: 'neutral',
    acid: 'neutral',
    thunder: 'neutral',
    lightning: 'neutral',
    poison: 'neutral',
    radiant: 'neutral',
    necrotic: 'neutral',
    psychic: 'neutral',
    force: 'neutral',
  });
  await affinityRepo.save(userAffinity)

  await AppDataSource.destroy()
  console.log('Seed generated.')
}
seed()