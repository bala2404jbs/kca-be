import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin } from '../database/entities/admin.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async validateAdmin(loginDto: LoginDto): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { email: loginDto.email } });
    if (!admin) throw new UnauthorizedException('Invalid credentials');
    
    const isPasswordMatching = await bcrypt.compare(loginDto.password, admin.passwordHash);
    if (!isPasswordMatching) throw new UnauthorizedException('Invalid credentials');
    
    return admin;
  }

  async login(admin: Admin) {
    const payload = { email: admin.email, sub: admin.id, role: admin.role };
    return {
      access_token: this.jwtService.sign(payload),
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    };
  }
}
