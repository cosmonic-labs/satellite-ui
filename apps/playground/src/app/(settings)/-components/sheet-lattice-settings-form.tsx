import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  SheetClose,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@cosmonic/orbit-ui';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate} from '@tanstack/react-router';
import {canConnect, type LatticeClientOptions} from '@wasmcloud/lattice-client-core';
import {CircuitBoardIcon, LoaderCircleIcon} from 'lucide-react';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import {useDebounceValue} from 'usehooks-ts';
import {z} from 'zod';
import {useLatticeSelector} from '@/context/lattice-client/use-lattice-selector';
import {LatticeStatus} from './lattice-status';

const latticeSettingsSchema = z.object({
  key: z.string().min(1),
  name: z.string().min(1),
  latticeUrl: z
    .string()
    .url()
    .refine(async (url) => canConnect(url), 'Unable to connect to the provided URL'),
});

type LatticeSchemaFormInput = z.input<typeof latticeSettingsSchema>;
type LatticeSchemaFormOutput = z.output<typeof latticeSettingsSchema>;
type SheetLatticeSettingsFormProps = {
  readonly latticeKey: string;
  readonly latticeName: string;
  readonly latticeClientConfig: LatticeClientOptions['config'];
};

function SheetLatticeSettingsForm({
  latticeKey,
  latticeName,
  latticeClientConfig,
}: SheetLatticeSettingsFormProps) {
  const navigate = useNavigate();
  const {updateEntry} = useLatticeSelector();

  const form = useForm<LatticeSchemaFormInput, Record<string, unknown>, LatticeSchemaFormOutput>({
    resolver: zodResolver(latticeSettingsSchema),
    defaultValues: {
      key: latticeKey,
      name: latticeName,
      latticeUrl: latticeClientConfig.latticeUrl,
    },
  });

  const latticeUrl = form.watch('latticeUrl');
  const [debouncedUrl, setDebouncedUrl] = useDebounceValue(latticeUrl, 500);

  React.useEffect(() => {
    setDebouncedUrl(latticeUrl);
  }, [latticeUrl, setDebouncedUrl]);

  const handleSubmit = form.handleSubmit(async (data) => {
    updateEntry(latticeKey, {
      name: data.name,
      config: {
        latticeUrl: data.latticeUrl,
      },
    });

    return navigate({to: '/settings/lattice', replace: true});
  });

  return (
    <>
      <SheetHeader>
        <div className="flex items-center gap-2 text-primary">
          <CircuitBoardIcon />
          <SheetTitle className="text-lg font-semibold">Edit Lattice Connection</SheetTitle>
        </div>
      </SheetHeader>
      <Form {...form}>
        <form className="space-y-8 py-4" onSubmit={handleSubmit}>
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Lattice Name</FormLabel>
                <FormDescription>
                  Friendly name for the lattice connection. This is only used for display purposes.
                </FormDescription>
                <FormControl>
                  <Input type="text" {...field} data-1p-ignore autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="latticeUrl"
            render={({field}) => (
              <FormItem>
                <FormLabel>Lattice URL</FormLabel>
                <FormDescription>
                  URL of the websocket server for the lattice connection.
                </FormDescription>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage>
                  <LatticeStatus url={debouncedUrl} />
                </FormMessage>
              </FormItem>
            )}
          />

          <SheetFooter>
            <Button type="submit">
              {form.formState.isSubmitting ? (
                <LoaderCircleIcon className="mx-0.5 size-4 animate-spin" />
              ) : null}
              Save
            </Button>
            <SheetClose asChild>
              <Button variant="secondary">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
    </>
  );
}

export {SheetLatticeSettingsForm};
