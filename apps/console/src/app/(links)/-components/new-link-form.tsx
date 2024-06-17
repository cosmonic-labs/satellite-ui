import {
  Button,
  cn,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSection,
  Input,
  InputChips,
} from '@cosmonic/orbit-ui';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate} from '@tanstack/react-router';
import {LoaderCircleIcon} from 'lucide-react';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {usePutLinkMutation} from '@/services/lattice-queries/links/put-link';

/* eslint-disable @typescript-eslint/naming-convention -- external name */
const newLinkSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  wit_namespace: z.string().min(1, 'WIT Namespace is required'),
  wit_package: z.string().min(1, 'WIT Package is required'),
  interfaces: z.array(z.string()).min(1, 'At least one interface is required'),
  source_id: z.string().min(1, 'Source is required'),
  source_config: z.array(z.string()).optional(),
  target: z.string().min(1, 'Target is required'),
  target_config: z.array(z.string()).optional(),
});
/* eslint-enable @typescript-eslint/naming-convention -- external name */

type LatticeSchemaFormInput = z.input<typeof newLinkSchema>;
type LatticeSchemaFormOutput = z.output<typeof newLinkSchema>;
type LatticeSettingsFormProps = React.HTMLProps<HTMLFormElement>;

/* eslint-disable @typescript-eslint/naming-convention -- external name */
const defaultValues: LatticeSchemaFormOutput = {
  name: '',
  wit_namespace: '',
  wit_package: '',
  interfaces: [],
  source_id: '',
  source_config: [],
  target: '',
  target_config: [],
};
/* eslint-enable @typescript-eslint/naming-convention -- external name */

const NewLinkForm = React.forwardRef<HTMLFormElement, LatticeSettingsFormProps>(
  ({className}, ref) => {
    const putLinkMutation = usePutLinkMutation();
    const navigate = useNavigate();

    const form = useForm<LatticeSchemaFormInput, Record<string, unknown>, LatticeSchemaFormOutput>({
      resolver: zodResolver(newLinkSchema),
      defaultValues,
    });

    const handleSubmit = form.handleSubmit(async (values) => {
      putLinkMutation.mutate(values);
    });

    React.useEffect(() => {
      if (putLinkMutation.isSuccess) {
        form.reset();
        void navigate({to: '/links'});
      }
    }, [form, putLinkMutation.isSuccess, navigate]);

    return (
      <Form {...form}>
        <form ref={ref} className={cn('space-y-8', className)} onSubmit={handleSubmit}>
          <div>
            <FormSection
              title="Link Details"
              description={
                <>
                  Each Link has a name and a set of key-value pairs that can be used to Linkure
                  components or providers.
                </>
              }
            >
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Link Name</FormLabel>
                      <FormDescription>
                        Name of the Link. This will be used to identify the Link when linking
                        components.
                      </FormDescription>
                      <FormControl>
                        <Input type="text" {...field} data-1p-ignore autoComplete="off" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormSection>

            <FormSection
              title="Interface"
              description={
                <>
                  Each Link has a WIT contract that defines the interface that the source will
                  import and the target will provide.
                </>
              }
            >
              <div className="col-span-6 space-y-4">
                <FormField
                  control={form.control}
                  name="wit_namespace"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>WIT Namespace</FormLabel>
                      <FormDescription>
                        The <code>wasi</code> in <code>wasi:keyvalue/readwrite.get</code>
                      </FormDescription>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="wit_package"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>WIT Package</FormLabel>
                      <FormDescription>
                        The <code>keyvalue</code> in <code>wasi:keyvalue/readwrite.get</code>
                      </FormDescription>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interfaces"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Interfaces</FormLabel>
                      <FormDescription>
                        List of interfaces that the source will import and the target will export.
                      </FormDescription>
                      <FormControl>
                        <InputChips {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormSection>

            <FormSection
              title="Link Source"
              description={
                <>The source component is what imports the interface and exports the capabilities</>
              }
            >
              <div className="col-span-6 space-y-4">
                <FormField
                  control={form.control}
                  name="source_id"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Source</FormLabel>
                      <FormDescription>
                        The ID of the source component or provider that will provide the data.
                      </FormDescription>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="source_config"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Source Configurations</FormLabel>
                      <FormDescription>
                        List of configurations that the source component or provider requires.
                      </FormDescription>
                      <FormControl>
                        <InputChips {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormSection>

            <FormSection
              title="Link Target"
              description={
                <>
                  The target of the Link is where the data will be written to. The target can be a
                  provider or a component.
                </>
              }
            >
              <div className="col-span-6 space-y-4">
                <FormField
                  control={form.control}
                  name="target"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Target</FormLabel>
                      <FormDescription>
                        The ID of the target component or provider that will receive the data.
                      </FormDescription>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="target_config"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Target Configurations</FormLabel>
                      <FormDescription>
                        List of configurations that the target component or provider requires.
                      </FormDescription>
                      <FormControl>
                        <InputChips {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormSection>
          </div>
          <div className="col-span-6 flex justify-end">
            <Button type="submit">
              {form.formState.isSubmitting ? (
                <LoaderCircleIcon className="mx-0.5 size-4 animate-spin" />
              ) : null}
              Save
            </Button>
          </div>
        </form>
      </Form>
    );
  },
);

export {NewLinkForm};
