import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SessionsModule } from './sessions/sessions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsModule } from './assets/assets.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'kmwarter',
      password: 'helloworld',
      database: 'kinetic',
      autoLoadEntities: true,
      synchronize: true, // Not to be used in prod
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule available globally
    }),
    SessionsModule,
    AssetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
