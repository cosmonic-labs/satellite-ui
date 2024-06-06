import {type MutationOptions, useMutation, useQueryClient} from '@tanstack/react-query';
import {latticeClients} from '@/context/lattice-client';
import {linkQueryKeys} from './query-keys';

async function deleteLink(link: DeleteLinkInput) {
  const client = latticeClients.getClient();
  return client.links.delete(link);
}

type ResultType = ReturnType<typeof deleteLink> extends Promise<infer T> ? T : never;

type DeleteLinkInput = {
  /** source identifier for the link */
  source_id: string;
  /** WIT namespace of the link operation, e.g. `wasi` in `wasi:keyvalue/readwrite.get` */
  wit_namespace: string;
  /** WIT package of the link operation, e.g. `keyvalue` in `wasi:keyvalue/readwrite.get` */
  wit_package: string;
  /** (optional) name of the link */
  name?: string;
};

function useDeleteLinkMutation(options?: MutationOptions<ResultType, unknown, DeleteLinkInput>) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    async mutationFn(link: DeleteLinkInput) {
      return deleteLink(link);
    },
    async onSuccess(data, variables, context) {
      options?.onSuccess?.(data, variables, context);
      await queryClient.invalidateQueries({queryKey: linkQueryKeys.all});
    },
  });
}

export {useDeleteLinkMutation};
