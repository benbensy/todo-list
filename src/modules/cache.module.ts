import { createKeyv } from '@keyv/valkey'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cacheable } from 'cacheable'

@Module({
  providers: [
    {
      inject: [ConfigService],
      provide: 'CACHE_INSTANCE',
      useFactory: (config: ConfigService) => {
        const secondary = createKeyv(config.get('VALKEY_URL'))
        return new Cacheable({ secondary, ttl: '4h' })
      },
    },
  ],
  exports: ['CACHE_INSTANCE'],
})
export class CacheModule {}
