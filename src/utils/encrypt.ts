import { EncryptionDto } from '@base/dto/encryption.dto';
import { EnvKeys } from '@core/constants/enums/env.enum';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

export class Encrypt {
	constructor(private readonly configService: ConfigService) {}

	async generateEncryptedString(
		textToEncrypt: string
	): Promise<EncryptionDto> {
		const iv = randomBytes(16);
		const password = this.configService.get<string>(
			EnvKeys.JWT_ACCESS_TOKEN_SECRET
		);
		const algorithm = this.configService.get<string>(
			EnvKeys.ENCRYPTION_ALGORITHM
		);

		const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
		const cipher = createCipheriv(algorithm, key, iv);

		const encrptedText = Buffer.concat([
			cipher.update(textToEncrypt),
			cipher.final()
		]);

		return {
			iv: iv.toString('hex'),
			data: encrptedText.toString('hex')
		};
	}
}
