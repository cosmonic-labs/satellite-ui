import {Button, cn, FormSection} from '@cosmonic/orbit-ui';
import {type LatticeClient} from '@wasmcloud/lattice-client-core';
import {CircuitBoardIcon, SettingsIcon, Trash2Icon} from 'lucide-react';
import * as React from 'react';
import {type LatticeClientMap} from '@/context/lattice-client/lattice-client-map';
import {useLatticeClients} from '@/context/lattice-client/use-lattice-client';
import {DialogNewLatticeConnection} from './dialog-new-lattice-connection';

function LatticeSelection() {
  const {latticeClients} = useLatticeClients();

  const {selectedKey, clients} = latticeClients;

  return (
    <div className="">
      <FormSection title="Lattice Connections">
        <div className="col-span-6 flex w-full flex-col gap-4">
          {[...clients.entries()].map(([key, client]) => (
            <LatticeClientTile
              key={key}
              keyName={key}
              client={client}
              isSelected={key === selectedKey}
              latticeClients={latticeClients}
            />
          ))}

          <DialogNewLatticeConnection
            trigger={
              <button
                type="button"
                className="flex justify-center rounded-lg border-2 border-dashed border-primary/20 p-4 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary"
              >
                Add New Lattice Connection
              </button>
            }
          />
        </div>
      </FormSection>
    </div>
  );
}

type LatticeClientTileProps = {
  readonly client: LatticeClient;
  readonly keyName: string;
  readonly isSelected: boolean;
  readonly isLast?: boolean;
  readonly latticeClients: LatticeClientMap;
} & React.HTMLAttributes<HTMLDivElement>;

function LatticeClientTile({
  client,
  isSelected,
  keyName,
  className,
  latticeClients,
  ...props
}: LatticeClientTileProps) {
  const handleRemove = React.useCallback(() => {
    latticeClients.removeClient(keyName);
  }, [keyName, latticeClients]);

  const isProtected = latticeClients.clients.size === 1;

  return (
    <div
      className={cn(
        'flex flex-col justify-between gap-4 rounded-lg border p-2 shadow lg:flex-row',
        className,
      )}
      aria-selected={isSelected}
      {...props}
    >
      <div className="flex items-start justify-between gap-2">
        <CircuitBoardIcon strokeWidth="1.5" className="size-6 shrink-0 text-muted-foreground" />
        <div className="me-auto flex flex-col">
          <div className="text-base font-medium">{keyName}</div>
          <div className="text-sm text-muted-foreground">{client.instance.config.latticeUrl}</div>
        </div>
      </div>
      <div className="flex flex-wrap items-start justify-end gap-2">
        <Button
          variant="outline"
          size="xs"
          className="group/button px-1.5 py-1 disabled:opacity-100"
          disabled={isSelected}
        >
          Active
          <span
            className={cn(
              'ms-1 size-3 rounded-full border group-hover/button:bg-primary/50',
              isSelected ? 'bg-primary' : 'bg-muted',
            )}
          />
        </Button>
        <Button
          variant="outline"
          size="xs"
          className="group/button px-1.5 py-1 hover:bg-destructive/10"
          disabled={isProtected}
          onClick={handleRemove}
        >
          <SettingsIcon className="me-1 size-4" /> Configure
        </Button>
        <Button
          variant="outline"
          size="xs"
          className="group/button px-1.5 py-1 hover:bg-destructive/10"
          disabled={isProtected}
          onClick={handleRemove}
        >
          <Trash2Icon className="me-1 size-4 text-destructive" /> Remove
        </Button>
      </div>
    </div>
  );
}

export {LatticeSelection};
