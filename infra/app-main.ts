#!/usr/bin/env node
import { AppContext, AppContextError } from '../lib/template/app-context';

import { VpcInfraStack } from './common-infra/vpc-infra-stack';
import { EcsAlbServiceStack } from './ecs-service/ecs-alb-service-stack';


try {
    const appContext = new AppContext({
        appConfigFileKey: 'APP_CONFIG',
    });

    new VpcInfraStack(appContext, appContext.appConfig.Stack.VpcInfra);

    new EcsAlbServiceStack(appContext, appContext.appConfig.Stack.SampleBackendFastapi);
    new EcsAlbServiceStack(appContext, appContext.appConfig.Stack.SampleFrontendFlask);

} catch (error) {
    if (error instanceof AppContextError) {
        console.error('[AppContextError]:', error.message);
    } else {
        console.error('[Error]: not-handled-error', error);
    }
}
