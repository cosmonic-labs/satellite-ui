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
  Label,
} from '@cosmonic/orbit-ui';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate} from '@tanstack/react-router';
import {CircleMinusIcon, LoaderCircleIcon} from 'lucide-react';
import * as React from 'react';
import {useForm, useFieldArray} from 'react-hook-form';
import {z} from 'zod';
import {usePutConfigMutation} from '@/services/lattice-queries/configs/put-config';

const newConfigSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  entries: z
    .array(
      z.object({
        key: z.string().min(1, 'Key is required'),
        value: z.string().min(1, 'Value is required'),
      }),
    )
    .min(1, 'At least one entry is required.'),
});

type LatticeSchemaFormInput = z.input<typeof newConfigSchema>;
type LatticeSchemaFormOutput = z.output<typeof newConfigSchema>;
type LatticeSettingsFormProps = React.HTMLProps<HTMLFormElement>;

const defaultValues: LatticeSchemaFormOutput = {
  name: '',
  entries: [
    {
      key: '',
      value: '',
    },
  ],
};

const NewConfigForm = React.forwardRef<HTMLFormElement, LatticeSettingsFormProps>(
  ({className}, ref) => {
    const putConfigMutation = usePutConfigMutation();
    const navigate = useNavigate();

    const form = useForm<LatticeSchemaFormInput, Record<string, unknown>, LatticeSchemaFormOutput>({
      resolver: zodResolver(newConfigSchema),
      defaultValues,
    });

    const {fields, append, remove} = useFieldArray({
      control: form.control,
      name: 'entries',
    });

    const handleSubmit = form.handleSubmit(async (values) => {
      putConfigMutation.mutate({
        name: values.name,
        entries: Object.fromEntries(values.entries.map((entry) => [entry.key, entry.value])),
      });
    });

    React.useEffect(() => {
      if (putConfigMutation.isSuccess) {
        form.reset();
        void navigate({to: '/configs'});
      }
    }, [form, putConfigMutation.isSuccess, navigate]);

    return (
      <Form {...form}>
        <form ref={ref} className={cn('space-y-8', className)} onSubmit={handleSubmit}>
          <FormSection
            title="Config Details"
            description={
              <>
                Each config has a name and a set of key-value pairs that can be used to configure
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
                    <FormLabel>Config Name</FormLabel>
                    <FormDescription>
                      Name of the config. This will be used to identify the config when linking
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
            <fieldset className="col-span-6 space-y-2">
              <Label asChild>
                <legend>Config Values</legend>
              </Label>
              <FormDescription>
                Config values are key-value pairs that can be used to configure components.
              </FormDescription>
              {fields.length === 0 && (
                <div className="">
                  <p className="text-muted">No entries added yet.</p>
                </div>
              )}
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <fieldset key={field.id} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                    <FormField
                      control={form.control}
                      name={`entries.${index}.key`}
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Key</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`entries.${index}.value`}
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Value</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col space-y-2">
                      <Label>&nbsp;</Label>
                      <Button
                        disabled={fields.length === 1}
                        type="button"
                        className="px-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        variant="outline"
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        <CircleMinusIcon className="size-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </fieldset>
                ))}
              </div>

              <FormField
                control={form.control}
                name="entries"
                render={() => (
                  <FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>

            <div className="col-span-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  append({key: '', value: ''});
                }}
              >
                Add Key/Value
              </Button>
            </div>
            <div className="col-span-6 flex justify-end">
              <Button type="submit">
                {form.formState.isSubmitting ? (
                  <LoaderCircleIcon className="mx-0.5 size-4 animate-spin" />
                ) : null}
                Save
              </Button>
            </div>
          </FormSection>
        </form>
      </Form>
    );
  },
);

export {NewConfigForm};
