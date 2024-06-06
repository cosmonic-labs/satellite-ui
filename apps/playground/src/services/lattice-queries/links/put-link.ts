import {type MutationOptions, useMutation, useQueryClient} from '@tanstack/react-query';
import {type LatticeClient, type WasmCloudLink} from '@wasmcloud/lattice-client-core';
import {latticeClients} from '@/context/lattice-client';
import {linkQueryKeys} from './query-keys';

async function putLink(link: PutLinkInput) {
  const client = latticeClients.getClient();
  return client.links.put(link);
}

type ResultType = ReturnType<typeof putLink> extends Promise<infer T> ? T : never;

type PutLinkInput = Parameters<typeof LatticeClient.prototype.links.put>[0];

function usePutLinkMutation(options?: MutationOptions<ResultType, unknown, PutLinkInput>) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    async mutationFn(input: PutLinkInput) {
      return putLink(input);
    },
    async onMutate(variables) {
      const previousLink = queryClient.getQueryData<WasmCloudLink[] | undefined>(
        linkQueryKeys.list(),
      );
      if (!previousLink) return;

      // update list
      queryClient.setQueryData<WasmCloudLink[]>(
        linkQueryKeys.list(),
        (old) =>
          old?.map((link) => (link.name === variables.name ? {...link, ...variables} : link)) ?? [],
      );

      return {previousLink};
    },
    onError(error, variables, context) {
      if (context?.previousLink) {
        queryClient.setQueryData(linkQueryKeys.list(), context.previousLink);
      }
    },
    async onSettled() {
      await queryClient.invalidateQueries({queryKey: linkQueryKeys.all});
    },
  });
}

export {usePutLinkMutation};
