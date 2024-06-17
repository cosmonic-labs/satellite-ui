import {
  Button,
  CopyButton,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Label,
  SheetDescription,
  SheetDivider,
  SheetHeader,
  SheetSection,
  SheetTitle,
} from '@cosmonic/orbit-ui';
import {Link} from '@tanstack/react-router';
import {type WasmCloudConfig} from '@wasmcloud/lattice-client-core';
import {BookKeyIcon, EyeIcon, EyeOffIcon, PencilIcon} from 'lucide-react';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import {usePutConfigMutation} from '@/services/lattice-queries/configs/put-config';

type ConfigDetailSheetContentProps = {
  readonly config: WasmCloudConfig;
  readonly appName?: string;
};

function ConfigDetailSheetContent({config, appName}: ConfigDetailSheetContentProps) {
  const isManaged = appName !== undefined;
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingName, setEditingName] = React.useState('');
  const form = useForm();
  const putConfigMutation = usePutConfigMutation();

  React.useEffect(() => {
    const configValue = config.entries[editingName] ?? '';
    form.setValue(editingName, configValue);
  }, [editingName, form, config.entries]);

  const handleEdit = React.useCallback((name: string) => {
    React.startTransition(() => {
      setIsDialogOpen(true);
      setEditingName(name);
    });
  }, []);

  const handleSubmit = form.handleSubmit(() => {
    setIsDialogOpen(false);
    const configValue = form.getValues(editingName) as string;

    putConfigMutation.mutate({
      name: config.name,
      entries: {
        ...config.entries,
        [editingName]: configValue,
      },
    });
  });

  React.useEffect(() => {
    if (putConfigMutation.isSuccess) {
      form.unregister();
      form.reset();
    }
  }, [editingName, form, putConfigMutation.isSuccess]);

  return (
    <div>
      <SheetHeader>
        <SheetTitle>
          <span className="flex flex-row items-center gap-2 text-primary">
            <BookKeyIcon strokeWidth="2.5" />
            <code>{config.name}</code>
          </span>
        </SheetTitle>
      </SheetHeader>

      {isManaged && (
        <>
          <SheetDivider />
          <SheetDescription>
            This config is managed by the{' '}
            <Link
              to="/applications/detail/$appName"
              params={{appName}}
              className="text-primary underline"
            >
              <code>{appName}</code> application
            </Link>
            .
          </SheetDescription>
        </>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <SheetSection title="Properties">
          <div className="space-y-4">
            {Object.entries(config.entries).length > 0 ? (
              Object.entries(config.entries).map(([name, value]) => (
                <ConfigProperty
                  key={name}
                  name={name}
                  value={value}
                  onEditClick={() => {
                    handleEdit(name);
                  }}
                />
              ))
            ) : (
              <div className="rounded-md border p-2 text-sm">
                There are no properties in this config
              </div>
            )}
          </div>
        </SheetSection>
        <DialogContent>
          <DialogHeader>Config Values</DialogHeader>
          <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {isManaged && (
                <FormDescription>
                  Note: Changes to this property will be reverted to the state defined by the{' '}
                  <code>{appName}</code> application. To make permanent changes, you will need to{' '}
                  <Link
                    to="/applications/new"
                    search={{'app-name': appName}}
                    className="text-primary underline"
                  >
                    update the application
                  </Link>
                  .
                </FormDescription>
              )}
              <FormField
                name={editingName}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>{editingName}</FormLabel>
                    <FormControl>
                      <Input label="Name" {...field} data-1p-ignore autoComplete="off" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

type ConfigPropertyProps = {
  readonly name: string;
  readonly value: string;
  readonly onEditClick?: () => void;
  readonly isShowingAll?: boolean;
};

function ConfigProperty({name, value, isShowingAll, onEditClick}: ConfigPropertyProps) {
  const [shouldShow, setShouldShow] = React.useState(isShowingAll ?? false);

  React.useEffect(() => {
    setShouldShow(false);
  }, [isShowingAll]);

  return (
    <div className="flex flex-col items-stretch gap-2">
      <Label>
        <code>{name}</code>
      </Label>
      <div className="flex gap-2">
        <Input readOnly value={shouldShow ? value : '•••••••••'} className="h-9 grow p-2" />
        <CopyButton textToCopy={value} variant="outline" size="sm" />
        <Button variant="outline" size="sm" onClick={onEditClick}>
          <PencilIcon className="size-3.5" />
          <span className="sr-only">Edit Value</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setShouldShow(!shouldShow);
          }}
        >
          {shouldShow ? <EyeOffIcon className="size-3.5" /> : <EyeIcon className="size-3.5" />}
          <span className="sr-only">{shouldShow ? 'Hide Value' : 'Show Value'}</span>
        </Button>
      </div>
    </div>
  );
}

export {ConfigDetailSheetContent};
