import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { UploadModule } from './upload/upload.module';
import { LeadsModule } from './leads/leads.module';
import { ContactsModule } from './contacts/contacts.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { FranchiseModule } from './franchise/franchise.module';
import { TeacherTrainingModule } from './teacher-training/teacher-training.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { ProgramsModule } from './programs/programs.module';
import { PageMediaModule } from './page-media/page-media.module';
import { EventsModule } from './events/events.module';
import { LoggingMiddleware } from './common/middleware/logging.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule, 
    MailModule, 
    UploadModule, 
    LeadsModule, 
    ContactsModule, 
    InstitutionsModule, 
    FranchiseModule, 
    TeacherTrainingModule, 
    NewsletterModule,
    ProgramsModule,
    PageMediaModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
