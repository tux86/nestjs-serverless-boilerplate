import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { EndpointName } from '../core/graphql-server/enums/endpoint-name.enum';
import { getTypesDefinitionsConfig } from '../core/graphql-server/graphql-server.utils';

const definitionsFactory = new GraphQLDefinitionsFactory();

const main = async () => {
  for (const endpointName of Object.values(EndpointName)) {
    const outputFile = `src/shared/graphql/${endpointName}.graphql.ts`;
    process.stdout.write(`⚙️  Generating  "${outputFile}"  `);
    try {
      const definitionsConfig = getTypesDefinitionsConfig(endpointName);
      await definitionsFactory.generate({
        ...definitionsConfig,
        debug: false,
      });
      process.stdout.write('🆗\n');
    } catch (error) {
      process.stdout.write('❌\n');
      console.error('ERROR: \t' + error.message);
    }
  }
};

main();
