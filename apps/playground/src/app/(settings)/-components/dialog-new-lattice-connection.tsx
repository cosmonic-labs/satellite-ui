import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@cosmonic/orbit-ui';
import {zodResolver} from '@hookform/resolvers/zod';
import {canConnect} from '@wasmcloud/lattice-client-core';
import {CircuitBoardIcon, LoaderCircleIcon} from 'lucide-react';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import {useDebounceValue} from 'usehooks-ts';
import {z} from 'zod';
import {latticeClients} from '@/context/lattice-client';
import {useLatticeSelector} from '@/context/lattice-client/use-lattice-selector';
import {LatticeStatus} from './lattice-status';

const latticeSettingsSchema = z.object({
  name: z
    .string()
    .min(1)
    .refine(
      (name) => !latticeClients.clients.has(name),
      (name) => ({message: `Lattice with name '${name}' already exists`}),
    ),
  latticeUrl: z
    .string()
    .url()
    .refine(async (url) => canConnect(url), 'Unable to connect to the provided URL'),
});

type LatticeSchemaFormInput = z.input<typeof latticeSettingsSchema>;
type LatticeSchemaFormOutput = z.output<typeof latticeSettingsSchema>;

type DialogNewLatticeConnectionProps = {
  readonly trigger: React.ReactNode;
};

function DialogNewLatticeConnection({trigger}: DialogNewLatticeConnectionProps) {
  const {addEntry} = useLatticeSelector();
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm<LatticeSchemaFormInput, Record<string, unknown>, LatticeSchemaFormOutput>({
    resolver: zodResolver(latticeSettingsSchema),
  });

  const latticeUrl = form.watch('latticeUrl');

  const [debouncedUrl, setDebouncedUrl] = useDebounceValue(latticeUrl, 500);

  React.useEffect(() => {
    if (latticeUrl) {
      setDebouncedUrl(latticeUrl);
    }
  }, [latticeUrl, setDebouncedUrl]);

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data);

    addEntry({
      name: data.name,
      config: {
        latticeUrl: data.latticeUrl,
      },
    });

    setIsOpen(false);

    form.reset({
      name: '',
      latticeUrl: '',
    });
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary">
            <CircuitBoardIcon />
            <DialogTitle className="text-lg font-semibold">Add New Lattice Connection</DialogTitle>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Lattice Name</FormLabel>
                  <FormDescription>
                    Friendly name for the lattice connection. This is only used for display
                    purposes.
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

            <div className="flex gap-2">
              <Button type="submit">
                {form.formState.isSubmitting ? (
                  <LoaderCircleIcon className="mx-0.5 size-4 animate-spin" />
                ) : null}
                Add
              </Button>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export {DialogNewLatticeConnection};
