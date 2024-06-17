import {type MutationOptions, useMutation, useQueryClient} from '@tanstack/react-query';
import {type WasmCloudConfig} from '@wasmcloud/lattice-client-core';
import {latticeClients} from '@/context/lattice-client';
import {configQueryKeys} from './query-keys';

async function putConfig(name: string, entries: Record<string, string>) {
  const client = latticeClients.getClient();
  return client.configs.put(name, entries);
}

type ResultType = ReturnType<typeof putConfig> extends Promise<infer T> ? T : never;

type PutConfigInput = {
  name: string;
  entries: Record<string, string>;
};

function usePutConfigMutation(options?: MutationOptions<ResultType, unknown, PutConfigInput>) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    async mutationFn(input: PutConfigInput) {
      return putConfig(input.name, input.entries);
    },
    async onMutate(variables) {
      const previousConfig = queryClient.getQueryData<WasmCloudConfig[] | undefined>(
        configQueryKeys.listExpanded(),
      );
      if (!previousConfig) return;

      // update list
      queryClient.setQueryData<WasmCloudConfig[]>(
        configQueryKeys.listExpanded(),
        (old) =>
          old?.map((config) =>
            config.name === variables.name ? {...config, entries: variables.entries} : config,
          ) ?? [],
      );
      // update individual config
      queryClient.setQueryData<WasmCloudConfig>(configQueryKeys.detail(variables.name), () => ({
        name: variables.name,
        entries: variables.entries,
      }));

      return {previousConfig};
    },
    onError(error, variables, context) {
      if (context?.previousConfig) {
        queryClient.setQueryData(configQueryKeys.listExpanded(), context.previousConfig);
      }
    },
    async onSettled() {
      await queryClient.invalidateQueries({queryKey: configQueryKeys.all});
    },
  });
}

export {usePutConfigMutation};
