import { EncryptionDto } from '@base/dto/encryption.dto';
import { EnvKeys } from '@core/constants/enums/env.enum';
import { ConfigService } from '@nestjs/config';
import { createDecipheriv, scrypt } from 'crypto';
import { promisify } from 'util';

export class Decrypt {
	constructor(private readonly configService: ConfigService) {}

	async generateDecryptedString(
		textToDecrypt: EncryptionDto
	): Promise<string> {
		const iv = Buffer.from(textToDecrypt.iv, 'hex');
		const password = this.configService.get<string>(
			EnvKeys.JWT_ACCESS_TOKEN_SECRET
		);
		const algorithm = this.configService.get<string>(
			EnvKeys.ENCRYPTION_ALGORITHM
		);

		const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
		const decipher = createDecipheriv(algorithm, key, iv);

		const decryptedText = Buffer.concat([
			decipher.update(Buffer.from(textToDecrypt.data, 'hex')),
			decipher.final()
		]);

		return decryptedText.toString();
	}
}
