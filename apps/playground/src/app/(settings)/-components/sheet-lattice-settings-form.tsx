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
import React from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {useLatticeSelector} from '@/context/lattice-client/use-lattice-selector';

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
  const [isChecking, setIsChecking] = React.useState(false);
  const [isValidConnection, setIsValidConnection] = React.useState(false);

  const form = useForm<LatticeSchemaFormInput, Record<string, unknown>, LatticeSchemaFormOutput>({
    resolver: zodResolver(latticeSettingsSchema),
    defaultValues: {
      key: latticeKey,
      name: latticeName,
      latticeUrl: latticeClientConfig.latticeUrl,
    },
  });

  const url = form.watch('latticeUrl');

  React.useEffect(() => {
    if (!url) return;
    setIsChecking(true);
    const timeout = setTimeout(async () => {
      setIsValidConnection(await canConnect(url));
      setIsChecking(false);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [url]);

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
                  <span className="font-normal text-muted-foreground">
                    {isChecking ? (
                      <span className="flex items-center">
                        <LoaderCircleIcon className="mx-0.5 size-4 animate-spin" />
                        Checking connection...
                      </span>
                    ) : url ? (
                      isValidConnection ? (
                        <span className="flex items-center">
                          <span className="mx-1.5 size-2 rounded-full bg-green-400" />
                          Connected
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <span className="mx-1.5 size-2 rounded-full bg-gray-500" />
                          Unable to connect
                        </span>
                      )
                    ) : null}
                  </span>
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
