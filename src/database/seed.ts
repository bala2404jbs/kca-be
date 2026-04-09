import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { Admin, AdminRole } from './entities/admin.entity';
import { Program, ProgramCategory } from './entities/program.entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  
  const adminRepo = dataSource.getRepository(Admin);
  const programRepo = dataSource.getRepository(Program);

  // Seed Admin
  const adminEmail = 'admin@kca.com';
  const existingAdmin = await adminRepo.findOne({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('Admin@123', 10);
    const admin = adminRepo.create({
      email: adminEmail,
      name: 'Super Admin',
      passwordHash,
      role: AdminRole.SUPER_ADMIN,
    });
    await adminRepo.save(admin);
    console.log('Super Admin created.');
  } else {
    console.log('Super Admin already exists.');
  }

  // Seed programs
  const programs = [
    { slug: 'abacus', title: 'Abacus', description: 'Mental math program for fast calculation', ageRange: '5-14', category: ProgramCategory.MATHS, duration: '2 hours/week', scope: 'Basic to advanced calculations' },
    { slug: 'vedic-maths', title: 'Vedic Maths', description: 'Ancient Indian mathematics techniques', ageRange: '10+', category: ProgramCategory.MATHS, duration: '2 hours/week', scope: 'Speed math techniques' },
    { slug: 'handwriting', title: 'Handwriting', description: 'Cursive writing improvement program', ageRange: '5+', category: ProgramCategory.ENGLISH, duration: '1 hour/week', scope: 'Legible and fast writing' },
    { slug: 'cbdp', title: 'CBDP', description: 'Child & Brain Development Program', ageRange: '3-6', category: ProgramCategory.BRAIN_DEVELOPMENT, duration: '3 hours/week', scope: 'Cognitive skills' },
    { slug: 'feep', title: 'FEEP', description: 'Fluent English Educational Program', ageRange: '6+', category: ProgramCategory.ENGLISH, duration: '2 hours/week', scope: 'Communication skills' },
    { slug: 'seep', title: 'SEEP', description: 'Spoken English Educational Program', ageRange: '10+', category: ProgramCategory.ENGLISH, duration: '2 hours/week', scope: 'Advanced speaking' },
    { slug: 'aip', title: 'AIP', description: 'All in One Program', ageRange: '5-14', category: ProgramCategory.BRAIN_DEVELOPMENT, duration: '4 hours/week', scope: 'Comprehensive development' },
  ];

  for (const p of programs) {
    const existing = await programRepo.findOne({ where: { slug: p.slug } });
    if (!existing) {
      await programRepo.save(programRepo.create(p));
      console.log(`Program seeded: ${p.slug}`);
    }
  }

  await app.close();
}

bootstrap();
