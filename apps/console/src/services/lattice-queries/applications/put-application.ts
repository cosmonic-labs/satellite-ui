import {type MutationOptions, useMutation, useQueryClient} from '@tanstack/react-query';
import {latticeClients} from '@/context/lattice-client';
import {deployApplication} from './deploy-application';
import {applicationQueryKeys} from './query-keys';

type PutApplicationInput = {
  yaml: string;
  autoDeploy?: boolean;
};

async function putApplicationManifest(input: PutApplicationInput) {
  const latticeClient = latticeClients.getClient();
  return latticeClient.applications.put(input.yaml);
}

type PutApplicationResult =
  ReturnType<typeof putApplicationManifest> extends Promise<infer T> ? T : never;

function usePutApplicationMutation(
  options?: MutationOptions<PutApplicationResult, unknown, PutApplicationInput>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    async mutationFn(input: PutApplicationInput) {
      const putResult = await putApplicationManifest(input);

      if (input.autoDeploy) {
        await deployApplication(putResult.name, putResult.current_version);
      }

      return putResult;
    },
    async onSuccess(data, variables, context) {
      options?.onSuccess?.(data, variables, context);
      await queryClient.invalidateQueries({queryKey: applicationQueryKeys.all});
    },
  });
}

export {putApplicationManifest, usePutApplicationMutation};
