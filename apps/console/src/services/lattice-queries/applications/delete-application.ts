import {type MutationOptions, useMutation, useQueryClient} from '@tanstack/react-query';
import {latticeClients} from '@/context/lattice-client';
import {applicationQueryKeys} from './query-keys';

async function deleteApplication(name: string, version: string) {
  const client = latticeClients.getClient();
  return client.applications.delete(name, {version});
}

type ResultType = ReturnType<typeof deleteApplication> extends Promise<infer T> ? T : never;

type DeleteApplicationInput = {
  name: string;
  version: string;
};

function useDeleteApplicationMutation(
  options?: MutationOptions<ResultType, unknown, DeleteApplicationInput>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    async mutationFn(input: DeleteApplicationInput) {
      return deleteApplication(input.name, input.version);
    },
    async onSuccess(data, variables, context) {
      options?.onSuccess?.(data, variables, context);
      await queryClient.invalidateQueries({queryKey: applicationQueryKeys.all});
    },
  });
}

export {useDeleteApplicationMutation};
