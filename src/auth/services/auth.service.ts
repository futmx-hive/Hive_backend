import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';

@Injectable()
export class AuthService extends TypeOrmCrudService<AuthEntity>{

    constructor(@InjectRepository(AuthEntity) repo) {
        super(repo);
    }

}
