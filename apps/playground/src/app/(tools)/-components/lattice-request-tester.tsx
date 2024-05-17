import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Textarea,
} from '@cosmonic/orbit-ui';
import {zodResolver} from '@hookform/resolvers/zod';
import * as React from 'react';
import {type ControllerRenderProps, useForm} from 'react-hook-form';
import {useLocalStorage} from 'usehooks-ts';
import {z} from 'zod';
import {useLatticeClient} from '@/context/lattice-client/use-lattice-client';
import {PG_TOOLS_LATTICE_TESTER_FORM_VALUES} from '@/helpers/local-storage';

const formSchema: z.ZodType<{
  subject: string;
  body?: string;
}> = z.object({
  subject: z.string().nonempty(),
  body: z
    .string()
    .optional()
    .refine((value) => {
      try {
        if (!value) {
          return true;
        }

        JSON.parse(value);
        return Boolean(value);
      } catch {
        return false;
      }
    }, 'Body must be a valid JSON string'),
});

type LatticeTestFormInput = z.input<typeof formSchema>;

type LatticeTestFormOutput = z.output<typeof formSchema>;

function LatticeRequestTester() {
  const {client} = useLatticeClient();
  const [response, setResponse] = React.useState<unknown | undefined>(null);

  const [localValues, setLocalValues] = useLocalStorage(PG_TOOLS_LATTICE_TESTER_FORM_VALUES, {
    subject: 'wasmbus.ctl.v1.default.link.get',
    body: undefined,
  });

  const handleChange =
    (field: ControllerRenderProps<LatticeTestFormInput>) =>
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      // proxy values to local storage
      setLocalValues((previous) => ({
        ...previous,
        [field.name]: event.target.value,
      }));
      field.onChange(event);
    };

  const form = useForm<LatticeTestFormInput, Record<string, unknown>, LatticeTestFormOutput>({
    resolver: zodResolver(formSchema),
    defaultValues: localValues,
  });

  const onSubmit = React.useMemo(
    () =>
      form.handleSubmit(async (data) => {
        try {
          const response = await client.instance.request(data.subject, data.body);
          setResponse(response);
        } catch (error) {
          if (error instanceof Error) {
            if (error.message === '503') {
              setResponse('No Responders');
              return;
            }

            setResponse(error.message);
          }
        }
      }),
    [client, form],
  );

  return (
    <div>
      <Form {...form}>
        <form className="space-y-6" onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="subject"
            render={({field}) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl>
                  <Input
                    placeholder="wasmbus.ctl.v1.default"
                    {...field}
                    onChange={handleChange(field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({field}) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <Textarea placeholder="{}" {...field} onChange={handleChange(field)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {Boolean(response) && (
        <div>
          <Label>Response:</Label>
          <pre className="text-sm">
            <code>{JSON.stringify(response as string, null, 2)}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

export {LatticeRequestTester};
