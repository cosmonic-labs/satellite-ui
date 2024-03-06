import {type MutationOptions, useMutation, useQueryClient} from '@tanstack/react-query';
import {latticeClients} from '@/context/lattice-client';
import {applicationQueryKeys} from './query-keys';

async function undeployApplication(name: string, version?: string) {
  const client = latticeClients.getClient();
  return client.applications.undeploy(name);
}

type ResultType = ReturnType<typeof undeployApplication> extends Promise<infer T> ? T : never;

type UndeployApplicationInput = {
  name: string;
  version?: string;
};

function useUndeployApplicationMutation(
  options?: MutationOptions<ResultType, unknown, UndeployApplicationInput>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    async mutationFn(input: UndeployApplicationInput) {
      return undeployApplication(input.name, input.version);
    },
    async onSuccess(data, variables, context) {
      options?.onSuccess?.(data, variables, context);
      await queryClient.invalidateQueries({queryKey: applicationQueryKeys.all});
    },
  });
}

export {useUndeployApplicationMutation};
