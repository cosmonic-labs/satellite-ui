import {type MutationOptions, useMutation, useQueryClient} from '@tanstack/react-query';
import {latticeClients} from '@/context/lattice-client';
import {configQueryKeys} from './query-keys';

async function deleteConfig(name: string) {
  const client = latticeClients.getClient();
  return client.configs.delete(name);
}

type ResultType = ReturnType<typeof deleteConfig> extends Promise<infer T> ? T : never;

type DeleteConfigInput = {
  name: string;
};

function useDeleteConfigMutation(
  options?: MutationOptions<ResultType, unknown, DeleteConfigInput>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    async mutationFn(input: DeleteConfigInput) {
      return deleteConfig(input.name);
    },
    async onSuccess(data, variables, context) {
      options?.onSuccess?.(data, variables, context);
      await queryClient.invalidateQueries({queryKey: configQueryKeys.all});
    },
  });
}

export {useDeleteConfigMutation};
