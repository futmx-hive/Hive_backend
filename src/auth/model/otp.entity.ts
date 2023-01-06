import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Otp')
export class OtpEntity {
    @PrimaryGeneratedColumn() id:string;
}
