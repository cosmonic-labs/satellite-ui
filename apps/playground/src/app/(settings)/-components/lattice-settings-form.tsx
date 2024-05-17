import {Form, FormSection} from '@cosmonic/orbit-ui';
import {useForm} from 'react-hook-form';

function LatticeSettingsForm() {
  const form = useForm();

  return (
    <Form {...form}>
      <FormSection title="Lattice Configuration">
        <span />
      </FormSection>
    </Form>
  );
}

export {LatticeSettingsForm};
