import {type MutationOptions, useMutation, useQueryClient} from '@tanstack/react-query';
import {latticeClients} from '@/context/lattice-client';
import {hostQueryKeys} from './query-keys';

async function stopHost(id: string) {
  const client = latticeClients.getClient();
  return client.hosts.stop(id);
}

type ResultType = ReturnType<typeof stopHost> extends Promise<infer T> ? T : never;

type StopHostInput = {
  id: string;
};

function useStopHostMutation(options?: MutationOptions<ResultType, unknown, StopHostInput>) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    async mutationFn(input: StopHostInput) {
      return stopHost(input.id);
    },
    async onSuccess(data, variables, context) {
      options?.onSuccess?.(data, variables, context);
      await queryClient.invalidateQueries({
        queryKey: hostQueryKeys.detail(variables.id),
      });
    },
  });
}

export {stopHost, useStopHostMutation};
