import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC } from '@core/constants/common.constant';

export const NoAuthRoute = () => SetMetadata(IS_PUBLIC, true);
