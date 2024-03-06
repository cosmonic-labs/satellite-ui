import {type MutationOptions, useMutation, useQueryClient} from '@tanstack/react-query';
import {latticeClients} from '@/context/lattice-client';
import {applicationQueryKeys} from './query-keys';

async function deployApplication(name: string, version: string) {
  const client = latticeClients.getClient();
  return client.applications.deploy(name, version);
}

type ResultType = ReturnType<typeof deployApplication> extends Promise<infer T> ? T : never;

type DeployApplicationInput = {
  name: string;
  version: string;
};

function useDeployApplicationMutation(
  options?: MutationOptions<ResultType, unknown, DeployApplicationInput>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    async mutationFn(input: DeployApplicationInput) {
      return deployApplication(input.name, input.version);
    },
    async onSuccess(data, variables, context) {
      options?.onSuccess?.(data, variables, context);
      await queryClient.invalidateQueries({queryKey: applicationQueryKeys.all});
    },
  });
}

export {deployApplication, useDeployApplicationMutation};
